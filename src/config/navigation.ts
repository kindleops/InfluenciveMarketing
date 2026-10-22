export type NavItem = { label: string; href: string; description?: string };

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services", description: "AI, automation, engineering and growth" },
  { label: "Industries", href: "/industries", description: "How the work changes by market" },
  { label: "Work", href: "/work", description: "Systems we design and ship" },
  { label: "Research", href: "/research", description: "Reports, models and field guides" },
  { label: "Answers", href: "/answers", description: "Straight answers to common questions" },
  { label: "About", href: "/about", description: "Who we are" },
];

/** The Services flyout: what we build, grouped the way buyers look for it. */
export const servicesMenu: { title: string; items: NavItem[] }[] = [
  {
    title: "AI & Automation",
    items: [
      { label: "AI automation", href: "/services/ai-automation", description: "Agents and workflows across the business" },
      { label: "AI agent development", href: "/services/ai-agent-development", description: "Agents that use your tools, with guardrails" },
      { label: "Workflow automation", href: "/services/workflow-automation", description: "n8n, Make or custom code, monitored" },
      { label: "Custom AI & LLM apps", href: "/services/custom-ai-development", description: "Retrieval, chat and AI features" },
      { label: "Automation examples", href: "/automations", description: "Real tools, flows played end to end" },
    ],
  },
  {
    title: "Engineering",
    items: [
      { label: "Web app development", href: "/services/web-app-development", description: "SaaS products, portals, internal tools" },
      { label: "Front-end development", href: "/services/frontend-development", description: "React and Next.js interfaces" },
      { label: "Back-end & APIs", href: "/services/backend-development", description: "APIs, data, jobs and integrations" },
      { label: "Web design", href: "/services/web-design", description: "Marketing sites that convert" },
    ],
  },
  {
    title: "Growth",
    items: [
      { label: "SEO", href: "/services/seo" },
      { label: "Local SEO", href: "/services/local-seo" },
      { label: "Paid media", href: "/services/paid-media" },
      { label: "Conversion optimization", href: "/services/cro" },
      { label: "Marketing automation", href: "/services/marketing-automation" },
      { label: "Marketing analytics", href: "/services/marketing-analytics" },
    ],
  },
];

export const primaryCta: NavItem = { label: "Start a Project", href: "/start" };

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Services",
    items: [
      { label: "AI automation", href: "/services/ai-automation" },
      { label: "AI agent development", href: "/services/ai-agent-development" },
      { label: "Workflow automation", href: "/services/workflow-automation" },
      { label: "Custom AI & LLM apps", href: "/services/custom-ai-development" },
      { label: "Web app development", href: "/services/web-app-development" },
      { label: "Front-end development", href: "/services/frontend-development" },
      { label: "Back-end & APIs", href: "/services/backend-development" },
      { label: "SEO", href: "/services/seo" },
      { label: "Paid media", href: "/services/paid-media" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Industries",
    items: [
      { label: "Ecommerce", href: "/industries/ecommerce" },
      { label: "B2B SaaS", href: "/industries/b2b-saas" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Professional services", href: "/industries/professional-services" },
      { label: "Home services", href: "/industries/home-services" },
      { label: "Fintech", href: "/industries/fintech" },
      { label: "Law firms", href: "/industries/law-firms" },
      { label: "Real estate", href: "/industries/real-estate" },
      { label: "Dental & medical", href: "/industries/dental-medical-practices" },
      { label: "Multi-location", href: "/industries/multi-location" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Automation examples", href: "/automations" },
      { label: "Research", href: "/research" },
      { label: "Answers", href: "/answers" },
      { label: "Markets", href: "/locations" },
      { label: "Guides", href: "/guides" },
      { label: "Playbooks", href: "/playbooks" },
      { label: "Insights", href: "/insights" },
      { label: "Solutions", href: "/solutions" },
      { label: "Use cases", href: "/use-cases" },
      { label: "Compare", href: "/compare" },
      { label: "Alternatives", href: "/alternatives" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Work", href: "/work" },
      { label: "Capabilities", href: "/capabilities" },
      { label: "Approach", href: "/approach" },
      { label: "About", href: "/about" },
      { label: "Start a Project", href: "/start" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
