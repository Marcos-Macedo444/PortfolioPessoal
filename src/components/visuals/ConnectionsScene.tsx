"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { useMotionPreference } from "@/components/ui/Preferences";

const featured = [
  "football-team-draw",
  "finance-system",
  "image-processing",
].map((id) => projects.find((project) => project.id === id)!);

function Signature() {
  return (
    <svg
      className="cable-static-signature"
      viewBox="0 0 1000 500"
      aria-hidden="true"
    >
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          transform={`translate(0 ${i * 1.7 - 11})`}
          opacity={0.25 + (i % 4) * 0.18}
          d="M-20 350 H115 Q120 350 120 345 V135 Q120 125 125 134 L267 315 L410 134 Q415 125 415 135 V345 Q415 350 425 350 H575 Q585 350 585 345 V135 Q585 125 590 134 L733 315 L875 134 Q880 125 880 135 V345 Q880 350 890 350 H1020"
        />
      ))}
    </svg>
  );
}

export function ConnectionsScene() {
  const ref = useRef<HTMLElement>(null);
  const motion = useMotionPreference();
  useEffect(() => {
    const root = ref.current;
    if (!root || !motion) return;
    let intersecting = false,
      requested = false,
      cancelled = false;
    let cleanup: (() => void) | undefined;
    const load = () => {
      if (!intersecting || requested || window.scrollY < 32) return;
      requested = true;
      import("./connections/renderer")
        .then(({ mountConnections }) => {
          if (!cancelled) cleanup = mountConnections(root, () => !cancelled);
        })
        .catch(() => {
          /* The server-rendered signature and links remain usable. */
        });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        intersecting = entries.some((entry) => entry.isIntersecting);
        load();
      },
      { threshold: 0.01 },
    );
    observer.observe(root);
    window.addEventListener("scroll", load, { passive: true });
    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("scroll", load);
      cleanup?.();
    };
  }, [motion]);

  return (
    <section
      id="conexoes"
      className="cable-story"
      ref={ref}
      aria-labelledby="connections-title"
    >
      <div className="cable-stage">
        <h2 id="connections-title" className="cable-title container-shell">
          Conexões em movimento<span className="accent">.</span>
        </h2>
        <canvas className="cable-desktop-canvas" aria-hidden="true" />
        <div className="cable-mobile-signature cable-frame">
          <canvas aria-hidden="true" />
          <Signature />
        </div>
        <div className="cable-project-frame cable-frame">
          <canvas aria-hidden="true" />
          <svg
            className="cable-static-branches"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M-5 70 H10 Q18 70 22 48 T34 29 M-5 70 H10 Q18 70 22 56 T34 50 M-5 70 H10 Q18 70 22 70 H34" />
          </svg>
          <div className="cable-projects">
            {featured.map((item, index) => (
              <a
                key={item.id}
                className={`cable-project cable-project-${index}`}
                href={item.demoUrl || item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{item.title}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="cable-handoff-frame cable-frame">
          <canvas aria-hidden="true" />
          <svg
            className="cable-static-handoff"
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M1000 5 H100 Q0 5 0 95 V200" />
          </svg>
        </div>
      </div>
    </section>
  );
}
