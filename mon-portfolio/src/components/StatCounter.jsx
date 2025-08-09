import React, { useEffect, useRef, useState } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { useMotionValue, animate, useInView } from 'framer-motion'

export default function StatCounter({ to = 50, label = 'Projets', suffix = '+', duration = 1.8 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const mv = useMotionValue(0)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(mv, to, { duration, ease: 'easeOut' })
    const unsub = mv.on('change', v => setValue(Math.round(v)))
    return () => { controls.stop(); unsub() }
  }, [isInView, to, duration, mv])

  return (
    <Box ref={ref} textAlign="center" p={6} border="1px solid rgba(255,255,255,0.08)" borderRadius="lg" bg="rgba(255,255,255,0.04)" backdropFilter="blur(6px)">
      <Heading size="2xl" color="teal.200">{value}{suffix}</Heading>
      <Text mt="2" color="whiteAlpha.800">{label}</Text>
    </Box>
  )
}
