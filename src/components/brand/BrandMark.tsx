import { brand } from "@/config/brand";
import styles from "./BrandMark.module.css";

/**
 * Placeholder identity glyph: two offset planes — a surface and the system
 * behind it. Deliberately name-agnostic so the final identity can replace it
 * without touching layout. Swap the <svg> contents here to rebrand.
 */
export function BrandMark({ size = 22, animate = false }: { size?: number; animate?: boolean }) {
  return (
    <svg
      className={styles.mark}
      data-animate={animate || undefined}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bm-fill" x1="6" y1="2" x2="22" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F6F3EE" />
          <stop offset="1" stopColor="#F6F3EE" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect className={styles.back} x="2.75" y="7.75" width="13.5" height="13.5" rx="2.25" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" />
      <rect className={styles.front} x="7.75" y="2.75" width="13.5" height="13.5" rx="2.25" fill="url(#bm-fill)" />
    </svg>
  );
}

export function Wordmark({ animate = false }: { animate?: boolean }) {
  return (
    <span className={styles.wordmark}>
      <BrandMark animate={animate} />
      <span className={styles.name}>{brand.name}</span>
    </span>
  );
}
