"use client";

import { useEffect, useMemo, useState } from "react";
import { Terminal } from "lucide-react";
import { profile } from "@/data/profile";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type TerminalWindowProps = {
  title?: string;
  lines?: string[];
  className?: string;
};

export function TerminalWindow({
  title = "portfolio-runtime",
  lines = profile.terminalLines,
  className
}: TerminalWindowProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const reducedMotion = usePrefersReducedMotion();
  const normalizedLines = useMemo(() => lines.slice(0, 8), [lines]);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleLines(normalizedLines);
      return undefined;
    }

    setVisibleLines([]);
    let index = 0;
    const interval = window.setInterval(() => {
      const nextLine = normalizedLines[index];

      if (nextLine) {
        setVisibleLines((current) => [...current, nextLine]);
      }

      index += 1;

      if (index >= normalizedLines.length) {
        window.clearInterval(interval);
      }
    }, 360);

    return () => window.clearInterval(interval);
  }, [normalizedLines, reducedMotion]);

  return (
    <div className={cn("cyber-panel rounded-lg", className)}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-matrix-muted">
          <Terminal className="h-4 w-4 text-matrix-green" aria-hidden />
          <span className="font-mono">{title}</span>
        </div>
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-matrix-green/80" />
        </div>
      </div>
      <div className="min-h-64 space-y-3 p-4 font-mono text-sm">
        {visibleLines.map((line, index) => (
          <p key={`${line}-${index}`} className="leading-6 text-matrix-text">
            <span className="text-matrix-green">marcos@portfolio:~$</span>{" "}
            <span className="text-matrix-cyan">{line}</span>
          </p>
        ))}
        <p className="text-matrix-green" aria-hidden>
          <span className="animate-pulse-glow">█</span>
        </p>
      </div>
    </div>
  );
}
