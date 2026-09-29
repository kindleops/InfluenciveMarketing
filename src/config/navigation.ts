export type NavItem = { label: string; href: string; description?: string };

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work", description: "Systems we design and ship" },
  { label: "Capabilities", href: "/capabilities", description: "The full stack of growth" },
  { label: "Services", href: "/services", description: "Eight connected disciplines" },
  { label: "Industries", href: "/industries", description: "How the work changes by market" },
  { label: "Approach", href: "/approach", description: "How engagements run" },
  { label: "Research", href: "/research", description: "Reports, models and field guides" },
  { label: "About", href: "/about", description: "Who we are" },
];

export const primaryCta: NavItem = { label: "Start a Project", href: "/start" };

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Services",
    items: [
      { label: "SEO", href: "/services/seo" },
      { label: "Local SEO", href: "/services/local-seo" },
      { label: "Paid media", href: "/services/paid-media" },
      { label: "Web design", href: "/services/web-design" },
      { label: "Conversion optimization", href: "/services/cro" },
      { label: "Branding", href: "/services/branding" },
      { label: "Content marketing", href: "/services/content-marketing" },
      { label: "Email & lifecycle", href: "/services/email-marketing" },
      { label: "Marketing analytics", href: "/services/marketing-analytics" },
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
      { label: "Research", href: "/research" },
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
