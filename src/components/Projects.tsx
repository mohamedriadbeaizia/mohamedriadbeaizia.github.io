"use client";

import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import { asset } from "@/lib/asset";
import { useProfile } from "./ProfileProvider";
import { ProjectLinks } from "./ProjectLinks";
import { Reveal } from "./Reveal";

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className={`project${p.featured ? " featured" : ""}`}>
      <Link href={`/projets/${p.slug}/`} className={`thumb${p.image ? " has-image" : ""}`} tabIndex={-1} aria-hidden="true">
        {p.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(p.image)} alt="" loading="lazy" />
        )}
        {p.badge && <span className="badge">{p.badge}</span>}
        <span className="thumb-label">{p.label}</span>
      </Link>
      <div className="project-body">
        <h3>
          <Link href={`/projets/${p.slug}/`}>{p.title}</Link>
        </h3>
        <p>{p.summary}</p>
        {p.result && (
          <div className="metric">
            <b>{p.result.value}</b> {p.result.caption}
          </div>
        )}
        <div className="stack">
          {p.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="project-links">
          <Link href={`/projets/${p.slug}/`}>Voir le projet →</Link>
          <ProjectLinks links={p.links} />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const { profile } = useProfile();
  const shown = profile === "all" ? projects : projects.filter((p) => p.tracks.includes(profile));
  const suffix = profile === "all" ? "" : ` · ${profile === "data" ? "data" : "full-stack"}`;

  return (
    <Reveal id="projets">
      <div className="wrap">
        <span className="eyebrow">projets</span>
        <div className="projects-head">
          <h2 className="section-title">Mes réalisations.</h2>
          <span className="projects-count" aria-live="polite">
            {shown.length} projet{shown.length > 1 ? "s" : ""}
            {suffix}
          </span>
        </div>
        <div className="projects">
          {shown.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
