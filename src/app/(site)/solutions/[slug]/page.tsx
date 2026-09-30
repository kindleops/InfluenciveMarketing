import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { TickList } from "@/components/landing/Interactive";
import { JsonLd } from "@/components/seo/blocks";
import { Chapter, Convert, Duo, FaqList, LandingHero, Marquee, Process, RelatedRail, SignalPanel, Verdict } from "@/components/landing/Landing";
import { SectionDock } from "@/components/landing/SectionDock";
import { breadcrumbLd, serviceLd } from "@/seo/jsonld";
import { published, resolveRelated } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };
const get = (slug: string) => published.solutions.find((p) => p.slug === slug);

export function generateStaticParams() {
  return published.solutions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = get((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/solutions/${p.slug}` });
}

export default async function SolutionLanding({ params }: Props) {
  const p = get((await params).slug);
  if (!p) notFound();
  const path = `/solutions/${p.slug}`;
  const trail = [
    { name: "Solutions", path: "/solutions" },
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
        tone="blue"
        title={p.hero.title}
        lead={p.hero.lead}
        primary={start}
        secondary={{ label: "See the plan", href: "#plan" }}
        visual={<SignalPanel label="How we’ll know it worked" aside={p.name} items={p.measures} chip={["The outcome", "Agreed in writing up front"]} />}
      />
      <Marquee items={p.plan.map((x) => x.title)} tone={"blue"} />
      <Chapter id="outcome" eyebrow="The outcome" title={["What changes", "when it’s done."]}>
        <Verdict label="In one sentence" text={p.outcome} />
      </Chapter>
      <Chapter id="signs" eyebrow="Signs you need this" title={["If this sounds familiar,", "read on."]} light tone="violet">
        <TickList items={p.signs} storageKey={`solution-signs:${p.slug}`} label="apply to you" />
      </Chapter>
      <Chapter id="plan" eyebrow="The plan" title={["How we get", "from here to there."]}>
        <Process items={p.plan} />
      </Chapter>
      <Chapter id="deliverables" eyebrow="What you get" title={["Deliverables and", "what we track."]} light tone="blue" raised>
        <Duo a={{ title: "Deliverables", items: p.deliverables }} b={{ title: "Measures", items: p.measures }} />
      </Chapter>
      <Convert title={["Start with", "a first read."]} text="Tell us what’s in the way. You’ll hear back from someone senior with a view on where to start — before anyone talks scope." primary={start} secondary={{ label: "Read the questions first", href: "#faq" }} />
      <FaqList faqs={p.faqs} />
      <RelatedRail entries={resolveRelated(p.related, path)} />
      <ProjectCTA />
      <SectionDock
        items={[
          { id: "outcome", label: "Outcome" },
          { id: "signs", label: "Signs" },
          { id: "plan", label: "Plan" },
          { id: "deliverables", label: "Deliverables" },
          { id: "faq", label: "FAQ" },
        ]}
        cta={start}
      />
    </>
  );
}
