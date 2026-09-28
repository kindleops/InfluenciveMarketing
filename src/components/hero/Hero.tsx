"use client";

import { useRef } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/Button";
import { GlassObject } from "./GlassObject";
import styles from "./Hero.module.css";

const LAYERS = ["Brand", "Experience", "Acquisition", "Conversion", "Automation", "Intelligence"];

/**
 * Hero — "Who are you?"
 *
 * One object, one sentence. The glass mark sits centre stage over a horizon
 * of light; type is anchored to the floor of the frame like a title card.
 * Scrolling turns the object and lets the type drift away at its own depth.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });
  const titleY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -120]);
  const asideY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-title">
      <GlassObject className={styles.canvas} progressRef={progress} />
      <div className={styles.shade} aria-hidden="true" />

      <div className={`container ${styles.frame}`}>
        <div className={styles.meta} aria-hidden="true">
          <span>N° 001</span>
          <span className={styles.metaCenter}>Brand · Product · Growth · Intelligence</span>
          <span>Growth systems for ambitious companies</span>
        </div>

        <div className={styles.bottom}>
          <motion.h1 id="hero-title" className={styles.title} style={{ y: titleY, opacity: fade }}>
            <span className={styles.line}>
              <span style={{ animationDelay: "280ms" }}>Build what</span>
            </span>{" "}
            <span className={styles.line}>
              <span style={{ animationDelay: "380ms" }} className={styles.tone}>
                growth requires.
              </span>
            </span>
          </motion.h1>

          <motion.div className={styles.aside} style={{ y: asideY, opacity: fade }}>
            <p className={styles.lead}>
              We design and build the connected systems behind modern growth — brand, product, acquisition,
              automation and intelligence, engineered as one machine.
            </p>
            <div className={styles.actions}>
              <Button href="/start" size="lg" arrow magnetic>
                Start a Project
              </Button>
              <Button href="/work" size="lg" variant="ghost" arrow>
                Explore the work
              </Button>
            </div>
          </motion.div>
        </div>

        <ol className={styles.bar} aria-label="The system">
          {LAYERS.map((l, i) => (
            <li key={l} style={{ animationDelay: `${1100 + i * 70}ms` }}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {l}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
