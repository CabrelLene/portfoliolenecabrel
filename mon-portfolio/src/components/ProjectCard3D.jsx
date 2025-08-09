// src/components/ProjectCard3D.jsx
import React from 'react'
import { Box, Heading, Text, HStack, Tag } from '@chakra-ui/react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import '@lottiefiles/lottie-player'

const MotionBox = motion(Box)

/**
 * Props:
 * - title, description, tags: []string
 * - href: string
 * - cover: string (ex: "/images/projects/p1.jpg") (facultatif; fallback gradient sinon)
 * - accent: string (couleur accent)
 * - lottieSrc: string (URL lottie.json) (facultatif)
 */
export default function ProjectCard3D({
  title,
  description,
  tags = [],
  href = '#',
  cover,
  accent = '#00ffff',
  lottieSrc,
}) {
  // tilt parallax
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rotateX = useTransform(my, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-10, 10])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const onLeave = () => { mx.set(0); my.set(0) }

  const bg = cover
    ? `url(${cover})`
    : 'linear-gradient(135deg, rgba(0,255,255,0.15), rgba(233,30,99,0.15))'

  return (
    <MotionBox
      as="a"
      href={href}
      target="_self"
      rel="noopener"
      role="group"
      position="relative"
      overflow="hidden"
      borderRadius="xl"
      border="1px solid rgba(255,255,255,0.08)"
      bg="rgba(255,255,255,0.04)"
      backdropFilter="blur(6px)"
      minH="320px"
      p="0"
      style={{ perspective: 1200 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Plan 0: image / fond */}
      <MotionBox
        position="absolute"
        inset={0}
        bgImage={bg}
        bgSize={cover ? 'cover' : '200% 200%'}
        bgPos="center"
        opacity={0.9}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        _after={{
          content: '""',
          position: 'absolute',
          inset: 0,
          bg: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(10,10,20,0.75) 100%)',
        }}
      />

      {/* Shine overlay (gloss) */}
      <Box
        position="absolute"
        top="-20%"
        left="-40%"
        w="60%"
        h="140%"
        transform="rotate(20deg) translateX(-140%)"
        bg="linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.0) 100%)"
        transition="transform .6s ease"
        pointerEvents="none"
        _groupHover={{ transform: 'rotate(20deg) translateX(140%)' }}
      />

      {/* Plan 1: Lottie optionnelle (flotte au-dessus) */}
      {lottieSrc && (
        <Box
          as="lottie-player"
          src={lottieSrc}
          background="transparent"
          speed="1"
          loop
          autoplay
          style={{ width: 120, height: 120 }}
          position="absolute"
          top="16px"
          right="16px"
          zIndex={1}
          pointerEvents="none"
        />
      )}

      {/* Plan 2: contenu en profondeur */}
      <MotionBox
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        p="5"
        zIndex={2}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <Heading
          as="h3"
          size="lg"
          mb="2"
          color="whiteAlpha.900"
          style={{ transform: 'translateZ(40px)' }}
          textShadow="0 0 18px rgba(0,0,0,0.35)"
        >
          {title}
        </Heading>
        <Text
          color="whiteAlpha.800"
          mb="4"
          noOfLines={2}
          style={{ transform: 'translateZ(25px)' }}
        >
          {description}
        </Text>

        <HStack spacing="2" wrap="wrap">
          {tags.map((t) => (
            <Tag
              key={t}
              size="sm"
              colorScheme="blackAlpha"
              bg="rgba(0,0,0,0.35)"
              border="1px solid rgba(255,255,255,0.15)"
              style={{ transform: 'translateZ(20px)' }}
            >
              {t}
            </Tag>
          ))}
        </HStack>

        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          h="2px"
          bgGradient={`linear(to-r, transparent, ${accent}, transparent)`}
          opacity={0.7}
          style={{ transform: 'translateZ(10px)' }}
        />
      </MotionBox>
    </MotionBox>
  )
}
