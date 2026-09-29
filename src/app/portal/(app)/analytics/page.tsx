import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import { requirePortal } from "@/portal/server";
import { can } from "@/portal/access";
import { count, delta, fmtDate, formatMetric, METRICS, metricLabel, money, percent } from "@/portal/format";
import { hrefFor } from "@/portal/nav";
import { RANGE_KEYS, rangeDays, resolveRange } from "@/portal/range";
import { CHANNEL } from "@/portal/status";
import type { MetricKey } from "@/portal/model";
import { BarList } from "@/components/portal/charts/BarList";
import { TrendChart } from "@/components/portal/charts/TrendChart";
import { Delta, Empty, PageHead, Panel, PanelHead, PButton, PLink } from "@/components/portal/ui";
import { Segmented } from "@/components/portal/ui/Segmented";
import s from "@/components/portal/analytics/analytics.module.css";

export const metadata = { title: "Analytics" };

type SP = Promise<{ range?: string; from?: string; to?: string; metric?: string }>;

export default async function AnalyticsPage({ searchParams }: { searchParams: SP }) {
  const { session, source } = await requirePortal();
  const sp = await searchParams;
  const tz = session.client.timezone;
  const cur = session.client.currency;
  const labels = session.client.labels;
  const range = resolveRange(sp, tz);

  if (!can(session.user.role, "analytics")) {
    return (
      <>
        <PageHead title="Analytics" />
        <Panel>
          <Empty center icon="lock" title="Analytics isn’t shared with your role." body="Ask an owner or admin on your account to change your access." />
        </Panel>
      </>
    );
  }

  const report = await source.analytics(range);
  const q = (o: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const merged = { range: range.key === "30d" ? undefined : range.key, from: range.key === "custom" ? range.from : undefined, to: range.key === "custom" ? range.to : undefined, metric: sp.metric, ...o };
    for (const [k, v] of Object.entries(merged)) if (v) p.set(k, v);
    const str = p.toString();
    return `/portal/analytics${str ? `?${str}` : ""}`;
  };
  const cmp = `${fmtDate(range.compareFrom, tz, "dayShort")} – ${fmtDate(range.compareTo, tz, "dayShort")}`;

  return (
    <>
      <PageHead
        title="Analytics"
        lead="From business outcome down to the individual ad — what’s working, compared with the period before."
        actions={
          <PLink href="/portal/deliverables?cat=reports" variant="secondary" size="sm" icon="deliverables">
            Monthly reports
          </PLink>
        }
      />

      <div className={s.toolbar}>
        <Segmented
          label="Date range"
          active={range.key}
          items={RANGE_KEYS.map((r) => ({
            key: r.key,
            label: r.label,
            href:
              r.key === "custom"
                ? q({ range: "custom", from: range.key === "custom" ? range.from : range.from, to: range.to })
                : q({ range: r.key === "30d" ? undefined : r.key, from: undefined, to: undefined }),
          }))}
        />
        {range.key === "custom" ? (
          <form className={s.custom} method="get" action="/portal/analytics">
            <input type="hidden" name="range" value="custom" />
            {sp.metric && <input type="hidden" name="metric" value={sp.metric} />}
            <label>
              From
              <input className={s.date} type="date" name="from" defaultValue={range.from} max={range.to} />
            </label>
            <label>
              to
              <input className={s.date} type="date" name="to" defaultValue={range.to} />
            </label>
            <PButton type="submit" size="sm" variant="secondary">
              Apply
            </PButton>
          </form>
        ) : null}
        <span className={s.compare}>
          {fmtDate(range.from, tz, "dayShort")} – {fmtDate(range.to, tz, "day")} · compared with {cmp}
        </span>
      </div>

      {!report ? (
        <Panel>
          <Empty
            center
            icon="analytics"
            title="This will appear once attribution begins."
            body="Analytics only shows numbers from your own connected sources — nothing is estimated or filled in. Once analytics and ad accounts are connected, outcomes, channels and campaigns appear here."
            action={
              <PLink href="/portal/integrations" variant="secondary" size="sm">
                See what’s connected
              </PLink>
            }
          />
        </Panel>
      ) : (
        <Report report={report} metricParam={sp.metric} q={q} cur={cur} labels={labels} tz={tz} />
      )}
    </>
  );
}

