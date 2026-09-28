import type { ReactNode } from "react";
import styles from "./LegalPage.module.css";

/** Shared layout for legal documents: calm, narrow, highly legible. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className={styles.page} aria-labelledby="page-title">
      <div className="container-narrow">
        <p className={styles.eyebrow}>Legal</p>
        <h1 id="page-title" className={styles.title}>
          {title}
        </h1>
        <p className={styles.updated}>Last updated {updated}</p>
        <div className={styles.notice} role="note">
          Template text. Have this document reviewed by counsel and completed with your company’s details before
          launch.
        </div>
        <div className={styles.prose}>{children}</div>
      </div>
    </article>
  );
}
