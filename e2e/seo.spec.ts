import { test, expect } from "@playwright/test";
import { servicePages } from "@/content/commercial/services";
import { industryPages } from "@/content/commercial/industries";
import { solutionPages } from "@/content/commercial/solutions";
import { useCasePages } from "@/content/commercial/use-cases";
import { comparePages } from "@/content/commercial/compare";
import { alternativePages } from "@/content/commercial/alternatives";
import { locationPages } from "@/content/commercial/locations";
import { comboPages } from "@/content/commercial/combos";
import { guides } from "@/content/library/guides";
import { playbooks } from "@/content/library/playbooks";
import { research } from "@/content/library/research";
import { gate, textOf, type GateKind } from "@/seo/quality";
import { allEntries, brokenRelated, publishedCombos } from "@/seo/registry";

/*
 * The commercial SEO and library layer. Content rules first (no network),
 * then what search engines actually receive.
 */

type Authored = { kind: GateKind; id: string; page: Parameters<typeof gate>[1] };
const authored: Authored[] = [
  ...servicePages.map((p) => ({ kind: "service" as const, id: `/services/${p.slug}`, page: p as never })),
  ...industryPages.map((p) => ({ kind: "industry" as const, id: `/industries/${p.slug}`, page: p as never })),
  ...solutionPages.map((p) => ({ kind: "solution" as const, id: `/solutions/${p.slug}`, page: p as never })),
  ...useCasePages.map((p) => ({ kind: "use-case" as const, id: `/use-cases/${p.slug}`, page: p as never })),
  ...comparePages.map((p) => ({ kind: "compare" as const, id: `/compare/${p.slug}`, page: p as never })),
  ...alternativePages.map((p) => ({ kind: "alternative" as const, id: `/alternatives/${p.slug}`, page: p as never })),
  ...locationPages.map((p) => ({ kind: "location" as const, id: `/locations/${p.slug}`, page: p as never })),
  ...comboPages.map((p) => ({ kind: "combo" as const, id: `/services/${p.service}/${p.industry}`, page: p as never })),
  ...guides.map((p) => ({ kind: "guide" as const, id: `/guides/${p.slug}`, page: p as never })),
  ...playbooks.map((p) => ({ kind: "playbook" as const, id: `/playbooks/${p.slug}`, page: p as never })),
  ...research.map((p) => ({ kind: "research" as const, id: `/research/${p.slug}`, page: p as never })),
];

function shingles(text: string, n = 5) {
  const w = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i + n <= w.length; i++) out.add(w.slice(i, i + n).join(" "));
  return out;
}
function jaccard(a: Set<string>, b: Set<string>) {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter || 1);
}

