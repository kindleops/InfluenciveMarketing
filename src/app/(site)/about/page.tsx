import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { brand } from "@/config/brand";
import { PageHero } from "@/components/layout/PageHero";
import relaunch from "@/assets/plates/relaunch.jpg";
import { PointOfView } from "@/components/home/PointOfView";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { ProofSection } from "@/components/proof/Proof";
import { SectionHeading } from "@/components/ui/Typography";
import { AmbientGlow, Section } from "@/components/ui/Surface";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: `${brand.name} is a strategy, design and engineering company building connected growth systems.`,
};

const nature = [
  { word: "Studio", line: "The craft of a design studio.", detail: "Identity, interface and motion held to an editorial standard. Taste is not optional." },
  { word: "Consultancy", line: "The rigour of a strategy firm.", detail: "Diagnosis before prescription. Every recommendation traceable to evidence and a number." },
  { word: "Engineering", line: "The discipline of a product team.", detail: "Production-grade front-end, data and automation — built to be operated, not admired." },
];

const disciplines = [
  { name: "Strategy", detail: "Positioning, growth models, roadmaps and the business case behind them." },
  { name: "Brand & Design", detail: "Identity systems, art direction, interface and motion design." },
  { name: "Product", detail: "Research, UX architecture and design systems for software." },
  { name: "Engineering", detail: "Web platforms, front-end, integrations and internal tools." },
  { name: "Growth", detail: "Acquisition, lifecycle, SEO, content and experimentation." },
  { name: "Data & AI", detail: "Measurement, attribution, intelligence and applied AI workflows." },
];

const clients = [
  { name: "Venture-backed software", detail: "Series A to C companies whose product has outgrown their brand and site." },
  { name: "Scaling consumer brands", detail: "Businesses where acquisition costs are rising faster than revenue." },
  { name: "Professional & services firms", detail: "Teams whose growth is capped by manual operations." },
  { name: "Established companies", detail: "Organisations modernising their digital core without pausing the business." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        plate={relaunch}
        title={["The company", <em key="a" className="t-accent">behind the machine.</em>]}
        lead={`${brand.name} is a strategy, design and engineering company. We build the connected systems that let ambitious companies look better, sell better and operate better — at the same time.`}
      />

      <Section tone="void" labelledBy="nature-title">
        <AmbientGlow color="brand" size={1000} x="50%" y="50%" intensity={0.07} />
        <SectionHeading
          id="nature-title"
          eyebrow="What we are"
          layout="split"
          title={["Three companies,", <em key="a" className="t-accent">one standard.</em>]}
          lead="Most firms are great at one of these. The work only compounds when all three sit at the same table."
        />
        <div className={styles.nature}>
          {nature.map((n, i) => (
            <div key={n.word} className={styles.natureItem} data-reveal="up" style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}>
              <p className={styles.word}>{n.word}</p>
              <p className={styles.natureLine}>{n.line}</p>
              <p className={styles.natureDetail}>{n.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark" labelledBy="disciplines-title">
        <SectionHeading
          id="disciplines-title"
          eyebrow="Under one roof"
          layout="split"
          title={["Six disciplines.", <em key="a" className="t-accent">One team.</em>]}
          lead="Every engagement is staffed across the disciplines it needs, led by one accountable principal."
        />
        <ol className={styles.disciplines} role="list" data-stagger="">
          {disciplines.map((d, i) => (
            <li key={d.name}>
              <span className={styles.dIdx}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.dName}>{d.name}</span>
              <span className={styles.dDetail}>{d.detail}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="raised" labelledBy="clients-title">
        <SectionHeading
          id="clients-title"
          eyebrow="Who we work with"
          layout="split"
          title={["Built for companies", <em key="a" className="t-accent">with momentum.</em>]}
        />
        <div className={styles.clients}>
          {clients.map((c, i) => (
            <div
              key={c.name}
              className={`glass ${styles.client}`}
              data-level="2"
              data-interactive="true"
              data-pointer-light=""
              data-reveal="up"
              style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
            >
              <p className={styles.clientName}>{c.name}</p>
              <p className={styles.clientDetail}>{c.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <ProofSection />
      <PointOfView />
      <ProjectCTA />
    </>
  );
}
