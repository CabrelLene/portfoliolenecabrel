// src/pages/Projects.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Box, Heading, Text, SimpleGrid, HStack, VStack, Tag, Link,
  Input, InputGroup, InputLeftElement, Select, Button, Divider, Skeleton,
  IconButton, Tooltip, Badge
} from '@chakra-ui/react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { FaStar, FaCodeBranch, FaGithub, FaExternalLinkAlt, FaSearch, FaTimes } from 'react-icons/fa'
import localProjects from '../data/projects'

const MotionBox = motion(Box)
const GITHUB_USER = 'CabrelLene'

/* --------- Couleurs d’accent par langage --------- */
const LANG_ACCENTS = {
  JavaScript: ['#F7DF1E', '#FF8A00'],
  TypeScript: ['#3178C6', '#66A6FF'],
  Dart: ['#0175C2', '#27C4F5'],
  Swift: ['#FA7343', '#FDA03B'],
  Kotlin: ['#A97BFF', '#FF8A00'],
  Java: ['#E76F00', '#F7A400'],
  Python: ['#3776AB', '#FFE873'],
  Go: ['#00ADD8', '#00E0FF'],
  'C#': ['#178600', '#36C275'],
  default: ['#7C4DFF', '#00FFFF'],
}
const accentFor = (lang) => LANG_ACCENTS[lang] || LANG_ACCENTS.default

/* --------- Utils --------- */
const formatAgo = (iso) => {
  if (!iso) return ''
  const d = new Date(iso); if (isNaN(d)) return ''
  const diff = Date.now() - d.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days < 1) return 'Aujourd’hui'
  if (days === 1) return 'Hier'
  if (days < 30) return `Il y a ${days} j`
  const months = Math.floor(days / 30)
  if (months < 12) return `Il y a ${months} mois`
  const years = Math.floor(months / 12)
  return `Il y a ${years} an${years > 1 ? 's' : ''}`
}

const uniq = (arr) => Array.from(new Set(arr.filter(Boolean)))

/* --------- Carte 3D illustrée --------- */
function ProjectCard3D({ p }) {
  const {
    name = 'Projet', description = '', language = 'Other', topics = [],
    stargazers_count = 0, forks_count = 0, html_url = '#', homepage, updated_at,
    image
  } = p || {}

  const [c1, c2] = accentFor(language)

  // Tilt/parallax
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rotateX = useTransform(my, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-12, 12])
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <MotionBox
      role="group"
      border="1px solid rgba(255,255,255,0.08)"
      bg="rgba(255,255,255,0.04)"
      borderRadius="xl"
      overflow="hidden"
      backdropFilter="blur(6px)"
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      position="relative"
      style={{ perspective: 1100 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      layout
    >
      {/* Plan 0 : bannière/gradient + image */}
      <MotionBox
        position="relative"
        h="130px"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        bg={`linear-gradient(135deg, ${c1}, ${c2})`}
        _after={{
          content: '""',
          position: 'absolute', inset: 0,
          background:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.35), transparent 40%), ' +
            'radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25), transparent 40%)',
          mixBlendMode: 'screen', opacity: 0.6,
        }}
      >
        {image && (
          <Box
            position="absolute" inset={0}
            bgImage={`url(${image})`} bgPos="center" bgSize="cover"
            opacity={0.22} _groupHover={{ opacity: 0.28 }} transition="opacity .25s"
            style={{ transform: 'translateZ(20px)' }}
          />
        )}

        {/* Shine sweeping */}
        <Box
          position="absolute" top="-20%" left="-40%" w="60%" h="160%"
          transform="rotate(20deg) translateX(-140%)"
          bg="linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.0) 100%)"
          transition="transform .6s ease"
          pointerEvents="none"
          _groupHover={{ transform: 'rotate(20deg) translateX(160%)' }}
          style={{ transformOrigin: 'left center' }}
        />

        {/* Language badge + last update */}
        <HStack position="absolute" top="3" left="3" spacing="2" style={{ transform: 'translateZ(30px)' }}>
          <Tag size="sm" bg="rgba(0,0,0,0.35)" color="whiteAlpha.900" border="1px solid rgba(255,255,255,0.2)">
            {language || 'Autre'}
          </Tag>
        </HStack>
        <Badge position="absolute" top="3" right="3" colorScheme="blackAlpha" bg="rgba(0,0,0,0.4)" style={{ transform: 'translateZ(30px)' }}>
          MAJ {formatAgo(updated_at)}
        </Badge>
      </MotionBox>

      {/* Contenu */}
      <MotionBox p={5} style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <HStack justify="space-between" align="start" mb="1" style={{ transform: 'translateZ(32px)' }}>
          <Link href={html_url} isExternal fontWeight="bold" fontSize="xl" _hover={{ textDecoration: 'none' }}>
            {name} <Box as="span" opacity={0.8} ml="2"><FaGithub /></Box>
          </Link>
          <HStack spacing={4} color="whiteAlpha.800">
            <HStack spacing={1}><Box as={FaStar} /><Text>{stargazers_count}</Text></HStack>
            <HStack spacing={1}><Box as={FaCodeBranch} /><Text>{forks_count}</Text></HStack>
          </HStack>
        </HStack>

        {description && (
          <Text color="whiteAlpha.800" noOfLines={3} mb="3" style={{ transform: 'translateZ(22px)' }}>
            {description}
          </Text>
        )}

        {topics?.length > 0 && (
          <HStack spacing={2} wrap="wrap" mb="3" style={{ transform: 'translateZ(18px)' }}>
            {topics.slice(0, 6).map(t => (
              <Tag key={t} size="sm" bg="rgba(255,255,255,0.06)" border="1px solid rgba(255,255,255,0.14)">
                {t}
              </Tag>
            ))}
          </HStack>
        )}

        <Divider borderColor="whiteAlpha.200" mb="3" />

        <HStack justify="space-between" align="center" style={{ transform: 'translateZ(14px)' }}>
          <Text fontSize="sm" color="whiteAlpha.600">Repo public</Text>
          <HStack spacing={3}>
            <Button
              as={Link} href={html_url} isExternal size="sm"
              variant="outline" borderColor="whiteAlpha.300" _hover={{ bg: 'whiteAlpha.100' }}
              leftIcon={<FaGithub />}
            >
              GitHub
            </Button>
            {p.homepage && (
              <Button as={Link} href={p.homepage} isExternal size="sm" colorScheme="teal" leftIcon={<FaExternalLinkAlt />}>
                Démo
              </Button>
            )}
          </HStack>
        </HStack>
      </MotionBox>

      {/* Glow subtil bas */}
      <Box
        position="absolute" inset={-1} borderRadius="xl" pointerEvents="none"
        opacity={0} _groupHover={{ opacity: 1 }} transition="opacity .25s"
        bg={`radial-gradient(600px 140px at 50% 0%, ${c2}33, transparent 70%)`}
      />
    </MotionBox>
  )
}

