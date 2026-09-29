import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article, articleStyles as s } from "@/components/editorial/Article";
import { published } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };
const get = (slug: string) => published.research.find((r) => r.slug === slug);

/* Reports that clear the gate; a study only with a complete, reviewed method. */
export function generateStaticParams() {
  return published.research.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = get((await params).slug);
  if (!r) return {};
  return pageMetadata({ title: r.metaTitle, description: r.metaDescription, path: `/research/${r.slug}`, type: "article", published: r.published, updated: r.updated });
}

export default async function ResearchPage({ params }: Props) {
  const r = get((await params).slug);
  if (!r) notFound();
  const m = r.methodology;
  return (
    <Article
      entry={r}
      section={{ name: "Research", path: "/research" }}
      kind="Research"
      report={{ number: r.number, format: r.format, keyPoints: r.keyPoints, basis: r.basis }}
      before={
        m && (
          <section className={`glass ${s.method}`} data-level="2" data-liquid="" aria-labelledby="method-title">
            <h2 id="method-title">Methodology</h2>
            <dl>
              <dt>Sample</dt>
              <dd>{m.sample}</dd>
              <dt>Period</dt>
              <dd>{m.period}</dd>
              <dt>Sources</dt>
              <dd>{m.sources.join("; ")}</dd>
              <dt>Limitations</dt>
              <dd>{m.limitations.join(" ")}</dd>
            </dl>
          </section>
        )
      }
    />
  );
}
