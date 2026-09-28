import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { services } from "@/content/services";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceNav } from "@/components/services/ServiceNav";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { SectionHeading } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Surface";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services",
  description: "Brand, web, product, growth, organic, intelligence, automation and transformation — eight disciplines, one standard.",
};

const models = [
  {
    name: "Sprint",
    duration: "2–6 weeks",
    for: "A defined problem with a clear owner.",
    detail: "Diagnostics, a landing system, an automation, a design-system foundation. Fixed scope, fixed fee.",
  },
  {
    name: "Program",
    duration: "8–20 weeks",
    for: "A new brand, platform or product surface.",
    detail: "A dedicated senior team across strategy, design and engineering, shipping in weekly increments.",
  },
  {
    name: "Retainer",
    duration: "Ongoing",
    for: "Continuous growth and optimisation.",
    detail: "A standing squad running experiments, content, acquisition and automation against shared targets.",
  },
  {
    name: "Transformation",
    duration: "6–18 months",
    for: "Rebuilding the digital core.",
    detail: "Multi-phase roadmap, sequenced delivery and change management across teams and platforms.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        accent="violet"
        title={["Eight disciplines.", <em key="a" className="t-accent">One standard.</em>]}
        lead="Engage a single discipline or the whole system. Either way, every piece is designed to connect to — and strengthen — the rest."
      />

      <Section tone="dark" spacing="tight" labelledBy="disciplines-title">
        <h2 id="disciplines-title" className="sr-only">
          Disciplines
        </h2>
        <div className={styles.layout}>
          <aside className={styles.aside}>
            <ServiceNav />
          </aside>

          <div className={styles.chapters}>
            {services.map((s) => (
              <article key={s.id} id={s.id} className={styles.chapter} aria-labelledby={`${s.id}-name`}>
                <header className={styles.chapterHead}>
                  <span className={styles.idx}>{s.index}</span>
                  <h3 id={`${s.id}-name`} className={styles.name} data-reveal="up">
                    {s.name}
                  </h3>
                  <p className={styles.statement} data-reveal="up" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
                    {s.statement}
                  </p>
                </header>

                <p className={styles.summary} data-reveal="up">
                  {s.summary}
                </p>

                <div className={styles.columns}>
                  <div>
                    <p className={styles.colLabel}>What we do</p>
                    <ul role="list" className={styles.offerings} data-stagger="">
                      {s.offerings.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className={styles.colLabel}>What changes</p>
                    <ul role="list" className={styles.outcomes} data-stagger="">
                      {s.outcomes.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <footer className={styles.chapterFoot}>
                  <span>
                    <b>Format</b> {s.engagement}
                  </span>
                  <span className={styles.connects}>
                    <b>Connects to</b>
                    {s.connects.map((c) => (
                      <i key={c}>{c}</i>
                    ))}
                  </span>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="raised" labelledBy="models-title">
        <SectionHeading
          id="models-title"
          eyebrow="Ways to engage"
          layout="split"
          title={["Shaped around", <em key="a" className="t-accent">the problem.</em>]}
          lead="Four engagement models. Each is staffed by senior people and measured against outcomes agreed before work begins."
        />
        <ol className={styles.models} role="list">
          {models.map((m, i) => (
            <li
              key={m.name}
              className={`glass ${styles.model}`}
              data-level="2"
              data-interactive="true"
              data-pointer-light=""
              data-reveal="up"
              style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
            >
              <span className={styles.modelIdx}>{String(i + 1).padStart(2, "0")}</span>
              <p className={styles.modelName}>{m.name}</p>
              <p className={styles.modelDuration}>{m.duration}</p>
              <p className={styles.modelFor}>{m.for}</p>
              <p className={styles.modelDetail}>{m.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <ProjectCTA />
    </>
  );
}
