"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { capabilityLayers } from "@/content/capabilities";
import { SystemConsole } from "@/components/hero/SystemConsole";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import styles from "./Platform.module.css";

/** The closing beat: the camera pulls back out to the whole machine. */
const WHOLE = {
  id: "whole",
  index: "06",
  layer: "One machine",
  summary: "Every layer instrumented, connected and improving together — the system, not the parts.",
};
const LAYER_COUNT = capabilityLayers.length;
/** Title card + six layers + the whole machine. */
const SEGMENTS = LAYER_COUNT + 2;

type Shot = { transform: string; orbit: string };
/** The console is laid out at one design width and scaled by the camera,
    like a product render — its layout never reflows with the viewport. */
const DESIGN_WIDTH = 1180;

/**
 * The product story, shot as a film in the hero's world.
 *
 *   title    the chapter card stands over the horizon; the machine is a
 *            point of light on it
 *   arrival  scroll brings the machine in off the horizon — it stands on a
 *            reflective floor, lit from above — while the card lifts away
 *   focus    the camera flies to each of the six layers in turn: push in,
 *            a slight orbit, the rest of the machine falls out of focus
 *   return   the camera pulls back to the whole machine, every module live
 *
 * Arrival is scrubbed by scroll; camera moves are discrete, heavily eased
 * shots between beats (scrubbing a zoom through fine interface shimmers).
 */
