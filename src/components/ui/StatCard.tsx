"use client";

import { motion } from "framer-motion";
import type { Stat } from "@/types";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

type StatCardProps = {
  stat: Stat;
  index: number;
};

export function StatCard({ stat, index }: StatCardProps) {
  return (
    <motion.article
      className="cyber-panel scan-surface rounded-lg p-5"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <p className="font-mono text-4xl font-semibold text-matrix-green">
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </p>
      <h3 className="mt-3 text-lg font-semibold text-matrix-text">{stat.label}</h3>
      <p className="mt-2 text-sm leading-6 text-matrix-muted">{stat.description}</p>
    </motion.article>
  );
}
