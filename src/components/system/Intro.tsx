"use client";

import { useEffect, useRef } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import styles from "./Intro.module.css";

const WORDS = ["Brand", "Product", "Growth", "Intelligence"];

/**
 * First-visit title sequence (homepage, once per session, never with
 * reduced motion). The head script sets html[data-intro="running"] before
 * first paint; everything in <main> holds its entrance until this lifts.
 * The horizon drawn here becomes the horizon behind the glass object.
 */
export function Intro() {
  const countRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "running") return;
    const DURATION = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      if (countRef.current) countRef.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (wordRef.current) wordRef.current.textContent = WORDS[Math.min(WORDS.length - 1, Math.floor(p * WORDS.length))];
      if (lineRef.current) lineRef.current.style.transform = `scaleX(${eased})`;
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        root.dataset.intro = "leaving";
        window.setTimeout(() => {
          root.dataset.intro = "done";
          try {
            sessionStorage.setItem("intro-seen", "1");
          } catch {}
        }, 1100);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={styles.intro} aria-hidden="true">
      <div className={styles.center}>
        <BrandMark size={44} animate />
      </div>
      <span ref={lineRef} className={styles.line} />
      <div className={styles.foot}>
        <span ref={countRef}>000</span>
        <span ref={wordRef}>Brand</span>
      </div>
    </div>
  );
}
