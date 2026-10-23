# Portfolio — Mohamed Riad Beaizia

Portfolio personnel d'un étudiant en Master 2 IWOCS (Ingénierie du Web, des Objets Communicants et des Systèmes complexes) à l'Université Le Havre Normandie, à la recherche d'un stage de fin d'études en développement full-stack ou en data.

🔗 **https://mohamedriadbeaizia.github.io**

## Stack

- **Next.js 16** (App Router) et **React 19**
- **TypeScript** en mode strict
- **CSS** sans framework, avec des variables pour le thème
- Polices auto-hébergées (Fontsource)
- Export statique, déployé sur **GitHub Pages** via **GitHub Actions**

## Fonctionnalités

- **Graphe de nœuds animé** en Canvas dans l'en-tête, en clin d'œil au thème « objets communicants » du master. L'animation se met en pause hors de l'écran et respecte la préférence « réduire les animations ».
- **Sélecteur de profil** (Tout / Full-stack / Data) : il filtre les projets, met en avant les compétences correspondantes et adapte le CV proposé. Le profil peut être passé dans l'URL (`?profil=data`).
- **Une page par projet**, générée statiquement à partir d'un fichier de données unique : contexte, réalisations, défi technique, résultats et compétences.
- **Accessibilité** : navigation au clavier, lien d'évitement, attributs ARIA.
- **SEO** : métadonnées et Open Graph par page, données structurées schema.org.
- **Responsive**, du mobile au grand écran.

## Structure

```
src/
  app/
    layout.tsx              en-tête, pied de page, métadonnées
    page.tsx                page d'accueil
    projets/[slug]/page.tsx page de chaque projet (génération statique)
    globals.css             styles et thème
  components/               Hero, NodeGraph, Skills, Projects, Contact…
  data/
    site.ts                 informations, compétences, parcours
    projects.ts             projets
```

Le contenu est séparé de la présentation : ajouter un projet revient à ajouter un objet dans `projects.ts`.

## Lancer en local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # export statique dans out/
```

## Déploiement

Chaque push sur `main` déclenche le workflow `.github/workflows/deploy.yml`, qui construit le site et le publie sur GitHub Pages.
