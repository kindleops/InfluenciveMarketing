/* DEVELOPER FIXTURE — deterministic synthetic analytics for the demo world. */
import type { AnalyticsReport, Campaign, CreativeAsset, DateRange, MetricKey, MetricSummary } from "../../model";
import { DAY, dayKey, rng } from "./kit";

export interface ChannelSpec {
  id: string;
  label: string;
  sessions: number;
  cr: number;
  aov: number;
  spend: number;
  /** Qualified lead rate per session (trade inquiries). */
  leads?: number;
  /** Fractional lift in conversion rate reached by the end of the engagement so far. */
  lift: number;
  /** Fractional lift in sessions. */
  reach: number;
}

interface Cell {
  sessions: number;
  orders: number;
  revenue: number;
  spend: number;
  leads: number;
}
export interface Day {
  date: string;
  t: number;
  ch: Record<string, Cell>;
  subscribers: number;
}

export function buildDaily(specs: ChannelSpec[], now: number, engagedDaysAgo: number, seed: number, subs0: number): Day[] {
  const r = rng(seed);
  const today = Date.UTC(new Date(now).getUTCFullYear(), new Date(now).getUTCMonth(), new Date(now).getUTCDate());
  const start = today - 760 * DAY;
  const engaged = today - engagedDaysAgo * DAY;
  const days: Day[] = [];
  let subs = subs0;
  for (let t = start; t < today; t += DAY) {
    const dow = new Date(t).getUTCDay();
    const weekly = dow === 0 || dow === 6 ? 0.9 : dow === 1 ? 1.06 : 1;
    // Seasonal swell toward late autumn.
    const doy = (t - Date.UTC(new Date(t).getUTCFullYear(), 0, 1)) / DAY;
    const season = 1 + 0.12 * Math.sin(((doy - 220) / 365) * Math.PI * 2);
    const p = t < engaged ? 0 : Math.min(1, (t - engaged) / (today - engaged));
    const ease = p * p * (3 - 2 * p);
    const ch: Record<string, Cell> = {};
    for (const s of specs) {
      const noise = 0.9 + r() * 0.2;
      const sessions = Math.round(s.sessions * weekly * season * noise * (1 + s.reach * ease));
      const cr = s.cr * (1 + s.lift * ease) * (0.88 + r() * 0.24);
      const orders = Math.round(sessions * cr);
      const revenue = Math.round(orders * s.aov * (0.92 + r() * 0.16));
      const spend = s.spend ? Math.round(s.spend * weekly * (0.94 + r() * 0.12) * (1 + 0.1 * ease)) : 0;
      const leads = s.leads ? Math.round(sessions * s.leads * (1 + s.lift * ease) * (0.7 + r() * 0.6)) : 0;
      ch[s.id] = { sessions, orders, revenue, spend, leads };
    }
    subs += Math.round((22 + 30 * ease) * (0.7 + r() * 0.6));
    days.push({ date: dayKey(t), t, ch, subscribers: subs });
  }
  return days;
}

interface Agg {
  leads: number;
  sessions: number;
  orders: number;
  revenue: number;
  spend: number;
  paidRevenue: number;
  subscribers: number;
}
const empty = (): Agg => ({ leads: 0, sessions: 0, orders: 0, revenue: 0, spend: 0, paidRevenue: 0, subscribers: 0 });

function aggregate(rows: Day[], paid: Set<string>): Agg {
  const a = empty();
  for (const d of rows) {
    for (const [id, c] of Object.entries(d.ch)) {
      a.sessions += c.sessions;
      a.orders += c.orders;
      a.revenue += c.revenue;
      a.spend += c.spend;
      a.leads += c.leads;
      if (paid.has(id)) a.paidRevenue += c.revenue;
    }
    a.subscribers = d.subscribers;
  }
  return a;
}

function metric(key: MetricKey, a: Agg): number {
  switch (key) {
    case "revenue":
      return a.revenue;
    case "conversions":
      return a.orders;
    case "sessions":
      return a.sessions;
    case "spend":
      return a.spend;
    case "roas":
      return a.spend ? a.paidRevenue / a.spend : 0;
    case "cac":
      return a.orders ? a.spend / (a.orders * 0.64) : 0;
    case "conversion_rate":
      return a.sessions ? a.orders / a.sessions : 0;
    case "aov":
      return a.orders ? a.revenue / a.orders : 0;
    case "email_subscribers":
      return a.subscribers;
    case "qualified_leads":
      return a.leads;
    default:
      return 0;
  }
}

const within = (rows: Day[], from: string, to: string) => rows.filter((d) => d.date >= from && d.date <= to);

function buckets(rows: Day[], size: number): Day[][] {
  const out: Day[][] = [];
  for (let i = 0; i < rows.length; i += size) out.push(rows.slice(i, i + size));
  return out;
}

