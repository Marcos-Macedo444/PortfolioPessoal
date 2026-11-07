"use client";

import { useEffect } from "react";
import { Monogram } from "./Monogram";
import { IntroRocket } from "./IntroRocket";
import { useMotionPreference, usePreferencesReady } from "./Preferences";

const routes = [
  "M-600 46H-100L-88 34H-46L-22 10H6",
  "M28 -400V-50L12 -34V-2L28 14V34",
  "M500 -250H142L114 -222V-30L96 -12H72L50 10",
  "M-400 300V120H-26L-10 104H30L50 84V46",
  "M62 400V120L78 104V76L62 60V46",
  "M-200 -300V-100L-180 -80H40L62 -58V10",
  "M700 10H164L148 26H122L106 10",
  "M700 400H186L160 374V100L130 70H106V46",
];

export function OpeningSequence() {
  const motion = useMotionPreference();
  const initialized = usePreferencesReady();

  useEffect(() => {
    if (!initialized) return;
    const root = document.documentElement;
    if (!motion) {
      root.dataset.intro = "done";
      return;
    }
    if (root.dataset.intro !== "pending") return;
    const scene = document.querySelector<HTMLElement>(".hero-scene");
    let reveal = 0,
      finish = 0;
    const update = () => {
      if (
        !scene ||
        scene.dataset.sceneStatus === "preparing" ||
        root.dataset.intro !== "pending"
      )
        return;
      window.clearTimeout(reveal);
      window.clearTimeout(finish);
      const elapsed =
        performance.now() - Number(root.dataset.introStarted || 0);
      reveal = window.setTimeout(
        () => {
          if (root.dataset.intro === "pending")
            root.dataset.intro = "revealing";
        },
        Math.max(0, 1600 - elapsed),
      );
      finish = window.setTimeout(
        () => {
          root.dataset.intro = "done";
        },
        Math.max(0, 1600 - elapsed) + 400,
      );
    };
    const observer = new MutationObserver(update);
    if (scene)
      observer.observe(scene, {
        attributes: true,
        attributeFilter: ["data-scene-status"],
      });
    update();
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(finish);
      observer.disconnect();
    };
  }, [motion, initialized]);

  return (
    <div className="brand-intro" aria-label="Abertura de Marcos Macêdo">
      <svg viewBox="0 0 112 56" className="intro-circuit" aria-hidden="true">
        <g className="intro-route-bed">
          {routes.map((d) => (
            <path d={d} key={d} />
          ))}
        </g>
        {routes.map((d, index) => (
          <g key={d} style={{ "--route": index } as React.CSSProperties}>
            <path className="intro-route" d={d} pathLength={1} />
            {index % 3 === 0 && (
              <path className="intro-signal" d={d} pathLength={1} />
            )}
          </g>
        ))}
      </svg>
      <div className="intro-identity">
        <Monogram className="intro-mark" assemble />
        <p>
          Marcos Macêdo<span className="accent">.</span>
        </p>
        <IntroRocket />
      </div>
    </div>
  );
}
