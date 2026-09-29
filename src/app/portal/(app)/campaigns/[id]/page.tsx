import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import { notFound } from "next/navigation";
import { requirePortal } from "@/portal/server";
import { can } from "@/portal/access";
import { daysUntil, delta, due, fmtDate, formatMetric, METRICS, metricLabel, money, until } from "@/portal/format";
import { hrefFor } from "@/portal/nav";
import { APPROVAL_CATEGORY, CAMPAIGN_STATUS, CHANNEL, CREATIVE_STATUS, EXPERIMENT_STATUS } from "@/portal/status";
import type { KpiReading } from "@/portal/model";
import { TrendChart } from "@/components/portal/charts/TrendChart";
import { InsightCard } from "@/components/portal/command/Insights";
import { Preview } from "@/components/portal/Preview";
import { Delta, Empty, Icon, Meter, Panel, PanelHead, Person, PLink, Status } from "@/components/portal/ui";
import { Segmented } from "@/components/portal/ui/Segmented";
import cmd from "@/components/portal/command/command.module.css";
import s from "@/components/portal/campaigns/campaigns.module.css";

const TABS = ["overview", "performance", "creative", "audience", "timeline", "experiments", "recommendations", "approvals"] as const;
type Tab = (typeof TABS)[number];

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ tab?: string }> };

export async function generateMetadata({ params }: Props) {
  const { source } = await requirePortal();
  const { id } = await params;
  const c = (await source.campaigns()).find((x) => x.id === id);
  return { title: c?.name ?? "Campaign" };
}

