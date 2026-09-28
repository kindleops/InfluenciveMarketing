import type { CSSProperties } from "react";
import { useCases } from "@/content/intelligence";
import { Eyebrow, SplitText } from "@/components/ui/Typography";
import { AmbientGlow, Section } from "@/components/ui/Surface";
import { DecisionEngine } from "./DecisionEngine";
import { IntelligenceField } from "./IntelligenceField";
import styles from "./IntelligenceLayer.module.css";

/**
 * Technology — "How advanced is the company?"
 *
 * Told wide, then close: the whole architecture first (intelligence as the
 * ground every layer stands on), then one workflow running end to end.
 */
export function IntelligenceLayer() {
  return (
    <Section tone="void" labelledBy="ai-title" className={styles.section} chapter="06|Intelligence">
      <AmbientGlow color="brand" size={1300} x="36%" y="30%" intensity={0.09} />

      <div className={styles.head}>
        <div>
          <Eyebrow index="06" aside="Architecture">
            Intelligence &amp; automation
          </Eyebrow>
          <SplitText as="h2" id="ai-title" className="t-display-2 t-lit" lines={["AI as", <em key="i" className="t-accent">infrastructure.</em>]} />
        </div>
        <p className={`t-lead ${styles.lead}`} data-reveal="up">
          Not a feature sitting on top. One intelligence layer — shared data, models and guardrails — beneath every
          surface the company runs, designed into how it actually operates.
        </p>
      </div>

      <div className={styles.fieldWrap}>
        <IntelligenceField />
      </div>

      <p className={styles.detailLabel} data-reveal="fade">
        <span>In detail</span>
        <span>One workflow, end to end</span>
      </p>

      <div className={styles.grid}>
        <div className={styles.copy}>
          <ul className={styles.cases} role="list" data-stagger="">
            {useCases.map((u, i) => (
              <li key={u.name}>
                <span className={styles.caseIdx}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.caseName}>{u.name}</span>
                <span className={styles.caseDetail}>{u.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`lit-stage ${styles.engineWrap}`} data-reveal="scale" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
          <DecisionEngine />
        </div>
      </div>

      <div className={styles.principles} data-stagger="">
        {[
          ["Guardrails first", "Confidence thresholds, human checkpoints and audit trails are designed before any model is chosen."],
          ["Measured in hours", "Every workflow ships with a baseline and a metric: time returned, speed, accuracy."],
          ["Owned by your team", "Documented, observable systems your people can run, adjust and extend."],
        ].map(([t, d]) => (
          <div key={t} className={styles.principle}>
            <p className={styles.pTitle}>{t}</p>
            <p className={styles.pDetail}>{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
