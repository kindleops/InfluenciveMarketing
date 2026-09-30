import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { JsonLd } from "@/components/seo/blocks";
import { Bento, Chapter, Checks, Convert, FaqList, LandingHero, Marquee, Process, RelatedRail, SignalPanel, Statement } from "@/components/landing/Landing";
import { SectionDock } from "@/components/landing/SectionDock";
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
  const start = { label: "Start a project", href: "/start" };
  return (
    <>
      <JsonLd data={serviceLd({ name: p.name, description: p.metaDescription, path, serviceType: p.name })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...trail])} />
      <LandingHero
        crumbs={trail}
        eyebrow={p.hero.eyebrow}
        tone="teal"
        title={p.hero.title}
        lead={p.hero.lead}
        primary={start}
        secondary={{ label: "The checklist", href: "#checklist" }}
        visual={<SignalPanel label="Before you start" aside={p.name} items={p.checklist} chip={["Run as", "A plan with owners and dates"]} />}
      />
      <Marquee items={p.risks.map((x) => x.title)} tone={"teal"} />
      <Chapter id="situation" eyebrow="The situation" title={[p.situation.heading, ""]}>
        <Statement body={p.situation.body} />
      </Chapter>
      <Chapter id="risks" eyebrow="The risks" title={["What usually", "goes wrong."]} light tone="teal">
        <Bento items={p.risks} />
      </Chapter>
      <Chapter id="plan" eyebrow="The plan" title={["How we’d", "run it."]}>
        <Process items={p.plan} />
      </Chapter>
      <Chapter id="checklist" eyebrow="Checklist" title={["Before, during", "and after."]} light tone="blue" raised>
        <Checks items={p.checklist} />
      </Chapter>
      <Convert tone="teal" title={["In the middle", "of this now?"]} text="Tell us where things stand. Someone senior will read it and reply with what they’d do first." primary={start} secondary={{ label: "Read the questions first", href: "#faq" }} />
      <FaqList faqs={p.faqs} />
      <RelatedRail entries={resolveRelated(p.related, path)} />
      <ProjectCTA />
      <SectionDock
        items={[
          { id: "situation", label: "Situation" },
          { id: "risks", label: "Risks" },
          { id: "plan", label: "Plan" },
          { id: "checklist", label: "Checklist" },
          { id: "faq", label: "FAQ" },
        ]}
        cta={start}
      />
    </>
  );
}
