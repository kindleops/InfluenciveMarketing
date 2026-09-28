"use client";

import { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { progress as range } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Chars } from "@/components/ui/Typography";
import { GlassObject } from "./GlassObject";
import styles from "./Hero.module.css";

const LAYERS = ["Brand", "Experience", "Acquisition", "Conversion", "Automation", "Intelligence"];

/**
 * Hero — "Who are you?"
 *
 * A pinned opening shot in two beats:
 *   1. Title card. The glass mark sits over a horizon of light; type is
 *      anchored to the floor of the frame.
 *   2. Push-in. On scroll the title card drifts away, the object turns
 *      face-on and moves toward camera, one line surfaces, and the scene
 *      falls to black — handing off to the thesis without a cut.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // One listener writes the whole choreography as CSS variables. (Driving
  // opacity through accelerated scroll timelines drifts inside a pinned,
  // smooth-scrolled section; this stays exact.)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    progress.current = p;
    const el = stickyRef.current;
    if (!el) return;
    const lineIn = range(p, 0.32, 0.46);
    const lineOut = 1 - range(p, 0.72, 0.86);
    el.style.setProperty("--card", (1 - range(p, 0, 0.26)).toFixed(3));
    el.style.setProperty("--lift", reduced ? "0" : range(p, 0, 0.5).toFixed(3));
    el.style.setProperty("--line", Math.min(lineIn, lineOut).toFixed(3));
    el.style.setProperty("--line-y", reduced ? "0" : (24 - range(p, 0.32, 0.86) * 48).toFixed(1));
    el.style.setProperty("--black", range(p, 0.8, 1).toFixed(3));
  });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-title" data-reduced={reduced || undefined}>
      <div ref={stickyRef} className={styles.sticky}>
        <GlassObject className={styles.canvas} progressRef={progress} />
        <div className={styles.shade} aria-hidden="true" />

        <div className={`container ${styles.frame}`}>
          <div className={`${styles.meta} ${styles.card}`} aria-hidden="true">
            <span>N° 001</span>
            <span className={styles.metaCenter}>Brand · Product · Growth · Intelligence</span>
            <span>Growth systems for ambitious companies</span>
          </div>

          <div className={styles.bottom}>
            <h1 id="hero-title" aria-label="Build what growth requires." className={`${styles.title} ${styles.card} ${styles.liftTitle}`}>
              <span className={styles.line} aria-hidden="true">
                <span>
                  <Chars>Build what</Chars>
                </span>
              </span>{" "}
              <span className={styles.line} aria-hidden="true">
                <span className={styles.tone}>
                  <Chars start={10}>growth requires.</Chars>
                </span>
              </span>
            </h1>

            <div className={`${styles.aside} ${styles.card} ${styles.liftAside}`}>
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
            </div>
          </div>

          <ol className={`${styles.bar} ${styles.card}`} aria-label="The system">
            {LAYERS.map((l, i) => (
              <li key={l} style={{ animationDelay: `${1100 + i * 70}ms` }}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {l}
              </li>
            ))}
          </ol>
        </div>

        {/* Beat two: the line that surfaces during the push-in. */}
        <p className={styles.pushLine} aria-hidden="true">
          One system. <span>Every layer of growth.</span>
        </p>
        <div className={styles.blackout} aria-hidden="true" />
      </div>
    </section>
  );
}
