import { servicePages } from "@/content/commercial/services";
import { industryPages } from "@/content/commercial/industries";
import { solutionPages } from "@/content/commercial/solutions";
import { useCasePages } from "@/content/commercial/use-cases";
import { comparePages } from "@/content/commercial/compare";
import { alternativePages } from "@/content/commercial/alternatives";
import { locationPages } from "@/content/commercial/locations";
import { comboPages } from "@/content/commercial/combos";
import { answerPages } from "@/content/commercial/answers";
import type { ComboPage, Related } from "@/content/commercial/types";
import { guides } from "@/content/library/guides";
import { playbooks } from "@/content/library/playbooks";
import { research } from "@/content/library/research";
import { insights } from "@/content/insights";
import { work } from "@/content/work";
import { gate, textOf, type GateKind } from "./quality";

/*
 * One registry for every search-facing page: what's published, where it
 * lives, and how pages link to each other. Routes, hubs, the sitemap and the
 * tests all read from here, so a page is either fully live or not at all.
 */

const pass = <T extends { metaTitle: string; metaDescription: string }>(kind: GateKind, list: T[]) =>
  list.filter((p) => gate(kind, p as unknown as Parameters<typeof gate>[1]).ok);

export const published = {
  services: pass("service", servicePages),
  industries: pass("industry", industryPages),
  solutions: pass("solution", solutionPages),
  useCases: pass("use-case", useCasePages),
  compare: pass("compare", comparePages),
  alternatives: pass("alternative", alternativePages),
  locations: pass("location", locationPages),
  guides: pass("guide", guides),
  playbooks: pass("playbook", playbooks),
  research: pass("research", research),
  answers: pass("answer", answerPages),
};

export const serviceBySlug = (s: string) => published.services.find((p) => p.slug === s);
export const industryBySlug = (s: string) => published.industries.find((p) => p.slug === s);

/** Combos publish only when both parents are live and the pairing clears the gate. */
export const publishedCombos: ComboPage[] = comboPages.filter(
  (c) => serviceBySlug(c.service) && industryBySlug(c.industry) && gate("combo", c as unknown as Parameters<typeof gate>[1]).ok,
);
export const comboTitle = (c: ComboPage) => `${serviceBySlug(c.service)!.name} for ${industryBySlug(c.industry)!.name}`;

export type Kind =
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
  | "answer"
  | "insight"
  | "work";

export const KIND_LABEL: Record<Kind, string> = {
  service: "Service",
  combo: "Service",
  industry: "Industry",
  solution: "Solution",
  "use-case": "Use case",
  compare: "Comparison",
  alternative: "Alternatives",
  location: "Market",
  guide: "Guide",
  playbook: "Playbook",
  research: "Research",
  answer: "Answer",
  insight: "Insight",
  work: "Work",
};

export interface Entry {
  kind: Kind;
  slug: string;
  path: string;
  title: string;
  summary: string;
  primaryQuery?: string;
  updated?: string;
  /** Body text, for duplicate detection. */
  text: string;
}

const lib = (base: string, kind: Kind) => (p: { slug: string; title: string; dek: string; primaryQuery: string; updated: string }) => ({
  kind,
  slug: p.slug,
  path: `${base}/${p.slug}`,
  title: p.title,
  summary: p.dek,
  primaryQuery: p.primaryQuery,
  updated: p.updated,
  text: textOf(p),
});

