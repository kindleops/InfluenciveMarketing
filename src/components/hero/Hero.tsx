import { Button } from "@/components/ui/Button";
import { LiquidField } from "./LiquidField";
import { SystemConsole } from "./SystemConsole";
import styles from "./Hero.module.css";

/**
 * Hero — "Who are you?"
 *
 * Entrance choreography (pure CSS, no JS dependency, so it starts at first
 * paint): light field rises → eyebrow → headline lines lift out of their
 * masks → supporting copy + actions → the console emerges from the horizon.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.field} aria-hidden="true">
        <LiquidField />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Brand <i>·</i> Product <i>·</i> Growth <i>·</i> Intelligence
          </p>

          <h1 id="hero-title" className={styles.title}>
            <span className={styles.line}>
              <span style={{ animationDelay: "320ms" }}>Build what</span>
            </span>{" "}
            <span className={`${styles.line} ${styles.indent}`}>
              <span style={{ animationDelay: "420ms" }}>
                growth <em className="t-accent">requires.</em>
              </span>
            </span>
          </h1>
        </div>

        <div className={styles.below}>
          <p className={styles.cue} aria-hidden="true">
            <span className={styles.cueLine} />
            Scroll — the system, live
          </p>
          <div className={styles.aside}>
            <p className={styles.lead}>
              We design the systems behind modern growth — combining brand, product, acquisition, automation and
              intelligence into one connected machine for ambitious companies.
            </p>
            <div className={styles.actions}>
              <Button href="/start" size="lg" arrow magnetic>
                Start a Project
              </Button>
              <Button href="/work" size="lg" variant="secondary" magnetic>
                Explore Our Work
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.consoleWrap}`}>
        <span className={styles.horizon} aria-hidden="true" />
        <SystemConsole />
      </div>

      <div className={styles.fade} aria-hidden="true" />
    </section>
  );
}
