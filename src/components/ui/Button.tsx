import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Drift toward the pointer (fine pointers only, disabled for reduced motion). */
  magnetic?: boolean;
  /** Show the directional arrow glyph. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

type AsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;
type AsButton = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h11.2M7.6 2.2 12.4 7l-4.8 4.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span className={styles.label}>{children}</span>
      {arrow && (
        <span className={styles.arrowWrap} aria-hidden="true">
          <Arrow className={styles.arrowA} />
          <Arrow className={styles.arrowB} />
        </span>
      )}
    </>
  );
}

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", magnetic = false, arrow = false, children, className, ...rest } = props;
  const cls = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ");
  const data = magnetic ? { "data-magnetic": "" } : {};

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchor } = rest as AsLink;
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a href={href} className={cls} {...data} {...anchor}>
          <Inner arrow={arrow}>{children}</Inner>
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...data} {...anchor}>
        <Inner arrow={arrow}>{children}</Inner>
      </Link>
    );
  }

  const { type = "button", ...button } = rest as Omit<AsButton, keyof CommonProps>;
  return (
    <button type={type} className={cls} {...data} {...button}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
