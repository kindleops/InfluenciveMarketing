"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./IntelligenceField.module.css";

/**
 * AI as infrastructure, drawn as architecture.
 *
 * The company's system layers are stacked as floors in isometric space. The
 * intelligence layer is not another floor on top: it is the ground plane
 * beneath all of them, and conduits rise from it through every layer.
 * Signals travel up the conduits; each layer lights where it receives them.
 *
 * Pure SVG + CSS. The stack assembles once when it arrives; signals run only
 * while it's on screen; reduced motion shows the assembled, lit state.
 */

const VB_W = 1200;
const VB_H = 700;
const CX = 400;
const CY = 520;
const P = 150; // half-size of each plane, in plane units
const iso = (x: number, y: number, z: number) => [CX + (x - y) * 0.866, CY + (x + y) * 0.5 - z] as const;

type Layer = { name: string; note: string; z: number; key?: boolean };
const LAYERS: Layer[] = [
  { name: "Intelligence", note: "Shared data · models · guardrails", z: 0, key: true },
  { name: "Automation", note: "Agents and workflows", z: 86 },
  { name: "Conversion", note: "Scoring · next-best action", z: 152 },
  { name: "Acquisition", note: "Audience and bidding signals", z: 218 },
  { name: "Experience", note: "Adaptive surfaces", z: 284 },
  { name: "Brand", note: "Voice and identity guardrails", z: 350 },
];

/** Conduits: a point on the plane and the highest layer it reaches. */
const CONDUITS: { x: number; y: number; top: number }[] = [
  { x: -96, y: -30, top: 5 },
  { x: -40, y: -104, top: 3 },
  { x: 34, y: -58, top: 4 },
  { x: 104, y: 14, top: 5 },
  { x: -70, y: 64, top: 2 },
  { x: 16, y: 88, top: 4 },
  { x: 92, y: 104, top: 5 },
];

/** Interface surfaces resting on each layer (plane coordinates). */
const SURFACES: [number, number, number, number][] = [
  [-128, -128, 70, 44],
  [26, 40, 92, 58],
];

const LABEL_X = 760; // where the label column begins (viewBox units)
const PERIOD = 5.6; // seconds per signal cycle
const SEG = 0.42; // seconds per floor

const poly = (pts: (readonly [number, number])[]) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
const plane = (z: number) => poly([iso(-P, -P, z), iso(P, -P, z), iso(P, P, z), iso(-P, P, z)]);
const rect = (x: number, y: number, w: number, d: number, z: number) =>
  poly([iso(x, y, z), iso(x + w, y, z), iso(x + w, y + d, z), iso(x, y + d, z)]);

function gridLines(z: number, n = 10) {
  const lines: string[] = [];
  for (let i = 1; i < n; i++) {
    const t = -P + (2 * P * i) / n;
    const [a, b] = [iso(t, -P, z), iso(t, P, z)];
    const [c, d] = [iso(-P, t, z), iso(P, t, z)];
    lines.push(`M${a[0]} ${a[1]}L${b[0]} ${b[1]}`, `M${c[0]} ${c[1]}L${d[0]} ${d[1]}`);
  }
  return lines.join("");
}

export function IntelligenceField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.3) el.setAttribute("data-assembled", "");
        el.toggleAttribute("data-live", e.isIntersecting);
      },
      { threshold: [0, 0.3] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cursor = (s: number) => ({ "--t": `${s.toFixed(2)}s`, "--period": `${PERIOD}s` }) as CSSProperties;

  return (
    <div ref={ref} className={styles.field}>
      <div className={styles.frame}>
        <svg className={styles.svg} viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden="true" focusable="false">
          <defs>
            <radialGradient id="if-ground" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="rgb(130 158 255)" stopOpacity="0.36" />
              <stop offset="0.55" stopColor="rgb(130 158 255)" stopOpacity="0.08" />
              <stop offset="1" stopColor="rgb(130 158 255)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="if-plane" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgb(255 255 255)" stopOpacity="0.035" />
              <stop offset="1" stopColor="rgb(255 255 255)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Light pooling beneath the ground plane. */}
          <ellipse className={styles.pool} cx={CX} cy={CY + 10} rx="360" ry="190" fill="url(#if-ground)" />

          {LAYERS.map((layer, k) => {
            const segs = CONDUITS.filter((c) => c.top >= k && k > 0);
            return (
              <g key={layer.name} className={styles.level} style={{ "--z": layer.z, "--k": k } as CSSProperties}>
                {/* Conduit segments arriving at this floor from the one below. */}
                {segs.map((c, ci) => {
                  const idx = CONDUITS.indexOf(c);
                  const [x1, y1] = iso(c.x, c.y, LAYERS[k - 1].z);
                  const [x2, y2] = iso(c.x, c.y, layer.z);
                  const d = `M${x1} ${y1}L${x2} ${y2}`;
                  return (
                    <g key={ci} className={styles.conduit}>
                      <path d={d} className={styles.wire} />
                      <path d={d} className={styles.pulse} pathLength={1} style={cursor(idx * 0.74 + (k - 1) * SEG)} />
                    </g>
                  );
                })}

                <polygon points={plane(layer.z)} className={layer.key ? styles.ground : styles.plane} />
                {layer.key ? (
                  <path d={gridLines(layer.z, 12)} className={styles.grid} />
                ) : (
                  <path d={gridLines(layer.z, 4)} className={styles.gridFaint} />
                )}
                {/* Back edges catch the light. */}
                <polyline points={poly([iso(-P, P, layer.z), iso(-P, -P, layer.z), iso(P, -P, layer.z)])} className={styles.rim} />

                {!layer.key &&
                  SURFACES.map(([x, y, w, d2], si) => (
                    <polygon key={si} points={rect(x, y, w, d2, layer.z)} className={styles.surface} />
                  ))}

                {/* Where the signal lands: node + ripple. */}
                {CONDUITS.filter((c) => (layer.key ? true : c.top >= k)).map((c) => {
                  const idx = CONDUITS.indexOf(c);
                  const [nx, ny] = iso(c.x, c.y, layer.z);
                  const t = layer.key ? idx * 0.74 : idx * 0.74 + k * SEG;
                  return (
                    <g key={idx}>
                      {!layer.key && <ellipse cx={nx} cy={ny} rx={34} ry={19.6} className={styles.ripple} style={cursor(t)} />}
                      <circle cx={nx} cy={ny} r={layer.key ? 3.4 : 2.6} className={layer.key ? styles.source : styles.node} style={cursor(t)} />
                    </g>
                  );
                })}

                {/* Leader to the label column. */}
                <path
                  d={`M${iso(P, -P, layer.z)[0] + 14} ${iso(P, -P, layer.z)[1]}H${LABEL_X - 16}`}
                  className={styles.leader}
                />
              </g>
            );
          })}
        </svg>

        <ol className={styles.labels} role="list">
          {[...LAYERS].reverse().map((layer) => (
            <li
              key={layer.name}
              className={styles.label}
              data-key={layer.key || undefined}
              style={{ "--ly": `${((iso(P, -P, layer.z)[1] / VB_H) * 100).toFixed(2)}%`, "--k": LAYERS.indexOf(layer) } as CSSProperties}
            >
              <span className={styles.labelName}>{layer.key ? "Intelligence layer" : layer.name}</span>
              <span className={styles.labelNote}>{layer.note}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

