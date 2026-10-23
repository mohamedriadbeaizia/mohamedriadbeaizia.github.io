"use client";

import { useState } from "react";
import { cv, site } from "@/data/site";
import { asset } from "@/lib/asset";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact">
      <div className="wrap">
        <div className="contact">
          <span className="eyebrow">contact</span>
          <h2>
            Un stage à proposer ?
            <br />
            Connectons-nous.
          </h2>
          <p>Disponible dès le 22 février 2027 pour 4 à 6 mois. Écrivez-moi ou téléchargez mon CV en un clic.</p>
          <div className="contact-cta">
            <a href={`mailto:${site.email}?subject=${encodeURIComponent("Stage de fin d'études")}`} className="btn">
              M&apos;écrire un email
            </a>
            <a href={asset(cv.fullstack)} className="btn btn-ghost" download>
              CV Full-stack
            </a>
            <a href={asset(cv.data)} className="btn btn-ghost" download>
              CV Data
            </a>
          </div>
          <div className="socials">
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            {site.github && (
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            )}
            <a href={`tel:${site.phone}`}>{site.phoneLabel} ↗</a>
            <button type="button" onClick={copy}>
              {copied ? "Copié ✓" : "Copier l'email ⧉"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
