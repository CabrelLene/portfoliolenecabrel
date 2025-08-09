// src/sections/Formation.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Box, Heading, Text, SimpleGrid, HStack, VStack, Badge, Tag, TagLabel,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Divider, Button
} from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { formation } from "../data/formation";
import { FaAndroid, FaApple, FaGlobe, FaCheckCircle } from "react-icons/fa";
import "@lottiefiles/lottie-player";

const MotionBox = motion(Box);

// ----- petit compteur animé quand l’élément entre dans le viewport
function Counter({ to = 0, suffix = "", duration = 800 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(to * p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return (
    <Heading ref={ref} as="div" size="2xl" lineHeight="1" mb={1}>
      {val}
      <Text as="span" fontSize="lg" ml={1} color="whiteAlpha.800">{suffix}</Text>
    </Heading>
  );
}

// ----- icône selon l’axe
function AxisIcon({ name, size = 24 }) {
  if (name === "android") return <FaAndroid size={size} />;
  if (name === "apple") return <FaApple size={size} />;
  return <FaGlobe size={size} />;
}

// ----- carte “axe” avec tilt léger
function AxisCard({ axe, idx }) {
  return (
    <MotionBox
      role="article"
      p={6}
      rounded="lg"
      bg="rgba(255,255,255,0.06)"
      border="1px solid rgba(255,255,255,0.12)"
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
    >
      <HStack spacing={3} mb={3}>
        <AxisIcon name={axe.icon} size={22} />
        <Heading as="h3" size="md">{axe.titre}</Heading>
      </HStack>
      <VStack align="start" spacing={2}>
        {axe.points.map((p) => (
          <HStack key={p} spacing={2}>
            <Box as={FaCheckCircle} opacity={0.85} />
            <Text>{p}</Text>
          </HStack>
        ))}
      </VStack>
    </MotionBox>
  );
}

export default function Formation() {
  const { resume, axes, objectifs, technos, blocs } = formation;

  return (
    <Box as="main" px={{ base: 5, md: 8 }} py={{ base: 10, md: 16 }} position="relative" overflow="hidden">
      {/* bandeau discret */}
      <MotionBox
        position="absolute"
        inset={0}
        style={{ background: "radial-gradient(1200px 600px at 10% -20%, rgba(0,255,255,0.08), transparent 60%), radial-gradient(900px 500px at 110% 40%, rgba(124,77,255,0.08), transparent 60%)" }}
        pointerEvents="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* HERO résumé + Lottie + compteurs */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center" mb={12}>
        <Box>
          <Badge colorScheme="purple" mb={3}>Formation</Badge>
          <Heading as="h1" size="xl" mb={3}>{resume.titre}</Heading>
          <Text color="whiteAlpha.800" mb={6}>
            {resume.mode} • Axes Android, iOS & Web multiplateforme. Projet intégrateur & stage en entreprise.
          </Text>

          <SimpleGrid columns={{ base: 3, sm: 4 }} gap={5}>
            <Box>
              <Counter to={resume.dureeMois} suffix="mois" />
              <Text fontSize="sm" color="whiteAlpha.700">Durée</Text>
            </Box>
            <Box>
              <Counter to={resume.heures} suffix="h" />
              <Text fontSize="sm" color="whiteAlpha.700">Total</Text>
            </Box>
            <Box>
              <Counter to={resume.projetIntegrateurHeures} suffix="h" />
              <Text fontSize="sm" color="whiteAlpha.700">Projet intégrateur</Text>
            </Box>
            <Box>
              <Counter to={resume.stageSemaines} suffix="sem" />
              <Text fontSize="sm" color="whiteAlpha.700">Stage</Text>
            </Box>
          </SimpleGrid>

          <HStack spacing={2} mt={6} wrap="wrap">
            {technos.map((t) => (
              <Tag key={t} size="md" variant="subtle" bg="rgba(255,255,255,0.06)">
                <TagLabel>{t}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            as="lottie-player"
            src="https://assets4.lottiefiles.com/packages/lf20_1pxqjqps.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            style={{ width: 260, height: 260 }}
          />
        </Box>
      </SimpleGrid>

      {/* Axes du programme */}
      <Heading as="h2" size="lg" mb={4}>Axes du programme</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
        {axes.map((axe, i) => <AxisCard key={axe.key} axe={axe} idx={i} />)}
      </SimpleGrid>

      {/* Objectifs officiels */}
      <Heading as="h2" size="lg" mb={3}>Objectifs & compétences</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} mb={10}>
        {objectifs.map((o, i) => (
          <MotionBox
            key={o}
            p={4}
            bg="rgba(255,255,255,0.04)"
            rounded="md"
            border="1px solid rgba(255,255,255,0.08)"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.05 }}
          >
            <HStack>
              <Box as={FaCheckCircle} />
              <Text>{o}</Text>
            </HStack>
          </MotionBox>
        ))}
      </SimpleGrid>

      {/* Focus Projet intégrateur + Stage */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={12}>
        <MotionBox
          p={6}
          rounded="lg"
          bg="linear-gradient(145deg, rgba(0,255,255,0.06), rgba(124,77,255,0.06))"
          border="1px solid rgba(0,255,255,0.15)"
          whileHover={{ y: -4 }}
        >
          <Heading as="h3" size="md" mb={2}>Projet intégrateur (équipe)</Heading>
          <Text>
            90 heures sur un projet significatif (ex. app de partage de dépenses). Collaboration, qualité et livraison. 
          </Text>
        </MotionBox>

        <MotionBox
          p={6}
          rounded="lg"
          bg="linear-gradient(145deg, rgba(233,30,99,0.06), rgba(124,77,255,0.06))"
          border="1px solid rgba(233,30,99,0.15)"
          whileHover={{ y: -4 }}
        >
          <Heading as="h3" size="md" mb={2}>Stage en entreprise</Heading>
          <Text>
            6 semaines pour mettre en pratique les acquis : participation à la conception, dev & déploiement d’une application réelle.
          </Text>
        </MotionBox>
      </SimpleGrid>

      {/* Grille des cours (par blocs) */}
      <Heading as="h2" size="lg" mb={3}>Grille de cours</Heading>
      <Accordion allowMultiple mb={8}>
        {blocs.map((b) => (
          <AccordionItem key={b.titre} border="none">
            <h3>
              <AccordionButton px={0}>
                <Box as="span" flex="1" textAlign="left" fontWeight="semibold">
                  {b.titre}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel px={0} pt={4}>
              <VStack align="stretch" spacing={3}>
                {b.cours.map((c) => (
                  <Box
                    key={c.code}
                    p={4}
                    rounded="md"
                    bg="rgba(255,255,255,0.03)"
                    border="1px solid rgba(255,255,255,0.08)"
                  >
                    <HStack justify="space-between" mb={1}>
                      <Text fontWeight="semibold">{c.nom}</Text>
                      <Badge variant="outline">{c.code}</Badge>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </AccordionPanel>
            <Divider my={4} opacity={0.2} />
          </AccordionItem>
        ))}
      </Accordion>

      <HStack spacing={4}>
        <Button as="a" href="/projects" colorScheme="teal">Voir mes projets</Button>
        <Button as="a" href="/contact" variant="outline">Me contacter</Button>
      </HStack>
    </Box>
  );
}
