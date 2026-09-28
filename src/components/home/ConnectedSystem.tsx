"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { clamp, progress } from "@/lib/motion";
import styles from "./ConnectedSystem.module.css";

/**
 * The difference — "Why are you different?"
 *
 * A pinned scene in three acts, driven by scroll:
 *   I.   Disconnected — services scattered, each with its own broken thread.
 *   II.  Connected    — nodes align into one loop; each feeds the next.
 *   III. Compounding  — intelligence loops back into every layer; a pulse
 *                       circulates and the core begins to glow.
 *
 * Everything is one SVG updated through refs (no React re-render per frame).
 */

const NODES = ["Brand", "Experience", "Traffic", "Conversion", "Automation", "Data", "Intelligence", "Growth"];
const SIZE = 640;
const C = SIZE / 2;
const R = 232;

// Scattered, deliberately uneven positions — the "vendor" picture.
const SCATTER: [number, number][] = [
  [118, 132], [468, 86], [560, 300], [396, 250], [150, 470], [520, 540], [276, 372], [60, 318],
];
const RING: [number, number][] = NODES.map((_, i) => {
  const a = -Math.PI / 2 + (i / NODES.length) * Math.PI * 2;
  return [C + Math.cos(a) * R, C + Math.sin(a) * R];
});
const CIRC = 2 * Math.PI * R;

const ACTS = [
  {
    label: "I — Disconnected",
    title: ["Most agencies sell", "disconnected services."],
    body: "Brand here. Website there. Ads, SEO and automation somewhere else. Every handoff loses signal — and no one owns the whole.",
  },
  {
    label: "II — Connected",
    title: ["We build", "connected systems."],
    body: "Each layer is designed to feed the next: brand into experience, experience into traffic, traffic into conversion, conversion into automation and data.",
  },
  {
    label: "III — Compounding",
    title: ["Then the system", "compounds."],
    body: "Intelligence loops back into every layer. Each improvement makes the others more effective — growth becomes a property of the system, not a campaign.",
  },
];

