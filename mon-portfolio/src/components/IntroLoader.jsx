// src/components/IntroLoader.jsx
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import '@lottiefiles/lottie-player'

export default function IntroLoader({ minDuration = 1600, src = 'https://assets4.lottiefiles.com/packages/lf20_1pxqjqps.json' }) {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), minDuration)
    return () => clearTimeout(t)
  }, [minDuration])

  return (
    <AnimatePresence>
      {show && (
        <Box
          as={motion.div}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          position="fixed"
          inset={0}
          zIndex={999}
          bg="rgba(10,10,20,0.98)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            as="lottie-player"
            src={src}
            background="transparent"
            speed="1"
            loop
            autoplay
            style={{ width: 220, height: 220 }}
          />
        </Box>
      )}
    </AnimatePresence>
  )
}
