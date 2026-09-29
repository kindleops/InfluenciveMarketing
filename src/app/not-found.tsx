import { Button } from "@/components/ui/Button";
import { AmbientGlow } from "@/components/ui/Surface";
import { SiteChrome } from "@/components/layout/SiteChrome";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <SiteChrome>
    <section className={styles.page} aria-labelledby="nf-title">
      <AmbientGlow color="brand" size={1100} x="50%" y="30%" intensity={0.18} drift />
      <div className={`container ${styles.inner}`}>
        <p className={styles.code} aria-hidden="true">404</p>
        <h1 id="nf-title" className={styles.title}>
          This page is not part of <em className="t-accent">the system.</em>
        </h1>
        <p className={styles.lead}>The link may be outdated, or the page may have moved.</p>
        <div className={styles.actions}>
          <Button href="/" arrow>
            Back to home
          </Button>
          <Button href="/start" variant="secondary">
            Start a Project
          </Button>
        </div>
      </div>
    </section>
    </SiteChrome>
  );
}
