import Link from "next/link";
import type { CSSProperties } from "react";
import { needs } from "@/content/intake";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/Typography";
import { AmbientGlow } from "@/components/ui/Surface";
import styles from "./ProjectCTA.module.css";

/**
 * The final call to action — "What should I do next?"
 * The first intake question is asked right here; each answer deep-links into
 * the consultation flow with the selection already made.
 */
export function ProjectCTA() {
  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <div className={styles.light} aria-hidden="true">
        <AmbientGlow color="brand" size={1400} x="50%" y="62%" intensity={0.26} drift />
        <AmbientGlow color="violet" size={800} x="70%" y="40%" intensity={0.1} />
        <span className={styles.beam} />
      </div>

      <div className="container">
        <div className={styles.inner}>
          <p className={styles.eyebrow} data-reveal="fade">
            Start a project
          </p>
          <SplitText
            as="h2"
            id="cta-title"
            className={`t-display-1 t-lit ${styles.title}`}
            lines={["The next version", <>of your company <em className="t-accent">starts here.</em></>]}
          />

          <div className={`glass ${styles.ask}`} data-level="3" data-pointer-light="" data-reveal="scale">
            <p className={styles.askQ}>What do you need help with?</p>
            <ul className={styles.chips} role="list">
              {needs.map((n, i) => (
                <li key={n.id} style={{ "--i": i } as CSSProperties}>
                  <Link href={`/start?need=${n.id}`} className={styles.chip}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.askFoot}>
              <span>About three minutes — and everything we need for a genuinely useful first conversation.</span>
              <Button href="/start" arrow magnetic>
                Start a Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
