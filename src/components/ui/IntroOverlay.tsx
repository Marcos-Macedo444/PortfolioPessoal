"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { SecureLoadingAnimation } from "@/components/ui/SecureLoadingAnimation";
import { profile } from "@/data/profile";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

const loadingLines = profile.introLines.slice(0, -1);
const readyLine = profile.introLines[profile.introLines.length - 1];

export function IntroOverlay() {
  const [visible, setVisible] = useState(true);
  const [lineCount, setLineCount] = useState(0);
  const [verificationActive, setVerificationActive] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setLineCount(loadingLines.length);
      setVerificationActive(true);
      setVerificationComplete(true);
      const timeout = window.setTimeout(() => setVisible(false), 900);
      return () => window.clearTimeout(timeout);
    }

    let currentLine = 0;
    const lineInterval = window.setInterval(() => {
      currentLine += 1;
      setLineCount(Math.min(currentLine, loadingLines.length));

      if (currentLine >= loadingLines.length) {
        window.clearInterval(lineInterval);
        setVerificationActive(true);
      }
    }, 430);
    const completeTimeout = window.setTimeout(() => setVerificationComplete(true), 2750);
    const closeTimeout = window.setTimeout(() => setVisible(false), 4000);

    return () => {
      window.clearInterval(lineInterval);
      window.clearTimeout(completeTimeout);
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
          <div className="tech-panel signal-surface w-[min(92vw,620px)] rounded-lg p-6">
            <div className="mb-5 flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-matrix-green" aria-hidden />
              <div>
                <p className="font-mono text-sm uppercase text-matrix-cyan">Access sequence</p>
                <h1 className="text-xl font-semibold text-matrix-text">Portfolio Runtime</h1>
              </div>
            </div>
            <div className="space-y-3 font-mono text-sm text-matrix-text">
              {loadingLines.slice(0, lineCount).map((line) => (
                <p key={line}>
                  <span className="text-matrix-green">&gt;</span> {line}
                </p>
              ))}
            </div>
            <SecureLoadingAnimation
              active={verificationActive}
              complete={verificationComplete}
              reducedMotion={reducedMotion}
            />
            {verificationComplete ? (
              <p className="mt-4 font-mono text-sm text-matrix-text">
                <span className="text-matrix-green">&gt;</span> {readyLine}
              </p>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
