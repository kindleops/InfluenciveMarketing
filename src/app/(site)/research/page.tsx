import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { brand } from "@/config/brand";
import { inDesign } from "@/content/library/research";
import type { Research } from "@/content/library/types";
import { FORMAT_LABEL, fmtDate, keepHyphens } from "@/components/editorial/Article";
import { Chapter } from "@/components/landing/Landing";
import { Cards, JsonLd } from "@/components/seo/blocks";
import { LightField } from "@/components/ui/LightField";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Arrow } from "@/components/ui/Button";
import { breadcrumbLd, collectionLd } from "@/seo/jsonld";
import { allEntries, published } from "@/seo/registry";
import { textOf, wordCount } from "@/seo/quality";
import { pageMetadata } from "@/seo/site";
import s from "./research.module.css";

const reports = [...published.research].sort((a, b) => b.number - a.number);
const description =
  "Reports on how growth actually works — the economics, the systems and the decisions behind them. Every piece states what it rests on; nothing is invented to fill a chart.";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description,
  path: "/research",
  // Kept out of the index until there's something to read.
  noindex: reports.length === 0,
});

const minutes = (r: Research) => Math.max(1, Math.round(wordCount(textOf(r.body)) / 230));
const no = (n: number) => `No. ${String(n).padStart(2, "0")}`;
const hasModel = (r: Research) => r.body.some((b) => b.type === "figure" && b.figure.kind === "calculator");

export default function ResearchHub() {
  // Lead with the report readers can use on their own numbers, else the newest.
  const lead = reports.find(hasModel) ?? reports[0];
  const rest = reports.filter((r) => r !== lead);
  const updated = reports.map((r) => r.updated).sort().at(-1);
  const library = allEntries();

  return (
    <>
      <JsonLd data={collectionLd({ name: "Research", description, path: "/research", items: reports.map((r) => ({ name: r.title, path: `/research/${r.slug}` })) })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Research", path: "/research" }])} />

      <section className={s.masthead} aria-labelledby="page-title">
        <span className="scroll-progress" aria-hidden="true" />
        <LightField tone="blue" />
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className={s.crumbs}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <span aria-current="page">Research</span>
              </li>
            </ol>
          </nav>
          <div className={s.rule}>
            <span>{reports.length} reports</span>
            {inDesign.length > 0 && <span>{`${inDesign.length} ${inDesign.length === 1 ? "study" : "studies"} in design`}</span>}
            {updated && (
              <span>
                Updated <time dateTime={updated}>{fmtDate(updated)}</time>
              </span>
            )}
          </div>
          <h1 id="page-title" className={s.name} data-reveal="up">
            {brand.name} <em>Research</em>
          </h1>
          <p className={s.lead} data-reveal="up" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
            {description}
          </p>
        </div>
      </section>

      {reports.length === 0 ? (
        <Chapter id="reports" eyebrow="Reports" title={["Nothing published", "yet."]}>
          <p className={s.empty}>We only publish what we can stand behind. Until then, our guides and playbooks set out how we work.</p>
        </Chapter>
      ) : (
        <section className={s.front} aria-labelledby="reports-title">
          <div className="container">
            <h2 id="reports-title" className="sr-only">
              Reports
            </h2>
            {lead && (
              <Link href={`/research/${lead.slug}`} className={`glass ${s.leadCard}`} data-level="3" data-liquid="" data-interactive="true" data-pointer-light="" data-reveal="scale">
                <LightField tone="gold" />
                <span className={s.cardFlag}>
                  <b>{no(lead.number)}</b>
                  <span>{FORMAT_LABEL[lead.format]}</span>
                  {hasModel(lead) && <span className={s.live}>Interactive model</span>}
                  <span>{minutes(lead)} min read</span>
                </span>
                <span className={s.leadTitle}>{keepHyphens(lead.title)}</span>
                <span className={s.leadDek}>{lead.dek}</span>
                <ol className={s.leadPoints}>
                  {lead.keyPoints.slice(0, 3).map((k, i) => (
                    <li key={k}>
                      <i>{String(i + 1).padStart(2, "0")}</i>
                      {k}
                    </li>
                  ))}
                </ol>
                <span className={s.go}>
                  Read the report <Arrow />
                </span>
              </Link>
            )}

            <ul className={s.grid} role="list">
              {rest.map((r, i) => (
                <li key={r.slug} data-reveal="up" style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}>
                  <Link href={`/research/${r.slug}`} className={`glass ${s.card}`} data-level="2" data-liquid="" data-interactive="true" data-pointer-light="" data-tilt="6">
                    <span className={s.cardFlag}>
                      <b>{no(r.number)}</b>
                      <span>{FORMAT_LABEL[r.format]}</span>
                      <span>{minutes(r)} min</span>
                    </span>
                    <span className={s.cardTitle}>{keepHyphens(r.title)}</span>
                    <span className={s.cardDek}>{r.dek}</span>
                    <span className={s.go}>
                      Read <Arrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {inDesign.length > 0 && (
        <Chapter id="lab" eyebrow="In the lab" title={["Studies", "in design."]} lead="Original research, announced with its question and its method — never with results we don’t have yet. Each gets a page when the data is in and the method has been reviewed." light tone="violet" raised>
          <ul className={s.lab} role="list">
            {inDesign.map((st) => (
              <li key={st.title} className={`glass ${s.labCard}`} data-level="2" data-liquid="" data-reveal="up">
                <span className={s.status}>
                  <i aria-hidden="true" />
                  {st.status}
                </span>
                <h3 className={s.labTitle}>{st.title}</h3>
                <p className={s.question}>{st.question}</p>
                <details className={s.protocol}>
                  <summary>Read the protocol</summary>
                  <ol>
                    {st.protocol.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ol>
                </details>
              </li>
            ))}
          </ul>
        </Chapter>
      )}

      <Chapter id="standards" eyebrow="How we publish" title={["Four formats.", "One standard."]} lead="Every report says what kind of thing it is, and what it rests on. The rule underneath all of them: no number appears that we can’t show the working for.">
        <dl className={s.formats}>
          {(
            [
              ["analysis", "An argument built from how the work actually goes. Reasoned, specific, and clear about where it is judgment."],
              ["model", "Economics worked through with every input stated. Where it helps, you can run the model with your own numbers."],
              ["blueprint", "How a system is put together, with an example that is labelled as an example — not a benchmark, not a promise."],
              ["study", "Original data. Published only with its sample, period, sources and limitations in full, and after review."],
            ] as const
          ).map(([f, d]) => (
            <div key={f} className={`glass ${s.format}`} data-level="2" data-liquid="">
              <dt>{FORMAT_LABEL[f]}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </dl>
      </Chapter>

      <Chapter id="field" eyebrow="Field guides" title={["Guides and playbooks", "for doing the work."]} light tone="blue">
        <Cards entries={library.filter((e) => e.kind === "guide" || e.kind === "playbook")} label="Guides and playbooks" />
      </Chapter>

      <Chapter id="essays" eyebrow="Essays" title={["Point of", "view."]}>
        <Cards entries={library.filter((e) => e.kind === "insight")} label="Essays" />
      </Chapter>

      <ProjectCTA />
    </>
  );
}
