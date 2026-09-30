import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { FitCheck } from "@/components/landing/Interactive";
import { JsonLd } from "@/components/seo/blocks";
import { Bento, Chapter, Convert, FaqList, LandingHero, Marquee, ModelChapter, PillLinks, Process, RelatedRail, SignalPanel, Spec, Statement } from "@/components/landing/Landing";
import { SectionDock } from "@/components/landing/SectionDock";
import { ACCENT_TONE, DISCIPLINE_ACCENT, DISCIPLINE_NAME, DISCIPLINE_NEED } from "@/seo/accents";
import { breadcrumbLd, serviceLd } from "@/seo/jsonld";
import { combosFor, industryBySlug, published, resolveRelated, serviceBySlug } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };

/* Services where the buyer is weighing what a click or a lead is worth. */
const MODEL_SERVICES = new Set(["paid-media"]);

export function generateStaticParams() {
  return published.services.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = serviceBySlug((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/services/${p.slug}` });
}

export default async function ServiceLanding({ params }: Props) {
  const p = serviceBySlug((await params).slug);
  if (!p) notFound();
  const path = `/services/${p.slug}`;
  const tone = ACCENT_TONE[DISCIPLINE_ACCENT[p.discipline]];
  const start = { label: "Start a project", href: `/start?need=${DISCIPLINE_NEED[p.discipline]}` };
  const combos = combosFor({ service: p.slug });
  const trail = [
    { name: "Services", path: "/services" },
    { name: p.name, path },
  ];

  return (
    <>
      <JsonLd data={serviceLd({ name: p.name, description: p.metaDescription, path, serviceType: p.name })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...trail])} />

      <LandingHero
        crumbs={trail}
        eyebrow={`${p.hero.eyebrow} · ${DISCIPLINE_NAME[p.discipline]}`}
        tone={tone}
        title={p.hero.title}
        lead={p.hero.lead}
        primary={start}
        secondary={{ label: "What’s included", href: "#included" }}
        facts={[
          { label: "Engagement", value: p.engagement.model },
          { label: "Timeframe", value: p.engagement.duration },
        ]}
        visual={<SignalPanel label="What we measure" aside={p.name} items={p.measures} chip={["Judged on", "Targets agreed before work begins"]} />}
      />
      <Marquee items={p.included.map((x) => x.title)} tone={tone} />

      <Chapter id="problem" eyebrow="The problem" title={[p.problem.heading, ""]}>
        <Statement body={p.problem.body} />
      </Chapter>

      <Chapter id="included" eyebrow="What’s included" title={["Everything the work", "actually needs."]} light tone={tone}>
        <Bento items={p.included} />
      </Chapter>

      <Chapter id="process" eyebrow="How we run it" title={["A sequence,", "not a checklist."]}>
        <Process items={p.approach} />
      </Chapter>

      <Chapter id="fit" eyebrow="Fit" title={["Who this is for —", "and who it isn’t."]} light tone="violet">
        <FitCheck items={p.fit.for} notFor={p.fit.notFor} href={start.href} alt={{ label: "How to choose the right partner", href: "/guides/how-to-choose-a-marketing-agency" }} />
        <Spec
          items={[
            { label: "Engagement", value: p.engagement.model },
            { label: "Timeframe", value: p.engagement.duration },
            { label: "Team", value: p.engagement.team },
          ]}
          cta={{ label: "Get a scoped proposal", href: start.href }}
        />
        <PillLinks label={`${p.name} by industry`} items={combos.map((c) => ({ href: `/services/${c.service}/${c.industry}`, label: `${p.name} for ${industryBySlug(c.industry)!.name}` }))} />
      </Chapter>

      {MODEL_SERVICES.has(p.slug) && <ModelChapter tone={tone} />}

      <Convert
        tone={tone}
        title={["Ready when", "you are."]}
        text="Tell us where things stand and what needs to change. You’ll hear back from someone senior — not a sales sequence."
        primary={start}
        secondary={{ label: "Read the questions first", href: "#faq" }}
      />

      <FaqList faqs={p.faqs} />
      <RelatedRail entries={resolveRelated(p.related, path)} />
      <ProjectCTA />

      <SectionDock
        items={[
          { id: "problem", label: "Problem" },
          { id: "included", label: "Included" },
          { id: "process", label: "Process" },
          { id: "fit", label: "Fit" },
          { id: "faq", label: "FAQ" },
        ]}
        cta={start}
      />
    </>
  );
}
