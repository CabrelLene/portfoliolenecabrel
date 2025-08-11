// src/pages/Home.jsx
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Box, Heading, Text, Button, HStack, Tag, useBreakpointValue } from '@chakra-ui/react'
import { motion, useMotionValue, useTransform, useScroll, useReducedMotion } from 'framer-motion'
import { keyframes, Global } from '@emotion/react'
import { FaArrowRight, FaChevronDown } from 'react-icons/fa'
import '@lottiefiles/lottie-player'

import AuroraOverlay from '../components/AuroraOverlay'
import CursorGlow from '../components/CursorGlow'
import IntroLoader from '../components/IntroLoader'
import { confettiBurst } from '../utils/confetti'

const MotionBox    = motion(Box)
const MotionButton = motion(Button)

/* ---------- Animations CSS ---------- */
const shine = keyframes`from{background-position:0% 50%} to{background-position:200% 50%}`
const float = keyframes`0%{transform:translateY(0)}50%{transform:translateY(-14px)}100%{transform:translateY(0)}`
const bounce = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}`
const spinSlow = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`
const spinReverse = keyframes`from { transform: rotate(360deg); } to { transform: rotate(0deg); }`
const gridPan = keyframes`
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 200px 0, 0 200px; }
`
const beamsRotate = keyframes`from{transform:rotate(0)}to{transform:rotate(360deg)}`

/* ---------- Typewriter minimal ---------- */
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
      if (text === '') { setDel(false); setI(v => v + 1); if (!loop && i + 1 >= words.length) clearTimeout(t) }
    }
    return () => clearTimeout(t)
  }, [text, del, i, words, typingSpeed, holdTime, loop])

  return <span>{text}</span>
}

/* ---------- Icônes SVG inline (zéro requête) ---------- */
const SvgWrap = (props) => (
  <Box as="svg" viewBox="0 0 256 256" w={8} h={8} filter="drop-shadow(0 2px 8px rgba(0,0,0,.35))" {...props}/>
)
const IconReact = () => (
  <SvgWrap>
    <g fill="none" stroke="#61dafb" strokeWidth="14">
      <ellipse cx="128" cy="128" rx="92" ry="36" />
      <ellipse cx="128" cy="128" rx="92" ry="36" transform="rotate(60 128 128)" />
      <ellipse cx="128" cy="128" rx="92" ry="36" transform="rotate(120 128 128)" />
    </g>
    <circle cx="128" cy="128" r="14" fill="#61dafb"/>
  </SvgWrap>
)
const IconTS = () => (
  <SvgWrap>
    <rect width="256" height="256" rx="36" fill="#3178c6"/>
    <path fill="#fff" d="M58 114h62v20H98v68H76v-68H58zM141 114h89v20h-34v68h-22v-68h-33z"/>
  </SvgWrap>
)
const IconNode = () => (
  <SvgWrap>
    <path fill="#83cd29" d="M127.9 17 24 76v104l103.9 59L231.7 180V76z"/>
    <path fill="#fff" d="M162 98h-69v20h47c8 0 10 3 10 7v8c0 4-2 7-10 7h-47v20h69c17 0 28-9 28-27v-8c0-18-11-27-28-27z"/>
  </SvgWrap>
)
const IconFlutter = () => (
  <SvgWrap>
    <path fill="#45D1FD" d="M154 36 60 130l28 28L210 36z"/>
    <path fill="#01579B" d="M88 158l56 56h56l-84-84z"/>
    <path fill="#29B6F6" d="M144 102 88 158l28 28 56-56z"/>
  </SvgWrap>
)

