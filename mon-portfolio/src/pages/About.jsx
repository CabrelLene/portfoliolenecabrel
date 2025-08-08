import { Box, Heading, Text, Stack } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionStack = motion(Stack)

export default function About() {
  return (
    <MotionStack
      spacing="6" p="8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
    >
      <Heading>À propos de moi</Heading>
      <Text>
        Je suis un développeur FullStack avec une passion pour les technologies modernes :
      </Text>
      <Box as="ul" pl="6">
        <Text as="li">React, Vite, Chakra UI</Text>
        <Text as="li">Node.js, Express, MongoDB</Text>
        <Text as="li">PWA, Service Workers, VitePWA</Text>
        <Text as="li">Animations avec Framer Motion</Text>
      </Box>
    </MotionStack>
  )
}
