import type { Metadata } from "next";
import { Hub } from "@/components/seo/Hub";
import { allEntries } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

export const metadata: Metadata = pageMetadata({
  title: "Compare",
  description: "Honest comparisons of the choices behind marketing investment: SEO or PPC, agency or in-house, freelancers, specialists, retainers and fractional leaders.",
  path: "/compare",
});

export default function CompareHub() {
  const entries = allEntries().filter((e) => e.kind === "compare");
  return (
    <Hub
      path="/compare"
      name="Compare"
      eyebrow="Compare"
      accent="violet"
      title={["Choices,", "compared honestly."]}
      lead="Side-by-side comparisons of the decisions companies make about how to grow — including the ones where the answer isn’t an agency."
      groups={[{ title: "Compare", entries }]}
      instrument={{ label: "Compare", items: entries.map((e) => e.title) }}
    />
  );
}
