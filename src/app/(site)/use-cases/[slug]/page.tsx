import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Section } from "@/components/ui/Surface";
import { Checklist, Faqs, Heading, Instrument, ItemGrid, JsonLd, ProseSection, Related, Steps } from "@/components/seo/blocks";
import { breadcrumbLd, serviceLd } from "@/seo/jsonld";
import { published, resolveRelated } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };
const get = (slug: string) => published.useCases.find((p) => p.slug === slug);

export function generateStaticParams() {
  return published.useCases.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = get((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/use-cases/${p.slug}` });
}

export default async function UseCaseLanding({ params }: Props) {
  const p = get((await params).slug);
  if (!p) notFound();
  const path = `/use-cases/${p.slug}`;
  const trail = [
    { name: "Use cases", path: "/use-cases" },
    { name: p.name, path },
  ];
  return (
    <>
      <JsonLd data={serviceLd({ name: p.name, description: p.metaDescription, path, serviceType: p.name })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...trail])} />
      <PageHero
        eyebrow={p.hero.eyebrow}
        crumbs={trail}
        accent="cyan"
        title={[p.hero.title[0], <em key="a" className="t-accent">{p.hero.title[1]}</em>]}
        lead={p.hero.lead}
        visual={<Instrument label="Before you start" aside={p.name} items={p.checklist} />}
      />
      <ProseSection kicker="The situation" heading={p.situation.heading} body={p.situation.body} id="situation-title" />
      <Section tone="raised" labelledBy="risks-title">
        <Heading id="risks-title" eyebrow="The risks" title={["What usually", "goes wrong."]} />
        <ItemGrid items={p.risks} />
      </Section>
      <Section tone="dark" labelledBy="plan-title">
        <Heading id="plan-title" eyebrow="The plan" title={["How we’d", "run it."]} />
        <Steps items={p.plan} />
      </Section>
      <Section tone="raised" labelledBy="checklist-title">
        <Heading id="checklist-title" eyebrow="Checklist" title={["Before, during", "and after."]} />
        <Checklist items={p.checklist} />
      </Section>
      <Faqs faqs={p.faqs} />
      <Related entries={resolveRelated(p.related, path)} />
      <ProjectCTA />
    </>
  );
}
