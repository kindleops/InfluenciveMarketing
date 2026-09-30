/**
 * Commercial search pages.
 *
 * Every page type has its own shape, so each page carries its own substance
 * rather than a template filled with a keyword. Rules for anything added
 * here (enforced in part by e2e/seo.spec.ts):
 *
 *  - No invented numbers, clients, results, testimonials, awards, prices,
 *    team sizes or office locations. Describe how the work is done, not a
 *    track record we can't show.
 *  - One primary query per page, never shared with another page.
 *  - Every section is written for this page. If a page can only be produced
 *    by swapping a keyword into another page's copy, it shouldn't exist.
 */

/** Shared by every commercial page. */
export interface SeoMeta {
  slug: string;
  /** ≤ 60 characters. The brand is appended by the root template. */
  metaTitle: string;
  /** 120–160 characters. */
  metaDescription: string;
  /** The search this page exists to answer. Unique across the site. */
  primaryQuery: string;
  secondaryQueries: string[];
  /** ISO date of the last substantive edit. */
  updated: string;
}

export interface Hero {
  eyebrow: string;
  /** Two lines; the second is set in the quieter tone. */
  title: [string, string];
  lead: string;
}

export interface Item {
  title: string;
  detail: string;
}

export interface Faq {
  q: string;
  a: string;
}

/** Links to other pages by collection + slug; resolved and checked at build. */
export interface Related {
  services?: string[];
  industries?: string[];
  solutions?: string[];
  useCases?: string[];
  compare?: string[];
  alternatives?: string[];
  guides?: string[];
  playbooks?: string[];
  research?: string[];
  answers?: string[];
  insights?: string[];
  work?: string[];
}

export type Discipline = "brand" | "web" | "product" | "growth" | "organic" | "intelligence" | "automation" | "transformation";

/* ---- /services/[slug] — high-intent service landing pages -------------- */
export interface ServicePage extends SeoMeta {
  name: string;
  /** Which of the eight disciplines this sits in (drives art + cross-links). */
  discipline: Discipline;
  hero: Hero;
  /** Why most attempts at this fall short; what good looks like. */
  problem: { heading: string; body: string[] };
  included: Item[];
  approach: Item[];
  /** What we measure — shown as the page's instrument panel. */
  measures: string[];
  fit: { for: string[]; notFor: string[] };
  engagement: { model: string; duration: string; team: string };
  faqs: Faq[];
  related: Related;
}

/* ---- /industries/[slug] ------------------------------------------------ */
export interface IndustryPage extends SeoMeta {
  name: string;
  hero: Hero;
  context: { heading: string; body: string[] };
  challenges: Item[];
  channels: { channel: string; role: string }[];
  metrics: Item[];
  firstNinetyDays: Item[];
  faqs: Faq[];
  related: Related;
}

/* ---- /solutions/[slug] — an outcome, packaged ------------------------- */
export interface SolutionPage extends SeoMeta {
  name: string;
  hero: Hero;
  outcome: string;
  signs: string[];
  plan: Item[];
  deliverables: string[];
  measures: string[];
  faqs: Faq[];
  related: Related;
}

/* ---- /use-cases/[slug] — a situation a company is in ------------------ */
export interface UseCasePage extends SeoMeta {
  name: string;
  hero: Hero;
  situation: { heading: string; body: string[] };
  risks: Item[];
  plan: Item[];
  checklist: string[];
  faqs: Faq[];
  related: Related;
}

/* ---- /compare/[slug] — two ways of doing something -------------------- */
export interface ComparePage extends SeoMeta {
  name: string;
  hero: Hero;
  options: [{ name: string; summary: string }, { name: string; summary: string }];
  criteria: { criterion: string; a: string; b: string }[];
  chooseA: string[];
  chooseB: string[];
  /** The honest answer, including when the answer is "both". */
  verdict: string;
  faqs: Faq[];
  related: Related;
}

