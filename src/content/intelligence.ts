export type StepKind = "auto" | "ai" | "decision" | "human" | "learn";

export type Scenario = {
  id: string;
  label: string;
  input: { title: string; lines: string[] };
  steps: { name: string; detail: string; kind: StepKind }[];
  outcome: string;
};

/** Example workflows. Content is illustrative of how systems are designed. */
export const scenarios: Scenario[] = [
  {
    id: "lead",
    label: "Inbound lead",
    input: {
      title: "Demo request",
      lines: ["Source · pricing page", "Company · Series B, 120 people", "Note · “Evaluating vendors for Q3”"],
    },
    steps: [
      { name: "Enrich", detail: "Firmographics, tech stack, prior visits", kind: "auto" },
      { name: "Classify", detail: "Intent: active evaluation", kind: "ai" },
      { name: "Score", detail: "Fit 0.86 against ICP model", kind: "ai" },
      { name: "Decide", detail: "≥ 0.70 → enterprise pod", kind: "decision" },
      { name: "Act", detail: "CRM opportunity · owner alerted · brief attached", kind: "auto" },
      { name: "Learn", detail: "Outcome feeds the scoring model", kind: "learn" },
    ],
    outcome: "Routed with context in under a minute. Zero manual steps.",
  },
  {
    id: "support",
    label: "Support request",
    input: {
      title: "Billing question",
      lines: ["Account · enterprise tier", "Channel · email", "Topic · invoice adjustment"],
    },
    steps: [
      { name: "Classify", detail: "Billing · urgency medium", kind: "ai" },
      { name: "Retrieve", detail: "Contract terms, invoice history", kind: "auto" },
      { name: "Draft", detail: "Reply with cited sources", kind: "ai" },
      { name: "Checkpoint", detail: "Confidence 0.64 < 0.80 → human review", kind: "human" },
      { name: "Act", detail: "Approved, sent, ticket resolved", kind: "auto" },
      { name: "Learn", detail: "Edits captured as guidance", kind: "learn" },
    ],
    outcome: "A person makes the call — with the work already done.",
  },
  {
    id: "content",
    label: "Content brief",
    input: {
      title: "Topic cluster",
      lines: ["Theme · revenue operations", "Goal · non-brand demand", "Voice · brand system v2"],
    },
    steps: [
      { name: "Research", detail: "Search landscape and competitor gaps", kind: "auto" },
      { name: "Outline", detail: "Structure against brand voice rules", kind: "ai" },
      { name: "Draft", detail: "First version with sources", kind: "ai" },
      { name: "Checkpoint", detail: "Editor review and expert input", kind: "human" },
      { name: "Publish", detail: "CMS, schema and internal links", kind: "auto" },
      { name: "Measure", detail: "Rankings and assisted conversions", kind: "learn" },
    ],
    outcome: "Editors spend their time on judgement, not blank pages.",
  },
];

export const useCases = [
  { name: "Lead routing & scoring", detail: "Every inbound request enriched, scored and routed in seconds." },
  { name: "Internal copilots", detail: "Answers grounded in company knowledge — with sources." },
  { name: "Content operations", detail: "Research, drafting and publishing inside brand guardrails." },
  { name: "Customer intelligence", detail: "Signals from product, CRM and web unified into one view." },
  { name: "Reporting automation", detail: "Leadership dashboards that refresh themselves." },
  { name: "Decision support", detail: "Recommendations with confidence, never black boxes." },
];
