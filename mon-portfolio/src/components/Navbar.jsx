// src/components/Navbar.jsx
import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
  Flex,
  HStack,
  Link,
  IconButton,
} from '@chakra-ui/react'
// <- on importe useColorMode depuis le package color-mode
import { useColorMode } from '@chakra-ui/color-mode'
import { FaSun, FaMoon } from 'react-icons/fa'

const links = [
  { path: '/',         label: 'Accueil' },
  { path: '/about',    label: 'À propos' },
  { path: '/projects', label: 'Projets' },
  { path: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { pathname } = useLocation()

  return (
    <Flex
      as="nav"
      position="fixed"
      top="0"
      w="100%"
      bg="gray.800"
      px="8"
      py="4"
      align="center"
      zIndex="docked"
    >
      <HStack spacing="8">
        {links.map((link) => (
          <Link
            as={RouterLink}
            key={link.path}
            to={link.path}
            fontWeight={pathname === link.path ? 'bold' : 'normal'}
          >
            {link.label}
          </Link>
        ))}
      </HStack>

      <IconButton
        ml="auto"
        aria-label="Toggle theme"
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Flex>
  )
}
