import React from 'react'
import {
  VStack, Container, Flex, Box, Input, useControllableState, HStack,
} from '@chakra-ui/react'
import _ from 'lodash'

import { useMapState } from '../../contexts /MapContext'
import { MapItem } from '../../types'
import { Card } from '../../components/Card'

import { MapPage } from '../Map'

import Drawer from './components/Drawer'

// workaround for typescript complaints
type eventType = {
    target: {
        value: string | searchableFields
    }
}

type searchableFields = 'title' | 'tags'

// extract out fields
// then get matching and return
const filterByField = (
  filteredField: searchableFields,
  searchedText: string,
  mapItems: MapItem[],
) => _.filter(mapItems, ((mapObject) => ((filteredField === 'title')
  ? _.toLower(mapObject[filteredField]).includes(_.toLower(searchedText))
  : _.some(mapObject[filteredField],
    (tag) => tag.includes(searchedText))))) // searching on tags now

// top most level component co-ordinating state
const EditPage = () => {
  // controls the searching of text
  // TODO: shift to hook
  const [searchedText, setSearchedText] = useControllableState({ defaultValue: '' })
  const handleUserInput = (event: eventType) => setSearchedText(event.target.value)
  const { filteredLocations, filterOptions } = useMapState()

  const [searchedField] = useControllableState<searchableFields>({
    defaultValue: 'title',
  })

  console.log('in edit page', filteredLocations)
  const newFilteredLocations = filterByField(searchedField, searchedText, filteredLocations)

  return (
  // consists of a leftpanel and a right panel
    <Flex direction="row" pt="12px">
      {/* left panel holds card + controls stateful logic */}
      <Container maxW="30%" py="40px" bg="#F6F9FD" maxH="80vh" overflow="scroll">
        <VStack spacing="30px">
          <HStack alignSelf="flex-start" spacing={2}>
            <Drawer />
            <Input
              placeholder="search!"
              value={searchedText}
              onChange={handleUserInput}
            />
          </HStack>
          {newFilteredLocations.map(({
            title, subtitle, body, tags,
          }) => (
            <Card title={title} subtitle={subtitle} body={body} tags={tags} />
          ))}
        </VStack>
      </Container>
      <Box width="100%">
        <MapPage points={newFilteredLocations.map(
          ({ meta: { lat, long } }) => ({ lat, long }),
        )}
        />
      </Box>
    </Flex>
  )
}

export { EditPage }
