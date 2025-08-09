// src/components/Navbar.jsx
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Flex, HStack, Link, IconButton } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode' // garde ce hook (compatible avec ta version)
import { FaSun, FaMoon } from 'react-icons/fa'

const links = [
  { path: '/',          label: 'Accueil' },
  { path: '/about',     label: 'À propos' },
  { path: '/projects',  label: 'Projets' },
  { path: '/formation', label: 'Formation' }, // ✅ nouvel onglet
  { path: '/contact',   label: 'Contact' },
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
        {links.map((link) => {
          const isActive = pathname === link.path
          return (
            <Link
              as={RouterLink}
              key={link.path}
              to={link.path}
              fontWeight={isActive ? 'bold' : 'normal'}
              color={isActive ? 'teal.300' : 'whiteAlpha.900'}
              borderBottom={isActive ? '2px solid' : '2px solid transparent'}
              borderColor={isActive ? 'teal.300' : 'transparent'}
              _hover={{ color: 'teal.200' }}
              aria-current={isActive ? 'page' : undefined}
            >
              {link.label}
            </Link>
          )
        })}
      </HStack>

      <IconButton
        ml="auto"
        aria-label="Toggle theme"
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        variant="ghost"
        color="whiteAlpha.900"
        _hover={{ bg: 'whiteAlpha.200' }}
      />
    </Flex>
  )
}
