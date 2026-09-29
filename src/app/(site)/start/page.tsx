import type { Metadata } from "next";
import { Suspense } from "react";
import { brand } from "@/config/brand";
import { IntakeFlow } from "@/components/intake/IntakeFlow";
import { AmbientGlow } from "@/components/ui/Surface";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell us what you are building. A short consultation intake — about three minutes.",
};

export default function StartPage() {
  return (
    <section className={styles.page} aria-labelledby="start-title">
      <AmbientGlow color="brand" size={1300} x="70%" y="0%" intensity={0.2} drift />
      <AmbientGlow color="violet" size={700} x="5%" y="80%" intensity={0.06} />
      <div className="container">
        <header className={styles.head}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            Start a project
          </p>
          <h1 id="start-title" className={`t-display-2 t-lit ${styles.title}`}>
            Let’s build what <em className="t-accent">growth requires.</em>
          </h1>
          <p className={styles.lead}>
            Eight short questions. Prefer email? Write to{" "}
            <a href={`mailto:${brand.email}`} className={styles.mail}>
              {brand.email}
            </a>
            .
          </p>
        </header>
        <Suspense fallback={<div className={styles.fallback} />}>
          <IntakeFlow />
        </Suspense>
      </div>
    </section>
  );
}
