"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useMotionPreference } from "@/components/ui/Preferences";

export function BackToTop() {
  const motionEnabled = useMotionPreference();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: motionEnabled ? "smooth" : "auto",
            })
          }
          className="back-to-top icon-button"
          initial={{ opacity: 0, y: motionEnabled ? 18 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: motionEnabled ? 18 : 0 }}
        >
          <ArrowUp className="h-5 w-5" aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
