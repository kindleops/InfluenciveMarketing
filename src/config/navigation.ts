export type NavItem = { label: string; href: string; description?: string };

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work", description: "Systems we design and ship" },
  { label: "Capabilities", href: "/capabilities", description: "The full stack of growth" },
  { label: "Services", href: "/services", description: "Eight connected disciplines" },
  { label: "Approach", href: "/approach", description: "How engagements run" },
  { label: "Insights", href: "/insights", description: "Point of view" },
  { label: "About", href: "/about", description: "Who we are" },
];

export const primaryCta: NavItem = { label: "Start a Project", href: "/start" };

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Capabilities",
    items: [
      { label: "Brand", href: "/services#brand" },
      { label: "Web", href: "/services#web" },
      { label: "Product", href: "/services#product" },
      { label: "Growth", href: "/services#growth" },
      { label: "Organic", href: "/services#organic" },
      { label: "Intelligence", href: "/services#intelligence" },
      { label: "Automation", href: "/services#automation" },
      { label: "Transformation", href: "/services#transformation" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Work", href: "/work" },
      { label: "Approach", href: "/approach" },
      { label: "About", href: "/about" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "Start a Project", href: "/start" },
      { label: "Capability map", href: "/capabilities" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
