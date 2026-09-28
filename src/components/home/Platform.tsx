import { SystemConsole } from "@/components/hero/SystemConsole";
import { SectionHeading } from "@/components/ui/Typography";
import { AmbientGlow, Section } from "@/components/ui/Surface";
import styles from "./Platform.module.css";

/**
 * The product shot. The whole system in one interface — presented the way
 * software companies present flagship products: centred, lit, generous.
 */
export function Platform() {
  return (
    <Section tone="void" labelledBy="platform-title" className={styles.section}>
      <AmbientGlow color="brand" size={1500} x="50%" y="62%" intensity={0.12} />
      <SectionHeading
        id="platform-title"
        eyebrow="The system"
        index="02"
        aside="Illustrative interface"
        layout="split"
        title={["One system.", <em key="a" className="t-accent">Six layers, one machine.</em>]}
        lead="Brand, experience, acquisition, conversion, automation and intelligence — designed together, instrumented together, improved together."
      />
      <div className={styles.stage}>
        <span className={styles.floor} aria-hidden="true" />
        <SystemConsole />
      </div>
    </Section>
  );
}
