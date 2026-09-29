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
  | { type: "table"; caption: string; columns: string[]; rows: string[][] }
  /** A single sentence set large — the line a reader should leave with. */
  | { type: "pullquote"; text: string }
  | { type: "figure"; title: string; caption: string; figure: Figure };

/**
 * Figures. Any figure that carries numbers is either `illustrative` (a
 * worked example with stated inputs — labelled as such wherever it renders)
 * or cites a `source` the reader can check. Nothing is estimated to fill a
 * chart.
 */
export type Figure =
  /** Stages of a system or a decision, left to right. */
  | { kind: "flow"; steps: { label: string; detail: string }[] }
  /** One quantity split into parts, e.g. a budget. Values are shares of the total. */
  | { kind: "stack"; illustrative: true; total: string; parts: { label: string; value: number; detail: string }[] }
  /** Comparable magnitudes. */
  | { kind: "bars"; illustrative: true; unit: string; rows: { label: string; value: number; note?: string }[] }
  /** Named formulas, each with what it means. */
  | { kind: "formula"; lines: { label: string; expr: string; means: string }[] }
  /** A 2×2: two axes, four named quadrants (top-left, top-right, bottom-left, bottom-right). */
  | { kind: "matrix"; x: [string, string]; y: [string, string]; quadrants: [Quadrant, Quadrant, Quadrant, Quadrant] }
  /** An interactive model the reader runs with their own numbers. */
  | { kind: "calculator"; model: "paid-search-economics" };

export interface Quadrant {
  label: string;
  detail: string;
}

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
 * Research: the publication. Four formats, one standard of honesty.
 *   analysis   an argument built from how the work actually goes
 *   model      economics worked through with stated, adjustable inputs
 *   blueprint  how a system is put together, with an illustrative example
 *   study      original data — published only with its method in full and
 *              after review. Nothing is estimated to fill a chart.
 * Every report states its `basis`: what it rests on, and what it doesn't.
 */
export type ReportFormat = "analysis" | "model" | "blueprint" | "study";

export interface Research extends LibraryEntry {
  format: ReportFormat;
  /** Position in the series: 1 → "No. 01". Unique. */
  number: number;
  /** Three to five claims the report supports, in the order it makes them. */
  keyPoints: string[];
  /** What the report rests on — and, where relevant, what it isn't. */
  basis: string;
  /** Required for a study. */
  methodology?: { sample: string; period: string; sources: string[]; limitations: string[] };
  reviewed: boolean;
}

/**
 * A study in design: announced with its question and protocol, never with
 * results. Listed on the research hub; it has no page until it is a study.
 */
export interface StudyInDesign {
  title: string;
  question: string;
  protocol: string[];
  status: "In design" | "Collecting data" | "In analysis";
  topic: Discipline;
}
