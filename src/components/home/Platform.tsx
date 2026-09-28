"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { capabilityLayers } from "@/content/capabilities";
import { SystemConsole } from "@/components/hero/SystemConsole";
import { SectionHeading } from "@/components/ui/Typography";
import { AmbientGlow } from "@/components/ui/Surface";
import styles from "./Platform.module.css";

/**
 * The product story. The interface is pinned centre-stage while the six
 * layers are read one at a time; each lights its module in the system, the
 * way flagship software is introduced — one capability per beat.
 */
export function Platform() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(capabilityLayers.length - 1, Math.max(0, Math.floor(p * capabilityLayers.length)));
    setActive((cur) => (cur === next ? cur : next));
  });

  const layer = capabilityLayers[active];

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

      <div ref={trackRef} className={styles.track} style={{ "--steps": capabilityLayers.length } as CSSProperties}>
        <div className={styles.sticky}>
          <AmbientGlow color="brand" size={1500} x="50%" y="55%" intensity={0.1} />
          <div className={`container ${styles.stage}`}>
            <div className={styles.console}>
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
                  <li key={l.id} data-on={i <= active || undefined}>
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
