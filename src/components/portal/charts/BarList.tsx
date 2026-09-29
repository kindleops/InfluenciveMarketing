import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import type { CSSProperties, ReactNode } from "react";
import s from "./chart.module.css";

/** Ranked magnitudes in one hue. Every value is labelled at the bar's end. */
export function BarList({
  rows,
  label,
}: {
  rows: { key: string; label: ReactNode; value: number; display: ReactNode; sub?: ReactNode; href?: string; muted?: boolean }[];
  label: string;
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <ul className={s.bars} role="list" aria-label={label}>
      {rows.map((r, i) => (
        <li key={r.key} className={s.bar}>
          <span className={s.barLabel}>{r.href ? <Link href={r.href}>{r.label}</Link> : r.label}</span>
          <span className={s.barTrack} aria-hidden="true">
            <span
              className={s.barFill}
              data-muted={r.muted ? "" : undefined}
              style={{ width: `${Math.max(1.5, (r.value / max) * 100)}%`, animationDelay: `${i * 50}ms` } as CSSProperties}
            />
          </span>
          <span className={s.barValue}>
            {r.display}
            {r.sub && <small>{r.sub}</small>}
          </span>
        </li>
      ))}
    </ul>
  );
}