export default async function CampaignRoom({ params, searchParams }: Props) {
  const { session, source } = await requirePortal();
  const { id } = await params;
  const sp = await searchParams;
  const now = Date.now();
  const tz = session.client.timezone;
  const cur = session.client.currency;
  const labels = session.client.labels;
  const [campaigns, people, creative, experiments, approvals, insights] = await Promise.all([
    source.campaigns(),
    source.people(),
    source.creative(),
    source.experiments(),
    source.approvals(),
    source.insights(),
  ]);
  const c = campaigns.find((x) => x.id === id);
  if (!c) notFound();

  const tab: Tab = (TABS as readonly string[]).includes(sp.tab ?? "") ? (sp.tab as Tab) : "overview";
  const st = CAMPAIGN_STATUS[c.status];
  const owner = people[c.ownerId];
  const assets = creative.filter((a) => c.creativeIds.includes(a.id) || a.campaignId === c.id);
  const exps = experiments.filter((e) => c.experimentIds.includes(e.id) || e.campaignId === c.id);
  const related = approvals.filter((a) => a.subject?.id === c.id || (a.subject?.kind === "creative" && assets.some((x) => x.id === a.subject!.id)));
  const pendingRelated = related.filter((a) => a.state === "pending");
  const approvalIds = new Set(related.map((a) => a.id));
  const recs = insights.filter((i) => i.ref && (i.ref.id === c.id || approvalIds.has(i.ref.id)));
  const counts: Partial<Record<Tab, number>> = {
    creative: assets.length || undefined,
    experiments: exps.length || undefined,
    recommendations: recs.length || undefined,
    approvals: pendingRelated.length || undefined,
  };
  const labelOf: Record<Tab, string> = {
    overview: "Overview",
    performance: "Performance",
    creative: "Creative",
    audience: "Audience",
    timeline: "Timeline",
    experiments: "Experiments",
    recommendations: "Recommendations",
    approvals: "Approvals",
  };
  const started = daysUntil(c.start, now, tz) <= 0;

  const kpi = (k: KpiReading, primary?: boolean) => {
    const def = METRICS[k.key];
    const hasValue = started && c.status !== "awaiting_approval";
    return (
      <div key={k.key} className={s.kpiTile} data-primary={primary ? "" : undefined}>
        <span className={s.kpiLabel}>
          {metricLabel(k.key, labels)}
          {primary && " · primary"}
        </span>
        <span className={s.kpiValue}>{hasValue ? formatMetric(k.key, k.value, cur) : "—"}</span>
        <span className={s.kpiFoot}>
          {hasValue && k.previous !== undefined && (
            <>
              <Delta d={delta(k.value, k.previous, def.better)} /> vs previous 30 days
            </>
          )}
          {k.target !== undefined && <span>Goal {formatMetric(k.key, k.target, cur)}</span>}
          {!hasValue && <span>Reported once live</span>}
        </span>
      </div>
    );
  };

  return (
    <div className={s.room}>
      <header>
        <Link href="/portal/campaigns" className={s.crumb}>
          <Icon name="arrowLeft" size={14} />
          Campaigns
        </Link>
        <div className={s.roomHead}>
          <div>
            <h1 className={s.roomTitle} id="page-title">
              {c.name}
            </h1>
            <p className={s.roomMeta}>
              <Status tone={st.tone} label={st.label} />
              <span>{CHANNEL[c.channel]}</span>
              <span>{c.objective}</span>
              <span>
                {fmtDate(c.start, tz, "day")} – {c.end ? fmtDate(c.end, tz, "day") : "ongoing"}
              </span>
            </p>
            <p className={s.brief}>{c.brief}</p>
          </div>
          <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
            <Person person={owner} size={36} sub={owner ? `${owner.title} · owns this campaign` : undefined} />
            <PLink href={`/portal/messages?compose=1&ref=campaign:${c.id}&subject=${encodeURIComponent(c.name)}`} size="sm" variant="secondary" icon="messages">
              Ask about this campaign
            </PLink>
          </div>
        </div>
      </header>

      <div className={s.tabs}>
        <Segmented
          label="Campaign sections"
          active={tab}
          items={TABS.map((t) => ({ key: t, label: labelOf[t], count: counts[t], href: t === "overview" ? `/portal/campaigns/${c.id}` : `/portal/campaigns/${c.id}?tab=${t}` }))}
        />
      </div>

      {tab === "overview" && (
        <div className={s.overview}>
          <div className={s.side}>
            {c.interpretation && (
              <Panel glass className={s.read} aria-label="Our read">
                <span className={s.readLabel}>Our read · {owner?.name}</span>
                <p className={s.readBody}>{c.interpretation}</p>
              </Panel>
            )}
            <Panel aria-labelledby="kpi-title">
              <PanelHead title="Results" id="kpi-title" meta={started ? "Last 30 days" : `Starts ${until(c.start, now, tz).toLowerCase()}`} />
              {c.primary || c.secondary.length ? (
                <div className={s.kpis}>
                  {c.primary && kpi(c.primary, true)}
                  {c.secondary.map((k) => kpi(k))}
                </div>
              ) : (
                <Empty icon="analytics" title="No results to report yet." body="This campaign’s measures will appear once it starts." />
              )}
            </Panel>
          </div>
          <div className={s.side}>
            {pendingRelated.length > 0 && (
              <Panel glass aria-labelledby="needs-title">
                <PanelHead title="Needs your decision" id="needs-title" count={pendingRelated.length} countTone="attention" />
                <ul className={s.links} role="list">
                  {pendingRelated.map((a) => (
                    <li key={a.id}>
                      <Link className={s.linkRow} href={hrefFor({ kind: "approval", id: a.id })}>
                        <span>
                          <strong>{a.title}</strong>
                          <span>{due(a.dueAt, now, tz).label}</span>
                        </span>
                        <Icon name="arrowRight" size={16} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Panel>
            )}
            {c.budget && (
              <Panel aria-labelledby="budget-title">
                <PanelHead title="Budget" id="budget-title" meta={c.budget.period === "monthly" ? "This month" : "Whole flight"} />
                <div className={s.budget}>
                  <div className={s.budgetRow}>
                    <span>{money(c.budget.spent, cur)} spent</span>
                    <span>{money(c.budget.total, cur)}</span>
                  </div>
                  <Meter value={c.budget.spent} max={c.budget.total} label="Budget used" />
                  <span style={{ color: "var(--text-muted)" }}>
                    {c.budget.spent === 0 ? "No spend yet." : `${Math.round((c.budget.spent / c.budget.total) * 100)}% used${c.budget.period === "monthly" ? " so far this month" : ""}.`}
                  </span>
                </div>
              </Panel>
            )}
            <Panel aria-labelledby="latest-title">
              <PanelHead title="Latest changes" id="latest-title" action={<Link href={`/portal/campaigns/${c.id}?tab=timeline`} className={s.crumb} style={{ margin: 0 }}>Full timeline</Link>} />
              <ol className={s.timeline} role="list">
                {[...c.timeline].reverse().slice(0, 3).map((t, i) => (
                  <li key={i} className={s.tl}>
                    <span className={s.tlWhen}>{fmtDate(t.at, tz, "dayShort")}</span>
                    <div>
                      <p className={s.tlTitle}>{t.title}</p>
                      {t.detail && <p className={s.tlDetail}>{t.detail}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </Panel>
          </div>
        </div>
      )}

      {tab === "performance" && (
        <Panel aria-labelledby="perf-title">
          <PanelHead title={c.primary ? metricLabel(c.primary.key, labels) : "Performance"} id="perf-title" meta={c.series ? `Daily · last ${c.series.length} days` : undefined} />
          <div className={s.pad}>
            {c.series && c.primary ? (
              <TrendChart
                series={c.series}
                kind={METRICS[c.primary.key].kind}
                currency={cur}
                label={`${metricLabel(c.primary.key, labels)} for ${c.name}`}
                target={c.primary.target}
                zeroBased={false}
              />
            ) : (
              <Empty icon="analytics" title="Performance appears once the campaign is live." body="We’ll chart the primary result daily against the period before and the goal." />
            )}
          </div>
          {(c.primary || c.secondary.length > 0) && (
            <div className={s.kpis}>
              {c.primary && kpi(c.primary, true)}
              {c.secondary.map((k) => kpi(k))}
            </div>
          )}
        </Panel>
      )}

      {tab === "creative" && (
        <Panel aria-labelledby="cr-title">
          <PanelHead title="Creative" id="cr-title" meta={assets.length ? `${assets.length} pieces` : undefined} />
          {assets.length ? (
            <div className={s.creativeGrid}>
              {assets.map((a) => {
                const v = a.versions[a.versions.length - 1];
                const cs = CREATIVE_STATUS[a.status];
                return (
                  <Link key={a.id} href={hrefFor({ kind: "creative", id: a.id })} className={s.creativeCard}>
                    <Preview preview={v.preview} brand={session.client.name} sizes="240px" />
                    <p>{a.title}</p>
                    <span>
                      {a.format} · {v.version}
                    </span>
                    <Status tone={cs.tone} label={cs.label} />
                  </Link>
                );
              })}
            </div>
          ) : (
            <Empty icon="creative" title="No creative attached to this campaign." body="Search and email campaigns often run on copy and landing pages rather than visual assets." />
          )}
        </Panel>
      )}

      {tab === "audience" && (
        <Panel aria-labelledby="aud-title">
          <PanelHead title="Audience" id="aud-title" />
          {c.audience ? (
            <>
              <p className={s.pad} style={{ color: "var(--text-secondary)", maxWidth: "68ch" }}>
                {c.audience.summary}
              </p>
              <ul className={s.segments} role="list">
                {c.audience.segments.map((g) => (
                  <li key={g.name} className={s.segment}>
                    <span>{g.name}</span>
                    <span>{g.share !== undefined ? `${Math.round(g.share * 100)}% of budget` : ""}</span>
                    {g.share !== undefined && <Meter value={g.share} max={1} label={`${g.name} share of budget`} />}
                    <small>{g.note}</small>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Empty icon="team" title="No targeting to show." body="This campaign reaches people through search intent or your own lists rather than a defined paid audience." />
          )}
        </Panel>
      )}

      {tab === "timeline" && (
        <Panel aria-labelledby="tl-title">
          <PanelHead title="What we changed, and when" id="tl-title" meta={`${c.timeline.length} entries`} />
          <ol className={s.timeline} role="list">
            {[...c.timeline].reverse().map((t, i) => (
              <li key={i} className={s.tl}>
                <span className={s.tlWhen}>{fmtDate(t.at, tz, "day")}</span>
                <div>
                  <p className={s.tlTitle}>{t.title}</p>
                  {t.detail && <p className={s.tlDetail}>{t.detail}</p>}
                  <p className={s.tlBy}>{people[t.byId]?.name}</p>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      )}

      {tab === "experiments" && (
        <Panel aria-labelledby="ex-title">
          <PanelHead title="Experiments" id="ex-title" />
          {exps.length ? (
            exps.map((e) => {
              const es = EXPERIMENT_STATUS[e.status];
              return (
                <div key={e.id} className={s.exp}>
                  <div className={s.expTop}>
                    <p className={s.expName}>{e.name}</p>
                    <Status tone={es.tone} label={es.label} />
                  </div>
                  <p className={s.expHyp}>{e.hypothesis}</p>
                  <p className={s.expFacts}>
                    <span>
                      Measures <b>{e.metric}</b>
                    </span>
                    <span>
                      Expected <b>{e.expectedImpact}</b>
                    </span>
                    {e.startedAt && <span>Started {fmtDate(e.startedAt, tz, "dayShort")}</span>}
                    {e.endsAt && <span>Reads out {fmtDate(e.endsAt, tz, "dayShort")}</span>}
                    <span>{people[e.ownerId]?.name}</span>
                  </p>
                </div>
              );
            })
          ) : (
            <Empty icon="target" title="No experiments on this campaign." body="When we test something here, the hypothesis, measure and result will be listed." />
          )}
        </Panel>
      )}

      {tab === "recommendations" && (
        <Panel aria-labelledby="rec-title">
          <PanelHead title="Recommendations" id="rec-title" />
          {recs.length ? (
            <ul className={cmd.insights} role="list">
              {recs.map((i) => (
                <InsightCard key={i.id} insight={i} owner={people[i.ownerId]} canDecide={can(session.user.role, "approve")} />
              ))}
            </ul>
          ) : (
            <Empty icon="signal" title="No open recommendations." body={`${owner?.name ?? "Your strategist"} adds recommendations here when the data supports a change.`} />
          )}
        </Panel>
      )}

      {tab === "approvals" && (
        <Panel aria-labelledby="ap-title">
          <PanelHead title="Approvals" id="ap-title" />
          {related.length ? (
            <ul className={s.links} role="list">
              {related.map((a) => (
                <li key={a.id}>
                  <Link className={s.linkRow} href={hrefFor({ kind: "approval", id: a.id })}>
                    <span>
                      <strong>{a.title}</strong>
                      <span>
                        {APPROVAL_CATEGORY[a.category]} · {a.state === "pending" ? due(a.dueAt, now, tz).label : a.state === "approved" ? "Approved" : "Changes requested"}
                      </span>
                    </span>
                    <Status tone={a.state === "pending" ? "attention" : a.state === "approved" ? "positive" : "progress"} label={a.state === "pending" ? "Waiting on you" : a.state === "approved" ? "Approved" : "In revision"} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Empty icon="approvals" title="Nothing to approve on this campaign." body="Everything is moving." />
          )}
        </Panel>
      )}
    </div>
  );
}
