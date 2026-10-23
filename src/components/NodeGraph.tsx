"use client";

import { useEffect, useRef } from "react";
import type { Profile } from "@/data/site";

/* ==================================================================
   GRAPHE INTERACTIF — la signature du site.
   Nœud central = toi ; nœuds autour = tes domaines.
   Des "signaux" circulent le long des arêtes (objets communicants).
   Les nœuds du profil choisi s'allument.
   ================================================================== */

const LABELS = ["Next.js", "React", "Python", "Données", "CUDA", "Réseaux", "SQL", "Agile"];
const HIGHLIGHT: Record<Profile, string[] | null> = {
  all: null,
  fullstack: ["Next.js", "React", "SQL", "Agile"],
  data: ["Python", "Données", "CUDA", "Réseaux"],
};
const C = {
  signal: "#2540FF",
  signalLt: "#6B7BFF",
  ink: "#0E1117",
  muted: "#565E72",
  line: "#C7CEDD",
  faded: "#B5BCCB",
};

type Node = { label: string; ang: number; rad: number; x: number; y: number; r: number; phase: number; amp: number };

export function NodeGraph({ profile, centerLabel }: { profile: Profile; centerLabel: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const highlightRef = useRef<string[] | null>(HIGHLIGHT[profile]);
  const redrawRef = useRef<() => void>(() => {});

  // Changement de profil : on met à jour sans relancer l'animation
  useEffect(() => {
    highlightRef.current = HIGHLIGHT[profile];
    redrawRef.current();
  }, [profile]);

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
      const k = Math.min(W, H) * 0.95;
      center.x = cx;
      center.y = cy + (reduce ? 0 : Math.sin(t * 0.4) * 4);
      nodes.forEach((n) => {
        const wob = reduce ? 0 : Math.sin(t * 0.6 + n.phase) * n.amp;
        n.x = cx + Math.cos(n.ang) * (n.rad + wob) * k;
        n.y = cy + Math.sin(n.ang) * (n.rad + wob) * k;
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

      // nœuds
      ctx!.font = "12px 'Space Mono', monospace";
      ctx!.textBaseline = "middle";
      nodes.forEach((n) => {
        const on = isOn(n);
        const hov = Math.hypot(mouse.x - n.x, mouse.y - n.y) < 26;
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
    redrawRef.current = () => { if (reduce) frame(); };

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
