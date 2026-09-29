"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import s from "./chart.module.css";

export type ValueKind = "currency" | "count" | "percent" | "ratio";

function formatter(kind: ValueKind, currency: string, compact: boolean) {
  return (v: number) => {
    if (kind === "currency")
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        notation: compact && Math.abs(v) >= 10_000 ? "compact" : "standard",
        minimumFractionDigits: compact && Math.abs(v) >= 10_000 ? 0 : Math.abs(v) < 100 && !Number.isInteger(v) ? 2 : 0,
        maximumFractionDigits: compact && Math.abs(v) >= 10_000 ? 1 : Math.abs(v) < 100 ? 2 : 0,
      }).format(v);
    if (kind === "percent") return new Intl.NumberFormat("en-US", { style: "percent", minimumFractionDigits: 0, maximumFractionDigits: v < 0.1 ? 2 : 1 }).format(v);
    if (kind === "ratio") return `${v.toFixed(2)}×`;
    return new Intl.NumberFormat("en-US", { notation: compact && Math.abs(v) >= 10_000 ? "compact" : "standard", minimumFractionDigits: 0, maximumFractionDigits: compact ? 1 : 0 }).format(v);
  };
}

function niceStep(span: number, ticks: number) {
  const raw = span / ticks;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const n = raw / mag;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * mag;
}

const dayFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const fmtDay = (d: string) => dayFmt.format(new Date(`${d}T12:00:00Z`));

/**
 * The house line chart: one primary series, its comparison period behind it,
 * an optional target. Crosshair snaps to the nearest reading; arrow keys
 * move it too. A data table is always available to assistive tech.
 */
