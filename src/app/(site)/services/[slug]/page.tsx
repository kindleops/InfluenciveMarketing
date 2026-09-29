import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Section } from "@/components/ui/Surface";
import { Facts, Faqs, Heading, Instrument, ItemGrid, JsonLd, ListPair, Pills, ProseSection, Related, Steps } from "@/components/seo/blocks";
import { DISCIPLINE_ACCENT, DISCIPLINE_NAME } from "@/seo/accents";
import { breadcrumbLd, serviceLd } from "@/seo/jsonld";
import { combosFor, industryBySlug, published, resolveRelated, serviceBySlug } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };

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
  const combos = combosFor({ service: p.slug });
  const trail = [
    { name: "Services", path: "/services" },
    { name: p.name, path },
  ];

  return (
    <>
      <JsonLd data={serviceLd({ name: p.name, description: p.metaDescription, path, serviceType: p.name })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...trail])} />

      <PageHero
        eyebrow={p.hero.eyebrow}
        crumbs={trail}
        accent={DISCIPLINE_ACCENT[p.discipline]}
        title={[p.hero.title[0], <em key="a" className="t-accent">{p.hero.title[1]}</em>]}
        lead={p.hero.lead}
        meta={[
          { label: "Engagement", value: p.engagement.model },
          { label: "Timeframe", value: p.engagement.duration },
        ]}
        visual={<Instrument label="What we measure" aside={DISCIPLINE_NAME[p.discipline]} items={p.measures} foot={["Read quarterly", p.name]} />}
      />

      <ProseSection kicker="The problem" heading={p.problem.heading} body={p.problem.body} id="problem-title" />

      <Section tone="dark" labelledBy="included-title">
        <Heading id="included-title" eyebrow="What’s included" title={["Everything the work", "actually needs."]} />
        <ItemGrid items={p.included} />
      </Section>

      <Section tone="raised" labelledBy="approach-title">
        <Heading id="approach-title" eyebrow="How we run it" title={["A sequence,", "not a checklist."]} />
        <Steps items={p.approach} />
      </Section>

      <Section tone="dark" labelledBy="fit-title">
        <Heading id="fit-title" eyebrow="Fit" title={["Who this is for —", "and who it isn’t."]} />
        <ListPair a={{ title: "A good fit", items: p.fit.for }} b={{ title: "Not the right fit", items: p.fit.notFor, quiet: true }} />
        <Facts
          items={[
            { label: "Engagement", value: p.engagement.model },
            { label: "Timeframe", value: p.engagement.duration },
            { label: "Team", value: p.engagement.team },
          ]}
        />
        {combos.length > 0 && (
          <div style={{ marginTop: "var(--space-8)" }}>
            <p className="t-label">{p.name} by industry</p>
            <Pills items={combos.map((c) => ({ href: `/services/${c.service}/${c.industry}`, label: `${p.name} for ${industryBySlug(c.industry)!.name}` }))} />
          </div>
        )}
      </Section>

      <Faqs faqs={p.faqs} />
      <Related entries={resolveRelated(p.related, path)} />
      <ProjectCTA />
    </>
  );
}
