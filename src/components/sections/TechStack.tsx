"use client";

import { motion } from "framer-motion";
import { carouselSkills, technologies } from "@/data/technologies";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function TechStack() {
  const carouselItems = [...carouselSkills, ...carouselSkills];

  return (
    <section id="tecnologias" className="relative py-24">
      <div className="container-shell">
        <SectionTitle
          eyebrow="scanning skills"
          title="Skill matrix em evolução contínua"
          description="Tecnologias organizadas como sinais do painel: stack prática, fundamentos e áreas de interesse técnico."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {technologies.map((technology, index) => {
            const Icon = technology.icon;

            return (
              <motion.article
                key={technology.name}
                className="cyber-panel scan-surface rounded-lg p-5"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.025 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-matrix-text">{technology.name}</h3>
                    <p className="mt-1 text-sm text-matrix-muted">{technology.area}</p>
                  </div>
                  <Icon className="h-7 w-7 shrink-0 text-matrix-green" aria-hidden />
                </div>
                <div className="mt-5 flex items-center justify-between font-mono text-xs">
                  <span className="text-matrix-cyan">{technology.level}</span>
                  <span className="text-matrix-muted">{technology.signal}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-matrix-green to-matrix-cyan"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${technology.signal}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="cyber-panel mt-10 overflow-hidden rounded-lg py-4">
          <div className="flex w-max animate-ticker-slow gap-4 px-4 motion-reduce:animate-none">
            {carouselItems.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="min-w-40 rounded-md border border-matrix-cyan/20 bg-matrix-cyan/10 px-5 py-3 text-center font-mono text-sm text-matrix-cyan"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
