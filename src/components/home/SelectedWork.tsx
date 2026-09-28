import { featuredWork, work } from "@/content/work";
import { CaseStudyPreview } from "@/components/work/CaseStudyPreview";
import { SectionHeading, TextLink } from "@/components/ui/Typography";
import { AmbientGlow, Section } from "@/components/ui/Surface";
import styles from "./SelectedWork.module.css";

/** Work — "Can you prove it?" */
export function SelectedWork() {
  const [feature, ...rest] = featuredWork;
  const hasCaseStudies = work.some((w) => w.kind === "case-study");

  return (
    <Section tone="dark" labelledBy="work-title" className={styles.section}>
      <AmbientGlow color="brand" size={1100} x="80%" y="12%" intensity={0.09} />
      <SectionHeading
        id="work-title"
        eyebrow="Selected work"
        index="05"
        layout="split"
        title={["Systems,", <em key="a" className="t-accent">not deliverables.</em>]}
        lead={
          hasCaseStudies
            ? "Selected engagements — each a connected system, measured against the numbers that matter to the business."
            : "Engagement blueprints: the systems we build for recurring types of company, and exactly how each is measured. Client case studies are published with permission."
        }
      />

      <div className={styles.feature}>
        <CaseStudyPreview item={feature} index={0} layout="feature" />
      </div>

      <div className={styles.pair}>
        {rest.map((item, i) => (
          <CaseStudyPreview key={item.slug} item={item} index={i + 1} />
        ))}
      </div>

      <div className={styles.more} data-reveal="up">
        <TextLink href="/work">All work &amp; blueprints</TextLink>
      </div>
    </Section>
  );
}
