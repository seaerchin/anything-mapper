import React from 'react'
import {
  Box,
  Tabs,
  TabList,
  Tab,
} from '@chakra-ui/react'

const OptionsBar = () => (
  <Box
    pb="2px"
    boxShadow="md"
    display="flex"
    flexDirection={{ base: 'column', md: 'row' }}
    alignItems={{ base: 'start', md: 'center' }}
    justifyContent="space-evenly"
  >
    <Tabs>
      <TabList>
        <Tab>Edit</Tab>
        <Tab>Preview</Tab>
        <Tab>Share</Tab>
      </TabList>
    </Tabs>
  </Box>
)

export { OptionsBar }
