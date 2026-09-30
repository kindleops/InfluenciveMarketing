import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { JsonLd } from "@/components/seo/blocks";
import { Convert, FaqList, RelatedRail } from "@/components/landing/Landing";
import { LightField } from "@/components/ui/LightField";
import { Arrow } from "@/components/ui/Button";
import { fmtDate } from "@/components/editorial/Article";
import { articleLd, breadcrumbLd, faqLd } from "@/seo/jsonld";
import { published, resolveRelated } from "@/seo/registry";
import { textOf, wordCount } from "@/seo/quality";
import { pageMetadata } from "@/seo/site";
import s from "@/components/answers/answer.module.css";

type Props = { params: Promise<{ slug: string }> };
const get = (slug: string) => published.answers.find((p) => p.slug === slug);

export function generateStaticParams() {
  return published.answers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = get((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/answers/${p.slug}`, type: "article", updated: p.updated });
}

const sid = (t: string) =>
  t
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * One question, answered. The answer comes first — in the page's first
 * paragraph and in the FAQ markup — so a reader, a search result and an AI
 * answer can all take it without digging. The reasoning follows.
 */
export default async function AnswerPage({ params }: Props) {
  const p = get((await params).slug);
  if (!p) notFound();
  const path = `/answers/${p.slug}`;
  const minutes = Math.max(1, Math.round(wordCount(textOf(p)) / 230));
  const siblings = published.answers.filter((a) => a.topic === p.topic && a.slug !== p.slug).slice(0, 6);
  const others = published.answers.filter((a) => a.topic !== p.topic && (p.related.answers ?? []).includes(a.slug));
  const trail = [
    { name: "Answers", path: "/answers" },
    { name: p.question, path },
  ];

  return (
    <>
      <JsonLd data={articleLd({ title: p.question, description: p.metaDescription, path, published: p.updated, updated: p.updated })} />
      {/* The page's own question leads the FAQ markup, answered in full. */}
      <JsonLd data={faqLd([{ q: p.question, a: p.shortAnswer }, ...p.faqs])} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...trail])} />

      <article aria-labelledby="page-title">
        <header className={s.head}>
          <span className="scroll-progress" aria-hidden="true" />
          <LightField tone="teal" />
          <div className={`container ${s.headFrame}`}>
            <nav aria-label="Breadcrumb">
              <ol className={s.crumbs}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/answers">Answers</Link>
                </li>
                <li>
                  <Link href={`/answers#${sid(p.topic)}`}>
                    {p.topic}
                  </Link>
                </li>
              </ol>
            </nav>
            <h1 id="page-title" className={s.question} data-reveal="up">
              {p.question}
            </h1>
            <p className={s.meta} data-reveal="fade">
              <span>{p.topic}</span>
              <span>{minutes} min read</span>
              <span>
                Updated <time dateTime={p.updated}>{fmtDate(p.updated)}</time>
              </span>
            </p>

            <div className={s.answerGrid}>
              <section className={`glass ${s.short}`} data-level="3" data-liquid="deep" aria-labelledby="short-title" data-reveal="up" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
                <h2 id="short-title" className={s.label}>
                  <i aria-hidden="true" /> The short answer
                </h2>
                <p className={s.shortText}>{p.shortAnswer}</p>
              </section>
              <section className={s.points} aria-labelledby="points-title" data-reveal="up" style={{ "--reveal-delay": "160ms" } as CSSProperties}>
                <h2 id="points-title" className={s.label}>
                  Key points
                </h2>
                <ol role="list">
                  {p.keyPoints.map((k, i) => (
                    <li key={k}>
                      <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                      {k}
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
        </header>

        <div className={`container ${s.body}`}>
          <nav className={s.toc} aria-label="In this answer">
            <p className={s.label}>In this answer</p>
            <ol role="list">
              {p.sections.map((x) => (
                <li key={x.heading}>
                  <a href={`#${sid(x.heading)}`}>{x.heading}</a>
                </li>
              ))}
              <li>
                <a href="#faq">Related questions</a>
              </li>
            </ol>
          </nav>
          <div className={s.prose}>
            {p.sections.map((x) => (
              <section key={x.heading} aria-labelledby={sid(x.heading)}>
                <h2 id={sid(x.heading)}>{x.heading}</h2>
                {x.body.map((b, i) => (
                  <p key={i}>{b}</p>
                ))}
                {x.list && (
                  <ul>
                    {x.list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                )}
                {x.table && (
                  <div className={s.tableWrap} role="region" aria-label={x.table.caption} tabIndex={0}>
                    <table>
                      <caption className="sr-only">{x.table.caption}</caption>
                      <thead>
                        <tr>
                          {x.table.columns.map((c) => (
                            <th key={c} scope="col">
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {x.table.rows.map((r, i) => (
                          <tr key={i}>
                            {r.map((c, j) =>
                              j === 0 ? (
                                <th key={j} scope="row">
                                  {c}
                                </th>
                              ) : (
                                <td key={j} data-label={x.table!.columns[j]}>
                                  {c}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>

      <FaqList faqs={p.faqs} title={["Related", "questions."]} schema={false} />

      {(siblings.length > 0 || others.length > 0) && (
        <section className={s.more} aria-labelledby="more-title">
          <div className="container">
            <h2 id="more-title" className={s.label}>
              More questions about {p.topic}
            </h2>
            <ul className={s.moreList} role="list">
              {[...siblings, ...others].slice(0, 8).map((a) => (
                <li key={a.slug}>
                  <Link href={`/answers/${a.slug}`}>
                    <span>{a.question}</span>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Convert title={["Want the answer", "for your business?"]} text="Tell us where you are and what you’re weighing. A senior strategist replies with a first view — specific to your numbers, not a template." primary={{ label: "Start a conversation", href: "/start" }} secondary={{ label: "All answers", href: "/answers" }} />
      <RelatedRail entries={resolveRelated({ ...p.related, answers: undefined }, path)} title={["Go", "deeper."]} />
      <ProjectCTA />
    </>
  );
}
