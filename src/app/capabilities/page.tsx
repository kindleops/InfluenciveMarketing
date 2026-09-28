import type { Metadata } from "next";
import { capabilityLayers } from "@/content/capabilities";
import { PageHero } from "@/components/layout/PageHero";
import { CapabilityStack } from "@/components/home/CapabilityStack";
import { ConnectedSystem } from "@/components/home/ConnectedSystem";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { SectionHeading } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Surface";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Capabilities",
  description: "Twelve capabilities across six layers — brand, experience, acquisition, conversion, automation and intelligence — built as one machine.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        accent="cyan"
        title={["The full stack", <em key="a" className="t-accent">of growth.</em>]}
        lead="Six layers, twelve capabilities, one operating system. We build each layer to feed the next — so improvements travel through the whole machine."
        meta={capabilityLayers.slice(0, 3).map((l) => ({ label: `Layer ${l.index}`, value: l.layer }))}
      />

      <Section tone="dark" labelledBy="stack-title" spacing="tight">
        <SectionHeading
          id="stack-title"
          eyebrow="The stack"
          layout="split"
          size="3"
          title={["Select a layer."]}
          lead="Each layer answers one question every growing company has to get right."
        />
        <CapabilityStack />
      </Section>

      <ConnectedSystem index="02" />

      <Section tone="dark" labelledBy="index-title">
        <SectionHeading
          id="index-title"
          eyebrow="Index"
          layout="split"
          title={["Every capability,", <em key="a" className="t-accent">in detail.</em>]}
        />
        <div className={styles.index}>
          {capabilityLayers.map((l) => (
            <section key={l.id} className={styles.layer} aria-labelledby={`idx-${l.id}`}>
              <div className={styles.layerHead} data-reveal="up">
                <span className={styles.layerIdx}>{l.index}</span>
                <h3 id={`idx-${l.id}`} className={styles.layerName}>
                  {l.layer}
                </h3>
                <p className={styles.layerQ}>{l.question}</p>
              </div>
              <div className={styles.caps}>
                {l.capabilities.map((c) => (
                  <div key={c.name} className={styles.cap} data-reveal="up">
                    <p className={styles.capName}>{c.name}</p>
                    <p className={styles.capLine}>{c.line}</p>
                    <ul role="list" className={styles.scope}>
                      {c.scope.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Section>

      <ProjectCTA />
    </>
  );
}
