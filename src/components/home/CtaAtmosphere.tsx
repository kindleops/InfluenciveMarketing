"use client";

import { useRef, type CSSProperties } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./ProjectCTA.module.css";

/* Lines arriving from the edges of the frame — the conduits, rules and
   horizons of the page — all converging on the glass mark. (viewBox units) */
const RAYS: [number, number][] = [
  [0, 70], [0, 190], [0, 330], [0, 470], [0, 560],
  [1000, 40], [1000, 170], [1000, 300], [1000, 430], [1000, 540],
  [170, 0], [400, 0], [640, 0], [860, 0],
  [240, 600], [760, 600],
];
const FOCUS: [number, number] = [500, 300];

/**
 * The finale's environment. As the closing scene arrives, geometry from the
 * rest of the page converges on the glass mark and the colour field resolves
 * behind it; `--settle` (0–1) is written to the scene for the copy to use.
 */
export function CtaAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const scene = ref.current?.closest("section");
    if (!scene) return;
    scene.style.setProperty("--settle", reduced ? "1" : p.toFixed(4));
  });

  return (
    <div ref={ref} className={styles.atmosphere} aria-hidden="true">
      <span className={styles.field} />
      <svg className={styles.rays} viewBox="0 0 1000 600" preserveAspectRatio="none">
        {RAYS.map(([x, y], i) => (
          <path
            key={i}
            d={`M${x} ${y}L${FOCUS[0]} ${FOCUS[1]}`}
            pathLength={1}
            className={styles.ray}
            style={{ "--r": (i % 5) / 5 } as CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
}
