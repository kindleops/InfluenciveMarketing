import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { WorkItem } from "@/content/work";
import { WorkVisual } from "./WorkVisual";
import styles from "./CaseStudyPreview.module.css";

/**
 * Editorial case study preview. Results render only for published case
 * studies with real, approved numbers; blueprints show the signals we
 * instrument instead. `media` overrides the art-directed visual (e.g. a
 * real project video or image).
 */
export function CaseStudyPreview({
  item,
  index,
  layout = "stacked",
  media,
}: {
  item: WorkItem;
  index: number;
  layout?: "stacked" | "feature";
  media?: ReactNode;
}) {
  const href = `/work/${item.slug}`;
  const isCase = item.kind === "case-study";
  const titleId = `work-${item.slug}`;

  return (
    <article className={styles.card} data-layout={layout} data-card="" aria-labelledby={titleId}>
      <Link href={href} className={styles.mediaLink} tabIndex={-1} aria-hidden="true" data-cursor="View">
        <div
          className={`glass ${styles.frame}`}
          data-level="2"
          data-pointer-light=""
          data-tilt="2.5"
          data-reveal="scale"
        >
          <div className={styles.frameInner}>{media ?? <WorkVisual kind={item.visual} accent={item.accent} compact={layout !== "feature"} />}</div>
        </div>
      </Link>

      <div className={styles.meta} data-reveal="up" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
        <div className={styles.metaTop}>
          <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.kind} data-kind={item.kind}>
            {isCase ? "Case study" : "Engagement blueprint"}
          </span>
          <span className={styles.duration}>{item.duration}</span>
        </div>

        <h3 id={titleId} className={styles.title}>
          <Link href={href} className={styles.titleLink}>
            {isCase && item.client ? item.client : item.title}
            <svg width="18" height="18" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={styles.titleArrow}>
              <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </h3>
        <p className={styles.summary}>{item.summary}</p>

        <dl className={styles.facts}>
          <div>
            <dt>For</dt>
            <dd>{item.archetype}</dd>
          </div>
          <div>
            <dt>System</dt>
            <dd>{item.engagement}</dd>
          </div>
          {isCase && item.results?.length ? (
            <div className={styles.results}>
              <dt>Results</dt>
              <dd>
                {item.results.map((r) => (
                  <span key={r.label} className={styles.result}>
                    <b>{r.value}</b> {r.label}
                  </span>
                ))}
              </dd>
            </div>
          ) : (
            <div>
              <dt>We measure</dt>
              <dd className={styles.signals}>
                {item.signals.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  );
}
