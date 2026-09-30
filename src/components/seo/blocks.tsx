import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Faq, Item } from "@/content/commercial/types";
import { faqLd, ld } from "@/seo/jsonld";
import { KIND_LABEL, type Entry } from "@/seo/registry";
import { SectionHeading } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Surface";
import s from "./seo.module.css";

/* Building blocks for the commercial and library templates. Server-only,
   no client JS: reveals come from the site-wide RevealObserver. */

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(data) }} />;
}

/** The hero's instrument panel: the page's own signals, drawn as live traces. */
export function Instrument({ label, aside, items, foot }: { label: string; aside?: string; items: string[]; foot?: [string, string] }) {
  return (
    <div className={s.instrumentStage}>
      <div className={`glass ${s.instrument}`} data-level="3">
        <div className={s.instrumentHead}>
          <span>{label}</span>
          {aside && <span>{aside}</span>}
        </div>
        {items.slice(0, 6).map((it, i) => (
          <div key={it} className={s.signal}>
            <i>{String(i + 1).padStart(2, "0")}</i>
            <span>{it}</span>
            <span className={s.trace} style={{ "--i": i, "--w": `${88 - ((i * 17) % 46)}%` } as CSSProperties} />
          </div>
        ))}
        {foot && (
          <div className={s.instrumentFoot}>
            <span>{foot[0]}</span>
            <span>{foot[1]}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/** Heading on the left (sticky on desktop), prose on the right. */
export function ProseSection({ kicker, heading, body, id, tone = "dark" }: { kicker: string; heading: string; body: string[]; id: string; tone?: "dark" | "raised" | "void" }) {
  return (
    <Section tone={tone} labelledBy={id}>
      <div className={s.split}>
        <div className={s.splitHead}>
          <p className={s.kicker} data-reveal="fade">
            {kicker}
          </p>
          <h2 id={id} className={`${s.h2} t-lit`} data-reveal="up">
            {heading}
          </h2>
        </div>
        <div className={s.body} data-reveal="up">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function Heading({ id, eyebrow, title, lead }: { id: string; eyebrow: string; title: [ReactNode, ReactNode]; lead?: ReactNode }) {
  return <SectionHeading id={id} eyebrow={eyebrow} layout="split" size="2" title={[title[0], <em key="a" className="t-accent">{title[1]}</em>]} lead={lead} />;
}

export function ItemGrid({ items, numbered = true }: { items: Item[]; numbered?: boolean }) {
  return (
    <ul className={s.grid} role="list" data-stagger="">
      {items.map((it, i) => (
        <li key={it.title} className={s.cell}>
          {numbered && <span className={s.cellIdx}>{String(i + 1).padStart(2, "0")}</span>}
          <h3 className={s.cellTitle}>{it.title}</h3>
          <p className={s.cellText}>{it.detail}</p>
        </li>
      ))}
    </ul>
  );
}

export function Steps({ items }: { items: Item[] }) {
  return (
    <ol className={s.steps} role="list">
      {items.map((it, i) => (
        <li key={it.title} className={s.step} data-reveal="up" style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}>
          <span className={s.stepNum} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={s.stepTitle}>{it.title}</h3>
          <p className={s.stepText}>{it.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export function ListPair({ a, b }: { a: { title: string; items: string[] }; b: { title: string; items: string[]; quiet?: boolean } }) {
  return (
    <div className={s.pair}>
      {[a, b].map((col, i) => (
        <div key={col.title} className={`glass ${s.pairCol}`} data-level="2" data-tone={i === 1 && b.quiet ? "quiet" : undefined} data-reveal="up">
          <h3 className={s.pairTitle}>{col.title}</h3>
          <ul className={s.pairList} role="list">
            {col.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Facts({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className={s.facts}>
      {items.map((f) => (
        <div key={f.label}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Table({ caption, columns, rows, rowHeaders = true }: { caption: string; columns: string[]; rows: string[][]; rowHeaders?: boolean }) {
  return (
    <div className={s.tableWrap} tabIndex={0} role="region" aria-label={caption}>
      <table className={s.table}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) =>
                j === 0 && rowHeaders ? (
                  <th key={j} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={j} data-label={columns[j]}>
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Channels({ items }: { items: { channel: string; role: string }[] }) {
  return (
    <ul className={s.channels} role="list">
      {items.map((c) => (
        <li key={c.channel} className={s.channel} data-reveal="up">
          <h3 className={s.channelName}>{c.channel}</h3>
          <p className={s.channelRole}>{c.role}</p>
        </li>
      ))}
    </ul>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className={s.checklist} role="list">
      {items.map((c) => (
        <li key={c}>
          <span className={s.check} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>{c}</span>
        </li>
      ))}
    </ul>
  );
}

export function Verdict({ label, text }: { label: string; text: string }) {
  return (
    <div className={`glass ${s.verdict}`} data-level="3" data-reveal="up">
      <p className={s.kicker}>{label}</p>
      <p className={s.verdictText} style={{ marginTop: "var(--space-4)" }}>
        {text}
      </p>
    </div>
  );
}

/** Questions buyers ask, answered in place — and marked up as an FAQ. */
export function Faqs({ faqs, id = "faq-title", tone = "dark" }: { faqs: Faq[]; id?: string; tone?: "dark" | "raised" }) {
  return (
    <Section tone={tone} labelledBy={id}>
      <JsonLd data={faqLd(faqs)} />
      <div className={s.split}>
        <div className={s.splitHead}>
          <p className={s.kicker}>Questions</p>
          <h2 id={id} className={`${s.h2} t-lit`}>
            What people ask before they start.
          </h2>
        </div>
        <ul className={s.faqs} role="list">
          {faqs.map((f) => (
            <li key={f.q}>
              <details className={s.faq}>
                <summary>{f.q}</summary>
                <p className={s.faqAnswer}>{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h11.2M7.6 2.2 12.4 7l-4.8 4.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Cards({ entries, label }: { entries: Entry[]; label: string }) {
  return (
    <ul className={s.related} role="list" aria-label={label}>
      {entries.map((e) => (
        <li key={e.path}>
          <Link href={e.path} className={`glass ${s.card}`} data-level="2" data-liquid="" data-interactive="true" data-pointer-light="" data-tilt="6">
            <span className={s.cardKind}>{KIND_LABEL[e.kind]}</span>
            <span className={s.cardTitle}>{e.title}</span>
            <span className={s.cardText}>{e.summary}</span>
            <span className={s.cardGo}>
              Read <Arrow />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Related({ entries, id = "related-title", title = ["Keep", "going."] }: { entries: Entry[]; id?: string; title?: [string, string] }) {
  if (!entries.length) return null;
  return (
    <Section tone="raised" labelledBy={id}>
      <Heading id={id} eyebrow="Related" title={title} />
      <Cards entries={entries} label="Related pages" />
    </Section>
  );
}

export function Pills({ items }: { items: { href: string; label: string }[] }) {
  return (
    <ul className={s.pills} role="list">
      {items.map((it) => (
        <li key={it.href}>
          <Link href={it.href} className={s.pill}>
            {it.label}
            <Arrow />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const seoStyles = s;
