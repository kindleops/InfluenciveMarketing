import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Section } from "@/components/ui/Surface";
import { Channels, Faqs, Heading, Instrument, ItemGrid, JsonLd, Pills, ProseSection, Related, Steps } from "@/components/seo/blocks";
import { breadcrumbLd, serviceLd } from "@/seo/jsonld";
import { combosFor, comboTitle, industryBySlug, published, resolveRelated } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return published.industries.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = industryBySlug((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/industries/${p.slug}` });
}

export default async function IndustryLanding({ params }: Props) {
  const p = industryBySlug((await params).slug);
  if (!p) notFound();
  const path = `/industries/${p.slug}`;
  const trail = [
    { name: "Industries", path: "/industries" },
    { name: p.name, path },
  ];
  const combos = combosFor({ industry: p.slug });

  return (
    <>
      <JsonLd data={serviceLd({ name: `Marketing for ${p.name}`, description: p.metaDescription, path, serviceType: "Marketing services", audience: p.name })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...trail])} />
      <PageHero
        eyebrow={p.hero.eyebrow}
        crumbs={trail}
        accent="gold"
        title={[p.hero.title[0], <em key="a" className="t-accent">{p.hero.title[1]}</em>]}
        lead={p.hero.lead}
        visual={<Instrument label="The numbers that matter" aside={p.name} items={p.metrics.map((m) => m.title)} />}
      />
      <ProseSection kicker="The market" heading={p.context.heading} body={p.context.body} id="context-title" />

      <Section tone="raised" labelledBy="challenges-title">
        <Heading id="challenges-title" eyebrow="What gets in the way" title={["The problems", "worth solving first."]} />
        <ItemGrid items={p.challenges} />
      </Section>

      <Section tone="dark" labelledBy="channels-title">
        <Heading id="channels-title" eyebrow="The channel mix" title={["What each channel", "is actually for."]} />
        <Channels items={p.channels} />
      </Section>

      <Section tone="raised" labelledBy="metrics-title">
        <Heading id="metrics-title" eyebrow="Measurement" title={["What we report on —", "and why."]} />
        <ItemGrid items={p.metrics} numbered={false} />
      </Section>

      <Section tone="dark" labelledBy="plan-title">
        <Heading id="plan-title" eyebrow="The first ninety days" title={["Where an engagement", "usually starts."]} />
        <Steps items={p.firstNinetyDays} />
        {combos.length > 0 && (
          <div style={{ marginTop: "var(--space-8)" }}>
            <p className="t-label">Services for {p.name}</p>
            <Pills items={combos.map((c) => ({ href: `/services/${c.service}/${c.industry}`, label: comboTitle(c) }))} />
          </div>
        )}
      </Section>

      <Faqs faqs={p.faqs} tone="raised" />
      <Related entries={resolveRelated(p.related, path)} />
      <ProjectCTA />
    </>
  );
}
