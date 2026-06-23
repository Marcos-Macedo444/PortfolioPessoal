"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Bot, BrainCircuit, Handshake, LockKeyhole, Network, Puzzle } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { profile } from "@/data/profile";

const values = [
  { label: "Resolução de problemas", icon: Puzzle },
  { label: "Aprendizado contínuo", icon: BrainCircuit },
  { label: "Segurança", icon: LockKeyhole },
  { label: "Infraestrutura", icon: Network },
  { label: "Automação", icon: Bot },
  { label: "Colaboração", icon: Handshake }
];

export function About() {
  return (
    <section id="sobre" className="relative py-24">
      <div className="container-shell">
        <SectionTitle
          eyebrow="whoami"
          title="Perfil técnico com mentalidade de construção"
          description="Um recorte profissional focado em entender sistemas, automatizar rotinas e evoluir em segurança e infraestrutura."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 grid gap-5 md:grid-cols-[180px_1fr] md:items-center">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-matrix-green/25 bg-matrix-graphite">
                <Image
                  src="/images/profile/profile-photo.jpg"
                  alt="Imagem ilustrativa do perfil profissional de Marcos Macêdo"
                  fill
                  sizes="(min-width: 768px) 180px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <p className="font-mono text-xs uppercase text-matrix-green">professional profile</p>
                <p className="mt-2 text-sm leading-6 text-matrix-muted">
                  Presença técnica com foco em segurança, infraestrutura, automação e soluções que
                  resolvem problemas reais.
                </p>
              </div>
            </div>
            <p className="text-lg leading-9 text-matrix-muted">{profile.about}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.label}
                    className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Icon className="mb-3 h-5 w-5 text-matrix-green" aria-hidden />
                    <h3 className="font-semibold text-matrix-text">{item.label}</h3>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>

          <TerminalWindow
            title="profile-scan"
            lines={[
              "whoami",
              "cat skills.txt",
              "scan --profile marcos",
              "status --learning continuous",
              "focus --cybersecurity infrastructure automation",
              "output: builder mindset"
            ]}
          />
        </div>
      </div>
    </section>
  );
}
