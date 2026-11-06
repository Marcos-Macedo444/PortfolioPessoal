import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import { timeline } from "@/data/timeline";
import { profile } from "@/data/profile";
import { OriginKey } from "@/components/visuals/OriginKey";

export function Timeline() {
  const current = timeline[0];
  const internship = timeline.find((item) => item.title === "Estagiário NOC")!;
  return (
    <section id="jornada" className="section journey">
      <div className="container-shell">
        <div className="section-heading journey-heading">
          <p className="eyebrow">01 / Trajetória</p>
          <h2>
            Conexões que
            <br />
            constroem meu caminho<span className="accent">.</span>
          </h2>
        </div>
        <div className="experience-list">
          <article className="experience current-experience">
            <span className="experience-node" aria-hidden="true">
              <BriefcaseBusiness size={18} />
            </span>
            <div className="experience-date">
              <span className="current-tag">Atuação atual</span>
              <p>{current.period}</p>
              <p>{profile.employment}</p>
            </div>
            <div className="experience-body">
              <p className="company-name">{profile.company}</p>
              <h3>{current.title}</h3>
              <p>{current.description}</p>
              <ul className="responsibilities">
                <li>
                  Análise de eventos e alarmes; acompanhamento de
                  disponibilidade, desempenho e SLAs.
                </li>
                <li>
                  Ações corretivas e intervenções operacionais, com
                  escalonamento para equipes especializadas, operadoras e
                  fornecedores.
                </li>
                <li>
                  Criação e atualização de documentação técnica, procedimentos e
                  registros operacionais.
                </li>
              </ul>
              <span className="location-note">{profile.location}</span>
            </div>
          </article>
          <article className="experience">
            <span className="experience-node" aria-hidden="true" />
            <div className="experience-date">
              <p>{internship.period}</p>
            </div>
            <div className="experience-body">
              <h3>{internship.title}</h3>
              <p>{internship.description}</p>
            </div>
          </article>
          <article className="experience">
            <span className="experience-node" aria-hidden="true" />
            <div className="experience-date">
              <p>Origem & fundamentos</p>
              <OriginKey />
            </div>
            <div className="experience-body">
              <h3>Da prática à tecnologia</h3>
              <p>
                O trabalho como chaveiro residencial me ensinou precisão,
                atendimento e responsabilidade. Na transição para tecnologia,
                aprofundei fundamentos de sistemas, redes e programação,
                conectando esse aprendizado a projetos acadêmicos e pessoais.
              </p>
              <a href="#sobre" className="text-link">
                Um pouco mais sobre mim <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
