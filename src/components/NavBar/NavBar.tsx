import React from 'react'
import {
  Button,
  Box,
  Text,
} from '@chakra-ui/react'

// const { token, user, logout } = useAuth()
// TODO: add hook with method signature like above
const token = false
const onClick = () => {}

type NavBarProps = {
  title?: string
}

const NavBar = ({ title = 'AnythingMapper' }: NavBarProps) => (
  <Box
    boxShadow="md"
    h="80px"
    px="40px"
    as="nav"
    display="flex"
    flexDirection={{ base: 'column', md: 'row' }}
    alignItems={{ base: 'start', md: 'center' }}
    justifyContent="space-between"
  >
    <Button color="#000000" variant="link">
      Back
    </Button>
    <Text as="b" fontSize="lg" placeSelf="center" textStyle="bold">
      {title}
    </Text>
    <Button color="#000000" variant="link" onClick={onClick}>
      {token ? 'Log Out' : 'Login/Register'}
    </Button>
  </Box>
)

NavBar.defaultProps = {
  title: 'AnythingMapper',
}

export { NavBar }
