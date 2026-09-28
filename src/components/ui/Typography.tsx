import Link from "next/link";
import { Fragment, cloneElement, isValidElement, type CSSProperties, type ElementType, type ReactNode } from "react";
import styles from "./Typography.module.css";

/* ---------------------------------------------------------------------------
   Eyebrow — an editorial running header: index, label, a hairline that runs
   to the edge of the grid, and optional context. Sets the register of the
   page the way a running head does in a well-set book.
--------------------------------------------------------------------------- */
export function Eyebrow({
  index,
  children,
  aside,
  className,
  reveal = true,
}: {
  index?: string;
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
  reveal?: boolean;
}) {
  return (
    <div className={[styles.eyebrow, className].filter(Boolean).join(" ")} data-reveal={reveal ? "fade" : undefined}>
      {index && <span className={styles.index}>({index})</span>}
      <span className={styles.label} data-scramble={typeof children === "string" ? "" : undefined}>
        {children}
      </span>
      <span className={styles.rule} aria-hidden="true" data-reveal={reveal ? "line" : undefined} />
      {aside && <span className={styles.aside}>{aside}</span>}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Character splitting — display type rises letter by letter out of its line
   mask. Strings are split; one level of inline elements (e.g. the two-tone
   <em>) is preserved with its own characters split inside.
--------------------------------------------------------------------------- */
export function toText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return toText(node.props.children);
  return "";
}

function splitString(text: string, counter: { n: number }) {
  const words = text.split(/(\s+)/);
  return words.map((w, wi) => {
    if (/^\s+$/.test(w)) return " ";
    if (!w) return null;
    return (
      <span className="word" key={wi}>
        {Array.from(w).map((ch, ci) => (
          <span className="char" key={ci} style={{ "--ci": counter.n++ } as CSSProperties}>
            {ch}
          </span>
        ))}
      </span>
    );
  });
}

export function Chars({ children, start = 0 }: { children: ReactNode; start?: number }) {
  const counter = { n: start };
  const walk = (node: ReactNode, key?: number): ReactNode => {
    if (typeof node === "string") return splitString(node, counter);
    if (Array.isArray(node)) return node.map((n, i) => <Fragment key={i}>{walk(n, i)}</Fragment>);
    if (isValidElement<{ children?: ReactNode }>(node)) {
      return cloneElement(node, { key }, walk(node.props.children));
    }
    return node;
  };
  return <>{walk(children)}</>;
}

/* ---------------------------------------------------------------------------
   SplitText — art-directed lines (never measured from the DOM), each in its
   own mask. mode="chars" (default) staggers individual letters; "lines"
   moves whole lines (for lines styled with their own clipped gradients).
--------------------------------------------------------------------------- */
export function SplitText({
  as: Tag = "h2",
  lines,
  className,
  delay = 0,
  id,
  mode = "chars",
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  delay?: number;
  id?: string;
  mode?: "chars" | "lines";
}) {
  let offset = 0;
  const label = lines.map(toText).join(" ");
  return (
    <Tag
      id={id}
      className={className}
      data-split={mode}
      aria-label={mode === "chars" ? label : undefined}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {lines.map((line, i) => {
        const start = offset;
        offset += toText(line).length;
        return (
          <span className="split-line" key={i} aria-hidden={mode === "chars" ? true : undefined}>
            <span style={{ "--line-index": i } as CSSProperties}>
              {mode === "chars" ? <Chars start={start}>{line}</Chars> : line}
              {i < lines.length - 1 ? " " : null}
            </span>
          </span>
        );
      })}
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
  aside,
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
  aside?: ReactNode;
  title: ReactNode[];
  lead?: ReactNode;
  size?: "1" | "2" | "3";
  layout?: "stacked" | "split" | "center";
  as?: ElementType;
  className?: string;
  id?: string;
}) {
  return (
    <header className={[styles.heading, className].filter(Boolean).join(" ")}>
      {eyebrow && (
        <Eyebrow index={index} aside={aside}>
          {eyebrow}
        </Eyebrow>
      )}
      <div className={[styles.headingBody, styles[layout]].join(" ")}>
        <div className={styles.headingMain}>
          <SplitText as={as} id={id} lines={title} className={`t-display-${size} t-lit`} />
        </div>
        {lead && (
          <p className={`t-lead ${styles.lead}`} data-reveal="up" style={{ "--reveal-delay": "180ms" } as CSSProperties}>
            {lead}
          </p>
        )}
      </div>
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