export function buildReport(opts: {
  days: Day[];
  range: DateRange;
  specs: ChannelSpec[];
  paid: string[];
  metrics: MetricKey[];
  targets: Partial<Record<MetricKey, number>>;
  campaigns: Campaign[];
  campaignChannel: Record<string, string>;
  creatives: CreativeAsset[];
  seed: number;
}): AnalyticsReport {
  const { days, range, specs, metrics } = opts;
  const paid = new Set(opts.paid);
  const cur = within(days, range.from, range.to);
  const prev = within(days, range.compareFrom, range.compareTo);
  const granularity = cur.length > 92 ? "week" : "day";
  const size = granularity === "week" ? 7 : 1;
  const cb = buckets(cur, size);
  const pb = buckets(prev, size);
  const A = aggregate(cur, paid);
  const P = aggregate(prev, paid);

  const outcomes: MetricSummary[] = metrics.map((key) => ({
    key,
    value: metric(key, A),
    previous: metric(key, P),
    target: opts.targets[key],
    series: cb.map((b, i) => ({
      date: b[0].date,
      value: metric(key, aggregate(b, paid)),
      previous: pb[i] ? metric(key, aggregate(pb[i], paid)) : 0,
    })),
  }));

  const channels = specs.map((s) => {
    const sum = (rows: Day[], k: keyof Cell) => rows.reduce((n, d) => n + d.ch[s.id][k], 0);
    return {
      id: s.id,
      label: s.label,
      sessions: sum(cur, "sessions"),
      conversions: sum(cur, "orders"),
      revenue: sum(cur, "revenue"),
      spend: sum(cur, "spend"),
      leads: sum(cur, "leads"),
      previousConversions: sum(prev, "orders"),
    };
  });

  // Campaign contribution: each channel's results split across the campaigns
  // running on it, weighted by a stable per-campaign share.
  const r = rng(opts.seed + cur.length);
  const byChannel = new Map<string, Campaign[]>();
  for (const c of opts.campaigns) {
    const ch = opts.campaignChannel[c.channel];
    if (!ch || c.status === "draft" || c.status === "preparing") continue;
    const list = byChannel.get(ch) ?? [];
    list.push(c);
    byChannel.set(ch, list);
  }
  const campaigns: AnalyticsReport["campaigns"] = [];
  for (const [ch, list] of byChannel) {
    const row = channels.find((c) => c.id === ch);
    if (!row) continue;
    const weights = list.map((_, i) => 1 / (i + 1.4));
    const total = weights.reduce((a, b) => a + b, 0);
    list.forEach((c, i) => {
      const w = (weights[i] / total) * 0.82;
      campaigns.push({
        id: c.id,
        name: c.name,
        channel: c.channel,
        conversions: Math.round(row.conversions * w),
        revenue: Math.round(row.revenue * w),
        spend: Math.round(row.spend * w),
        leads: Math.round(row.leads * w),
      });
    });
  }
  campaigns.sort((a, b) => b.revenue - a.revenue);

  const paidSpend = A.spend;
  const creatives = opts.creatives
    .filter((c) => c.kind === "ad" || c.kind === "social" || c.kind === "video")
    .filter((c) => c.status === "approved" || c.status === "final")
    .map((c) => {
      const impressions = Math.round((40_000 + r() * 160_000) * (cur.length / 30));
      const ctr = 0.006 + r() * 0.014;
      const clicks = impressions * ctr;
      return {
        id: c.id,
        title: c.title,
        campaign: opts.campaigns.find((k) => k.id === c.campaignId)?.name ?? "—",
        impressions,
        ctr,
        conversions: Math.round(clicks * (0.018 + r() * 0.02)),
        spend: Math.round(paidSpend * (0.05 + r() * 0.08)),
      };
    })
    .sort((a, b) => b.conversions - a.conversions);

  const orders = A.orders;
  return {
    range,
    granularity,
    outcomes,
    channels: channels.sort((a, b) => b.revenue - a.revenue),
    campaigns,
    creatives,
    attribution: {
      model: "Position-based (40/20/40)",
      note: "Share of attributed orders credited to each channel as the first and the last touch.",
      rows: [
        { channel: "Paid social", firstTouch: 0.34, lastTouch: 0.17 },
        { channel: "Organic search", firstTouch: 0.27, lastTouch: 0.22 },
        { channel: "Paid search", firstTouch: 0.16, lastTouch: 0.24 },
        { channel: "Email", firstTouch: 0.04, lastTouch: 0.19 },
        { channel: "Direct", firstTouch: 0.12, lastTouch: 0.13 },
        { channel: "Referral & social", firstTouch: 0.07, lastTouch: 0.05 },
      ],
    },
    journey: [
      { step: "Sessions", count: A.sessions },
      { step: "Product views", count: Math.round(A.sessions * 0.58) },
      { step: "Added to cart", count: Math.round(A.sessions * 0.086) },
      { step: "Checkout started", count: Math.round(A.sessions * 0.041) },
      { step: "Orders", count: orders },
    ],
    devices: [
      { label: "Mobile", sessions: Math.round(A.sessions * 0.68), conversionRate: (orders * 0.55) / (A.sessions * 0.68) },
      { label: "Desktop", sessions: Math.round(A.sessions * 0.28), conversionRate: (orders * 0.41) / (A.sessions * 0.28) },
      { label: "Tablet", sessions: Math.round(A.sessions * 0.04), conversionRate: (orders * 0.04) / (A.sessions * 0.04) },
    ],
    regions: [
      { label: "California", share: 0.16 },
      { label: "New York", share: 0.11 },
      { label: "Colorado", share: 0.09 },
      { label: "Washington", share: 0.08 },
      { label: "Texas", share: 0.07 },
      { label: "Other states", share: 0.49 },
    ].map((g) => ({ ...g, conversions: Math.round(orders * g.share) })),
  };
}