/* ---------- Starfield Canvas ---------- */
function Starfield({ density = 1 }) {
  const prefersReducedMotion = useReducedMotion()
  const canvasRef = useRef(null)
  const isMobile = useBreakpointValue({ base: true, md: false })

  useEffect(() => {
    if (prefersReducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    const count = Math.floor((w * h) / (isMobile ? 18000 : 10000) * density)
    const stars = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.7 + 0.3,
      a: Math.random() * 0.9 + 0.1
    }))

    let raf = 0
    const loop = () => {
      ctx.clearRect(0, 0, w, h)
      for (let s of stars) {
        s.y += (0.2 + s.z * 0.8)
        if (s.y > h) { s.y = -2; s.x = Math.random() * w }
        const size = s.z * 1.6
        ctx.fillStyle = `rgba(${Math.floor(120 + 80*s.z)}, ${Math.floor(220)}, ${Math.floor(255)}, ${0.35 * s.a})`
        ctx.fillRect(s.x, s.y, size, size)
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(canvas)

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [density, prefersReducedMotion, isMobile])

  return (
    <Box
      as="canvas"
      ref={canvasRef}
      position="absolute"
      inset={0}
      zIndex={0}
      opacity={0.6}
      pointerEvents="none"
    />
  )
}

/* ---------- Neon Beams ---------- */
function NeonBeams() {
  return (
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      zIndex={0}
      sx={{
        maskImage: 'radial-gradient(circle at 50% 45%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.2) 55%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 45%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.2) 55%, transparent 75%)'
      }}
    >
      <Box
        position="absolute"
        inset="-30%"
        bg="conic-gradient(from 0deg, rgba(0,255,255,.10), rgba(233,30,99,.10), rgba(124,77,255,.10), rgba(0,255,255,.10))"
        filter="blur(24px)"
        animation={`${beamsRotate} 36s linear infinite`}
      />
    </Box>
  )
}

/* ---------- Cadre holographique ---------- */
function HoloFrame() {
  return (
    <Box position="absolute" inset={{ base: 6, md: 10 }} zIndex={1} pointerEvents="none">
      <Box
        position="absolute" inset={0} borderRadius="24px"
        border="1px solid rgba(255,255,255,0.12)"
        boxShadow="inset 0 0 0 1px rgba(255,255,255,0.06)"
        _before={{
          content:'""',
          position:'absolute', inset:0, borderRadius:'24px',
          background:'linear-gradient(90deg, rgba(0,255,255,.25), rgba(233,30,99,.25), rgba(124,77,255,.25))',
          maskImage:'linear-gradient(#000 0 0), radial-gradient(32px 32px at 0 0, transparent 98%, #000 100%), radial-gradient(32px 32px at 100% 0, transparent 98%, #000 100%), radial-gradient(32px 32px at 100% 100%, transparent 98%, #000 100%), radial-gradient(32px 32px at 0 100%, transparent 98%, #000 100%)',
          WebkitMaskComposite:'destination-out',
          maskComposite:'exclude',
          opacity:.3
        }}
      />
    </Box>
  )
}

/* ---------- Callout Card 3D ---------- */
function CalloutCard({ title, desc, accent = '#00ffff', icon }) {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const prefersReducedMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-40, 40], [10, -10])
  const rotateY = useTransform(x, [-40, 40], [-10, 10])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    x.set(Math.max(-40, Math.min(40, dx / 4)))
    y.set(Math.max(-40, Math.min(40, dy / 4)))
    // Met à jour le halo
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <MotionBox
      role="article"
      whileHover={!isMobile && !prefersReducedMotion ? { scale: 1.03 } : {}}
      whileTap={{ scale: 0.98 }}
      style={!isMobile && !prefersReducedMotion ? { rotateX, rotateY, transformStyle:'preserve-3d' } : {}}
      onMouseMove={!isMobile ? onMove : undefined}
      onMouseLeave={!isMobile ? onLeave : undefined}
      bg="rgba(255,255,255,0.05)"
      border="1px solid rgba(255,255,255,0.15)"
      borderRadius="20px"
      p={{ base: 5, md: 6 }}
      minH={{ base: 'auto', md: '220px' }}
      position="relative"
      overflow="hidden"
      _before={{
        content:'""', position:'absolute', inset:0, pointerEvents:'none',
        background:`radial-gradient(220px 220px at var(--mx,50%) var(--my,50%), ${accent}22, transparent 60%)`,
        transition:'background .15s'
      }}
      _after={{
        content:'""', position:'absolute', inset:-1, borderRadius:'20px',
        background:`linear-gradient(135deg, ${accent}66, transparent 50%, #e91e6355)`,
        mask:'linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)',
        WebkitMaskComposite:'xor',
        maskComposite:'exclude',
        padding:'1px',
        pointerEvents:'none',
        opacity:0.8
      }}
    >
      <Box mb={4} fontSize="2xl">{icon}</Box>
      <Heading as="h3" size="md" mb={2}>{title}</Heading>
      <Text color="whiteAlpha.800">{desc}</Text>
    </MotionBox>
  )
}

