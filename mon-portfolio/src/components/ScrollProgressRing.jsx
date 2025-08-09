import React from 'react'
import { Box } from '@chakra-ui/react'
import { motion, useTransform } from 'framer-motion'

const MotionSvg = motion.svg
const MotionCircle = motion.circle

export default function ScrollProgressRing({ progress, size = 56, stroke = 3 }) {
  const r = (size - stroke) / 2
  const C = 2 * Math.PI * r
  const dashOffset = useTransform(progress, [0, 1], [C, 0])

  return (
    <Box position="relative" w={`${size}px`} h={`${size}px`}>
      <MotionSvg width={size} height={size} style={{ rotate: -90 }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.15)" strokeWidth={stroke} fill="none"/>
        <MotionCircle
          cx={size/2}
          cy={size/2}
          r={r}
          stroke="url(#grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          style={{ strokeDasharray: C, strokeDashoffset: dashOffset }}
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="50%" stopColor="#e91e63" />
            <stop offset="100%" stopColor="#7C4DFF" />
          </linearGradient>
        </defs>
      </MotionSvg>
      {/* Slot pour ton icône au centre */}
      <Box position="absolute" inset="0" display="grid" placeItems="center" pointerEvents="none" />
    </Box>
  )
}
