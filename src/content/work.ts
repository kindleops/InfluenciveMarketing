/**
 * Work.
 *
 * Two kinds of entry share one model:
 *
 *   kind: "blueprint"   — an engagement model: the system we build for a
 *                         recurring type of company. No client is named and no
 *                         result is claimed. `signals` lists what we measure.
 *   kind: "case-study"  — published client work. `client` and `results` are
 *                         required and must be real, verified and approved.
 *
 * Components render results only when they exist. Never fabricate a client,
 * a logo or a number to fill a slot — the layout is designed to hold its
 * shape without them.
 */
export type WorkVisual = "identity" | "growth" | "operations" | "product";

export type WorkResult = { value: string; label: string; context?: string };

export type WorkItem = {
  slug: string;
  kind: "blueprint" | "case-study";
  title: string;
  client?: string;
  archetype: string;
  engagement: string;
  disciplines: string[];
  duration: string;
  summary: string;
  challenge: string;
  approach: { step: string; detail: string }[];
  system: { name: string; detail: string }[];
  signals: string[];
  results?: WorkResult[];
  testimonial?: { quote: string; name: string; role: string };
  visual: WorkVisual;
  accent: "brand" | "violet" | "cyan" | "gold";
};

export const work: WorkItem[] = [
  {
    slug: "the-relaunch",
    kind: "blueprint",
    title: "The Relaunch",
    archetype: "Venture-backed B2B software, post-Series A",
    engagement: "Brand + Web system",
    disciplines: ["Brand", "Web", "Content", "Conversion"],
    duration: "10–14 weeks",
    summary:
      "For companies whose product has outgrown its brand. We rebuild positioning, identity and the marketing site as one system — so the story sales tells is the story the market sees.",
    challenge:
      "The product has matured faster than the brand. The website explains features instead of value, every page is a one-off, and the sales deck carries the narrative the site should.",
    approach: [
      { step: "Diagnose", detail: "Customer interviews, win/loss analysis and a competitive narrative audit." },
      { step: "Architect", detail: "Positioning, messaging hierarchy and a sitemap organised around buyer intent." },
      { step: "Design", detail: "Identity system and a modular page library built for the CMS." },
      { step: "Build", detail: "Headless site with performance budgets, analytics and experimentation baked in." },
    ],
    system: [
      { name: "Positioning architecture", detail: "Category, value and proof — one source for every team." },
      { name: "Identity system", detail: "Type, colour, motion and layout principles, codified as tokens." },
      { name: "Design system in code", detail: "The same components power the site, decks and product marketing." },
      { name: "Conversion paths", detail: "Intent-specific journeys for each buyer profile." },
    ],
    signals: ["Demo request rate", "Pipeline sourced by web", "Non-brand organic traffic", "Time to publish a page"],
    visual: "identity",
    accent: "brand",
  },
  {
    slug: "the-growth-engine",
    kind: "blueprint",
    title: "The Growth Engine",
    archetype: "Subscription or DTC business scaling paid spend",
    engagement: "Acquisition + Conversion + Analytics",
    disciplines: ["Growth", "Performance", "Conversion", "Analytics"],
    duration: "Ongoing · quarterly programs",
    summary:
      "For companies spending more to grow less. We rebuild measurement first, then connect acquisition, landing experience and lifecycle into one system that learns every week.",
    challenge:
      "Acquisition costs are rising, attribution disagrees with itself, and landing pages are rebuilt for every campaign. Each channel is optimised in isolation, so the whole underperforms.",
    approach: [
      { step: "Diagnose", detail: "Tracking audit, cohort economics and a channel-by-channel contribution model." },
      { step: "Architect", detail: "Measurement plan, server-side tracking and a unified attribution view." },
      { step: "Design", detail: "Modular landing system and offer architecture per audience and intent." },
      { step: "Optimize", detail: "A weekly experimentation cadence across creative, page and lifecycle." },
    ],
    system: [
      { name: "Measurement layer", detail: "Server-side events, clean conversion signals and one source of truth." },
      { name: "Landing system", detail: "A component library for launching tested pages in hours, not weeks." },
      { name: "Experiment engine", detail: "Hypothesis backlog, prioritisation and a shared results library." },
      { name: "Lifecycle flows", detail: "Onboarding, activation and win-back sequences tied to behaviour." },
    ],
    signals: ["Blended CAC", "Conversion rate by entry path", "Payback period", "Experiment velocity"],
    visual: "growth",
    accent: "cyan",
  },
  {
    slug: "the-operating-layer",
    kind: "blueprint",
    title: "The Operating Layer",
    archetype: "Services firm or marketplace running on manual operations",
    engagement: "Automation + AI + Intelligence",
    disciplines: ["Automation", "AI", "Analytics", "Intelligence"],
    duration: "3–10 week sprints",
    summary:
      "For companies whose growth is capped by manual work. We design the workflows, AI systems and dashboards that let the same team handle multiples of the volume.",
    challenge:
      "Leads are routed by hand, reporting is assembled in spreadsheets on Friday, and institutional knowledge lives in a few inboxes. The team is busy — and the bottleneck.",
    approach: [
      { step: "Diagnose", detail: "Process mapping, time studies and a ranked automation opportunity map." },
      { step: "Architect", detail: "System design with human checkpoints, fallbacks and audit trails." },
      { step: "Build", detail: "Workflows, integrations and AI components shipped in weekly increments." },
      { step: "Scale", detail: "Monitoring, evaluation and a roadmap for the next layer of automation." },
    ],
    system: [
      { name: "Intake & routing", detail: "Enrichment, scoring and routing to the right owner in seconds." },
      { name: "Qualification agent", detail: "AI-assisted triage with confidence thresholds and human review." },
      { name: "Internal copilot", detail: "Answers grounded in company knowledge, with sources." },
      { name: "Live operations view", detail: "Pipeline, capacity and throughput in one dashboard." },
    ],
    signals: ["Speed to lead", "Hours returned per week", "Qualification accuracy", "Forecast confidence"],
    visual: "operations",
    accent: "violet",
  },
  {
    slug: "the-product-surface",
    kind: "blueprint",
    title: "The Product Surface",
    archetype: "B2B platform with complex workflows",
    engagement: "Product + Design system",
    disciplines: ["Product", "Brand", "Web"],
    duration: "12–20 weeks",
    summary:
      "For software that has grown feature by feature. We re-architect the experience, build the design system and ship the front-end — so the product feels as considered as the company behind it.",
    challenge:
      "Years of shipping have left inconsistent patterns, slow onboarding and a design debt that makes every release harder. Customers value the product but struggle to use it.",
    approach: [
      { step: "Diagnose", detail: "Usability research, behavioural analytics and a pattern inventory." },
      { step: "Architect", detail: "Information architecture and the core flows that define value." },
      { step: "Design", detail: "A token-based design system and high-fidelity key journeys." },
      { step: "Build", detail: "Production components delivered alongside your engineering team." },
    ],
    system: [
      { name: "Experience architecture", detail: "Navigation and flows organised around jobs, not features." },
      { name: "Design system", detail: "Tokens, components and documentation shared by design and code." },
      { name: "Onboarding", detail: "Guided first-run experience built around the first moment of value." },
      { name: "Component library", detail: "Accessible, tested front-end primitives ready for production." },
    ],
    signals: ["Activation rate", "Time to first value", "Support tickets per account", "Design-to-dev cycle time"],
    visual: "product",
    accent: "gold",
  },
];

export const featuredWork = work.slice(0, 3);
export const getWork = (slug: string) => work.find((w) => w.slug === slug);
