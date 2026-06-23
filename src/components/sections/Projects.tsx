"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projectFilters, projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Todos") {
      return projects;
    }

    return projects.filter((project) => {
      const categories = project.category.map((item) => item.toLowerCase());
      const technologies = project.technologies.map((item) => item.toLowerCase());
      const filter = activeFilter.toLowerCase();

      return categories.includes(filter) || technologies.includes(filter);
    });
  }, [activeFilter]);

  return (
    <section id="projetos" className="relative py-24">
      <div className="container-shell">
        <SectionTitle
          eyebrow="loading projects"
          title="Projetos com foco em problemas reais"
          description="Cards sem imagens, focados em contexto, tecnologias, aprendizados e links diretos para publicação ou repositório."
        />

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {projectFilters.map((filter) => (
            <button
              type="button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "shrink-0 rounded-md border px-4 py-2 font-mono text-xs transition",
                activeFilter === filter
                  ? "border-matrix-green bg-matrix-green text-matrix-black"
                  : "border-white/10 bg-white/5 text-matrix-muted hover:border-matrix-green/45 hover:text-matrix-green"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {!filteredProjects.length ? (
          <div className="cyber-panel mt-8 rounded-lg p-8 text-center">
            <p className="font-mono text-sm text-matrix-green">scan result: empty</p>
            <p className="mt-2 text-matrix-muted">
              Nenhum projeto cadastrado para este filtro ainda. A estrutura está pronta para receber
              novos cards.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
