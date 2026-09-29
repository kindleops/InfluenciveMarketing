import type { Metadata } from "next";
import { Hub } from "@/components/seo/Hub";
import { allEntries } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";

export const metadata: Metadata = pageMetadata({
  title: "Playbooks",
  description: "Operational playbooks for running marketing systems: creative testing, speed to lead and topic cluster programs — phases, owners, cadences and decision rules.",
  path: "/playbooks",
});

export default function PlaybooksHub() {
  const entries = allEntries().filter((e) => e.kind === "playbook");
  return (
    <Hub
      path="/playbooks"
      name="Playbooks"
      eyebrow="Playbooks"
      accent="brand"
      title={["How we run it,", "step by step."]}
      lead="The operating procedures behind the work: who does what, how often, and how decisions get made. Take them and run them yourself."
      groups={[{ title: "Playbooks", entries }]}
      instrument={{ label: "Playbooks", items: entries.map((e) => e.title) }}
    />
  );
}