/* ===================== PAGE ===================== */
export default function Home() {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useBreakpointValue({ base: true, md: false })

  /* Progress global pour la barre top */
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  /* Parallax tilt du hero (desktop only) */
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rotateX = useTransform(my, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-8, 8])
  const onHeroMove = e => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  /* Effet magnétique sur le CTA (desktop only) */
  const bx = useMotionValue(0), by = useMotionValue(0)
  const onBtnMove = e => {
    const r = e.currentTarget.getBoundingClientRect()
    bx.set((e.clientX - (r.left + r.width / 2)) * 0.08)
    by.set((e.clientY - (r.top + r.height / 2)) * 0.08)
  }
  const onBtnLeave = () => { bx.set(0); by.set(0) }

  /* Réfs sections + TOC actif */
  const heroRef = useRef(null)
  const calloutsRef = useRef(null)   // NEW
  const skillsRef = useRef(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const sections = [heroRef, skillsRef] // TOC reste Hero/Skills (Callouts non listée)
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const d = sections.map((ref) => {
          const el = ref.current
          if (!el) return Number.MAX_VALUE
          const r = el.getBoundingClientRect()
          const centerDist = Math.abs((r.top + r.height / 2) - window.innerHeight / 2)
          return centerDist
        })
        setActive(d.indexOf(Math.min(...d)))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll) }
  }, [])
  const colorBySection = useMemo(() => ['#00ffff', '#e91e63'], [])
  const rightBarColor = colorBySection[active] || '#00ffff'
  const goTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  /* Lottie: pause hors-écran + fallback local si erreur */
  const lottieRef = useRef(null)
  const remoteSrc = 'https://assets4.lottiefiles.com/packages/lf20_1pxqjqps.json'
  const fallbackSrc = '/lotties/hero.json'
  const [lottieSrc, setLottieSrc] = useState(remoteSrc)
  useEffect(() => {
    const el = lottieRef.current
    if (!el) return
    const onErr = () => { if (lottieSrc !== fallbackSrc) setLottieSrc(fallbackSrc) }
    el.addEventListener('error', onErr)
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play?.(); else el.pause?.()
    }, { threshold: 0.2 })
    io.observe(el)
    return () => { io.disconnect(); el.removeEventListener('error', onErr) }
  }, [lottieSrc])

  /* Stagger des badges */
  const containerVariants = { hidden: { opacity: 1 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }
  const itemVariants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 20 } } }
  const skills = ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Flutter', 'React Native', 'PWA', 'Framer Motion', 'Chakra UI', 'MongoDB', 'PostgreSQL', 'Docker']

  return (
    <>
      {/* Scroll snapping + marquee */}
      <Global styles={`
        html, body { scroll-snap-type: y proximity; }
        .snap-section { scroll-snap-align: start; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `} />

      <IntroLoader />
      <CursorGlow />

      {/* Progress bar top */}
      <MotionBox position="fixed" top="0" left="0" right="0" h="3px" zIndex="1000"
        style={{ scaleX, transformOrigin: '0% 50%' }}
        bgGradient="linear(to-r,#00ffff,#e91e63,#7C4DFF)"
      />

      {/* TOC vertical */}
      <Box position="fixed" right={{ base: 6, md: 14 }} top="14%" h="72vh" w="8px" zIndex={998}
           bg="rgba(255,255,255,0.12)" borderRadius="full" overflow="hidden">
        <MotionBox w="100%" h="100%"
          style={{ scaleY: scrollYProgress, transformOrigin: 'center top' }}
          bg={rightBarColor}
        />
        <Box position="absolute" left="50%" transform="translateX(-50%)" top="10%">
          <Box as="button" w="16px" h="16px" borderRadius="full"
               border="2px solid white" bg={active===0?rightBarColor:'transparent'}
               title="Hero" onClick={() => goTo(heroRef)} />
        </Box>
        <Box position="absolute" left="50%" transform="translateX(-50%)" top="85%">
          <Box as="button" w="16px" h="16px" borderRadius="full"
               border="2px solid white" bg={active===1?rightBarColor:'transparent'}
               title="Skills" onClick={() => goTo(skillsRef)} />
        </Box>
      </Box>

      {/* =========== SECTION HERO =========== */}
      <Box position="relative" minH="100vh" overflow="hidden" ref={heroRef} className="snap-section">
        {/* Layers */}
        <Starfield density={1} />
        <AuroraOverlay />
        <NeonBeams />
        <Box position="absolute" inset={0} zIndex={0} pointerEvents="none" opacity={0.18}
          sx={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 40px 40px',
            animation: `${gridPan} 22s linear infinite`,
            maskImage: 'radial-gradient(ellipse at 50% 40%, black, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black, transparent 70%)',
          }}
        />

        <HoloFrame />

        <MotionBox
          position="relative" zIndex={1} minH="100vh"
          display="flex" flexDir="column" alignItems="center" justifyContent="center"
          px={{ base: 6, md: 8 }} pt="24" textAlign="center"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}
          style={!isMobile && !prefersReducedMotion ? { rotateX, rotateY, transformStyle:'preserve-3d' } : {}}
          onMouseMove={!isMobile ? onHeroMove : undefined}
        >
          {/* Orbites + Lottie */}
          <Box position="relative" w={{ base: 220, md: 260 }} h={{ base: 220, md: 260 }} mb={2}>
            {/* Orbite externe */}
            <Box position="absolute" inset={0} borderRadius="full" border="1px dashed rgba(255,255,255,0.22)" pointerEvents="none" />
            <Box position="absolute" inset={0} borderRadius="full" pointerEvents="none"
                 sx={{ animation: `${spinSlow} 18s linear infinite` }}>
              <Box position="absolute" top="-14px" left="50%" transform="translateX(-50%)"><IconReact/></Box>
              <Box position="absolute" bottom="-14px" left="50%" transform="translateX(-50%)"><IconNode/></Box>
              <Box position="absolute" left="-14px" top="50%" transform="translateY(-50%)"><IconTS/></Box>
              <Box position="absolute" right="-14px" top="50%" transform="translateY(-50%)"><IconFlutter/></Box>
            </Box>
            {/* Orbite interne */}
            <Box position="absolute" inset="34px" borderRadius="full" border="1px dashed rgba(255,255,255,0.18)" pointerEvents="none" />
            <Box position="absolute" inset="34px" borderRadius="full" pointerEvents="none"
                 sx={{ animation: `${spinReverse} 22s linear infinite` }}>
              <Tag position="absolute" top="-10px" left="50%" transform="translateX(-50%)"
                   bg="rgba(255,255,255,0.12)" border="1px solid rgba(255,255,255,0.28)">Framer</Tag>
              <Tag position="absolute" bottom="-10px" left="50%" transform="translateX(-50%)"
                   bg="rgba(0,255,255,0.15)" border="1px solid rgba(0,255,255,0.35)">Chakra</Tag>
              <Tag position="absolute" left="-10px" top="50%" transform="translateY(-50%)"
                   bg="rgba(124,77,255,0.15)" border="1px solid rgba(124,77,255,0.35)">GraphQL</Tag>
              <Tag position="absolute" right="-10px" top="50%" transform="translateY(-50%)"
                   bg="rgba(233,30,99,0.15)" border="1px solid rgba(233,30,99,0.35)">PWA</Tag>
            </Box>

            {/* 🎞 Lottie centrale */}
            <Box
              as="lottie-player"
              ref={lottieRef}
              src={lottieSrc}
              background="transparent"
              speed="1"
              renderer="svg"
              loop autoplay
              style={{ width: '100%', height: '100%' }}
              aria-label="Animation développeur"
              onMouseEnter={(e) => e.currentTarget.setSpeed?.(1.6)}
              onMouseLeave={(e) => e.currentTarget.setSpeed?.(1)}
            />
          </Box>

          {/* Eyebrow */}
          <MotionBox mb={4} px={4} py={1.5} border="1px solid rgba(255,255,255,0.16)"
            borderRadius="full" fontSize="sm" color="whiteAlpha.800" whileHover={{ scale:1.05 }}>
            Développeur FullStack • Mobile • Montréal
          </MotionBox>

          {/* Titre */}
          <Heading
            as="h1" size={{ base:'3xl', md:'4xl', lg:'5xl' }} mb={4} lineHeight="1.1"
            bgGradient="linear(to-r,#00ffff,#e91e63,#7C4DFF,#00ffff)" bgClip="text"
            sx={{ backgroundSize:'200% auto', animation:`${shine} 6s linear infinite`,
                  textShadow:'0 0 18px rgba(0,255,255,0.25)' }}
          >
            Hi, je suis CABREL LENE
          </Heading>

          {/* Typewriter */}
          <Text fontSize={{ base:'lg', md:'xl' }} mb={8} maxW="760px" mx="auto" color="whiteAlpha.900">
            <Typewriter
              words={[
                'Apps mobiles performantes (iOS • Android).',
                'Expériences Web & Mobile immersives.',
                'Intégrations API robustes & scalables.',
              ]}
              typingSpeed={prefersReducedMotion ? 0 : 95} holdTime={1200} loop
            />
          </Text>

          {/* CTA */}
          <MotionButton
            as="a" href="/projects" size="lg" colorScheme="teal" rightIcon={<FaArrowRight />}
            whileHover={{ scale:1.06, boxShadow:'0 0 32px rgba(0,255,255,0.45), 0 0 60px rgba(233,30,99,0.25)' }}
            whileTap={{ scale:0.95 }}
            onMouseMove={!isMobile ? onBtnMove : undefined} onMouseLeave={onBtnLeave}
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

          {/* Chevron -> Callouts (nouvelle section) */}
          {!prefersReducedMotion && (
            <Box as="button" position="absolute" bottom="6" color="whiteAlpha.700" fontSize="xl"
                 sx={{ animation:`${bounce} 1.6s ease-in-out infinite` }}
                 onClick={() => calloutsRef.current?.scrollIntoView({ behavior:'smooth' })}
                 aria-label="Aller aux callouts">
              <FaChevronDown />
            </Box>
          )}
        </MotionBox>
      </Box>

      {/* =========== SECTION CALLOUTS (3 Cartes 3D) =========== */}
      <Box ref={calloutsRef} className="snap-section" position="relative" py={{ base: 12, md: 20 }}>
        <Box position="absolute" inset={0} pointerEvents="none"
             bg="linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.35))" />
        <Box maxW="1100px" mx="auto" px={{ base: 6, md: 10 }}>
          <Heading textAlign="center" mb={{ base: 8, md: 12 }}>
            Pourquoi travailler avec moi ?
          </Heading>

          <Box
            display="grid"
            gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={{ base: 5, md: 6 }}
          >
            <CalloutCard
              title="Performance"
              desc="Rendu ultra-rapide (PWA, code-splitting, memoisation), budget perfs mesuré (Lighthouse/Web Vitals), images responsives."
              accent="#00ffff"
              icon={
                <Box as="svg" viewBox="0 0 24 24" w="8" h="8" fill="none" stroke="currentColor" strokeWidth="1.5" color="#00ffff">
                  <path d="M12 3v4M12 17v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M3 12h4M17 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  <circle cx="12" cy="12" r="3" />
                </Box>
              }
            />
            <CalloutCard
              title="Accessibilité"
              desc="Composants accessibles (ARIA), contrastes AA/AAA, navigation clavier/lecteur d’écran, animations respectueuses (prefers-reduced-motion)."
              accent="#7C4DFF"
              icon={
                <Box as="svg" viewBox="0 0 24 24" w="8" h="8" fill="none" stroke="currentColor" strokeWidth="1.5" color="#7C4DFF">
                  <circle cx="12" cy="4" r="2"/><path d="M6 8h12l-3 4v8h-6v-8z"/>
                </Box>
              }
            />
            <CalloutCard
              title="DevEx (DX)"
              desc="TypeScript, CI/CD (GitHub Actions), tests, conventions, story-driven UI, tooling efficace pour livrer vite et bien."
              accent="#e91e63"
              icon={
                <Box as="svg" viewBox="0 0 24 24" w="8" h="8" fill="none" stroke="currentColor" strokeWidth="1.5" color="#e91e63">
                  <path d="M12 15l-3-3 3-3 3 3-3 3z"/><path d="M4 4h16v16H4z"/>
                </Box>
              }
            />
          </Box>
        </Box>
      </Box>

      {/* =========== SECTION SKILLS (marquee) =========== */}
      <Box ref={skillsRef} className="snap-section" position="relative" minH="100vh" display="flex" alignItems="center">
        <Box position="absolute" inset={0} pointerEvents="none"
          bg="linear-gradient(135deg, rgba(0,0,0,.15), rgba(255,255,255,.04))" />
        <Box w="100%" textAlign="center" px={{ base: 6, md: 10 }}>
          <Heading mb={6}>Compétences clés</Heading>
          {/* Marquee simple */}
          <Box overflow="hidden" position="relative" py={4}
               sx={{
                 maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
                 WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)'
               }}>
            <HStack spacing={4} w="max-content" mx="auto"
              sx={{ animation: `marquee 22s linear infinite` }}
              _hover={{ animationPlayState: 'paused' }}
            >
              {[...skills, ...skills].map((s, i) => (
                <Tag key={`${s}-${i}`} size="lg" px={4}
                     bg="rgba(255,255,255,0.06)" border="1px solid rgba(255,255,255,0.14)">
                  {s}
                </Tag>
              ))}
            </HStack>
          </Box>
          <Text mt={6} color="whiteAlpha.800" maxW="820px" mx="auto">
            Stack moderne orientée performance & DX : React/TS, animations Framer, Node/GraphQL,
            PWA offline-first, CI/CD Docker & GitHub Actions, bases PostgreSQL/MongoDB.
          </Text>
        </Box>
      </Box>

      {/* === AVATAR “CAPSULE” FIXE (photo en bas à droite) — réactivé === */}
      <MotionBox
        as="a" href="/about" title="À propos"
        position="fixed" bottom={{ base: 20, md: 28 }} right={{ base: 18, md: 28 }}
        zIndex={999}
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} whileHover={{ scale: 1.06, y: -2 }}
      >
        <Box position="relative" w={{ base: 68, md: 84 }} h={{ base: 68, md: 84 }}>
          <Box position="absolute" inset={-6} borderRadius="full"
               bg="conic-gradient(from 0deg, #00ffff, #e91e63, #7C4DFF, #00ffff)"
               sx={{ animation: `${spinSlow} 8s linear infinite` }}
               filter="blur(10px)" opacity={0.9} />
          <Box position="absolute" inset={-2} borderRadius="full" border="2px solid rgba(255,255,255,0.25)" />
          <Box as="img" src="/images/profile.jpeg" alt="Cabrel Lene"
               w="100%" h="100%" borderRadius="full" objectFit="cover"
               position="relative" zIndex={1} boxShadow="0 10px 30px rgba(0,0,0,0.45)" />
          <MotionBox
            position="absolute" right="100%" top="50%" transform="translateY(-50%)"
            mr="3" px="2.5" py="1" borderRadius="full" bg="rgba(0,0,0,0.55)" border="1px solid rgba(255,255,255,0.18)"
            fontSize="xs" whiteSpace="nowrap" initial={{ x: 8, opacity: 0 }} whileHover={{ x: 0, opacity: 1 }}
          >
            À propos
          </MotionBox>
        </Box>
      </MotionBox>
    </>
  )
}
