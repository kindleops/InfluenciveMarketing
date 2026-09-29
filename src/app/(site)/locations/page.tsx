import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hub } from "@/components/seo/Hub";
import { allEntries, published } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

export const metadata: Metadata = pageMetadata({
  title: "Locations",
  description: "Where our teams and offices are, and how we work with companies nearby and remotely. Listed only for places we genuinely operate.",
  path: "/locations",
});

/** 404 until a real location is published (see content/commercial/locations.ts). */
export default function LocationsHub() {
  if (!published.locations.length) notFound();
  const entries = allEntries().filter((e) => e.kind === "location");
  return (
    <Hub
      path="/locations"
      name="Locations"
      eyebrow="Locations"
      title={["Where", "we work."]}
      lead="Our teams and offices, and how we work with companies near them."
      groups={[{ title: "Locations", entries }]}
    />
  );
}
