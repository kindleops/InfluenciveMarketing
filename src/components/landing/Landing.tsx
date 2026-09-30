import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Faq, Item } from "@/content/commercial/types";
import { faqLd } from "@/seo/jsonld";
import { KIND_LABEL, type Entry } from "@/seo/registry";
import { SplitText } from "@/components/ui/Typography";
import { Button, Arrow } from "@/components/ui/Button";
import { LightField } from "@/components/ui/LightField";
import { JsonLd } from "@/components/seo/blocks";
import s from "./landing.module.css";

/*
 * The landing kit: the parts every commercial search page is built from.
 *
 * A search page has one job — show a visitor who arrived with a specific
 * question that they're in the right place, answer it, and make the next
 * step obvious — and it has to do that as well as the homepage does. So
 * the prose is broken into modules a visitor can read at a glance (and
 * crawlers can still read in full), every module sits on liquid glass over
 * moving light, and a conversion path is never more than a screen away.
 * Server components; the only client code is the section dock.
 */

type Tone = "blue" | "gold" | "violet" | "teal";
type Link2 = { label: string; href: string };

/* ---- Hero --------------------------------------------------------------- */

export function LandingHero({
  crumbs,
  eyebrow,
  title,
  lead,
  tone = "blue",
  primary,
  secondary,
  facts,
  visual,
  backdrop,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  title: [ReactNode, ReactNode];
  lead: ReactNode;
  tone?: Tone;
  primary: Link2;
  secondary?: Link2;
  facts?: { label: string; value: ReactNode }[];
  visual?: ReactNode;
  /** A scene behind the whole hero (e.g. a market's map), under the copy. */
  backdrop?: ReactNode;
}) {
  return (
    <section className={s.hero} data-tone={tone} data-backdrop={backdrop ? "" : undefined} aria-labelledby="page-title">
      <span className="scroll-progress" aria-hidden="true" />
      <LightField tone={tone} />
      {backdrop && (
        <div className={s.heroBackdrop} aria-hidden="true">
          {backdrop}
        </div>
      )}
      <span className={s.heroFloor} aria-hidden="true" />
      <div className={`container ${s.heroFrame}`}>
        <nav aria-label="Breadcrumb" className={s.crumbsNav}>
          <ol className={s.crumbs}>
            <li>
              <Link href="/">Home</Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.path}>{i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}</li>
            ))}
          </ol>
        </nav>

        <div className={s.heroLayout} data-visual={visual ? "" : undefined}>
          <div className={s.heroCopy}>
            <p className={`glass ${s.chip}`} data-level="1" data-liquid="" data-reveal="fade">
              <i aria-hidden="true" />
              {eyebrow}
            </p>
            <SplitText as="h1" id="page-title" className={`t-display-2 t-lit ${s.heroTitle}`} lines={[title[0], <em key="a" className="t-accent">{title[1]}</em>]} delay={60} />
            <p className={s.heroLead} data-reveal="up" style={{ "--reveal-delay": "320ms" } as CSSProperties}>
              {lead}
            </p>
            <div className={s.ctas} data-reveal="up" style={{ "--reveal-delay": "420ms" } as CSSProperties}>
              <Button href={primary.href} arrow magnetic size="lg">
                {primary.label}
              </Button>
              {secondary && (
                <Button href={secondary.href} variant="secondary" size="lg">
                  {secondary.label}
                </Button>
              )}
            </div>
            {facts && (
              <dl className={s.heroFacts} data-stagger="" style={{ "--reveal-delay": "520ms" } as CSSProperties}>
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          {visual && (
            <div className={s.heroVisual} aria-hidden="true" data-reveal="scale" style={{ "--reveal-delay": "200ms" } as CSSProperties}>
              {visual}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** The hero's instrument: what this work is judged on, drawn as live traces. */
export function SignalPanel({ label, aside, items, chip }: { label: string; aside?: string; items: string[]; chip?: [string, string] }) {
  return (
    <div className={s.panelStage}>
      <span className={s.halo} aria-hidden="true" />
      <div className={`glass ${s.panel}`} data-level="3" data-liquid="deep" data-pointer-light="" data-tilt="4">
        <span className={s.scan} aria-hidden="true" />
        <div className={s.panelHead}>
          <span>
            <i className={s.live} />
            {label}
          </span>
          {aside && <span>{aside}</span>}
        </div>
        <ul className={s.signals} role="list">
          {items.slice(0, 6).map((it, i) => (
            <li key={it} style={{ "--i": i, "--w": `${86 - ((i * 19) % 44)}%` } as CSSProperties}>
              <i>{String(i + 1).padStart(2, "0")}</i>
              <span>{it}</span>
              <span className={s.trace} />
            </li>
          ))}
        </ul>
        <svg className={s.wave} viewBox="0 0 400 80" preserveAspectRatio="none">
          <path d="M0 62 C 40 60, 60 48, 100 50 S 170 30, 210 34 S 290 18, 330 16 S 380 8, 400 6" />
          <path d="M0 62 C 40 60, 60 48, 100 50 S 170 30, 210 34 S 290 18, 330 16 S 380 8, 400 6 V 80 H 0 Z" />
        </svg>
      </div>
      {chip && (
        <div className={`glass ${s.floatChip}`} data-level="2" data-liquid="">
          <span>{chip[0]}</span>
          <b>{chip[1]}</b>
        </div>
      )}
    </div>
  );
}

/** The compare hero's visual: the two options as panes of glass, face to face. */
export function VersusVisual({ a, b }: { a: string; b: string }) {
  return (
    <div className={s.vsVisual}>
      <div className={`glass ${s.vsPane}`} data-level="3" data-liquid="" data-side="a">
        <span>Option A</span>
        <b>{a}</b>
      </div>
      <div className={`glass ${s.vsPane}`} data-level="3" data-liquid="" data-side="b">
        <span>Option B</span>
        <b>{b}</b>
      </div>
      <span className={`glass ${s.vsOrb} ${s.vsOrbHero}`} data-level="3" data-liquid="">
        vs
      </span>
    </div>
  );
}

/** A market page's hero object: the place, its hours, the area it covers. */
export function AreaPanel({ city, region, timeZone, area, presence }: { city: string; region: string; timeZone: string; area: string[]; presence: "office" | "team" | "remote" }) {
  return (
    <div className={s.panelStage}>
      <div className={`glass ${s.panel} ${s.area}`} data-level="3" data-liquid="deep">
        <div className={s.panelHead}>
          <span>
            <i className={s.live} />
            Market
          </span>
          <span>{region}</span>
        </div>
        <p className={s.areaCity}>{city}</p>
        <p className={s.areaTz}>{timeZone}</p>
        <ul className={s.areaList} role="list">
          {area.slice(0, 8).map((a, i) => (
            <li key={a} style={{ "--i": i } as CSSProperties}>
              {a}
            </li>
          ))}
        </ul>
        <svg className={s.rings} viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="30" />
          <circle cx="100" cy="100" r="58" />
          <circle cx="100" cy="100" r="86" />
          <circle cx="100" cy="100" r="4" className={s.pin} />
        </svg>
      </div>
      <div className={`glass ${s.floatChip}`} data-level="2" data-liquid="">
        <span>Working hours</span>
        <b>{presence === "office" ? "From our office here" : presence === "team" ? "With our team here" : `Aligned to ${timeZone.split(" (")[0]}`}</b>
      </div>
    </div>
  );
}

/**
 * A kinetic band of the page's own vocabulary — the work, the places, the
 * channels — in large outlined type, drifting. Decorative: everything in it
 * is on the page in readable form.
 */
export function Marquee({ items, tone = "blue" }: { items: string[]; tone?: Tone }) {
  if (items.length < 3) return null;
  const row = [...items, ...items];
  return (
    <div className={s.marquee} data-tone={tone} data-pause-offscreen="" aria-hidden="true">
      <div className={s.marqueeTrack} style={{ "--n": items.length } as CSSProperties}>
        {[0, 1].map((k) => (
          <span key={k} className={s.marqueeRow}>
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className={s.marqueeItem} data-alt={i % 2 ? "" : undefined}>
                {t}
                <i />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---- Chapters ------------------------------------------------------------ */

export function Chapter({
  id,
  eyebrow,
  title,
  lead,
  tone,
  light = false,
  raised = false,
  children,
}: {
  id: string;
  eyebrow: string;
  title: [ReactNode, ReactNode];
  lead?: ReactNode;
  tone?: Tone;
  /** A quiet light field behind the chapter, for glass to show. */
  light?: boolean;
  raised?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={s.chapter} data-raised={raised || undefined} aria-labelledby={`${id}-title`}>
      {light && <LightField tone={tone} intensity="low" />}
      <div className={`container ${s.chapterFrame}`}>
        <header className={s.chapterHead}>
          <p className={s.eyebrow} data-reveal="fade">
            {eyebrow}
          </p>
          <SplitText
            as="h2"
            id={`${id}-title`}
            mode="lines"
            className={`t-display-3 t-lit ${s.h2}`}
            lines={title[1] ? [title[0], <em key="a" className="t-accent">{title[1]}</em>] : [title[0]]}
          />
          {lead && (
            <p className={s.chapterLead} data-reveal="up" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
              {lead}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}

/** The argument in one breath: the first paragraph large, the rest beside it. */
export function Statement({ body }: { body: string[] }) {
  const [first, ...rest] = body;
  return (
    <div className={s.statement}>
      <p className={s.statementLead} data-reveal="up">
        {first}
      </p>
      {rest.length > 0 && (
        <div className={s.statementRest} data-stagger="">
          {rest.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}

const GLYPHS = [
  // rings
  <g key="0">
    <circle pathLength={1} cx="20" cy="20" r="15" />
    <circle pathLength={1} cx="20" cy="20" r="9" />
    <circle pathLength={1} cx="20" cy="20" r="3" />
  </g>,
  // stack
  <g key="1">
    <path pathLength={1} d="M6 27h28M6 20h22M6 13h14" />
  </g>,
  // nodes
  <g key="2">
    <circle pathLength={1} cx="9" cy="10" r="3" />
    <circle pathLength={1} cx="31" cy="14" r="3" />
    <circle pathLength={1} cx="18" cy="31" r="3" />
    <path pathLength={1} d="M12 11l16 3M29 17l-9 12M10 13l7 15" />
  </g>,
  // grid
  <g key="3">
    <rect pathLength={1} x="6" y="6" width="11" height="11" rx="2" />
    <rect pathLength={1} x="23" y="6" width="11" height="11" rx="2" />
    <rect pathLength={1} x="6" y="23" width="11" height="11" rx="2" />
    <rect pathLength={1} x="23" y="23" width="11" height="11" rx="2" />
  </g>,
  // wave
  <g key="4">
    <path pathLength={1} d="M4 26c5 0 5-12 10-12s5 12 10 12 5-12 10-12" />
    <path pathLength={1} d="M4 32h32" />
  </g>,
  // target
  <g key="5">
    <path pathLength={1} d="M20 4v8M20 28v8M4 20h8M28 20h8" />
    <circle pathLength={1} cx="20" cy="20" r="8" />
  </g>,
  // bars
  <g key="6">
    <path pathLength={1} d="M9 32V22M16 32V14M23 32V18M30 32V8" />
  </g>,
];

/** Everything included, as a bento of liquid cells. */
export function Bento({ items }: { items: Item[] }) {
  const span = (3 - (items.length % 3)) % 3;
  return (
    <ul className={s.bento} role="list">
      {items.map((it, i) => (
        <li key={it.title} className={s.slot} data-wide={i < span || undefined} data-reveal="up" style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as CSSProperties}>
          <div className={`glass ${s.cell}`} data-level="2" data-liquid="" data-interactive="true" data-pointer-light="" data-tilt="5">
            <svg className={s.glyph} viewBox="0 0 40 40" aria-hidden="true">
              {GLYPHS[i % GLYPHS.length]}
            </svg>
            <span className={s.cellIdx}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={s.cellTitle}>{it.title}</h3>
            <p className={s.cellText}>{it.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** A sequence with a light that travels along it as it scrolls into view. */
export function Process({ items }: { items: Item[] }) {
  return (
    <ol className={s.process} role="list" style={{ "--n": items.length } as CSSProperties}>
      <span className={s.rail} aria-hidden="true">
        <span />
      </span>
      {items.map((it, i) => (
        <li key={it.title} className={s.phase} data-reveal="up" style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}>
          <span className={`glass ${s.node}`} data-level="2" data-liquid="" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={s.phaseTitle}>{it.title}</h3>
          <p className={s.phaseText}>{it.detail}</p>
        </li>
      ))}
    </ol>
  );
}

function Tick({ no }: { no?: boolean }) {
  return (
    <span className={s.tick} data-no={no || undefined} aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        {no ? (
          <path d="M3.2 3.2l5.6 5.6M8.8 3.2 3.2 8.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        ) : (
          <path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </span>
  );
}

/** Two lists side by side: who it's for, who it isn't — or any honest pair. */
export function Duo({ a, b }: { a: { title: string; items: string[] }; b: { title: string; items: string[]; negative?: boolean } }) {
  return (
    <div className={s.duo}>
      {[a, b].map((col, i) => {
        const no = i === 1 && b.negative;
        return (
          <div key={col.title} className={`glass ${s.duoCol}`} data-level="2" data-liquid="" data-quiet={no || undefined} data-reveal="up" style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}>
            <h3 className={s.duoTitle}>{col.title}</h3>
            <ul role="list" className={s.duoList}>
              {col.items.map((x) => (
                <li key={x}>
                  <Tick no={no} />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/** A checklist set as a grid of small glass tiles. */
export function Checks({ items }: { items: string[] }) {
  return (
    <ul className={s.checks} role="list" data-stagger="">
      {items.map((x) => (
        <li key={x}>
          <Tick />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

/** Terms of the engagement, with the next step beside them. */
export function Spec({ items, cta }: { items: { label: string; value: ReactNode }[]; cta: Link2 }) {
  return (
    <div className={`glass ${s.spec}`} data-level="3" data-liquid="deep" data-reveal="up">
      <dl className={s.specList}>
        {items.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
      <Button href={cta.href} arrow magnetic>
        {cta.label}
      </Button>
    </div>
  );
}

/** Channel → role, as a map rather than a list. Names can link onward. */
export function RoleMap({ items }: { items: { name: string; role: string; href?: string }[] }) {
  return (
    <ul className={s.roles} role="list">
      {items.map((c, i) => (
        <li key={c.name} data-reveal="up" style={{ "--reveal-delay": `${(i % 4) * 60}ms` } as CSSProperties}>
          <span className={s.roleIdx}>{String(i + 1).padStart(2, "0")}</span>
          <h3 className={s.roleName}>{c.href ? <Link href={c.href}>{c.name} →</Link> : c.name}</h3>
          <p className={s.roleText}>{c.role}</p>
        </li>
      ))}
    </ul>
  );
}

/** Options with what each is best for and what it costs you. */
export function Options({ items }: { items: { name: string; bestFor: string; tradeoffs: string }[] }) {
  return (
    <ul className={s.options} role="list">
      {items.map((o, i) => (
        <li key={o.name} className={`glass ${s.option}`} data-level="2" data-liquid="" data-reveal="up" style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as CSSProperties}>
          <h3 className={s.optionName}>{o.name}</h3>
          <dl>
            <dt>Best for</dt>
            <dd>{o.bestFor}</dd>
            <dt>Trade-offs</dt>
            <dd>{o.tradeoffs}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
}

/** Head-to-head: two options, criterion by criterion. */
export function Versus({
  a,
  b,
  criteria,
}: {
  a: { name: string; summary: string };
  b: { name: string; summary: string };
  criteria: { criterion: string; a: string; b: string }[];
}) {
  return (
    <div className={s.versus}>
      <div className={s.vsHead}>
        {[a, b].map((o, i) => (
          <div key={o.name} className={`glass ${s.vsOption}`} data-level="3" data-liquid="" data-side={i ? "b" : "a"} data-reveal="up" style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}>
            <span className={s.vsTag}>Option {i ? "B" : "A"}</span>
            <h3 className={s.vsName}>{o.name}</h3>
            <p className={s.vsSummary}>{o.summary}</p>
          </div>
        ))}
        <span className={`glass ${s.vsOrb}`} data-level="3" data-liquid="" aria-hidden="true">
          vs
        </span>
      </div>
      <div className={s.vsTableWrap} role="region" aria-label={`${a.name} and ${b.name}, criterion by criterion`} tabIndex={0}>
        <table className={s.vsTable}>
          <caption className="sr-only">
            {a.name} compared with {b.name}
          </caption>
          <thead>
            <tr>
              <th scope="col">Criterion</th>
              <th scope="col">{a.name}</th>
              <th scope="col">{b.name}</th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((c) => (
              <tr key={c.criterion} data-reveal="fade">
                <th scope="row">{c.criterion}</th>
                <td data-label={a.name}>{c.a}</td>
                <td data-label={b.name}>{c.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** The honest answer, set large. */
export function Verdict({ label, text }: { label: string; text: string }) {
  return (
    <div className={`glass ${s.verdict}`} data-level="3" data-liquid="deep" data-reveal="scale">
      <p className={s.eyebrow}>{label}</p>
      <p className={s.verdictText}>{text}</p>
    </div>
  );
}

/** A mid-page conversion path: what happens next, and the door to it. */
export function Convert({ title, text, primary, secondary, tone = "blue" }: { title: [string, string]; text: string; primary: Link2; secondary?: Link2; tone?: Tone }) {
  return (
    <section className={s.convert} aria-labelledby="convert-title">
      <div className="container">
        <div className={`glass ${s.convertCard}`} data-level="3" data-liquid="" data-reveal="scale">
          <LightField tone={tone} />
          <div className={s.convertCopy}>
            <h2 id="convert-title" className={`t-lit ${s.convertTitle}`}>
              {title[0]} <em className="t-accent">{title[1]}</em>
            </h2>
            <p className={s.convertText}>{text}</p>
          </div>
          <ol className={s.next} role="list" aria-label="What happens next">
            <li>
              <b>01</b>Tell us about the business — about three minutes.
            </li>
            <li>
              <b>02</b>A senior person reads it and replies with a first view.
            </li>
            <li>
              <b>03</b>If it’s a fit, a scoped proposal with fixed terms.
            </li>
          </ol>
          <div className={s.convertCtas}>
            <Button href={primary.href} arrow magnetic>
              {primary.label}
            </Button>
            {secondary && (
              <Button href={secondary.href} variant="ghost">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Questions buyers ask, answered in place — and marked up as an FAQ. */
export function FaqList({ faqs, title = ["What people ask", "before they start."] }: { faqs: Faq[]; title?: [string, string] }) {
  return (
    <Chapter id="faq" eyebrow="Questions" title={title}>
      <JsonLd data={faqLd(faqs)} />
      <ul className={s.faqs} role="list">
        {faqs.map((f, i) => (
          <li key={f.q} data-reveal="up" style={{ "--reveal-delay": `${i * 50}ms` } as CSSProperties}>
            <details className={`glass ${s.faq}`} data-level="2" data-liquid="">
              <summary>
                <span>{f.q}</span>
                <i aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </Chapter>
  );
}

/** Where to go next: the rest of the system, one card per page. */
export function RelatedRail({ entries, title = ["Explore", "the system."] }: { entries: Entry[]; title?: [string, string] }) {
  if (!entries.length) return null;
  return (
    <Chapter id="related" eyebrow="Related" title={title} light tone="violet" raised>
      <ul className={s.rail2} role="list" aria-label="Related pages">
        {entries.map((e, i) => (
          <li key={e.path} data-reveal="up" style={{ "--reveal-delay": `${(i % 4) * 60}ms` } as CSSProperties}>
            <Link href={e.path} className={`glass ${s.relCard}`} data-level="2" data-liquid="" data-interactive="true" data-pointer-light="" data-tilt="6">
              <span className={s.relKind}>{KIND_LABEL[e.kind]}</span>
              <span className={s.relTitle}>{e.title}</span>
              <span className={s.relText}>{e.summary}</span>
              <span className={s.relGo}>
                Open <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Chapter>
  );
}

export function PillLinks({ label, items }: { label: string; items: Link2[] }) {
  if (!items.length) return null;
  return (
    <div className={s.pillBlock}>
      <p className={s.eyebrow}>{label}</p>
      <ul className={s.pills} role="list">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className={`glass ${s.pill}`} data-level="1" data-liquid="" data-interactive="true">
              {it.label}
              <Arrow />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const landingStyles = s;
