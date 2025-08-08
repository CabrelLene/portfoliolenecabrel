
import { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import '@lottiefiles/lottie-player'

export default function Loader() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(t)
  }, [])

  if (!loading) return null
  return (
    <Box
      position="fixed"
      top="0" left="0"
      w="100vw" h="100vh"
      display="flex" alignItems="center" justifyContent="center"
      bg="blackAlpha.900" zIndex="overlay"
    >
      <lottie-player
        src="https://assets8.lottiefiles.com/packages/lf20_usmfx6bp.json"
        background="transparent"
        speed="1"
        style={{ width: '250px', height: '250px' }}
        loop
        autoplay
      />
    </Box>
  )
}
