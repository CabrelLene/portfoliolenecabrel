import { Box, Heading, Text, Link, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export default function ProjectCard({ project }) {
  return (
    <MotionBox
      maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden"
      bg="gray.800" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}
    >
      <Image src={project.image} alt={project.title} objectFit="cover" h="200px" w="100%" />
      <Box p="6">
        <Heading size="md" mb="2">{project.title}</Heading>
        <Text mb="4">{project.description}</Text>
        <Link href={project.link} isExternal color="teal.300" fontWeight="bold">
          Voir sur GitHub
        </Link>
      </Box>
    </MotionBox>
  )
}
