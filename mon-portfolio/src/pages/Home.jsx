// src/pages/Home.jsx
import React, { useEffect, useState } from 'react'
import { Box, Heading, Text, Button, HStack } from '@chakra-ui/react'
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion'
import { keyframes } from '@emotion/react'
import { FaArrowRight, FaChevronDown } from 'react-icons/fa'
import '@lottiefiles/lottie-player'

import AuroraOverlay from '../components/AuroraOverlay'
import CursorGlow from '../components/CursorGlow'
import IntroLoader from '../components/IntroLoader'
import { confettiBurst } from '../utils/confetti'
import ProjectsTeaser from '../sections/ProjectsTeaser'

const MotionBox    = motion(Box)
const MotionButton = motion(Button)

/* ---------- Animations CSS ---------- */
const shine = keyframes`
  from{background-position:0% 50%} to{background-position:200% 50%}
`
const float = keyframes`
  0%{transform:translateY(0)}50%{transform:translateY(-14px)}100%{transform:translateY(0)}
`
const bounce = keyframes`
  0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}
`

/* ---------- Typewriter minimal (sans lib) ---------- */
function Typewriter({ words = [], typingSpeed = 95, holdTime = 1200, loop = true }) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const current = words[i % words.length] || ''
    let t
    if (!del) {
      t = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed)
      if (text === current) t = setTimeout(() => setDel(true), holdTime)
    } else {
      t = setTimeout(() => setText(current.slice(0, text.length - 1)), typingSpeed / 2)
      if (text === '') {
        setDel(false); setI(v => v + 1)
        if (!loop && i + 1 >= words.length) clearTimeout(t)
      }
    }
    return () => clearTimeout(t)
  }, [text, del, i, words, typingSpeed, holdTime, loop])

  return <span>{text}</span>
}

export default function Home() {
  /* Progress bar de scroll */
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  /* Parallax tilt du hero */
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rotateX = useTransform(my, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-8, 8])
  const onHeroMove = e => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  /* Effet magnétique sur le CTA */
  const bx = useMotionValue(0), by = useMotionValue(0)
  const onBtnMove = e => {
    const r = e.currentTarget.getBoundingClientRect()
    bx.set((e.clientX - (r.left + r.width / 2)) * 0.08)
    by.set((e.clientY - (r.top + r.height / 2)) * 0.08)
  }
  const onBtnLeave = () => { bx.set(0); by.set(0) }

  /* Stagger des badges */
  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1, y: 0,
      transition: { type: 'spring', stiffness: 320, damping: 20 }
    },
  }

  const skills = ['React Native', 'Flutter', 'iOS', 'Android', 'PWA', 'UX/UI']

  return (
    <>
      {/* Loader de bienvenue */}
      <IntroLoader />

      {/* Halo du curseur (léger) */}
      <CursorGlow />

      {/* Progress bar globale */}
      <MotionBox
        position="fixed" top="0" left="0" right="0" h="3px" zIndex="1000"
        style={{ scaleX, transformOrigin: '0% 50%' }}
        bgGradient="linear(to-r,#00ffff,#e91e63,#7C4DFF)"
      />

      <Box position="relative" minH="100vh" overflow="hidden">
        {/* Fond aurora animé */}
        <AuroraOverlay />

        {/* === HERO === */}
        <MotionBox
          position="relative" zIndex={1} minH="100vh"
          display="flex" flexDir="column" alignItems="center" justifyContent="center"
          px={{ base: 6, md: 8 }} pt="24" textAlign="center"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ rotateX, rotateY, transformStyle:'preserve-3d' }}
          onMouseMove={onHeroMove}
        >
          {/* 🎞 Lottie principale */}
          <Box
            as="lottie-player"
            src="https://assets4.lottiefiles.com/packages/lf20_1pxqjqps.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            style={{ width: 180, height: 180, marginBottom: 10 }}
            onMouseEnter={(e) => e.currentTarget.setSpeed?.(1.6)}
            onMouseLeave={(e) => e.currentTarget.setSpeed?.(1)}
          />

          {/* Eyebrow */}
          <MotionBox mb={4} px={4} py={1.5} border="1px solid rgba(255,255,255,0.16)"
            borderRadius="full" fontSize="sm" color="whiteAlpha.800" whileHover={{ scale:1.05 }}>
            Développeur FullStack • Mobile • Montréal
          </MotionBox>

          {/* Titre “shine” */}
          <Heading
            as="h1" size={{ base:'3xl', md:'4xl', lg:'5xl' }} mb={4} lineHeight="1.1"
            bgGradient="linear(to-r,#00ffff,#e91e63,#7C4DFF,#00ffff)" bgClip="text"
            sx={{ backgroundSize:'200% auto', animation:`${shine} 6s linear infinite`,
                  textShadow:'0 0 18px rgba(0,255,255,0.25)' }}
          >
            Hi, je suis CABREL LENE
          </Heading>

          {/* Sous-titre typewriter */}
          <Text fontSize={{ base:'lg', md:'xl' }} mb={8} maxW="760px" mx="auto" color="whiteAlpha.900">
            <Typewriter
              words={[
                'Apps mobiles performantes (iOS • Android).',
                'Expériences Web & Mobile immersives.',
                'Intégrations API robustes & scalables.',
              ]}
              typingSpeed={95} holdTime={1200} loop
            />
          </Text>

          {/* Badges compétences (stagger) */}
          <MotionBox
            as={HStack}
            spacing={3}
            wrap="wrap"
            justify="center"
            mb={10}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            {skills.map((s, idx) => (
              <MotionBox
                key={s}
                variants={itemVariants}
                px={3} py={1.5}
                borderRadius="full"
                bg="rgba(255,255,255,0.06)"
                border="1px solid rgba(255,255,255,0.14)"
                fontSize="sm"
                color="whiteAlpha.900"
                sx={{ animation: `${float} ${6 + idx}s ease-in-out infinite` }}
                whileHover={{ y: -6, scale: 1.05 }}
              >
                {s}
              </MotionBox>
            ))}
          </MotionBox>

          {/* CTA magnétique + confetti */}
          <MotionButton
            as="a" href="/projects" size="lg" colorScheme="teal" rightIcon={<FaArrowRight />}
            whileHover={{ scale:1.06, boxShadow:'0 0 32px rgba(0,255,255,0.45), 0 0 60px rgba(233,30,99,0.25)' }}
            whileTap={{ scale:0.95 }}
            onMouseMove={onBtnMove} onMouseLeave={onBtnLeave}
            onClick={(e) => confettiBurst(e.clientX, e.clientY)}
            style={{ x: bx, y: by }}
            position="relative" overflow="hidden"
            _before={{
              content:'""', position:'absolute', inset:0,
              background:'radial-gradient(140px 140px at var(--mx,50%) var(--my,50%), rgba(0,255,255,0.22), transparent 60%)',
              opacity:0, transition:'opacity .25s',
            }}
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
              e.currentTarget.style.setProperty('opacity', '1')
            }}
            onPointerLeave={(e) => e.currentTarget.style.setProperty('opacity', '0')}
          >
            Voir mes projets
          </MotionButton>

          {/* Indicateur de scroll */}
          <Box position="absolute" bottom="6" color="whiteAlpha.700" fontSize="xl" sx={{ animation:`${bounce} 1.6s ease-in-out infinite` }}>
            <FaChevronDown />
          </Box>
        </MotionBox>

        {/* === SECTION PROJETS (TEASER) === */}
        <ProjectsTeaser />
      </Box>
    </>
  )
}
