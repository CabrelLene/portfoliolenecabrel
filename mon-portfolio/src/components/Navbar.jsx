// src/components/Navbar.jsx
import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
  Box,
  Flex,
  HStack,
  VStack,
  Link,
  IconButton,
  useDisclosure,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode' // ✅ on garde ce hook (compat assuré)
import { motion, AnimatePresence } from 'framer-motion'
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'
import { useEffect, useMemo, useState } from 'react'

const MotionBox = motion(Box)

const links = [
  { path: '/',          label: 'Accueil' },
  { path: '/about',     label: 'À propos' },
  { path: '/projects',  label: 'Projets' },
  { path: '/formation', label: 'Formation' },
  { path: '/contact',   label: 'Contact' },
]

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { pathname } = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Style helpers
  const bgGlass = useMemo(
    () =>
      colorMode === 'light'
        ? 'rgba(255,255,255,0.75)'
        : 'rgba(12,12,16,0.55)',
    [colorMode]
  )
  const borderCol = useMemo(
    () => (colorMode === 'light' ? 'blackAlpha.200' : 'whiteAlpha.200'),
    [colorMode]
  )

  return (
    <>
      <Flex
        as="nav"
        position="fixed"
        top="0"
        insetX="0"
        h="64px"
        align="center"
        px={{ base: 4, md: 8 }}
        zIndex="banner"
        // Glass + blur + shadow on scroll
        bg={bgGlass}
        backdropFilter="saturate(140%) blur(12px)"
        borderBottom="1px solid"
        borderColor={borderCol}
        boxShadow={scrolled ? '0 4px 24px rgba(0,0,0,.18)' : 'none'}
        // Safe area iOS
        pt="env(safe-area-inset-top)"
      >
        {/* Logo / Marque */}
        <RouterLink to="/" aria-label="Retour à l’accueil">
          <HStack spacing="3">
            <MotionBox
              w="34px"
              h="34px"
              borderRadius="md"
              bgGradient="linear(to-br, teal.400, purple.500)"
              border="1px solid rgba(255,255,255,0.2)"
              display="grid"
              placeItems="center"
              whileHover={{ rotate: 6, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              overflow="hidden"
            >
              <Text
                fontWeight="extrabold"
                fontSize="sm"
                color="white"
                letterSpacing="wide"
                lineHeight="1"
              >
                CL
              </Text>
            </MotionBox>
            <Box
              fontWeight="bold"
              fontSize={{ base: 'sm', md: 'md' }}
              bgGradient="linear(to-r, teal.300, pink.400)"
              bgClip="text"
            >
              Cabrel Lene
            </Box>
          </HStack>
        </RouterLink>

        <Spacer />

        {/* Liens Desktop */}
        <HStack
          as="ul"
          spacing="6"
          display={{ base: 'none', md: 'flex' }}
          align="center"
          listStyleType="none"
        >
          {links.map((link) => {
            const isActive = pathname === link.path
            return (
              <Box as="li" key={link.path} position="relative">
                <Link
                  as={RouterLink}
                  to={link.path}
                  fontWeight={isActive ? 'bold' : 'medium'}
                  color={isActive ? 'teal.300' : 'whiteAlpha.900'}
                  _hover={{ color: 'teal.200' }}
                  aria-current={isActive ? 'page' : undefined}
                  px="1"
                >
                  {link.label}
                </Link>
                {/* Underline animée */}
                <MotionBox
                  position="absolute"
                  left="0"
                  right="0"
                  bottom="-6px"
                  height="2px"
                  borderRadius="2px"
                  bgGradient="linear(to-r, teal.300, pink.400)"
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  style={{ transformOrigin: 'left center' }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                />
              </Box>
            )
          })}
        </HStack>

        {/* Toggle thème */}
        <IconButton
          aria-label="Basculer le thème"
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          variant="ghost"
          color="whiteAlpha.900"
          _hover={{ bg: 'whiteAlpha.200' }}
          ml={{ base: 0, md: 4 }}
        />

        {/* Burger Mobile */}
        <IconButton
          display={{ base: 'inline-flex', md: 'none' }}
          aria-label="Ouvrir le menu"
          icon={<FaBars />}
          onClick={onOpen}
          variant="ghost"
          color="whiteAlpha.900"
          _hover={{ bg: 'whiteAlpha.200' }}
          ml="2"
        />
      </Flex>

      {/* Bottom gradient accent */}
      <Box
        position="fixed"
        top="64px"
        insetX="0"
        h="1px"
        bgGradient="linear(to-r, transparent, teal.400, pink.400, transparent)"
        opacity={0.6}
        pointerEvents="none"
        zIndex="banner"
      />

      {/* Overlay Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            key="mobile-menu"
            position="fixed"
            inset="0"
            zIndex="modal"
            bg="rgba(10, 10, 14, 0.75)"
            backdropFilter="blur(14px) saturate(140%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MotionBox
              position="absolute"
              top="env(safe-area-inset-top)"
              right="0"
              w="85%"
              maxW="360px"
              h="100%"
              bg="gray.900"
              borderLeft="1px solid rgba(255,255,255,0.1)"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              boxShadow="0 12px 48px rgba(0,0,0,.4)"
            >
              <Flex align="center" h="64px" px="4">
                <Text fontWeight="bold">Menu</Text>
                <Spacer />
                <IconButton
                  aria-label="Fermer le menu"
                  icon={<FaTimes />}
                  variant="ghost"
                  onClick={onClose}
                />
              </Flex>

              <VStack as="nav" align="stretch" spacing="1" px="2" py="2">
                {links.map((link, i) => {
                  const isActive = pathname === link.path
                  return (
                    <MotionBox
                      key={link.path}
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Link
                        as={RouterLink}
                        to={link.path}
                        onClick={onClose}
                        display="block"
                        px="3.5"
                        py="3"
                        borderRadius="md"
                        fontWeight={isActive ? 'bold' : 'medium'}
                        color={isActive ? 'teal.300' : 'whiteAlpha.900'}
                        _hover={{ bg: 'whiteAlpha.100' }}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    </MotionBox>
                  )
                })}
              </VStack>

              {/* Accent bas */}
              <Box
                mt="auto"
                h="2px"
                bgGradient="linear(to-r, teal.400, pink.400)"
                opacity={0.8}
              />
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  )
}
