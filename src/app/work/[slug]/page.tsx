import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { getWork, work } from "@/content/work";
import { PageHero } from "@/components/layout/PageHero";
import { WorkVisual } from "@/components/work/WorkVisual";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Quote } from "@/components/proof/Proof";
import { Eyebrow } from "@/components/ui/Typography";
import { Section } from "@/components/ui/Surface";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getWork((await params).slug);
  if (!item) return {};
  return { title: item.kind === "case-study" && item.client ? item.client : item.title, description: item.summary };
}

export default async function WorkDetail({ params }: Props) {
  const item = getWork((await params).slug);
  if (!item) notFound();

  const i = work.findIndex((w) => w.slug === item.slug);
  const next = work[(i + 1) % work.length];
  const isCase = item.kind === "case-study";

  return (
    <>
      <PageHero
        eyebrow={isCase ? "Case study" : "Engagement blueprint"}
        accent={item.accent}
        title={[isCase && item.client ? item.client : item.title]}
        lead={item.summary}
        meta={[
          { label: "For", value: item.archetype },
          { label: "System", value: item.engagement },
          { label: "Timeline", value: item.duration },
        ]}
      />

      <div className={`container ${styles.mediaWrap}`}>
        <div className={`glass ${styles.media}`} data-level="3" data-pointer-light="" data-reveal="scale" data-card="">
          <div className={styles.mediaInner}>
            <WorkVisual kind={item.visual} accent={item.accent} />
          </div>
        </div>
        <ul className={styles.disciplines} role="list" aria-label="Disciplines">
          {item.disciplines.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>

      <Section tone="dark" labelledBy="challenge-title">
        <div className={styles.editorial}>
          <Eyebrow index="01">
            <span id="challenge-title">The challenge</span>
          </Eyebrow>
          <p className={styles.statement} data-reveal="up">
            {item.challenge}
          </p>
        </div>
      </Section>

      <Section tone="raised" labelledBy="approach-title">
        <div className={styles.editorial}>
          <Eyebrow index="02">
            <span id="approach-title">The approach</span>
          </Eyebrow>
          <ol className={styles.steps} role="list" data-stagger="">
            {item.approach.map((a, k) => (
              <li key={a.step}>
                <span className={styles.stepIdx}>{String(k + 1).padStart(2, "0")}</span>
                <p className={styles.stepName}>{a.step}</p>
                <p className={styles.stepDetail}>{a.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="dark" labelledBy="system-title">
        <div className={styles.editorial}>
          <Eyebrow index="03">
            <span id="system-title">The system built</span>
          </Eyebrow>
          <div className={styles.system}>
            {item.system.map((s, k) => (
              <div key={s.name} className={styles.component} data-reveal="up" style={{ "--reveal-delay": `${(k % 2) * 80}ms` } as CSSProperties}>
                <p className={styles.componentName}>{s.name}</p>
                <p className={styles.componentDetail}>{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="lit" labelledBy="measure-title">
        <div className={styles.editorial}>
          <Eyebrow index="04">
            <span id="measure-title">{isCase && item.results?.length ? "Results" : "How it is measured"}</span>
          </Eyebrow>
          {isCase && item.results?.length ? (
            <dl className={styles.results}>
              {item.results.map((r) => (
                <div key={r.label} data-reveal="up">
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                  {r.context && <p>{r.context}</p>}
                </div>
              ))}
            </dl>
          ) : (
            <div>
              <p className={styles.measureLead} data-reveal="up">
                Each signal is baselined before work begins and reported against throughout — so the system is judged on
                what it changes, not what it delivers.
              </p>
              <ol className={styles.signals} role="list" data-stagger="">
                {item.signals.map((s, k) => (
                  <li key={s}>
                    <span>{String(k + 1).padStart(2, "0")}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
        {item.testimonial && (
          <div className={styles.quote}>
            <Quote t={{ ...item.testimonial, company: item.client ?? "" }} />
          </div>
        )}
      </Section>

      <section className={styles.next} aria-label="Next">
        <Link href={`/work/${next.slug}`} className={styles.nextLink} data-cursor="Next">
          <span className="container">
            <span className={styles.nextLabel}>Next engagement</span>
            <span className={styles.nextTitle}>
              {next.title}
              <svg width="48" height="48" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h11.2M7.6 2.2 12.4 7l-4.8 4.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={styles.nextMeta}>{next.engagement}</span>
          </span>
        </Link>
      </section>

      <ProjectCTA />
    </>
  );
}
