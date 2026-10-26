import type { Track } from "./site";

/* ==================================================================
   👉 TES PROJETS — ajouter un projet = ajouter un objet ici.
   La carte sur l'accueil ET la page /projets/<slug> sont générées
   automatiquement. Un lien vide ("") n'est pas affiché.
   ================================================================== */

export type Project = {
  slug: string;
  title: string;
  label: string; // petite étiquette sur la vignette
  tracks: Track[];
  featured?: boolean;
  badge?: string;
  frame: string; // cadre : stage, projet de master, hackathon…
  summary: string; // texte de la carte (2-3 lignes, accrocheur)
  context: string; // page projet : "Contexte"
  work: string[]; // page projet : "Ce que j'ai réalisé"
  challenge?: { title: string; text: string }; // page projet : "Le défi technique"
  results?: string[]; // page projet : "Résultats"
  result?: { value: string; caption: string }; // chiffre clé (carte + page)
  skills: string[]; // page projet : "Compétences démontrées"
  stack: string[];
  links: { code?: string; demo?: string };
  image?: string; // capture d'écran dans /public (ex. "/projets/mon-projet.webp")
};

export const projects: Project[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: "plateforme-annonces-immobilieres",
    title: "Plateforme d'annonces immobilières",
    label: "full-stack · Next.js",
    tracks: ["fullstack"],
    featured: true,
    badge: "projet phare",
    frame: "Projet de Master 2 · frameworks serveur",
    summary:
      "Application web full-stack de publication et de recherche d'annonces, construite comme une vraie application en production : 4 niveaux d'accès, authentification sécurisée, protection contre les failles IDOR, tests automatisés et déploiement en ligne.",
    result: { value: "4 rôles", caption: "visiteur · utilisateur · agent · administrateur" },
    context:
      "Projet du module « frameworks serveur » du Master 2 IWOCS : concevoir et livrer une plateforme complète d'annonces immobilières, de la modélisation des données jusqu'à la mise en ligne, avec les exigences d'une application réelle : gestion des droits, sécurité et qualité du code.",
    work: [
      "Application Next.js et React avec rendu côté serveur, typée de bout en bout en TypeScript",
      "4 niveaux d'accès (visiteur, utilisateur, agent, administrateur), avec des droits vérifiés côté serveur",
      "CRUD des annonces avec cycle de publication, upload de photos, favoris et questions/réponses",
      "Recherche avec filtres et pagination",
      "Authentification par sessions stockées en base avec Better Auth",
      "Modèle de données Prisma sur PostgreSQL, base conteneurisée avec Docker",
      "Workflow GitLab professionnel : une branche par fonctionnalité, merge requests relues",
    ],
    challenge: {
      title: "Sécurité et performance",
      text: "Chaque action sensible vérifie que l'utilisateur a bien le droit d'agir sur la ressource visée. La protection contre les failles IDOR (accéder à l'annonce d'un autre en changeant simplement un identifiant) est vérifiée par des tests d'attaque. Toutes les entrées sont validées avec Zod, et les requêtes Prisma sont écrites pour éviter le problème N+1.",
    },
    results: [
      "Application déployée et accessible en ligne",
      "Tests automatisés avec Vitest, y compris sur la sécurité",
      "Code relu systématiquement via merge requests",
    ],
    skills: [
      "Architecture full-stack",
      "Sécurité applicative",
      "Gestion des rôles et des droits",
      "Tests automatisés",
      "Modélisation de données",
      "Git et revue de code",
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Better Auth", "Zod", "Vitest", "Docker"],
    links: { code: "https://github.com/mohamedriadbeaizia/annonces-immobilieres", demo: "https://annonces-immobilieres-yxih.vercel.app/annonces" },
    image: "/projets/plateforme-annonces-immobilieres.webp",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "floyd-warshall-cuda",
    title: "Floyd-Warshall accéléré sur GPU",
    label: "gpu · CUDA",
    tracks: ["data"],
    frame: "Projet de Master · calcul haute performance",
    summary:
      "Portage d'un algorithme de plus courts chemins de C vers GPU avec CUDA, sur un graphe de 5 427 sommets : le calcul passe de 6 minutes à 11 secondes, avec un résultat strictement identique.",
    result: { value: "5 min 57 → 10,7 s", caption: "≈ 33 fois plus rapide que le CPU" },
    context:
      "L'algorithme de Floyd-Warshall calcule les plus courts chemins entre toutes les paires de sommets d'un graphe, ici pour en déduire le diamètre. En C séquentiel, le calcul prend près de 6 minutes. Objectif : le paralléliser sur une carte graphique NVIDIA avec CUDA.",
    work: [
      "Analyse des dépendances : à une étape k donnée, les n² cases de la matrice sont indépendantes, mais l'étape k dépend de l'étape k−1",
      "Kernel CUDA en grille 2D (blocs de 16×16 threads) : chaque thread calcule une case (i, j)",
      "Double buffering : deux matrices en mémoire GPU dont on échange les pointeurs, pour éviter les conflits lecture/écriture",
      "Réduction parallèle du maximum en mémoire partagée, synchronisée avec __syncthreads()",
      "Mesures de performance et vérification du résultat à chaque étape",
    ],
    challenge: {
      title: "Savoir quoi paralléliser",
      text: "La boucle sur k doit rester séquentielle, mais chaque itération lance n² threads en parallèle. La loi d'Amdahl explique ensuite pourquoi paralléliser aussi le calcul du maximum n'apporte presque rien : il ne s'exécute qu'une seule fois, contre 5 427 itérations pour le cœur de l'algorithme. Optimiser, c'est d'abord mesurer où part le temps.",
    },
    results: [
      "CPU : 5 min 57 s → GPU : 10,7 s, soit environ 33 fois plus rapide",
      "Diamètre identique entre les versions CPU et GPU (12 343,15)",
      "Rapport technique avec analyse par la loi d'Amdahl, et soutenance orale",
    ],
    skills: [
      "Programmation parallèle",
      "CUDA / GPU",
      "Optimisation de performance",
      "Analyse d'algorithmes",
      "Langage C",
    ],
    stack: ["C", "CUDA", "GPU NVIDIA", "Mémoire partagée"],
    links: { code: "" },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "ecocoast-simulator",
    title: "EcoCoast Simulator",
    label: "web · Leaflet",
    tracks: ["fullstack", "data"],
    badge: "hackathon",
    frame: "Hackathon Erasmus+ · 1 semaine · équipe internationale",
    summary:
      "Application web qui montre l'impact d'un chantier sur la qualité de l'eau d'une plage avant même qu'il commence. Conçue en une semaine, en anglais, avec une équipe internationale au hackathon Tech4Good d'EUNICoast.",
    result: { value: "1 semaine", caption: "du sujet au prototype, en équipe internationale" },
    context:
      "Hackathon Tech4Good « Digital Tools for Coastal Futures » de l'EUNICoast Student Festival à Sassari (Sardaigne), programme intensif Erasmus+ qui réunit des étudiants d'universités côtières européennes. Notre défi, lié à l'objectif de développement durable n° 11 : comment mesurer l'impact d'un chantier littoral avant sa construction ?",
    work: [
      "Carte satellite interactive avec Leaflet, sur des plages de Sardaigne et de Crète",
      "Placement des projets (marina, hôtel, usine de dessalement, route) par glisser-déposer",
      "Animation des panaches de sédiments sur Canvas, selon les courants",
      "Indicateurs en temps réel : qualité de l'eau, turbidité, herbiers de posidonie, bruit",
      "Projection sur 5 ans avec Chart.js, vue avant/après et mesures de protection activables",
      "Export d'un rapport d'impact",
    ],
    challenge: {
      title: "Du problème flou à l'outil concret",
      text: "En quelques jours, il faut transformer une question ouverte en outil utilisable : choisir ce qu'on construit, et surtout ce qu'on laisse de côté. Le tout en anglais, avec des profils et des cultures différents, ce qui oblige à expliquer simplement et rend le projet meilleur.",
    },
    results: ["Prototype fonctionnel livré en une semaine", "Un outil pensé pour aider à décider, pas seulement pour visualiser"],
    skills: [
      "Prototypage rapide",
      "Visualisation de données",
      "Cartographie web",
      "Travail en équipe internationale",
      "Anglais professionnel",
    ],
    stack: ["JavaScript", "Leaflet", "Chart.js", "Canvas", "Tailwind CSS"],
    links: { code: "https://github.com/mohamedriadbeaizia/ecocoast-simulato", demo: "https://mohamedriadbeaizia.github.io/ecocoast-simulato/" },
    image: "/projets/ecocoast-simulator.webp",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "polarisation-twitter",
    title: "Polarisation et chambres d'écho sur Twitter",
    label: "data · graphes / NLP",
    tracks: ["data"],
    badge: "analyse de réseaux",
    frame: "Projet de Master 2 IWOCS · en binôme · analyse de réseaux sociaux",
    summary:
      "174 781 tweets de la présidentielle américaine 2020 transformés en un graphe de 68 000 comptes. Détection de communautés (Louvain), ForceAtlas2 codé en Python natif et NLP : 85,6 % des communautés sont politiquement homogènes.",
    result: { value: "85,6 %", caption: "des 201 communautés détectées sont politiquement homogènes" },
    context:
      "Pendant une campagne électorale, les utilisateurs ont tendance à n'échanger qu'avec ceux qui pensent comme eux. Objectif : mesurer cette polarisation sur Twitter pendant la présidentielle américaine de 2020 (15 oct. – 8 nov.), à partir du dataset public « US Election 2020 Tweets » (Kaggle, CC0) : 77 689 tweets côté Biden et 97 092 côté Trump.",
    work: [
      "Graphe d'interactions orienté et pondéré avec NetworkX : 68 013 comptes et 94 384 liens (mentions et retweets)",
      "Extraction des mentions et retweets par expressions régulières, car le champ retweet_count ne dit pas qui est retweeté",
      "Attribution d'un camp à chaque compte, plus une seconde méthode indépendante basée sur les hashtags pour valider la robustesse",
      "Détection de communautés avec Louvain : 201 communautés, modularité Q = 0,677",
      "Mesure de polarisation indépendante de Louvain, par comptage des liens intra et inter-camps",
      "ForceAtlas2 implémenté en Python natif (mode LinLog) pour des visualisations multi-échelles à 600, 1 200 et 2 400 nœuds",
      "TF-IDF et PageRank pour les thèmes et les comptes influents de chaque camp, état de l'art VADER / BERTweet en analyse de sentiment",
      "Graphe temporel interactif avec Plotly",
    ],
    challenge: {
      title: "Deux mesures indépendantes qui se rejoignent",
      text: "Louvain détecte des communautés sans rien savoir des camps politiques ; la polarisation, elle, est calculée à partir des camps. Comme les deux mesures sont construites séparément, le fait que 85,6 % des communautés soient homogènes est une vraie preuve de chambres d'écho, pas un artefact de la méthode. En chemin, j'ai repéré un fichier prétraité qui supprimait silencieusement les @mentions et les hashtags : depuis, je vérifie toujours les données brutes avant d'analyser.",
    },
    results: [
      "Polarisation de 46,7 % sur le graphe complet, environ 62 % sur le noyau des comptes les plus actifs",
      "Le 7 novembre (annonce de la victoire) est le seul jour où l'activité côté Biden dépasse celle côté Trump",
      "Rapport LaTeX complet, présentation React de 18 slides et soutenance",
    ],
    skills: [
      "Analyse de réseaux",
      "Théorie des graphes",
      "NLP",
      "Visualisation de données",
      "Validation et qualité des données",
      "Python scientifique",
    ],
    stack: ["Python", "NetworkX", "pandas", "Louvain", "ForceAtlas2", "TF-IDF", "PageRank", "Plotly", "LaTeX"],
    links: { code: "" },
    image: "/projets/polarisation-twitter.webp",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "optimisation-planification",
    title: "Optimisation d'une planification logistique",
    label: "optimisation · PuLP",
    tracks: ["data"],
    frame: "Projet de Master · recherche opérationnelle",
    summary:
      "Problème de planification modélisé en programme linéaire et résolu à l'optimum avec un solveur, puis comparé à cinq méthodes heuristiques dont un recuit simulé. Avec visualisation des solutions et rapport d'expérimentation.",
    result: { value: "Optimum", caption: "atteint sur les 4 instances avec le solveur CBC" },
    context:
      "Planifier des envois au coût le plus bas en respectant des capacités, des jours de fermeture et une tarification par paliers. Un problème typique de logistique, où l'on veut à la fois la meilleure solution possible et une méthode rapide quand les instances grossissent.",
    work: [
      "Modélisation en programme linéaire en nombres entiers (MIP) : variables de flot, de charge et de palier ; contraintes de capacité, de fermeture et de choix de palier",
      "Résolution exacte avec PuLP et le solveur CBC, avec gestion des cas infaisables",
      "Cinq heuristiques : constructive déterministe, constructive randomisée, recherche locale à 3 voisinages, multistart et recuit simulé",
      "Création de nouvelles instances de test",
      "Visualisation des solutions : diagramme de Gantt des envois et charge par jour colorée par palier",
      "Rapport d'expérimentation : 4 tableaux, 3 figures, analyse de convergence",
    ],
    challenge: {
      title: "Qualité contre temps de calcul",
      text: "Le solveur garantit la solution optimale, mais son temps de calcul explose avec la taille du problème. Les heuristiques donnent une très bonne solution beaucoup plus vite. Le projet compare les deux approches de façon mesurée, après avoir validé le modèle sur l'exemple de l'énoncé (coût optimal attendu : 1 200).",
    },
    results: [
      "Solution optimale prouvée sur les 4 instances",
      "Comparaison chiffrée exact / heuristiques",
      "Visualisations lisibles pour interpréter les solutions",
    ],
    skills: ["Recherche opérationnelle", "Modélisation mathématique", "Métaheuristiques", "Python", "Visualisation de résultats"],
    stack: ["Python", "PuLP", "CBC", "MIP", "Recuit simulé", "Matplotlib", "LaTeX"],
    links: { code: "" },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "puzzle-recuit-simule",
    title: "Puzzle calendrier résolu par recuit simulé",
    label: "IA · métaheuristique",
    tracks: ["data"],
    frame: "Projet de Master · intelligence artificielle",
    summary:
      "Placer 10 pièces sur une grille-calendrier pour ne laisser visible que la date du jour. Le recuit simulé classique échouait : avec un voisinage guidé et un réchauffage, une solution valide est trouvée en quelques secondes.",
    result: { value: "2 à 17 s", caption: "pour une solution valide, là où la version classique échouait" },
    context:
      "Un puzzle où 10 polyominos (3 tétrominos et 7 pentominos) doivent couvrir exactement 47 cases d'un calendrier, en laissant libres les 3 cases du jour, du numéro et du mois choisis. Un problème de couverture exacte, très contraint, à résoudre par recuit simulé.",
    work: [
      "Modélisation des pièces et de leurs placements, avec une fonction de coût = trous + chevauchements (0 = solution valide)",
      "Diagnostic : le recuit simulé aléatoire plafonnait à un coût de 2, même après 40 essais de 300 000 itérations",
      "Voisinage guidé : réparation gloutonne stochastique qui favorise les placements sans conflit, avec 15 % d'exploration aléatoire",
      "Réchauffage automatique en cas de stagnation, et redémarrages multiples",
      "Deux implémentations : Python (rendu Matplotlib) et Processing/Java, avec animation en direct de la résolution et choix de la date à la souris",
      "Rapport LaTeX de 11 pages",
    ],
    challenge: {
      title: "Comprendre avant d'optimiser",
      text: "Sur un problème de couverture exacte, des mouvements purement aléatoires détruisent presque toujours ce qui fonctionne déjà. Plutôt que d'augmenter le nombre d'itérations, j'ai analysé pourquoi l'algorithme bloquait, puis guidé la recherche sans supprimer l'exploration.",
    },
    skills: ["Métaheuristiques", "Résolution de problèmes", "Algorithmique", "Visualisation interactive"],
    stack: ["Python", "Processing", "Java", "Matplotlib", "LaTeX"],
    links: { code: "" },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "site-optima-formation",
    title: "Site web — Optima Formation",
    label: "stage · React.js",
    tracks: ["fullstack"],
    frame: "Stage · 3 mois · avril – juin 2025",
    summary:
      "Stage de développeur front-end : conception et développement complet du site d'un organisme de formation en React, jusqu'à sa mise en production et sa documentation pour la reprise du projet.",
    context:
      "Optima Formation, organisme de formation basé à Marseille, avait besoin d'un site pour présenter son activité et ses formations. Mission : le concevoir, le développer et le mettre en ligne pendant mon stage de 3 mois.",
    work: [
      "Conception et développement complet du site en React.js",
      "Architecture en composants réutilisables, avec des pages dédiées aux différentes formations",
      "Interface responsive (mobile, tablette, ordinateur)",
      "Déploiement en production",
      "Rédaction de la documentation technique pour la reprise du projet",
    ],
    challenge: {
      title: "Livrer pour un vrai client",
      text: "Un site réel, dans un temps limité, qui devait rester maintenable après mon départ. D'où l'accent mis sur des composants réutilisables et sur une documentation claire, pour qu'un autre développeur puisse reprendre le projet sans moi.",
    },
    results: ["Site mis en production", "Documentation technique remise à l'entreprise"],
    skills: ["React", "Intégration responsive", "Mise en production", "Documentation technique", "Autonomie en entreprise"],
    stack: ["React.js", "JavaScript", "HTML", "CSS"],
    links: { demo: "" },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "simulation-base-distribuee",
    title: "Simulation d'une base de données distribuée",
    label: "simulation · Java",
    tracks: ["data", "fullstack"],
    frame: "Projet universitaire · modélisation et performance",
    summary:
      "Simulateur à événements discrets en Java qui modélise un coordinateur et plusieurs serveurs de base de données comme un réseau de files d'attente, pour déterminer la configuration qui tient la charge. Résultats validés par la théorie.",
    result: { value: "30 exécutions", caption: "en parallèle, confrontées au théorème de Jackson" },
    context:
      "Dans une base de données distribuée, un coordinateur central répartit les requêtes entre plusieurs serveurs. Question : combien de serveurs, et quelle vitesse de traitement, pour que le système ne sature pas ? Le système est modélisé comme un réseau de files d'attente M/M/1.",
    work: [
      "Simulateur à événements discrets en Java orienté objet (requêtes, événements, files d'attente), géré avec Maven",
      "Architecture coordinateur / n serveurs : file de priorité des événements, routage probabiliste et retour au coordinateur",
      "30 exécutions indépendantes (graines différentes) lancées en parallèle par multithreading",
      "Analyse de la stabilité selon le nombre de serveurs et leur vitesse",
      "Validation des résultats par le calcul théorique (théorème de Jackson)",
      "Export automatisé des résultats et courbes GnuPlot, rapport en LaTeX",
    ],
    challenge: {
      title: "Des résultats fiables malgré l'aléatoire",
      text: "Une seule simulation ne prouve rien quand les arrivées sont aléatoires. Multiplier les exécutions indépendantes, puis confronter les moyennes au modèle théorique, permet de s'assurer que le simulateur est juste avant de tirer des conclusions.",
    },
    skills: ["Java orienté objet", "Multithreading", "Modélisation de systèmes", "Analyse de performance"],
    stack: ["Java", "Maven", "Multithreading", "GnuPlot", "LaTeX"],
    links: { code: "" },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "application-symfony",
    title: "Application web Symfony",
    label: "web app · Symfony",
    tracks: ["fullstack"],
    frame: "Projet universitaire · développement back-end",
    summary:
      "Application web en architecture MVC avec Symfony : entités Doctrine, CRUD complet via des formulaires typés, validation des données côté modèle et vues dynamiques avec Twig.",
    context:
      "Projet de développement d'une application web de gestion avec Symfony, framework PHP très utilisé en entreprise, en respectant son architecture MVC et ses bonnes pratiques.",
    work: [
      "Modélisation des entités et des relations avec l'ORM Doctrine",
      "CRUD complet via des formulaires typés Symfony",
      "Validation des données côté modèle, pour garantir leur cohérence quelle que soit la source",
      "Rendu dynamique des vues avec Twig",
    ],
    challenge: {
      title: "Respecter l'architecture MVC",
      text: "Séparer clairement les données (entités), la logique (contrôleurs) et l'affichage (templates), pour obtenir un code lisible, testable et facile à faire évoluer.",
    },
    skills: ["PHP / Symfony", "Architecture MVC", "ORM", "Validation de données"],
    stack: ["PHP", "Symfony", "Doctrine", "Twig", "MySQL"],
    links: { code: "" },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "jeu-squadro",
    title: "Jeu de plateau Squadro",
    label: "jeu · PHP POO",
    tracks: ["fullstack"],
    frame: "Projet universitaire · qualité logicielle",
    summary:
      "Jeu de plateau Squadro en PHP orienté objet : règles métier modélisées en classes, rendu HTML dynamique et couverture par tests unitaires PHPUnit, en équipe sous GitLab.",
    context:
      "Implémenter le jeu de plateau Squadro, avec ses règles de déplacement et de capture, en appliquant les principes de la programmation orientée objet et des tests unitaires.",
    work: [
      "Modélisation du plateau, des pièces et des règles en classes PHP",
      "Logique de déplacement et gestion des règles métier",
      "Rendu HTML dynamique du plateau",
      "Tests unitaires PHPUnit sur les règles du jeu",
      "Versionnement et travail collaboratif sous GitLab",
    ],
    challenge: {
      title: "Rendre les règles testables",
      text: "Isoler chaque règle du jeu dans des classes indépendantes de l'affichage, pour pouvoir la vérifier par un test unitaire et modifier le code sans risque de régression.",
    },
    skills: ["Programmation orientée objet", "Tests unitaires", "Qualité de code", "Git"],
    stack: ["PHP", "POO", "PHPUnit", "GitLab"],
    links: { code: "" },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "base-donnees-laver-cup",
    title: "Base de données Laver Cup",
    label: "bdd · SQL",
    tracks: ["data"],
    frame: "Projet universitaire · bases de données",
    summary:
      "Conception d'une base de données relationnelle autour de la Laver Cup (matchs, joueurs, statistiques) : modélisation, implémentation et requêtes d'analyse des performances.",
    context:
      "Concevoir de A à Z une base de données relationnelle pour suivre une compétition de tennis par équipes, puis l'exploiter pour analyser les performances des joueurs.",
    work: [
      "Modélisation relationnelle des matchs, joueurs, équipes et statistiques",
      "Implémentation du schéma en SQL",
      "Requêtes d'analyse et de suivi des performances",
    ],
    skills: ["Modélisation relationnelle", "SQL", "Analyse de données"],
    stack: ["SQL", "PostgreSQL", "Oracle"],
    links: { code: "" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
