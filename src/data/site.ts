/* ==================================================================
   👉 TES INFOS PERSO — tout le texte "fixe" du site est ici.
   ================================================================== */

export const site = {
  name: "Mohamed Riad Beaizia",
  shortName: "Mohamed Riad",
  email: "mohamedriadbeaizia@gmail.com",
  phone: "+33629922624",
  phoneLabel: "06 29 92 26 24",
  linkedin: "https://www.linkedin.com/in/mohamed-riad-beaizia",
  github: "", // 👉 À FAIRE : ton URL GitHub (masqué tant que vide)

  status: "Stage de fin d'études · dès le 22 février 2027",
  description:
    "Étudiant en Master 2 IWOCS au Havre, à la recherche d'un stage de fin d'études de 4 à 6 mois en développement full-stack ou en data, à partir du 22 février 2027.",
};

/** Tes deux CV : mets les PDF dans le dossier /public */
export const cv = {
  fullstack: "/CV_Beaizia_FullStack.pdf",
  data: "/CV_Beaizia_Data.pdf",
};

export type Track = "fullstack" | "data";
export type Profile = "all" | Track;

/* ------------------------------------------------------------------
   Compétences — `tracks` = profils pour lesquels la compétence s'allume
   ------------------------------------------------------------------ */
type Skill = { name: string; tracks?: Track[] };
const F: Track[] = ["fullstack"];
const D: Track[] = ["data"];
const FD: Track[] = ["fullstack", "data"];

export const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Langages",
    skills: [
      { name: "TypeScript", tracks: F },
      { name: "JavaScript", tracks: F },
      { name: "Python", tracks: D },
      { name: "PHP", tracks: F },
      { name: "Java", tracks: FD },
      { name: "C / CUDA", tracks: D },
      { name: "SQL", tracks: FD },
      { name: "HTML / CSS", tracks: F },
      { name: "Bash" },
      { name: "LaTeX" },
    ],
  },
  {
    title: "Web & frameworks",
    skills: [
      { name: "Next.js", tracks: F },
      { name: "React.js", tracks: F },
      { name: "Node.js", tracks: F },
      { name: "Prisma", tracks: F },
      { name: "Symfony", tracks: F },
      { name: "Doctrine", tracks: F },
      { name: "Leaflet · Chart.js", tracks: FD },
    ],
  },
  {
    title: "Data, calcul & IA",
    skills: [
      { name: "NetworkX", tracks: D },
      { name: "NLP (TF-IDF)", tracks: D },
      { name: "Machine learning (régression, Ridge)", tracks: D },
      { name: "Jupyter", tracks: D },
      { name: "PuLP / programmation linéaire", tracks: D },
      { name: "Métaheuristiques", tracks: D },
      { name: "GPU / CUDA", tracks: D },
      { name: "Processing (dataviz)", tracks: D },
    ],
  },
  {
    title: "Bases de données & outils",
    skills: [
      { name: "PostgreSQL", tracks: FD },
      { name: "MySQL", tracks: FD },
      { name: "Oracle", tracks: D },
      { name: "MongoDB", tracks: FD },
      { name: "Docker", tracks: F },
      { name: "Git · GitHub · GitLab" },
      { name: "Maven", tracks: F },
    ],
  },
  {
    title: "Méthodes",
    skills: [
      { name: "Scrum / Agile" },
      { name: "Architecture logicielle", tracks: F },
      { name: "Design patterns · UML", tracks: F },
      { name: "Tests unitaires", tracks: F },
      { name: "Algorithmique", tracks: D },
      { name: "Modélisation relationnelle & NoSQL", tracks: FD },
    ],
  },
  {
    title: "Langues & atouts",
    skills: [
      { name: "Français — natif" },
      { name: "Anglais — TOEIC 830/990" },
      { name: "Arabe — langue maternelle" },
      { name: "Autonomie" },
      { name: "Esprit d'équipe" },
      { name: "Communication" },
      { name: "Proactivité" },
    ],
  },
];

/* ------------------------------------------------------------------
   Parcours
   ------------------------------------------------------------------ */
type TimelineItem = { date: string; title: string; place: string; desc?: string };

export const formation: TimelineItem[] = [
  {
    date: "2025 — 2027",
    title: "Master Ingénierie du Web, des Objets Communicants et des Systèmes complexes (IWOCS)",
    place: "Université Le Havre Normandie — Le Havre",
    desc: "Frameworks serveur, calcul GPU, optimisation combinatoire, apprentissage automatique, systèmes complexes, IoT.",
  },
    {
    date: "Septembre 2026",
    title: "Hackathon Tech4Good — EcoCoast Simulator",
    place: "Université de Sassari — Sardaigne, Italie",
    desc: "Séjour européen et hackathon en équipe internationale : simulateur web de l'impact des chantiers côtiers sur la pollution.",
  },
  {
    date: "Mai 2026",
    title: "Agile Project Management in Coastal Communities",
    place: "Université de Stralsund — Allemagne",
    desc: "Programme international (Erasmus BIP) sur la gestion de projet agile.",
  },
  {
    date: "2020 — juin 2025",
    title: "Licence Informatique",
    place: "Université Le Havre Normandie — Le Havre",
  },
];

export const experience: TimelineItem[] = [
  {
    date: "Avril — juin 2025",
    title: "Développeur Web Front-End (Stage)",
    place: "Optima Formation — Marseille",
    desc: "Conception et développement complet d'un site en React.js (composants réutilisables, responsive), déploiement et documentation technique.",
  },
  {
    date: "Depuis 2021",
    title: "Équipier polyvalent",
    place: "Burger King — Gonfreville-l'Orcher",
    desc: "Gestion des commandes, travail en équipe sous pression, respect des normes d'hygiène et de sécurité.",
  },
];

// 👉 À COMPLÉTER : remplace "EUNICoast · Italie" / "Bénévolat" par des dates si tu veux
export const engagement: TimelineItem[] = [

  {
    date: "Depuis 2025",
    title: "Bénévole — Young Caritas",
    place: "Secours Catholique — Le Havre",
  },
];
