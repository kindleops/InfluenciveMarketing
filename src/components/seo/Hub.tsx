import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Section } from "@/components/ui/Surface";
import { breadcrumbLd, collectionLd } from "@/seo/jsonld";
import type { Entry } from "@/seo/registry";
import { Cards, Instrument, JsonLd } from "./blocks";
import s from "./seo.module.css";

/** A collection index: one hero, then the pages grouped with a line of context each. */
export function Hub({
  path,
  name,
  eyebrow,
  title,
  lead,
  accent,
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
  return (
    <>
      <JsonLd data={collectionLd({ name, description: lead, path, items: all.map((e) => ({ name: e.title, path: e.path })) })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name, path }])} />
      <PageHero
        eyebrow={eyebrow}
        crumbs={[{ name, path }]}
        accent={accent}
        title={[title[0], <em key="a" className="t-accent">{title[1]}</em>]}
        lead={lead}
        visual={instrument ? <Instrument label={instrument.label} aside={`${all.length} pages`} items={instrument.items} /> : undefined}
      />
      <Section tone="dark" labelledBy="hub-title">
        <h2 id="hub-title" className="sr-only">
          {name}
        </h2>
        {all.length === 0
          ? empty
          : groups
              .filter((g) => g.entries.length)
              .map((g) => (
                <div key={g.title} className={s.hubGroup}>
                  {groups.length > 1 && (
                    <div className={s.hubGroupHead}>
                      <h3 className={s.hubGroupTitle}>{g.title}</h3>
                      {g.note && <p className={s.hubGroupNote}>{g.note}</p>}
                    </div>
                  )}
                  <Cards entries={g.entries} label={g.title} />
                </div>
              ))}
      </Section>
      <ProjectCTA />
    </>
  );
}
