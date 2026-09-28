import Link from "next/link";
import type { CSSProperties } from "react";
import { formatDate, type Insight } from "@/content/insights";
import styles from "./InsightCards.module.css";

/** Per-category light: each cover is a slow, living field of three lights. */
const palettes: Record<Insight["category"], [string, string, string]> = {
  Systems: ["91 124 255", "160 140 255", "240 236 226"],
  Intelligence: ["120 220 200", "91 124 255", "200 230 255"],
  Experience: ["226 190 136", "240 150 170", "255 244 230"],
  Growth: ["130 230 170", "226 204 120", "220 255 240"],
};

export function InsightCards({ items }: { items: Insight[] }) {
  return (
    <ol className={styles.grid} role="list">
      {items.map((a, i) => {
        const [c1, c2, c3] = palettes[a.category];
        return (
          <li key={a.slug} data-reveal="up" style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}>
            <Link href={`/insights/${a.slug}`} className={styles.card} data-cursor="Read">
              <div className={styles.cover} style={{ "--c1": c1, "--c2": c2, "--c3": c3, "--seed": i } as CSSProperties}>
                <span className={styles.l1} aria-hidden="true" />
                <span className={styles.l2} aria-hidden="true" />
                <span className={styles.l3} aria-hidden="true" />
                <span className={styles.coverMeta} aria-hidden="true">
                  <span>N° {String(i + 1).padStart(2, "0")}</span>
                  <span>{a.category}</span>
                </span>
                <span className={styles.coverWord} aria-hidden="true">
                  {a.category}
                </span>
              </div>
              <div className={styles.body}>
                <p className={styles.meta}>
                  <time dateTime={a.date}>{formatDate(a.date)}</time>
                  <span>{a.readingTime}</span>
                </p>
                <h3 className={styles.title}>
                  <span>{a.title}</span>
                </h3>
                <p className={styles.dek}>{a.dek}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
