import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { PointOfView } from "@/components/home/PointOfView";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { SectionHeading } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Surface";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Approach",
  description: "Seven stages from diagnosis to scale — methodical by design, creative by nature.",
};

const working = [
  { title: "Senior by default", detail: "The people who shape the strategy are the people who do the work. No bait-and-switch after the pitch." },
  { title: "Weekly increments", detail: "Something real ships every week — a decision, a design, a release — so progress is visible, not promised." },
  { title: "One shared scoreboard", detail: "Targets agreed in Diagnose are tracked in a live dashboard both teams can see at any time." },
  { title: "Built to hand over", detail: "Documentation, systems and training so your team can run what we build — with or without us." },
];

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Approach"
        accent="gold"
        title={["Methodical by design.", <><em key="a" className="t-accent">Creative</em> by nature.</>]}
        lead="Seven stages, each with defined outputs. The creativity lives in the work; the process is deliberately predictable — so leadership always knows what happens next."
        meta={[
          { label: "Stages", value: "07" },
          { label: "Cadence", value: "Weekly" },
          { label: "Measured by", value: "Agreed outcomes" },
        ]}
      />

      <Section tone="dark" spacing="tight" labelledBy="process-stages">
        <h2 id="process-stages" className="sr-only">
          The seven stages
        </h2>
        <ProcessTimeline showHeading={false} />
      </Section>

      <Section tone="raised" labelledBy="working-title">
        <SectionHeading
          id="working-title"
          eyebrow="Working together"
          layout="split"
          title={["How it feels", <>from the <em key="a" className="t-accent">inside.</em></>]}
          lead="Rigour is only useful if it is visible. These are the commitments that shape every engagement."
        />
        <ol className={styles.working} role="list">
          {working.map((w, i) => (
            <li key={w.title} data-reveal="up" style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}>
              <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span>
              <p className={styles.title}>{w.title}</p>
              <p className={styles.detail}>{w.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <PointOfView />
      <ProjectCTA />
    </>
  );
}
