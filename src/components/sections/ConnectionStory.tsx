"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { Timeline } from "@/components/sections/Timeline";
import { useMotionPreference } from "@/components/ui/Preferences";

export function ConnectionStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [bridge, setBridge] = useState({ d: "", width: 1, height: 1 });
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const update = () => {
      const bounds = root.getBoundingClientRect();
      const origin = root.querySelector("[data-connection-origin]");
      const experience = root.querySelector(".experience-list");
      const footer = root.querySelector(".hero-foot");
      if (!origin || !experience || !footer) return;
      const map = origin.getBoundingClientRect();
      const list = experience.getBoundingClientRect();
      const foot = footer.getBoundingClientRect();
      const x = map.left + 12 - bounds.left;
      const y = map.bottom - bounds.top;
      const edge = foot.right - bounds.left - 8;
      const turn = foot.bottom - bounds.top + 30;
      const target = list.left - bounds.left + (bounds.width <= 700 ? 9 : 27);
      const end = list.top - bounds.top - (bounds.width <= 700 ? 50 : 65);
      setBridge({
        width: bounds.width,
        height: bounds.height,
        d: `M${x} ${y} V${y + 8} H${edge - 20} Q${edge} ${y + 8} ${edge} ${y + 28} V${turn - 20} Q${edge} ${turn} ${edge - 20} ${turn} H${target + 20} Q${target} ${turn} ${target} ${turn + 20} V${end}`,
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(root);
    update();
    return () => observer.disconnect();
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end center"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.65], [0.08, 1]);
  const motionEnabled = useMotionPreference();
  return (
    <div className="connection-story" ref={ref}>
      <div className="story-bridge" aria-hidden="true">
        <svg
          viewBox={`0 0 ${bridge.width} ${bridge.height}`}
          preserveAspectRatio="none"
        >
          <path d={bridge.d} />
          <motion.path
            className="bridge-progress"
            d={bridge.d}
            style={{ pathLength: motionEnabled ? pathLength : 1 }}
          />
        </svg>
      </div>
      <Hero />
      <Timeline />
    </div>
  );
}
