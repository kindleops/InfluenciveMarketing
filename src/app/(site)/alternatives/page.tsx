import type { Metadata } from "next";
import { Hub } from "@/components/seo/Hub";
import { allEntries } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

export const metadata: Metadata = pageMetadata({
  title: "Alternatives",
  description: "Realistic alternatives to hiring an in-house team, a traditional agency, DIY website builders and freelance marketplaces — with the trade-offs of each.",
  path: "/alternatives",
});

export default function AlternativesHub() {
  const entries = allEntries().filter((e) => e.kind === "alternative");
  return (
    <Hub
      path="/alternatives"
      name="Alternatives"
      eyebrow="Alternatives"
      accent="violet"
      title={["Other ways", "to get it done."]}
      lead="If what you have isn’t working, these set out the realistic options — ours included — and how to choose between them."
      groups={[{ title: "Alternatives", entries }]}
      instrument={{ label: "Alternatives", items: entries.map((e) => e.title) }}
    />
  );
}
