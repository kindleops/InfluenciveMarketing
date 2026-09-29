import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Section } from "@/components/ui/Surface";
import { Checklist, Faqs, Heading, Instrument, JsonLd, ProseSection, Related, Table } from "@/components/seo/blocks";
import { articleLd, breadcrumbLd } from "@/seo/jsonld";
import { published, resolveRelated } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };
const get = (slug: string) => published.alternatives.find((p) => p.slug === slug);

export function generateStaticParams() {
  return published.alternatives.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = get((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/alternatives/${p.slug}`, type: "article", updated: p.updated });
}

export default async function AlternativesPage({ params }: Props) {
  const p = get((await params).slug);
  if (!p) notFound();
  const path = `/alternatives/${p.slug}`;
  const trail = [
    { name: "Alternatives", path: "/alternatives" },
    { name: p.name, path },
  ];
  return (
    <>
      <JsonLd data={articleLd({ title: p.metaTitle, description: p.metaDescription, path, published: p.updated, updated: p.updated })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...trail])} />
      <PageHero
        eyebrow={p.hero.eyebrow}
        crumbs={trail}
        accent="violet"
        title={[p.hero.title[0], <em key="a" className="t-accent">{p.hero.title[1]}</em>]}
        lead={p.hero.lead}
        visual={<Instrument label="The options" aside={`${p.options.length} routes`} items={p.options.map((o) => o.name)} />}
      />
      <ProseSection kicker="What you’re replacing" heading={p.replacing.heading} body={p.replacing.body} id="replacing-title" />
      <Section tone="raised" labelledBy="reasons-title">
        <Heading id="reasons-title" eyebrow="Why people look elsewhere" title={["The usual reasons", "to change."]} />
        <Checklist items={p.reasons} />
      </Section>
      <Section tone="dark" labelledBy="options-title">
        <Heading id="options-title" eyebrow="The options" title={["Every realistic route,", "with its trade-offs."]} />
        <Table caption="Options compared" columns={["Option", "Best for", "Trade-offs"]} rows={p.options.map((o) => [o.name, o.bestFor, o.tradeoffs])} />
      </Section>
      <Section tone="raised" labelledBy="decide-title">
        <Heading id="decide-title" eyebrow="Deciding" title={["How to choose", "between them."]} />
        <Checklist items={p.howToDecide} />
      </Section>
      <Faqs faqs={p.faqs} />
      <Related entries={resolveRelated(p.related, path)} />
      <ProjectCTA />
    </>
  );
}
