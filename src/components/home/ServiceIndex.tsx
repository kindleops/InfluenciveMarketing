import Link from "next/link";
import type { CSSProperties } from "react";
import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Surface";
import styles from "./ServiceIndex.module.css";

/**
 * Services — eight disciplines as an editorial index. Rows open on hover or
 * focus to reveal the statement and offerings; nothing is dumped on screen
 * until it is asked for.
 */
export function ServiceIndex() {
  return (
    <Section tone="raised" labelledBy="services-title">
      <SectionHeading
        id="services-title"
        eyebrow="Services"
        index="05"
        layout="split"
        title={["Eight disciplines.", <>One <em className="t-accent">standard.</em></>]}
        lead="Engage one discipline or the whole system. Either way, every piece is designed to connect to the rest."
      />

      <ol className={styles.list} role="list">
        {services.map((s, i) => (
          <li key={s.id} className={styles.item} data-reveal="up" style={{ "--reveal-delay": `${i * 50}ms` } as CSSProperties}>
            <Link href={`/services#${s.id}`} className={styles.row} data-pointer-light="">
              <span className={styles.index}>{s.index}</span>
              <span className={styles.name}>{s.name}</span>
              <span className={styles.statement}>{s.statement}</span>
              <span className={styles.arrow} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h11.2M7.6 2.2 12.4 7l-4.8 4.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className={styles.detail}>
                <span className={styles.detailInner}>
                  {s.offerings.map((o) => (
                    <span key={o} className={styles.chip}>
                      {o}
                    </span>
                  ))}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}
