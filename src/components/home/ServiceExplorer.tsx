"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Surface";
import { ServiceArt } from "./ServiceArt";
import styles from "./ServiceExplorer.module.css";

const DWELL = 5600;

/* Light role per discipline — colour marks what kind of work is on stage. */
const TINT: Record<string, string> = {
  brand: "#e2c896",
  web: "#b09cff",
  product: "#b09cff",
  growth: "#78d6c8",
  organic: "#78d6c8",
  intelligence: "#829eff",
  automation: "#829eff",
  transformation: "#e2c896",
};

/**
 * Services — a guided tour of eight disciplines. It advances on its own
 * while in view (a progress trace shows the dwell), and hands control to the
 * visitor the moment they hover, click or use the keyboard.
 *
 * Changing discipline reads as the system changing mode: a glass lens slides
 * to the new row and sends a signal across to the stage; the outgoing
 * illustration recedes out of focus while the new one resolves into it.
 */
export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const last = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const running = auto && visible && !reduced;
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % services.length), DWELL);
    return () => clearTimeout(t);
  }, [running, active]);

  // Keep the outgoing illustration long enough to recede.
  useEffect(() => {
    if (last.current === active) return;
    setPrev(last.current);
    last.current = active;
    const t = setTimeout(() => setPrev(null), 760);
    return () => clearTimeout(t);
  }, [active]);

  // The lens follows the active row, including while rows open and close.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const place = () => {
      const row = tabs.current[active];
      if (!row) return;
      list.style.setProperty("--lens-y", `${row.offsetTop}px`);
      list.style.setProperty("--lens-h", `${row.offsetHeight}px`);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(list);
    return () => ro.disconnect();
  }, [active]);

  const choose = (i: number) => {
    setAuto(false);
    setActive(i);
  };
  const onKey = (e: KeyboardEvent, i: number) => {
    const last = services.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (i === last ? 0 : i + 1) :
      e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) :
      e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    choose(next);
    tabs.current[next]?.focus();
  };

  const s = services[active];

  return (
    <Section tone="raised" labelledBy="services-title" chapter="05|Services">
      <SectionHeading
        id="services-title"
        eyebrow="Services"
        index="05"
        aside="Eight disciplines"
        layout="split"
        title={["Eight disciplines.", <em key="a" className="t-accent">One standard.</em>]}
        lead="Engage one discipline or the whole system. Either way, every piece is designed to connect to the rest."
      />

      <div
        ref={ref}
        className={styles.explorer}
        style={{ "--dwell": `${DWELL}ms`, "--svc-tint": TINT[s.id] ?? "#829eff" } as CSSProperties}
        data-running={running || undefined}
      >
        <div ref={listRef} className={styles.list} role="tablist" aria-orientation="vertical" aria-label="Disciplines">
          <span className={styles.lens} aria-hidden="true">
            <span className={styles.signal} />
          </span>
          {services.map((svc, i) => {
            const on = i === active;
            return (
              <button
                key={svc.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`${uid}-t${i}`}
                aria-selected={on}
                aria-controls={`${uid}-panel`}
                tabIndex={on ? 0 : -1}
                className={styles.row}
                data-on={on || undefined}
                data-prev={i === prev || undefined}
                onClick={() => choose(i)}
                onKeyDown={(e) => onKey(e, i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && choose(i)}
              >
                <span className={styles.idx}>{svc.index}</span>
                <span className={styles.name}>{svc.name}</span>
                <span className={styles.statement}>
                  <span>{svc.statement}</span>
                </span>
                {on && running && <span className={styles.trace} key={`${active}-trace`} aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        <div className={styles.stageWrap} role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-t${active}`}>
          <div className={styles.stage} data-pointer-light="">
            <span className={styles.stageTint} aria-hidden="true" />
            <span className={styles.stageLight} aria-hidden="true" />
            {prev !== null && prev !== active && (
              <div className={`${styles.artWrap} ${styles.artOut}`} key={`out-${services[prev].id}`}>
                <ServiceArt id={services[prev].id} />
              </div>
            )}
            <div className={`${styles.artWrap} ${styles.artIn}`} key={s.id}>
              <ServiceArt id={s.id} />
            </div>
            <div className={styles.stageTop} aria-hidden="true">
              <span>{s.index} / 08</span>
              <span>{s.engagement}</span>
            </div>
          </div>
          <div className={styles.foot} key={`${s.id}-foot`}>
            <p className={styles.summary}>{s.summary}</p>
            <p className={styles.offerings}>
              {s.offerings.map((o) => (
                <span key={o}>{o}</span>
              ))}
            </p>
            <Link href={`/services#${s.id}`} className={styles.more}>
              Explore {s.name}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h11.2M7.6 2.2 12.4 7l-4.8 4.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
