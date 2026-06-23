"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
};

export function AnimatedCounter({ value, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    if (reducedMotion) {
      setCount(value);
      return undefined;
    }

    let frame = 0;
    let started = false;
    const duration = 1200;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) {
          return;
        }

        started = true;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));

          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          }
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
