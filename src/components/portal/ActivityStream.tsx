import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import type { ActivityEvent } from "@/portal/model";
import type { Person } from "@/portal/source";
import { daysUntil, fmtDate } from "@/portal/format";
import { hrefFor } from "@/portal/nav";
import { Icon, type IconName } from "./ui/Icon";
import s from "./activity.module.css";

const ICON: Record<ActivityEvent["kind"], IconName> = {
  published: "arrowUpRight",
  approved: "check",
  changes: "refresh",
  launched: "bolt",
  budget: "billing",
  improved: "up",
  connected: "link",
  delivered: "deliverables",
  scheduled: "calendar",
  message: "messages",
  experiment: "target",
};

/** The system timeline: what moved, who moved it, grouped by day. */
export function ActivityStream({
  events,
  people,
  now,
  tz,
}: {
  events: ActivityEvent[];
  people: Record<string, Person>;
  now: number;
  tz: string;
}) {
  const groups = new Map<string, ActivityEvent[]>();
  for (const e of [...events].sort((a, b) => b.at.localeCompare(a.at))) {
    const d = -daysUntil(e.at, now, tz);
    const label = d === 0 ? "Today" : d === 1 ? "Yesterday" : fmtDate(e.at, tz, "weekday");
    groups.set(label, [...(groups.get(label) ?? []), e]);
  }
  return (
    <ol className={s.stream} role="list">
      {[...groups].map(([label, list]) => (
        <li key={label}>
          <p className={s.dayHead}>{label}</p>
          <ol className={s.events} role="list">
            {list.map((e) => {
              const who = people[e.actorId];
              return (
                <li key={e.id} className={s.event}>
                  <span className={s.node} data-kind={e.kind} aria-hidden="true">
                    <Icon name={ICON[e.kind]} size={14} />
                  </span>
                  <div className={s.body}>
                    <p className={s.title}>{e.ref ? <Link href={hrefFor(e.ref)}>{e.title}</Link> : e.title}</p>
                    {e.detail && <p className={s.detail}>{e.detail}</p>}
                    <p className={s.meta}>
                      {who ? `${who.name}${who.side === "studio" ? ` · ${who.title}` : ""}` : "System"} · {fmtDate(e.at, tz, "time")}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </li>
      ))}
    </ol>
  );
}
