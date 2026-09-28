import Link from "next/link";
import type { CSSProperties, ElementType, ReactNode } from "react";
import styles from "./Typography.module.css";

/* ---------------------------------------------------------------------------
   Eyebrow — section index + label. Sets the technical register of the page.
--------------------------------------------------------------------------- */
export function Eyebrow({
  index,
  children,
  className,
  reveal = true,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
  reveal?: boolean;
}) {
  return (
    <p className={[styles.eyebrow, className].filter(Boolean).join(" ")} data-reveal={reveal ? "fade" : undefined}>
      {index && <span className={styles.index}>{index}</span>}
      <span className={styles.rule} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

/* ---------------------------------------------------------------------------
   SplitText — display type revealed line by line out of individual masks.
   Lines are art-directed (explicit), never computed from the DOM, so there is
   no layout measurement and no flash.
--------------------------------------------------------------------------- */
export function SplitText({
  as: Tag = "h2",
  lines,
  className,
  delay = 0,
  id,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <Tag id={id} className={className} data-split="" style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {lines.map((line, i) => (
        <span className="split-line" key={i}>
          <span style={{ "--line-index": i } as CSSProperties}>
            {line}
            {i < lines.length - 1 ? " " : null}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
   SectionHeading — eyebrow, display title, optional lead.
   layout="split" puts the lead in a second column, bottom-aligned.
--------------------------------------------------------------------------- */
export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  size = "2",
  layout = "stacked",
  as = "h2",
  className,
  id,
}: {
  eyebrow?: ReactNode;
  index?: string;
  title: ReactNode[];
  lead?: ReactNode;
  size?: "1" | "2" | "3";
  layout?: "stacked" | "split" | "center";
  as?: ElementType;
  className?: string;
  id?: string;
}) {
  return (
    <header className={[styles.heading, styles[layout], className].filter(Boolean).join(" ")}>
      <div className={styles.headingMain}>
        {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
        <SplitText as={as} id={id} lines={title} className={`t-display-${size} t-lit`} />
      </div>
      {lead && (
        <p className={`t-lead ${styles.lead}`} data-reveal="up" style={{ "--reveal-delay": "180ms" } as CSSProperties}>
          {lead}
        </p>
      )}
    </header>
  );
}

/* ---------------------------------------------------------------------------
   TextLink — underline draws in from the left and retracts to the right.
--------------------------------------------------------------------------- */
export function TextLink({
  href,
  children,
  className,
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={[styles.textLink, className].filter(Boolean).join(" ")}>
      <span className={styles.textLinkLabel}>{children}</span>
      {arrow && (
        <svg className={styles.textLinkArrow} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </Link>
  );
}
