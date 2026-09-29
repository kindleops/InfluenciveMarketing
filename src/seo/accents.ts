import type { Discipline } from "@/content/commercial/types";

/** Each discipline keeps the light role it has everywhere else on the site. */
export const DISCIPLINE_ACCENT: Record<Discipline, "brand" | "violet" | "cyan" | "gold"> = {
  brand: "gold",
  web: "violet",
  product: "violet",
  growth: "brand",
  organic: "cyan",
  intelligence: "brand",
  automation: "cyan",
  transformation: "gold",
};

export const DISCIPLINE_NAME: Record<Discipline, string> = {
  brand: "Brand",
  web: "Web",
  product: "Product",
  growth: "Growth",
  organic: "Organic",
  intelligence: "Intelligence",
  automation: "Automation",
  transformation: "Transformation",
};

/** The intake question each discipline answers, so a page's CTA opens the
    consultation already pointed at the right need. */
export const DISCIPLINE_NEED: Record<Discipline, string> = {
  brand: "brand",
  web: "website",
  product: "product",
  growth: "growth",
  organic: "seo",
  intelligence: "ai",
  automation: "automation",
  transformation: "unsure",
};

/** Light-field key for each accent. */
export const ACCENT_TONE = { brand: "blue", violet: "violet", cyan: "teal", gold: "gold" } as const;
