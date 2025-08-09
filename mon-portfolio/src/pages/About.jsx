// src/pages/About.jsx
import React, { useEffect, useState } from 'react'
import {
  Box, Heading, Text, SimpleGrid, HStack, VStack, Tag, Button, Divider, chakra
} from '@chakra-ui/react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { keyframes } from '@emotion/react'
import {
  FaReact, FaNode, FaDatabase, FaDocker, FaAws, FaMobileAlt, FaRocket, FaGithub, FaArrowRight
} from 'react-icons/fa'

const MotionBox = motion(Box)
const MotionVStack = motion(VStack)
const MotionHStack = motion(HStack)

/* ---------------- Animations CSS ---------------- */
const spinSlow = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`
const float = keyframes`
  0% { transform: translateY(0) }
  50%{ transform: translateY(-10px) }
  100%{transform: translateY(0) }
`
const shine = keyframes`
  from { background-position: 0% 50% }
  to   { background-position: 200% 50% }
`

/* ---------------- Petit rotateur de mots (sans lib) ---------------- */
function RotatingWords({ words = [], interval = 1400 }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words, interval])
  return (
    <Box as="span"
      bgGradient="linear(to-r,#00ffff,#e91e63,#7C4DFF,#00ffff)"
      bgClip="text" fontWeight="bold"
      sx={{ backgroundSize: '200% auto', animation: `${shine} 6s linear infinite` }}
    >
      {words[i]}
    </Box>
  )
}

/* ---------------- Carte service avec tilt ---------------- */
function TiltCard({ icon, title, bullets = [], gradient = 'linear(to-br, #111827, #1f2937)' }) {
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rotateX = useTransform(my, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-10, 10])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <MotionBox
      p={6} borderRadius="xl"
      bg="rgba(255,255,255,0.04)"
      border="1px solid rgba(255,255,255,0.08)"
      position="relative" overflow="hidden"
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ perspective: 1000 }}
      role="article"
    >
      <Box position="absolute" inset={0}
        bgGradient={gradient} opacity={0.08} pointerEvents="none" />
      <MotionHStack spacing={3} mb={3} style={{ rotateX, rotateY }}>
        <Box as={icon} fontSize="xl" />
        <Heading as="h3" size="md">{title}</Heading>
      </MotionHStack>
      <VStack align="start" spacing={2} style={{ rotateX, rotateY }}>
        {bullets.map((b) => (
          <Text key={b} color="whiteAlpha.900">• {b}</Text>
        ))}
      </VStack>
      <Box
        position="absolute" top="-30%" left="-10%" w="60%" h="200%"
        bg="radial-gradient(closest-side, rgba(124,77,255,0.12), transparent 70%)"
        transform="rotate(20deg)" pointerEvents="none"
      />
    </MotionBox>
  )
}

export default function About() {
  /* ------ Parallax léger sur le hero ------ */
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rotateX = useTransform(my, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-8, 8])
  const onHeroMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <Box as="main" px={{ base: 5, md: 8 }} py={{ base: 8, md: 12 }} position="relative" overflow="hidden">
      {/* Fond doux animé */}
      <Box position="absolute" inset={0} pointerEvents="none"
        bg="linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)" />
      <Box position="absolute" inset={0} pointerEvents="none"
        bg="linear-gradient(120deg, rgba(0,255,255,0.08), rgba(233,30,99,0.08), rgba(124,77,255,0.08))"
        sx={{ backgroundSize: '220% 220%', animation: `${shine} 14s linear infinite` }} />

      {/* ================= HERO ================= */}
      <MotionVStack
        spacing={5} align="center" textAlign="center" mb={12} position="relative" zIndex={1}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        onMouseMove={onHeroMove} style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* Photo avec anneau conique animé */}
        <Box position="relative" w={{ base: 160, md: 200 }} h={{ base: 160, md: 200 }} sx={{ transform: 'translateZ(30px)' }}>
          {/* Anneau conique */}
          <Box
            position="absolute" inset={-6} borderRadius="full"
            bg="conic-gradient(from 0deg, #00ffff, #e91e63, #7C4DFF, #00ffff)"
            sx={{ animation: `${spinSlow} 8s linear infinite` }}
            filter="blur(10px)" opacity={0.9}
          />
          {/* Cadre */}
          <Box position="absolute" inset={-2} borderRadius="full" border="2px solid rgba(255,255,255,0.25)" />
          {/* Image */}
          <Box
            as="img"
            src="/images/profile.jpeg"
            alt="Photo de profil"
            w="100%" h="100%" borderRadius="full" objectFit="cover"
            position="relative" zIndex={1}
            boxShadow="0 10px 40px rgba(0,0,0,0.35)"
          />
        </Box>

        <Heading
          as="h1" size={{ base: 'xl', md: '2xl' }} lineHeight="1.1"
          bgGradient="linear(to-r,#00ffff,#e91e63,#7C4DFF,#00ffff)" bgClip="text"
          sx={{ backgroundSize: '200% auto', animation: `${shine} 8s linear infinite` }}
        >
          Développeur Full-Stack • Montréal
        </Heading>

        <Text maxW="900px" color="whiteAlpha.900" fontSize={{ base: 'md', md: 'lg' }}>
          Je conçois et livre des applications <b>scalables</b> et <b>performantes</b> end-to-end :
          <RotatingWords
            words={[
              'front-end réactif (React + Chakra + Framer Motion)',
              'back-end Node.js (REST/GraphQL, Prisma, PostgreSQL/MongoDB)',
              'PWA hors-ligne & Service Workers',
              'CI/CD Docker + GitHub Actions, déploiement cloud',
              'apps mobiles (React Native / Flutter)',
            ]}
          />.
        </Text>

        <HStack spacing={3} wrap="wrap" justify="center">
          {['React', 'Vite', 'Chakra UI', 'Framer Motion', 'Node.js', 'Express/Fastify', 'Prisma', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'GitHub Actions', 'AWS/GCP', 'React Native', 'Flutter', 'PWA'].map(t => (
            <Tag key={t} size="md" bg="rgba(255,255,255,0.06)" border="1px solid rgba(255,255,255,0.14)">
              {t}
            </Tag>
          ))}
        </HStack>

        <HStack spacing={4} pt={2}>
          <Button as="a" href="/projects" colorScheme="teal" leftIcon={<FaRocket />}>Voir mes projets</Button>
          <Button as="a" href="https://github.com/CabrelLene" target="_blank" rel="noreferrer" variant="outline" leftIcon={<FaGithub />}>
            GitHub
          </Button>
        </HStack>
      </MotionVStack>

      <Divider opacity={0.2} mb={10} />

      {/* ================= Sections Expertises ================= */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} position="relative" zIndex={1}>
        <TiltCard
          icon={FaReact}
          title="Front-end & UX"
          gradient="linear(to-br, rgba(0,255,255,0.25), rgba(124,77,255,0.2))"
          bullets={[
            'React 18/19 • Vite • Chakra UI',
            'Animations Framer Motion, micro-interactions',
            'PWA, accessibilité, SEO technique',
            'Perf Web (CWV), lazy loading, code-splitting',
          ]}
        />
        <TiltCard
          icon={FaNode}
          title="Back-end & APIs"
          gradient="linear(to-br, rgba(233,30,99,0.22), rgba(124,77,255,0.18))"
          bullets={[
            'Node.js • Express/Fastify • NestJS',
            'REST/GraphQL • Auth JWT/OAuth',
            'ORM Prisma • migrations',
            'Caching (Redis) • rate-limit • validation',
          ]}
        />
        <TiltCard
          icon={FaMobileAlt}
          title="Mobile, Cloud & DevOps"
          gradient="linear(to-br, rgba(124,77,255,0.22), rgba(0,255,255,0.18))"
          bullets={[
            'React Native / Flutter',
            'Docker, CI/CD (GitHub Actions)',
            'AWS/GCP (S3, CloudFront, Lambda/Cloud Run)',
            'Observabilité (logs/metrics), Sentry',
          ]}
        />
      </SimpleGrid>

      {/* ================= Valeurs / Manière de travailler ================= */}
      <VStack align="stretch" spacing={4} mt={12} position="relative" zIndex={1}>
        <Heading as="h2" size="md">Ma manière de travailler</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <MotionBox
            p={5} borderRadius="lg" bg="rgba(255,255,255,0.04)" border="1px solid rgba(255,255,255,0.08)"
            whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Text fontWeight="bold" mb={2}>Architecture & qualité</Text>
            <Text color="whiteAlpha.900">
              Clean Architecture, SOLID, modularisation, revues de code, tests (unitaires & e2e), performance budgets.
            </Text>
          </MotionBox>
          <MotionBox
            p={5} borderRadius="lg" bg="rgba(255,255,255,0.04)" border="1px solid rgba(255,255,255,0.08)"
            whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Text fontWeight="bold" mb={2}>DX & productivité</Text>
            <Text color="whiteAlpha.900">
              Monorepo, scripts NPM, conventions, CI/CD automatisée, feature flags, documentation vivante.
            </Text>
          </MotionBox>
          <MotionBox
            p={5} borderRadius="lg" bg="rgba(255,255,255,0.04)" border="1px solid rgba(255,255,255,0.08)"
            whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Text fontWeight="bold" mb={2}>Collaboration</Text>
            <Text color="whiteAlpha.900">
              Découpage incrémental, tickets clairs, QA continue, communication proactive avec les parties prenantes.
            </Text>
          </MotionBox>
        </SimpleGrid>
      </VStack>

      {/* ================= CTA ================= */}
      <VStack spacing={3} mt={12} position="relative" zIndex={1}>
        <Text color="whiteAlpha.800">Envie de construire quelque chose de solide et élégant ?</Text>
        <HStack spacing={4}>
          <Button as="a" href="/contact" colorScheme="teal" rightIcon={<FaArrowRight />}>Me contacter</Button>
          <Button as="a" href="/projects" variant="outline">Explorer mes projets</Button>
        </HStack>
      </VStack>

      {/* Blobs de glow subtils */}
      <Box position="absolute" top="-80px" left="-80px" w="300px" h="300px" borderRadius="50%"
        filter="blur(90px)" bg="rgba(0,255,255,0.35)" opacity={0.5} animation={`${float} 10s ease-in-out infinite`} />
      <Box position="absolute" bottom="-100px" right="-100px" w="360px" h="360px" borderRadius="50%"
        filter="blur(110px)" bg="rgba(233,30,99,0.35)" opacity={0.45} animation={`${float} 12s ease-in-out infinite`} />
    </Box>
  )
}
s