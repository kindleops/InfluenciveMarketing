import type { MetadataRoute } from "next";
import { SITE } from "@/seo/site";
import { allEntries, published } from "@/seo/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const core = ["", "/work", "/capabilities", "/services", "/approach", "/insights", "/about", "/start", "/privacy", "/terms"];
  const hubs = [
    "/industries",
    "/solutions",
    "/use-cases",
    "/compare",
    "/alternatives",
    "/guides",
    "/playbooks",
    // Hubs with nothing in them stay out until they do.
    ...(published.research.length ? ["/research"] : []),
    ...(published.locations.length ? ["/locations"] : []),
  ];
  const priority: Record<string, number> = { service: 0.8, combo: 0.7, industry: 0.7, solution: 0.7, "use-case": 0.6, compare: 0.6, alternative: 0.6, location: 0.6, guide: 0.6, playbook: 0.6, research: 0.6, insight: 0.5, work: 0.6 };
  return [
    ...core.map((p) => ({ url: `${SITE}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...hubs.map((p) => ({ url: `${SITE}${p}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...allEntries().map((e) => ({ url: `${SITE}${e.path}`, lastModified: e.updated, priority: priority[e.kind] ?? 0.5 })),
  ];
}
