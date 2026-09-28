"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A hairline of light across the top of the viewport tracking reading progress. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        transformOrigin: "0% 50%",
        zIndex: "calc(var(--z-header) + 1)",
        background: "linear-gradient(90deg, var(--spectral-cyan), var(--brand-bright), var(--spectral-violet))",
        boxShadow: "0 0 12px var(--brand-bright)",
      }}
    />
  );
}
