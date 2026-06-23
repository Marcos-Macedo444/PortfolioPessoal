"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Medal, Presentation, Trophy, Users } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TechBadge } from "@/components/ui/TechBadge";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type HackImage = {
  src: string;
  alt: string;
};

const teamImages: HackImage[] = [
  {
    src: "/images/hack27/Team.jpg",
    alt: "Equipe RED BOOST reunida no Hack27"
  },
  {
    src: "/images/hack27/Team2.jpg",
    alt: "Registro complementar da equipe RED BOOST no Hack27"
  }
];

const awardImages: HackImage[] = [
  {
    src: "/images/hack27/Award.jpg",
    alt: "Premiação da equipe RED BOOST no Hack27"
  },
  {
    src: "/images/hack27/Award2.jpg",
    alt: "Registro complementar da premiação no Hack27"
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

function HackCarousel({
  images,
  label
}: {
  images: HackImage[];
  label: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || images.length < 2) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4600);

    return () => window.clearInterval(interval);
  }, [images.length, reducedMotion]);

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-matrix-black/55">
      <div className="relative aspect-[4/3]">
        {images.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
            className={cn(
              "object-contain p-2 transition duration-700",
              activeIndex === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-md border border-white/10 bg-matrix-black/75 px-3 py-2 backdrop-blur">
        <span className="font-mono text-xs uppercase text-matrix-text">{label}</span>
        <div className="flex items-center gap-2" aria-label={`${label}: ${images.length} imagens`}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full border transition",
                activeIndex === index
                  ? "border-matrix-green bg-matrix-green"
                  : "border-white/40 bg-white/10 hover:border-matrix-cyan"
              )}
              aria-label={`Mostrar imagem ${index + 1} de ${label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hack27() {
  return (
    <section id="hack27" className="relative py-24">
      <div className="container-shell">
        <SectionTitle
          eyebrow="achievement unlocked"
          title="Hack27: conquista com a RED BOOST"
          description="Uma área única para registrar a vitória, a colaboração da equipe e a apresentação final da solução gamificada."
        />

        <motion.article
          className="cyber-panel scan-surface rounded-lg p-6 shadow-purple"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-md border border-matrix-green/40 bg-matrix-green/10 px-4 py-2 font-mono text-sm text-matrix-green">
                <Trophy className="h-5 w-5" aria-hidden />
                Campeão do Hack27
              </div>

              <div className="space-y-5 text-base leading-8 text-matrix-muted">
                <p>
                  A RED BOOST desenvolveu uma solução gamificada para treinamentos corporativos,
                  criada para tornar o aprendizado mais engajador, dinâmico e mensurável.
                </p>
                <p>
                  Minha contribuição conectou colaboração, pensamento de produto, comunicação e
                  apresentação técnica para defender a solução em uma audiência ampla.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { icon: Users, label: "Equipe RED BOOST" },
                  { icon: Presentation, label: "Apresentação final" },
                  { icon: Medal, label: "Premiação" }
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="rounded-md border border-white/10 bg-white/[0.03] p-4">
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
            </div>

            <div className="grid gap-5">
              <section aria-labelledby="hack27-team-title" className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <h3 id="hack27-team-title" className="mb-3 text-lg font-semibold text-matrix-text">
                  Equipe RED BOOST
                </h3>
                <HackCarousel images={teamImages} label="Equipe" />
              </section>

              <section aria-labelledby="hack27-presentation-title" className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <h3 id="hack27-presentation-title" className="mb-3 text-lg font-semibold text-matrix-text">
                  Apresentação final
                </h3>
                <div className="relative overflow-hidden rounded-lg border border-white/10 bg-matrix-black/55">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/images/hack27/Presentation.jpg"
                      alt="Apresentação final da RED BOOST no Hack27"
                      fill
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              </section>

              <section aria-labelledby="hack27-award-title" className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <h3 id="hack27-award-title" className="mb-3 text-lg font-semibold text-matrix-text">
                  Premiação
                </h3>
                <HackCarousel images={awardImages} label="Premiação" />
              </section>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
