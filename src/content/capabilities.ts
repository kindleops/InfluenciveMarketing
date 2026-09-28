/**
 * The capability stack — twelve capabilities organised as six layers of one
 * machine. Order matters: each layer feeds the one after it.
 */
export type Capability = {
  name: string;
  line: string;
  scope: string[];
};

export type CapabilityLayer = {
  id: string;
  index: string;
  layer: string;
  question: string;
  summary: string;
  output: string;
  capabilities: Capability[];
};

export const capabilityLayers: CapabilityLayer[] = [
  {
    id: "brand",
    index: "01",
    layer: "Brand",
    question: "Why should anyone care?",
    summary:
      "Positioning, identity and language — the layer that decides whether everything downstream is noticed, trusted and remembered.",
    output: "A brand that earns attention before a word is read.",
    capabilities: [
      {
        name: "Brand",
        line: "Strategy, positioning and identity systems built to scale across every surface.",
        scope: ["Positioning", "Visual identity", "Messaging architecture", "Creative direction"],
      },
      {
        name: "Content",
        line: "Editorial systems that turn expertise into demand — not a content calendar.",
        scope: ["Content strategy", "Editorial systems", "Thought leadership", "Asset production"],
      },
    ],
  },
  {
    id: "experience",
    index: "02",
    layer: "Experience",
    question: "What does it feel like to engage?",
    summary:
      "The surfaces customers actually touch — websites, products, interfaces — designed as one coherent experience.",
    output: "Every surface feels like the same, exceptional company.",
    capabilities: [
      {
        name: "Web",
        line: "High-performance marketing sites engineered as growth infrastructure.",
        scope: ["Web design", "Development", "CMS architecture", "Interactive experience"],
      },
      {
        name: "Product",
        line: "Product strategy, UX and interface design for software people choose to use.",
        scope: ["Product UX", "Interface design", "Design systems", "Front-end build"],
      },
    ],
  },
  {
    id: "acquisition",
    index: "03",
    layer: "Acquisition",
    question: "How do the right people find you?",
    summary:
      "Paid, organic and owned channels orchestrated as a single demand system instead of competing line items.",
    output: "Predictable, compounding demand from the right accounts.",
    capabilities: [
      {
        name: "Growth",
        line: "Growth strategy, funnels and lifecycle programs tied to revenue, not vanity.",
        scope: ["Growth strategy", "Lifecycle", "Demand generation", "Funnel design"],
      },
      {
        name: "SEO",
        line: "Technical, content and programmatic search built for durable visibility.",
        scope: ["Technical SEO", "Programmatic SEO", "Authority", "Search architecture"],
      },
      {
        name: "Performance",
        line: "Paid acquisition run as a disciplined system of experiments and creative.",
        scope: ["Paid social", "Paid search", "Creative testing", "Budget modelling"],
      },
    ],
  },
  {
    id: "conversion",
    index: "04",
    layer: "Conversion",
    question: "Does attention become revenue?",
    summary:
      "The moments where interest turns into intent — designed, instrumented and tested continuously.",
    output: "More of the demand you already have becomes pipeline.",
    capabilities: [
      {
        name: "Conversion",
        line: "Conversion architecture, experimentation and the removal of friction at every step.",
        scope: ["CRO programs", "Experimentation", "Offer design", "Intake flows"],
      },
    ],
  },
  {
    id: "automation",
    index: "05",
    layer: "Automation",
    question: "What happens after someone raises their hand?",
    summary:
      "Workflows and AI systems that route, qualify, follow up and operate — so the team spends its time on judgement.",
    output: "Operations that run at the speed of demand.",
    capabilities: [
      {
        name: "Automation",
        line: "Marketing, sales and operational workflows that remove repetitive work.",
        scope: ["Lead routing", "CRM workflows", "Lifecycle automation", "Internal tools"],
      },
      {
        name: "AI",
        line: "Applied AI as infrastructure — agents, copilots and decision systems with guardrails.",
        scope: ["Agent workflows", "Internal copilots", "Content operations", "Classification"],
      },
    ],
  },
  {
    id: "intelligence",
    index: "06",
    layer: "Intelligence",
    question: "What is actually working — and what next?",
    summary:
      "Measurement, attribution and customer intelligence that close the loop and inform every other layer.",
    output: "Decisions made on evidence. Every layer gets smarter.",
    capabilities: [
      {
        name: "Analytics",
        line: "Measurement plans, tracking infrastructure and attribution you can trust.",
        scope: ["Tracking architecture", "Attribution", "Dashboards", "Data pipelines"],
      },
      {
        name: "Intelligence",
        line: "Customer and market intelligence that turns data into direction.",
        scope: ["Customer insight", "Forecasting", "Cohort analysis", "Reporting systems"],
      },
    ],
  },
];

export const allCapabilities = capabilityLayers.flatMap((l) =>
  l.capabilities.map((c) => ({ ...c, layer: l.layer, layerId: l.id })),
);
