import styles from "./template.module.css";

/**
 * Re-mounts on every navigation. A curtain of the void lifts off the new
 * route while its content settles — continuous, never blocking: the page
 * underneath is interactive from the first frame.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.curtain} aria-hidden="true" />
      <div className={styles.route}>{children}</div>
    </>
  );
}