function Report({
  report,
  metricParam,
  q,
  cur,
  labels,
  tz,
}: {
  report: NonNullable<Awaited<ReturnType<Awaited<ReturnType<typeof requirePortal>>["source"]["analytics"]>>>;
  metricParam?: string;
  q: (o: Record<string, string | undefined>) => string;
  cur: string;
  labels?: Partial<Record<MetricKey, string>>;
  tz: string;
}) {
  const { range } = report;
  const selected = report.outcomes.find((o) => o.key === metricParam) ?? report.outcomes[0];
  const def = METRICS[selected.key];
  const d = delta(selected.value, selected.previous, def.better);
  const days = rangeDays(range);
  const name = metricLabel(selected.key, labels);
  const direction = d.direction === "flat" ? "level with" : `${d.direction} ${d.label.replace(/^[+−]/, "")} on`;
  const totalRevenue = report.channels.reduce((n, c) => n + c.revenue, 0) || 1;
  const tracksLeads = report.outcomes.some((o) => o.key === "qualified_leads");
  const revenueCampaigns = report.campaigns.filter((c) => c.revenue > 0);
  const leadCampaigns = report.campaigns.filter((c) => c.revenue === 0 && c.leads > 0);
  const maxShare = Math.max(...report.channels.map((c) => c.revenue / totalRevenue));

  return (
    <div className={s.stack}>
      <p className={s.level}>
        <b>1</b> Business outcome
      </p>
      <Panel glass as="section" aria-labelledby="outcome-title">
        <nav className={s.metrics} aria-label="Choose a metric">
          {report.outcomes.map((o) => {
            const od = delta(o.value, o.previous, METRICS[o.key].better);
            return (
              <Link key={o.key} href={q({ metric: o.key })} scroll={false} className={s.metric} aria-current={o.key === selected.key ? "true" : undefined}>
                <span className={s.metricLabel}>{metricLabel(o.key, labels)}</span>
                <span className={s.metricValue}>{formatMetric(o.key, o.value, cur, true)}</span>
                <Delta d={od} />
              </Link>
            );
          })}
        </nav>
        <div className={s.outcome}>
          <div className={s.headline}>
            <h2 className="sr-only" id="outcome-title">
              {name}
            </h2>
            <span className={s.hero}>{formatMetric(selected.key, selected.value, cur)}</span>
            <Delta d={d} suffix={`vs ${formatMetric(selected.key, selected.previous, cur)}`} />
          </div>
          <p className={s.sentence}>
            {name} {def.additive ? "totalled" : "averaged"} {formatMetric(selected.key, selected.value, cur)} over {range.label.toLowerCase()}, {direction} the {days} days before
            {selected.target !== undefined ? ` — against a target of ${formatMetric(selected.key, selected.target, cur)}` : ""}.
          </p>
          <TrendChart
            series={selected.series}
            kind={def.kind}
            currency={cur}
            label={`${name}, ${range.label}`}
            target={selected.target}
            granularity={report.granularity}
            height={280}
          />
        </div>
      </Panel>

      <p className={s.level}>
        <b>2</b> Channel performance
      </p>
      <Panel as="section" aria-labelledby="channels-title">
        <PanelHead title="Channels" id="channels-title" meta="Sorted by revenue" />
        <div className={s.tableWrap} tabIndex={0} role="region" aria-label="Channel table">
          <table className={s.table}>
            <caption className="sr-only">Channel performance, {range.label}</caption>
            <thead>
              <tr>
                <th scope="col">Channel</th>
                <th scope="col">Share of revenue</th>
                <th scope="col">Revenue</th>
                <th scope="col">{metricLabel("conversions", labels)}</th>
                <th scope="col">vs previous</th>
                {tracksLeads && <th scope="col">{metricLabel("qualified_leads", labels)}</th>}
                <th scope="col">Sessions</th>
                <th scope="col">Spend</th>
                <th scope="col">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {report.channels.map((c) => {
                const share = c.revenue / totalRevenue;
                return (
                  <tr key={c.id}>
                    <td>{c.label}</td>
                    <td>
                      <span className={s.shareCell}>
                        {percent(share, 0)}
                        <span className={s.shareBar} aria-hidden="true">
                          <span style={{ width: `${(share / maxShare) * 100}%` }} />
                        </span>
                      </span>
                    </td>
                    <td>{money(c.revenue, cur, { compact: true })}</td>
                    <td>{count(c.conversions)}</td>
                    <td>
                      <Delta d={delta(c.conversions, c.previousConversions)} />
                    </td>
                    {tracksLeads && <td>{c.leads ? count(c.leads) : "—"}</td>}
                    <td>{count(c.sessions, true)}</td>
                    <td>{c.spend ? money(c.spend, cur, { compact: true }) : "—"}</td>
                    <td>{c.spend && c.revenue ? `${(c.revenue / c.spend).toFixed(2)}×` : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      <p className={s.level}>
        <b>3</b> Campaign performance
      </p>
      <Panel as="section" aria-labelledby="camp-title">
        <PanelHead title="Revenue by campaign" id="camp-title" meta="Campaigns running in this period" />
        <div className={s.pad}>
          {revenueCampaigns.length ? (
            <BarList
              label="Revenue by campaign"
              rows={revenueCampaigns.map((c) => ({
                key: c.id,
                label: c.name,
                href: hrefFor({ kind: "campaign", id: c.id }),
                value: c.revenue,
                display: money(c.revenue, cur, { compact: true }),
                sub: `${count(c.conversions)} ${metricLabel("conversions", labels).toLowerCase()}${c.spend ? ` · ${(c.revenue / c.spend).toFixed(1)}× ROAS` : ` · ${CHANNEL[c.channel]}`}`,
              }))}
            />
          ) : (
            <Empty icon="campaigns" title="No campaigns ran in this period." />
          )}
        </div>
        {leadCampaigns.length > 0 && (
          <p className={s.note}>
            Measured on {metricLabel("qualified_leads", labels).toLowerCase()} rather than revenue:{" "}
            {leadCampaigns.map((c, i) => (
              <span key={c.id}>
                {i > 0 && "; "}
                <Link href={hrefFor({ kind: "campaign", id: c.id })} style={{ color: "var(--text-secondary)" }}>
                  {c.name}
                </Link>{" "}
                — {count(c.leads)} in this period
              </span>
            ))}
            .
          </p>
        )}
      </Panel>

      <p className={s.level}>
        <b>4</b> Creative performance
      </p>
      <Panel as="section" aria-labelledby="creative-title">
        <PanelHead title="Creative" id="creative-title" meta="Paid creative live in this period" />
        {report.creatives.length ? (
          <div className={s.tableWrap} tabIndex={0} role="region" aria-label="Creative table">
            <table className={s.table}>
              <caption className="sr-only">Creative performance</caption>
              <thead>
                <tr>
                  <th scope="col">Creative</th>
                  <th scope="col">Campaign</th>
                  <th scope="col">Impressions</th>
                  <th scope="col">Click-through</th>
                  <th scope="col">{metricLabel("conversions", labels)}</th>
                  <th scope="col">Cost each</th>
                </tr>
              </thead>
              <tbody>
                {report.creatives.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <Link href={hrefFor({ kind: "creative", id: c.id })}>{c.title}</Link>
                    </td>
                    <td style={{ textAlign: "right" }}>{c.campaign}</td>
                    <td>{count(c.impressions, true)}</td>
                    <td>{percent(c.ctr, 2)}</td>
                    <td>{count(c.conversions)}</td>
                    <td>{c.conversions ? money(c.spend / c.conversions, cur) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty icon="creative" title="No paid creative ran in this period." />
        )}
      </Panel>

      <p className={s.level}>
        <b>5</b> Attribution & journey
      </p>
      <div className={s.two}>
        <Panel as="section" aria-labelledby="attr-title">
          <PanelHead title="Where customers start and finish" id="attr-title" />
          {report.attribution ? (
            <>
              <p className={s.note}>
                {report.attribution.note} Model: {report.attribution.model}.
              </p>
              <ul className={s.legend} role="list" aria-hidden="true">
                <li>
                  <span className={s.key} style={{ background: "var(--chart-1)" }} />
                  First touch
                </li>
                <li>
                  <span className={s.key} style={{ background: "var(--chart-2)" }} />
                  Last touch
                </li>
              </ul>
              <ul className={s.pairs} role="list">
                {report.attribution.rows.map((r) => {
                  const max = Math.max(...report.attribution!.rows.flatMap((x) => [x.firstTouch, x.lastTouch]));
                  return (
                    <li key={r.channel} className={s.pair}>
                      <span className={s.pairName}>{r.channel}</span>
                      <span className={s.pairBars}>
                        <span className={s.pb} data-k="first">
                          <span style={{ width: `${(r.firstTouch / max) * 100}%` }} aria-hidden="true" />
                          <span>
                            {percent(r.firstTouch, 0)}
                            <span className="sr-only"> first touch</span>
                          </span>
                        </span>
                        <span className={s.pb} data-k="last">
                          <span style={{ width: `${(r.lastTouch / max) * 100}%` }} aria-hidden="true" />
                          <span>
                            {percent(r.lastTouch, 0)}
                            <span className="sr-only"> last touch</span>
                          </span>
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <Empty icon="link" title="Attribution will appear once enough journeys are tracked." />
          )}
        </Panel>
        <Panel as="section" aria-labelledby="journey-title">
          <PanelHead title="Conversion journey" id="journey-title" meta={range.label} />
          {report.journey ? (
            <ol className={s.journey} role="list">
              {report.journey.map((j, i) => {
                const top = report.journey![0].count || 1;
                const prev = i ? report.journey![i - 1].count : null;
                return (
                  <li key={j.step} className={s.step}>
                    <span style={{ color: "var(--text-secondary)" }}>{j.step}</span>
                    <span className={s.stepBar} style={{ width: `${Math.max(2, (j.count / top) * 100)}%` }} aria-hidden="true" />
                    <span className={s.stepVal}>
                      {count(j.count, true)}
                      <small>{prev ? `${percent(j.count / prev, j.count / prev < 0.1 ? 1 : 0)} of previous` : "100%"}</small>
                    </span>
                  </li>
                );
              })}
            </ol>
          ) : (
            <Empty icon="analytics" title="The journey appears once events are tracked end to end." />
          )}
        </Panel>
      </div>

      <div className={s.two}>
        <Panel as="section" aria-labelledby="device-title">
          <PanelHead title="Devices" id="device-title" />
          {report.devices ? (
            <div className={s.pad}>
              <BarList
                label="Sessions by device"
                rows={report.devices.map((dv) => ({
                  key: dv.label,
                  label: dv.label,
                  value: dv.sessions,
                  display: count(dv.sessions, true),
                  sub: `${percent(dv.conversionRate, 2)} convert`,
                }))}
              />
            </div>
          ) : (
            <Empty icon="analytics" title="No device data yet." />
          )}
        </Panel>
        <Panel as="section" aria-labelledby="geo-title">
          <PanelHead title="Regions" id="geo-title" meta={`by ${metricLabel("conversions", labels).toLowerCase()}`} />
          {report.regions ? (
            <div className={s.pad}>
              <BarList
                label="Conversions by region"
                rows={report.regions.map((g) => ({
                  key: g.label,
                  label: g.label,
                  value: g.conversions,
                  display: count(g.conversions),
                  sub: percent(g.share, 0),
                  muted: g.label.startsWith("Other"),
                }))}
              />
            </div>
          ) : (
            <Empty icon="analytics" title="No regional data yet." />
          )}
        </Panel>
      </div>
      <p style={{ fontSize: "var(--p-fs-label)", color: "var(--text-muted)" }}>
        Figures cover {fmtDate(range.from, tz, "day")} to {fmtDate(range.to, tz, "day")}, ending with the last complete day.
      </p>
    </div>
  );
}