export function Platform() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  // -1 = title card; 0–5 = layers; 6 = the whole machine.
  const [beat, setBeat] = useState(-1);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const seg = Math.min(SEGMENTS - 1, Math.max(0, Math.floor(p * SEGMENTS)));
    const next = seg - 1;
    setBeat((cur) => (cur === next ? cur : next));
    // Arrival runs through the first segment and completes a little early,
    // so the machine has landed before the camera starts to move.
    const rise = reduced ? 1 : Math.min(1, (p * SEGMENTS) / 0.85);
    const el = stickyRef.current;
    if (!el) return;
    el.style.setProperty("--rise", rise.toFixed(4));
    el.toggleAttribute("data-landed", rise >= 0.999);
  });

  /** Aim the camera: put a module's centre on the focal point, filled. */
  const frame = useCallback(() => {
    const camera = cameraRef.current;
    const orbit = orbitRef.current;
    const stage = stickyRef.current;
    const anchor = anchorRef.current;
    const root = consoleRef.current;
    if (!camera || !orbit || !stage || !anchor || !root) return;

    const s = stage.getBoundingClientRect();
    const a = anchor.getBoundingClientRect();
    const cw = root.offsetWidth;
    const ch = root.offsetHeight;
    // Fit: the whole machine stands between the header and the horizon.
    const header = parseFloat(getComputedStyle(stage).getPropertyValue("--header-h")) || 72;
    const room = s.height * 0.74 - header - 40;
    const fit = Math.min(s.width * 0.8, DESIGN_WIDTH, room * (cw / ch)) / DESIGN_WIDTH;
    // A wide shot scales about the console's foot, so it stays on the horizon.
    const wide = (f: number, lift = 0): string =>
      `translate3d(${(((1 - f) * cw) / 2).toFixed(1)}px, ${((1 - f) * ch - lift).toFixed(1)}px, 0) scale(${f.toFixed(4)})`;

    let shot: Shot =
      beat >= LAYER_COUNT
        ? { transform: wide(fit * 0.97, s.height * 0.015), orbit: "rotateX(4deg) rotateY(0deg)" }
        : { transform: wide(fit), orbit: "rotateX(9deg) rotateY(0deg)" };
    if (beat >= 0 && beat < LAYER_COUNT) {
      const mod = root.querySelector<HTMLElement>(`[data-module="${capabilityLayers[beat].layer}"]`);
      if (mod) {
        // Module position inside the console, from layout (unaffected by
        // the transforms we're about to apply).
        let mx = 0;
        let my = 0;
        let el: HTMLElement | null = mod;
        while (el && el !== root) {
          mx += el.offsetLeft;
          my += el.offsetTop;
          el = el.offsetParent as HTMLElement | null;
        }
        const mw = mod.offsetWidth;
        const mh = mod.offsetHeight;
        const narrow = s.width < 1100;
        // Leave room on the side the module's annotations extend to.
        const annotRight = mod.querySelector("[data-side='right']") !== null;
        const fx = s.width * (narrow ? 0.5 : annotRight ? 0.4 : 0.62);
        const fy = s.height * 0.44;
        const scale = Math.max(1.15, Math.min(2.3, (s.width * (narrow ? 0.62 : 0.46)) / mw, (s.height * 0.6) / mh));
        const cx = mx + mw / 2;
        const cy = my + mh / 2;
        const tx = fx - (a.left - s.left) - scale * cx;
        const ty = fy - (a.top - s.top) - scale * cy;
        const side = cx / root.offsetWidth - 0.5; // −0.5 (left) … 0.5 (right)
        shot = {
          transform: `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`,
          orbit: `rotateX(3deg) rotateY(${(-side * 9).toFixed(2)}deg)`,
        };
      }
    }
    camera.style.transform = shot.transform;
    orbit.style.transform = shot.orbit;
  }, [beat]);

  useEffect(() => {
    frame();
    const ro = new ResizeObserver(frame);
    if (stickyRef.current) ro.observe(stickyRef.current);
    return () => ro.disconnect();
  }, [frame]);

  const layer = beat >= 0 && beat < LAYER_COUNT ? capabilityLayers[beat] : beat >= LAYER_COUNT ? WHOLE : null;

  return (
    <section className={styles.section} aria-labelledby="platform-title" data-chapter="02|The system">
      <div ref={trackRef} className={styles.track} style={{ "--segments": SEGMENTS } as CSSProperties}>
        <div
          ref={stickyRef}
          className={styles.sticky}
          data-beat={beat}
          data-focus={(beat >= 0 && beat < LAYER_COUNT) || undefined}
          data-reduced={reduced || undefined}
        >
          {/* ---- The set: the hero's horizon, a lit studio floor ---- */}
          <div className={styles.set} aria-hidden="true">
            <span className={styles.sky} />
            <span className={styles.beam} />
            <span className={styles.haze} />
            <span className={styles.floor} />
            <span className={styles.pool} />
            <span className={styles.horizon} />
            <span className={styles.glint} />
            <span className={styles.vignette} />
          </div>

          {/* ---- Chapter card ---- */}
          <div className={`container ${styles.titleCard}`}>
            <Eyebrow index="02" aside="Illustrative interface">
              The system
            </Eyebrow>
            <h2 id="platform-title" className={styles.title}>
              One system.
              <br />
              <em className="t-accent">Six layers, one machine.</em>
            </h2>
            <p className={styles.lead}>
              Brand, experience, acquisition, conversion, automation and intelligence — designed together,
              instrumented together, improved together.
            </p>
          </div>

          {/* ---- The machine ---- */}
          <div className={styles.viewport}>
            <div ref={anchorRef} className={styles.anchor}>
              <div className={styles.arrive}>
                <div ref={cameraRef} className={styles.camera}>
                  <div ref={orbitRef} className={styles.orbit}>
                    <div ref={consoleRef} className={styles.console}>
                      <SystemConsole layer={beat < 0 ? LAYER_COUNT : beat} flat />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <span className={styles.scrim} aria-hidden="true" />

          {/* ---- Title card on the floor + timeline ---- */}
          <div className={`container ${styles.bottom}`}>
            <div className={styles.caption} aria-live="polite">
              {layer && (
                <div className={styles.captionBody} key={layer.id}>
                  <p className={styles.captionIdx}>
                    <span>{layer.index}</span>
                    <i />
                    <span>06</span>
                  </p>
                  <h3 className={styles.captionTitle}>{layer.layer}</h3>
                  <p className={styles.captionText}>{layer.summary}</p>
                </div>
              )}
            </div>
            <ol className={styles.timeline} aria-hidden="true">
              {capabilityLayers.map((l, i) => (
                <li key={l.id} data-on={i === beat || beat >= LAYER_COUNT || undefined} data-passed={i < beat || undefined}>
                  <i />
                  <span>{l.layer}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Phones: the same story as a composed list. */}
      <div className={`container ${styles.list}`}>
        <SectionHeading
          eyebrow="The system"
          index="02"
          title={["One system.", <em key="a" className="t-accent">Six layers, one machine.</em>]}
          lead="Brand, experience, acquisition, conversion, automation and intelligence — designed together, instrumented together, improved together."
        />
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