test.describe("seo content rules", () => {
  test("every authored page clears the publishing gate", () => {
    const failing = authored.map((a) => ({ id: a.id, g: gate(a.kind, a.page) })).filter((x) => !x.g.ok);
    expect(failing.map((f) => `${f.id}: ${f.g.reasons.join("; ")}`)).toEqual([]);
  });

  test("every related link resolves to a live page", () => {
    expect(brokenRelated()).toEqual([]);
  });

  test("one primary query and one title per page", () => {
    const queries = new Map<string, string>();
    const titles = new Map<string, string>();
    const dupes: string[] = [];
    for (const a of authored) {
      const q = String(a.page.primaryQuery ?? "").toLowerCase();
      const t = String(a.page.metaTitle).toLowerCase();
      if (q && queries.has(q)) dupes.push(`query "${q}": ${queries.get(q)} and ${a.id}`);
      if (titles.has(t)) dupes.push(`title "${t}": ${titles.get(t)} and ${a.id}`);
      queries.set(q, a.id);
      titles.set(t, a.id);
    }
    expect(dupes).toEqual([]);
  });

  test("no two pages are near-duplicates", () => {
    const docs = authored.map((a) => ({ id: a.id, sh: shingles(textOf(a.page)) }));
    const close: string[] = [];
    let worst = 0;
    for (let i = 0; i < docs.length; i++)
      for (let j = i + 1; j < docs.length; j++) {
        const s = jaccard(docs[i].sh, docs[j].sh);
        worst = Math.max(worst, s);
        if (s > 0.08) close.push(`${docs[i].id} ~ ${docs[j].id}: ${s.toFixed(3)}`);
      }
    console.log(`max 5-gram overlap between any two pages: ${worst.toFixed(3)}`);
    expect(close).toEqual([]);
  });

  test("no invented proof, statistics or hype", () => {
    const banned = [
      /\btrusted by\b/i,
      /\baward[- ]winning\b/i,
      /\bindustry[- ]leading\b/i,
      /\bbest[- ]in[- ]class\b/i,
      /\bworld[- ]class\b/i,
      /\bcutting[- ]edge\b/i,
      /\bour clients\b/i,
      /\bwe(’|')ve helped\b/i,
      /\bproven (results|track record)\b/i,
      /\b(studies|research) (show|shows|found|suggests)\b/i,
      /\baccording to\b/i,
      /\d+(\.\d+)?\s?%/,
      /\b\d+x\b/i,
    ];
    const hits: string[] = [];
    for (const a of authored) {
      const text = textOf(a.page);
      for (const r of banned) {
        const m = text.match(r);
        if (m) hits.push(`${a.id}: "${m[0]}"`);
      }
      // Refusing, questioning or warning about guarantees is fine; making one is not.
      for (const sentence of text.split(/(?<=[.!?])\s+|\n/)) {
        if (!/guarantee/i.test(sentence)) continue;
        const refuses = /\?\s*$|\b(don[’']t|not|no|never|can[’']t|won[’']t|anyone|agency that|red flags?|wary|encourages|rewards)\b/i.test(sentence);
        if (!refuses) hits.push(`${a.id}: "${sentence.slice(0, 100)}"`);
      }
    }
    expect(hits).toEqual([]);
  });

  test("gated collections stay unpublished until they have real entries", () => {
    // Locations: only places the studio genuinely operates. Research: a
    // study (original data) only with a complete, reviewed methodology; every
    // other report states what it rests on.
    for (const l of locationPages) {
      expect(["office", "team", "remote"]).toContain(l.presence);
      // A remote market says so, in the page and in its answers.
      if (l.presence === "remote") {
        expect(l.address, l.slug).toBeUndefined();
        expect(`${textOf(l.remote)} ${textOf(l.faqs)}`, l.slug).toMatch(/\bremote(ly)?\b/i);
      }
      for (const x of l.sectors) expect(allEntries().some((e) => e.kind === "industry" && e.slug === x.industry), `${l.slug} → ${x.industry}`).toBe(true);
      for (const x of l.services) expect(allEntries().some((e) => e.kind === "service" && e.slug === x), `${l.slug} → ${x}`).toBe(true);
    }
    for (const r of research) {
      expect(r.basis.length, r.slug).toBeGreaterThan(40);
      if (r.format === "study") {
        expect(r.reviewed, r.slug).toBe(true);
        expect(r.methodology?.sources.length, r.slug).toBeGreaterThan(0);
      }
    }
    expect(new Set(research.map((r) => r.number)).size).toBe(research.length);
  });

  test("numbers in figures are labelled as illustrative", () => {
    // The types force it for stacks and bars; this catches a figure kind
    // added later that carries numbers without the label.
    const unlabelled: string[] = [];
    for (const e of [...guides, ...playbooks, ...research])
      for (const b of e.body)
        if (b.type === "figure" && /\d/.test(JSON.stringify(b.figure)) && !("illustrative" in b.figure) && b.figure.kind !== "calculator")
          unlabelled.push(`${e.slug}: ${b.title}`);
    expect(unlabelled).toEqual([]);
  });
});

const livePaths = () => allEntries().filter((e) => e.kind !== "insight" && e.kind !== "work").map((e) => e.path);
const HUBS = [
  "/industries",
  "/solutions",
  "/use-cases",
  "/compare",
  "/alternatives",
  "/guides",
  "/playbooks",
  ...(locationPages.length ? ["/locations"] : []),
  ...(research.length ? ["/research"] : []),
];

test.describe("seo rendering", () => {
  // Checked on the server HTML — what a crawler receives before any script runs.
  test("every page ships a canonical, one h1, valid JSON-LD and breadcrumbs", async ({ request }) => {
    test.setTimeout(300_000);
    const problems: string[] = [];
    for (const path of [...HUBS, ...livePaths()]) {
      const res = await request.get(path);
      if (res.status() !== 200) {
        problems.push(`${path}: status ${res.status()}`);
        continue;
      }
      const html = await res.text();
      const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
      if (h1s !== 1) problems.push(`${path}: ${h1s} h1`);
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      if (!canonical || new URL(canonical).pathname !== path) problems.push(`${path}: canonical ${canonical}`);
      const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
      if (desc.length < 100) problems.push(`${path}: description ${desc.length} chars`);
      const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
      try {
        const types = blocks.map((b) => JSON.parse(b)["@type"]);
        if (!types.includes("BreadcrumbList")) problems.push(`${path}: no BreadcrumbList`);
      } catch {
        problems.push(`${path}: JSON-LD does not parse`);
      }
      if (!/aria-label="Breadcrumb"/.test(html)) problems.push(`${path}: no breadcrumb nav`);
      // No premises is claimed where there isn't one.
      const market = locationPages.find((l) => path === `/locations/${l.slug}`);
      if (market && market.presence !== "office" && /PostalAddress/.test(html)) problems.push(`${path}: address markup on a ${market.presence} market`);
      if (/noindex/.test(html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "")) problems.push(`${path}: noindex`);
    }
    expect(problems).toEqual([]);
  });

  test("sitemap lists every live page and nothing gated", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    for (const p of [...HUBS, ...livePaths()]) expect(urls, p).toContain(p);
    if (!locationPages.length) expect(urls).not.toContain("/locations");
    if (!research.length) expect(urls).not.toContain("/research");
    expect(new Set(urls).size).toBe(urls.length);
  });

  test("unpublished routes 404 and empty hubs are not indexed", async ({ page, request }) => {
    if (!locationPages.length) expect((await request.get("/locations")).status()).toBe(404);
    expect((await request.get("/services/not-a-service")).status()).toBe(404);
    const unbuilt = ["seo/fintech", "branding/home-services"].find((c) => !publishedCombos.some((x) => `${x.service}/${x.industry}` === c));
    if (unbuilt) expect((await request.get(`/services/${unbuilt}`)).status()).toBe(404);
    if (!research.length) {
      await page.goto("/research");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    }
  });

  test("internal links from the new pages all resolve", async ({ request }) => {
    test.setTimeout(300_000);
    const seen = new Set<string>();
    for (const path of [...HUBS, ...livePaths()]) {
      const html = await (await request.get(path)).text();
      const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
      for (const m of main.matchAll(/href="(\/[^"#?]*)/g)) seen.add(m[1]);
    }
    const broken: string[] = [];
    for (const h of seen) {
      const r = await request.get(h);
      if (r.status() !== 200) broken.push(`${h} → ${r.status()}`);
    }
    expect(broken).toEqual([]);
  });
});
