import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import { brand } from "@/config/brand";
import { requirePortal } from "@/portal/server";
import { can } from "@/portal/access";
import { daysUntil, delta, due, fmtDate, formatMetric, greeting, METRICS, metricLabel, until } from "@/portal/format";
import { hrefFor } from "@/portal/nav";
import { resolveRange } from "@/portal/range";
import { WORK_STATE } from "@/portal/status";
import { ActivityStream } from "@/components/portal/ActivityStream";
import { Sparkline } from "@/components/portal/charts/Sparkline";
import { Horizon, type HorizonItem } from "@/components/portal/command/Horizon";
import { InsightCard } from "@/components/portal/command/Insights";
import { Avatar, Delta, Empty, Icon, Panel, PanelHead, PLink, Segments, Status, TextLink } from "@/components/portal/ui";
import s from "@/components/portal/command/command.module.css";

export const metadata = { title: "Command" };

export default async function CommandPage() {
  const { session, source } = await requirePortal();
  const now = Date.now();
  const tz = session.client.timezone;
  const { client, user } = session;
  const range = resolveRange({ range: "30d" }, tz, now);

  const [people, approvals, tasks, workstreams, campaigns, experiments, activity, insights, report, onboarding, team, invoices] = await Promise.all([
    source.people(),
    source.approvals(),
    source.tasks(),
    source.workstreams(),
    source.campaigns(),
    source.experiments(),
    source.activity(),
    source.insights(),
    source.analytics(range),
    source.onboarding(),
    source.team(),
    source.billing(),
  ]);

  const pending = approvals.filter((a) => a.state === "pending");
  const attention = [
    ...pending.map((a) => ({
      id: a.id,
      title: a.title,
      reason: a.why,
      dueAt: a.dueAt,
      ownerId: a.preparedById,
      high: a.priority === "high",
      href: hrefFor({ kind: "approval", id: a.id }),
      action: a.category === "budget" ? "Decide" : "Review",
    })),
    ...tasks.map((t) => ({
      id: t.id,
      title: t.title,
      reason: t.reason,
      dueAt: t.dueAt,
      ownerId: t.ownerId,
      high: false,
      href: t.ref ? hrefFor(t.ref) : "/portal/integrations",
      action: t.action,
    })),
  ].sort((a, b) => Number(b.high) - Number(a.high) || a.dueAt.localeCompare(b.dueAt));

  const moving = workstreams.filter((w) => w.state !== "next" && w.state !== "delivered");
  const live = campaigns.filter((c) => c.status === "live" || c.status === "optimizing");
  const running = experiments.filter((e) => e.status === "running");
  const setupOpen = onboarding.filter((o) => o.status !== "done");
  const lead = team.find((t) => t.lead) ?? team[0];
  const strategist = team.find((t) => t.title === "Growth Strategist");
  const firstName = user.name.split(" ")[0];

  // What happens next, from real dates only.
  const horizon: HorizonItem[] = [];
  const within = (iso?: string) => !!iso && daysUntil(iso, now, tz) >= 0 && daysUntil(iso, now, tz) < 14;
  for (const a of pending) if (within(a.dueAt)) horizon.push({ at: a.dueAt, title: a.title, kind: "you", href: hrefFor({ kind: "approval", id: a.id }) });
  for (const t of tasks) if (within(t.dueAt)) horizon.push({ at: t.dueAt, title: t.title, kind: "you", href: t.ref ? hrefFor(t.ref) : "/portal/integrations" });
  for (const c of campaigns) {
    if (within(c.start)) horizon.push({ at: c.start, title: `${c.name} starts`, kind: "launch", href: hrefFor({ kind: "campaign", id: c.id }) });
    if (c.end && within(c.end) && c.status !== "complete") horizon.push({ at: c.end, title: `${c.name} ends`, kind: "studio", href: hrefFor({ kind: "campaign", id: c.id }) });
  }
  for (const w of workstreams)
    if (w.next?.at && within(w.next.at) && !horizon.some((h) => daysUntil(h.at, now, tz) === daysUntil(w.next!.at!, now, tz) && h.kind === "you"))
      horizon.push({ at: w.next.at, title: `${w.name}: ${w.next.label}`, kind: "studio", href: w.ref ? hrefFor(w.ref) : "/portal" });
  for (const inv of invoices?.invoices ?? [])
    if (inv.status === "due" && within(inv.dueAt) && can(user.role, "billing")) horizon.push({ at: inv.dueAt, title: `Invoice ${inv.number} due`, kind: "you", href: "/portal/billing" });

  const statement =
    setupOpen.length > 0 && !report ? (
      <>
        Your command center <em>is being prepared.</em>
      </>
    ) : moving.length ? (
      <>
        Your growth system <em>is active.</em>
      </>
    ) : (
      <>
        Everything <em>is in place.</em>
      </>
    );

  const tiles = report ? report.outcomes.slice(0, 4) : [];
  const openInsights = insights.filter((i) => i.status !== "dismissed" && i.status !== "done").slice(0, 3);

  return (
    <div className={s.page}>
      {/* A — Current state */}
      <section className={s.hero} aria-labelledby="page-title">
        <div>
          <p className={s.greeting}>
            {greeting(now, tz)}, {firstName} · {fmtDate(new Date(now).toISOString(), tz, "full")}
          </p>
          <h1 className={s.statement} id="page-title">
            {statement}
          </h1>
          <ul className={s.signals} role="list">
            <li>
              <Status tone={moving.length ? "progress" : "quiet"} label="" />
              <span>
                <strong>{moving.length}</strong> workstream{moving.length === 1 ? "" : "s"} moving
              </span>
            </li>
            <li>
              <Status tone={pending.length ? "attention" : "quiet"} label="" />
              <span>
                <strong>{pending.length}</strong> decision{pending.length === 1 ? "" : "s"} waiting on you
              </span>
            </li>
            {live.length > 0 && (
              <li>
                <Status tone="live" label="" />
                <span>
                  <strong>{live.length}</strong> campaign{live.length === 1 ? "" : "s"} live
                </span>
              </li>
            )}
            {running.length > 0 && (
              <li>
                <Status tone="positive" label="" />
                <span>
                  <strong>{running.length}</strong> experiment{running.length === 1 ? "" : "s"} running
                </span>
              </li>
            )}
          </ul>
        </div>
        {lead && (
          <div className={s.presence}>
            <span className={s.presenceLabel}>Operated by {brand.name}</span>
            <div className={s.presencePeople}>
              <span className={s.presenceText}>
                <strong>{lead.name}</strong>
                {lead.title} · engagement lead
              </span>
              <Avatar id={lead.id} name={lead.name} size={40} />
              {strategist && <Avatar id={strategist.id} name={strategist.name} size={40} />}
            </div>
            <PLink href="/portal/messages?compose=1" size="sm" variant="secondary" icon="messages">
              Message the team
            </PLink>
          </div>
        )}
        <span className={s.heroLine} aria-hidden="true" />
      </section>

      {setupOpen.length > 0 && (
        <Panel glass aria-labelledby="setup-title">
          <PanelHead
            title="Finish setting up"
            id="setup-title"
            meta={`${onboarding.length - setupOpen.length} of ${onboarding.length} done`}
            action={
              <PLink href="/portal/welcome" variant="primary" size="sm">
                Continue setup
              </PLink>
            }
          />
          <div style={{ padding: "0 1.25rem 1.25rem" }}>
            <Segments done={onboarding.length - setupOpen.length} total={onboarding.length} tone="attention" label="Setup progress" />
          </div>
        </Panel>
      )}

      {/* What happens next */}
      <Horizon items={horizon} now={now} tz={tz} />

      <div className={s.band}>
        {/* B — Needs your attention */}
        <Panel glass className={s.attention} aria-labelledby="attention-title">
          <PanelHead
            title="Needs your attention"
            id="attention-title"
            count={attention.length}
            countTone={attention.length ? "attention" : undefined}
            action={pending.length > 0 ? <TextLink href="/portal/approvals">All approvals</TextLink> : undefined}
          />
          {attention.length === 0 ? (
            <Empty title="No approvals need your attention." body="Everything is moving. We’ll let you know the moment something needs a decision." />
          ) : (
            <ul className={s.attnList} role="list">
              {attention.map((a, i) => {
                const d = due(a.dueAt, now, tz);
                const owner = people[a.ownerId];
                return (
                  <li key={a.id} className={s.attnItem}>
                    <span className={s.prio} data-high={a.high ? "" : undefined} aria-hidden="true" />
                    <div className={s.attnMain}>
                      <p className={s.attnTitle}>
                        <Link href={a.href}>
                          {a.title}
                          {a.high && <span className="sr-only"> (high priority)</span>}
                        </Link>
                      </p>
                      <p className={s.attnReason}>{a.reason}</p>
                      <p className={s.attnMeta}>
                        <span className={s.dueChip} data-urgency={d.urgency}>
                          <Icon name="clock" size={13} />
                          {d.label}
                        </span>
                        {owner && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                            <Avatar id={owner.id} name={owner.name} size={18} />
                            {owner.name} · {owner.title}
                          </span>
                        )}
                      </p>
                    </div>
                    <PLink href={a.href} variant={i === 0 ? "primary" : "secondary"} size="sm" className={s.attnAction} tabIndex={-1} aria-hidden="true">
                      {a.action}
                    </PLink>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        {/* C — Active work */}
        <Panel aria-labelledby="work-title">
          <PanelHead title="Active work" id="work-title" meta={workstreams.length ? `${workstreams.length} workstreams` : undefined} />
          {workstreams.length === 0 ? (
            <Empty icon="layers" title="No workstreams yet." body="Your plan’s workstreams will appear here once discovery is complete." />
          ) : (
            <ul className={s.work} role="list">
              {workstreams.map((w) => {
                const st = WORK_STATE[w.state];
                const owner = people[w.ownerId];
                return (
                  <li key={w.id} className={s.ws}>
                    <div className={s.wsTop}>
                      <p className={s.wsName}>{w.ref ? <Link href={hrefFor(w.ref)}>{w.name}</Link> : w.name}</p>
                      <Status tone={st.tone} label={st.label} />
                    </div>
                    {w.progress.type === "steps" ? (
                      <div className={s.wsProgress}>
                        <Segments done={w.progress.done} total={w.progress.total} tone={st.tone === "attention" ? "attention" : "progress"} label={`${w.name}: ${w.progress.done} of ${w.progress.total} ${w.progress.unit}`} />
                        <span>
                          {w.progress.done} / {w.progress.total} {w.progress.unit}
                        </span>
                      </div>
                    ) : w.progress.type === "live" ? (
                      <p className={s.wsStage}>Live since {fmtDate(w.progress.since, tz, "dayShort")}</p>
                    ) : (
                      <p className={s.wsStage}>{w.progress.label}</p>
                    )}
                    <p className={s.wsNext}>
                      <span>{w.next ? `Next: ${w.next.label}${w.next.at ? ` · ${until(w.next.at, now, tz)}` : ""}` : ""}</span>
                      {owner && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", flex: "none" }}>
                          <Avatar id={owner.id} name={owner.name} size={20} />
                          <span className="sr-only">Owner: {owner.name}</span>
                        </span>
                      )}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
      </div>

      {/* D — Performance snapshot */}
      <Panel className={s.snapshot} aria-labelledby="snapshot-title">
        <PanelHead
          title="Performance"
          id="snapshot-title"
          meta={report ? `${range.label} vs the 30 days before` : undefined}
          action={report ? <TextLink href="/portal/analytics">Open analytics</TextLink> : undefined}
        />
        {!report ? (
          <Empty
            icon="analytics"
            title="Performance will appear once analytics is connected."
            body="We only show numbers from your own sources. Connect analytics and ad accounts in setup and results start flowing in here."
            action={
              <PLink href="/portal/integrations" size="sm" variant="secondary">
                View connections
              </PLink>
            }
          />
        ) : (
          <div className={s.tiles}>
            {tiles.map((m) => {
              const def = METRICS[m.key];
              const d = delta(m.value, m.previous, def.better);
              return (
                <div key={m.key} className={s.tile}>
                  <p className={s.tileLabel}>
                    <Link href={`/portal/analytics?metric=${m.key}`}>{metricLabel(m.key, client.labels)}</Link>
                  </p>
                  <p className={s.tileValue}>{formatMetric(m.key, m.value, client.currency, true)}</p>
                  <p className={s.tileFoot}>
                    <Delta d={d} />
                    <span>vs {formatMetric(m.key, m.previous, client.currency, true)}</span>
                  </p>
                  <Sparkline className={s.tileSpark} values={m.series.map((p) => p.value)} previous={m.series.map((p) => p.previous)} height={34} />
                </div>
              );
            })}
          </div>
        )}
      </Panel>

      <div className={s.band}>
        {/* F — Studio intelligence */}
        <Panel aria-labelledby="intel-title">
          <PanelHead title={<>What we’re seeing</>} id="intel-title" meta={openInsights.length ? `${openInsights.length} observation${openInsights.length === 1 ? "" : "s"}` : undefined} />
          {openInsights.length === 0 ? (
            <Empty icon="signal" title="No observations yet." body="Once there’s enough data to say something useful, your strategist’s observations and recommendations appear here." />
          ) : (
            <ul className={s.insights} role="list">
              {openInsights.map((i) => (
                <InsightCard key={i.id} insight={i} owner={people[i.ownerId]} canDecide={can(user.role, "approve")} />
              ))}
            </ul>
          )}
        </Panel>

        {/* E — What changed */}
        <Panel aria-labelledby="changed-title">
          <PanelHead title="What changed" id="changed-title" />
          {activity.length === 0 ? (
            <Empty icon="clock" title="Nothing has happened yet." body="Every launch, approval and delivery will be recorded here as it happens." />
          ) : (
            <ActivityStream events={activity.slice(0, 9)} people={people} now={now} tz={tz} />
          )}
        </Panel>
      </div>
    </div>
  );
}
