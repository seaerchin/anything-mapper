import React from 'react'
import {
  Box, Image, Tag, Text,
} from '@chakra-ui/react'

type CardProps = {
  title: string
  subtitle: string
  imageURL?: string
  body: string[]
  tags?: string[]
  meta: {
    lat: number,
    long: number
  }
}

const Card = ({
  title, subtitle, imageURL, body, tags, meta,
}: CardProps) => (
  <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
}

export { Card }
