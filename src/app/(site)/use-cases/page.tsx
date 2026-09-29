import type { Metadata } from "next";
import { Hub } from "@/components/seo/Hub";
import { allEntries } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

export const metadata: Metadata = pageMetadata({
  title: "Use cases",
  description: "Situations companies bring us into: launches, migrations, scaling paid media, traffic drops, growth after a raise and supporting an in-house team.",
  path: "/use-cases",
});

export default function UseCasesHub() {
  const entries = allEntries().filter((e) => e.kind === "use-case");
  return (
    <Hub
      path="/use-cases"
      name="Use cases"
      eyebrow="Use cases"
      accent="cyan"
      title={["The moment", "you’re in."]}
      lead="Some work is defined by timing more than discipline — a launch date, a migration, a round just closed. These pages cover what to watch for and how we run each."
      groups={[{ title: "Use cases", entries }]}
      instrument={{ label: "Use cases", items: entries.map((e) => e.title) }}
    />
  );
}
