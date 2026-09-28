import styles from "./template.module.css";

/**
 * Re-mounts on every navigation: a short, non-blocking entrance so route
 * changes read as one continuous experience. Never delays interaction.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className={styles.route}>{children}</div>;
}
