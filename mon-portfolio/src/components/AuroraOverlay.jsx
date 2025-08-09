// src/components/AuroraOverlay.jsx
import { Box } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

const drift = keyframes`
  0% { transform: translate3d(-10%, -10%, 0) scale(1) rotate(0deg); }
  50% { transform: translate3d(10%, 10%, 0) scale(1.1) rotate(15deg); }
  100% { transform: translate3d(-10%, -10%, 0) scale(1) rotate(0deg); }
`

export default function AuroraOverlay() {
  return (
    <Box position="absolute" inset={0} zIndex={0} overflow="hidden" pointerEvents="none">
      {/* couche sombre */}
      <Box position="absolute" inset={0}
        bg="linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)"
      />
      {/* bulles néon floutées */}
      <Box
        position="absolute" top="-20%" left="-10%" w="60vw" h="60vw"
        borderRadius="50%"
        filter="blur(80px)"
        opacity={0.35}
        sx={{
          background: 'radial-gradient(circle at 30% 30%, #00ffff 0%, rgba(0,255,255,0) 60%)',
          animation: `${drift} 22s ease-in-out infinite`,
        }}
      />
      <Box
        position="absolute" bottom="-25%" right="-15%" w="65vw" h="65vw"
        borderRadius="50%"
        filter="blur(100px)"
        opacity={0.30}
        sx={{
          background: 'radial-gradient(circle at 30% 30%, #e91e63 0%, rgba(233,30,99,0) 60%)',
          animation: `${drift} 26s ease-in-out infinite reverse`,
        }}
      />
      <Box
        position="absolute" top="10%" right="5%" w="40vw" h="40vw"
        borderRadius="50%"
        filter="blur(90px)"
        opacity={0.25}
        sx={{
          background: 'radial-gradient(circle at 30% 30%, #7C4DFF 0%, rgba(124,77,255,0) 60%)',
          animation: `${drift} 28s ease-in-out infinite`,
        }}
      />
    </Box>
  )
}
