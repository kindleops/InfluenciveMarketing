import type { Metadata } from "next";
import { Hub } from "@/components/seo/Hub";
import { allEntries } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description: "How we approach marketing for high-ticket industries — law firms, real estate, dental and medical practices, multi-location brands, B2B SaaS, fintech and more.",
  path: "/industries",
});

export default function IndustriesHub() {
  const entries = allEntries().filter((e) => e.kind === "industry");
  return (
    <Hub
      path="/industries"
      name="Industries"
      eyebrow="Industries"
      accent="gold"
      title={["Same system.", "Different physics."]}
      lead="Every market has its own economics, rules and buying behavior. These pages set out how the work changes in each — what matters, what goes wrong, and where we’d start."
      groups={[{ title: "Industries", entries }]}
      instrument={{ label: "Industries", items: entries.map((e) => e.title) }}
    />
  );
}
