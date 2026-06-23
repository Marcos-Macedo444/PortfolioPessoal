"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || reducedMotion) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    const chars = "01<>[]{}#/\\";
    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.ceil(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -height);
    };

    const draw = () => {
      context.fillStyle = "rgba(2, 6, 5, 0.12)";
      context.fillRect(0, 0, width, height);
      context.font = `${fontSize}px monospace`;
      context.fillStyle = "rgba(45, 255, 143, 0.11)";

      drops.forEach((drop, index) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = index * fontSize;
        const y = drop * fontSize;
        context.fillText(char, x, y);

        if (y > height && Math.random() > 0.986) {
          drops[index] = 0;
        } else {
          drops[index] = drop + 0.5;
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  );
}
