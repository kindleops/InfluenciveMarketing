"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { work } from "@/content/work";
import { WorkVisual } from "@/components/work/WorkVisual";
import { Eyebrow } from "@/components/ui/Typography";
import styles from "./WorkReel.module.css";

/**
 * Work — "Can you prove it?"
 *
 * A pinned horizontal reel: vertical scroll drives the strip sideways, so
 * each engagement arrives full-bleed, one at a time, like frames of film.
 * The section's height is derived from the strip's real width, so the pin
 * always lasts exactly as long as the reel.
 */
export function WorkReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);
  const reduced = useReducedMotion();
  // Panel centres along the strip, measured with the layout (not per frame).
  const centres = useRef<number[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const measure = () => {
      const on = mq.matches && !reduced;
      setPinned(on);
      const track = trackRef.current;
      if (track) {
        centres.current = Array.from(track.querySelectorAll<HTMLElement>("[data-panel]")).map(
          (p) => p.offsetLeft + p.offsetWidth / 2,
        );
      }
      if (!track || !on) return setDistance(0);
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [reduced]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  // Depth: the frame at the centre of the screen is the foreground; frames
  // either side sit a step back — smaller and dimmer — and come forward as
  // they arrive. Written straight to the DOM as a CSS variable.
  useMotionValueEvent(x, "change", (v) => {
    const track = trackRef.current;
    if (!track || !pinned) return;
    const mid = window.innerWidth / 2;
    const panels = track.querySelectorAll<HTMLElement>("[data-panel]");
    panels.forEach((p, i) => {
      const c = centres.current[i];
      if (c === undefined) return;
      const d = Math.min(1, Math.abs(c + v - mid) / (window.innerWidth * 0.62));
      p.style.setProperty("--d", d.toFixed(3));
    });
  });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="work-title"
      data-chapter="04|Selected work"
      data-pinned={pinned || undefined}
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={styles.sticky}>
        <div className={`container ${styles.head}`}>
          <Eyebrow index="04" aside="Engagement blueprints">
            Selected work
          </Eyebrow>
          <div className={styles.headRow}>
            <h2 id="work-title" className={styles.title}>
              Systems, <span>not deliverables.</span>
            </h2>
            <p className={styles.note}>
              The systems we build for recurring types of company, and exactly how each is measured. Client case
              studies are published with permission.
            </p>
          </div>
        </div>

        <motion.div ref={trackRef} className={styles.track} style={pinned ? { x } : undefined}>
          {work.map((item, i) => (
            <Link
              key={item.slug}
              href={`/work/${item.slug}`}
              className={styles.panel}
              data-card=""
              data-panel=""
              data-cursor="View"
            >
              <div className={styles.stage}>
                <WorkVisual kind={item.visual} accent={item.accent} />
              </div>
              <div className={styles.caption}>
                <span className={styles.idx}>
                  {String(i + 1).padStart(2, "0")} / {String(work.length).padStart(2, "0")}
                </span>
                <span className={styles.name}>{item.kind === "case-study" && item.client ? item.client : item.title}</span>
                <span className={styles.engagement}>{item.engagement}</span>
                <span className={styles.for}>{item.archetype}</span>
              </div>
            </Link>
          ))}
          <Link href="/work" className={styles.end}>
            <span className={styles.endLabel}>All work &amp; blueprints</span>
            <span className={styles.endArrow} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h11.2M7.6 2.2 12.4 7l-4.8 4.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </motion.div>

        {pinned && (
          <div className={`container ${styles.progress}`} aria-hidden="true">
            <motion.span style={{ scaleX: bar }} />
          </div>
        )}
      </div>
    </section>
  );
}
