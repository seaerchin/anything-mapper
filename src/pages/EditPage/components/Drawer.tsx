import React, { useRef } from 'react'
import {
  Drawer as ChakraDrawer,
  Select,
  IconButton,
  DrawerBody,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  Wrap,
  HStack,
  VStack,
  Checkbox,
  WrapItem,
  AccordionPanel,
  Box,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import _ from 'lodash'

import { RangeSlider } from '../../../components/Slider'

import { Dictionary, filterMappings } from '../../../types'
import MAP from '../../../constants/map'

// the component to be rendered is a discriminated union
// based on the filterFieldType
type ComponentProps = {
  fieldInformation: filterMappings
}

// NOTE: we need to handle state but currently this isn't done
const Component = ({ fieldInformation }: ComponentProps) => {
  switch (fieldInformation.fieldType) {
    case 'range':
      return <RangeSlider low={fieldInformation.default.low} high={fieldInformation.default.high} />
    case 'oneOf':
      return (
        <Select maxW="30%">
          {fieldInformation.default.map(
            (textOption) => <option value={textOption}>{textOption}</option>,
          )}
        </Select>
      )
    case 'manyOf':
      return (
        <Wrap>
          <HStack>
            {fieldInformation.default.map(
              (textOption) => (
                <WrapItem>
                  <Checkbox>
                    <option value={textOption}>{textOption}</option>
                  </Checkbox>
                </WrapItem>
              ),
            )}
          </HStack>
        </Wrap>
      )
  }
  // either ts or eslint complains.
  return null
}

// drawer maps the current search state back to the provider
// TODO: connect this to an actual provider
const Drawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)
  const { defaultFilterValues } = MAP

  return (
    <>
      <IconButton aria-label="menu" ref={btnRef} colorScheme="teal" onClick={onOpen} variant="none" icon={<HamburgerIcon />}>
        Open
      </IconButton>
      <ChakraDrawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search Locations</DrawerHeader>
            <DrawerBody>
              <VStack>
                <Accordion allowToggle w="100%">
                  {(_.map(defaultFilterValues,
                    (component, title) => (
                      <AccordionItem borderStyle="none">
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            {title}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <Component fieldInformation={component} />
                        </AccordionPanel>
                      </AccordionItem>
                    )))}
                </Accordion>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </ChakraDrawer>
    </>
  )
}

export default Drawer
