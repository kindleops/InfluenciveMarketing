import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { ArticleBlock, LibraryEntry, ReportFormat } from "@/content/library/types";
import { brand } from "@/config/brand";
import { LightField } from "@/components/ui/LightField";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { JsonLd } from "@/components/seo/blocks";
import { Convert, FaqList, RelatedRail } from "@/components/landing/Landing";
import { articleLd, breadcrumbLd } from "@/seo/jsonld";
import { resolveRelated } from "@/seo/registry";
import { textOf, wordCount } from "@/seo/quality";
import { Figure } from "./Figure";
import { ReportToc } from "./ReportToc";
import s from "./article.module.css";

export const headingId = (t: string) =>
  t
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const fmtDate = (iso: string) => new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`));

/** Titles never break at a hyphen ("High-/Ticket"): hyphenated compounds hold together. */
export const keepHyphens = (t: string) => t.replace(/(\w)-(\w)/g, "$1\u2011$2");

export const FORMAT_LABEL: Record<ReportFormat, string> = { analysis: "Analysis", model: "Model", blueprint: "Blueprint", study: "Study" };

const Tick = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
    <path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Block({ b, fig, section }: { b: ArticleBlock; fig: number; section: number }) {
  switch (b.type) {
    case "p":
      return <p>{b.text}</p>;
    case "h2":
      return (
        <h2 id={headingId(b.text)}>
          <span className={s.secNum} aria-hidden="true">
            {String(section).padStart(2, "0")}
          </span>
          {b.text}
        </h2>
      );
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
    case "pullquote":
      return (
        <figure className={s.pull}>
          <blockquote>{b.text}</blockquote>
        </figure>
      );
    case "callout":
      return (
        <div className={`glass ${s.callout}`} data-level="2" data-liquid="" role="note">
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
                <Tick />
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
    case "figure":
      return <Figure n={fig} title={b.title} caption={b.caption} figure={b.figure} />;
  }
}

/**
 * The publication template: guides, playbooks and research reports share
 * it. A masthead that reads like a journal, a short version up front for
 * the reader who won't finish, a serif reading column, numbered sections,
 * figures in glass — and the way to talk to the people who wrote it.
 */
export function Article({
  entry,
  section,
  kind,
  glance,
  before,
  report,
}: {
  entry: LibraryEntry;
  section: { name: string; path: string };
  kind: string;
  glance?: { label: string; value: string }[];
  before?: ReactNode;
  report?: { number: number; format: ReportFormat; keyPoints: string[]; basis: string };
}) {
  const path = `${section.path}/${entry.slug}`;
  const minutes = Math.max(1, Math.round(wordCount(textOf(entry.body)) / 230));
  const headings = entry.body.filter((b): b is { type: "h2"; text: string } => b.type === "h2");

  // Figures and sections are numbered in reading order.
  let fig = 0;
  let sec = 0;
  const blocks = entry.body.map((b) => {
    if (b.type === "figure") fig++;
    if (b.type === "h2") sec++;
    return { b, fig, sec };
  });

  return (
    <>
      <JsonLd data={articleLd({ title: entry.title, description: entry.metaDescription, path, published: entry.published, updated: entry.updated })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, section, { name: entry.title, path }])} />

      <article aria-labelledby="page-title" className={s.article}>
        <header className={s.masthead}>
          <span className="scroll-progress" aria-hidden="true" />
          <LightField tone={report ? "blue" : "violet"} />
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
                  <span aria-current="page">{report ? `No. ${String(report.number).padStart(2, "0")}` : kind}</span>
                </li>
              </ol>
            </nav>
            <div className={s.flag} data-reveal="fade">
              <span className={s.flagName}>
                {brand.name} <em>Research</em>
              </span>
              <span className={s.flagMeta}>
                {report && <b>No. {String(report.number).padStart(2, "0")}</b>}
                <span>{report ? FORMAT_LABEL[report.format] : kind}</span>
                <span>
                  <time dateTime={entry.updated}>{fmtDate(entry.updated)}</time>
                </span>
              </span>
            </div>
            <h1 id="page-title" className={s.title} data-reveal="up">
              {keepHyphens(entry.title)}
            </h1>
            <p className={s.dek} data-reveal="up" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
              {entry.dek}
            </p>
            <p className={s.meta} data-reveal="fade" style={{ "--reveal-delay": "200ms" } as CSSProperties}>
              <span>{minutes} min read</span>
              <span>{headings.length} sections</span>
              {fig > 0 && <span>{fig === 1 ? "1 figure" : `${fig} figures`}</span>}
              <span>By the {brand.name} team</span>
            </p>
          </div>
        </header>

        {report && (
          <div className={`container ${s.brief}`}>
            <section className={`glass ${s.points}`} data-level="3" data-liquid="" aria-labelledby="short-title" data-reveal="up">
              <h2 id="short-title" className={s.briefLabel}>
                The short version
              </h2>
              <ol role="list">
                {report.keyPoints.map((k, i) => (
                  <li key={k}>
                    <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <p>{k}</p>
                  </li>
                ))}
              </ol>
            </section>
            <aside className={s.basis} aria-labelledby="basis-title" data-reveal="up" style={{ "--reveal-delay": "100ms" } as CSSProperties}>
              <h2 id="basis-title" className={s.briefLabel}>
                What this rests on
              </h2>
              <p>{report.basis}</p>
              <Link href="/research#standards" className={s.basisLink}>
                How we publish →
              </Link>
            </aside>
          </div>
        )}

        <div className={`container ${s.layout}`}>
          <div className={s.aside}>
            {glance && (
              <dl className={`glass ${s.glance}`} data-level="2" data-liquid="">
                {glance.map((g) => (
                  <div key={g.label}>
                    <dt>{g.label}</dt>
                    <dd>{g.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {headings.length > 2 && <ReportToc items={headings.map((h) => ({ id: headingId(h.text), label: h.text }))} />}
          </div>
          <div className={s.main}>
            {before}
            <div className={s.prose}>
              {blocks.map(({ b, fig, sec }, i) => (
                <Block key={i} b={b} fig={fig} section={sec} />
              ))}
            </div>
            <p className={s.byline}>
              <span>Written by the people who do this work. Questions or a different view? We read every reply.</span>
              <Link href="/start">Talk to the team →</Link>
            </p>
          </div>
        </div>
      </article>

      <Convert
        title={["Want this applied", "to your numbers?"]}
        text="Tell us where you are and what you’re trying to change. We’ll tell you what we’d do first — with the reasoning."
        primary={{ label: "Start a conversation", href: "/start" }}
        secondary={{ label: "More research", href: "/research" }}
      />
      {entry.faqs && entry.faqs.length > 0 && <FaqList faqs={entry.faqs} title={["Questions", "readers ask."]} />}
      <RelatedRail entries={resolveRelated(entry.related, path)} title={["Where to", "go next."]} />
      <ProjectCTA />
    </>
  );
}

export const articleStyles = s;
