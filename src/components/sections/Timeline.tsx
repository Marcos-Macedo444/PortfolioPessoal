"use client";

import { motion } from "framer-motion";
import { timeline } from "@/data/timeline";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TechBadge } from "@/components/ui/TechBadge";

export function Timeline() {
  return (
    <section id="jornada" className="relative py-24">
      <div className="container-shell">
        <SectionTitle
          eyebrow="timeline"
          title="Jornada técnica em construção"
          description="Uma linha do tempo para mostrar evolução, projetos, hackathons e aprofundamento em segurança e infraestrutura."
        />

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-matrix-green via-matrix-cyan to-transparent md:left-1/2" aria-hidden />
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.article
                key={item.title}
                className={`relative grid gap-4 pl-12 md:grid-cols-2 md:pl-0 ${
                  index % 2 === 0 ? "md:text-right" : ""
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute left-0 top-5 grid h-8 w-8 place-items-center rounded-md border border-matrix-green/45 bg-matrix-black text-matrix-green md:left-1/2 md:-translate-x-1/2">
                  <span className="h-2 w-2 rounded-full bg-matrix-green" aria-hidden />
                </div>
                <div className={index % 2 === 0 ? "md:pr-10" : "md:col-start-2 md:pl-10"}>
                  <div className="cyber-panel rounded-lg p-5 text-left">
                    <p className="font-mono text-xs uppercase text-matrix-cyan">{item.period}</p>
                    <h3 className="mt-2 text-xl font-semibold text-matrix-text">{item.title}</h3>
                    <p className="mt-3 leading-7 text-matrix-muted">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <TechBadge key={tag}>{tag}</TechBadge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
