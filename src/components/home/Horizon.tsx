"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { progress as range } from "@/lib/motion";
import horizon from "@/assets/plates/horizon.jpg";
import styles from "./Horizon.module.css";

/**
 * Horizon — the interlude before the point of view.
 *
 * A single photographed frame opens from a letterbox to full bleed as it
 * arrives, the camera eases back, then one line surfaces over the water.
 * Scroll writes the choreography as CSS variables (see Hero for why).
 */
export function Horizon() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const el = stageRef.current;
    if (!el || reduced) return;
    el.style.setProperty("--open", range(p, 0.08, 0.62).toFixed(4));
    el.style.setProperty("--zoom", (1.22 - range(p, 0, 1) * 0.2).toFixed(4));
    el.style.setProperty("--l1", range(p, 0.6, 0.76).toFixed(3));
    el.style.setProperty("--l2", range(p, 0.68, 0.86).toFixed(3));
  });

  // If reduced motion resolves (or is switched on) after a scroll has
  // already written the choreography, hand control back to the resting CSS.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !reduced) return;
    for (const v of ["--open", "--zoom", "--l1", "--l2"]) el.style.removeProperty(v);
  }, [reduced]);

  return (
    <section
      ref={ref}
      className={styles.horizon}
      aria-label="Interlude"
      data-chapter="08|Point of view"
      data-reduced={reduced || undefined}
    >
      <div ref={stageRef} className={styles.sticky}>
        <div className={styles.frame}>
          {/* Cover-cropped 21:9: the rendered width follows the viewport height
              whenever the screen is taller than the frame. */}
          <Image
            src={horizon}
            alt=""
            fill
            sizes="(max-width: 699px) 250vh, max(100vw, 240vh)"
            quality={82}
            placeholder="blur"
            className={styles.image}
          />
          <span className={styles.beam} aria-hidden="true" />
          <span className={styles.grade} aria-hidden="true" />
        </div>

        <div className={`container ${styles.copy}`}>
          <p className={styles.kicker}>
            <span>Interlude</span>
            <span>Systems over deliverables</span>
          </p>
          <p className={styles.statement}>
            <span className={styles.l1}>Build the system once.</span>{" "}
            <em className={`t-serif ${styles.l2}`}>Let it keep working.</em>
          </p>
        </div>
      </div>
    </section>
  );
}
