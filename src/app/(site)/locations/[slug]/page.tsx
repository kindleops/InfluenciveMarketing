import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@/config/brand";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { JsonLd } from "@/components/seo/blocks";
import { Bento, Chapter, Convert, FaqList, LandingHero, Marquee, PillLinks, RelatedRail, Statement } from "@/components/landing/Landing";
import { MarketBackdrop, MarketReadout } from "@/components/markets/MarketStage";
import { Ledger, SectorCards } from "@/components/markets/MarketModules";
import { SectionDock } from "@/components/landing/SectionDock";
import { breadcrumbLd, serviceLd } from "@/seo/jsonld";
import { industryBySlug, published, resolveRelated, serviceBySlug } from "@/seo/registry";
import { abs, pageMetadata, SITE } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };
const get = (slug: string) => published.locations.find((p) => p.slug === slug);

/* Market pages: written for each market, honest about how we're present. */
export function generateStaticParams() {
  return published.locations.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = get((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/locations/${p.slug}` });
}

const TONE = { Northeast: "violet", South: "gold", Midwest: "teal", West: "blue" } as const;

export default async function MarketLanding({ params }: Props) {
  const p = get((await params).slug);
  if (!p) notFound();
  const path = `/locations/${p.slug}`;
  const tone = TONE[p.area as keyof typeof TONE] ?? "blue";
  const start = { label: "Start a project", href: "/start" };
  const trail = [
    { name: "Markets", path: "/locations" },
    { name: p.city, path },
  ];
  // A premises is marked up only where one exists.
  const business =
    p.presence === "office" && p.address
      ? {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: `${brand.name} — ${p.city}`,
          url: abs(path),
          parentOrganization: { "@id": `${SITE}/#organization` },
          address: { "@type": "PostalAddress", streetAddress: p.address, addressLocality: p.city, addressRegion: p.regionCode, addressCountry: p.country },
        }
      : null;
  const services = p.services.map(serviceBySlug).filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <>
      <JsonLd data={serviceLd({ name: `Growth marketing for ${p.city} companies`, description: p.metaDescription, path, serviceType: "Marketing services", areaServed: { city: p.city, region: p.region, country: p.country } })} />
      {business && <JsonLd data={business} />}
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...trail])} />

      <LandingHero
        crumbs={trail}
        eyebrow={p.hero.eyebrow}
        tone={tone}
        title={p.hero.title}
        lead={p.hero.lead}
        primary={start}
        secondary={{ label: `The ${p.city.split(/[–,]/)[0]} market`, href: "#market" }}
        facts={[
          { label: "Working hours", value: p.timeZone },
          { label: "Serving", value: `${p.city.split(/[–,]/)[0]} and ${p.serviceArea.length} surrounding areas` },
        ]}
        backdrop={<MarketBackdrop slug={p.slug} neighbors={published.locations.filter((m) => m.slug !== p.slug).map((m) => ({ slug: m.slug, city: m.city.split(/[–,]/)[0] }))} />}
        visual={<MarketReadout slug={p.slug} city={p.city} timeZone={p.timeZone} area={p.serviceArea} presence={p.presence} />}
      />
      <Marquee items={[p.city.split(/[–,]/)[0], ...p.serviceArea]} tone={tone} />

      <Chapter id="market" eyebrow={`${p.city} · ${p.regionCode}`} title={[p.market.heading, ""]}>
        <Statement body={p.market.body} />
      </Chapter>

      <Chapter id="landscape" eyebrow="The landscape" title={["How growth works", "in this market."]} light tone={tone}>
        <Bento items={p.landscape} />
      </Chapter>

      <Chapter id="sectors" eyebrow="Where the demand is" title={["The industries", "we focus on here."]}>
        <SectorCards items={p.sectors.map((x) => ({ name: industryBySlug(x.industry)?.name ?? x.industry, note: x.note, href: `/industries/${x.industry}` }))} />
      </Chapter>

      <Chapter id="rules" eyebrow={`${p.region} rules`} title={["What changes", "the marketing here."]} light tone="violet" raised>
        <Ledger region={p.region} code={p.regionCode} items={p.rules} />
      </Chapter>

      {p.howWeWork && (
        <Chapter id="how-we-work" eyebrow="How we work" title={[p.howWeWork.heading, ""]}>
          <Statement body={p.howWeWork.body} />
          <PillLinks label={`Services for ${p.city} companies`} items={services.map((x) => ({ href: `/services/${x.slug}`, label: x.name }))} />
        </Chapter>
      )}

      <Convert tone={tone} title={["Growing in", `${p.city.split(/[–,]/)[0]}?`]} text="Tell us where things stand and what needs to change. A senior strategist reads every brief and replies with a first view — on your hours." primary={start} secondary={{ label: "Read the questions first", href: "#faq" }} />
      <FaqList faqs={p.faqs} />
      <RelatedRail entries={resolveRelated({ ...p.related, services: p.services }, path).slice(0, 8)} />
      <ProjectCTA />
      <SectionDock
        items={[
          { id: "market", label: "Market" },
          { id: "landscape", label: "Landscape" },
          { id: "sectors", label: "Industries" },
          { id: "rules", label: "Rules" },
          { id: "faq", label: "FAQ" },
        ]}
        cta={start}
      />
    </>
  );
}
