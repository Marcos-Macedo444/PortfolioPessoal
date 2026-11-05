"use client";

import { useMemo, useState } from "react";
import { projectFilters, projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  const [filter, setFilter] = useState("Todos");
  const visible = useMemo(
    () =>
      projects.filter(
        (project) =>
          filter === "Todos" ||
          [...project.category, ...project.technologies].some(
            (value) => value.toLowerCase() === filter.toLowerCase(),
          ),
      ),
    [filter],
  );
  return (
    <section id="projetos" className="section projects-section">
      <div className="container-shell">
        <div className="section-heading projects-heading">
          <div>
            <p className="eyebrow">03 / Da ideia à prática</p>
            <h2>
              Projetos com foco
              <br />
              em problemas reais<span className="accent">.</span>
            </h2>
          </div>
          <p>
            Ferramentas que construí para organizar, automatizar e aprender.
            Cada projeto nasce de uma necessidade.
          </p>
        </div>
        <div
          className="project-filters"
          role="group"
          aria-label="Filtrar projetos"
        >
          {projectFilters.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={filter === item}
              className={filter === item ? "selected" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
              <span className="filter-marker" aria-hidden="true" />
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          {visible.length} projetos encontrados
        </p>
        <div className="project-list">
          {visible.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={projects.indexOf(project)}
            />
          ))}
        </div>
        {visible.length === 0 && (
          <p className="empty-projects">
            Nenhum projeto publicado nesta categoria. Meu trabalho em segurança
            defensiva está descrito na{" "}
            <a className="text-link" href="#jornada">
              trajetória profissional
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
