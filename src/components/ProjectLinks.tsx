import type { Project } from "@/data/projects";

/** Liens externes d'un projet — un lien vide n'est pas affiché. */
export function ProjectLinks({ links }: { links: Project["links"] }) {
  return (
    <>
      {links.code && (
        <a href={links.code} target="_blank" rel="noopener noreferrer">
          Voir le code ↗
        </a>
      )}
      {links.demo && (
        <a href={links.demo} target="_blank" rel="noopener noreferrer">
          Démo en ligne ↗
        </a>
      )}
    </>
  );
}
