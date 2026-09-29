import { requirePortal } from "@/portal/server";
import { daysUntil, fmtDate } from "@/portal/format";
import { EXPERIMENT_STATUS, OPPORTUNITY_STATUS, OPPORTUNITY_TYPE } from "@/portal/status";
import type { Experiment, Opportunity } from "@/portal/model";
import { Chip, Empty, Meter, PageHead, Panel, Person, PLink, Status } from "@/components/portal/ui";
import s from "@/components/portal/growth/growth.module.css";

export const metadata = { title: "Growth" };

const CONF = { high: 3, medium: 2, exploratory: 1 } as const;
const CONF_LABEL = { high: "High confidence", medium: "Medium confidence", exploratory: "Exploratory" } as const;

export default async function GrowthPage() {
  const { session, source } = await requirePortal();
  const now = Date.now();
  const tz = session.client.timezone;
  const [opps, exps, people] = await Promise.all([source.opportunities(), source.experiments(), source.people()]);
  const open = opps.filter((o) => o.status !== "declined" && o.status !== "shipped");
  const order: Experiment["status"][] = ["running", "planned", "concluded"];
  const sortedExps = [...exps].sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));

  type RM = { id: string; title: string; meta: string; href: string };
  const lanes: Record<Opportunity["horizon"], RM[]> = { now: [], next: [], later: [] };
  for (const o of open) lanes[o.horizon].push({ id: o.id, title: o.title, meta: `${OPPORTUNITY_TYPE[o.type]} · ${OPPORTUNITY_STATUS[o.status].label}`, href: `#${o.id}` });
  const oppTitles = new Set(open.map((o) => o.title.toLowerCase()));
  for (const e of exps) {
    if (oppTitles.has(e.name.toLowerCase())) continue;
    if (e.status === "running") lanes.now.push({ id: e.id, title: e.name, meta: `Experiment · running until ${fmtDate(e.endsAt!, tz, "dayShort")}`, href: `#${e.id}` });
    if (e.status === "planned") lanes.next.push({ id: e.id, title: e.name, meta: `Experiment · ${e.startedAt ? `starts ${fmtDate(e.startedAt, tz, "dayShort")}` : "planned"}`, href: `#${e.id}` });
  }

  if (!opps.length && !exps.length)
    return (
      <>
        <PageHead title="Growth" />
        <Panel>
          <Empty
            center
            icon="growth"
            title="Your growth plan is being written."
            body="After discovery, your strategist lays out the opportunities we see, the experiments we’ll run to test them, and a now / next / later roadmap. It will live here."
          />
        </Panel>
      </>
    );

  return (
    <>
      <PageHead
        title="Growth"
        lead="Where we see the next gains, how we’re testing them, and what comes after. Every opportunity carries its evidence and an owner."
        actions={
          <PLink href="/portal/messages?compose=1&subject=Growth%20roadmap" variant="secondary" size="sm" icon="messages">
            Discuss the roadmap
          </PLink>
        }
      />
      <div className={s.stack}>
        <section aria-labelledby="roadmap-title">
          <div className={s.sectionHead}>
            <h2 className={s.sectionTitle} id="roadmap-title">
              Roadmap
            </h2>
            <span className={s.sectionMeta}>Near term, by horizon</span>
          </div>
          <div className={s.roadmap}>
            {(["now", "next", "later"] as const).map((h) => (
              <div key={h} className={s.horizon} data-h={h}>
                <div className={s.horizonHead}>
                  <h3>{h === "now" ? "Now" : h === "next" ? "Next" : "Later"}</h3>
                  <span>{h === "now" ? "This month" : h === "next" ? "Following month" : "This quarter and beyond"}</span>
                </div>
                {lanes[h].length ? (
                  lanes[h].map((r) => (
                    <a key={r.id} href={r.href} className={s.rm}>
                      <strong>{r.title}</strong>
                      <span>{r.meta}</span>
                    </a>
                  ))
                ) : (
                  <p style={{ fontSize: "var(--p-fs-label)", color: "var(--text-faint)", padding: "0.5rem 0.25rem" }}>Nothing planned yet</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="opps-title">
          <div className={s.sectionHead}>
            <h2 className={s.sectionTitle} id="opps-title">
              Opportunities
            </h2>
            <span className={s.sectionMeta}>{open.length} open</span>
          </div>
          <ul className={s.opps} role="list">
            {open.map((o) => {
              const st = OPPORTUNITY_STATUS[o.status];
              return (
                <li key={o.id} id={o.id} className={s.opp}>
                  <div className={s.oppTop}>
                    <Chip>{OPPORTUNITY_TYPE[o.type]}</Chip>
                    <Status tone={st.tone} label={st.label} />
                  </div>
                  <div>
                    <h3 className={s.oppTitle}>{o.title}</h3>
                    <p className={s.oppObs}>{o.observation}</p>
                  </div>
                  <div style={{ display: "grid", gap: "0.9rem", alignContent: "start" }}>
                    <p className={s.evidence}>
                      <strong>{o.evidence.value}</strong>
                      <span>{o.evidence.label}</span>
                    </p>
                    <dl className={s.facts}>
                      <dt>We’d do</dt>
                      <dd>{o.action}</dd>
                      <dt>Expected</dt>
                      <dd>{o.expectedImpact}</dd>
                      <dt>Confidence</dt>
                      <dd style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span className={s.confidence} aria-hidden="true">
                          {[1, 2, 3].map((n) => (
                            <i key={n} data-on={n <= CONF[o.confidence] ? "" : undefined} />
                          ))}
                        </span>
                        {CONF_LABEL[o.confidence]}
                      </dd>
                    </dl>
                  </div>
                  <div className={s.oppFoot}>
                    <Person person={people[o.ownerId]} size={26} />
                    <PLink href={`/portal/messages?compose=1&ref=opportunity:${o.id}&subject=${encodeURIComponent(o.title)}`} variant="ghost" size="sm">
                      Discuss
                    </PLink>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="exps-title">
          <div className={s.sectionHead}>
            <h2 className={s.sectionTitle} id="exps-title">
              Experiments
            </h2>
            <span className={s.sectionMeta}>
              {exps.filter((e) => e.status === "running").length} running · {exps.filter((e) => e.status === "concluded").length} concluded
            </span>
          </div>
          <Panel as="div">
            <ul className={s.exps} role="list">
              {sortedExps.map((e) => {
                const st = EXPERIMENT_STATUS[e.status];
                const total = e.startedAt && e.endsAt ? Math.max(1, daysUntil(e.endsAt, now, tz) - daysUntil(e.startedAt, now, tz)) : 0;
                const elapsed = e.startedAt ? Math.min(total, Math.max(0, -daysUntil(e.startedAt, now, tz))) : 0;
                return (
                  <li key={e.id} id={e.id} className={s.exp}>
                    <div>
                      <p className={s.expName}>
                        {e.name}
                        <Status tone={st.tone} label={st.label} />
                      </p>
                      <p className={s.expHyp}>{e.hypothesis}</p>
                      <dl className={s.facts} style={{ marginTop: "0.8rem" }}>
                        <dt>Measures</dt>
                        <dd>{e.metric}</dd>
                        <dt>Expected</dt>
                        <dd>{e.expectedImpact}</dd>
                        <dt>Owner</dt>
                        <dd>{people[e.ownerId]?.name}</dd>
                      </dl>
                    </div>
                    <div className={s.expSide}>
                      {e.status === "running" && total > 0 && (
                        <div className={s.progress}>
                          <div className={s.progressRow}>
                            <span>
                              Day {elapsed} of {total}
                            </span>
                            <span>Reads out {fmtDate(e.endsAt!, tz, "dayShort")}</span>
                          </div>
                          <Meter value={elapsed} max={total} tone="live" label={`${e.name}: day ${elapsed} of ${total}`} />
                          <span>Started {fmtDate(e.startedAt!, tz, "dayShort")}. We don’t read results early — partial data misleads.</span>
                        </div>
                      )}
                      {e.status === "planned" && (
                        <p className={s.progress}>{e.startedAt ? `Starts ${fmtDate(e.startedAt, tz, "day")}` : "Start date set once approved"}</p>
                      )}
                      {e.result && (
                        <div className={s.result} data-outcome={e.result.outcome}>
                          <strong>
                            {e.result.outcome === "win" ? "Won" : e.result.outcome === "loss" ? "Lost" : "Inconclusive"}
                            {e.result.lift ? ` · ${e.result.lift}` : ""}
                          </strong>
                          <span>{e.result.summary}</span>
                          {e.startedAt && e.endsAt && (
                            <span style={{ color: "var(--text-muted)", fontSize: "var(--p-fs-label)" }}>
                              {fmtDate(e.startedAt, tz, "dayShort")} – {fmtDate(e.endsAt, tz, "dayShort")}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </section>
      </div>
    </>
  );
}
