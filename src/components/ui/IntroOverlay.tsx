"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { profile } from "@/data/profile";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

export function IntroOverlay() {
  const [visible, setVisible] = useState(true);
  const [lineCount, setLineCount] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setLineCount(profile.introLines.length);
      const timeout = window.setTimeout(() => setVisible(false), 650);
      return () => window.clearTimeout(timeout);
    }

    let currentLine = 0;
    const lineInterval = window.setInterval(() => {
      currentLine += 1;
      setLineCount(Math.min(currentLine, profile.introLines.length));

      if (currentLine >= profile.introLines.length) {
        window.clearInterval(lineInterval);
      }
    }, 430);
    const closeTimeout = window.setTimeout(() => setVisible(false), 2450);

    return () => {
      window.clearInterval(lineInterval);
      window.clearTimeout(closeTimeout);
    };
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-matrix-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          role="status"
          aria-live="polite"
        >
          <div className="cyber-panel scan-surface w-[min(92vw,620px)] rounded-lg p-6">
            <div className="mb-5 flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-matrix-green" aria-hidden />
              <div>
                <p className="font-mono text-sm uppercase text-matrix-cyan">Access sequence</p>
                <h1 className="text-xl font-semibold text-matrix-text">Portfolio Runtime</h1>
              </div>
            </div>
            <div className="space-y-3 font-mono text-sm text-matrix-text">
              {profile.introLines.slice(0, lineCount).map((line) => (
                <p key={line}>
                  <span className="text-matrix-green">&gt;</span> {line}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
