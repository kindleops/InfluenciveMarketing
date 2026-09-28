import Link from "next/link";
import { brand } from "@/config/brand";
import { footerNav, legalNav } from "@/config/navigation";
import { Wordmark } from "@/components/brand/BrandMark";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/Typography";
import { AmbientGlow } from "@/components/ui/Surface";
import { BackToTop } from "./BackToTop";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const social = brand.social.filter((s) => s.href);
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-labelledby="footer-statement">
      <AmbientGlow color="brand" size={1300} x="50%" y="0%" intensity={0.12} />
      <AmbientGlow color="gold" size={900} x="85%" y="100%" intensity={0.07} />

      <div className="container">
        <div className={styles.lead}>
          <SplitText
            as="h2"
            id="footer-statement"
            lines={["Build what", <>growth <em className="t-accent">requires.</em></>]}
            className={`t-display-1 t-lit ${styles.statement}`}
          />
          <div className={styles.leadSide} data-reveal="up">
            <p className="t-lead">
              Tell us where the business is going. We will design the system that gets it there.
            </p>
            <div className={styles.leadActions}>
              <Button href="/start" size="lg" arrow magnetic>
                Start a Project
              </Button>
              <a href={`mailto:${brand.email}`} className={styles.email}>
                {brand.email}
              </a>
            </div>
          </div>
        </div>

        <div className="hairline" data-reveal="line" />

        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/" aria-label={`${brand.name} — home`} className={styles.brandLink}>
              <Wordmark />
            </Link>
            <p className="t-small">{brand.description}</p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className={styles.col}>
              <p className="t-label">{group.title}</p>
              <ul role="list">
                {group.items.map((item) => (
                  <li key={item.href + item.label}>
                    <Link href={item.href} className={styles.link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {social.length > 0 && (
            <nav aria-label="Social" className={styles.col}>
              <p className="t-label">Social</p>
              <ul role="list">
                {social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className={styles.link} target="_blank" rel="noreferrer noopener">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div className={styles.base}>
          <p className="t-micro">
            © {year} {brand.legalName}. All rights reserved.
          </p>
          <ul role="list" className={styles.legal}>
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <BackToTop className={styles.link} />
            </li>
          </ul>
        </div>
      </div>

      {/* Closing brand moment: the positioning, set as architecture. */}
      <div className={styles.horizon} aria-hidden="true">
        <div className={styles.horizonTrack}>
          {[0, 1].map((k) => (
            <span key={k} className={styles.horizonSet}>
              <span>Brand</span>
              <i />
              <span>Product</span>
              <i />
              <span>Growth</span>
              <i />
              <span>Intelligence</span>
              <i />
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
