import React from 'react'
import {
  VStack, Container, Flex, Box, Input, Select, useControllableState, HStack,
} from '@chakra-ui/react'
import _ from 'lodash'

import MAP from '../../constants/map'
import { MapItem } from '../../types'

// higher up components
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
  ? mapObject[filteredField].includes(searchedText)
  : _.some(mapObject[filteredField],
    (tag) => tag.includes(searchedText))))) // searching on tags now

// top most level component co-ordinating state
const EditPage = () => {
  // TODO: extract this out later into a context/custom hook to simplify
  // controls the searching of text
  const [searchedText, setSearchedText] = useControllableState({ defaultValue: '' })
  const handleUserInput = (event: eventType) => setSearchedText(event.target.value)

  const [searchedField] = useControllableState<searchableFields>({
    defaultValue: 'title',
  })

  const filteredLocations = filterByField(searchedField, searchedText, MAP.points)

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
          {filteredLocations.map(({
            title, subtitle, body, tags,
          }) => (
            <Card title={title} subtitle={subtitle} body={body} tags={tags} />
          ))}
        </VStack>
      </Container>
      <Box width="100%">
        <MapPage points={filteredLocations.map(({ meta: { lat, long } }) => ({ lat, long }))} />
      </Box>
    </Flex>
  )
}

export { EditPage }
