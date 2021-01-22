import React, { useRef } from 'react'
import {
  Drawer as ChakraDrawer,
  IconButton,
  Input,
  DrawerBody,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

import { RangeSlider } from '../../../components/Slider'

import { Dictionary, filterField } from '../../../types'

// drawer maps the current search state back to the provider
// TODO: connect this to an actual provider
const Drawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

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
              <Input placeholder="Title" />
              <RangeSlider low={0} high={100} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </ChakraDrawer>
    </>
  )
}

export default Drawer
