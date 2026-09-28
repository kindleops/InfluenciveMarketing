import { Hero } from "@/components/hero/Hero";
import { Thesis } from "@/components/home/Thesis";
import { Platform } from "@/components/home/Platform";
import { ConnectedSystem } from "@/components/home/ConnectedSystem";
import { WorkReel } from "@/components/home/WorkReel";
import { ServiceIndex } from "@/components/home/ServiceIndex";
import { IntelligenceLayer } from "@/components/home/IntelligenceLayer";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { PointOfView } from "@/components/home/PointOfView";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { ProofSection } from "@/components/proof/Proof";
import { InsightList } from "@/components/insights/InsightList";
import { SectionHeading, TextLink } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Surface";
import { insights } from "@/content/insights";

/**
 * Narrative order — fewer, larger moments; each scene answers one question.
 *   Hero          Who are you?            (pinned push-in)
 *   Thesis        What do you believe?
 *   System        What do you build?      (pinned product story)
 *   Difference    Why are you different?  (pinned three-act diagram)
 *   Work          Can you prove it?       (pinned horizontal reel)
 *   Services      How can we engage?
 *   Intelligence  How advanced are you?
 *   Process       How do you operate?
 *   Point of view What do you stand for?
 *   Insights      How do you think?
 *   CTA           What should I do next?
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Thesis />
      <Platform />
      <ConnectedSystem />
      <WorkReel />
      <ServiceIndex />
      <IntelligenceLayer />

      <Section tone="dark" labelledBy="process-title" chapter="07|Approach">
        <ProcessTimeline />
      </Section>

      <PointOfView />
      <ProofSection />

      <Section tone="dark" labelledBy="insights-title" chapter="09|Insights">
        <SectionHeading
          id="insights-title"
          eyebrow="Insights"
          index="09"
          layout="split"
          title={["Thinking,", <em key="a" className="t-accent">in public.</em>]}
          lead="Notes on systems, intelligence and the craft of building companies people choose."
        />
        <div style={{ marginTop: "var(--space-9)" }}>
          <InsightList items={insights.slice(0, 3)} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--space-7)" }} data-reveal="up">
          <TextLink href="/insights">All insights</TextLink>
        </div>
      </Section>

      <ProjectCTA />
    </>
  );
}
