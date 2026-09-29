import Link from "next/link";
import type { ReactNode } from "react";
import type { ArticleBlock, LibraryEntry } from "@/content/library/types";
import { SplitText } from "@/components/ui/Typography";
import { AmbientGlow } from "@/components/ui/Surface";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Faqs, JsonLd, Related } from "@/components/seo/blocks";
import { articleLd, breadcrumbLd } from "@/seo/jsonld";
import { resolveRelated } from "@/seo/registry";
import { textOf, wordCount } from "@/seo/quality";
import s from "./article.module.css";

const slug = (t: string) =>
  t
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const fmt = (iso: string) => new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`));

function Block({ b }: { b: ArticleBlock }) {
  switch (b.type) {
    case "p":
      return <p>{b.text}</p>;
    case "h2":
      return <h2 id={slug(b.text)}>{b.text}</h2>;
    case "h3":
      return <h3>{b.text}</h3>;
    case "list":
      return (
        <ul>
          {b.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {b.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ol>
      );
    case "quote":
      return <blockquote>{b.text}</blockquote>;
    case "callout":
      return (
        <div className={`glass ${s.callout}`} data-level="2" role="note">
          <strong>{b.title}</strong>
          {b.text}
        </div>
      );
    case "checklist":
      return (
        <ul className={s.check}>
          {b.items.map((x) => (
            <li key={x}>
              <span className={s.box} aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{x}</span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className={s.stepList}>
          {b.items.map((x, i) => (
            <li key={x.title}>
              <span className={s.stepNum} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <strong>{x.title}</strong>
                {x.detail}
              </span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className={s.tableWrap} tabIndex={0} role="region" aria-label={b.caption}>
          <table className={s.table}>
            <caption className="sr-only">{b.caption}</caption>
            <thead>
              <tr>
                {b.columns.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={j}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/** Long-form library article: guides, playbooks and research share it. */
export function Article({
  entry,
  section,
  kind,
  glance,
  before,
}: {
  entry: LibraryEntry;
  section: { name: string; path: string };
  kind: string;
  glance?: { label: string; value: string }[];
  before?: ReactNode;
}) {
  const path = `${section.path}/${entry.slug}`;
  const minutes = Math.max(1, Math.round(wordCount(textOf(entry.body)) / 230));
  const headings = entry.body.filter((b): b is { type: "h2"; text: string } => b.type === "h2");

  return (
    <>
      <JsonLd data={articleLd({ title: entry.title, description: entry.metaDescription, path, published: entry.published, updated: entry.updated })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, section, { name: entry.title, path }])} />

      <article aria-labelledby="page-title">
        <header className={s.header}>
          <AmbientGlow color="cyan" size={1100} x="75%" y="0%" intensity={0.14} />
          <div className="container">
            <nav aria-label="Breadcrumb">
              <ol className={s.crumbs}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href={section.path}>{section.name}</Link>
                </li>
                <li>
                  <span aria-current="page">{kind}</span>
                </li>
              </ol>
            </nav>
            <SplitText as="h1" id="page-title" className={`t-display-2 t-lit ${s.title}`} lines={[entry.title]} />
            <p className={s.dek} data-reveal="up">
              {entry.dek}
            </p>
            <p className={s.meta}>
              <span>
                <b>{kind}</b>
              </span>
              <span>{minutes} min read</span>
              <span>
                Updated <time dateTime={entry.updated}>{fmt(entry.updated)}</time>
              </span>
            </p>
          </div>
        </header>

        <div className={`container ${s.layout}`}>
          <div className={s.aside}>
            {glance && (
              <dl className={`glass ${s.glance}`} data-level="2">
                {glance.map((g) => (
                  <div key={g.label}>
                    <dt>{g.label}</dt>
                    <dd>{g.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {headings.length > 2 && (
              <nav className={s.tocWrap} aria-labelledby="toc-title">
                <p className={s.tocTitle} id="toc-title">
                  On this page
                </p>
                <ol className={s.toc} role="list">
                  {headings.map((h) => (
                    <li key={h.text}>
                      <a href={`#${slug(h.text)}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
          <div>
            {before}
            <div className={s.prose}>
              {entry.body.map((b, i) => (
                <Block key={i} b={b} />
              ))}
            </div>
            <p className={s.byline}>
              <span>Written by the team that does this work.</span>
              <Link href="/start">Talk to us about it →</Link>
            </p>
          </div>
        </div>
      </article>

      {entry.faqs && entry.faqs.length > 0 && <Faqs faqs={entry.faqs} tone="raised" />}
      <Related entries={resolveRelated(entry.related, path)} title={["Where to", "go next."]} />
      <ProjectCTA />
    </>
  );
}

export const articleStyles = s;
