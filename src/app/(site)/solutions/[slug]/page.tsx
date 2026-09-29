import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Section } from "@/components/ui/Surface";
import { Checklist, Faqs, Heading, Instrument, JsonLd, ListPair, Related, Steps, Verdict } from "@/components/seo/blocks";
import { breadcrumbLd, serviceLd } from "@/seo/jsonld";
import { published, resolveRelated } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };
const get = (slug: string) => published.solutions.find((p) => p.slug === slug);

export function generateStaticParams() {
  return published.solutions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = get((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/solutions/${p.slug}` });
}

export default async function SolutionLanding({ params }: Props) {
  const p = get((await params).slug);
  if (!p) notFound();
  const path = `/solutions/${p.slug}`;
  const trail = [
    { name: "Solutions", path: "/solutions" },
    { name: p.name, path },
  ];
  return (
    <>
      <JsonLd data={serviceLd({ name: p.name, description: p.metaDescription, path, serviceType: p.name })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...trail])} />
      <PageHero
        eyebrow={p.hero.eyebrow}
        crumbs={trail}
        accent="brand"
        title={[p.hero.title[0], <em key="a" className="t-accent">{p.hero.title[1]}</em>]}
        lead={p.hero.lead}
        visual={<Instrument label="How we’ll know it worked" aside={p.name} items={p.measures} />}
      />
      <Section tone="dark" labelledBy="outcome-title">
        <h2 id="outcome-title" className="sr-only">
          The outcome
        </h2>
        <Verdict label="The outcome" text={p.outcome} />
      </Section>
      <Section tone="raised" labelledBy="signs-title">
        <Heading id="signs-title" eyebrow="Signs you need this" title={["If this sounds familiar,", "read on."]} />
        <Checklist items={p.signs} />
      </Section>
      <Section tone="dark" labelledBy="plan-title">
        <Heading id="plan-title" eyebrow="The plan" title={["How we get", "from here to there."]} />
        <Steps items={p.plan} />
      </Section>
      <Section tone="raised" labelledBy="deliverables-title">
        <Heading id="deliverables-title" eyebrow="What you get" title={["Deliverables and", "what we track."]} />
        <ListPair a={{ title: "Deliverables", items: p.deliverables }} b={{ title: "Measures", items: p.measures }} />
      </Section>
      <Faqs faqs={p.faqs} />
      <Related entries={resolveRelated(p.related, path)} />
      <ProjectCTA />
    </>
  );
}
