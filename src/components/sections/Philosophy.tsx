"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { profile } from "@/data/profile";

export function Philosophy() {
  return (
    <section className="relative py-24" aria-label="Filosofia profissional">
      <div className="container-shell">
        <motion.div
          className="cyber-panel scan-surface mx-auto max-w-5xl rounded-lg p-8 text-center sm:p-12"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <Quote className="mx-auto mb-6 h-9 w-9 text-matrix-green" aria-hidden />
          <p className="text-2xl font-semibold leading-10 text-matrix-text sm:text-3xl">
            {profile.philosophy}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
