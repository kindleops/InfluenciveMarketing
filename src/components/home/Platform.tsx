"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { capabilityLayers } from "@/content/capabilities";
import { SystemConsole } from "@/components/hero/SystemConsole";
import { SectionHeading } from "@/components/ui/Typography";
import { AmbientGlow } from "@/components/ui/Surface";
import styles from "./Platform.module.css";

/** The closing beat: focus pulls back out to the whole machine. */
const WHOLE = {
  id: "whole",
  index: "—",
  layer: "One machine",
  summary: "Every layer instrumented, connected and improving together — the system, not the parts.",
};
const BEATS = capabilityLayers.length + 1;

/**
 * The product story, told as a camera move:
 *   arrive   the interface rises out of the horizon into a pocket of light
 *   focus    the six layers are read one at a time; the rest of the system
 *            recedes while each module is lit
 *   return   the camera pulls back to the whole machine, every module live
 */
export function Platform() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(BEATS - 1, Math.max(0, Math.floor(p * BEATS)));
    setActive((cur) => (cur === next ? cur : next));
  });

  // Arrival: written as CSS variables (see Hero for why), from the moment
  // the stage enters the viewport until it pins.
  const { scrollYProgress: arrival } = useScroll({ target: trackRef, offset: ["start end", "start start"] });
  useMotionValueEvent(arrival, "change", (p) => {
    const el = stickyRef.current;
    if (!el) return;
    const e = reduced ? 1 : Math.min(1, p / 0.92);
    el.style.setProperty("--enter", e.toFixed(4));
    el.toggleAttribute("data-settled", e >= 0.999);
  });

  const layer = active < capabilityLayers.length ? capabilityLayers[active] : WHOLE;

  return (
    <section className={styles.section} aria-labelledby="platform-title" data-chapter="02|The system">
      <div className="container">
        <SectionHeading
          id="platform-title"
          eyebrow="The system"
          index="02"
          aside="Illustrative interface"
          layout="split"
          title={["One system.", <em key="a" className="t-accent">Six layers, one machine.</em>]}
          lead="Brand, experience, acquisition, conversion, automation and intelligence — designed together, instrumented together, improved together."
        />
      </div>

      <div ref={trackRef} className={styles.track} style={{ "--steps": BEATS } as CSSProperties}>
        <div ref={stickyRef} className={styles.sticky} data-reduced={reduced || undefined}>
          <AmbientGlow color="brand" size={1500} x="50%" y="55%" intensity={0.1} />
          <div className={`container ${styles.stage}`}>
            <div className={`lit-stage ${styles.console}`}>
              <span className={styles.floor} aria-hidden="true" />
              <SystemConsole layer={active} flat />
            </div>

            <div className={styles.caption}>
              <p className={styles.captionIdx} aria-hidden="true">
                <span>{layer.index}</span> / 06
              </p>
              <div className={styles.captionBody} key={layer.id} aria-live="polite">
                <h3 className={styles.captionTitle}>{layer.layer}</h3>
                <p className={styles.captionText}>{layer.summary}</p>
              </div>
              <ol className={styles.ticks} aria-hidden="true">
                {capabilityLayers.map((l, i) => (
                  <li key={l.id} data-on={i <= active || undefined} data-current={i === active || undefined}>
                    <span>{l.layer}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Phones: the same story as a composed list. */}
      <div className={`container ${styles.list}`}>
        <div className={styles.listConsole}>
          <SystemConsole />
        </div>
        <ol role="list">
          {capabilityLayers.map((l) => (
            <li key={l.id}>
              <span className={styles.listIdx}>{l.index}</span>
              <p className={styles.listTitle}>{l.layer}</p>
              <p className={styles.listText}>{l.summary}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
