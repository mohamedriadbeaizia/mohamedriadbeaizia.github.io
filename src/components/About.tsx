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
              Communicants et des Systèmes complexes (IWOCS) à l&apos;Université Le Havre Normandie. J&apos;aime
              prendre un problème de bout en bout : comprendre le besoin, modéliser les données, coder, tester et
              mettre en ligne.
            </p>
            <p>
              Mon dernier projet phare est une <strong>plateforme d&apos;annonces immobilières déployée en
              ligne</strong>, avec quatre niveaux d&apos;accès et une attention particulière à la sécurité. J&apos;ai
              aussi analysé <strong>174 781 tweets</strong> pour mesurer les chambres d&apos;écho sur Twitter,
              accéléré un algorithme de plus courts chemins <strong>33 fois sur GPU</strong> avec CUDA, et résolu
              des problèmes de planification par l&apos;optimisation.
            </p>
            <p>
              Je cherche un <strong>stage de fin d&apos;études de 4 à 6 mois</strong> pour rejoindre une équipe,
              livrer du concret et continuer à progresser. Habitué aux méthodes agiles et au travail en équipe
              internationale (Stralsund, Sassari).
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
              <div className="num">Mobile</div>
              <div className="lbl">partout en France, sur site ou en télétravail</div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
