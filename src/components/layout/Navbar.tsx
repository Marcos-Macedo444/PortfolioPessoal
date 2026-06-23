"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Command, Github, Linkedin, Menu, X } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = useMemo(() => navigationItems.map((item) => item.id), []);
  const activeId = useScrollSpy(sectionIds);

  const openCommandPalette = () => {
    window.dispatchEvent(new Event("open-command-palette"));
    setMobileOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-matrix-black/70 backdrop-blur-xl">
      <nav className="container-shell flex min-h-16 items-center justify-between" aria-label="Navegação principal">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Ir para o início">
          <span className="grid h-10 w-10 place-items-center rounded-md border border-matrix-green/45 bg-matrix-green/10 font-mono text-sm font-bold text-matrix-green shadow-glow">
            {profile.monogram}
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold text-matrix-text">{profile.name}</span>
            <span className="block font-mono text-xs text-matrix-muted">Portfolio Runtime</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-matrix-muted transition hover:bg-white/5 hover:text-matrix-green",
                activeId === item.id && "bg-matrix-green/10 text-matrix-green"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/10 p-2 text-matrix-muted transition hover:border-matrix-green/50 hover:text-matrix-green"
            aria-label="Abrir GitHub"
          >
            <Github className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/10 p-2 text-matrix-muted transition hover:border-matrix-cyan/50 hover:text-matrix-cyan"
            aria-label="Abrir LinkedIn"
          >
            <Linkedin className="h-4 w-4" aria-hidden />
          </a>
          <button
            type="button"
            onClick={openCommandPalette}
            className="rounded-md border border-matrix-green/30 px-3 py-2 font-mono text-xs text-matrix-green transition hover:bg-matrix-green hover:text-matrix-black"
            aria-label="Abrir command palette"
          >
            <Command className="mr-2 inline h-4 w-4" aria-hidden />
            Ctrl K
          </button>
        </div>

        <button
          type="button"
          className="rounded-md border border-white/10 p-2 text-matrix-muted lg:hidden"
          onClick={() => setMobileOpen((current) => !current)}
          aria-expanded={mobileOpen}
          aria-label="Abrir menu"
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </nav>

      {mobileOpen ? (
        <motion.div
          className="border-t border-white/10 bg-matrix-black/95 lg:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="container-shell py-4">
            <div className="grid gap-2">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-3 text-sm text-matrix-muted transition hover:bg-white/5 hover:text-matrix-green",
                    activeId === item.id && "bg-matrix-green/10 text-matrix-green"
                  )}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={openCommandPalette}
                className="mt-2 rounded-md border border-matrix-green/30 px-3 py-3 text-left font-mono text-sm text-matrix-green"
              >
                <Command className="mr-2 inline h-4 w-4" aria-hidden />
                Command Palette
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