export default function Projects() {
  const [remote, setRemote] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [lang, setLang] = useState('all')
  const [sort, setSort] = useState('stars-desc')

  // Fetch GitHub (1 requête)
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
          headers: { 'Accept': 'application/vnd.github+json' }
        })
        if (!res.ok) throw new Error('GitHub API error')
        const data = await res.json()
        const mapped = (data || []).map(r => ({
          id: r.id,
          name: r.name,
          description: r.description,
          language: r.language,
          topics: r.topics || [],
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          html_url: r.html_url,
          homepage: r.homepage,
          updated_at: r.updated_at,
          // image: `/images/projects/${r.name}.jpg`, // décommente si tu poses des visuels
        }))
        if (!cancelled) setRemote(mapped)
      } catch (e) {
        console.warn('Fallback on local projects:', e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const data = remote.length ? remote : localProjects

  // Comptage langages (pour chips rapides)
  const langCount = useMemo(() => {
    const m = new Map()
    for (const p of data) {
      if (!p.language) continue
      m.set(p.language, (m.get(p.language) || 0) + 1)
    }
    return Array.from(m.entries()).sort((a,b) => b[1]-a[1])
  }, [data])

  const languages = useMemo(() => uniq(data.map(p => p.language)).sort(), [data])

  const filtered = useMemo(() => {
    let arr = [...data]
    if (q.trim()) {
      const s = q.toLowerCase()
      arr = arr.filter(p =>
        (p.name || '').toLowerCase().includes(s) ||
        (p.description || '').toLowerCase().includes(s) ||
        (p.topics || []).some(t => (t || '').toLowerCase().includes(s))
      )
    }
    if (lang !== 'all') {
      arr = arr.filter(p => (p.language || '').toLowerCase() === lang.toLowerCase())
    }
    const byNum = (a, k) => Number(a?.[k] || 0)
    const byDate = (d) => new Date(d || 0).getTime()
    switch (sort) {
      case 'stars-desc': arr.sort((a, b) => byNum(b,'stargazers_count') - byNum(a,'stargazers_count')); break
      case 'stars-asc':  arr.sort((a, b) => byNum(a,'stargazers_count') - byNum(b,'stargazers_count')); break
      case 'updated-desc': arr.sort((a, b) => byDate(b.updated_at) - byDate(a.updated_at)); break
      case 'updated-asc':  arr.sort((a, b) => byDate(a.updated_at) - byDate(b.updated_at)); break
      case 'name-asc':  arr.sort((a, b) => (a.name || '').localeCompare(b.name || '')); break
      case 'name-desc': arr.sort((a, b) => (b.name || '').localeCompare(a.name || '')); break
    }
    return arr
  }, [data, q, lang, sort])

  // Animations container/items + layout
  const container = { show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }, exit: { opacity: 0, y: -16, transition: { duration: 0.25 } } }

  return (
    <Box as="main" px={{ base: 4, md: 8 }} py={{ base: 8, md: 12 }}>
      {/* Header animé */}
      <VStack spacing={3} mb={8} textAlign="center">
        <MotionBox
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Heading
            size={{ base: '2xl', md: '3xl' }}
            bgGradient="linear(to-r,#00ffff,#e91e63,#7C4DFF,#00ffff)"
            bgClip="text"
            sx={{ backgroundSize: '200% auto', animation: 'shine 6s linear infinite' }}
          >
            Mes Projets GitHub
          </Heading>
        </MotionBox>
        <Text color="whiteAlpha.800" maxW="800px">
          Les dépôts de <b>{GITHUB_USER}</b> — recherche, filtres, tri et cartes 3D.
        </Text>
      </VStack>

      {/* Toolbar sticky avec glow */}
      <MotionBox
        position="sticky" top="64px" zIndex={5}
        mb={8} px={4} py={3}
        border="1px solid rgba(255,255,255,0.08)"
        borderRadius="xl"
        bg="rgba(10,10,20,0.55)"
        backdropFilter="blur(10px)"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <HStack spacing={3} flexWrap="wrap" justify="center">
          <InputGroup maxW="360px">
            <InputLeftElement pointerEvents="none" color="whiteAlpha.600">
              <FaSearch />
            </InputLeftElement>
            <Input
              placeholder="Rechercher (nom, description, topics)…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </InputGroup>

          <Select maxW="220px" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="all">Tous les langages</option>
            {languages.map((l) => <option key={l} value={l}>{l}</option>)}
          </Select>

          <Select maxW="220px" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="stars-desc">⭐ Stars (desc)</option>
            <option value="stars-asc">⭐ Stars (asc)</option>
            <option value="updated-desc">🕒 MAJ récentes</option>
            <option value="updated-asc">🕒 MAJ anciennes</option>
            <option value="name-asc">A → Z</option>
            <option value="name-desc">Z → A</option>
          </Select>

          <Tooltip label="Réinitialiser les filtres">
            <IconButton
              aria-label="Reset filters"
              icon={<FaTimes />}
              variant="outline"
              onClick={() => { setQ(''); setLang('all'); setSort('stars-desc') }}
            />
          </Tooltip>
        </HStack>

        {/* Chips de langages les plus fréquents */}
        {langCount.length > 0 && (
          <HStack spacing={2} mt={3} justify="center" wrap="wrap">
            {langCount.slice(0, 8).map(([L]) => {
              const active = lang !== 'all' && lang.toLowerCase() === (L || '').toLowerCase()
              const [a1, a2] = accentFor(L)
              return (
                <MotionBox key={L} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Tag
                    as="button"
                    onClick={() => setLang(active ? 'all' : L)}
                    size="sm"
                    border="1px solid rgba(255,255,255,0.18)"
                    bg={active ? `linear-gradient(135deg, ${a1}33, ${a2}33)` : 'rgba(255,255,255,0.06)'}
                  >
                    {L}
                  </Tag>
                </MotionBox>
              )
            })}
          </HStack>
        )}
      </MotionBox>

      {/* Grille */}
      {loading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} borderRadius="xl" overflow="hidden">
              <Skeleton height="130px" />
              <Box p={5}>
                <Skeleton height="24px" mb="3" />
                <Skeleton height="16px" mb="2" />
                <Skeleton height="16px" mb="2" />
                <Skeleton height="32px" />
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <MotionBox variants={container} initial="hidden" animate="show" layout>
          <AnimatePresence initial={false} mode="popLayout">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {filtered.map((p) => (
                <MotionBox key={p.id || p.name} variants={item} exit="exit" layout>
                  <ProjectCard3D p={p} />
                </MotionBox>
              ))}
            </SimpleGrid>
          </AnimatePresence>
        </MotionBox>
      )}

      {/* CTA bas de page */}
      <VStack spacing={3} mt={12}>
        <Text color="whiteAlpha.700">Voir tout mon code public</Text>
        <Button
          as={Link}
          href={`https://github.com/${GITHUB_USER}?tab=repositories`}
          isExternal
          colorScheme="teal"
          leftIcon={<FaGithub />}
        >
          Mon profil GitHub
        </Button>
      </VStack>

      {/* keyframes locale pour le shine du titre */}
      <style>{`
        @keyframes shine {
          from { background-position: 0% 50%; }
          to   { background-position: 200% 50%; }
        }
      `}</style>
    </Box>
  )
}
