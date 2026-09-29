import type { Metadata } from "next";
import { Hub } from "@/components/seo/Hub";
import { seoStyles as s } from "@/components/seo/blocks";
import { allEntries, published } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

const empty = published.research.length === 0;

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description: "Original research on how growth systems perform. Every study states its sample, period, sources and limitations in full.",
  path: "/research",
  // Kept out of the index until there's a study to read.
  noindex: empty,
});

export default function ResearchHub() {
  const entries = allEntries().filter((e) => e.kind === "research");
  return (
    <Hub
      path="/research"
      name="Research"
      eyebrow="Research"
      accent="brand"
      title={["Evidence,", "not anecdotes."]}
      lead="Original studies with their method stated in full: the sample, the period, the sources, and what the data can’t tell you."
      groups={[{ title: "Research", entries }]}
      empty={
        <div className={s.empty}>
          <p>No studies are published yet.</p>
          <p>
            We only publish research with a complete, reviewed methodology. Until then, our <a href="/guides">guides</a> and{" "}
            <a href="/playbooks">playbooks</a> set out how we work.
          </p>
        </div>
      }
    />
  );
}
