import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "@/components/editorial/Article";
import { published } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };
const get = (slug: string) => published.playbooks.find((p) => p.slug === slug);

export function generateStaticParams() {
  return published.playbooks.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = get((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/playbooks/${p.slug}`, type: "article", published: p.published, updated: p.updated });
}

export default async function PlaybookPage({ params }: Props) {
  const p = get((await params).slug);
  if (!p) notFound();
  return (
    <Article
      entry={p}
      section={{ name: "Playbooks", path: "/playbooks" }}
      kind="Playbook"
      glance={[
        { label: "Time to set up", value: p.atAGlance.time },
        { label: "Who’s involved", value: p.atAGlance.team },
        { label: "Tools", value: p.atAGlance.tools.join(", ") },
        { label: "What you end up with", value: p.atAGlance.output },
      ]}
    />
  );
}
