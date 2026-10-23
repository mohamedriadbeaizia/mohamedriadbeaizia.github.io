"use client";

import Link from "next/link";
import { cv, site, type Profile } from "@/data/site";
import { asset } from "@/lib/asset";
import { NodeGraph } from "./NodeGraph";
import { useProfile } from "./ProfileProvider";

const options: { value: Profile; label: string }[] = [
  { value: "all", label: "Tout" },
  { value: "fullstack", label: "Full-stack" },
  { value: "data", label: "Data" },
];

export function Hero() {
  const { profile, setProfile } = useProfile();
  const cvHref = asset(profile === "data" ? cv.data : cv.fullstack);

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="status">
              <span className="dot" /> {site.status}
            </div>
            <h1>
              Ingénieur du web
              <br />
              en <span className="accent">construction</span>.
            </h1>
            <p className="lead">
              Étudiant en Master 2 IWOCS au Havre. Je cherche un stage de fin d&apos;études de 4 à 6 mois à
              partir du 22 février 2027, en développement full-stack ou en data.
            </p>

            <div className="profile-switch">
              <span className="ps-label" id="psLabel">
                Voir mon profil
              </span>
              <div className="ps-group" role="group" aria-labelledby="psLabel">
                {options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={profile === o.value}
                    onClick={() => setProfile(o.value)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hero-cta">
              <a href={cvHref} className="btn" download>
                Télécharger mon CV
              </a>
              <Link href="/#projets" className="btn btn-ghost">
                Voir mes projets
              </Link>
            </div>
          </div>
          <div className="hero-graph">
            <NodeGraph profile={profile} centerLabel={site.shortName} />
          </div>
        </div>
      </div>
    </section>
  );
}
