import type { CSSProperties, ReactNode } from "react";
import { SplitText } from "@/components/ui/Typography";
import { AmbientGlow } from "@/components/ui/Surface";
import { brand } from "@/config/brand";
import styles from "./PageHero.module.css";

const brandLine = brand.name;

/**
 * Opening scene for interior routes. Shares the homepage's light and type
 * language at a calmer scale; `accent` tints the key light per page so each
 * route has its own atmosphere.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  meta,
  accent = "brand",
  children,
}: {
  eyebrow: string;
  title: ReactNode[];
  lead?: ReactNode;
  meta?: { label: string; value: ReactNode }[];
  accent?: "brand" | "violet" | "cyan" | "gold";
  children?: ReactNode;
}) {
  return (
    <section className={styles.hero} data-accent={accent} aria-labelledby="page-title">
      <div className={styles.light} aria-hidden="true">
        <AmbientGlow color={accent} size={1400} x="70%" y="-10%" intensity={0.16} drift />
      </div>
      <span className={styles.horizon} aria-hidden="true" />

      <div className="container">
        <div className={styles.topline} aria-hidden="true">
          <span>{eyebrow}</span>
          <span className={styles.toplineCenter}>Brand · Product · Growth · Intelligence</span>
          <span>{brandLine}</span>
        </div>
        <p className="sr-only">{eyebrow}</p>
        <SplitText as="h1" id="page-title" className={`t-display-1 t-lit ${styles.title}`} lines={title} delay={80} />

        {(lead || meta) && (
          <div className={styles.below}>
            {lead && (
              <p className={`t-lead ${styles.lead}`} data-reveal="up" style={{ "--reveal-delay": "380ms" } as CSSProperties}>
                {lead}
              </p>
            )}
            {meta && (
              <dl className={styles.meta} data-stagger="" style={{ "--reveal-delay": "480ms" } as CSSProperties}>
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
