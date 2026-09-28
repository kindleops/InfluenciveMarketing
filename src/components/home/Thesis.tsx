"use client";

import { useRef, type CSSProperties } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./Thesis.module.css";

/**
 * Brand thesis — read by light. Words illuminate as the statement scrolls
 * through the viewport, so the sentence is experienced at reading pace.
 * One CSS variable (--p) drives every word; no per-word JS.
 */
const SEGMENTS: { text: string; accent?: boolean }[] = [
  { text: "Most companies don’t have a marketing problem. They have a" },
  { text: "systems problem", accent: true },
  { text: "— brand, website, acquisition, operations and data, built separately, by different people, for different goals. We redesign the systems customers see," },
  { text: "and the systems teams rely on behind them.", accent: true },
];

export function Thesis() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    ref.current?.style.setProperty("--p", v.toFixed(4));
  });

  let i = 0;
  const words = SEGMENTS.flatMap((seg) =>
    seg.text.split(" ").map((w) => ({ w, accent: seg.accent, i: i++ })),
  );
  const n = words.length;

  return (
    <section className={styles.thesis} aria-label="Thesis" data-chapter="01|Thesis">
      <div className={`container ${styles.grid}`}>
        <div className={styles.meta} data-reveal="fade">
          <span className={styles.metaIndex}>(01)</span>
          <span>Thesis</span>
        </div>
        <p
          ref={ref}
          className={styles.statement}
          data-static={reduced || undefined}
          style={{ "--n": n } as CSSProperties}
        >
          {words.map(({ w, accent, i }) => (
            <span key={i} className={accent ? styles.accent : undefined} style={{ "--i": i } as CSSProperties}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
