import Link from "next/link";
import type { CSSProperties } from "react";
import { formatDate, type Insight } from "@/content/insights";
import styles from "./InsightList.module.css";

/** Editorial index of articles. Used on the homepage and /insights. */
export function InsightList({ items, size = "default" }: { items: Insight[]; size?: "default" | "large" }) {
  return (
    <ol className={styles.list} data-size={size} role="list">
      {items.map((a, i) => (
        <li key={a.slug} data-reveal="up" style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}>
          <Link href={`/insights/${a.slug}`} className={styles.row} data-pointer-light="">
            <span className={styles.meta}>
              <span className={styles.cat}>{a.category}</span>
              <time dateTime={a.date}>{formatDate(a.date)}</time>
            </span>
            <span className={styles.main}>
              <span className={styles.title}>{a.title}</span>
              <span className={styles.dek}>{a.dek}</span>
            </span>
            <span className={styles.aside}>
              <span className={styles.time}>{a.readingTime}</span>
              <span className={styles.arrow} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
