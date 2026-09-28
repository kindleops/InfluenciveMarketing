import type { CSSProperties } from "react";
import { manifesto, principles } from "@/content/principles";
import { Eyebrow, SplitText } from "@/components/ui/Typography";
import { AmbientGlow, Section } from "@/components/ui/Surface";
import styles from "./PointOfView.module.css";

/** Philosophy — the company's point of view, set as architecture. */
export function PointOfView() {
  return (
    <Section tone="warm" labelledBy="pov-title" className={styles.section} chapter="08|Point of view">
      <AmbientGlow color="gold" size={1200} x="30%" y="100%" intensity={0.08} />

      <Eyebrow index="08">Point of view</Eyebrow>
      <SplitText
        as="h2"
        id="pov-title"
        className={`t-display-1 ${styles.manifesto}`}
        mode="lines"
        lines={[
          <span key="0" className={styles.dim}>{manifesto[0]}</span>,
          <span key="1" className={styles.mid}>{manifesto[1]}</span>,
          <em key="2" className={`t-serif ${styles.lit}`}>{manifesto[2]}</em>,
        ]}
      />

      <ol className={styles.principles} role="list">
        {principles.map((p, i) => (
          <li key={p.index} className={styles.principle} data-reveal="up" style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as CSSProperties}>
            <span className={styles.numeral}>{p.index}</span>
            <p className={styles.pTitle}>
              {p.title} <span>{p.accent}</span>
            </p>
            <p className={styles.pDetail}>{p.detail}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
