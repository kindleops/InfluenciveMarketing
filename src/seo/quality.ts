/**
 * The publishing gate. A page that doesn't clear it is not rendered, not
 * linked and not in the sitemap — and e2e/seo.spec.ts fails, so nothing
 * drops out silently. Thresholds are a floor for substance, not a target.
 */

export type GateKind =
  | "service"
  | "combo"
  | "industry"
  | "solution"
  | "use-case"
  | "compare"
  | "alternative"
  | "location"
  | "guide"
  | "playbook"
  | "research"
  | "answer";

export const MIN_WORDS: Record<GateKind, number> = {
  service: 650,
  industry: 600,
  solution: 550,
  "use-case": 550,
  compare: 550,
  alternative: 550,
  location: 650,
  combo: 400,
  guide: 1000,
  playbook: 1000,
  research: 800,
  answer: 450,
};

/** Fields that describe a page rather than being part of what it says. */
const META_KEYS = new Set([
  "slug",
  "metaTitle",
  "metaDescription",
  "primaryQuery",
  "secondaryQueries",
  "updated",
  "published",
  "related",
  "discipline",
  "service",
  "industry",
  "topic",
  "level",
  "reviewed",
  "type",
  "presence",
  "regionCode",
  "country",
  "area",
  "format",
  "number",
  "illustrative",
  "model",
  "kind",
]);

/** Every word a reader sees in the body of the page. */
export function textOf(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(textOf).join(" ");
  if (value && typeof value === "object")
    return Object.entries(value)
      .filter(([k]) => !META_KEYS.has(k))
      .map(([, v]) => textOf(v))
      .join(" ");
  return "";
}

export const wordCount = (s: string) => s.split(/\s+/).filter(Boolean).length;

export interface GateResult {
  ok: boolean;
  words: number;
  reasons: string[];
}

export function gate(
  kind: GateKind,
  page: { metaTitle: string; metaDescription: string; faqs?: unknown[] } & Record<string, unknown>,
): GateResult {
  const words = wordCount(textOf(page));
  const reasons: string[] = [];
  if (words < MIN_WORDS[kind]) reasons.push(`${words} words, needs ${MIN_WORDS[kind]}`);
  if (page.metaTitle.length > 60) reasons.push(`meta title ${page.metaTitle.length} > 60`);
  const d = page.metaDescription.length;
  if (d < 110 || d > 165) reasons.push(`meta description ${d} not in 110–165`);
  const commercial = !["guide", "playbook", "research"].includes(kind);
  if (commercial && (!page.faqs || page.faqs.length < 3)) reasons.push("needs at least 3 FAQs");
  if (kind === "research") {
    if (!page.basis) reasons.push("no stated basis");
    const points = page.keyPoints as string[] | undefined;
    if (!points || points.length < 3) reasons.push("needs at least 3 key points");
    // Original data is held to the full standard: method in the open, and reviewed.
    if (page.format === "study") {
      const m = page.methodology as { sample?: string; period?: string; sources?: string[]; limitations?: string[] } | undefined;
      if (!m?.sample || !m.period || !m.sources?.length || !m.limitations?.length) reasons.push("methodology incomplete");
      if (page.reviewed !== true) reasons.push("not reviewed");
    }
  }
  if (kind === "answer") {
    const a = wordCount(String(page.shortAnswer ?? ""));
    if (a < 30 || a > 85) reasons.push(`short answer ${a} words, needs 30–85`);
    if (((page.keyPoints as string[] | undefined)?.length ?? 0) < 3) reasons.push("needs at least 3 key points");
  }
  if (kind === "location") {
    if (page.presence === "office" && !page.address) reasons.push("office without an address");
    if (!(page.howWeWork as { body?: string[] } | undefined)?.body?.length) reasons.push("no how-we-work section");
    if (page.presence === "remote" && page.address) reasons.push("remote market must not carry an address");
  }
  return { ok: reasons.length === 0, words, reasons };
}
