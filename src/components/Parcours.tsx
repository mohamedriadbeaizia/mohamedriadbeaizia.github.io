import { engagement, experience, formation } from "@/data/site";
import { Reveal } from "./Reveal";

function Timeline({ items }: { items: typeof formation }) {
  return (
    <div className="timeline">
      {items.map((it) => (
        <div className="tl-item" key={it.title}>
          <div className="tl-date">{it.date}</div>
          <div className="tl-title">{it.title}</div>
          <div className="tl-place">{it.place}</div>
          {it.desc && <div className="tl-desc">{it.desc}</div>}
        </div>
      ))}
    </div>
  );
}

export function Parcours() {
  return (
    <Reveal id="parcours">
      <div className="wrap">
        <span className="eyebrow">parcours</span>
        <h2 className="section-title">Formation &amp; expérience.</h2>
        <div className="parcours-grid">
          <div className="parcours-col">
            <h3>Formation</h3>
            <Timeline items={formation} />
          </div>
          <div className="parcours-col">
            <h3>Expérience professionnelle</h3>
            <Timeline items={experience} />
            <h3 className="sub">Engagement</h3>
            <Timeline items={engagement} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
