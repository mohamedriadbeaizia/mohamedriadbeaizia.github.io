import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectLinks } from "@/components/ProjectLinks";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

// Une page HTML est générée pour chaque projet de projects.ts
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, openGraph: { title: p.title, description: p.summary } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const prev = projects[i - 1];
  const next = projects[i + 1];
  const hasLinks = Boolean(p.links.code || p.links.demo);

  return (
    <article className="case">
      <div className="wrap">
        <Link href="/#projets" className="back">
          ← Tous les projets
        </Link>

        <header className="case-head">
          <div>
            <span className="eyebrow">{p.label}</span>
            <h1>{p.title}</h1>
            <p className="lead">{p.summary}</p>
          </div>
          <dl className="case-meta">
            <dt>Cadre</dt>
            <dd>{p.frame}</dd>
            <dt>Stack</dt>
            <dd>
              <div className="stack">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </dd>
            {hasLinks && (
              <>
                <dt>Liens</dt>
                <dd className="project-links">
                  <ProjectLinks links={p.links} />
                </dd>
              </>
            )}
          </dl>
        </header>

        {p.result && (
          <div className="case-result">
            <b>{p.result.value}</b>
            <span>{p.result.caption}</span>
          </div>
        )}

        <div className="case-body">
          <section>
            <h2>Contexte</h2>
            <p>{p.context}</p>
          </section>
          <section>
            <h2>Ce que j&apos;ai réalisé</h2>
            <ul className="work-list">
              {p.work.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </section>
        </div>

        {p.challenge && (
          <section className="case-challenge">
            <span className="eyebrow">le défi technique</span>
            <h2>{p.challenge.title}</h2>
            <p>{p.challenge.text}</p>
          </section>
        )}

        <div className={`case-body${p.results ? "" : " single"}`}>
          {p.results && (
            <section>
              <h2>Résultats</h2>
              <ul className="work-list check">
                {p.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </section>
          )}
          <section>
            <h2>Compétences démontrées</h2>
            <div className="skills-tags">
              {p.skills.map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        </div>

        <nav className="case-nav" aria-label="Autres projets">
          {prev && (
            <Link href={`/projets/${prev.slug}/`}>
              <small>← Projet précédent</small>
              <strong>{prev.title}</strong>
            </Link>
          )}
          {next && (
            <Link href={`/projets/${next.slug}/`} className="next">
              <small>Projet suivant →</small>
              <strong>{next.title}</strong>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
