"use client";

import { useEffect, useRef } from "react";

/* ==================================================================
   GRAPHE INTERACTIF — la signature du site.
   Nœud central = toi ; nœuds autour = tes domaines.
   Des "signaux" circulent le long des arêtes (objets communicants).
   ================================================================== */

const LABELS = ["Next.js", "React", "Python", "Données", "CUDA", "Réseaux", "SQL", "Agile"];

// Satellites : les outils rattachés à chaque domaine.
// Petits et pâles au repos, ils s'allument (avec leur nom) quand on survole leur domaine.
const SATELLITES: Record<string, string[]> = {
  "Next.js": ["Prisma", "Better Auth", "Docker"],
  React: ["TypeScript", "Leaflet", "Chart.js"],
  Python: ["pandas", "PuLP", "Jupyter"],
  Données: ["TF-IDF", "Plotly", "Matplotlib"],
  CUDA: ["C", "GPU"],
  Réseaux: ["NetworkX", "Louvain", "PageRank"],
  SQL: ["PostgreSQL", "MongoDB", "Oracle"],
  Agile: ["Scrum", "GitLab"],
};
const SAT_DIST = 40; // distance satellite ↔ domaine (px)
const SAT_SPREAD = 0.62; // écart angulaire entre satellites (radians)
const C = {
  signal: "#2540FF",
  signalLt: "#6B7BFF",
  ink: "#0E1117",
  muted: "#565E72",
  line: "#C7CEDD",
  faded: "#B5BCCB",
};

type Node = { label: string; ang: number; rad: number; x: number; y: number; r: number; phase: number; amp: number };

