export type Service = {
  id: string;
  index: string;
  name: string;
  statement: string;
  summary: string;
  offerings: string[];
  outcomes: string[];
  engagement: string;
  connects: string[];
};

export const services: Service[] = [
  {
    id: "brand",
    index: "01",
    name: "Brand",
    statement: "Make the company impossible to confuse.",
    summary:
      "We define what you stand for, how you sound and how you look — then codify it into a system every team and surface can use.",
    offerings: ["Brand strategy", "Positioning", "Messaging", "Visual identity", "Design systems", "Creative direction"],
    outcomes: ["Sharper positioning in a crowded category", "An identity built for digital first", "Guidelines that live in code, not PDFs"],
    engagement: "6–12 weeks · Foundation or rebrand",
    connects: ["Web", "Product", "Growth"],
  },
  {
    id: "web",
    index: "02",
    name: "Web",
    statement: "A website that works as hard as your best salesperson.",
    summary:
      "Marketing sites designed for clarity and engineered for performance, with CMS architecture that lets your team move without us.",
    offerings: ["Web design", "Web development", "Landing pages", "Conversion design", "Interactive experiences", "CMS architecture"],
    outcomes: ["Faster, measurably better-converting pages", "A modular system your team can extend", "Core Web Vitals treated as a design constraint"],
    engagement: "8–16 weeks · Platform build",
    connects: ["Brand", "Organic", "Intelligence"],
  },
  {
    id: "product",
    index: "03",
    name: "Product",
    statement: "Software that feels inevitable to use.",
    summary:
      "Product strategy, UX and interface design for SaaS and internal platforms — carried through to production-grade front-end.",
    offerings: ["Product strategy", "UX", "UI", "Design systems", "SaaS interfaces", "Prototypes", "Front-end implementation"],
    outcomes: ["Shorter time to first value", "A design system that speeds up every release", "Interfaces that reduce support load"],
    engagement: "Ongoing squads or 10–20 week programs",
    connects: ["Brand", "Automation", "Intelligence"],
  },
  {
    id: "growth",
    index: "04",
    name: "Growth",
    statement: "Demand as a system, not a campaign.",
    summary:
      "Acquisition, funnels and lifecycle programs designed together and run as a disciplined system of experiments.",
    offerings: ["Growth strategy", "Paid acquisition", "Funnels", "Lifecycle", "Demand generation", "Campaign systems"],
    outcomes: ["Lower blended acquisition cost", "Channels that reinforce each other", "A testing cadence that compounds learning"],
    engagement: "Retainer · Quarterly growth programs",
    connects: ["Web", "Intelligence", "Automation"],
  },
  {
    id: "organic",
    index: "05",
    name: "Organic",
    statement: "Visibility that compounds while you sleep.",
    summary:
      "Technical SEO, content strategy and programmatic publishing that build durable search presence and topical authority.",
    offerings: ["SEO", "Technical SEO", "Content strategy", "Programmatic SEO", "Authority building", "Local search"],
    outcomes: ["Non-brand organic growth", "Search architecture that scales with content", "Authority in the queries that matter"],
    engagement: "Retainer · 6-month minimum",
    connects: ["Web", "Brand", "Intelligence"],
  },
  {
    id: "intelligence",
    index: "06",
    name: "Intelligence",
    statement: "Know what is working. Know what to do next.",
    summary:
      "Measurement architecture, attribution and customer intelligence that turn scattered data into decisions leadership can act on.",
    offerings: ["Analytics", "Dashboards", "Attribution", "Customer intelligence", "Performance reporting", "Forecasting"],
    outcomes: ["One trusted source of performance truth", "Attribution that survives scrutiny", "Forecasts grounded in real cohorts"],
    engagement: "4–8 week build · Ongoing insight",
    connects: ["Growth", "Automation", "Transformation"],
  },
  {
    id: "automation",
    index: "07",
    name: "Automation",
    statement: "Give the team back its time.",
    summary:
      "AI and workflow automation across marketing, sales and operations — designed with guardrails and measured in hours returned.",
    offerings: ["AI workflows", "Marketing automation", "Sales automation", "Internal tools", "Agent workflows", "Operational automation"],
    outcomes: ["Faster speed-to-lead", "Fewer manual handoffs", "Copilots that know your business"],
    engagement: "Sprint-based · 3–10 weeks per system",
    connects: ["Growth", "Intelligence", "Product"],
  },
  {
    id: "transformation",
    index: "08",
    name: "Transformation",
    statement: "Rebuild the digital core — without stopping the business.",
    summary:
      "End-to-end modernisation of how a company presents, sells and operates online. Strategy, platforms and change, sequenced.",
    offerings: ["Digital strategy", "System modernization", "Growth infrastructure", "Internal platforms", "End-to-end transformation"],
    outcomes: ["A roadmap leadership can fund with confidence", "Legacy systems retired in sequence", "An operating model built to scale"],
    engagement: "Multi-phase · 6–18 months",
    connects: ["All disciplines"],
  },
];
