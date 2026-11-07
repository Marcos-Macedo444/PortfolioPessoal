"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "@/components/ui/Preferences";

// Static projection of the same knot for the pre-hydration and reduced-motion frame.
const staticKnot =
  "M38.4 360.1L67.2 381.7L97.7 404.7L130 429L177 437.9L227.8 442.5L278.7 447.1L329.9 451.7L373.4 439.6L405.3 406.1L422.2 360.7L423.4 312.4L413.2 265.8L394.9 221.6L370.1 179.7L339.2 140.2L302.4 104.2L259.9 73.8L213.2 53.5L168.4 50.1L135.6 66.8L119 96.8L115.5 132.6L121.9 171.1L137.1 210.4L160.1 246.7L187.3 274.1L215.3 291L243.7 299.6L273.2 301.4L304.6 297.1L339 286.3L376.9 268.1L418.8 240.8L462.5 203.5L500.1 159.9L519.8 121.8L520 96.9L506.2 83.6L481.8 79.3L447.8 82.9L406.4 93.6L363.7 109.4L324.1 128L287.9 148.8L254.8 172.2L224.6 199.1L197.6 230.4L175.6 267.8L162.3 312.6L165 364.1L190.4 412.9L232.3 445.8L283.7 450.3L338.1 445.4L392.4 440.5L446.7 435.6L497.1 419L544.2 390.1L592.5 360.4L625.4 340.1";
const staticOverpasses = [
  "M360.5 166.2L350.1 153.1L339.2 140.2L327.6 127.8L315.3 115.7L302.4 104.2L288.8 93.3",
  "M363.9 275L376.9 268.1L390.5 260L404.4 251L418.8 240.8L433.4 229.5L448 217",
  "M197.6 230.4L189.6 242.2L182.2 254.6L175.6 267.8L169.9 281.9L165.4 296.8L162.3 312.6",
  "M179.5 397.9L190.4 412.9L203.2 426L217.3 437L232.3 445.8L247.8 452.6L265.6 452L283.7 450.3L301.8 448.7L320 447L338.1 445.4L356.2 443.8L374.3 442.1L392.4 440.5L410.5 438.8L428.6 437.2",
];

function StaticKnot() {
  const wires = Array.from({ length: 9 }, (_, i) => ({
    transform: `translate(${((i % 3) - 1) * 1.7} ${Math.floor(i / 3) * 2 - 2})`,
    opacity: 0.35 + (i % 3) * 0.25,
  }));
  return (
    <svg className="cable-static-knot" viewBox="0 0 600 500" aria-hidden="true">
      <defs>
        <path id="static-knot-line" d={staticKnot} />
      </defs>
      <g strokeWidth="1.4">
        {wires.map((props, i) => (
          <use key={i} href="#static-knot-line" {...props} />
        ))}
        {staticOverpasses.map((d) => (
          <g key={d}>
            <path
              d={d}
              stroke="var(--bg)"
              strokeWidth="12"
              strokeLinecap="butt"
            />
            {wires.map((props, i) => (
              <path key={i} d={d} {...props} />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

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
          /* The server-rendered signature remains visible. */
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
        <div className="cable-knot-frame cable-frame">
          <canvas aria-hidden="true" />
          <StaticKnot />
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
