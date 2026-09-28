import type { CSSProperties } from "react";
import Image from "next/image";
import { work } from "@/content/work";
import { capabilityLayers } from "@/content/capabilities";
import { services } from "@/content/services";
import { process as stages } from "@/content/process";
import { workPlates } from "@/components/work/WorkVisual";
import { ServiceArt } from "@/components/home/ServiceArt";
import styles from "./HeroVisuals.module.css";

/*
 * Signature objects for interior heroes. Each stands on the horizon of the
 * PageHero set and is built from the page's own subject — never generic
 * decoration. All motion is CSS, paused off screen, and still under reduced
 * motion.
 */

const v = (o: Record<string, string | number>) => o as CSSProperties;

/* ---- Work: the blueprints as a deck of lit frames, cycling in depth ---- */
export function WorkDeck() {
  return (
    <div className={styles.deck}>
      {work.map((w, i) => (
        <figure key={w.slug} className={styles.card} style={v({ "--i": i, "--n": work.length })}>
          <Image src={workPlates[w.visual]} alt="" fill sizes="(min-width: 1000px) 34vw, 80vw" quality={75} className={styles.cardImg} />
          <figcaption className={styles.cardCap}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {w.title}
          </figcaption>
        </figure>
      ))}
      <span className={styles.deckFloor} />
    </div>
  );
}

/* ---- Capabilities: six layers stacked in isometric space --------------- */
export function LayerStack() {
  return (
    <div className={styles.stackStage}>
      <div className={styles.stack}>
        {[...capabilityLayers].reverse().map((l, i) => {
          const k = capabilityLayers.length - 1 - i;
          return (
            <div key={l.id} className={styles.layer} style={v({ "--k": k })}>
              <span className={styles.layerGrid} />
              <span className={styles.layerName}>{l.layer}</span>
              <span className={styles.layerIdx}>{l.index}</span>
            </div>
          );
        })}
      </div>
      <span className={styles.stackGlow} />
    </div>
  );
}

/* ---- Services: a wall of the eight disciplines, each one live ---------- */
export function DisciplineWall() {
  return (
    <div className={styles.wallStage}>
      <div className={styles.wall}>
        {services.map((s, i) => (
          <div key={s.id} className={styles.tile} style={v({ "--i": i })}>
            <div className={styles.tileArt}>
              <ServiceArt id={s.id} />
            </div>
            <span className={styles.tileLabel}>
              <i>{s.index}</i>
              {s.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Approach: seven stages on a rising arc, a pulse travelling it ----- */
const ARC = "M 20 330 C 180 330, 300 250, 420 170 S 620 40, 680 30";
const POINTS: [number, number][] = [
  [20, 330],
  [150, 322],
  [262, 282],
  [370, 206],
  [470, 138],
  [580, 70],
  [680, 30],
];

export function ProcessArc() {
  return (
    <div className={styles.arcStage}>
      <svg viewBox="0 0 700 360" className={styles.arc}>
        <defs>
          <linearGradient id="pa-line" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="rgb(226 200 150)" stopOpacity="0.25" />
            <stop offset="1" stopColor="rgb(255 244 220)" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path d={ARC} className={styles.arcGhost} />
        <path d={ARC} className={styles.arcLine} stroke="url(#pa-line)" pathLength={1} />
        <circle r="4" className={styles.arcPulse}>
          <animateMotion dur="7s" repeatCount="indefinite" path={ARC} keyPoints="0;1;1" keyTimes="0;0.86;1" calcMode="linear" />
        </circle>
        {POINTS.map(([x, y], i) => (
          <g key={i} className={styles.stop} style={v({ "--i": i })}>
            <line x1={x} x2={x} y1={y} y2="352" className={styles.stem} />
            <circle cx={x} cy={y} r="5.5" className={styles.stopRing} />
            <circle cx={x} cy={y} r="2.4" className={styles.stopCore} />
            <text x={x + (i === 6 ? -10 : 10)} y={y - 12} textAnchor={i === 6 ? "end" : "start"} className={styles.stopIdx}>
              {stages[i].index}
            </text>
            <text x={x + (i === 6 ? -10 : 10)} y={y + 20} textAnchor={i === 6 ? "end" : "start"} className={styles.stopName}>
              {stages[i].name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---- Insights: three standing slabs of living light -------------------- */
const FIELDS: { word: string; c: [string, string, string] }[] = [
  { word: "Systems", c: ["91 124 255", "160 140 255", "240 236 226"] },
  { word: "Intelligence", c: ["120 220 200", "91 124 255", "200 230 255"] },
  { word: "Experience", c: ["226 190 136", "240 150 170", "255 244 230"] },
];

export function LightSlabs() {
  return (
    <div className={styles.slabs}>
      {FIELDS.map((f, i) => (
        <div key={f.word} className={styles.slab} style={v({ "--i": i, "--c1": f.c[0], "--c2": f.c[1], "--c3": f.c[2] })}>
          <span className={styles.f1} />
          <span className={styles.f2} />
          <span className={styles.f3} />
          <span className={styles.slabMeta}>
            <span>N° {String(i + 1).padStart(2, "0")}</span>
          </span>
          <span className={styles.slabWord}>{f.word}</span>
        </div>
      ))}
    </div>
  );
}
