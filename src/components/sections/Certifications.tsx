"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { certifications } from "@/data/certifications";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Certifications() {
  return (
    <section className="relative py-24" aria-label="Certificações e estudos">
      <div className="container-shell">
        <SectionTitle
          eyebrow="certifications buffer"
          title="Certificações e estudos"
          description="Área pronta para adicionar certificados reais, instituição, data, link e imagem sem mexer nos componentes."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((certification, index) => (
            <motion.article
              key={certification.name}
              className="cyber-panel overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
            >
              <div className="relative aspect-[16/10] bg-matrix-graphite">
                <Image
                  src={certification.image}
                  alt={`Imagem ilustrativa de certificado para ${certification.name}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="flex items-center gap-2 font-mono text-xs uppercase text-matrix-green">
                  <BadgeCheck className="h-4 w-4" aria-hidden />
                  {certification.status}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-matrix-text">{certification.name}</h3>
                <p className="mt-2 text-sm text-matrix-muted">{certification.institution}</p>
                <p className="mt-1 text-sm text-matrix-muted">{certification.date}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
