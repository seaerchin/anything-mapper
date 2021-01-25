type MapItem = {
    title: string
    subtitle: string
    imageURL?: string
    body: Dictionary<string | number | string[]>
    tags?: string[]
    meta: {
      lat: number,
      long: number
    }
  }

type Dictionary<T> = {
  [key: string]: T
}

type Point = {
    lat: number,
    long: number
}

type MapProps = {
    points: Point[]
}

type filterType = 'oneOf' | 'manyOf' | 'range'
type filterValues = string | number[]

type filterMappings = {fieldType: 'oneOf', default: string[]} | {fieldType: 'manyOf', default: string[]} | {fieldType: 'range', default: number[]}

type Map = {
  defaultFilterValues: Dictionary<filterMappings>
  id: number
  points: MapItem[]
  title: string
  description: string
}

// This breaks convention because we want to
// extend this later, which we are unable
// to do with types.
interface Action {
 type: string
}

export type {
  filterValues, filterType, Action, MapItem, MapProps, Point, Dictionary, Map, filterMappings,
}
