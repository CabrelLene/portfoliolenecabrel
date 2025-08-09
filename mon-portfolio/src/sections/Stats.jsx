import React from 'react'
import { Box, SimpleGrid, Heading } from '@chakra-ui/react'
import StatCounter from '../components/StatCounter'

export default function Stats() {
  return (
    <Box as="section" py={{ base: 16, md: 24 }} px={{ base: 6, md: 10 }} bg="rgba(0,0,0,0.25)">
      <Heading
        textAlign="center"
        size={{ base: '2xl', md: '3xl' }}
        mb={{ base: 10, md: 12 }}
        bgGradient="linear(to-r, #00ffff, #e91e63, #7C4DFF)"
        bgClip="text"
      >
        Quelques chiffres
      </Heading>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} maxW="1200px" mx="auto">
        <StatCounter to={24}  label="Apps livrées" />
        <StatCounter to={6}   label="Années d’expérience" />
        <StatCounter to={18}  label="Clients satisfaits" />
        <StatCounter to={99}  label="Taux de dispo" suffix="%" />
      </SimpleGrid>
    </Box>
  )
}
