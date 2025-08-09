// src/pages/Home.jsx
import React, { useEffect, useState } from 'react'
import { Box, Heading, Text, Button, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { keyframes } from '@emotion/react'
import { FaArrowRight, FaChevronDown } from 'react-icons/fa'

const MotionBox = motion(Box)
const MotionButton = motion(Button)

/* ---------- Animations CSS (Emotion) ---------- */
const floatSlow = keyframes`
  0%   { transform: translateY(0px) rotate(0deg); }
  50%  { transform: translateY(-18px) rotate(10deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`
const floatMedium = keyframes`
  0%   { transform: translateY(0px) }
  50%  { transform: translateY(-12px) }
  100% { transform: translateY(0px) }
`
const shine = keyframes`
  0%   { background-position: 0% 50% }
  100% { background-position: 100% 50% }
`
const bounce = keyframes`
  0%, 100% { transform: translateY(0) }
  50%      { transform: translateY(-8px) }
`

/* ---------- Typewriter minimal (sans lib) ---------- */
function Typewriter({
  words = [],
  typingSpeed = 110,
  holdTime = 1400,
  loop = true,
}) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const word = words[i % words.length] || ''
    let t
    if (!del) {
      t = setTimeout(() => setText(word.slice(0, text.length + 1)), typingSpeed)
      if (text === word) t = setTimeout(() => setDel(true), holdTime)
    } else {
      t = setTimeout(() => setText(word.slice(0, text.length - 1)), typingSpeed / 2)
      if (text === '') {
        setDel(false)
        setI((v) => v + 1)
        if (!loop && i + 1 >= words.length) clearTimeout(t)
      }
    }
    return () => clearTimeout(t)
  }, [text, del, i, words, typingSpeed, holdTime, loop])

  return <span>{text}</span>
}

/* ---------- Petit composant “Blob” réutilisable ---------- */
function Blob({ bg, size = 320, top, left, right, bottom, anim = floatSlow }) {
  return (
    <MotionBox
      position="absolute"
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      w={`${size}px`}
      h={`${size}px`}
      borderRadius="50%"
      filter="blur(80px)"
      opacity={0.45}
      style={{ background: bg }}
      animate={{}}
      sx={{ animation: `${anim} 10s ease-in-out infinite` }}
    />
  )
}

export default function Home() {
  const skills = ['React', 'Node.js', 'TypeScript', 'PWA', 'Animations', 'UX/UI']

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* --- BACKGROUND BLOBS --- */}
      <Blob bg="radial-gradient(circle, #00ffff 0%, rgba(0,255,255,0) 60%)" size={380} top="-80px" left="-80px" />
      <Blob bg="radial-gradient(circle, #e91e63 0%, rgba(233,30,99,0) 60%)"  size={420} bottom="-120px" right="-120px" anim={floatMedium} />
      <Blob bg="radial-gradient(circle, #7C4DFF 0%, rgba(124,77,255,0) 60%)" size={320} top="30%" right="10%" />

      {/* --- CONTENT --- */}
      <MotionBox
        position="relative"
        zIndex={1}
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px={{ base: 6, md: 8 }}
        pt="24"
        minH="100vh"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        {/* Eyebrow / Sur-titre */}
        <MotionBox
          mb={4}
          px={4}
          py={1.5}
          border="1px solid rgba(255,255,255,0.16)"
          borderRadius="full"
          fontSize="sm"
          color="whiteAlpha.800"
          whileHover={{ scale: 1.05 }}
        >
          Développeur FullStack • Montréal
        </MotionBox>

        {/* Titre principal avec “shine” animé */}
        <Heading
          as="h1"
          size={{ base: '3xl', md: '4xl', lg: '5xl' }}
          mb={4}
          lineHeight="1.1"
          bgGradient="linear(to-r, #00ffff, #e91e63, #7C4DFF, #00ffff)"
          bgClip="text"
          sx={{
            backgroundSize: '200% auto',
            animation: `${shine} 6s linear infinite`,
            textShadow: '0 0 18px rgba(0,255,255,0.25)',
          }}
        >
          Hi, je suis CABREL LENE
        </Heading>

        {/* Sous-titre typewriter */}
        <Text fontSize={{ base: 'lg', md: 'xl' }} mb={8} maxW="700px" mx="auto" color="whiteAlpha.900">
          <Typewriter
            words={[
              'Je conçois des expériences Web immersives.',
              'J’orchestre des interfaces fluides et performantes.',
              'Je transforme des idées en produits élégants.',
            ]}
            typingSpeed={95}
            holdTime={1200}
            loop
          />
        </Text>

        {/* Badges compétences flottants */}
        <HStack spacing={3} wrap="wrap" justify="center" mb={10}>
          {skills.map((s, idx) => (
            <MotionBox
              key={s}
              px={3}
              py={1.5}
              borderRadius="full"
              bg="rgba(255,255,255,0.06)"
              border="1px solid rgba(255,255,255,0.14)"
              fontSize="sm"
              color="whiteAlpha.900"
              whileHover={{ y: -6, scale: 1.05 }}
              sx={{ animation: `${floatMedium} ${6 + idx}s ease-in-out infinite` }}
            >
              {s}
            </MotionBox>
          ))}
        </HStack>

        {/* CTA avec halo animé */}
        <MotionButton
          as="a"
          href="/projects"
          size="lg"
          colorScheme="teal"
          rightIcon={<FaArrowRight />}
          whileHover={{
            scale: 1.06,
            boxShadow: '0 0 32px rgba(0,255,255,0.45), 0 0 60px rgba(233,30,99,0.25)',
          }}
          whileTap={{ scale: 0.95 }}
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(120px 120px at var(--mx,50%) var(--my,50%), rgba(0,255,255,0.25), transparent 60%)',
            transition: 'opacity .25s',
            opacity: 0,
          }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
            e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
            e.currentTarget.style.setProperty('opacity', '1')
          }}
          onMouseEnter={(e) => (e.currentTarget.style.setProperty('opacity', '1'))}
          onMouseLeave={(e) => (e.currentTarget.style.setProperty('opacity', '0'))}
        >
          Voir mes projets
        </MotionButton>

        {/* Indicateur de scroll */}
        <Box
          position="absolute"
          bottom="6"
          color="whiteAlpha.700"
          fontSize="xl"
          sx={{ animation: `${bounce} 1.6s ease-in-out infinite` }}
        >
          <FaChevronDown />
        </Box>
      </MotionBox>
    </Box>
  )
}
