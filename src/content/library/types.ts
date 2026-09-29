import type { Discipline, Faq, Item, Related } from "../commercial/types";

/**
 * The library: guides, playbooks and research. Same rules as the commercial
 * pages — no invented statistics, sources, clients or results. Facts that
 * come from a standard or a platform's documentation are stated as such.
 */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title: string; text: string }
  | { type: "checklist"; items: string[] }
  | { type: "steps"; items: Item[] }
  | { type: "table"; caption: string; columns: string[]; rows: string[][] };

export interface LibraryEntry {
  slug: string;
  title: string;
  dek: string;
  metaTitle: string;
  metaDescription: string;
  primaryQuery: string;
  secondaryQueries: string[];
  topic: Discipline;
  published: string;
  updated: string;
  body: ArticleBlock[];
  faqs?: Faq[];
  related: Related;
}

export interface Guide extends LibraryEntry {
  level: "Foundational" | "Intermediate" | "Advanced";
}

export interface Playbook extends LibraryEntry {
  atAGlance: { time: string; team: string; tools: string[]; output: string };
}

/**
 * Original research. A study is published only with its method stated in
 * full — sample, period, sources, limitations — and after review. Nothing
 * here is estimated to fill a chart.
 */
export interface Research extends LibraryEntry {
  methodology: { sample: string; period: string; sources: string[]; limitations: string[] };
  findings: { headline: string; detail: string }[];
  reviewed: boolean;
}
