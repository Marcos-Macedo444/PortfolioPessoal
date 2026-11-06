import { skillGroups as groups } from "@/data/technologies";
import { connections } from "@/data/connections";

const practice = [
  `${connections[0].description} ${connections[1].description}`,
  connections[2].description,
  connections[3].description,
];

export function TechStack() {
  return (
    <section id="tecnologias" className="section skills-section">
      <div className="container-shell">
        <div className="section-heading">
          <p className="eyebrow">05 / Repertório técnico</p>
          <h2>
            Diferentes ferramentas.
            <br />
            Uma forma de pensar<span className="accent">.</span>
          </h2>
          <p>
            Competências que desenvolvo na operação, nos estudos e nos projetos.
            Aprendizado contínuo, aplicado a problemas concretos.
          </p>
        </div>
        <div className="skills-grid">
          {groups.map(({ icon: Icon, ...group }, index) => (
            <article className="skill-row" key={group.title}>
              <span className="skill-number">0{index + 1}</span>
              <Icon className="skill-icon" size={23} />
              <div>
                <h3>{group.title}</h3>
                <p>{practice[index] || group.description}</p>
                <ul className="plain-tags">
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
