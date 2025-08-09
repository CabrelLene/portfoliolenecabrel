// src/sections/ProjectsTeaser.jsx
import React from 'react'
import { Box, Heading, Text, SimpleGrid, Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import ProjectCard3D from '../components/ProjectCard3D'
import { FaArrowRight } from 'react-icons/fa'
import '@lottiefiles/lottie-player'

const MotionBox = motion(Box)
const MotionButton = motion(Button)

export default function ProjectsTeaser() {
  const variants = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.12 * i, duration: 0.6, ease: 'easeOut' },
    }),
  }

  return (
    <Box as="section" py={{ base: 16, md: 24 }} px={{ base: 6, md: 10 }} bg="rgba(0,0,0,0.25)">
      <Box textAlign="center" mb={{ base: 10, md: 12 }}>
        <Heading
          as="h2"
          size={{ base: '2xl', md: '3xl' }}
          mb="3"
          bgGradient="linear(to-r, #00ffff, #e91e63, #7C4DFF)"
          bgClip="text"
        >
          Projets récents
        </Heading>
        <Text color="whiteAlpha.800" maxW="3xl" mx="auto">
          Un aperçu de mes apps mobiles & web, avec un focus performance, UX et animations.
        </Text>
      </Box>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={8}
        maxW="1280px"
        mx="auto"
        sx={{ perspective: '1200px' }}
      >
        <MotionBox custom={0} variants={variants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <ProjectCard3D
            title="Santé+"
            description="Application santé cross-platform : prise de RDV, suivi d’activités, notifications push."
            tags={['React Native', 'GraphQL', 'Expo', 'Firebase']}
            href="/projects/sante-plus"
            cover="/images/projects/sante.jpg"              // optionnel (supprime si tu n'as pas l'image)
            lottieSrc="/lotties/sante.json"                 // ✅ local
            accent="#00ffff"
          />
        </MotionBox>

        <MotionBox custom={1} variants={variants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <ProjectCard3D
            title="MarketGo"
            description="Marketplace mobile-first avec paiements, catalogue & recherche temps réel."
            tags={['Flutter', 'Stripe', 'Supabase']}
            href="/projects/market-go"
            cover="/images/projects/market.jpg"
            lottieSrc="/lotties/market.json"                // ✅ local
            accent="#e91e63"
          />
        </MotionBox>

        <MotionBox custom={2} variants={variants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <ProjectCard3D
            title="EduTrack"
            description="Plateforme d’apprentissage avec suivi offline, synchro et analytics."
            tags={['Ionic', 'Capacitor', 'Redux']}
            href="/projects/edutrack"
            cover="/images/projects/edu.jpg"
            lottieSrc="/lotties/edu.json"                   // ✅ local
            accent="#7C4DFF"
          />
        </MotionBox>
      </SimpleGrid>

      <Box textAlign="center" mt={{ base: 12, md: 16 }}>
        <MotionButton
          as="a"
          href="/projects"
          size="lg"
          rightIcon={<FaArrowRight />}
          colorScheme="teal"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Voir tous les projets
        </MotionButton>
      </Box>
    </Box>
  )
}
