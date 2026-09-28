import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { insights } from "@/content/insights";
import { work } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.url.replace(/\/$/, "");
  const pages = ["", "/work", "/capabilities", "/services", "/approach", "/insights", "/about", "/start", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...work.map((w) => ({ url: `${base}/work/${w.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...insights.map((i) => ({ url: `${base}/insights/${i.slug}`, lastModified: i.date, priority: 0.5 })),
  ];
}
