import React from 'react'
import {
  Box, Image, Tag,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,

} from '@chakra-ui/react'
import _ from 'lodash'

import { MapItem } from '../../types'

const accordionItem = (title: string, body: string) => (
  <AccordionItem>
    <AccordionButton pl={2}>
      <Box flex="1" textAlign="left">
        {title}
      </Box>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel pl={2} pb={4} textAlign="left">
      {body}
    </AccordionPanel>
  </AccordionItem>
)

const Card = ({
  title, subtitle, imageURL, body, tags, meta,
}: MapItem) => (
  <Box
    maxW="sm"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="md"
  >
    <Image src={imageURL} />

    <Box p="6">
      <Box
        pl={2}
        textAlign="left"
        mt="1"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        isTruncated
      >
        {title}
        <br />
        {subtitle}
      </Box>
      <Accordion allowToggle>
        {_.map(body, (value, key) => accordionItem(key, value))}
      </Accordion>
      <Box d="flex" mt="2" alignItems="center">
        {
          tags?.map((tagDescription) => (
            <Tag m={1}>
              {tagDescription}
            </Tag>
          ))
        }
      </Box>
    </Box>
  </Box>
)

Card.defaultProps = {
  imageURL: 'https://bit.ly/2Z4KKcF',
  tags: [],
  meta: {},
}

export { Card }
