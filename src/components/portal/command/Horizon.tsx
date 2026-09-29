import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import type { CSSProperties } from "react";
import { daysUntil, fmtDate, until } from "@/portal/format";
import { Panel, PanelHead } from "../ui";
import s from "./command.module.css";

export interface HorizonItem {
  at: string;
  title: string;
  kind: "you" | "studio" | "launch";
  href: string;
}

const KIND_LABEL = { you: "Needs you", studio: "Studio milestone", launch: "Launch" } as const;

/** The next fourteen days, plotted on the lit horizon. */
export function Horizon({ items, now, tz }: { items: HorizonItem[]; now: number; tz: string }) {
  const days = Array.from({ length: 14 }, (_, i) => {
    const t = now + i * 86_400_000;
    const iso = new Date(t).toISOString();
    return {
      i,
      iso,
      dow: fmtDate(iso, tz, "weekday").split(",")[0],
      date: Number(new Intl.DateTimeFormat("en-US", { timeZone: tz, day: "numeric" }).format(t)),
      weekend: ["Sat", "Sun"].includes(new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short" }).format(t)),
      items: items.filter((it) => daysUntil(it.at, now, tz) === i),
    };
  });
  const upcoming = [...items].sort((a, b) => a.at.localeCompare(b.at)).slice(0, 6);
  const count = items.length;

  return (
    <Panel className={s.horizon} aria-labelledby="horizon-title">
      <div className={s.horizonHead}>
        <PanelHead
          title="Next 14 days"
          id="horizon-title"
          meta={count ? `${count} milestone${count === 1 ? "" : "s"}` : undefined}
        />
        <ul className={s.legend} role="list" aria-label="Legend">
          {(["you", "studio", "launch"] as const).map((k) => (
            <li key={k}>
              <span className={s.mark} data-kind={k} style={{ width: 7, height: 7 } as CSSProperties} aria-hidden="true" />
              {KIND_LABEL[k]}
            </li>
          ))}
        </ul>
      </div>
      <ol className={s.days} role="list" aria-label="Milestones by day" tabIndex={-1}>
        {days.map((d) => (
          <li key={d.i} className={s.day} data-today={d.i === 0 ? "" : undefined} data-weekend={d.weekend ? "" : undefined}>
            {d.items.length ? (
              <button type="button" className={s.dayBtn} aria-label={`${fmtDate(d.iso, tz, "full")}: ${d.items.map((x) => `${x.title} (${KIND_LABEL[x.kind]})`).join("; ")}`}>
                {d.items.slice(0, 6).map((x, k) => (
                  <span key={k} className={s.mark} data-kind={x.kind} aria-hidden="true" />
                ))}
              </button>
            ) : (
              <span />
            )}
            <span className={s.dayLabel} aria-hidden="true">
              <b>{d.i === 0 ? "Today" : d.dow}</b>
              {d.date}
            </span>
            {d.items.length > 0 && (
              <ul className={s.dayTip} role="list" aria-hidden="true">
                {d.items.map((x, k) => (
                  <li key={k}>
                    <span className={s.mark} data-kind={x.kind} />
                    {x.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
      {upcoming.length > 0 && (
        <ul className={s.upcoming} role="list" aria-label="Coming up">
          {upcoming.map((u, i) => (
            <li key={i}>
              <Link href={u.href}>
                <span className={s.mark} data-kind={u.kind} aria-hidden="true" />
                <span className={s.upWhen}>
                  {until(u.at, now, tz)} · {KIND_LABEL[u.kind]}
                </span>
                <span className={s.upTitle}>{u.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
