// src/sections/Formation.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Box, Heading, Text, SimpleGrid, HStack, VStack, Badge, Tag, TagLabel,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
  Divider, Button, List, ListItem, ListIcon, chakra
} from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { formation } from "../data/formation";
import {
  FaAndroid, FaApple, FaGlobe, FaCheckCircle,
  FaCertificate, FaUniversity, FaCalendarAlt
} from "react-icons/fa";
import "@lottiefiles/lottie-player";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

/* ---------- Compteur animé ---------- */
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

/* ---------- Icône d’axe ---------- */
function AxisIcon({ name, size = 24 }) {
  if (name === "android") return <FaAndroid size={size} />;
  if (name === "apple")   return <FaApple size={size} />;
  return <FaGlobe size={size} />;
}

/* ---------- Carte d’axe ---------- */
function AxisCard({ axe }) {
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

/* ---------- Nouvelles formations (ajout sans doublon) ---------- */
const certifs = [
  {
    title: "Certificat professionnel en soutien des TI de Google",
    org: "NPower Canada • Montréal",
    period: "Nov. 2023 – Fév. 2023",
    bullets: [
      "Formation intensive (fondamentaux IT + bases gestion de projet).",
      "Windows & Linux : configuration, partitions disque & systèmes de fichiers.",
      "Support orienté service : diagnostic, documentation, scripting.",
      "Réseaux: notions DNS/DHCP/TCP-IP.",
      "Services d’annuaire (Active Directory, OpenLDAP).",
      "Fondements Agile : Scrum & Kanban."
    ]
  }
];

const diplomes = [
  {
    title: "Licence en Informatique",
    org: "Université de Yaoundé 1 • Yaoundé",
    period: "2020",
    note: "Évaluation comparative MIFI (Baccalauréat — Sciences de l’informatique)."
  },
  {
    title: "Master 1 — Informatique (Sécurité des Systèmes d’Informations)",
    org: "Université de Yaoundé 1 • Yaoundé",
    period: "2022"
  },
  {
    title: "Master 2 (partiel) — Informatique (Sécurité des Systèmes d’Informations)",
    org: "Université de Yaoundé 1 • Yaoundé",
    period: "2022 — en cours"
  }
];

/* ---------- Puce de timeline ---------- */
const Dot = (props) => (
  <Box
    w="10px" h="10px" borderRadius="full"
    bgGradient="linear(to-r, teal.300, purple.400)"
    boxShadow="0 0 0 4px rgba(255,255,255,0.06)"
    flexShrink={0}
    {...props}
  />
);

export default function Formation() {
  const { resume, axes, objectifs, technos, blocs } = formation;

  return (
    <Box as="main" px={{ base: 5, md: 8 }} py={{ base: 10, md: 16 }} position="relative" overflow="hidden">
      {/* Fond doux */}
      <MotionBox
        position="absolute"
        inset={0}
        style={{ background: "radial-gradient(1200px 600px at 10% -20%, rgba(0,255,255,0.08), transparent 60%), radial-gradient(900px 500px at 110% 40%, rgba(124,77,255,0.08), transparent 60%)" }}
        pointerEvents="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* ===== HERO AEC (conservé) ===== */}
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

      {/* Axes AEC (conservés) */}
      <Heading as="h2" size="lg" mb={4}>Axes du programme</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
        {axes.map((axe) => <AxisCard key={axe.key} axe={axe} />)}
      </SimpleGrid>

      {/* Objectifs AEC (conservés) */}
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

      {/* Projet intégrateur + Stage (conservés) */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={12}>
        <MotionBox
          p={6}
          rounded="lg"
          bg="linear-gradient(145deg, rgba(0,255,255,0.06), rgba(124,77,255,0.06))"
          border="1px solid rgba(0,255,255,0.15)"
          whileHover={{ y: -4 }}
        >
          <Heading as="h3" size="md" mb={2}>Projet intégrateur (équipe)</Heading>
          <Text>90 heures sur un projet significatif. Collaboration, qualité et livraison.</Text>
        </MotionBox>

        <MotionBox
          p={6}
          rounded="lg"
          bg="linear-gradient(145deg, rgba(233,30,99,0.06), rgba(124,77,255,0.06))"
          border="1px solid rgba(233,30,99,0.15)"
          whileHover={{ y: -4 }}
        >
          <Heading as="h3" size="md" mb={2}>Stage en entreprise</Heading>
          <Text>6 semaines pour mettre en pratique : conception, dev & déploiement d’une application réelle.</Text>
        </MotionBox>
      </SimpleGrid>

      {/* Grille des cours AEC (conservée) */}
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

      {/* ===== AJOUT : Certifications (nouveau) ===== */}
      <Heading as="h2" size="lg" mb={4} display="flex" alignItems="center" gap={3}>
        <FaCertificate /> Certifications
      </Heading>
      <MotionVStack
        spacing={5} align="stretch" mb={10}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
      >
        {certifs.map((c, idx) => (
          <MotionBox
            key={idx}
            p={5}
            border="1px solid"
            borderColor="whiteAlpha.200"
            rounded="lg"
            bg="blackAlpha.400"
            backdropFilter="blur(6px)"
            whileHover={{ y: -2 }}
          >
            <HStack align="start" spacing={4}>
              <Dot mt="10px" />
              <Box flex="1">
                <HStack justify="space-between" align="start" wrap="wrap">
                  <Heading as="h3" size="md">{c.title}</Heading>
                  <Badge colorScheme="teal" variant="subtle">{c.period}</Badge>
                </HStack>
                <Text mt={1} fontWeight="medium" color="teal.200">{c.org}</Text>
                <List mt={3} spacing={2}>
                  {c.bullets.map((b, i) => (
                    <ListItem key={i}>
                      <ListIcon as={FaCheckCircle} color="teal.300" />
                      {b}
                    </ListItem>
                  ))}
                </List>
              </Box>
            </HStack>
          </MotionBox>
        ))}
      </MotionVStack>

      {/* ===== AJOUT : Diplômes (nouveau) ===== */}
      <Heading as="h2" size="lg" mb={4} display="flex" alignItems="center" gap={3}>
        <FaUniversity /> Diplômes
      </Heading>
      <MotionVStack
        spacing={5} align="stretch"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
      >
        {diplomes.map((d, idx) => (
          <MotionBox
            key={idx}
            p={5}
            border="1px solid"
            borderColor="whiteAlpha.200"
            rounded="lg"
            bg="blackAlpha.400"
            backdropFilter="blur(6px)"
            whileHover={{ y: -2 }}
          >
            <HStack align="start" spacing={4}>
              <Dot mt="10px" />
              <Box flex="1">
                <HStack justify="space-between" align="start" wrap="wrap">
                  <Heading as="h3" size="md">{d.title}</Heading>
                  <HStack color="purple.200" fontWeight="medium">
                    <FaCalendarAlt />
                    <Text>{d.period}</Text>
                  </HStack>
                </HStack>
                <Text mt={1} fontWeight="medium" color="purple.200">{d.org}</Text>
                {d.note && <Text mt={2} fontSize="sm" color="whiteAlpha.800">{d.note}</Text>}
              </Box>
            </HStack>
          </MotionBox>
        ))}
      </MotionVStack>

      {/* CTA */}
      <HStack spacing={4} mt={10}>
        <Button as="a" href="/projects" colorScheme="teal">Voir mes projets</Button>
        <Button as="a" href="/contact" variant="outline">Me contacter</Button>
      </HStack>
    </Box>
  );
}
