import type { Metadata } from "next";
import { work } from "@/content/work";
import { PageHero } from "@/components/layout/PageHero";
import { CaseStudyPreview } from "@/components/work/CaseStudyPreview";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { ProofSection } from "@/components/proof/Proof";
import { Section } from "@/components/ui/Surface";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Work",
  description: "The connected systems we design and build — brand, web, product, growth, automation and intelligence.",
};

export default function WorkPage() {
  const caseStudies = work.filter((w) => w.kind === "case-study");
  const blueprints = work.filter((w) => w.kind === "blueprint");

  return (
    <>
      <PageHero
        eyebrow="Work"
        title={["Systems we", <>design <em key="a" className="t-accent">and ship.</em></>]}
        lead="Every engagement is a connected system — measured against the numbers that matter to the business, not the deliverables that were promised."
        meta={[
          { label: "Engagement models", value: blueprints.length },
          { label: "Disciplines", value: "Brand → Intelligence" },
          { label: "Measured by", value: "Business outcomes" },
        ]}
      />

      {caseStudies.length > 0 && (
        <Section tone="dark" labelledBy="cases-title" spacing="tight">
          <h2 id="cases-title" className={styles.groupTitle}>
            Case studies
          </h2>
          <div className={styles.list}>
            {caseStudies.map((item, i) => (
              <CaseStudyPreview key={item.slug} item={item} index={i} layout="feature" />
            ))}
          </div>
        </Section>
      )}

      <Section tone="dark" labelledBy="blueprints-title" spacing="tight">
        <div className={styles.groupHead}>
          <h2 id="blueprints-title" className={styles.groupTitle}>
            Engagement blueprints
          </h2>
          <p className={styles.note} data-reveal="fade">
            Blueprints describe the systems we build for recurring types of company and exactly how each is measured.
            Client case studies are published only with permission and verified results.
          </p>
        </div>
        <div className={styles.list}>
          {blueprints.map((item, i) => (
            <CaseStudyPreview key={item.slug} item={item} index={i} layout="feature" />
          ))}
        </div>
      </Section>

      <ProofSection />
      <ProjectCTA />
    </>
  );
}
