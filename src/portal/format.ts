import type { MetricKey } from "./model";

/* One place for how the portal writes numbers and dates. Every date is set
   in the account's time zone, so server and browser always agree. */

export interface MetricDef {
  label: string;
  short?: string;
  kind: "currency" | "count" | "ratio" | "percent";
  /** Which direction is good. */
  better: "up" | "down";
  /** Rates and averages don't sum across a period. */
  additive: boolean;
}

export const METRICS: Record<MetricKey, MetricDef> = {
  revenue: { label: "Revenue", kind: "currency", better: "up", additive: true },
  conversions: { label: "Conversions", kind: "count", better: "up", additive: true },
  qualified_leads: { label: "Qualified leads", kind: "count", better: "up", additive: true },
  booked_calls: { label: "Booked calls", kind: "count", better: "up", additive: true },
  sessions: { label: "Sessions", kind: "count", better: "up", additive: true },
  spend: { label: "Spend", kind: "currency", better: "down", additive: true },
  cac: { label: "Acquisition cost", short: "CAC", kind: "currency", better: "down", additive: false },
  cpl: { label: "Cost per lead", short: "CPL", kind: "currency", better: "down", additive: false },
  roas: { label: "Return on ad spend", short: "ROAS", kind: "ratio", better: "up", additive: false },
  conversion_rate: { label: "Conversion rate", kind: "percent", better: "up", additive: false },
  aov: { label: "Average order value", short: "AOV", kind: "currency", better: "up", additive: false },
  email_subscribers: { label: "Email subscribers", kind: "count", better: "up", additive: false },
};

export function metricLabel(key: MetricKey, labels?: Partial<Record<MetricKey, string>>) {
  return labels?.[key] ?? METRICS[key].label;
}

const nf = (o: Intl.NumberFormatOptions) => new Intl.NumberFormat("en-US", o);

export function money(n: number, currency = "USD", opts: { compact?: boolean; cents?: boolean } = {}) {
  if (opts.compact && Math.abs(n) >= 10_000)
    return nf({ style: "currency", currency, notation: "compact", minimumFractionDigits: 0, maximumFractionDigits: Math.abs(n) >= 1_000_000 ? 2 : 1 }).format(n);
  const small = Math.abs(n) < 1000 && !Number.isInteger(n);
  return nf({ style: "currency", currency, maximumFractionDigits: opts.cents || small ? 2 : 0, minimumFractionDigits: opts.cents || small ? 2 : 0 }).format(n);
}

export function count(n: number, compact = false) {
  if (compact && Math.abs(n) >= 10_000) return nf({ notation: "compact", minimumFractionDigits: 0, maximumFractionDigits: 1 }).format(n);
  return nf({ maximumFractionDigits: 0 }).format(n);
}

export function percent(ratio: number, digits = 1) {
  return nf({ style: "percent", minimumFractionDigits: digits, maximumFractionDigits: digits }).format(ratio);
}

export function formatMetric(key: MetricKey, v: number, currency = "USD", compact = false) {
  const d = METRICS[key];
  if (d.kind === "currency") return money(v, currency, { compact });
  if (d.kind === "percent") return percent(v, v < 0.1 ? 2 : 1);
  if (d.kind === "ratio") return `${v.toFixed(2)}×`;
  return count(v, compact);
}

export interface Delta {
  /** Signed fractional change, or null when there is nothing to compare. */
  change: number | null;
  direction: "up" | "down" | "flat";
  good: boolean | null;
  label: string;
}

export function delta(value: number, previous: number | undefined, better: "up" | "down" = "up"): Delta {
  if (previous === undefined || previous === 0 || !Number.isFinite(previous)) return { change: null, direction: "flat", good: null, label: "—" };
  const change = (value - previous) / Math.abs(previous);
  const direction = Math.abs(change) < 0.005 ? "flat" : change > 0 ? "up" : "down";
  const good = direction === "flat" ? null : (direction === "up") === (better === "up");
  const label = direction === "flat" ? "No change" : `${change > 0 ? "+" : "−"}${percent(Math.abs(change), Math.abs(change) < 0.1 ? 1 : 0)}`;
  return { change, direction, good, label };
}

