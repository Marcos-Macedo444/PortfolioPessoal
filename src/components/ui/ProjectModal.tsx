"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import type { Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { TechBadge } from "@/components/ui/TechBadge";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-matrix-black/82 px-4 py-8 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onMouseDown={onClose}
        >
          <motion.article
            className="cyber-panel max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-lg"
            initial={{ scale: 0.96, y: 18 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 18 }}
            transition={{ duration: 0.25 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-matrix-panel/95 px-5 py-4 backdrop-blur">
              <p className="font-mono text-sm uppercase text-matrix-green">Project details</p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-white/10 p-2 text-matrix-muted transition hover:border-matrix-green/50 hover:text-matrix-green"
                aria-label="Fechar detalhes do projeto"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="grid gap-6 p-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative aspect-[16/11] overflow-hidden rounded-lg border border-white/10 bg-matrix-graphite">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 id="project-modal-title" className="text-2xl font-semibold text-matrix-text">
                  {project.title}
                </h2>
                <p className="mt-4 leading-7 text-matrix-muted">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <TechBadge key={technology}>{technology}</TechBadge>
                  ))}
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <h3 className="font-mono text-sm uppercase text-matrix-cyan">Funcionalidades</h3>
                    <ul className="mt-3 space-y-2 text-sm text-matrix-muted">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <span className="text-matrix-green">›</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-mono text-sm uppercase text-matrix-cyan">Aprendizados</h3>
                    <ul className="mt-3 space-y-2 text-sm text-matrix-muted">
                      {project.learnings.map((learning) => (
                        <li key={learning} className="flex gap-2">
                          <span className="text-matrix-green">›</span>
                          <span>{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  {project.githubUrl ? (
                    <Button
                      href={project.githubUrl}
                      external
                      variant="secondary"
                      icon={<Github className="h-4 w-4" aria-hidden />}
                    >
                      Abrir GitHub
                    </Button>
                  ) : null}
                  {project.demoUrl ? (
                    <Button
                      href={project.demoUrl}
                      external
                      variant="secondary"
                      icon={<ExternalLink className="h-4 w-4" aria-hidden />}
                    >
                      Abrir Demo
                    </Button>
                  ) : null}
                  <Button variant="ghost" onClick={onClose}>
                    Fechar
                  </Button>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
