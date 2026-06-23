"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Command, Copy, ExternalLink, Search, Trophy, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { cn, copyText, scrollToSection } from "@/lib/utils";

type CommandAction = {
  label: string;
  description: string;
  keywords: string;
  action: () => void | Promise<void>;
  icon: LucideIcon;
};

export function CommandPalette() {
  const { open, closePalette, openPalette } = useCommandPalette();
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [achievement, setAchievement] = useState(false);

  const commands = useMemo<CommandAction[]>(
    () => [
      {
        label: "Ir para Sobre",
        description: "Abrir perfil profissional",
        keywords: "sobre perfil whoami",
        icon: Search,
        action: () => scrollToSection("sobre")
      },
      {
        label: "Ir para Projetos",
        description: "Carregar cards e filtros",
        keywords: "projetos loading projects",
        icon: Search,
        action: () => scrollToSection("projetos")
      },
      {
        label: "Ir para Tecnologias",
        description: "Scanning skills",
        keywords: "tecnologias stack skills",
        icon: Search,
        action: () => scrollToSection("tecnologias")
      },
      {
        label: "Ir para Contato",
        description: "Abrir canais de contato",
        keywords: "contato email linkedin github",
        icon: Search,
        action: () => scrollToSection("contato")
      },
      {
        label: "Abrir GitHub",
        description: profile.githubLabel,
        keywords: "github repositorios codigo",
        icon: ExternalLink,
        action: () => window.open(profile.githubUrl, "_blank", "noopener,noreferrer")
      },
      {
        label: "Abrir LinkedIn",
        description: profile.linkedinLabel,
        keywords: "linkedin networking",
        icon: ExternalLink,
        action: () => window.open(profile.linkedinUrl, "_blank", "noopener,noreferrer")
      },
      {
        label: "Copiar e-mail",
        description: profile.email,
        keywords: "email contato copiar",
        icon: Copy,
        action: async () => {
          await copyText(profile.email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        }
      }
    ],
    []
  );

  const filteredCommands = commands.filter((command) => {
    const term = `${command.label} ${command.description} ${command.keywords}`.toLowerCase();
    return term.includes(query.toLowerCase());
  });

  useEffect(() => {
    let buffer = "";
    let timeout = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (event.key.length === 1) {
        buffer = `${buffer}${event.key.toLowerCase()}`.slice(-6);
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
          buffer = "";
        }, 1600);

        if (buffer.endsWith("hack27")) {
          setAchievement(true);
          window.setTimeout(() => setAchievement(false), 2600);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePalette();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closePalette, open]);

  const runCommand = async (command: CommandAction) => {
    await command.action();
    closePalette();
  };

  return (
    <>
      <button
        type="button"
        onClick={openPalette}
        className="fixed bottom-5 left-5 z-40 hidden rounded-md border border-white/10 bg-matrix-panel/85 px-3 py-2 font-mono text-xs text-matrix-muted shadow-cyan backdrop-blur transition hover:border-matrix-green/50 hover:text-matrix-green sm:inline-flex"
        aria-label="Abrir command palette"
      >
        <Command className="mr-2 h-4 w-4" aria-hidden />
        Ctrl K
      </button>

      <AnimatePresence>
        {achievement ? (
          <motion.div
            className="fixed bottom-20 left-1/2 z-[75] -translate-x-1/2 rounded-md border border-matrix-green/40 bg-matrix-panel/95 px-4 py-3 text-sm text-matrix-text shadow-glow backdrop-blur"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            role="status"
          >
            <span className="inline-flex items-center gap-2">
              <Trophy className="h-4 w-4 text-matrix-green" aria-hidden />
              Achievement unlocked: Hack27 Champion
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[72] flex items-start justify-center bg-matrix-black/78 px-4 pt-24 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={closePalette}
          >
            <motion.div
              className="cyber-panel w-full max-w-2xl rounded-lg"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              onMouseDown={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <Search className="h-5 w-5 text-matrix-green" aria-hidden />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Digite um comando..."
                  className="h-10 min-w-0 flex-1 bg-transparent text-sm text-matrix-text outline-none placeholder:text-matrix-muted"
                />
                <button
                  type="button"
                  onClick={closePalette}
                  className="rounded-md border border-white/10 p-2 text-matrix-muted transition hover:border-matrix-green/50 hover:text-matrix-green"
                  aria-label="Fechar command palette"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>

              <div className="max-h-[56vh] overflow-y-auto p-2">
                {filteredCommands.length ? (
                  filteredCommands.map((command) => {
                    const Icon = command.icon;

                    return (
                      <button
                        type="button"
                        key={command.label}
                        onClick={() => void runCommand(command)}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition hover:bg-matrix-green/10"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/10 bg-white/5 text-matrix-green">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-matrix-text">
                            {command.label}
                          </span>
                          <span className="block truncate text-xs text-matrix-muted">
                            {command.description}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "text-matrix-green transition",
                            copied && command.label === "Copiar e-mail" ? "opacity-100" : "opacity-0"
                          )}
                        >
                          <Check className="h-4 w-4" aria-hidden />
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <p className="px-3 py-8 text-center text-sm text-matrix-muted">
                    Nenhum comando encontrado.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
