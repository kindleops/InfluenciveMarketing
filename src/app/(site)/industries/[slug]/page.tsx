import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { JsonLd } from "@/components/seo/blocks";
import { Bento, Chapter, Convert, FaqList, LandingHero, Marquee, ModelChapter, PillLinks, Process, QuestionsChapter, RelatedRail, RoleMap, SignalPanel, Statement } from "@/components/landing/Landing";
import { SectionDock } from "@/components/landing/SectionDock";
import { breadcrumbLd, serviceLd } from "@/seo/jsonld";
import { combosFor, comboTitle, industryBySlug, published, resolveRelated } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };

/* Lead-driven, high-ticket industries: the paid search model earns its place. */
const MODEL_INDUSTRIES = new Set(["law-firms", "dental-medical-practices", "professional-services", "home-services", "real-estate"]);

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
  const markets = published.locations.filter((m) => m.sectors.some((x) => x.industry === p.slug));
  const start = { label: "Start a project", href: "/start" };

  return (
    <>
      <JsonLd data={serviceLd({ name: `Marketing for ${p.name}`, description: p.metaDescription, path, serviceType: "Marketing services", audience: p.name })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...trail])} />
      <LandingHero
        crumbs={trail}
        eyebrow={p.hero.eyebrow}
        tone="gold"
        title={p.hero.title}
        lead={p.hero.lead}
        primary={start}
        secondary={{ label: "The first ninety days", href: "#plan" }}
        visual={<SignalPanel label="The numbers that matter" aside={p.name} items={p.metrics.map((m) => m.title)} chip={["Read against", "Targets set before work begins"]} />}
      />
      <Marquee items={p.channels.map((x) => x.channel)} tone={"gold"} />

      <Chapter id="market" eyebrow="The market" title={[p.context.heading, ""]}>
        <Statement body={p.context.body} />
      </Chapter>

      <Chapter id="challenges" eyebrow="What gets in the way" title={["The problems", "worth solving first."]} light tone="gold">
        <Bento items={p.challenges} />
      </Chapter>

      <Chapter id="channels" eyebrow="The channel mix" title={["What each channel", "is actually for."]}>
        <RoleMap items={p.channels.map((c) => ({ name: c.channel, role: c.role }))} />
      </Chapter>

      <Chapter id="measures" eyebrow="Measurement" title={["What we report on —", "and why."]} light tone="blue" raised>
        <Bento items={p.metrics} />
      </Chapter>

      <Chapter id="plan" eyebrow="The first ninety days" title={["Where an engagement", "usually starts."]}>
        <Process items={p.firstNinetyDays} />
        <PillLinks label={`Services for ${p.name}`} items={combos.map((c) => ({ href: `/services/${c.service}/${c.industry}`, label: comboTitle(c) }))} />
        <PillLinks label={`Key markets for ${p.name}`} items={markets.map((m) => ({ href: `/locations/${m.slug}`, label: m.city }))} />
      </Chapter>

      {MODEL_INDUSTRIES.has(p.slug) && <ModelChapter tone="gold" />}
      <Convert tone="gold" title={["Tell us where", "growth is stuck."]} text="A senior strategist reads every brief and replies with a first view — before anyone talks scope." primary={start} secondary={{ label: "Read the questions first", href: "#faq" }} />
      <QuestionsChapter items={published.answers.filter((a) => a.related.industries?.includes(p.slug))} />
      <FaqList faqs={p.faqs} />
      <RelatedRail entries={resolveRelated(p.related, path)} />
      <ProjectCTA />
      <SectionDock
        items={[
          { id: "market", label: "Market" },
          { id: "challenges", label: "Challenges" },
          { id: "channels", label: "Channels" },
          { id: "plan", label: "First 90 days" },
          { id: "faq", label: "FAQ" },
        ]}
        cta={start}
      />
    </>
  );
}
