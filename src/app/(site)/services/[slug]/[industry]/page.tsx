import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { JsonLd } from "@/components/seo/blocks";
import { Bento, Chapter, Convert, FaqList, LandingHero, Marquee, PillLinks, RelatedRail, SignalPanel, Statement } from "@/components/landing/Landing";
import { SectionDock } from "@/components/landing/SectionDock";
import { ACCENT_TONE, DISCIPLINE_NEED } from "@/seo/accents";
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
  const tone = ACCENT_TONE[DISCIPLINE_ACCENT[service.discipline]];
  const start = { label: "Start a project", href: `/start?need=${DISCIPLINE_NEED[service.discipline]}` };
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

      <LandingHero
        crumbs={trail}
        eyebrow={title}
        tone={tone}
        title={[`${service.name} for`, `${ind.name}.`]}
        lead={c.lead}
        primary={start}
        secondary={{ label: "Where we start", href: "#priorities" }}
        visual={<SignalPanel label="What we measure" aside={ind.name} items={c.measures} chip={[service.name, ind.name]} />}
      />
      <Marquee items={c.priorities.map((x) => x.title)} tone={tone} />

      <Chapter id="angle" eyebrow="Why it’s different here" title={[`What changes about ${service.name}`, `in ${ind.name}.`]}>
        <Statement body={c.angle} />
      </Chapter>

      <Chapter id="priorities" eyebrow="Where we start" title={["The priorities", "that move revenue."]} light tone={tone}>
        <Bento items={c.priorities} />
      </Chapter>

      <Chapter id="pitfalls" eyebrow="What goes wrong" title={["The mistakes", "we see most."]}>
        <Bento items={c.pitfalls} />
        <PillLinks
          label="Go deeper"
          items={[
            { href: `/services/${service.slug}`, label: `${service.name}: the full service` },
            { href: `/industries/${ind.slug}`, label: `Marketing for ${ind.name}` },
            ...siblings.map((x) => ({ href: `/services/${x.service}/${x.industry}`, label: comboTitle(x) })),
          ]}
        />
      </Chapter>

      <Convert tone={tone} title={["Ready when", "you are."]} text="Tell us where things stand and what needs to change. A senior strategist reads every brief and replies with a first view." primary={start} secondary={{ label: "Read the questions first", href: "#faq" }} />
      <FaqList faqs={c.faqs} />
      <RelatedRail entries={related.slice(0, 8)} />
      <ProjectCTA />
      <SectionDock
        items={[
          { id: "angle", label: "Why it’s different" },
          { id: "priorities", label: "Priorities" },
          { id: "pitfalls", label: "Pitfalls" },
          { id: "faq", label: "FAQ" },
        ]}
        cta={start}
      />
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
