// src/pages/Contact.jsx
import { 
    Box, 
    Heading, 
    Input, 
    Textarea, 
    Button, 
    Text 
  } from '@chakra-ui/react'
  import { motion } from 'framer-motion'
  
  const MotionBox    = motion(Box)
  const MotionButton = motion(Button)
  
  export default function Contact() {
    return (
      <MotionBox
        as="form"
        maxW="md"
        mx="auto"
        p="8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading mb="6" textAlign="center">
          Contactez-moi
        </Heading>
  
        <Box mb="4">
          <Text mb="1" fontWeight="medium">Nom</Text>
          <Input placeholder="Votre nom" />
        </Box>
  
        <Box mb="4">
          <Text mb="1" fontWeight="medium">Email</Text>
          <Input type="email" placeholder="email@domaine.com" />
        </Box>
  
        <Box mb="6">
          <Text mb="1" fontWeight="medium">Message</Text>
          <Textarea placeholder="Votre message..." rows={6} />
        </Box>
  
        <MotionButton
          type="submit"
          colorScheme="teal"
          width="full"
          whileHover={{ scale: 1.02 }}
        >
          Envoyer
        </MotionButton>
      </MotionBox>
    )
  }
  