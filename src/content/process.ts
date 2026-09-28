export type Stage = {
  index: string;
  name: string;
  line: string;
  detail: string;
  outputs: string[];
};

export const process: Stage[] = [
  {
    index: "01",
    name: "Diagnose",
    line: "Find the constraint before designing anything.",
    detail:
      "Stakeholder and customer interviews, analytics and funnel review, technical audit and competitive teardown. We look for the one or two constraints that limit everything else.",
    outputs: ["Diagnostic report", "Opportunity map", "Baseline metrics"],
  },
  {
    index: "02",
    name: "Architect",
    line: "Design the system on paper first.",
    detail:
      "Positioning, information architecture, measurement plan and technical approach — decided together, so brand, experience and data fit before a pixel is drawn.",
    outputs: ["System blueprint", "Measurement plan", "Roadmap & sequencing"],
  },
  {
    index: "03",
    name: "Design",
    line: "Make it unmistakable, then make it usable.",
    detail:
      "Identity, interface and content designed as a system. Every decision is traceable to the architecture and tested with real users where it matters.",
    outputs: ["Design system", "Key journeys", "Prototype"],
  },
  {
    index: "04",
    name: "Build",
    line: "Engineered to the same standard as it is designed.",
    detail:
      "Production front-end, CMS, integrations and automation, shipped in weekly increments with performance budgets, accessibility and analytics built in — not bolted on.",
    outputs: ["Production release", "Component library", "Integrations"],
  },
  {
    index: "05",
    name: "Launch",
    line: "A launch is a controlled experiment.",
    detail:
      "Staged rollout, QA across devices, redirect and search migration, and a monitoring plan. Launch day is quiet because the work happened before it.",
    outputs: ["Launch plan", "Migration & QA", "Live dashboards"],
  },
  {
    index: "06",
    name: "Optimize",
    line: "Evidence over opinion, every week.",
    detail:
      "Experimentation across pages, offers, creative and lifecycle. Results feed a shared library so learning compounds instead of disappearing into slide decks.",
    outputs: ["Experiment backlog", "Results library", "Monthly review"],
  },
  {
    index: "07",
    name: "Scale",
    line: "Extend what works. Automate what repeats.",
    detail:
      "New channels, markets and automations layered onto a proven system — with the documentation and ownership your team needs to run it without us.",
    outputs: ["Scale roadmap", "Automation layer", "Team enablement"],
  },
];
