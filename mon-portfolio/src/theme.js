
import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  brand: {
    50: '#ffe3ec',
    100: '#ffb8d2',
    200: '#ff8cba',
    300: '#f364a2',
    400: '#e8368f',
    500: '#da127d',
    600: '#a30b61',
    700: '#780944',
    800: '#4c0520',
    900: '#2a0014',
  },
  neon: {
    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    accent1: '#e91e63',   // rose
    accent2: '#00ffff',   // cyan
  },
}

const fonts = {
  heading: "'Poppins', sans-serif",
  body:    "'Inter', sans-serif",
}

const styles = {
  global: {
    body: {
      bg: colors.neon.background,
      color: 'whiteAlpha.900',
      fontFamily: fonts.body,
      lineHeight: 'tall',
    },
    a: {
      color: 'neon.accent1',
    },
  },
}

export default extendTheme({ config, colors, fonts, styles })
