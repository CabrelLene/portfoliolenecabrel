// src/components/CursorGlow.jsx
import { Box } from '@chakra-ui/react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const x = useMotionValue(-200), y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 150, damping: 20 })
  const sy = useSpring(y, { stiffness: 150, damping: 20 })

  const onMove = (e) => {
    x.set(e.clientX - 150)
    y.set(e.clientY - 150)
  }

  return (
    <>
      <Box position="fixed" inset={0} zIndex={2} onMouseMove={onMove} pointerEvents="none" />
      <Box
        as={motion.div}
        style={{ x: sx, y: sy }}
        position="fixed"
        w="300px"
        h="300px"
        zIndex={0}
        borderRadius="50%"
        pointerEvents="none"
        filter="blur(30px)"
        bg="radial-gradient(circle, rgba(0,255,255,0.15) 0%, rgba(0,0,0,0) 60%)"
        mixBlendMode="screen"
      />
    </>
  )
}
