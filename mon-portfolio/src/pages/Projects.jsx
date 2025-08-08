import { SimpleGrid, Heading } from '@chakra-ui/react'
import projects from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import { motion } from 'framer-motion'

export default function Projects() {
  return (
    <>
      <Heading textAlign="center" my="8">Mes Projets</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="8" p="4">
        {projects.map((proj) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: proj.id * 0.2 }}
          >
            <ProjectCard project={proj} />
          </motion.div>
        ))}
      </SimpleGrid>
    </>
  )
}
