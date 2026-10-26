import { skillGroups } from "@/data/site";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <Reveal id="skills">
      <div className="wrap">
        <span className="eyebrow">compétences</span>
        <h2 className="section-title">Ce que je maîtrise.</h2>
        {skillGroups.map((g) => (
          <div className="skill-group" key={g.title}>
            <h3>{g.title}</h3>
            <div className="skills-tags">
              {g.skills.map((s) => (
                <span className="tag" key={s.name}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
