import type { ReactNode } from "react";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Chapter, LandingHero, SignalPanel } from "@/components/landing/Landing";
import { breadcrumbLd, collectionLd } from "@/seo/jsonld";
import type { Entry } from "@/seo/registry";
import { Cards, JsonLd } from "./blocks";

const TONE = { brand: "blue", violet: "violet", cyan: "teal", gold: "gold" } as const;

/** A collection index: one hero, then the pages grouped with a line of context each. */
export function Hub({
  path,
  name,
  eyebrow,
  title,
  lead,
  accent = "brand",
  groups,
  empty,
  instrument,
}: {
  path: string;
  name: string;
  eyebrow: string;
  title: [string, string];
  lead: string;
  accent?: "brand" | "violet" | "cyan" | "gold";
  groups: { title: string; note?: string; entries: Entry[] }[];
  empty?: ReactNode;
  instrument?: { label: string; items: string[] };
}) {
  const all = groups.flatMap((g) => g.entries);
  const live = groups.filter((g) => g.entries.length);
  return (
    <>
      <JsonLd data={collectionLd({ name, description: lead, path, items: all.map((e) => ({ name: e.title, path: e.path })) })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name, path }])} />
      <LandingHero
        crumbs={[{ name, path }]}
        eyebrow={eyebrow}
        tone={TONE[accent]}
        title={title}
        lead={lead}
        primary={{ label: "Start a project", href: "/start" }}
        secondary={all.length ? { label: `Browse ${all.length} pages`, href: "#index" } : undefined}
        visual={instrument ? <SignalPanel label={instrument.label} aside={`${all.length} pages`} items={instrument.items} /> : undefined}
      />
      {all.length === 0 ? (
        <Chapter id="index" eyebrow={name} title={["Nothing here", "yet."]}>
          {empty}
        </Chapter>
      ) : (
        live.map((g, i) => (
          <Chapter key={g.title} id={i === 0 ? "index" : `group-${i}`} eyebrow={live.length > 1 ? name : "Index"} title={live.length > 1 ? [g.title, ""] : ["Every page,", "one line each."]} lead={g.note} light={i % 2 === 0} tone={TONE[accent]}>
            <Cards entries={g.entries} label={g.title} />
          </Chapter>
        ))
      )}
      <ProjectCTA />
    </>
  );
}
