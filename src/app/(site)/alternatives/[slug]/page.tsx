import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { JsonLd } from "@/components/seo/blocks";
import { Checks, Chapter, Convert, FaqList, LandingHero, Options, RelatedRail, SignalPanel, Statement } from "@/components/landing/Landing";
import { SectionDock } from "@/components/landing/SectionDock";
import { articleLd, breadcrumbLd } from "@/seo/jsonld";
import { published, resolveRelated } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };
const get = (slug: string) => published.alternatives.find((p) => p.slug === slug);

export function generateStaticParams() {
  return published.alternatives.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = get((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/alternatives/${p.slug}`, type: "article", updated: p.updated });
}

export default async function AlternativesPage({ params }: Props) {
  const p = get((await params).slug);
  if (!p) notFound();
  const path = `/alternatives/${p.slug}`;
  const trail = [
    { name: "Alternatives", path: "/alternatives" },
    { name: p.name, path },
  ];
  const start = { label: "Get a straight answer", href: "/start?need=unsure" };
  return (
    <>
      <JsonLd data={articleLd({ title: p.metaTitle, description: p.metaDescription, path, published: p.updated, updated: p.updated })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...trail])} />
      <LandingHero
        crumbs={trail}
        eyebrow={p.hero.eyebrow}
        tone="violet"
        title={p.hero.title}
        lead={p.hero.lead}
        primary={{ label: "Compare the options", href: "#options" }}
        secondary={{ label: "How to decide", href: "#decide" }}
        visual={<SignalPanel label="The options" aside={`${p.options.length} routes`} items={p.options.map((o) => o.name)} chip={["Compared on", "Fit, cost and trade-offs"]} />}
      />
      <Chapter id="replacing" eyebrow="What you’re replacing" title={[p.replacing.heading, ""]}>
        <Statement body={p.replacing.body} />
      </Chapter>
      <Chapter id="reasons" eyebrow="Why people look elsewhere" title={["The usual reasons", "to change."]} light tone="violet">
        <Checks items={p.reasons} />
      </Chapter>
      <Chapter id="options" eyebrow="The options" title={["Every realistic route,", "with its trade-offs."]}>
        <Options items={p.options} />
      </Chapter>
      <Chapter id="decide" eyebrow="Deciding" title={["How to choose", "between them."]} light tone="blue" raised>
        <Checks items={p.howToDecide} />
      </Chapter>
      <Convert tone="violet" title={["Not sure which", "route fits?"]} text="Tell us what you have today and what isn’t working. We’ll tell you which route we’d take in your position — even when it isn’t us." primary={start} secondary={{ label: "Read the questions first", href: "#faq" }} />
      <FaqList faqs={p.faqs} />
      <RelatedRail entries={resolveRelated(p.related, path)} />
      <ProjectCTA />
      <SectionDock
        items={[
          { id: "replacing", label: "Replacing" },
          { id: "reasons", label: "Reasons" },
          { id: "options", label: "Options" },
          { id: "decide", label: "Deciding" },
          { id: "faq", label: "FAQ" },
        ]}
        cta={start}
      />
    </>
  );
}
