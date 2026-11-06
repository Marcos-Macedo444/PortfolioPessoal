"use client";

import { useEffect, useRef } from "react";
import { Hero } from "@/components/sections/Hero";
import { Timeline } from "@/components/sections/Timeline";
import { ConnectionsScene } from "@/components/visuals/ConnectionsScene";

export function ConnectionStory() {
  const ref = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = root.getBoundingClientRect();
        const scene = root
          .querySelector(".cable-story")
          ?.getBoundingClientRect();
        const list = root
          .querySelector(".experience-list")
          ?.getBoundingClientRect();
        if (!scene || !list || !svg.current || !path.current) return;
        const compact = matchMedia("(max-width: 700px)").matches;
        const x = list.left - bounds.left + (compact ? 9 : 27);
        const start = scene.bottom - bounds.top;
        const end = list.top - bounds.top - (compact ? 50 : 65);
        svg.current.setAttribute(
          "viewBox",
          `0 0 ${bounds.width} ${bounds.height}`,
        );
        path.current.setAttribute("d", `M${x} ${start} V${end}`);
        root.style.setProperty("--rail-x", `${x}px`);
      });
    };
    const resize = new ResizeObserver(update);
    resize.observe(root);
    window.addEventListener("resize", update);
    update();
    return () => {
      resize.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <>
      <Hero />
      <div className="connection-story" ref={ref}>
        <ConnectionsScene />
        <svg className="journey-bridge" ref={svg} aria-hidden="true">
          <path ref={path} />
        </svg>
        <Timeline />
      </div>
    </>
  );
}
