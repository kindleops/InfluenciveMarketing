"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { BrandMark } from "@/components/brand/BrandMark";
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

// Illustrative series, indexed to a baseline of 100.
const SERIES = [100, 102, 101, 106, 109, 108, 114, 119, 117, 125, 131, 129, 138, 146, 151, 158, 164];

function chartPath(values: number[], w: number, h: number, pad = 6) {
  const min = Math.min(...values) - 6;
  const max = Math.max(...values) + 4;
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    pad + (1 - (v - min) / (max - min)) * (h - pad * 2),
  ]);
  // Smooth with Catmull-Rom → cubic Bézier.
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  const end = pts[pts.length - 1];
  return { line: d, area: `${d} L ${w} ${h} L 0 ${h} Z`, end };
}

const CHART = chartPath(SERIES, 400, 132);

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
    <div ref={stageRef} className={styles.stage}>
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
              {/* 01 Brand */}
              <section className={`${styles.module} ${styles.mBrand}`} {...mod(0)}>
                <header className={styles.mHead}>
                  <span>Brand core</span>
                  <span className={styles.mIdx}>01</span>
                </header>
                <div className={styles.specimen}>
                  <span className={styles.specSans}>Aa</span>
                  <span className={styles.specSerif}>Aa</span>
                </div>
                <div className={styles.swatches}>
                  <span style={{ "--sw": "#ece8e1" } as CSSProperties} />
                  <span style={{ "--sw": "#0e0f12" } as CSSProperties} />
                  <span style={{ "--sw": "#4a72ff" } as CSSProperties} />
                  <span style={{ "--sw": "#9b8cff" } as CSSProperties} />
                  <span style={{ "--sw": "#dcc08f" } as CSSProperties} />
                </div>
                <dl className={styles.tokens}>
                  <div><dt>voice</dt><dd>precise</dd></div>
                  <div><dt>motion</dt><dd>ease-out · 760</dd></div>
                </dl>
              </section>

              {/* 02 Experience */}
              <section className={`${styles.module} ${styles.mExp}`} {...mod(1)}>
                <header className={styles.mHead}>
                  <span>Experience</span>
                  <span className={styles.mIdx}>02</span>
                </header>
                <div className={styles.page}>
                  <div className={styles.pageNav}><i /><i /><i /><b /></div>
                  <div className={styles.pageHero}>
                    <i style={{ width: "72%" }} />
                    <i style={{ width: "48%" }} />
                    <b />
                  </div>
                  <div className={styles.pageCards}><i /><i /><i /></div>
                </div>
                <div className={styles.vitals}>
                  <span><em>LCP</em> 1.1s</span>
                  <span><em>CLS</em> 0.01</span>
                  <span><em>A11y</em> AA</span>
                </div>
              </section>

              {/* 03 Acquisition — chart */}
              <section className={`${styles.module} ${styles.mChart}`} {...mod(2)}>
                <header className={styles.mHead}>
                  <span>Qualified pipeline · indexed</span>
                  <span className={styles.mIdx}>03</span>
                </header>
                <div className={styles.readout}>
                  <span className={styles.readValue}>{SERIES[SERIES.length - 1]}</span>
                  <span className={styles.readDelta}>▲ vs. baseline 100</span>
                </div>
                <div className={styles.chartWrap}>
                  <svg className={styles.chart} viewBox="0 0 400 132" aria-hidden="true">
                    <defs>
                      <linearGradient id="sc-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#7a9bff" stopOpacity="0.35" />
                        <stop offset="1" stopColor="#7a9bff" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="sc-line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#7fe0ff" stopOpacity="0.5" />
                        <stop offset="0.6" stopColor="#7a9bff" />
                        <stop offset="1" stopColor="#ece8e1" />
                      </linearGradient>
                    </defs>
                    {[33, 66, 99].map((y) => (
                      <line key={y} x1="0" x2="400" y1={y} y2={y} className={styles.gridLine} />
                    ))}
                    <path d={CHART.area} fill="url(#sc-area)" className={styles.area} />
                    <path d={CHART.line} fill="none" stroke="url(#sc-line)" strokeWidth="1.6" className={styles.line} pathLength={1} />
                  </svg>
                  <span
                    className={styles.nowDot}
                    style={{ left: `${(CHART.end[0] / 400) * 100}%`, top: `${(CHART.end[1] / 132) * 100}%` } as CSSProperties}
                  />
                </div>
                <div className={styles.axis}>
                  <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
                </div>
              </section>

              {/* 04 Conversion — funnel */}
              <section className={`${styles.module} ${styles.mFunnel}`} {...mod(3)}>
                <header className={styles.mHead}>
                  <span>Conversion path</span>
                  <span className={styles.mIdx}>04</span>
                </header>
                <ul className={styles.funnel} role="list">
                  {[
                    ["Visit", 100],
                    ["Engage", 64],
                    ["Intent", 31],
                    ["Pipeline", 14],
                  ].map(([label, w], i) => (
                    <li key={label} style={{ "--w": `${w}%`, "--i": i } as CSSProperties}>
                      <span>{label}</span>
                      <i />
                    </li>
                  ))}
                </ul>
              </section>

              {/* 05 Automation — event stream */}
              <section className={`${styles.module} ${styles.mStream}`} {...mod(4)}>
                <header className={styles.mHead}>
                  <span>Automation · events</span>
                  <span className={styles.mIdx}>05</span>
                </header>
                <ol className={styles.events} role="list" aria-hidden="true">
                  {visibleEvents.map((e, i) => (
                    <li key={e.n} data-tone={e.tone || undefined} data-fresh={i === 0 || undefined}>
                      <time>{clock(e.n)}</time>
                      <span className={styles.evKey}>{e.k}</span>
                      <span className={styles.evDetail}>{e.d}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* 06 Intelligence — recommendation */}
              <section className={`${styles.module} ${styles.mInsight}`} {...mod(5)}>
                <header className={styles.mHead}>
                  <span>Intelligence</span>
                  <span className={styles.mIdx}>06</span>
                </header>
                <p className={styles.insightText}>
                  Pricing-page visits from fintech accounts are rising. <strong>Launch a vertical page</strong> and route to the enterprise pod.
                </p>
                <div className={styles.confidence}>
                  <span>Confidence</span>
                  <i><b /></i>
                </div>
                <div className={styles.insightActions}>
                  <span className={styles.approve}>Approve</span>
                  <span className={styles.review}>Review</span>
                </div>
              </section>
            </div>
          </div>

          {/* Floating surfaces at different depths — parallax with tilt. */}
          <div className={`glass ${styles.float} ${styles.floatA}`} data-level="4" aria-hidden="true">
            <span className={styles.floatLabel}>Signal</span>
            <span className={styles.floatValue}>Intent ↑</span>
          </div>
          <div className={`glass ${styles.float} ${styles.floatB}`} data-level="4" aria-hidden="true">
            <span className={styles.floatDot} />
            <span className={styles.floatLabel}>Workflow live</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
