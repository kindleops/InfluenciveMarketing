import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { MARKET_GEO } from "@/content/geo";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { Chapter } from "@/components/landing/Landing";
import { LocalTime } from "@/components/markets/LocalTime";
import { MarketMap } from "@/components/markets/MarketMap";
import { JsonLd } from "@/components/seo/blocks";
import { Button, Arrow } from "@/components/ui/Button";
import { LightField } from "@/components/ui/LightField";
import { breadcrumbLd, collectionLd } from "@/seo/jsonld";
import { industryBySlug, published } from "@/seo/registry";
import { pageMetadata } from "@/seo/site";
import s from "./markets.module.css";
import m from "@/components/markets/markets.module.css";

const description =
  "The US markets we work in — each page covers that market's economy, search landscape, key industries and the state rules that shape the marketing.";

export const metadata: Metadata = pageMetadata({ title: "Markets", description, path: "/locations" });

const AREAS = ["Northeast", "South", "Midwest", "West"] as const;
const coord = (v: number, p: string, n: string) => `${Math.abs(v).toFixed(2)}° ${v >= 0 ? p : n}`;

/** 404 until a market page is published. */
export default function MarketsHub() {
  const markets = published.locations;
  if (!markets.length) notFound();
  const zones = new Set(markets.map((x) => MARKET_GEO[x.slug]?.tz).filter(Boolean));
  const sectorNames = (x: (typeof markets)[number]) => x.sectors.map((y) => industryBySlug(y.industry)?.name ?? y.industry);

  return (
    <>
      <JsonLd data={collectionLd({ name: "Markets", description, path: "/locations", items: markets.map((x) => ({ name: x.city, path: `/locations/${x.slug}` })) })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Markets", path: "/locations" }])} />

      <section className={s.hero} aria-labelledby="page-title">
        <span className="scroll-progress" aria-hidden="true" />
        <LightField tone="blue" />
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className={s.crumbs}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <span aria-current="page">Markets</span>
              </li>
            </ol>
          </nav>
          <div className={s.head}>
            <h1 id="page-title" className={`t-display-2 t-lit ${s.title}`} data-reveal="up">
              One team. <em className="t-accent">Every major market.</em>
            </h1>
            <div className={s.side} data-reveal="up" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
              <p className={s.lead}>Working hours set to yours, wherever you are. Each market page covers how growth works there — the economy, the search landscape, the industries and the state rules that shape the marketing.</p>
              <dl className={s.stats}>
                <div>
                  <dt>Markets</dt>
                  <dd>{markets.length}</dd>
                </div>
                <div>
                  <dt>Time zones</dt>
                  <dd>{zones.size}</dd>
                </div>
                <div>
                  <dt>Industries</dt>
                  <dd>{new Set(markets.flatMap((x) => x.sectors.map((y) => y.industry))).size}</dd>
                </div>
              </dl>
              <Button href="/start" arrow magnetic>
                Start a project
              </Button>
            </div>
          </div>
        </div>
        <div className={`container ${s.mapWrap}`} data-reveal="scale">
          <MarketMap markets={markets.map((x) => ({ slug: x.slug, city: x.city, region: x.region, area: x.area, sectors: sectorNames(x), href: `/locations/${x.slug}` }))} />
        </div>
      </section>

      <Chapter id="index" eyebrow="Every market" title={["Pick your", "market."]} lead="Each page is written for its market — not a city name swapped into a template.">
        <div className={s.regions}>
          {AREAS.map((a) => {
            const list = markets.filter((x) => x.area === a);
            if (!list.length) return null;
            return (
              <section key={a} className={m.region} aria-labelledby={`area-${a}`}>
                <div className={m.regionHead}>
                  <h3 id={`area-${a}`}>{a}</h3>
                  <span>{list.length} markets</span>
                </div>
                <ul className={m.cards} role="list">
                  {list.map((x, i) => {
                    const g = MARKET_GEO[x.slug];
                    return (
                      <li key={x.slug} data-reveal="up" style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as CSSProperties}>
                        <Link href={`/locations/${x.slug}`} className={`glass ${m.mcard}`} data-level="2" data-liquid="" data-interactive="true" data-pointer-light="" data-tilt="6">
                          <span className={m.mcardTop}>
                            <span>
                              {x.regionCode} · {x.timeZone.split(" (")[0]}
                            </span>
                            {g ? <LocalTime tz={g.tz} withZone={false} /> : <span />}
                          </span>
                          <span className={m.mcardCity}>{x.city}</span>
                          {g && (
                            <span className={m.mcardCoords}>
                              {coord(g.lat, "N", "S")} · {coord(g.lon, "E", "W")}
                            </span>
                          )}
                          <span className={m.mcardChips}>
                            {sectorNames(x).map((n) => (
                              <i key={n}>{n}</i>
                            ))}
                          </span>
                          <span className={m.mcardGo}>
                            Open the market <Arrow />
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </Chapter>

      <ProjectCTA />
    </>
  );
}
