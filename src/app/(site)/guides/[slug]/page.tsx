import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "@/components/editorial/Article";
import { published } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

type Props = { params: Promise<{ slug: string }> };
const get = (slug: string) => published.guides.find((g) => g.slug === slug);

export function generateStaticParams() {
  return published.guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = get((await params).slug);
  if (!g) return {};
  return pageMetadata({ title: g.metaTitle, description: g.metaDescription, path: `/guides/${g.slug}`, type: "article", published: g.published, updated: g.updated });
}

export default async function GuidePage({ params }: Props) {
  const g = get((await params).slug);
  if (!g) notFound();
  return <Article entry={g} section={{ name: "Guides", path: "/guides" }} kind={`${g.level} guide`} />;
}
