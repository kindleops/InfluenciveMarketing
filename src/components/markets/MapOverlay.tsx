"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { LocalTime } from "./LocalTime";
import s from "./markets.module.css";

export type MapMarket = { slug: string; city: string; region: string; area: string; sectors: string[]; href: string };
type Placed = MapMarket & { x: number; y: number; tz: string };

const AREAS = ["All", "Northeast", "South", "Midwest", "West"] as const;

/**
 * The map's interactive layer: a focusable point per market, a liquid-glass
 * card for the one in focus, a region filter, and — while nobody is
 * interacting — a slow tour from market to market.
 */
export function MapOverlay({ markets }: { markets: Placed[] }) {
  const [area, setArea] = useState<(typeof AREAS)[number]>("All");
  const [active, setActive] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const reduce = useReducedMotion();
  const visible = useMemo(() => markets.filter((m) => area === "All" || m.area === area), [markets, area]);
  const root = useRef<HTMLDivElement>(null);

  // The idle tour: step through the visible markets until someone takes over.
  useEffect(() => {
    if (touched || reduce || !visible.length) return;
    let i = 0;
    setActive(visible[0].slug);
    const id = setInterval(() => {
      i = (i + 1) % visible.length;
      setActive(visible[i].slug);
    }, 2600);
    return () => clearInterval(id);
  }, [visible, touched, reduce]);

  const current = markets.find((m) => m.slug === active);

  return (
    <div ref={root} className={s.overlay} data-area={area} onPointerEnter={() => setTouched(true)}>
      <div className={`glass ${s.filter}`} data-level="2" data-liquid="deep" role="group" aria-label="Filter markets by region">
        {AREAS.map((a) => (
          <button
            key={a}
            type="button"
            aria-pressed={area === a}
            onClick={() => {
              setArea(a);
              setTouched(false);
            }}
          >
            {area === a && <motion.span layoutId="mm-lens" className={s.lens} transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <span>{a}</span>
          </button>
        ))}
      </div>

      {markets.map((m) => {
        const on = area === "All" || m.area === area;
        return (
          <Link
            key={m.slug}
            href={m.href}
            className={s.pin}
            style={{ left: `${m.x * 100}%`, top: `${m.y * 100}%` } as CSSProperties}
            data-on={on || undefined}
            data-active={active === m.slug || undefined}
            aria-label={`${m.city}, ${m.region}`}
            onPointerEnter={() => {
              setTouched(true);
              setActive(m.slug);
            }}
            onFocus={() => {
              setTouched(true);
              setActive(m.slug);
            }}
            tabIndex={on ? undefined : -1}
          >
            <span className={s.pinLabel}>{m.city}</span>
          </Link>
        );
      })}

      {current && (
        <div
          key={current.slug}
          className={`glass ${s.card}`}
          data-level="3"
          data-liquid="deep"
          data-side={current.x > 0.62 ? "left" : "right"}
          style={{ left: `${current.x * 100}%`, top: `${current.y * 100}%` } as CSSProperties}
          aria-hidden="true"
        >
          <span className={s.cardMeta}>
            {current.region} · {current.area}
          </span>
          <b className={s.cardCity}>{current.city}</b>
          <span className={s.cardTime}>
            <LocalTime tz={current.tz} />
          </span>
          <span className={s.cardChips}>
            {current.sectors.slice(0, 3).map((x) => (
              <i key={x}>{x}</i>
            ))}
          </span>
          <span className={s.cardGo}>Open the market →</span>
        </div>
      )}
    </div>
  );
}