const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function ConnectedSystem({ index = "03" }: { index?: string }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const fragRefs = useRef<(SVGLineElement | null)[]>([]);
  const spokeRefs = useRef<(SVGLineElement | null)[]>([]);
  const ringRef = useRef<SVGCircleElement>(null);
  const coreRef = useRef<SVGGElement>(null);
  const pulseRef = useRef<SVGGElement>(null);
  const [act, setAct] = useState(0);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

  const render = (p: number) => {
    const t1 = easeInOut(progress(p, 0.14, 0.44)); // scatter → ring
    const t2 = ease(progress(p, 0.36, 0.6)); // ring draws
    const t3 = ease(progress(p, 0.64, 0.86)); // compounding

    NODES.forEach((_, i) => {
      const g = nodeRefs.current[i];
      if (!g) return;
      const [sx, sy] = SCATTER[i];
      const [rx, ry] = RING[i];
      const x = sx + (rx - sx) * t1;
      const y = sy + (ry - sy) * t1;
      g.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      g.style.setProperty("--lit", String(clamp(0.35 + t1 * 0.4 + t3 * 0.25)));
      const frag = fragRefs.current[i];
      if (frag) frag.style.opacity = String(1 - t1);
      const spoke = spokeRefs.current[i];
      if (spoke) spoke.style.opacity = String(t3 * 0.9);
    });
    ringRef.current?.setAttribute("stroke-dashoffset", String(CIRC * (1 - t2)));
    if (coreRef.current) {
      coreRef.current.style.opacity = String(t3);
      coreRef.current.style.transform = `scale(${0.6 + t3 * 0.4})`;
    }
    if (pulseRef.current) pulseRef.current.style.opacity = String(t2 * (0.4 + t3 * 0.6));

    setAct(p < 0.36 ? 0 : p < 0.64 ? 1 : 2);
  };

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!reduced) render(p);
  });

  useEffect(() => {
    // Reduced motion: present the finished system, still and complete.
    render(reduced ? 1 : scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <section className={styles.section} aria-labelledby="difference-title" data-chapter={`${index}|The difference`}>
      <div ref={sceneRef} className={styles.scene} data-reduced={reduced || undefined}>
        <div className={styles.sticky}>
          <div className={`container ${styles.layout}`}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowIdx}>({index})</span> The difference
              </p>
              <h2 id="difference-title" className="sr-only">
                Most agencies sell disconnected services. We build connected systems.
              </h2>
              <div className={styles.acts} aria-hidden="true">
                {ACTS.map((a, i) => (
                  <div key={a.label} className={styles.act} data-state={i === act ? "on" : i < act ? "past" : "next"}>
                    <p className={styles.actLabel}>{a.label}</p>
                    <p className={styles.actTitle}>
                      {a.title[0]}
                      <br />
                      <em>{a.title[1]}</em>
                    </p>
                    <p className={styles.actBody}>{a.body}</p>
                  </div>
                ))}
              </div>
              {/* Screen readers get the full argument in order. */}
              <div className="sr-only">
                {ACTS.map((a) => (
                  <p key={a.label}>
                    {a.title.join(" ")} {a.body}
                  </p>
                ))}
              </div>
              <ol className={styles.progress} aria-hidden="true">
                {ACTS.map((a, i) => (
                  <li key={a.label} data-on={i <= act || undefined} />
                ))}
              </ol>
            </div>

            <div className={styles.diagramWrap} aria-hidden="true">
              <svg className={styles.diagram} viewBox={`0 0 ${SIZE} ${SIZE}`} role="presentation">
                <defs>
                  <radialGradient id="cs-core" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#9fb5ff" stopOpacity="0.55" />
                    <stop offset="0.45" stopColor="#4a72ff" stopOpacity="0.18" />
                    <stop offset="1" stopColor="#4a72ff" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="cs-ring" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#7fe0ff" />
                    <stop offset="0.5" stopColor="#7a9bff" />
                    <stop offset="1" stopColor="#dcc08f" />
                  </linearGradient>
                  <filter id="cs-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" />
                  </filter>
                </defs>

                {/* Guide ring (faint) and live ring (draws) */}
                <circle cx={C} cy={C} r={R} className={styles.guide} />
                <circle
                  ref={ringRef}
                  cx={C}
                  cy={C}
                  r={R}
                  className={styles.ring}
                  stroke="url(#cs-ring)"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC}
                  transform={`rotate(-90 ${C} ${C})`}
                />

                {/* Compounding core */}
                <g ref={coreRef} className={styles.core} style={{ opacity: 0 }}>
                  <circle cx={C} cy={C} r={150} fill="url(#cs-core)" />
                  <circle cx={C} cy={C} r={60} className={styles.coreRing} />
                  <circle cx={C} cy={C} r={96} className={`${styles.coreRing} ${styles.coreRingSlow}`} />
                  <text x={C} y={C - 6} className={styles.coreLabel} textAnchor="middle">
                    COMPOUNDING
                  </text>
                  <text x={C} y={C + 16} className={styles.coreSub} textAnchor="middle">
                    growth system
                  </text>
                </g>

                {/* Spokes: intelligence feeding back into each layer */}
                {RING.map(([x, y], i) => (
                  <line
                    key={`s${i}`}
                    ref={(el) => {
                      spokeRefs.current[i] = el;
                    }}
                    x1={C}
                    y1={C}
                    x2={x}
                    y2={y}
                    className={styles.spoke}
                    style={{ opacity: 0 }}
                  />
                ))}

                {/* Circulating pulse */}
                <g ref={pulseRef} className={styles.pulseOrbit} style={{ opacity: 0 }}>
                  <circle cx={C} cy={C - R} r={9} className={styles.pulseGlow} filter="url(#cs-glow)" />
                  <circle cx={C} cy={C - R} r={3.5} className={styles.pulse} />
                </g>

                {/* Nodes */}
                {NODES.map((name, i) => {
                  const [x, y] = SCATTER[i];
                  const labelBelow = RING[i][1] > C + 10;
                  const side = RING[i][0] < C - 20 ? "end" : RING[i][0] > C + 20 ? "start" : "middle";
                  return (
                    <g
                      key={name}
                      ref={(el) => {
                        nodeRefs.current[i] = el;
                      }}
                      transform={`translate(${x} ${y})`}
                      className={styles.node}
                    >
                      <line
                        ref={(el) => {
                          fragRefs.current[i] = el;
                        }}
                        x1={0}
                        y1={0}
                        x2={i % 2 ? 46 : -40}
                        y2={i % 3 ? 30 : -34}
                        className={styles.fragment}
                      />
                      <circle r={16} className={styles.halo} />
                      <circle r={5.5} className={styles.dot} />
                      <text
                        className={styles.label}
                        x={side === "start" ? 18 : side === "end" ? -18 : 0}
                        y={side === "middle" ? (labelBelow ? 34 : -26) : 4}
                        textAnchor={side}
                      >
                        {name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
