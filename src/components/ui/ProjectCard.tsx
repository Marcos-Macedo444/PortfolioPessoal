"use client";

import { motion } from "framer-motion";
import { Activity, ArrowUpRight, Github, Globe2, Linkedin } from "lucide-react";
import type { Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { TechBadge } from "@/components/ui/TechBadge";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const LinkIcon = project.externalType === "linkedin" ? Linkedin : Github;
  const hasDemo = Boolean(project.demoUrl);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="tech-panel group relative overflow-hidden rounded-lg p-5 transition duration-300 hover:-translate-y-0.5 hover:border-matrix-cyan/25 hover:bg-matrix-panel/85 hover:shadow-panel"
    >
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-matrix-cyan/35 to-transparent opacity-60" />
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-matrix-cyan/20 bg-matrix-cyan/10 text-matrix-cyan">
          <Activity className="h-5 w-5" aria-hidden />
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {project.category.slice(0, 2).map((item) => (
            <TechBadge key={item}>{item}</TechBadge>
          ))}
        </div>
      </div>

      <h3 className="mt-5 text-xl font-semibold text-matrix-text">{project.title}</h3>
      <p className="mt-3 text-sm leading-6 text-matrix-muted">{project.summary}</p>
      <p className="mt-4 text-sm leading-6 text-matrix-muted/95">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <TechBadge key={technology}>{technology}</TechBadge>
        ))}
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="font-mono text-xs uppercase text-matrix-cyan">Pontos do projeto</p>
        <ul className="mt-3 space-y-2 text-sm text-matrix-muted">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="mt-1 text-matrix-green">&rsaquo;</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {project.demoUrl ? (
          <Button
            href={project.demoUrl}
            external
            variant="secondary"
            icon={<Globe2 className="h-4 w-4" aria-hidden />}
            className="w-full sm:w-auto"
          >
            Ver projeto online
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Button>
        ) : null}
        <Button
          href={project.externalUrl}
          external
          variant={hasDemo ? "ghost" : "secondary"}
          icon={<LinkIcon className="h-4 w-4" aria-hidden />}
          className="w-full sm:w-auto"
        >
          {project.externalLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </motion.article>
  );
}
