"use client";

import { useEffect, useRef } from "react";

/** Section qui apparaît en fondu quand elle entre dans l'écran. */
export function Reveal({
  as: Tag = "section",
  id,
  className = "",
  children,
}: {
  as?: "section" | "div";
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} id={id} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}
