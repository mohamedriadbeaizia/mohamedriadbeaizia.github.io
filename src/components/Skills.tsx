"use client";

import { skillGroups } from "@/data/site";
import { useProfile } from "./ProfileProvider";
import { Reveal } from "./Reveal";

export function Skills() {
  const { profile } = useProfile();

  return (
    <Reveal id="skills">
      <div className="wrap">
        <span className="eyebrow">compétences</span>
        <h2 className="section-title">Ce que je maîtrise.</h2>
        {skillGroups.map((g) => (
          <div className="skill-group" key={g.title}>
            <h3>{g.title}</h3>
            <div className="skills-tags">
              {g.skills.map((s) => {
                let state = "";
                if (profile !== "all" && s.tracks) state = s.tracks.includes(profile) ? " on" : " off";
                return (
                  <span className={`tag${state}`} key={s.name}>
                    {s.name}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
