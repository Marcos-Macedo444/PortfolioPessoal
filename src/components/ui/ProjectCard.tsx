import Image from "next/image";
import { ArrowUpRight, ChevronDown, Github, Linkedin } from "lucide-react";
import type { Project } from "@/types";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const Icon = project.externalType === "linkedin" ? Linkedin : Github;
  return (
    <article
      id={`project-${project.id}`}
      className={`project-entry ${project.demoUrl ? "featured-project" : ""}`}
    >
      {project.image && (
        <a
          className="project-preview"
          href={project.demoUrl || project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir ${project.title}`}
        >
          <Image
            src={project.image}
            alt={project.imageAlt || project.title}
            fill
            sizes="(max-width:700px) 90vw, 55vw"
            className="object-cover"
          />
          <span className="preview-caption">
            Aplicação real <ArrowUpRight size={16} />
          </span>
        </a>
      )}
      <div className="project-body">
        <div className="project-overline">
          <span>0{index + 1}</span>
          <span>{project.category.slice(0, 2).join(" / ")}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <ul className="plain-tags">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <details className="project-details">
          <summary>
            Sobre o projeto <ChevronDown size={16} />
          </summary>
          <div className="project-detail-body">
            <p>{project.description}</p>
            <h4>O que ele faz</h4>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <h4>Aprendizados</h4>
            <ul>
              {project.learnings.map((learning) => (
                <li key={learning}>{learning}</li>
              ))}
            </ul>
          </div>
        </details>
        <div className="project-links">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver projeto online <ArrowUpRight size={16} />
            </a>
          )}
          <a
            href={project.externalUrl}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon size={15} />
            {project.externalLabel}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}