export function NodeGraph({ centerLabel }: { centerLabel: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Domaines mis en avant (aucun = tous allumés de la même façon)
  const highlightRef = useRef<string[] | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, t = 0, visible = true, raf = 0;
    const center = { x: 0, y: 0, r: 9 };
    const nodes: Node[] = LABELS.map((label, i) => ({
      label,
      ang: (i / LABELS.length) * Math.PI * 2 - Math.PI / 2,
      rad: 0.34 + (i % 2 ? 0.05 : -0.02),
      x: 0, y: 0, r: 5,
      phase: Math.random() * Math.PI * 2,
      amp: 0.012 + Math.random() * 0.01,
    }));
    let pulses: { i: number; p: number }[] = [];
    const mouse = { x: -1, y: -1 };
    const isOn = (n: Node) => !highlightRef.current || highlightRef.current.includes(n.label);

    // Position des satellites : en éventail vers l'extérieur du domaine.
    // Pour les domaines à gauche/droite, l'éventail s'ouvre au-dessus et en dessous
    // pour ne pas recouvrir le nom du domaine (écrit à l'horizontale).
    function satellitesDe(n: Node) {
      const noms = SATELLITES[n.label] ?? [];
      const horizontal = Math.abs(Math.cos(n.ang)) > 0.9;
      const decalages = horizontal
        ? [-0.8, 0.8, -1.45, 1.45].slice(0, noms.length)
        : noms.map((_, j) => (j - (noms.length - 1) / 2) * SAT_SPREAD);
      return noms.map((label, j) => {
        const ang = n.ang + decalages[j];
        return { label, ang, x: n.x + Math.cos(ang) * SAT_DIST, y: n.y + Math.sin(ang) * SAT_DIST };
      });
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas!.width = W * dpr; canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function frame() {
      const hl = highlightRef.current;
      ctx!.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const k = Math.min(W, H) * 0.82; // un peu resserré pour laisser la place aux satellites
      center.x = cx;
      center.y = cy + (reduce ? 0 : Math.sin(t * 0.4) * 4);
      nodes.forEach((n) => {
        const wob = reduce ? 0 : Math.sin(t * 0.6 + n.phase) * n.amp;
        n.x = cx + Math.cos(n.ang) * (n.rad + wob) * k;
        n.y = cy + Math.sin(n.ang) * (n.rad + wob) * k;
      });

      // Domaine survolé (le domaine lui-même ou l'un de ses satellites)
      const sats = nodes.map((n) => satellitesDe(n));
      let survole = -1;
      nodes.forEach((n, i) => {
        if (Math.hypot(mouse.x - n.x, mouse.y - n.y) < 26) survole = i;
        else if (sats[i].some((s) => Math.hypot(mouse.x - s.x, mouse.y - s.y) < 12)) survole = i;
      });

      // anneau
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = C.line;
      nodes.forEach((n, i) => {
        const m = nodes[(i + 1) % nodes.length];
        ctx!.beginPath(); ctx!.moveTo(n.x, n.y); ctx!.lineTo(m.x, m.y); ctx!.stroke();
      });
      // rayons
      nodes.forEach((n) => {
        const on = isOn(n);
        ctx!.strokeStyle = on ? (hl ? "rgba(37,64,255,0.45)" : "rgba(37,64,255,0.18)") : "rgba(37,64,255,0.07)";
        ctx!.lineWidth = on && hl ? 1.6 : 1;
        ctx!.beginPath(); ctx!.moveTo(center.x, center.y); ctx!.lineTo(n.x, n.y); ctx!.stroke();
      });

      // signaux
      if (!reduce) {
        if (Math.random() < 0.035) {
          const pool = nodes.map((_, i) => i).filter((i) => isOn(nodes[i]));
          pulses.push({ i: pool[(Math.random() * pool.length) | 0], p: 0 });
        }
        ctx!.fillStyle = C.signal;
        pulses.forEach((pl) => {
          pl.p += 0.018;
          const n = nodes[pl.i];
          ctx!.beginPath();
          ctx!.arc(center.x + (n.x - center.x) * pl.p, center.y + (n.y - center.y) * pl.p, 2.6, 0, Math.PI * 2);
          ctx!.fill();
        });
        pulses = pulses.filter((pl) => pl.p < 1);
      }

      // satellites (sous les nœuds principaux)
      ctx!.textBaseline = "middle";
      nodes.forEach((n, i) => {
        const on = isOn(n);
        const actif = i === survole;
        sats[i].forEach((s) => {
          ctx!.strokeStyle = actif ? "rgba(37,64,255,0.55)" : on ? "rgba(37,64,255,0.14)" : "rgba(37,64,255,0.05)";
          ctx!.lineWidth = actif ? 1.3 : 1;
          ctx!.beginPath(); ctx!.moveTo(n.x, n.y); ctx!.lineTo(s.x, s.y); ctx!.stroke();

          ctx!.fillStyle = actif ? C.signal : "#fff";
          ctx!.strokeStyle = actif ? C.signal : on ? C.signalLt : C.faded;
          ctx!.globalAlpha = actif ? 1 : on ? 0.7 : 0.45;
          ctx!.lineWidth = 1.2;
          ctx!.beginPath(); ctx!.arc(s.x, s.y, actif ? 3.4 : 2.6, 0, Math.PI * 2); ctx!.fill(); ctx!.stroke();
          ctx!.globalAlpha = 1;

          if (actif) {
            ctx!.font = "10.5px 'Space Mono', monospace";
            ctx!.fillStyle = C.signal;
            const dx = Math.cos(s.ang), dy = Math.sin(s.ang);
            if (Math.abs(dx) < 0.35) {
              ctx!.textAlign = "center";
              ctx!.fillText(s.label, s.x, s.y + (dy < 0 ? -11 : 11));
            } else {
              ctx!.textAlign = dx > 0 ? "left" : "right";
              ctx!.fillText(s.label, s.x + (dx > 0 ? 7 : -7), s.y);
            }
          }
        });
      });

      // nœuds
      ctx!.font = "12px 'Space Mono', monospace";
      ctx!.textBaseline = "middle";
      nodes.forEach((n, i) => {
        const on = isOn(n);
        const hov = i === survole;
        const lit = hov || (on && !!hl);
        ctx!.fillStyle = lit ? C.signal : "#fff";
        ctx!.strokeStyle = on ? (hov ? C.signal : C.signalLt) : C.faded;
        ctx!.lineWidth = hov ? 2.5 : 1.6;
        ctx!.beginPath(); ctx!.arc(n.x, n.y, hov ? n.r + 2 : n.r, 0, Math.PI * 2); ctx!.fill(); ctx!.stroke();
        ctx!.fillStyle = lit ? C.signal : on ? C.muted : C.faded;
        ctx!.textAlign = n.x >= cx ? "left" : "right";
        ctx!.fillText(n.label, n.x + (n.x >= cx ? 14 : -14), n.y);
      });

      // nœud central
      ctx!.beginPath(); ctx!.arc(center.x, center.y, center.r, 0, Math.PI * 2);
      ctx!.fillStyle = C.signal; ctx!.fill();
      ctx!.strokeStyle = "rgba(37,64,255,0.25)"; ctx!.lineWidth = 8; ctx!.stroke();
      ctx!.fillStyle = C.ink; ctx!.textAlign = "center";
      ctx!.font = "700 13px 'Space Grotesk', sans-serif";
      ctx!.fillText(centerLabel, center.x, center.y - 22);

      t += 0.016;
    }

    function loop() {
      frame();
      if (!reduce && visible) raf = requestAnimationFrame(loop);
    }

    // Pause quand le graphe sort de l'écran (CPU / batterie)
    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      if (reduce) frame();
    };
    const onLeave = () => { mouse.x = -1; mouse.y = -1; if (reduce) frame(); };
    const onResize = () => { resize(); if (reduce) frame(); };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    resize();
    loop();
    document.fonts?.ready.then(() => { if (reduce) frame(); });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [centerLabel]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={`Graphe des domaines de compétences : ${LABELS.join(", ")}`}
    />
  );
}
