"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className
}: SectionTitleProps) {
  return (
    <motion.div
      className={cn(
        "mb-10 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <p className="font-mono text-sm uppercase text-matrix-green">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-matrix-text sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-matrix-muted sm:text-lg">{description}</p>
      ) : null}
    </motion.div>
  );
}
