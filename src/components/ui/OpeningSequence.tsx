"use client";

import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Monogram } from "./Monogram";
import { useMotionPreference, usePreferencesReady } from "./Preferences";

export function OpeningSequence({ ready }: { ready: boolean }) {
  const motion = useMotionPreference();
  const initialized = usePreferencesReady();

  useEffect(() => {
    if (!initialized) return;
    const root = document.documentElement;
    if (!motion) {
      root.dataset.intro = "done";
      return;
    }
    if (!ready || root.dataset.intro !== "pending") return;
    const elapsed = performance.now() - Number(root.dataset.introStarted || 0);
    const reveal = window.setTimeout(
      () => {
        if (root.dataset.intro === "pending") root.dataset.intro = "revealing";
      },
      Math.max(0, 600 - elapsed),
    );
    const finish = window.setTimeout(
      () => {
        root.dataset.intro = "done";
      },
      Math.max(0, 600 - elapsed) + 400,
    );
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(finish);
    };
  }, [ready, motion, initialized]);

  return (
    <div className="brand-intro" aria-label="Abertura de Marcos Macêdo">
      <div className="intro-identity">
        <Monogram className="intro-mark" />
        <p>
          Marcos Macêdo<span className="accent">.</span>
        </p>
        <svg viewBox="0 0 500 180" className="intro-routes" aria-hidden="true">
          <path d="M0 180 240 10M130 180 250 10M370 180 260 10M500 180 270 10" />
        </svg>
      </div>
      <button
        className="intro-skip text-link"
        type="button"
        data-skip-intro
        onClick={() => {
          document.documentElement.dataset.intro = "done";
          document
            .querySelector<HTMLElement>("#inicio h1")
            ?.focus({ preventScroll: true });
        }}
      >
        Pular abertura <ArrowUpRight size={16} />
      </button>
    </div>
  );
}
