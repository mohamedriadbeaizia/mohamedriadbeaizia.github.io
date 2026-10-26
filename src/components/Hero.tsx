import Link from "next/link";
import { cv, site } from "@/data/site";
import { asset } from "@/lib/asset";
import { NodeGraph } from "./NodeGraph";

export function Hero() {
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
              Étudiant en Master 2 IWOCS au Havre, je conçois des applications de bout en bout, du web full-stack
              à l&apos;analyse de données. Je cherche un stage de fin d&apos;études de 4 à 6 mois à partir du 22
              février 2027.
            </p>

            <div className="hero-cta">
              <a href={asset(cv)} className="btn" download>
                Télécharger mon CV
              </a>
              <Link href="/#projets" className="btn btn-ghost">
                Voir mes projets
              </Link>
            </div>
          </div>
          <div className="hero-graph">
            <NodeGraph centerLabel={site.shortName} />
          </div>
        </div>
      </div>
    </section>
  );
}