/* ---- /alternatives/[slug] --------------------------------------------- */
export interface AlternativePage extends SeoMeta {
  name: string;
  hero: Hero;
  /** What people are looking to replace, and why. */
  replacing: { heading: string; body: string[] };
  reasons: string[];
  options: { name: string; bestFor: string; tradeoffs: string }[];
  howToDecide: string[];
  faqs: Faq[];
  related: Related;
}

/* ---- /locations/[slug] — market pages --------------------------------- */
/**
 * A page for a market the studio serves. `presence` says how, and the page
 * never overstates it: "office" (a real address, shown and marked up),
 * "team" (people who live and work there) or "remote" (we serve the market
 * without a premises there). A remote market carries no address and no
 * LocalBusiness markup, and its copy never implies an office or local staff;
 * it doesn't need to announce the distance either.
 *
 * A market page is not a city name swapped into a template — that is a
 * doorway page. Every section is about this place: its economy and buyers,
 * how search and paid media behave here, the state and local rules that
 * change the marketing, and the surrounding area it covers. The
 * near-duplicate test in e2e/seo.spec.ts holds every page to that.
 */
export interface LocationPage extends SeoMeta {
  city: string;
  /** State or province, spelled out. */
  region: string;
  regionCode: string;
  country: string;
  presence: "office" | "team" | "remote";
  /** Street address — required when presence is "office". */
  address?: string;
  /** e.g. "Eastern Time". */
  timeZone: string;
  /** Northeast, South, Midwest, West — groups the hub. */
  area: string;
  hero: Hero;
  /** The market: its economy and buyers, and what that means for growth here. */
  market: { heading: string; body: string[] };
  /** How search, paid media and buying behave in this market. */
  landscape: Item[];
  /** Industries (by slug) that matter most here, and why. */
  sectors: { industry: string; note: string }[];
  /** State and local rules that change the marketing. */
  rules: Item[];
  /** Nearby cities, suburbs and counties the page covers. */
  serviceArea: string[];
  /** How engagements run for companies in this market: hours, cadence, rhythm. */
  howWeWork: { heading: string; body: string[] };
  /** Service slugs to feature for this market. */
  services: string[];
  faqs: Faq[];
  related: Related;
}

/* ---- /services/[service]/[industry] — programmatic, gated ------------- */
/**
 * A service × industry page is published only when it has content specific
 * to that pairing — why the service works differently in this industry,
 * what to prioritize, what goes wrong — and passes the quality gate.
 */
export interface ComboPage {
  service: string;
  industry: string;
  metaTitle: string;
  metaDescription: string;
  primaryQuery: string;
  updated: string;
  lead: string;
  /** Why this service is different in this industry. */
  angle: string[];
  priorities: Item[];
  pitfalls: Item[];
  measures: string[];
  faqs: Faq[];
}

/* ---- /answers/[slug] — one question, answered ---------------------------- */
/**
 * A page for a question people actually ask (from search suggestions), built
 * to be the best answer on the web and the one AI answers quote: the answer
 * first, in plain words; the reasoning after; related questions below.
 * Same honesty rules as everything else — where the true answer is "it
 * depends", the page says what it depends on and how to work it out.
 */
export type AnswerTopic = "SEO" | "Local SEO" | "AI search" | "Paid media" | "Agencies" | "Websites & CRO" | "Brand" | "Measurement" | "Content & email" | "Industries";

export interface AnswerPage extends SeoMeta {
  /** The question as people type it, cleaned up. The page's h1. */
  question: string;
  topic: AnswerTopic;
  /** 35–80 words. Direct, complete, quotable on its own. */
  shortAnswer: string;
  /** Three to five takeaways. */
  keyPoints: string[];
  /** Two to four sections that earn the answer. */
  sections: {
    heading: string;
    body: string[];
    list?: string[];
    table?: { caption: string; columns: string[]; rows: string[][] };
  }[];
  faqs: Faq[];
  related: Related;
}
