"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Medal, Presentation, Sparkles, Trophy, Users } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TechBadge } from "@/components/ui/TechBadge";

const gallery = [
  {
    src: "/images/events/hack27-team.jpg",
    alt: "Imagem ilustrativa da equipe RED BOOST no Hack27",
    label: "Equipe RED BOOST"
  },
  {
    src: "/images/events/hack27-presentation.jpg",
    alt: "Imagem ilustrativa da apresentação final do Hack27",
    label: "Apresentação final"
  },
  {
    src: "/images/events/hack27-award.jpg",
    alt: "Imagem ilustrativa da premiação do Hack27",
    label: "Premiação"
  }
];

const skills = [
  "Trabalho em equipe",
  "Comunicação",
  "Liderança",
  "Resolução de problemas",
  "Inovação",
  "Apresentação de soluções"
];

export function Hack27() {
  return (
    <section id="hack27" className="relative py-24">
      <div className="container-shell">
        <SectionTitle
          eyebrow="achievement unlocked"
          title="Hack27 Champion"
          description="Um destaque premium para a conquista com a equipe RED BOOST em um dos maiores hackathons do Espírito Santo."
        />

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.article
            className="cyber-panel scan-surface rounded-lg p-6 shadow-purple"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-md border border-matrix-green/40 bg-matrix-green/10 px-4 py-2 font-mono text-sm text-matrix-green">
              <Trophy className="h-5 w-5" aria-hidden />
              Campeão Hack27
            </div>
            <div className="space-y-5 text-base leading-8 text-matrix-muted">
              <p>
                Campeão do Hack27, um dos maiores hackathons do Espírito Santo, junto da equipe RED
                BOOST.
              </p>
              <p>
                Durante o evento, a equipe desenvolveu uma solução gamificada para treinamentos
                corporativos, criada para tornar o aprendizado mais engajador, dinâmico e eficiente.
              </p>
              <p>
                Além de contribuir para o desenvolvimento da solução vencedora, Marcos representou a
                equipe na apresentação final do projeto para uma audiência com mais de 100 pessoas.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Medal, label: "1º lugar" },
                { icon: Users, label: "RED BOOST" },
                { icon: Presentation, label: "100+ pessoas" }
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0 sm:border-l sm:border-t-0 sm:pl-4 sm:first:border-l-0 sm:first:pl-0">
                    <Icon className="mb-3 h-5 w-5 text-matrix-cyan" aria-hidden />
                    <p className="font-mono text-sm text-matrix-text">{item.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <TechBadge key={skill}>{skill}</TechBadge>
              ))}
            </div>
          </motion.article>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {gallery.map((item, index) => (
              <motion.figure
                key={item.src}
                className="group cyber-panel overflow-hidden rounded-lg"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 38vw, (min-width: 640px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-matrix-black/80 to-transparent" />
                  <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-sm text-matrix-text">
                    <Sparkles className="h-4 w-4 text-matrix-green" aria-hidden />
                    {item.label}
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
