import { brand } from "@/config/brand";
import { MARK_PATHS } from "./mark";
import styles from "./BrandMark.module.css";

/** The apex mark (see ./mark.ts). `animate` plays the ascent on first paint. */
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
      <path className={styles.rear} d={MARK_PATHS.rear} fill="currentColor" fillOpacity="0.42" />
      <path className={styles.front} d={MARK_PATHS.front} fill="currentColor" />
    </svg>
  );
}

/** Mark + lowercase name. */
export function Wordmark({ animate = false }: { animate?: boolean }) {
  return (
    <span className={styles.wordmark}>
      <BrandMark size={20} animate={animate} />
      <span className={styles.name}>{brand.name}</span>
    </span>
  );
}
