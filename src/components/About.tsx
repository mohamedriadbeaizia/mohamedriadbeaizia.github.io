import { Reveal } from "./Reveal";

export function About() {
  return (
    <Reveal id="about" className="about">
      <div className="wrap">
        <span className="eyebrow">à propos</span>
        <div className="about-grid">
          <div>
            <h2 className="section-title">Du front-end au GPU, je construis des choses qui tournent.</h2>
            <p>
              Je m&apos;appelle <strong>Mohamed Riad</strong>, étudiant en Master 2 Ingénierie du Web, des Objets
              Communicants et des Systèmes complexes (IWOCS) à l&apos;Université Le Havre Normandie. Mon dernier
              projet phare est une <strong>plateforme d&apos;annonces immobilières full-stack</strong> (Next.js,
              TypeScript, Prisma, PostgreSQL, Docker).
            </p>
            <p>
              Côté data et calcul, j&apos;ai accéléré un algorithme de Floyd-Warshall d&apos;un facteur{" "}
              <strong>~33 sur GPU avec CUDA</strong>, analysé la polarisation sur Twitter par l&apos;analyse de
              graphes, et résolu des problèmes d&apos;optimisation combinatoire (PuLP, recuit simulé).
            </p>
            <p>
              Je cherche un <strong>stage de fin d&apos;études de 4 à 6 mois</strong> pour rejoindre une équipe,
              livrer du concret et monter en expertise. Habitué aux méthodes agiles et aux projets internationaux
              (Stralsund, Sassari).
            </p>
          </div>
          <div className="facts">
            <div className="fact">
              <div className="num">22 fév. 2027</div>
              <div className="lbl">début de stage possible</div>
            </div>
            <div className="fact">
              <div className="num">4 – 6 mois</div>
              <div className="lbl">stage de fin d&apos;études (Master 2)</div>
            </div>
            <div className="fact">
              <div className="num">2 profils</div>
              <div className="lbl">développement full-stack · data &amp; calcul</div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
