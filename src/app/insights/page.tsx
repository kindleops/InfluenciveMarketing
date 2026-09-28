import type { Metadata } from "next";
import { insights } from "@/content/insights";
import { PageHero } from "@/components/layout/PageHero";
import { InsightList } from "@/components/insights/InsightList";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Section } from "@/components/ui/Surface";

export const metadata: Metadata = {
  title: "Insights",
  description: "Point of view on connected systems, applied AI and the craft of building companies people choose.",
};

export default function InsightsPage() {
  const sorted = [...insights].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero
        eyebrow="Insights"
        accent="violet"
        title={["Thinking,", <>in <em key="a" className="t-accent">public.</em></>]}
        lead="Notes on systems, intelligence and experience — written for operators who have to make these decisions, not for search engines."
      />
      <Section tone="dark" spacing="tight" labelledBy="articles-title">
        <h2 id="articles-title" className="sr-only">
          Articles
        </h2>
        <InsightList items={sorted} size="large" />
      </Section>
      <ProjectCTA />
    </>
  );
}
