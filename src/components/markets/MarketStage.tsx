import type { CSSProperties } from "react";
import { MARKET_GEO } from "@/content/geo";
import { MARKET_REGIONS } from "@/content/geo-regions";
import { LocalTime } from "./LocalTime";
import s from "./markets.module.css";

const fmt = (v: number, pos: string, neg: string) => `${Math.abs(v).toFixed(2)}° ${v >= 0 ? pos : neg}`;

/** A market's region as a field of points, the metro lit and pulsing. */
export function MarketBackdrop({ slug, neighbors }: { slug: string; neighbors: { slug: string; city: string }[] }) {
  const g = MARKET_GEO[slug];
  const r = MARKET_REGIONS[slug];
  if (!g || !r) return null;
  const [vx, vy, W, H] = r.view;
  const near = neighbors
    .map((n) => ({ ...n, ...MARKET_GEO[n.slug] }))
    .filter((n) => n.x !== undefined && n.x > vx + 8 && n.x < vx + W - 30 && n.y > vy + 8 && n.y < vy + H - 8);
  return (
    <svg className={s.backdropSvg} viewBox={`${vx} ${vy} ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`ms-glow-${slug}`}>
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`ms-lit-${slug}`} maskUnits="userSpaceOnUse" x={vx} y={vy} width={W} height={H}>
          <circle cx={g.x} cy={g.y} r="70" fill={`url(#ms-glow-${slug})`} />
        </mask>
      </defs>
      <g className={s.cross}>
        <line x1={vx} x2={vx + W} y1={g.y} y2={g.y} />
        <line y1={vy} y2={vy + H} x1={g.x} x2={g.x} />
        <text x={g.x + 2.5} y={g.y - 2.5}>
          {fmt(g.lat, "N", "S")} · {fmt(g.lon, "E", "W")}
        </text>
      </g>
      <path d={r.d} className={s.stageDots} />
      <path d={r.d} className={s.stageLit} mask={`url(#ms-lit-${slug})`} />
      {near.map((n) => (
        <g key={n.slug} className={s.neighbor}>
          <path d={`M${g.x} ${g.y}Q${(g.x + n.x) / 2} ${Math.min(g.y, n.y) - 14} ${n.x} ${n.y}`} />
          <circle cx={n.x} cy={n.y} r="1.3" />
          <text x={n.x + 3} y={n.y + 1.4}>
            {n.city}
          </text>
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={g.x} cy={g.y} r="16" className={s.pulse} style={{ "--i": i } as CSSProperties} />
      ))}
      <circle cx={g.x} cy={g.y} r="2.2" className={s.stageCore} />
    </svg>
  );
}

/** The market's instrument: live local time, where it is, the area it covers. */
export function MarketReadout({ slug, city, timeZone, area, presence }: { slug: string; city: string; timeZone: string; area: string[]; presence: "office" | "team" | "remote" }) {
  const g = MARKET_GEO[slug];
  if (!g) return null;
  return (
    <div className={s.readoutStack}>
      <div className={`glass ${s.stageChip}`} data-level="2" data-liquid="">
        <span>Working hours</span>
        <b>{presence === "office" ? "From our office here" : presence === "team" ? "With our team here" : `Aligned to ${timeZone.split(" (")[0]}`}</b>
      </div>
      <div className={`glass ${s.readout}`} data-level="3" data-liquid="deep">
        <span className={s.readoutLabel}>
          <i className={s.live} /> Local time in {city.split(/[–,]/)[0]}
        </span>
        <LocalTime tz={g.tz} className={s.clock} />
        <span className={s.coords}>
          {fmt(g.lat, "N", "S")} · {fmt(g.lon, "E", "W")}
        </span>
        <ul className={s.readoutArea} role="list" aria-label="Areas covered">
          {area.slice(0, 6).map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
