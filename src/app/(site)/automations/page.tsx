import type { Metadata } from "next";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { FlowTheater } from "@/components/flows/FlowTheater";
import { FlowLibrary } from "@/components/flows/FlowLibrary";
import { Chapter, LandingHero, PillLinks } from "@/components/landing/Landing";
import { JsonLd } from "@/components/seo/blocks";
import { FLOWS } from "@/content/flows";
import { breadcrumbLd } from "@/seo/jsonld";
import { pageMetadata } from "@/seo/site";

const description =
  "Example automations across real tools: Shopify to QuickBooks, Typeform to HubSpot, Zendesk with AI drafts, invoices to bills, incidents to Linear. Played end to end.";

export const metadata: Metadata = pageMetadata({ title: "Automation Examples Across Your Tools", description, path: "/automations" });

/**
 * The automation library: example flows across the third-party systems
 * companies already run, played as a scene and then laid out in full.
 * Examples of what we build, not records of client work.
 */
export default function AutomationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Automation examples", path: "/automations" }])} />
      <LandingHero
        crumbs={[{ name: "Automation examples", path: "/automations" }]}
        eyebrow="Automation examples"
        tone="violet"
        title={["The work, moving", "between your tools."]}
        lead="Seven flows of the kind we build, across systems you probably already pay for. Each shows what triggers it, where a model decides, where a person signs off, and what lands in every tool. Every value on screen is an example."
        primary={{ label: "Automate something", href: "/start?need=automation" }}
        secondary={{ label: "See all seven", href: "#library" }}
      />

      <Chapter id="theater" eyebrow="Played end to end" title={["Pick a flow.", "Watch it run."]}>
        <FlowTheater flows={FLOWS} label="Example automations" />
      </Chapter>

      <Chapter id="library" eyebrow="The library" title={["Seven flows,", "step by step."]} light tone="violet">
        <FlowLibrary flows={FLOWS} />
      </Chapter>

      <Chapter id="build" eyebrow="Build yours" title={["Your tools,", "your rules."]} lead="Every flow here is a starting shape. Yours will have its own systems, exceptions and approvals, and we build it to be logged, retried and owned by someone on your team.">
        <PillLinks
          label="Where to go next"
          items={[
            { label: "AI automation", href: "/services/ai-automation" },
            { label: "Workflow & process automation", href: "/services/workflow-automation" },
            { label: "AI agent development", href: "/services/ai-agent-development" },
            { label: "n8n vs Zapier vs Make", href: "/answers/n8n-vs-zapier-vs-make" },
            { label: "What AI automation costs", href: "/answers/how-much-does-ai-automation-cost" },
          ]}
        />
      </Chapter>

      <ProjectCTA />
    </>
  );
}
