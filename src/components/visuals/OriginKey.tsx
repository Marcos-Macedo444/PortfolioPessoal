"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "@/components/ui/Preferences";

export function OriginKey() {
  const ref = useRef<SVGSVGElement>(null);
  const motion = useMotionPreference();
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    let visible = false;
    svg.dataset.loop = "true";
    svg.dataset.static = String(!motion);
    const update = () => {
      svg.dataset.running = String(motion && visible && !document.hidden);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        update();
      },
      { threshold: 0.25 },
    );
    observer.observe(svg);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      svg.dataset.running = "false";
    };
  }, [motion]);
  return (
    <svg
      ref={ref}
      className="origin-key"
      viewBox="0 0 320 112"
      fill="none"
      aria-hidden="true"
    >
      <path className="key-branch" pathLength="1" d="M-63 44 H32" />
      <g className="key-insert">
        <g className="key-turn">
          <path
            className="key-outline"
            pathLength="1"
            d="M32 44 A22 22 0 1 1 76 44 A22 22 0 1 1 32 44 M41 44 A13 13 0 1 0 67 44 A13 13 0 1 0 41 44 M76 40 H179 V47 H169 V57 H159 V50 H147 V61 H136 V52 H123 V57 H111 V48 H76"
          />
        </g>
      </g>
      <path
        className="lock-housing"
        d="M207 25 A20 20 0 0 1 218 61 L221 79 H193 L196 61 A20 20 0 0 1 207 25 Z"
      />
      <g className="lock-turn">
        <circle cx="207" cy="45" r="12" />
        <path d="M201 45 H213" />
      </g>
      <circle className="key-pulse" cx="207" cy="45" r="16" />
      <path
        className="key-exit"
        pathLength="1"
        d="M227 45 H276 Q294 45 294 63 V112"
      />
      <path
        className="key-signal"
        pathLength="1"
        d="M227 45 H276 Q294 45 294 63 V112"
      />
    </svg>
  );
}
