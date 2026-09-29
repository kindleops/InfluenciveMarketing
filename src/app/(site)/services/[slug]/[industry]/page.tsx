import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Section } from "@/components/ui/Surface";
import { Faqs, Heading, Instrument, ItemGrid, JsonLd, Pills, ProseSection, Related } from "@/components/seo/blocks";
import { DISCIPLINE_ACCENT } from "@/seo/accents";
import { breadcrumbLd, serviceLd } from "@/seo/jsonld";
import { combosFor, comboTitle, industryBySlug, publishedCombos, resolveRelated, serviceBySlug } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string; industry: string }> };

export function generateStaticParams() {
  return publishedCombos.map((c) => ({ slug: c.service, industry: c.industry }));
}

const find = (service: string, industry: string) => publishedCombos.find((c) => c.service === service && c.industry === industry);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, industry } = await params;
  const c = find(slug, industry);
  if (!c) return {};
  return pageMetadata({ title: c.metaTitle, description: c.metaDescription, path: `/services/${slug}/${industry}` });
}

export default async function ComboLanding({ params }: Props) {
  const { slug, industry } = await params;
  const c = find(slug, industry);
  if (!c) notFound();
  const service = serviceBySlug(c.service)!;
  const ind = industryBySlug(c.industry)!;
  const path = `/services/${c.service}/${c.industry}`;
  const title = comboTitle(c);
  const trail = [
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
    { name: ind.name, path },
  ];
  const siblings = [
    ...combosFor({ industry: c.industry }).filter((x) => x.service !== c.service),
    ...combosFor({ service: c.service }).filter((x) => x.industry !== c.industry),
  ];
  const related = resolveRelated({ services: [service.slug], industries: [ind.slug], ...pick(service.related, ind.related) }, path);

  return (
    <>
      <JsonLd data={serviceLd({ name: title, description: c.metaDescription, path, serviceType: service.name, audience: ind.name })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...trail])} />

      <PageHero
        eyebrow={title}
        crumbs={trail}
        accent={DISCIPLINE_ACCENT[service.discipline]}
        title={[`${service.name} for`, <em key="a" className="t-accent">{ind.name}.</em>]}
        lead={c.lead}
        visual={<Instrument label="What we measure" aside={ind.name} items={c.measures} foot={[service.name, ind.name]} />}
      />

      <ProseSection kicker="Why it’s different here" heading={`What changes about ${service.name} in ${ind.name}.`} body={c.angle} id="angle-title" />

      <Section tone="raised" labelledBy="priorities-title">
        <Heading id="priorities-title" eyebrow="Where we start" title={["The priorities", "that move revenue."]} />
        <ItemGrid items={c.priorities} />
      </Section>

      <Section tone="dark" labelledBy="pitfalls-title">
        <Heading id="pitfalls-title" eyebrow="What goes wrong" title={["The mistakes", "we see most."]} />
        <ItemGrid items={c.pitfalls} numbered={false} />
        <div style={{ marginTop: "var(--space-8)" }}>
          <p className="t-label">Go deeper</p>
          <Pills
            items={[
              { href: `/services/${service.slug}`, label: `${service.name}: the full service` },
              { href: `/industries/${ind.slug}`, label: `Marketing for ${ind.name}` },
              ...siblings.map((x) => ({ href: `/services/${x.service}/${x.industry}`, label: comboTitle(x) })),
            ]}
          />
        </div>
      </Section>

      <Faqs faqs={c.faqs} tone="raised" />
      <Related entries={related.slice(0, 6)} />
      <ProjectCTA />
    </>
  );
}

/** Library links shared by the parent service and industry. */
function pick(a: { guides?: string[]; playbooks?: string[] }, b: { guides?: string[]; playbooks?: string[] }) {
  return {
    guides: [...new Set([...(a.guides ?? []), ...(b.guides ?? [])])],
    playbooks: [...new Set([...(a.playbooks ?? []), ...(b.playbooks ?? [])])],
  };
}
