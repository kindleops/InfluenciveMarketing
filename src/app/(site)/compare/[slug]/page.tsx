import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { JsonLd } from "@/components/seo/blocks";
import { Chapter, Convert, Duo, FaqList, LandingHero, Marquee, ModelChapter, RelatedRail, Verdict, Versus, VersusVisual } from "@/components/landing/Landing";
import { SectionDock } from "@/components/landing/SectionDock";
import { articleLd, breadcrumbLd } from "@/seo/jsonld";
import { published, resolveRelated } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };
const get = (slug: string) => published.compare.find((p) => p.slug === slug);

export function generateStaticParams() {
  return published.compare.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = get((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/compare/${p.slug}`, type: "article", updated: p.updated });
}

export default async function ComparePage({ params }: Props) {
  const p = get((await params).slug);
  if (!p) notFound();
  const path = `/compare/${p.slug}`;
  const [a, b] = p.options;
  const trail = [
    { name: "Compare", path: "/compare" },
    { name: p.name, path },
  ];
  const start = { label: "Get a straight answer", href: "/start?need=unsure" };
  return (
    <>
      <JsonLd data={articleLd({ title: p.metaTitle, description: p.metaDescription, path, published: p.updated, updated: p.updated })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...trail])} />
      <LandingHero crumbs={trail} eyebrow={p.hero.eyebrow} tone="violet" title={p.hero.title} lead={p.hero.lead} primary={{ label: "See the comparison", href: "#compare" }} secondary={{ label: "Skip to our view", href: "#verdict" }} visual={<VersusVisual a={a.name} b={b.name} />} />
      <Marquee items={p.criteria.map((x) => x.criterion)} tone={"violet"} />
      <Chapter id="compare" eyebrow="Side by side" title={[`${a.name} and ${b.name},`, "criterion by criterion."]} light tone="violet">
        <Versus a={a} b={b} criteria={p.criteria} />
      </Chapter>
      <Chapter id="verdict" eyebrow="Choosing" title={["When each", "is the right call."]}>
        <Duo a={{ title: `Choose ${a.name} when`, items: p.chooseA }} b={{ title: `Choose ${b.name} when`, items: p.chooseB }} />
        <Verdict label="Our view" text={p.verdict} />
      </Chapter>
      {p.slug === "seo-vs-ppc" && <ModelChapter tone="violet" />}
      <Convert tone="violet" title={["Still weighing", "it up?"]} text="Tell us about the business and what you’re deciding between. We’ll give you our honest read — including when the answer isn’t us." primary={start} secondary={{ label: "Read the questions first", href: "#faq" }} />
      <FaqList faqs={p.faqs} />
      <RelatedRail entries={resolveRelated(p.related, path)} />
      <ProjectCTA />
      <SectionDock
        items={[
          { id: "compare", label: "Comparison" },
          { id: "verdict", label: "Our view" },
          { id: "faq", label: "FAQ" },
        ]}
        cta={start}
      />
    </>
  );
}
