import type { NextConfig } from "next";

/**
 * Export statique : le site est généré en HTML dans /out.
 * Ça marche sur Vercel ET sur GitHub Pages.
 *
 * Si ton repo s'appelle "TON-PSEUDO.github.io" → rien à changer.
 * Si ton repo s'appelle autrement (ex. "portfolio"), le workflow GitHub
 * définit automatiquement NEXT_PUBLIC_BASE_PATH=/portfolio.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
