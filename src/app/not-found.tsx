import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap notfound">
      <span className="eyebrow">erreur 404</span>
      <h1>Ce nœud n&apos;existe pas.</h1>
      <p className="lead">La page que vous cherchez a été déplacée ou n&apos;a jamais existé.</p>
      <Link href="/" className="btn">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
