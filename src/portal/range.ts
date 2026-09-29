import type { DateRange, RangeKey } from "./model";

const DAY = 86_400_000;
const iso = (t: number) => new Date(t).toISOString().slice(0, 10);
const parse = (s: string) => Date.parse(`${s}T00:00:00Z`);

export const RANGE_KEYS: { key: RangeKey; label: string }[] = [
  { key: "7d", label: "7D" },
  { key: "30d", label: "30D" },
  { key: "90d", label: "90D" },
  { key: "ytd", label: "YTD" },
  { key: "custom", label: "Custom" },
];

/** Today's calendar date in the account's time zone. */
export function todayIn(timezone: string, now = Date.now()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

/**
 * Resolve a range from URL params. Ranges end on the last complete day
 * (yesterday) so a partial day never reads as a drop.
 */
export function resolveRange(
  params: { range?: string; from?: string; to?: string },
  timezone: string,
  now = Date.now(),
): DateRange {
  const today = parse(todayIn(timezone, now));
  const end = today - DAY;
  let key = (params.range as RangeKey) ?? "30d";
  let from: number;
  let to = end;

  const valid = (s?: string) => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(parse(s));
  if (key === "custom" && valid(params.from) && valid(params.to)) {
    from = parse(params.from!);
    to = Math.min(parse(params.to!), end);
    if (from > to) [from, to] = [to, from];
    // Cap custom windows at two years.
    from = Math.max(from, to - 730 * DAY);
  } else {
    if (key === "custom") key = "30d";
    const days = key === "7d" ? 7 : key === "90d" ? 90 : key === "ytd" ? -1 : 30;
    if (days === -1) {
      const y = new Date(end).getUTCFullYear();
      from = Date.UTC(y, 0, 1);
    } else {
      from = end - (days - 1) * DAY;
    }
  }
  const len = Math.round((to - from) / DAY) + 1;
  const compareTo = from - DAY;
  const compareFrom = compareTo - (len - 1) * DAY;
  const label =
    key === "custom" ? "Custom range" : key === "ytd" ? "Year to date" : `Last ${len} days`;
  return { key, from: iso(from), to: iso(to), label, compareFrom: iso(compareFrom), compareTo: iso(compareTo) };
}

export function rangeDays(r: { from: string; to: string }) {
  return Math.round((parse(r.to) - parse(r.from)) / DAY) + 1;
}
