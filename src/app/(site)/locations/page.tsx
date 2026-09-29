import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hub } from "@/components/seo/Hub";
import { allEntries, published } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

export const metadata: Metadata = pageMetadata({
  title: "Markets",
  description: "The US markets we work in as a remote team — each page covers that market's economy, search landscape, key industries and the state rules that shape the marketing.",
  path: "/locations",
});

const AREAS = ["Northeast", "South", "Midwest", "West"];

/** 404 until a market page is published. */
export default function MarketsHub() {
  if (!published.locations.length) notFound();
  const entries = allEntries().filter((e) => e.kind === "location");
  const areaOf = (slug: string) => published.locations.find((l) => l.slug === slug)?.area ?? "Other";
  return (
    <Hub
      path="/locations"
      name="Markets"
      eyebrow="Markets"
      accent="gold"
      title={["One remote team.", "Every major market."]}
      lead="We don’t keep offices; we keep your hours. Each market page covers how growth works there — the economy, the search landscape, the industries and the state rules that shape the marketing."
      groups={AREAS.map((a) => ({ title: a, entries: entries.filter((e) => areaOf(e.slug) === a) }))}
      instrument={{ label: "Markets", items: entries.slice(0, 6).map((e) => e.title) }}
    />
  );
}
