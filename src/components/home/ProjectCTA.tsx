import Link from "next/link";
import type { CSSProperties } from "react";
import { needs } from "@/content/intake";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/Typography";
import { GlassObject } from "@/components/hero/GlassObject";
import { CtaAtmosphere } from "./CtaAtmosphere";
import styles from "./ProjectCTA.module.css";

/**
 * The final call to action — "What should I do next?"
 *
 * The resolution of the film: the headline returns at the hero's scale,
 * the page's geometry converges on the glass mark, the colour field settles
 * behind it — and only then is the question asked. The first intake question
 * is asked right here; each answer deep-links into the consultation flow.
 */
export function ProjectCTA() {
  return (
    <section className={styles.cta} aria-labelledby="cta-title" data-chapter="10|Start a project">

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
          {/* The closing shot returns to the opening one: the glass mark on
              its horizon — the site begins and ends on the same object. */}
          <div className={styles.stageGap} aria-hidden="true">
            <CtaAtmosphere />
            <GlassObject framing="finale" className={styles.canvas} />
          </div>

          <div
            className={`glass ${styles.ask}`}
            data-level="3"
            data-pointer-light=""
            data-reveal="scale"
            style={{ "--reveal-delay": "240ms" } as CSSProperties}
          >
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
