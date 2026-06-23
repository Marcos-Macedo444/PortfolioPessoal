"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Radar, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { profile, statusMetrics, systemStatuses } from "@/data/profile";
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

      <div className="container-shell relative grid min-h-[calc(92vh-7rem)] items-center gap-10 pb-14 lg:grid-cols-[1.02fr_0.98fr]">
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

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
            {systemStatuses.slice(0, 4).map((status) => (
              <div key={status} className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="flex items-center gap-2 font-mono text-xs uppercase text-matrix-muted">
                  <ShieldCheck className="h-4 w-4 text-matrix-green" aria-hidden />
                  {status}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid gap-5 lg:animate-float-panel motion-reduce:animate-none"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <div className="cyber-panel scan-surface rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase text-matrix-green">Network Status</p>
                <h2 className="mt-1 text-xl font-semibold text-matrix-text">Threat Intelligence Panel</h2>
              </div>
              <span className="rounded-md border border-matrix-green/30 bg-matrix-green/10 px-3 py-1 font-mono text-xs text-matrix-green">
                Access Granted
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {statusMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="mb-2 flex items-center justify-between gap-3 font-mono text-xs">
                    <span className="text-matrix-muted">{metric.label}</span>
                    <span className="text-matrix-cyan">{metric.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-matrix-green via-matrix-cyan to-matrix-blue"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <TerminalWindow title="marcos-dashboard" className="overflow-hidden" />
        </motion.div>
      </div>
    </section>
  );
}
