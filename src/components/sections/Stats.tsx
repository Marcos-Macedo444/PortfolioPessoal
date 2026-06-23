import { ShieldCheck } from "lucide-react";
import { stats } from "@/data/profile";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatCard } from "@/components/ui/StatCard";

export function Stats() {
  return (
    <section className="relative py-24" aria-label="Estatísticas do portfólio">
      <div className="container-shell">
        <SectionTitle
          eyebrow="portfolio telemetry"
          title="Indicadores do runtime"
          description="Números simbólicos e verificáveis do portfólio, sem inflar experiências profissionais."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
        <div className="cyber-panel mt-5 rounded-lg p-5">
          <p className="flex items-center gap-3 text-matrix-text">
            <ShieldCheck className="h-5 w-5 text-matrix-green" aria-hidden />
            <span>
              Foco atual em Cybersecurity, Infraestrutura e Automação para construir soluções
              confiáveis, simples e úteis.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