export function TrendChart({
  series,
  kind,
  currency = "USD",
  label,
  target,
  height = 260,
  granularity = "day",
  zeroBased,
  compareLabel = "Previous period",
}: {
  series: { date: string; value: number; previous?: number }[];
  kind: ValueKind;
  currency?: string;
  label: string;
  target?: number;
  height?: number;
  granularity?: "day" | "week";
  zeroBased?: boolean;
  compareLabel?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);
  const [hover, setHover] = useState<number | null>(null);
  const id = useId();
  const full = useMemo(() => formatter(kind, currency, false), [kind, currency]);
  const short = useMemo(() => formatter(kind, currency, true), [kind, currency]);
  const hasPrev = series.some((p) => p.previous !== undefined && p.previous !== 0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(260, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const m = { top: 12, right: 16, bottom: 28, left: 0 };
  const geo = useMemo(() => {
    const vals = series.flatMap((p) => [p.value, ...(hasPrev && p.previous !== undefined ? [p.previous] : [])]);
    if (target !== undefined) vals.push(target);
    let lo = Math.min(...vals);
    let hi = Math.max(...vals);
    if (zeroBased ?? (kind === "currency" || kind === "count")) lo = Math.min(0, lo);
    if (hi === lo) hi = lo + 1;
    const step = niceStep(hi - lo, 4);
    lo = Math.floor(lo / step) * step;
    hi = Math.ceil(hi / step) * step;
    const ticks: number[] = [];
    for (let v = lo; v <= hi + step / 2; v += step) ticks.push(Math.round(v * 1e6) / 1e6);
    const labelW = Math.max(...ticks.map((t) => short(t).length)) * 7 + 10;
    const left = labelW;
    const iw = width - left - m.right;
    const ih = height - m.top - m.bottom;
    const x = (i: number) => left + (series.length === 1 ? iw / 2 : (i / (series.length - 1)) * iw);
    const y = (v: number) => m.top + ih - ((v - lo) / (hi - lo)) * ih;
    const path = (get: (p: (typeof series)[number]) => number | undefined) =>
      series
        .map((p, i) => {
          const v = get(p);
          return v === undefined ? "" : `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`;
        })
        .join("");
    const xt = Math.max(2, Math.min(6, series.length, Math.floor(iw / 88)));
    const xticks = Array.from({ length: xt }, (_, k) => Math.round((k / Math.max(1, xt - 1)) * (series.length - 1)));
    return { ticks, x, y, left, iw, ih, path, xticks };
  }, [series, width, height, target, kind, hasPrev, zeroBased, short, m.top, m.bottom, m.right]);

  const line = geo.path((p) => p.value);
  const area = `${line}L${geo.x(series.length - 1).toFixed(1)},${(m.top + geo.ih).toFixed(1)}L${geo.x(0).toFixed(1)},${(m.top + geo.ih).toFixed(1)}Z`;
  const prev = hasPrev ? geo.path((p) => p.previous) : "";

  const pick = (clientX: number) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    const px = clientX - r.left;
    const i = Math.round(((px - geo.left) / geo.iw) * (series.length - 1));
    setHover(Math.max(0, Math.min(series.length - 1, i)));
  };

  const h = hover !== null ? series[hover] : null;
  const hx = hover !== null ? geo.x(hover) : 0;
  const tipLeft = hover !== null ? (hx > width - 200 ? hx - 186 : hx + 14) : 0;
  const first = series[0];
  const last = series[series.length - 1];
  const summary = `${label}, ${granularity === "week" ? "weekly" : "daily"} from ${fmtDay(first.date)} to ${fmtDay(last.date)}. Latest ${full(last.value)}${
    target !== undefined ? `, target ${full(target)}` : ""
  }. Range ${full(Math.min(...series.map((p) => p.value)))} to ${full(Math.max(...series.map((p) => p.value)))}.`;

  return (
    <figure style={{ margin: 0 }}>
      <ul className={s.legend} role="list" aria-hidden="true">
        <li>
          <span className={s.legendKey} />
          This period
        </li>
        {hasPrev && (
          <li>
            <span className={s.legendKey} data-k="prev" />
            {compareLabel}
          </li>
        )}
        {target !== undefined && (
          <li>
            <span className={s.legendKey} data-k="target" />
            Target {full(target)}
          </li>
        )}
      </ul>
      <div
        ref={wrap}
        className={s.chart}
        tabIndex={0}
        role="img"
        aria-label={summary}
        aria-describedby={`${id}-live`}
        onPointerMove={(e) => pick(e.clientX)}
        onPointerDown={(e) => pick(e.clientX)}
        onPointerLeave={() => setHover(null)}
        onBlur={() => setHover(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            setHover((v) => Math.max(0, Math.min(series.length - 1, (v ?? (e.key === "ArrowRight" ? -1 : series.length)) + (e.key === "ArrowRight" ? 1 : -1))));
          }
          if (e.key === "Home") setHover(0);
          if (e.key === "End") setHover(series.length - 1);
          if (e.key === "Escape") setHover(null);
        }}
      >
        <svg className={s.svg} width={width} height={height} aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={`${id}-a`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--chart-1)" stopOpacity="0.2" />
              <stop offset="1" stopColor="var(--chart-1)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {geo.ticks.map((t) => (
            <g key={t}>
              <line className={t === geo.ticks[0] ? s.axis : s.grid} x1={geo.left} x2={width - m.right} y1={Math.round(geo.y(t)) + 0.5} y2={Math.round(geo.y(t)) + 0.5} />
              <text className={s.tick} x={geo.left - 10} y={geo.y(t)} dy="0.32em" textAnchor="end">
                {short(t)}
              </text>
            </g>
          ))}
          {geo.xticks.map((i, k) => (
            <text key={i} className={s.tick} x={geo.x(i)} y={height - 8} textAnchor={k === 0 ? "start" : k === geo.xticks.length - 1 ? "end" : "middle"}>
              {fmtDay(series[i].date)}
            </text>
          ))}
          {target !== undefined && (
            <g>
              <line className={s.target} x1={geo.left} x2={width - m.right} y1={Math.round(geo.y(target)) + 0.5} y2={Math.round(geo.y(target)) + 0.5} />
            </g>
          )}
          <g className={s.reveal}>
            {prev && <path className={s.prev} d={prev} />}
            <path d={area} fill={`url(#${id}-a)`} />
            <path className={s.line} d={line} />
            {hover === null && <circle className={s.endDot} cx={geo.x(series.length - 1)} cy={geo.y(last.value)} r={4.5} />}
          </g>
          {h && (
            <g>
              <line className={s.cross} x1={Math.round(hx) + 0.5} x2={Math.round(hx) + 0.5} y1={m.top} y2={m.top + geo.ih} />
              {hasPrev && h.previous !== undefined && <circle className={s.dotPrev} cx={hx} cy={geo.y(h.previous)} r={4} />}
              <circle className={s.dot} cx={hx} cy={geo.y(h.value)} r={5} />
            </g>
          )}
        </svg>
        {h && (
          <div className={s.tip} style={{ transform: `translate(${tipLeft}px, ${Math.max(0, Math.min(height - 110, geo.y(h.value) - 50))}px)` }} aria-hidden="true">
            <p className={s.tipDate}>{granularity === "week" ? `Week of ${fmtDay(h.date)}` : fmtDay(h.date)}</p>
            <div className={s.tipRow}>
              <span className={s.tipKey} />
              <span className={s.tipVal}>{full(h.value)}</span>
            </div>
            {hasPrev && h.previous !== undefined && (
              <div className={s.tipRow}>
                <span className={s.tipKey} data-k="prev" />
                <span>
                  {full(h.previous)} <span style={{ opacity: 0.8 }}>previous</span>
                </span>
              </div>
            )}
          </div>
        )}
        <p id={`${id}-live`} className="sr-only" aria-live="polite">
          {h ? `${fmtDay(h.date)}: ${full(h.value)}${hasPrev && h.previous !== undefined ? `, previous ${full(h.previous)}` : ""}` : "Use left and right arrow keys to read values."}
        </p>
      </div>
      <table className="sr-only">
        <caption>{label}</caption>
        <thead>
          <tr>
            <th scope="col">{granularity === "week" ? "Week of" : "Date"}</th>
            <th scope="col">This period</th>
            {hasPrev && <th scope="col">{compareLabel}</th>}
          </tr>
        </thead>
        <tbody>
          {series.map((p) => (
            <tr key={p.date}>
              <th scope="row">{fmtDay(p.date)}</th>
              <td>{full(p.value)}</td>
              {hasPrev && <td>{p.previous !== undefined ? full(p.previous) : "—"}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
