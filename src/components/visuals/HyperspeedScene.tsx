"use client";

import { Component, useEffect, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import type { HyperspeedProps } from "./Hyperspeed/Hyperspeed";
import { useMotionPreference } from "@/components/ui/Preferences";

type Status = "preparing" | "ready" | "fallback";

class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function PerspectiveFallback() {
  return (
    <svg
      className="hyperspeed-fallback"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g fill="none" strokeLinecap="round">
        <path
          className="fallback-road"
          d="M0 700 588 270 1200 700M0 540 588 270 1200 550M70 700 588 270 1120 700"
        />
        <g className="fallback-blue">
          <path d="M35 680Q370 395 578 275M180 700Q415 390 582 275M390 700Q505 380 586 275M750 700Q680 390 592 275M1030 700Q830 400 598 275" />
          <path d="M80 460 80 325M200 420 200 325M1000 440 1000 310M1120 485 1120 340" />
        </g>
        <g className="fallback-green">
          <path d="M280 700Q470 390 584 275M920 700Q755 400 595 275M90 575Q380 385 580 275" />
        </g>
      </g>
    </svg>
  );
}

export function HyperspeedScene({
  boosting,
  activity,
  onStatus,
}: {
  boosting: boolean;
  activity: React.RefObject<number>;
  onStatus: (status: Status) => void;
}) {
  const [Renderer, setRenderer] =
    useState<ComponentType<HyperspeedProps> | null>(null);
  const [status, setStatus] = useState<Status>("preparing");
  const [light, setLight] = useState(false);
  const [compact, setCompact] = useState(false);
  const [modest, setModest] = useState(false);
  const alive = useRef(true);
  const enabled = useMotionPreference();

  useEffect(() => {
    alive.current = true;
    const device = navigator as Navigator & { deviceMemory?: number };
    setCompact(window.innerWidth <= 700);
    setModest(
      (device.hardwareConcurrency || 8) <= 4 || (device.deviceMemory || 8) <= 4,
    );
    import("./Hyperspeed/Hyperspeed")
      .then((module) => {
        if (alive.current) setRenderer(() => module.default);
      })
      .catch(() => {
        if (alive.current) setStatus("fallback");
      });
    return () => {
      alive.current = false;
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const query = matchMedia("(prefers-color-scheme: light)");
    const update = () =>
      setLight(
        root.dataset.theme === "light" ||
          (root.dataset.theme !== "dark" && query.matches),
      );
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    query.addEventListener("change", update);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    onStatus(status);
    if (status !== "preparing") return;
    const timeout = window.setTimeout(() => setStatus("fallback"), 8000);
    return () => window.clearTimeout(timeout);
  }, [status, onStatus]);

  const blue = light ? "#205bc5" : "#4c8dff";
  const green = light ? "#08733c" : "#65f5a2";

  return (
    <div className="hero-scene" data-scene-status={status} aria-hidden="true">
      <PerspectiveFallback />
      <div className="hyperspeed-stage">
        {Renderer && status !== "fallback" ? (
          <SceneBoundary onError={() => setStatus("fallback")}>
            <Renderer
              curve="gentle"
              curvature={0.3}
              speed={compact || modest ? 0.68 : 0.8}
              boost={1.65}
              fov={88}
              boostFov={102}
              density={compact || modest ? 28 : 42}
              poles={compact || modest ? 14 : 22}
              dust={12}
              trailLength={1.35}
              lightSize={1.7}
              glow={0}
              reflections={0.2}
              steer={0}
              tailColors={[blue, blue, green]}
              headColors={[green, blue, blue]}
              poleColors={[blue, green, blue]}
              roadColor={light ? "#eaf0f8" : "#09121e"}
              roadOpacity={0.16}
              lineColor={light ? "#a3b8d5" : "#203653"}
              background={light ? "#f5f8fc" : "#09121e"}
              theme={light ? "light" : "dark"}
              interactive={false}
              boosting={boosting}
              running={enabled}
              activity={activity}
              pixelRatio={compact || modest ? 1 : 1.5}
              onReady={() => {
                if (alive.current) setStatus("ready");
              }}
              onError={() => {
                if (alive.current) setStatus("fallback");
              }}
            />
          </SceneBoundary>
        ) : null}
      </div>
    </div>
  );
}
