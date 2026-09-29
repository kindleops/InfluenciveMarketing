import type { Metadata } from "next";
import { Hub } from "@/components/seo/Hub";
import { allEntries } from "@/seo/registry";
import { guides } from "@/content/library/guides";
import { pageMetadata } from "@/seo/site";

export const metadata: Metadata = pageMetadata({
  title: "Guides",
  description: "Practical guides to SEO, migrations, attribution, landing pages and choosing an agency — written by the people who do the work, with no filler.",
  path: "/guides",
});

export default function GuidesHub() {
  const entries = allEntries().filter((e) => e.kind === "guide");
  const levels = ["Foundational", "Intermediate", "Advanced"] as const;
  return (
    <Hub
      path="/guides"
      name="Guides"
      eyebrow="Guides"
      accent="cyan"
      title={["Know how", "it actually works."]}
      lead="Explanations of the mechanics behind modern marketing — what to do, in what order, and why — so you can make better decisions whether or not you work with us."
      groups={levels.map((l) => ({
        title: l,
        entries: entries.filter((e) => guides.find((g) => g.slug === e.slug)?.level === l),
      }))}
      instrument={{ label: "Guides", items: entries.map((e) => e.title) }}
    />
  );
}
