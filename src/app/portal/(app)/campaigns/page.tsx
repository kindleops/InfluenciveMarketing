import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import { requirePortal } from "@/portal/server";
import { delta, fmtDate, formatMetric, METRICS, metricLabel, money } from "@/portal/format";
import { CAMPAIGN_ORDER, CAMPAIGN_STATUS, CHANNEL } from "@/portal/status";
import type { Campaign } from "@/portal/model";
import { Avatar, Delta, Empty, Meter, PageHead, Panel, Status } from "@/components/portal/ui";
import { Segmented } from "@/components/portal/ui/Segmented";
import s from "@/components/portal/campaigns/campaigns.module.css";

export const metadata = { title: "Campaigns" };

const FILTERS = {
  all: { label: "All", test: (_: Campaign) => true },
  live: { label: "Live", test: (c: Campaign) => c.status === "live" || c.status === "optimizing" },
  upcoming: { label: "Upcoming", test: (c: Campaign) => ["scheduled", "preparing", "draft", "awaiting_approval"].includes(c.status) },
  complete: { label: "Complete & paused", test: (c: Campaign) => c.status === "complete" || c.status === "paused" },
} as const;
type FilterKey = keyof typeof FILTERS;

export default async function CampaignsPage({ searchParams }: { searchParams: Promise<{ show?: string }> }) {
  const { session, source } = await requirePortal();
  const sp = await searchParams;
  const tz = session.client.timezone;
  const cur = session.client.currency;
  const [campaigns, people] = await Promise.all([source.campaigns(), source.people()]);

  const show: FilterKey = sp.show && sp.show in FILTERS ? (sp.show as FilterKey) : "all";
  const list = campaigns
    .filter(FILTERS[show].test)
    .sort((a, b) => CAMPAIGN_ORDER.indexOf(a.status) - CAMPAIGN_ORDER.indexOf(b.status) || b.start.localeCompare(a.start));
  const live = campaigns.filter(FILTERS.live.test);
  const monthly = campaigns.filter((c) => c.budget?.period === "monthly" && FILTERS.live.test(c));
  const spent = monthly.reduce((n, c) => n + (c.budget?.spent ?? 0), 0);
  const planned = monthly.reduce((n, c) => n + (c.budget?.total ?? 0), 0);
  const awaiting = campaigns.filter((c) => c.status === "awaiting_approval");
  const next = campaigns.filter((c) => c.status === "scheduled").sort((a, b) => a.start.localeCompare(b.start))[0];

  return (
    <>
      <PageHead
        title="Campaigns"
        lead={
          campaigns.length
            ? "Every campaign we’re running for you, what it’s for, and how it’s doing — interpreted, not just reported."
            : undefined
        }
      />
      {campaigns.length === 0 ? (
        <Panel>
          <Empty
            center
            icon="campaigns"
            title="No campaigns have launched yet."
            body="Your first campaigns will appear here as soon as they’re in preparation — you’ll see each one’s goal, budget and approvals before anything goes live."
          />
        </Panel>
      ) : (
        <>
          <Panel className={s.summary} aria-label="Summary">
            <div className={s.sum}>
              <span className={s.sumLabel}>Live now</span>
              <span className={s.sumValue}>{live.length}</span>
              <span className={s.sumFoot}>
                <Status tone="live" label={`${live.filter((c) => c.status === "optimizing").length} being optimized`} />
              </span>
            </div>
            <div className={s.sum}>
              <span className={s.sumLabel}>Always-on spend this month</span>
              <span className={s.sumValue}>{money(spent, cur)}</span>
              <span className={s.sumFoot}>
                <Meter value={spent} max={planned} label="Spend against monthly budget" />
                of {money(planned, cur)} planned
              </span>
            </div>
            <div className={s.sum}>
              <span className={s.sumLabel}>Awaiting your approval</span>
              <span className={s.sumValue}>{awaiting.length}</span>
              <span className={s.sumFoot}>{awaiting[0] ? <Link href={`/portal/campaigns/${awaiting[0].id}`}>{awaiting[0].name}</Link> : "Nothing waiting"}</span>
            </div>
            <div className={s.sum}>
              <span className={s.sumLabel}>Next launch</span>
              <span className={s.sumValue}>{next ? fmtDate(next.start, tz, "dayShort") : "—"}</span>
              <span className={s.sumFoot}>{next ? next.name : "Nothing scheduled"}</span>
            </div>
          </Panel>

          <div className={s.toolbar}>
            <Segmented
              label="Filter campaigns"
              active={show}
              items={(Object.keys(FILTERS) as FilterKey[]).map((k) => ({
                key: k,
                label: FILTERS[k].label,
                count: campaigns.filter(FILTERS[k].test).length,
                href: k === "all" ? "/portal/campaigns" : `/portal/campaigns?show=${k}`,
              }))}
            />
          </div>

          <Panel as="div">
            {list.length === 0 ? (
              <Empty title="Nothing here right now." body="Try another filter." />
            ) : (
              <table className={s.table}>
                <caption className="sr-only">Campaigns</caption>
                <thead>
                  <tr>
                    <th scope="col">Campaign</th>
                    <th scope="col" className={s.hideLg}>
                      Channel
                    </th>
                    <th scope="col">State</th>
                    <th scope="col" className={s.num}>
                      Spend
                    </th>
                    <th scope="col" className={s.num}>
                      Primary result
                    </th>
                    <th scope="col" className={s.hideLg}>
                      Dates
                    </th>
                    <th scope="col">
                      <span className="sr-only">Owner</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((c) => {
                    const st = CAMPAIGN_STATUS[c.status];
                    const owner = people[c.ownerId];
                    const p = c.primary;
                    const def = p ? METRICS[p.key] : null;
                    return (
                      <tr key={c.id}>
                        <td data-cell="name">
                          <div className={s.name}>
                            <Link href={`/portal/campaigns/${c.id}`}>{c.name}</Link>
                            <span>
                              {c.objective} · {CHANNEL[c.channel]}
                            </span>
                          </div>
                        </td>
                        <td data-cell="channel" className={s.hideLg}>
                          {CHANNEL[c.channel]}
                        </td>
                        <td data-cell="state">
                          <Status tone={st.tone} label={st.label} />
                        </td>
                        <td data-cell="spend" className={s.num}>
                          {c.budget ? (
                            <div className={s.spend}>
                              <span className="tnum">
                                {money(c.budget.spent, cur)} <span style={{ color: "var(--text-muted)" }}>/ {money(c.budget.total, cur, { compact: true })}</span>
                              </span>
                              <Meter value={c.budget.spent} max={c.budget.total} tone={c.budget.spent > c.budget.total ? "blocked" : "progress"} label={`${c.name} budget used`} />
                            </div>
                          ) : (
                            <span style={{ color: "var(--text-muted)" }}>No paid media</span>
                          )}
                        </td>
                        <td data-cell="kpi" className={s.num}>
                          {p && def && (c.status !== "scheduled" && c.status !== "awaiting_approval" && c.status !== "preparing") ? (
                            <div className={s.kpi}>
                              <strong className="tnum">{formatMetric(p.key, p.value, cur)}</strong>
                              <span>
                                {metricLabel(p.key, session.client.labels)}
                                {p.previous !== undefined && (
                                  <>
                                    {" "}
                                    · <Delta d={delta(p.value, p.previous, def.better)} />
                                  </>
                                )}
                              </span>
                            </div>
                          ) : (
                            <span style={{ color: "var(--text-muted)" }}>{p && def ? `Goal ${formatMetric(p.key, p.target ?? 0, cur, true)}` : "—"}</span>
                          )}
                        </td>
                        <td data-cell="dates" className={`${s.dates} ${s.hideLg}`}>
                          {fmtDate(c.start, tz, "dayShort")} – {c.end ? fmtDate(c.end, tz, "dayShort") : "ongoing"}
                        </td>
                        <td data-cell="owner">{owner && <Avatar id={owner.id} name={owner.name} size={26} label />}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </Panel>
        </>
      )}
    </>
  );
}
