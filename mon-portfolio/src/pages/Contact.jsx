// src/pages/Contact.jsx
import React, { useMemo, useState } from 'react'
import {
  Box, Heading, Text, Input, Textarea, Button, HStack, VStack, Link, IconButton, useToast
} from '@chakra-ui/react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { keyframes } from '@emotion/react'
import { FaGithub, FaEnvelope, FaArrowRight } from 'react-icons/fa'
import { confettiBurst } from '../utils/confetti' // déjà utilisé sur Home

const MotionBox = motion(Box)
const MotionButton = motion(Button)

/* ---------- Keyframes ---------- */
const shine = keyframes`
  from { background-position: 0% 50%; } to { background-position: 200% 50%; }
`
const spinSlow = keyframes`
  from { transform: rotate(0deg); } to { transform: rotate(360deg); }
`
const float = keyframes`
  0%{ transform: translateY(0) } 50%{ transform: translateY(-10px) } 100%{ transform: translateY(0) }
`

export default function Contact() {
  const toast = useToast()

  // --- Photo tilt
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rotateX = useTransform(my, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-8, 8])
  const onHeroMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  // --- Magnetic CTA
  const bx = useMotionValue(0), by = useMotionValue(0)
  const onBtnMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    bx.set((e.clientX - (r.left + r.width/2)) * 0.08)
    by.set((e.clientY - (r.top  + r.height/2)) * 0.08)
  }
  const onBtnLeave = () => { bx.set(0); by.set(0) }

  // --- Form state + validation légère
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({})
  const MAX = 1200

  const errors = useMemo(() => {
    const e = {}
    if (!form.name.trim()) e.name = 'Votre nom est requis'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide'
    if (form.message.trim().length < 10) e.message = 'Message trop court'
    if (form.message.length > MAX) e.message = `Max ${MAX} caractères`
    return e
  }, [form])

  const onChange = (key) => (ev) => setForm((f) => ({ ...f, [key]: ev.target.value }))
  const onBlur = (key) => () => setTouched((t) => ({ ...t, [key]: true }))

  // --- Submit: ouvre le client mail (mailto:) avec sujet/corps préremplis
  const onSubmit = (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(errors).length) {
      toast({ title: 'Veuillez corriger le formulaire', status: 'warning', duration: 2200 })
      return
    }
    const subject = `📨 Contact depuis le portfolio — ${form.name}`
    const body =
      `Nom: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}\n\n— Envoyé depuis le portfolio`
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    try {
      window.location.href = url
      confettiBurst?.(window.innerWidth / 2, window.innerHeight / 2)
      toast({ title: 'Merci ! Votre client email va s’ouvrir.', status: 'success', duration: 2500 })
      setForm({ name: '', email: '', message: '' })
      setTouched({})
    } catch {
      toast({ title: 'Impossible d’ouvrir le client email.', status: 'error' })
    }
  }

  return (
    <Box as="main" px={{ base: 5, md: 8 }} py={{ base: 8, md: 12 }} position="relative" overflow="hidden">
      {/* Fond aurora + blobs */}
      <Box position="absolute" inset={0} zIndex={0}
        bg="linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)" />
      <Box position="absolute" inset={0} zIndex={0}
        bg="linear-gradient(120deg, rgba(0,255,255,0.08), rgba(233,30,99,0.08), rgba(124,77,255,0.08))"
        sx={{ backgroundSize: '220% 220%', animation: `${shine} 14s linear infinite` }} />
      <Box position="absolute" top="-90px" left="-120px" w="360px" h="360px" borderRadius="50%"
        filter="blur(90px)" bg="rgba(0,255,255,0.35)" opacity={0.5} animation={`${float} 11s ease-in-out infinite`} />
      <Box position="absolute" bottom="-120px" right="-140px" w="420px" h="420px" borderRadius="50%"
        filter="blur(110px)" bg="rgba(233,30,99,0.35)" opacity={0.45} animation={`${float} 13s ease-in-out infinite`} />

      {/* ========= EN-TÊTE avec photo & pitch ========= */}
      <MotionBox
        position="relative" zIndex={1}
        display="grid"
        gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        gap={10} alignItems="center" mb={10}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
      >
        {/* Photo & aura */}
        <MotionBox
          onMouseMove={onHeroMove}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          textAlign="center"
        >
          <Box position="relative" display="inline-block" sx={{ transform: 'translateZ(30px)' }}>
            {/* Anneau conique animé */}
            <Box
              position="absolute" inset={-10} borderRadius="full"
              bg="conic-gradient(from 0deg, #00ffff, #e91e63, #7C4DFF, #00ffff)"
              sx={{ animation: `${spinSlow} 8s linear infinite` }}
              filter="blur(10px)" opacity={0.9}
            />
            <Box position="absolute" inset={-3} borderRadius="full" border="2px solid rgba(255,255,255,0.25)" />
            <Box
              as="img" src="/images/profile.jpeg" alt="Photo de profil"
              w={{ base: 180, md: 220 }} h={{ base: 180, md: 220 }} borderRadius="full" objectFit="cover"
              position="relative" zIndex={1} boxShadow="0 10px 40px rgba(0,0,0,0.35)"
            />
          </Box>

          <Heading
            mt={6}
            size={{ base: 'lg', md: 'xl' }}
            bgGradient="linear(to-r,#00ffff,#e91e63,#7C4DFF,#00ffff)"
            bgClip="text"
            sx={{ backgroundSize: '200% auto', animation: `${shine} 8s linear infinite` }}
          >
            Travaillons ensemble
          </Heading>
          <Text color="whiteAlpha.900" maxW="560px" mx="auto" mt={2}>
            Un message, une idée, un projet ? Je réponds rapidement et je peux proposer une courte visio
            pour cadrer votre besoin (tech stack, architecture, délais).
          </Text>

          {/* Actions rapides */}
          <HStack spacing={3} mt={4} justify="center">
            <IconButton
              as={Link}
              isExternal
              href="https://github.com/CabrelLene"
              aria-label="GitHub"
              icon={<FaGithub />}
              variant="outline"
              borderColor="whiteAlpha.300"
              _hover={{ bg: 'whiteAlpha.200' }}
            />
            <IconButton
              as={Link}
              href="mailto:"
              aria-label="Email"
              icon={<FaEnvelope />}
              variant="outline"
              borderColor="whiteAlpha.300"
              _hover={{ bg: 'whiteAlpha.200' }}
            />
          </HStack>
        </MotionBox>

        {/* ========= FORMULAIRE (verre dépoli + labels fluides) ========= */}
        <MotionBox
          as="form"
          onSubmit={onSubmit}
          p={{ base: 5, md: 6 }}
          border="1px solid rgba(255,255,255,0.12)"
          bg="rgba(255,255,255,0.06)"
          borderRadius="xl"
          backdropFilter="blur(10px)"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Heading size="md" mb={5}>Contactez-moi</Heading>

          {/* Nom */}
          <Box mb={4} position="relative">
            <Text mb="1" fontWeight="medium">Nom</Text>
            <Input
              placeholder="Votre nom"
              value={form.name}
              onChange={onChange('name')}
              onBlur={onBlur('name')}
              borderColor={touched.name && errors.name ? 'red.400' : 'whiteAlpha.300'}
              _focus={{ borderColor: 'teal.300', boxShadow: '0 0 0 1px rgba(0,255,255,.4)' }}
            />
            {touched.name && errors.name && <Text mt={1} fontSize="sm" color="red.300">{errors.name}</Text>}
          </Box>

          {/* Email */}
          <Box mb={4}>
            <Text mb="1" fontWeight="medium">Email</Text>
            <Input
              type="email"
              placeholder="email@domaine.com"
              value={form.email}
              onChange={onChange('email')}
              onBlur={onBlur('email')}
              borderColor={touched.email && errors.email ? 'red.400' : 'whiteAlpha.300'}
              _focus={{ borderColor: 'teal.300', boxShadow: '0 0 0 1px rgba(0,255,255,.4)' }}
            />
            {touched.email && errors.email && <Text mt={1} fontSize="sm" color="red.300">{errors.email}</Text>}
          </Box>

          {/* Message */}
          <Box mb={5} position="relative">
            <Text mb="1" fontWeight="medium">Message</Text>
            <Textarea
              rows={7}
              placeholder="Votre message..."
              value={form.message}
              onChange={onChange('message')}
              onBlur={onBlur('message')}
              borderColor={touched.message && errors.message ? 'red.400' : 'whiteAlpha.300'}
              _focus={{ borderColor: 'teal.300', boxShadow: '0 0 0 1px rgba(0,255,255,.4)' }}
            />
            <Text position="absolute" bottom="-18px" right="0" fontSize="sm" color="whiteAlpha.700">
              {form.message.length}/1200
            </Text>
            {touched.message && errors.message && <Text mt={1} fontSize="sm" color="red.300">{errors.message}</Text>}
          </Box>

          {/* CTA magnétique */}
          <MotionButton
            type="submit"
            colorScheme="teal"
            w="full"
            whileHover={{ scale: 1.02, boxShadow:'0 0 32px rgba(0,255,255,0.35), 0 0 60px rgba(233,30,99,0.2)' }}
            whileTap={{ scale: 0.97 }}
            onMouseMove={onBtnMove}
            onMouseLeave={onBtnLeave}
            style={{ x: bx, y: by }}
            rightIcon={<FaArrowRight />}
          >
            Envoyer
          </MotionButton>
        </MotionBox>
      </MotionBox>

      {/* Bas de page mini-argumentaire */}
      <VStack spacing={2} mt={8} textAlign="center" position="relative" zIndex={1}>
        <Text color="whiteAlpha.800">Temps moyen de réponse : rapide • Français / English</Text>
        <Text color="whiteAlpha.700" fontSize="sm">
          Vos informations ne sont utilisées que pour vous répondre.
        </Text>
      </VStack>
    </Box>
  )
}
