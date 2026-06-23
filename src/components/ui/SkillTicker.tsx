import { tickerSkills } from "@/data/technologies";

export function SkillTicker() {
  const items = [...tickerSkills, ...tickerSkills];

  return (
    <section
      aria-label="Habilidades em destaque"
      className="relative z-10 border-y border-matrix-green/20 bg-matrix-black/70 py-3 backdrop-blur-md"
    >
      <div className="overflow-hidden">
        <div className="flex w-max animate-ticker gap-3 px-3 motion-reduce:animate-none">
          {items.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="rounded-md border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs uppercase text-matrix-text"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
