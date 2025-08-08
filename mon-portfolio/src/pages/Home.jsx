// src/pages/Home.jsx
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'

const MotionBox    = motion(Box)
const MotionButton = motion(Button)

export default function Home() {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      textAlign="center"
      pt="24"
      px="4"
      minH="calc(100vh - 80px)"
    >
      <Heading
        as="h1"
        size="4xl"
        bgGradient="linear(to-r, neon.accent1, neon.accent2)"
        bgClip="text"
        mb="6"
      >
        Hi, je suis [CABREL LENE]
      </Heading>

      <Text fontSize="xl" mb="8" maxW="600px" mx="auto">
        Développeur FullStack spécialisé dans les expériences Web immersives et animées.
      </Text>

      <MotionButton
        rightIcon={<FaArrowRight />}
        colorScheme="teal"
        size="lg"
        whileHover={{ scale: 1.05 }}
        as="a"
        href="/projects"
      >
        Voir mes projets
      </MotionButton>
    </MotionBox>
  )
}
