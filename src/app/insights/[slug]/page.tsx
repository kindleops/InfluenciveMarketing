import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand } from "@/config/brand";
import { formatDate, getInsight, insights } from "@/content/insights";
import { InsightList } from "@/components/insights/InsightList";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { SplitText } from "@/components/ui/Typography";
import { AmbientGlow, Section } from "@/components/ui/Surface";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getInsight((await params).slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.dek,
    openGraph: { type: "article", title: a.title, description: a.dek, publishedTime: a.date },
  };
}

export default async function Article({ params }: Props) {
  const a = getInsight((await params).slug);
  if (!a) notFound();
  const more = insights.filter((i) => i.slug !== a.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.dek,
    datePublished: a.date,
    author: { "@type": "Organization", name: brand.name },
    publisher: { "@type": "Organization", name: brand.name },
  };

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article aria-labelledby="page-title">
        <header className={styles.header}>
          <AmbientGlow color="violet" size={1100} x="70%" y="0%" intensity={0.16} />
          <div className="container-narrow">
            <p className={styles.meta}>
              <Link href="/insights" className={styles.back}>
                ← Insights
              </Link>
              <span className={styles.cat}>{a.category}</span>
              <time dateTime={a.date}>{formatDate(a.date)}</time>
              <span>{a.readingTime} read</span>
            </p>
            <SplitText as="h1" id="page-title" className={`t-display-2 t-lit ${styles.title}`} lines={[a.title]} />
            <p className={styles.dek} data-reveal="up">
              {a.dek}
            </p>
          </div>
        </header>

        <div className={`container-narrow ${styles.body}`}>
          <div className={styles.prose}>
            {a.body.map((b, i) => {
              switch (b.type) {
                case "h2":
                  return <h2 key={i}>{b.text}</h2>;
                case "quote":
                  return (
                    <blockquote key={i}>
                      <p>{b.text}</p>
                    </blockquote>
                  );
                case "list":
                  return (
                    <ul key={i}>
                      {b.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  );
                default:
                  return <p key={i}>{b.text}</p>;
              }
            })}
          </div>
          <footer className={styles.byline}>
            <span>Published by {brand.name}</span>
            <Link href="/start" className={styles.bylineCta}>
              Discuss this with us →
            </Link>
          </footer>
        </div>
      </article>

      {more.length > 0 && (
        <Section tone="dark" spacing="tight" labelledBy="more-title">
          <h2 id="more-title" className={styles.moreTitle}>
            Keep reading
          </h2>
          <InsightList items={more} />
        </Section>
      )}

      <ProjectCTA />
    </>
  );
}
