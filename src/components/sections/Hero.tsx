"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Radar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setTypedRole(profile.typingRoles[0]);
      return undefined;
    }

    const currentRole = profile.typingRoles[roleIndex];
    let charIndex = 0;
    let nextRoleTimeout = 0;
    setTypedRole("");

    const typing = window.setInterval(() => {
      charIndex += 1;
      setTypedRole(currentRole.slice(0, charIndex));

      if (charIndex >= currentRole.length) {
        window.clearInterval(typing);
        nextRoleTimeout = window.setTimeout(() => {
          setRoleIndex((current) => (current + 1) % profile.typingRoles.length);
        }, 1300);
      }
    }, 55);

    return () => {
      window.clearInterval(typing);
      window.clearTimeout(nextRoleTimeout);
    };
  }, [reducedMotion, roleIndex]);

  return (
    <section id="inicio" className="relative min-h-[92vh] overflow-hidden pt-28">
      <div className="absolute inset-0 bg-cyber-radial" aria-hidden />
      <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-matrix-green/45 to-transparent" aria-hidden />

      <div className="container-shell relative grid min-h-[calc(92vh-7rem)] items-center gap-10 pb-14 lg:grid-cols-[1fr_0.82fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-matrix-green/25 bg-matrix-green/10 px-3 py-2 font-mono text-xs uppercase text-matrix-green">
            <span className="h-2 w-2 rounded-full bg-matrix-green shadow-glow" aria-hidden />
            System Online
          </div>

          <h1 className="text-5xl font-semibold text-matrix-text sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-medium text-matrix-cyan sm:text-xl">
            {profile.title}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-matrix-muted sm:text-lg">
            {profile.headline}
          </p>

          <div className="mt-6 flex min-h-10 items-center gap-3 font-mono text-sm text-matrix-green sm:text-base">
            <Sparkles className="h-4 w-4" aria-hidden />
            <span>{typedRole}</span>
            <span className="animate-pulse-glow" aria-hidden>
              █
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#projetos" icon={<Radar className="h-4 w-4" aria-hidden />}>
              Ver projetos
            </Button>
            <Button href="#jornada" variant="secondary" icon={<ArrowDown className="h-4 w-4" aria-hidden />}>
              Conhecer trajetória
            </Button>
            <Button
              href={profile.githubUrl}
              external
              variant="ghost"
              icon={<Github className="h-4 w-4" aria-hidden />}
            >
              GitHub
            </Button>
            <Button
              href={profile.linkedinUrl}
              external
              variant="ghost"
              icon={<Linkedin className="h-4 w-4" aria-hidden />}
            >
              LinkedIn
            </Button>
            <Button href="#contato" variant="ghost" icon={<Mail className="h-4 w-4" aria-hidden />}>
              Contato
            </Button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:max-w-2xl">
            {["NOC Internship", "Cybersecurity", "Infrastructure"].map((status) => (
              <div key={status} className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="font-mono text-xs uppercase text-matrix-muted">{status}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-sm lg:max-w-md lg:animate-float-panel motion-reduce:animate-none"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <div className="absolute -inset-4 rounded-[2rem] border border-matrix-green/10 bg-matrix-green/5 blur-2xl" aria-hidden />
          <div className="cyber-panel scan-surface relative overflow-hidden rounded-2xl p-3 shadow-cyan">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-matrix-green/30 bg-matrix-graphite">
              <Image
                src="/images/profile/profile.png"
                alt="Foto profissional de Marcos Macêdo"
                fill
                priority
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 420px, 92vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-matrix-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-matrix-black/70 p-4 backdrop-blur-md">
                <p className="font-mono text-xs uppercase text-matrix-green">current status</p>
                <p className="mt-1 text-sm font-semibold text-matrix-text">
                  Estagiário NOC em cybersecurity
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
