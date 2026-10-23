# Portfolio — Mohamed Riad Beaizia

Site portfolio en **Next.js 16 + TypeScript**, exporté en statique (HTML) : il se déploie gratuitement sur Vercel ou GitHub Pages.

## Lancer en local

```bash
npm install
npm run dev        # → http://localhost:3000
```

## Modifier le contenu (pas besoin de toucher aux composants)

| Quoi | Où |
|---|---|
| Infos perso, liens, compétences, parcours | `src/data/site.ts` |
| Projets (cartes + pages `/projets/...`) | `src/data/projects.ts` |
| Couleurs, polices, espacements | variables en haut de `src/app/globals.css` |
| Texte « À propos » | `src/components/About.tsx` |

**Ajouter un projet** = ajouter un objet dans `projects.ts`. La carte sur l'accueil et la page du projet sont générées automatiquement. Un lien laissé vide (`""`) n'est pas affiché.

## À faire avant la mise en ligne

1. Mettre tes deux CV dans `public/` : `CV_Beaizia_FullStack.pdf` et `CV_Beaizia_Data.pdf`
   (ou changer les noms dans `cv` de `site.ts`).
2. Mettre ton URL GitHub dans `site.github` (`site.ts`).
3. Remplir les liens `code` / `demo` des projets (`projects.ts`).

## Mettre en ligne

### Option A — Vercel (le plus simple)
1. Pousse le projet sur un repo GitHub.
2. Va sur vercel.com → *Add New Project* → importe le repo → *Deploy*. Rien à configurer.
3. Chaque `git push` met le site à jour automatiquement.

### Option B — GitHub Pages
1. Pousse le projet sur GitHub (idéalement dans un repo nommé `TON-PSEUDO.github.io` pour avoir l'URL `https://TON-PSEUDO.github.io`).
2. Dans le repo : **Settings → Pages → Source : GitHub Actions**.
3. Le workflow `.github/workflows/deploy.yml` construit et publie le site à chaque push sur `main`.
   Si ton repo a un autre nom (ex. `portfolio`), il gère tout seul le sous-dossier `/portfolio`.

### Après la mise en ligne (optionnel)
Ajoute la variable d'environnement `NEXT_PUBLIC_SITE_URL=https://ton-url` (Vercel → Settings → Environment Variables) pour des aperçus de liens LinkedIn parfaits.

## Lien par profil

Le sélecteur Tout / Full-stack / Data change les projets, les compétences mises en avant, le graphe et le CV téléchargé.
Tu peux envoyer un lien direct dans tes candidatures :

- `https://ton-site/?profil=data`
- `https://ton-site/?profil=fullstack`

## Structure

```
src/
  app/
    layout.tsx              ← en-tête, pied de page, SEO
    page.tsx                ← page d'accueil
    projets/[slug]/page.tsx ← page d'un projet
    globals.css             ← tout le style
  components/               ← Hero, NodeGraph (graphe animé), Skills, Projects…
  data/                     ← ← ← ton contenu
```
