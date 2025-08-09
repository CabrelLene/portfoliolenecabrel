// src/data/formation.js
export const formation = {
    resume: {
      titre: "AEC • Développement d’applications mobiles (LEA.CB)",
      mode: "Formation hybride",             // PDF
      dureeMois: 13,                         // 13 mois
      heures: 1200,                          // 1200 heures
      projetIntegrateurHeures: 90,           // Projet intégrateur
      stageSemaines: 6,                      // Stage en entreprise
    },
    axes: [
      {
        key: "android",
        titre: "Android natif",
        points: [
          "POO, MVVM, tests unitaires",
          "Appels réseau, stockage, géolocalisation",
          "Déploiement & UX mobile"
        ],
        icon: "android",
      },
      {
        key: "ios",
        titre: "iOS natif",
        points: [
          "Interfaces déclaratives",
          "Navigation multi-vues",
          "Persistance locale + appels réseau"
        ],
        icon: "apple",
      },
      {
        key: "web",
        titre: "Web & Multiplateforme",
        points: [
          "PWA (cadriciel Web)",
          "Apps multiplateformes (librairies spécialisées)",
          "Accès cam/géo + perf & fiabilité"
        ],
        icon: "globe",
      },
    ],
    objectifs: [
      "Concevoir des applications mobiles",
      "Développer des apps natives & Web",
      "Organiser l’espace graphique d’une UI",
      "Assurer la qualité",
      "Publier & déployer des apps mobiles",
    ],
    technos: ["Vue.js", "React Native", "SQL", "NoSQL", "Git", "GitHub"],
    // Grille condensée par blocs (intitulés du PDF)
    blocs: [
      {
        titre: "Bloc 1",
        cours: [
          { code: "420-702-AH", nom: "Fonctionnement & utilisation d’un OS" },
          { code: "420-704-AH", nom: "Métier de programmeur : outils & standards" },
          { code: "420-717-AH", nom: "Techniques de programmation (mobile)" },
          { code: "570-701-AH", nom: "Conception d’UI numériques & adaptatives" },
        ],
      },
      {
        titre: "Bloc 2",
        cours: [
          { code: "410-294-AH", nom: "Intégration au marché du travail" },
          { code: "420-703-AH", nom: "Initiation à l’exploitation de base de données" },
          { code: "420-718-AH", nom: "Programmation de pages Web interactives" },
          { code: "420-719-AH", nom: "POO pour Android" },
        ],
      },
      {
        titre: "Bloc 3",
        cours: [
          { code: "420-720-AH", nom: "Introduction au développement iOS" },
          { code: "420-721-AH", nom: "Développement d’applications Android" },
          { code: "420-722-AH", nom: "Dév. d’applications Web progressives (PWA)" },
          { code: "420-723-AH", nom: "Développement de microservices" },
        ],
      },
      {
        titre: "Bloc 4",
        cours: [
          { code: "420-724-AH", nom: "Projet de déploiement d’application (équipe)" },
          { code: "420-725-AH", nom: "Développement d’applications iOS" },
          { code: "420-726-AH", nom: "Applications Web multiplateformes" },
          { code: "420-727-AH", nom: "Sécurisation & déploiement d’apps mobiles" },
        ],
      },
      {
        titre: "Bloc 5",
        cours: [{ code: "420-728-AH", nom: "Stage en entreprise" }],
      },
    ],
  };
  