export function allEntries(): Entry[] {
  return [
    ...published.services.map((p) => ({ kind: "service" as const, slug: p.slug, path: `/services/${p.slug}`, title: p.name, summary: p.hero.lead, primaryQuery: p.primaryQuery, updated: p.updated, text: textOf(p) })),
    ...publishedCombos.map((c) => ({
      kind: "combo" as const,
      slug: `${c.service}/${c.industry}`,
      path: `/services/${c.service}/${c.industry}`,
      title: comboTitle(c),
      summary: c.lead,
      primaryQuery: c.primaryQuery,
      updated: c.updated,
      text: textOf(c),
    })),
    ...published.industries.map((p) => ({ kind: "industry" as const, slug: p.slug, path: `/industries/${p.slug}`, title: p.name, summary: p.hero.lead, primaryQuery: p.primaryQuery, updated: p.updated, text: textOf(p) })),
    ...published.solutions.map((p) => ({ kind: "solution" as const, slug: p.slug, path: `/solutions/${p.slug}`, title: p.name, summary: p.hero.lead, primaryQuery: p.primaryQuery, updated: p.updated, text: textOf(p) })),
    ...published.useCases.map((p) => ({ kind: "use-case" as const, slug: p.slug, path: `/use-cases/${p.slug}`, title: p.name, summary: p.hero.lead, primaryQuery: p.primaryQuery, updated: p.updated, text: textOf(p) })),
    ...published.compare.map((p) => ({ kind: "compare" as const, slug: p.slug, path: `/compare/${p.slug}`, title: p.name, summary: p.hero.lead, primaryQuery: p.primaryQuery, updated: p.updated, text: textOf(p) })),
    ...published.alternatives.map((p) => ({ kind: "alternative" as const, slug: p.slug, path: `/alternatives/${p.slug}`, title: p.name, summary: p.hero.lead, primaryQuery: p.primaryQuery, updated: p.updated, text: textOf(p) })),
    ...published.locations.map((p) => ({ kind: "location" as const, slug: p.slug, path: `/locations/${p.slug}`, title: p.city, summary: p.hero.lead, primaryQuery: p.primaryQuery, updated: p.updated, text: textOf(p) })),
    ...published.guides.map(lib("/guides", "guide")),
    ...published.playbooks.map(lib("/playbooks", "playbook")),
    ...published.research.map(lib("/research", "research")),
    ...published.answers.map((p) => ({ kind: "answer" as const, slug: p.slug, path: `/answers/${p.slug}`, title: p.question, summary: p.shortAnswer, primaryQuery: p.primaryQuery, updated: p.updated, text: textOf(p) })),
    ...insights.map((i) => ({ kind: "insight" as const, slug: i.slug, path: `/insights/${i.slug}`, title: i.title, summary: i.dek, updated: i.date, text: textOf(i.body) })),
    ...work.map((w) => ({ kind: "work" as const, slug: w.slug, path: `/work/${w.slug}`, title: w.title, summary: w.summary, text: textOf(w.summary) })),
  ];
}

const RELATED_KIND: Record<keyof Related, Kind> = {
  services: "service",
  industries: "industry",
  solutions: "solution",
  useCases: "use-case",
  compare: "compare",
  alternatives: "alternative",
  guides: "guide",
  playbooks: "playbook",
  research: "research",
  answers: "answer",
  insights: "insight",
  work: "work",
};

/** Related links that point at live pages, in the order given. */
export function resolveRelated(related: Related, exclude?: string): Entry[] {
  const all = allEntries();
  const out: Entry[] = [];
  for (const [key, slugs] of Object.entries(related) as [keyof Related, string[] | undefined][]) {
    for (const slug of slugs ?? []) {
      const e = all.find((x) => x.kind === RELATED_KIND[key] && x.slug === slug);
      if (e && e.path !== exclude && !out.includes(e)) out.push(e);
    }
  }
  return out;
}

/** Related references that don't resolve — surfaced by the tests. */
export function brokenRelated(): string[] {
  const all = allEntries();
  const sources: { from: string; related: Related }[] = [
    ...servicePages.map((p) => ({ from: `/services/${p.slug}`, related: p.related })),
    ...industryPages.map((p) => ({ from: `/industries/${p.slug}`, related: p.related })),
    ...solutionPages.map((p) => ({ from: `/solutions/${p.slug}`, related: p.related })),
    ...useCasePages.map((p) => ({ from: `/use-cases/${p.slug}`, related: p.related })),
    ...comparePages.map((p) => ({ from: `/compare/${p.slug}`, related: p.related })),
    ...alternativePages.map((p) => ({ from: `/alternatives/${p.slug}`, related: p.related })),
    ...guides.map((p) => ({ from: `/guides/${p.slug}`, related: p.related })),
    ...playbooks.map((p) => ({ from: `/playbooks/${p.slug}`, related: p.related })),
    ...research.map((p) => ({ from: `/research/${p.slug}`, related: p.related })),
    ...answerPages.map((p) => ({ from: `/answers/${p.slug}`, related: p.related })),
  ];
  const broken: string[] = [];
  for (const s of sources)
    for (const [key, slugs] of Object.entries(s.related) as [keyof Related, string[] | undefined][])
      for (const slug of slugs ?? []) if (!all.some((x) => x.kind === RELATED_KIND[key] && x.slug === slug)) broken.push(`${s.from} → ${key}:${slug}`);
  return broken;
}

/** Pages that link to `path` — used for reverse links ("Also relevant"). */
export function combosFor(opts: { service?: string; industry?: string }) {
  return publishedCombos.filter((c) => (!opts.service || c.service === opts.service) && (!opts.industry || c.industry === opts.industry));
}
