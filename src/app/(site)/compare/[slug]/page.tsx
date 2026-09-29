import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Section } from "@/components/ui/Surface";
import { Faqs, Heading, ItemGrid, JsonLd, ListPair, Related, Table, Verdict } from "@/components/seo/blocks";
import { articleLd, breadcrumbLd } from "@/seo/jsonld";
import { published, resolveRelated } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };
const get = (slug: string) => published.compare.find((p) => p.slug === slug);

export function generateStaticParams() {
  return published.compare.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = get((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/compare/${p.slug}`, type: "article", updated: p.updated });
}

export default async function ComparePage({ params }: Props) {
  const p = get((await params).slug);
  if (!p) notFound();
  const path = `/compare/${p.slug}`;
  const [a, b] = p.options;
  const trail = [
    { name: "Compare", path: "/compare" },
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
      />
      <Section tone="dark" labelledBy="options-title">
        <Heading id="options-title" eyebrow="The two options" title={[`${a.name} and ${b.name},`, "in one line each."]} />
        <ItemGrid items={p.options.map((o) => ({ title: o.name, detail: o.summary }))} numbered={false} />
      </Section>
      <Section tone="raised" labelledBy="criteria-title">
        <Heading id="criteria-title" eyebrow="Side by side" title={["How they compare,", "criterion by criterion."]} />
        <Table caption={`${a.name} compared with ${b.name}`} columns={["Criterion", a.name, b.name]} rows={p.criteria.map((c) => [c.criterion, c.a, c.b])} />
      </Section>
      <Section tone="dark" labelledBy="choose-title">
        <Heading id="choose-title" eyebrow="Choosing" title={["When each", "is the right call."]} />
        <ListPair a={{ title: `Choose ${a.name} when`, items: p.chooseA }} b={{ title: `Choose ${b.name} when`, items: p.chooseB }} />
        <Verdict label="Our view" text={p.verdict} />
      </Section>
      <Faqs faqs={p.faqs} tone="raised" />
      <Related entries={resolveRelated(p.related, path)} />
      <ProjectCTA />
    </>
  );
}
