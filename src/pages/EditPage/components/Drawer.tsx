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

import { useMapState } from '../../../contexts /MapContext'

import { RangeSlider } from '../../../components/Slider'

import {
  Dictionary, filterType, filterMappings, filterValues,
} from '../../../types'

// the component to be rendered is a discriminated union
// based on the filterFieldType
type ComponentProps = {
  fieldInformation: filterMappings
  onChange: (payload: filterValues, type: filterType) => void
  displayValue: filterValues | Dictionary<boolean>
}

// NOTE: we need to handle state but currently this isn't done
// i want ot invoke like so
// onChange = (event) => {onChange(event.target.value)}
// so my target has to be bound prior to this
const Component = ({ fieldInformation, onChange, displayValue }: ComponentProps) => {
  switch (fieldInformation.fieldType) {
    case 'range': {
      const value = displayValue as number[]
      return (
        <RangeSlider
          onChange={(event) => onChange(event, 'range')}
          low={value ? value[0] : fieldInformation.default[0]}
          high={value ? value[1] : fieldInformation.default[1]}
        />
      )
    }
    case 'oneOf': {
      // NOTE: this might cause state bugs
      const value = displayValue as string
      return (
        <Select
          value={value}
          onChange={(event) => onChange(event.target.value, 'oneOf')}
        >
          {fieldInformation.default.map(
            (textOption) => <option value={textOption}>{textOption}</option>,
          )}
        </Select>
      )
    }
    case 'manyOf': {
      const checkboxValues = displayValue as Dictionary<boolean> ?? {}
      return (
        <Wrap>
          <HStack>
            {fieldInformation.default.map(
              (textOption) => (
                <WrapItem>
                  <Checkbox
                    isChecked={!!checkboxValues[textOption]}
                    value={textOption}
                    onChange={() => onChange(textOption, 'manyOf')}
                  >
                    <option value={textOption}>{textOption}</option>
                  </Checkbox>
                </WrapItem>
              ),
            )}
          </HStack>
        </Wrap>
      )
    }
  }
  // either ts or eslint complains.
  return null
}

// drawer maps the current search state back to the provider
const Drawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    map, dispatch, filterOptions,
  } = useMapState()
  const btnRef = useRef(null)
  const defaultFilterValues = map?.defaultFilterValues

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
                          {/* title is what i want */}
                          <Component
                            displayValue={filterOptions[title]}
                            fieldInformation={component}
                            onChange={(payload, type) => dispatch({
                              payload,
                              type,
                              fieldName: title,
                            })}
                          />
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
