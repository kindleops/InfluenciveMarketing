import type { Metadata } from "next";
import { insights } from "@/content/insights";
import { PageHero } from "@/components/layout/PageHero";
import { LightSlabs } from "@/components/layout/HeroVisuals";
import { InsightCards } from "@/components/insights/InsightCards";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Section } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/Typography";
import { Cards } from "@/components/seo/blocks";
import { allEntries } from "@/seo/registry";

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
        visual={<LightSlabs />}
        title={["Thinking,", <em key="a" className="t-accent">in public.</em>]}
        lead="Notes on systems, intelligence and experience — written for operators who have to make these decisions, not for search engines."
      />
      <Section tone="dark" spacing="tight" labelledBy="articles-title">
        <h2 id="articles-title" className="sr-only">
          Articles
        </h2>
        <InsightCards items={sorted} />
      </Section>
      <Section tone="raised" labelledBy="library-title">
        <SectionHeading
          id="library-title"
          eyebrow="The library"
          layout="split"
          title={["Guides and", <em key="a" className="t-accent">playbooks.</em>]}
          lead="Where insights argue a point of view, the library shows the method: practical guides and the operating playbooks behind the work."
        />
        <Cards entries={allEntries().filter((e) => e.kind === "guide" || e.kind === "playbook")} label="Guides and playbooks" />
      </Section>
      <ProjectCTA />
    </>
  );
}
