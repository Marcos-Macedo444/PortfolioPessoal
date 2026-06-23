"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, ScanSearch } from "lucide-react";
import type { Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { TechBadge } from "@/components/ui/TechBadge";

type ProjectCardProps = {
  project: Project;
  onDetails: (project: Project) => void;
};

export function ProjectCard({ project, onDetails }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="cyber-panel group overflow-hidden rounded-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-matrix-graphite">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-matrix-black/88 via-matrix-black/20 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {project.category.slice(0, 2).map((item) => (
            <TechBadge key={item} className="bg-matrix-black/65">
              {item}
            </TechBadge>
          ))}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-matrix-text">{project.title}</h3>
        <p className="mt-3 min-h-20 text-sm leading-6 text-matrix-muted">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <TechBadge key={technology}>{technology}</TechBadge>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            variant="secondary"
            onClick={() => onDetails(project)}
            icon={<ScanSearch className="h-4 w-4" aria-hidden />}
          >
            Ver detalhes
          </Button>
          {project.githubUrl ? (
            <Button
              href={project.githubUrl}
              external
              variant="ghost"
              icon={<Github className="h-4 w-4" aria-hidden />}
            >
              GitHub
            </Button>
          ) : null}
          {project.demoUrl ? (
            <Button
              href={project.demoUrl}
              external
              variant="ghost"
              icon={<ExternalLink className="h-4 w-4" aria-hidden />}
            >
              Demo
            </Button>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
