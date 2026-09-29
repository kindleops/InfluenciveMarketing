import type { CSSProperties } from "react";

/** A trend line with the comparison period behind it. Decorative: the value
 *  and delta beside it carry the meaning. */
export function Sparkline({
  values,
  previous,
  height = 36,
  className,
}: {
  values: number[];
  previous?: number[];
  height?: number;
  className?: string;
}) {
  if (values.length < 2) return null;
  const all = [...values, ...(previous ?? [])];
  const min = Math.min(...all);
  const max = Math.max(...all);
  const span = max - min || 1;
  const y = (v: number) => height - 3 - ((v - min) / span) * (height - 6);
  const pts = (v: number[]) => v.map((p, i) => `${((i / (v.length - 1)) * 100).toFixed(2)},${y(p).toFixed(2)}`).join(" ");
  const id = `sp-${values.length}-${Math.abs(Math.round(values[0] * 7919 + values[values.length - 1] * 104729)) % 1e7}`;
  return (
    <span className={className} style={{ position: "relative", display: "block", height }} aria-hidden="true">
      <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" width="100%" height={height} focusable="false" style={{ overflow: "visible", display: "block" }}>
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--chart-1)" stopOpacity="0.2" />
            <stop offset="1" stopColor="var(--chart-1)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {previous && previous.length > 1 && (
          <polyline points={pts(previous)} fill="none" stroke="var(--chart-cmp)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        )}
        <polygon points={`0,${height} ${pts(values)} 100,${height}`} fill={`url(#${id})`} />
        <polyline points={pts(values)} fill="none" stroke="var(--chart-1)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span
        style={
          {
            position: "absolute",
            right: -4,
            top: y(values[values.length - 1]) - 4,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--chart-1)",
            boxShadow: "0 0 0 2px var(--p-bg), 0 0 10px var(--chart-1)",
          } as CSSProperties
        }
      />
    </span>
  );
}
