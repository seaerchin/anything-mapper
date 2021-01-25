import React, {
  createContext, useContext, useState, useEffect, useReducer, ReactChild, ReactChildren,
} from 'react'
import _, { forEach } from 'lodash'

import {
  Map, Action, Dictionary, filterMappings, MapItem, filterType, filterValues,
} from '../types'
import MAP from '../constants/map'

interface MapStateContextProps {
    map: Map | null
    filterOptions: filterOptionStates
    filteredLocations: MapItem[]
    dispatch: React.Dispatch<updateStateAction>
}

// true if a mapItem's body contains any of the searched fields
const filterManyOf = (
  mapItems: MapItem[],
  searchedField: string,
  selectedOptions: string[],
) => _.filter(
  mapItems,
  (mapItem) => {
    // check if checkboxes are all captured within this field
    const mapItemSearchField = (mapItem.body[searchedField] || []) as string[]
    return _.every(selectedOptions, (selectedOption) => mapItemSearchField.includes(selectedOption))
  },
)

const filterOneOf = (mapItems: MapItem[], searchedField: string) => _.filter(
  mapItems,
  (mapItem) => {
    const values = _.values(mapItem.body)
    return values.includes(searchedField)
  },
)

const filterRange = (
  mapItems: MapItem[],
  range: number[],
  searchedField: string,
) => _.filter(mapItems, (mapItem) => {
  const searchedFieldRanges = mapItem.body[searchedField] as number
  const [lower, upper] = range
  return searchedFieldRanges && searchedFieldRanges >= lower && searchedFieldRanges <= upper
})

const computeFilteredMapItems = (map: Map, filterOptions: filterOptionStates) => {
  // first check the type of body
  // then we filter based on that
  let filteredItems = map.points
  const keys = _.keys(filterOptions)
  keys.forEach((fieldToFilter) => {
    const filterKind = map.defaultFilterValues[fieldToFilter].fieldType
    switch (filterKind) {
      case 'manyOf': {
        // get the keys where values are false
        const selectedOptions = _.filter(_.keys(filterOptions[fieldToFilter]),
          (value) => {
            const checkBoxes = filterOptions[fieldToFilter] as Dictionary<boolean>
            return checkBoxes[value]
          })
        filteredItems = filterManyOf(
          filteredItems,
          fieldToFilter,
          selectedOptions,
        )
      }
        break
      case 'oneOf':
        filteredItems = filterOneOf(filteredItems, filterOptions[fieldToFilter] as string)
        break
      case 'range': {
        const range = filterOptions[fieldToFilter] as number[]
        // TODO: figure out how to type this
        // filteredItems = filterRange(filteredItems, range, fieldToFilter)
      }
    }
  })
  return filteredItems
}

// This file provides the current map context - it stores the list of locations
// together with the filtered locations
const MapStateContext = createContext<MapStateContextProps | undefined>(undefined)

// TODO: write this
const fetchMapInformation = async (mapID: number) => MAP

interface updateStateAction extends Action {
  payload: filterValues
  type: filterType
  fieldName: string
}

// Everytime an action is dispatched, find the
// key that has been updated
// and set it accordingly
type filterOptionStates = Dictionary<filterValues | Dictionary<boolean>>
const filterReducer = (prevState: filterOptionStates, action: updateStateAction) => {
  const { type, payload, fieldName } = action
  const newState = { ...prevState }
  switch (type) {
    case 'oneOf':
      newState[fieldName] = payload
      return newState
    case 'manyOf': {
      // if it previously existed - remove it
      // otherwise, add it
      const checkboxValue = payload as string
      const oldManyOfValue = newState[fieldName] as Dictionary<boolean> ?? {}
      if (oldManyOfValue === {} || oldManyOfValue[checkboxValue]) {
        oldManyOfValue[checkboxValue] = false
      } else {
        oldManyOfValue[checkboxValue] = true
      }
      newState[fieldName] = oldManyOfValue
      return newState
    }
    case 'range':
      newState[fieldName] = payload
      return newState
  }
  // should never reach here but satisfy eslint
  return prevState
}

interface ProviderProps {
    children: ReactChild | ReactChildren
}

const MapStateProvider = ({ children }: ProviderProps) => {
  // TODO: figure out how to trigger updates for mapID
  const [map, setMap] = useState<null | Map>(null)
  // subject to change
  const [filterOptions, dispatch] = useReducer(
    filterReducer,
    {},
  )

  const filteredLocations = (map && computeFilteredMapItems(map, filterOptions)) || []
  console.log(filteredLocations)

  // every time map changes, refetch from backend with the mapID
  useEffect(() => {
    const initialiseMapStates = async () => {
      const initialMapData = await fetchMapInformation(MAP.id)
      setMap(initialMapData)
    }

    if (!map) {
      initialiseMapStates()
    }
  }, [map])

  return (
    <MapStateContext.Provider value={{
      map,
      filterOptions,
      filteredLocations,
      dispatch,
    }}
    >
      {children}
    </MapStateContext.Provider>
  )
}

const useMapState = () => {
  const context = useContext(MapStateContext)
  if (context === undefined) {
    throw new Error(
      'useMapState must be used within a MapStateProvider',
    )
  }
  return context
}

export { useMapState, MapStateProvider }
