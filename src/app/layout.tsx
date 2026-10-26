import type { Metadata, Viewport } from "next";

// Polices auto-hébergées (pas d'appel à Google Fonts → plus rapide)
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./globals.css";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/data/site";

// URL publique du site (optionnelle) : améliore les aperçus de liens.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${site.name} — Portfolio · Stage de fin d'études`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    title: `${site.name} — Portfolio · Stage de fin d'études`,
    description: "Master 2 IWOCS · Le Havre. Disponible dès le 22 février 2027 pour un stage de 4 à 6 mois.",
  },
};

export const viewport: Viewport = { themeColor: "#2540FF" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Étudiant en Master 2 IWOCS — recherche de stage de fin d'études",
  alumniOf: { "@type": "CollegeOrUniversity", name: "Université Le Havre Normandie" },
  address: { "@type": "PostalAddress", addressLocality: "Le Havre", addressCountry: "FR" },
  email: `mailto:${site.email}`,
  sameAs: [site.linkedin, site.github].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="skip">
          Aller au contenu
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
