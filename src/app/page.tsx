import { Hero } from "@/components/hero/Hero";
import { Platform } from "@/components/home/Platform";
import { Thesis } from "@/components/home/Thesis";
import { CapabilityStack } from "@/components/home/CapabilityStack";
import { ConnectedSystem } from "@/components/home/ConnectedSystem";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServiceIndex } from "@/components/home/ServiceIndex";
import { IntelligenceLayer } from "@/components/home/IntelligenceLayer";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { PointOfView } from "@/components/home/PointOfView";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { ProofSection } from "@/components/proof/Proof";
import { InsightList } from "@/components/insights/InsightList";
import { SectionHeading, TextLink } from "@/components/ui/Typography";
import { AmbientGlow, Section } from "@/components/ui/Surface";
import { insights } from "@/content/insights";

/**
 * Narrative order — each scene answers one question:
 *   Hero          Who are you?
 *   Thesis        What do you believe?
 *   Capabilities  What can you do?
 *   Difference    Why are you different?
 *   Work          Can you prove it?
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

      <Section tone="dark" labelledBy="capabilities-title">
        <AmbientGlow color="brand" size={900} x="85%" y="55%" intensity={0.08} />
        <SectionHeading
          id="capabilities-title"
          eyebrow="Capabilities"
          index="03"
          aside="6 layers · 12 capabilities"
          layout="split"
          title={["Twelve capabilities.", <em key="a" className="t-accent">Built to connect.</em>]}
          lead="We build every layer of modern growth — and, more importantly, the connections between them. Select a layer to see what it does."
        />
        <CapabilityStack />
      </Section>

      <ConnectedSystem />
      <SelectedWork />
      <ServiceIndex />
      <IntelligenceLayer />

      <Section tone="dark" labelledBy="process-title">
        <ProcessTimeline />
      </Section>

      <PointOfView />
      <ProofSection />

      <Section tone="dark" labelledBy="insights-title">
        <SectionHeading
          id="insights-title"
          eyebrow="Insights"
          index="10"
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
