"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { BrandMark } from "@/components/brand/BrandMark";
import {
  AcquisitionModule,
  AutomationModule,
  BrandModule,
  ConversionModule,
  ExperienceModule,
  FocusSheen,
  IntelligenceModule,
} from "./ConsoleModules";
import styles from "./SystemConsole.module.css";

/**
 * The hero composition: one connected system rendered as a living interface.
 * Six modules map to the six capability layers; a highlight travels through
 * them in order to show the flow — brand → experience → acquisition →
 * conversion → automation → intelligence.
 *
 * Every figure here is illustrative interface content, labelled as such.
 */

const LAYERS = ["Brand", "Experience", "Acquisition", "Conversion", "Automation", "Intelligence"] as const;

const EVENTS = [
  { k: "lead.created", d: "source organic · /pricing", tone: "brand" },
  { k: "enrich.account", d: "fintech · 51–200 · EMEA", tone: "" },
  { k: "score.computed", d: "fit 0.86 · intent high", tone: "positive" },
  { k: "route.assigned", d: "→ enterprise pod", tone: "" },
  { k: "sequence.started", d: "follow-up in 2 min", tone: "" },
  { k: "crm.synced", d: "opportunity created", tone: "positive" },
  { k: "report.refreshed", d: "attribution · 7d", tone: "" },
  { k: "insight.flagged", d: "pricing · fintech ↑", tone: "gold" },
] as const;

function clock(i: number) {
  const s = 2 + i * 3;
  return `09:41:${String(s % 60).padStart(2, "0")}`;
}

export function SystemConsole({ layer, flat = false }: { layer?: number; flat?: boolean } = {}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [autoActive, setActive] = useState(0);
  const controlled = typeof layer === "number";
  const active = controlled ? layer : autoActive;
  const [cursor, setCursor] = useState(5);
  const [running, setRunning] = useState(false);

  // Scroll: the console starts tilted back into the horizon and settles
  // flat as it rises into view.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "start 0.2"] });
  const still = reduced || flat;
  const rotateX = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], still ? [1, 1] : [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [30, 0]);

  // Only animate while visible.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running || reduced) return;
    const a = controlled ? 0 : setInterval(() => setActive((n) => (n + 1) % LAYERS.length), 2400);
    const b = setInterval(() => setCursor((n) => n + 1), 1700);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, [running, reduced, controlled]);

  const visibleEvents = Array.from({ length: 6 }, (_, i) => {
    const n = cursor - i;
    return { ...EVENTS[((n % EVENTS.length) + EVENTS.length) % EVENTS.length], n };
  });

  const mod = (i: number) => ({ "data-active": active === i || undefined, "data-module": LAYERS[i] });

  return (
    <div ref={stageRef} className={styles.stage} data-flat={flat || undefined}>
      <motion.div className={styles.tiltOuter} style={{ rotateX, scale, y }}>
        <div className={styles.tiltInner} data-tilt="3">
          <div
            ref={rootRef}
            className={`glass ${styles.console}`}
            data-level="3"
            data-pointer-light=""
            data-focus={(controlled && active < LAYERS.length) || undefined}
            data-whole={(controlled && active >= LAYERS.length) || undefined}
          >
            {/* Chrome */}
            <div className={styles.chrome}>
              <div className={styles.crumbs}>
                <BrandMark size={13} />
                <span>system</span>
                <span className={styles.sep}>/</span>
                <span className={styles.crumbStrong}>growth-os</span>
              </div>
              <ol className={styles.flow} aria-label="System layers">
                {LAYERS.map((l, i) => (
                  <li key={l} data-active={active === i || undefined} data-passed={i < active || undefined}>
                    <span className={styles.flowDot} />
                    {l}
                  </li>
                ))}
              </ol>
              <div className={styles.status}>
                <span className={styles.liveDot} />
                <span>Illustrative</span>
              </div>
            </div>

            <div className={styles.grid}>
              <section className={`${styles.module} ${styles.mBrand}`} {...mod(0)}>
                <FocusSheen />
                <BrandModule />
              </section>
              <section className={`${styles.module} ${styles.mExp}`} {...mod(1)}>
                <FocusSheen />
                <ExperienceModule />
              </section>
              <section className={`${styles.module} ${styles.mChart}`} {...mod(2)}>
                <FocusSheen />
                <AcquisitionModule />
              </section>
              <section className={`${styles.module} ${styles.mFunnel}`} {...mod(3)}>
                <FocusSheen />
                <ConversionModule />
              </section>
              <section className={`${styles.module} ${styles.mStream}`} {...mod(4)}>
                <FocusSheen />
                <AutomationModule events={visibleEvents.map((e) => ({ ...e, time: clock(e.n) }))} />
              </section>
              <section className={`${styles.module} ${styles.mInsight}`} {...mod(5)}>
                <FocusSheen />
                <IntelligenceModule />
              </section>
            </div>
          </div>

          {/* Floating surfaces at different depths — parallax with tilt. */}
          <div className={`glass ${styles.float} ${styles.floatA}`} data-level="4" data-float="" aria-hidden="true">
            <span className={styles.floatLabel}>Signal</span>
            <span className={styles.floatValue}>Intent ↑</span>
          </div>
          <div className={`glass ${styles.float} ${styles.floatB}`} data-level="4" data-float="" aria-hidden="true">
            <span className={styles.floatDot} />
            <span className={styles.floatLabel}>Workflow live</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
