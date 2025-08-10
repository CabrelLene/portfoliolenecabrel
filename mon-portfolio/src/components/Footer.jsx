import { Box, Text, Link } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box as="footer" bg="gray.800" py="6" textAlign="center">
      <Text>© {new Date().getFullYear()} CABREL LENE. Tous droits réservés.</Text>
      <Link href="mailto:email@domaine.com" color="teal.300">Contactez-moi</Link>
    </Box>
  )
}
