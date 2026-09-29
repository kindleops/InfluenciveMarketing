import type { CSSProperties } from "react";
import { MARKET_GEO, US_DOTS, US_VIEWBOX } from "@/content/geo";
import { MapOverlay, type MapMarket } from "./MapOverlay";
import s from "./markets.module.css";

/** Links between markets: each to its two nearest neighbours — one network. */
function network(slugs: string[]) {
  const pts = slugs.map((k) => ({ k, ...MARKET_GEO[k] })).filter((p) => p.x !== undefined);
  const seen = new Set<string>();
  const arcs: { d: string; len: number }[] = [];
  for (const a of pts) {
    const near = pts.filter((b) => b.k !== a.k).sort((b, c) => Math.hypot(b.x - a.x, b.y - a.y) - Math.hypot(c.x - a.x, c.y - a.y)).slice(0, 2);
    for (const b of near) {
      const key = [a.k, b.k].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2 - Math.hypot(b.x - a.x, b.y - a.y) * 0.22;
      arcs.push({ d: `M${a.x} ${a.y}Q${mx.toFixed(1)} ${my.toFixed(1)} ${b.x} ${b.y}`, len: Math.hypot(b.x - a.x, b.y - a.y) * 1.1 });
    }
  }
  return arcs;
}

/**
 * The markets hub's signature: the country as a field of points, each market
 * a light source, the markets joined into one network. The dot field and
 * light are drawn once on the server; the interactive layer (hover cards,
 * region filter, an idle tour) is a small client overlay.
 */
export function MarketMap({ markets }: { markets: MapMarket[] }) {
  const pts = markets.map((m) => ({ ...m, ...MARKET_GEO[m.slug] })).filter((m) => m.x !== undefined);
  const arcs = network(pts.map((p) => p.slug));
  return (
    <div className={s.map}>
      <svg className={s.svg} viewBox={`0 0 ${US_VIEWBOX.w} ${US_VIEWBOX.h}`} aria-hidden="true">
        <defs>
          <radialGradient id="mm-glow">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="mm-lit" maskUnits="userSpaceOnUse" x="0" y="0" width={US_VIEWBOX.w} height={US_VIEWBOX.h}>
            {pts.map((p) => (
              <circle key={p.slug} cx={p.x} cy={p.y} r="62" fill="url(#mm-glow)" />
            ))}
          </mask>
        </defs>
        <path d={US_DOTS} className={s.dots} />
        <path d={US_DOTS} className={s.lit} mask="url(#mm-lit)" />
        <g className={s.arcs}>
          {arcs.map((a, i) => (
            <g key={a.d} style={{ "--i": i, "--len": a.len } as CSSProperties}>
              <path d={a.d} className={s.arcBase} />
              <path d={a.d} className={s.arcFlow} />
            </g>
          ))}
        </g>
        {pts.map((p, i) => (
          <g key={p.slug} className={s.node} style={{ "--i": i } as CSSProperties} data-area={p.area}>
            <circle cx={p.x} cy={p.y} r="11" className={s.ring} />
            <circle cx={p.x} cy={p.y} r="3.4" className={s.core} />
          </g>
        ))}
      </svg>
      <MapOverlay markets={pts.map(({ slug, city, region, area, sectors, href, x, y, tz }) => ({ slug, city, region, area, sectors, href, x: x / US_VIEWBOX.w, y: y / US_VIEWBOX.h, tz }))} />
    </div>
  );
}
