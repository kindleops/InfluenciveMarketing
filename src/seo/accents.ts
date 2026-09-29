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
