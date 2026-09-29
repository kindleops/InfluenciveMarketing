import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { SplitText } from "@/components/ui/Typography";
import { brand } from "@/config/brand";
import styles from "./PageHero.module.css";

/**
 * Opening scene for interior routes — the same world as the homepage: a
 * key light from above, a studio floor, and the horizon every page stands
 * on. A page can put its signature object on the horizon (`visual`) and/or
 * set the scene with a graded photograph (`plate`); `accent` tints the
 * light so each route has its own atmosphere.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  meta,
  accent = "brand",
  visual,
  plate,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode[];
  lead?: ReactNode;
  meta?: { label: string; value: ReactNode }[];
  accent?: "brand" | "violet" | "cyan" | "gold";
  /** The page's signature object, standing on the horizon. */
  visual?: ReactNode;
  /** A photograph behind the scene, graded into the page's tonal range. */
  plate?: StaticImageData;
  /** Breadcrumb trail (excluding Home), shown in the top line. */
  crumbs?: { name: string; path: string }[];
  children?: ReactNode;
}) {
  return (
    <section
      className={styles.hero}
      data-accent={accent}
      data-visual={visual ? "" : undefined}
      data-plate={plate ? "" : undefined}
      aria-labelledby="page-title"
    >
      <div className={styles.set} aria-hidden="true">
        <span className={styles.sky} />
        {plate && (
          <Image src={plate} alt="" fill sizes="100vw" quality={75} placeholder="blur" preload className={styles.plate} />
        )}
        <span className={styles.beam} />
        <span className={styles.floor} />
        <span className={styles.pool} />
        <span className={styles.horizon} />
        <span className={styles.vignette} />
      </div>

      <div className={`container ${styles.frame}`}>
        {crumbs ? (
          <div className={styles.topline}>
            <nav aria-label="Breadcrumb">
              <ol className={styles.crumbs}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                {crumbs.map((c, i) => (
                  <li key={c.path}>
                    {i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
                  </li>
                ))}
              </ol>
            </nav>
            <span className={styles.toplineCenter} aria-hidden="true">
              {eyebrow}
            </span>
            <span aria-hidden="true">{brand.name}</span>
          </div>
        ) : (
          <>
            <div className={styles.topline} aria-hidden="true">
              <span>{eyebrow}</span>
              <span className={styles.toplineCenter}>Brand · Product · Growth · Intelligence</span>
              <span>{brand.name}</span>
            </div>
            <p className="sr-only">{eyebrow}</p>
          </>
        )}

        <div className={styles.copy}>
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
      </div>

      {visual && (
        <div className={styles.visual} aria-hidden="true">
          {visual}
        </div>
      )}
    </section>
  );
}
