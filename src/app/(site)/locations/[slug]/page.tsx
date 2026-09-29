import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@/config/brand";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Faqs, JsonLd, ProseSection, Related } from "@/components/seo/blocks";
import { breadcrumbLd } from "@/seo/jsonld";
import { published, resolveRelated } from "@/seo/registry";
import { abs, pageMetadata, SITE } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };
const get = (slug: string) => published.locations.find((p) => p.slug === slug);

/* Renders only for places listed in content/commercial/locations.ts — which
   must be places the studio genuinely operates. */
export function generateStaticParams() {
  return published.locations.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = get((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/locations/${p.slug}` });
}

export default async function LocationLanding({ params }: Props) {
  const p = get((await params).slug);
  if (!p) notFound();
  const path = `/locations/${p.slug}`;
  const trail = [
    { name: "Locations", path: "/locations" },
    { name: p.city, path },
  ];
  const business =
    p.presence === "office" && p.address
      ? {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: `${brand.name} — ${p.city}`,
          url: abs(path),
          parentOrganization: { "@id": `${SITE}/#organization` },
          address: { "@type": "PostalAddress", streetAddress: p.address, addressLocality: p.city, addressRegion: p.region, addressCountry: p.country },
        }
      : null;
  return (
    <>
      {business && <JsonLd data={business} />}
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...trail])} />
      <PageHero
        eyebrow={p.hero.eyebrow}
        crumbs={trail}
        title={[p.hero.title[0], <em key="a" className="t-accent">{p.hero.title[1]}</em>]}
        lead={p.hero.lead}
        meta={[
          { label: "Where", value: `${p.city}, ${p.region}` },
          { label: "Presence", value: p.presence === "office" ? "Office" : "Team on the ground" },
        ]}
      />
      <ProseSection kicker={p.city} heading={p.local.heading} body={p.local.body} id="local-title" />
      <Faqs faqs={p.faqs} tone="raised" />
      <Related entries={resolveRelated({ ...p.related, services: p.services }, path)} />
      <ProjectCTA />
    </>
  );
}
