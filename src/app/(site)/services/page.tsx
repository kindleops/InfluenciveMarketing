import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { services } from "@/content/services";
import { PageHero } from "@/components/layout/PageHero";
import { DisciplineWall } from "@/components/layout/HeroVisuals";
import { ServiceNav } from "@/components/services/ServiceNav";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { ServiceArt } from "@/components/home/ServiceArt";
import { SectionHeading } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Surface";
import { Cards } from "@/components/seo/blocks";
import { allEntries } from "@/seo/registry";
import { servicesMenu } from "@/config/navigation";

const GROUP_TITLES: Record<string, [string, React.ReactNode]> = {
  "AI & Automation": ["Agents and automation", <em key="a" className="t-accent">that hold up in production.</em>],
  Engineering: ["Software,", <em key="a" className="t-accent">front end to back end.</em>],
  Growth: ["The growth layer,", <em key="a" className="t-accent">wired into the system.</em>],
};
const GROUP_LEADS: Record<string, string> = {
  "AI & Automation": "Agents that use your tools, workflows that never drop a step, and AI features built on your own data, each shipped with evaluation, guardrails and a person where it matters.",
  Engineering: "Web apps, portals and internal tools in TypeScript, React and Next.js, on APIs and data models your team can own and extend.",
  Growth: "Search, paid media, conversion and analytics, run against the same data your agents and apps produce.",
};
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services",
  description: "AI agents, workflow automation and software engineering, front end to back end, plus the brand and growth work around them. One senior team, one standard.",
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
        visual={<DisciplineWall />}
        title={["Build it. Automate it.", <em key="a" className="t-accent">Grow it.</em>]}
        lead="AI agents and automation that take work off your team, the software they run inside, and the growth work that brings demand to it. Engage one piece or the whole system."
      />

      {servicesMenu.map((g, i) => {
        const hrefs = g.items.map((x) => x.href);
        const entries = allEntries().filter((e) => e.kind === "service" && hrefs.includes(e.path));
        if (!entries.length) return null;
        const id = `group-${i}`;
        return (
          <Section key={g.title} tone="dark" spacing="tight" labelledBy={id}>
            <SectionHeading id={id} eyebrow={g.title} layout="split" title={GROUP_TITLES[g.title] ?? [g.title, ""]} lead={GROUP_LEADS[g.title]} />
            <Cards entries={entries} label={g.title} />
          </Section>
        );
      })}
      {(() => {
        const listed = new Set(servicesMenu.flatMap((g) => g.items.map((x) => x.href)));
        const rest = allEntries().filter((e) => e.kind === "service" && !listed.has(e.path));
        return rest.length ? (
          <Section tone="dark" spacing="tight" labelledBy="group-more">
            <SectionHeading id="group-more" eyebrow="Brand & content" layout="split" title={["Brand, content", <em key="a" className="t-accent">and lifecycle.</em>]} lead="The identity, content and channels that give the system something worth saying." />
            <Cards entries={rest} label="Brand and content services" />
          </Section>
        ) : null;
      })()}

      <Section tone="dark" spacing="tight" labelledBy="disciplines-title">
        <SectionHeading id="disciplines-title" eyebrow="Disciplines" layout="split" title={["How the pieces", <em key="a" className="t-accent">connect.</em>]} lead="Behind the services sit eight disciplines. Each is designed to feed the next, so an agent, the app it lives in and the growth around it improve together." />
        <div className={styles.layout}>
          <aside className={styles.aside}>
            <ServiceNav />
          </aside>

          <div className={styles.chapters}>
            {services.map((s) => (
              <article key={s.id} id={s.id} className={styles.chapter} aria-labelledby={`${s.id}-name`}>
                <div className={styles.chapterTop}>
                  <header className={styles.chapterHead}>
                    <span className={styles.idx}>{s.index}</span>
                    <h3 id={`${s.id}-name`} className={styles.name} data-reveal="up">
                      {s.name}
                    </h3>
                    <p className={styles.statement} data-reveal="up" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
                      {s.statement}
                    </p>
                  </header>
                  <div className={styles.artStage} data-reveal="scale" data-pause-offscreen="" aria-hidden="true">
                    <span className={styles.artLight} />
                    <ServiceArt id={s.id} />
                    <span className={styles.artMeta}>
                      <span>{s.index} / 08</span>
                      <span>{s.engagement}</span>
                    </span>
                  </div>
                </div>

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
