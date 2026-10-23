"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const links = [
  { id: "about", label: "À propos" },
  { id: "skills", label: "Compétences" },
  { id: "parcours", label: "Parcours" },
  { id: "projets", label: "Projets" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();

  // Lien actif : suit la section visible (page d'accueil uniquement)
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((s): s is HTMLElement => s !== null);
    if (!sections.length) {
      setActive(pathname.startsWith("/projets") ? "projets" : "");
      return;
    }
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, [pathname]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link href="/" className="logo" onClick={close}>
          {site.shortName}
        </Link>
        <nav className={`nav-links${open ? " open" : ""}`} id="navLinks">
          {links.map((l) => (
            <Link key={l.id} href={`/#${l.id}`} className={active === l.id ? "active" : ""} onClick={close}>
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn" onClick={close}>
            Me contacter
          </Link>
        </nav>
        <button
          className="menu-toggle"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}
