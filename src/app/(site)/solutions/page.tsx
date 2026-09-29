import type { Metadata } from "next";
import { Hub } from "@/components/seo/Hub";
import { allEntries } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description: "Outcomes we’re hired for — a website redesign, a rebrand, more qualified leads, lower acquisition cost, trustworthy attribution and a go-to-market plan.",
  path: "/solutions",
});

export default function SolutionsHub() {
  const entries = allEntries().filter((e) => e.kind === "solution");
  return (
    <Hub
      path="/solutions"
      name="Solutions"
      eyebrow="Solutions"
      accent="brand"
      title={["Start from", "the outcome."]}
      lead="Most engagements begin with a result a company needs, not a list of services. Each of these sets out what the outcome looks like, the signs you need it, and how we get there."
      groups={[{ title: "Solutions", entries }]}
      instrument={{ label: "Solutions", items: entries.map((e) => e.title) }}
    />
  );
}
