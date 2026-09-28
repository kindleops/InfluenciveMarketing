import type { CSSProperties } from "react";
import { useCases } from "@/content/intelligence";
import { Eyebrow, SplitText } from "@/components/ui/Typography";
import { AmbientGlow, Section } from "@/components/ui/Surface";
import { DecisionEngine } from "./DecisionEngine";
import styles from "./IntelligenceLayer.module.css";

/** Technology — "How advanced is the company?" */
export function IntelligenceLayer() {
  return (
    <Section tone="void" labelledBy="ai-title" className={styles.section} chapter="06|Intelligence">
      <AmbientGlow color="violet" size={1000} x="78%" y="40%" intensity={0.1} drift />
      <AmbientGlow color="cyan" size={700} x="10%" y="85%" intensity={0.05} />

      <div className={styles.grid}>
        <div className={styles.copy}>
          <Eyebrow index="06">Intelligence &amp; automation</Eyebrow>
          <SplitText as="h2" id="ai-title" className="t-display-2 t-lit" lines={["AI as", <em key="i" className="t-accent">infrastructure.</em>]} />
          <p className="t-lead" data-reveal="up" style={{ marginTop: "var(--space-6)" }}>
            Not chatbots bolted onto a website. Workflows with inputs, owners, guardrails and measurable output —
            designed into how the company actually operates.
          </p>

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

        <div className={styles.engineWrap} data-reveal="scale" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
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