/* ---- Dates ----------------------------------------------------------- */

const cache = new Map<string, Intl.DateTimeFormat>();
function dtf(tz: string, o: Intl.DateTimeFormatOptions) {
  const k = tz + JSON.stringify(o);
  let f = cache.get(k);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", { timeZone: tz, ...o });
    cache.set(k, f);
  }
  return f;
}

export type DateStyle = "day" | "dayShort" | "full" | "time" | "dayTime" | "month" | "weekday" | "numeric";
const STYLES: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  day: { month: "short", day: "numeric", year: "numeric" },
  dayShort: { month: "short", day: "numeric" },
  full: { weekday: "long", month: "long", day: "numeric" },
  time: { hour: "numeric", minute: "2-digit" },
  dayTime: { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" },
  month: { month: "long", year: "numeric" },
  weekday: { weekday: "short", month: "short", day: "numeric" },
  numeric: { month: "2-digit", day: "2-digit" },
};

export function fmtDate(iso: string, tz: string, style: DateStyle = "day") {
  // Plain calendar dates (YYYY-MM-DD) are already local to the account.
  const d = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T12:00:00Z`) : new Date(iso);
  return dtf(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? "UTC" : tz, STYLES[style]).format(d);
}

function dayIndex(t: number, tz: string) {
  const parts = dtf(tz, { year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(t);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const [y, m, d] = [get("year"), get("month"), get("day")];
  return Math.round(Date.UTC(y, m - 1, d) / 86_400_000);
}

/** Calendar days from now until iso, in the account's zone (0 = today). */
export function daysUntil(iso: string, now: number, tz: string) {
  return dayIndex(new Date(iso).getTime(), tz) - dayIndex(now, tz);
}

/** "2h ago", "Yesterday", "Mar 4" — relative for recent, absolute beyond a week. */
export function ago(iso: string, now: number, tz: string) {
  const t = new Date(iso).getTime();
  const s = Math.round((now - t) / 1000);
  if (s < 60) return "Just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  const days = -daysUntil(iso, now, tz);
  if (days === 0) return `${Math.floor(s / 3600)}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return fmtDate(iso, tz, "dayShort");
}

/** "Due today", "Due tomorrow", "Due in 3 days", "2 days overdue". */
export function due(iso: string, now: number, tz: string) {
  const d = daysUntil(iso, now, tz);
  if (d < 0) return { label: `${-d} day${d === -1 ? "" : "s"} overdue`, urgency: "overdue" as const, days: d };
  if (d === 0) return { label: "Due today", urgency: "today" as const, days: d };
  if (d === 1) return { label: "Due tomorrow", urgency: "soon" as const, days: d };
  if (d <= 3) return { label: `Due in ${d} days`, urgency: "soon" as const, days: d };
  return { label: `Due ${fmtDate(iso, tz, "weekday")}`, urgency: "later" as const, days: d };
}

/** "In 6 days", "Tomorrow", "Today". */
export function until(iso: string, now: number, tz: string) {
  const d = daysUntil(iso, now, tz);
  if (d === 0) return "Today";
  if (d === 1) return "Tomorrow";
  if (d > 1 && d < 14) return `In ${d} days`;
  if (d < 0) return ago(iso, now, tz);
  return fmtDate(iso, tz, "dayShort");
}

export function bytes(n: number) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)} GB`;
  if (n >= 1e6) return `${Math.round(n / 1e6)} MB`;
  return `${Math.max(1, Math.round(n / 1e3))} KB`;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function greeting(now: number, tz: string) {
  const h = Number(dtf(tz, { hour: "numeric", hourCycle: "h23" }).format(now));
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}
