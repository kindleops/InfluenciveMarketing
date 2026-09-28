import type { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import type { WorkItem, WorkVisual as Kind } from "@/content/work";
import relaunch from "@/assets/plates/relaunch.jpg";
import growth from "@/assets/plates/growth.jpg";
import operations from "@/assets/plates/operations.jpg";
import product from "@/assets/plates/product.jpg";
import styles from "./WorkVisual.module.css";

/* Photographic stages — abstract, art-directed environments (no products,
   people or brands) that set the mood each system is presented in. */
const plates: Record<Kind, StaticImageData> = { identity: relaunch, growth, operations, product };

/**
 * Art-directed compositions for each engagement type: interface glass
 * floating in a photographed environment. These are representations of the
 * *kind* of system built — interface content is illustrative. When real case
 * studies land, pass `media` (an image or video element) to
 * <CaseStudyPreview> and these become the fallback.
 */
export function WorkVisual({
  kind,
  accent = "brand",
  compact = false,
  sizes,
}: {
  kind: Kind;
  accent?: WorkItem["accent"];
  compact?: boolean;
  sizes?: string;
}) {
  return (
    <div className={styles.visual} data-kind={kind} data-accent={accent} data-compact={compact || undefined}>
      <Image src={plates[kind]} alt="" fill sizes={sizes ?? (compact ? "(min-width: 900px) 48vw, 100vw" : "(min-width: 900px) 76vw, 100vw")} placeholder="blur" className={styles.plate} />
      <span className={styles.shade} aria-hidden="true" />
      <span className={styles.light} aria-hidden="true" />
      {kind === "identity" && <Identity />}
      {kind === "growth" && <Growth />}
      {kind === "operations" && <Operations />}
      {kind === "product" && <Product />}
    </div>
  );
}

/* ---- Identity: a brand system on one sheet ------------------------------- */
function Identity() {
  return (
    <div className={styles.identity} aria-hidden="true">
      <div className={`${styles.sheet} ${styles.idHero}`}>
        <span className={styles.micro}>Positioning</span>
        <p className={styles.idStatement}>
          Clarity,
          <br />
          <em>at scale.</em>
        </p>
        <div className={styles.idMarks}>
          <span className={styles.markA} />
          <span className={styles.markB} />
          <span className={styles.markC} />
        </div>
      </div>
      <div className={styles.idSide}>
        <div className={`${styles.sheet} ${styles.idColors}`}>
          {[
            ["Ivory", "#ECE8E1"],
            ["Obsidian", "#0E0F12"],
            ["Cobalt", "#4A72FF"],
            ["Signal", "#7FE0FF"],
          ].map(([n, c]) => (
            <div key={n} className={styles.swatch} style={{ "--c": c } as CSSProperties}>
              <span>{n}</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
        <div className={`${styles.sheet} ${styles.idType}`}>
          <span className={styles.micro}>Type scale</span>
          <p style={{ fontSize: "2.1em" }}>Display</p>
          <p style={{ fontSize: "1.45em" }}>Heading</p>
          <p style={{ fontSize: "1em" }}>Body copy set for reading</p>
          <p className={styles.mono}>LABEL · 0.72 · +14%</p>
        </div>
        <div className={`${styles.sheet} ${styles.idMotion}`}>
          <span className={styles.micro}>Motion curve</span>
          <svg viewBox="0 0 120 60" className={styles.curve}>
            <path d="M4 56 C 24 56, 30 6, 116 4" />
            <circle cx="116" cy="4" r="2.5" />
          </svg>
          <span className={styles.mono}>0.16, 1, 0.3, 1</span>
        </div>
      </div>
    </div>
  );
}

/* ---- Growth: measurement + acquisition dashboard ------------------------ */
function Growth() {
  const channels = [
    ["Organic", 38],
    ["Paid social", 24],
    ["Paid search", 18],
    ["Lifecycle", 12],
    ["Referral", 8],
  ] as const;
  return (
    <div className={styles.growth} aria-hidden="true">
      <div className={styles.kpis}>
        {["Blended CAC", "Conversion", "Payback", "Experiments"].map((k, i) => (
          <div key={k} className={styles.sheet}>
            <span className={styles.micro}>{k}</span>
            <span className={styles.kpiBar} style={{ "--w": `${[62, 78, 54, 86][i]}%` } as CSSProperties} />
          </div>
        ))}
      </div>
      <div className={`${styles.sheet} ${styles.gChart}`}>
        <div className={styles.rowBetween}>
          <span className={styles.micro}>Acquisition efficiency · illustrative</span>
          <span className={styles.legend}>
            <i /> Spend <i data-b="" /> Pipeline
          </span>
        </div>
        <svg viewBox="0 0 300 110" preserveAspectRatio="none" className={styles.gSvg}>
          <path className={styles.gAreaB} d="M0 92 C 40 88, 60 80, 100 70 S 170 46, 210 38 S 270 18, 300 12 L300 110 L0 110Z" />
          <path className={styles.gLineB} d="M0 92 C 40 88, 60 80, 100 70 S 170 46, 210 38 S 270 18, 300 12" />
          <path className={styles.gLineA} d="M0 70 C 50 68, 80 72, 120 66 S 200 64, 240 62 S 280 60, 300 60" />
        </svg>
      </div>
      <div className={`${styles.sheet} ${styles.gAttr}`}>
        <span className={styles.micro}>Contribution by channel</span>
        {channels.map(([c, v], i) => (
          <div key={c} className={styles.attrRow}>
            <span>{c}</span>
            <i style={{ "--w": `${v * 2.4}%`, "--i": i } as CSSProperties} />
          </div>
        ))}
      </div>
      <div className={`${styles.sheet} ${styles.gTests}`}>
        <span className={styles.micro}>Experiments</span>
        {[
          ["Pricing page · annual default", "Running"],
          ["Hero · outcome headline", "Won"],
          ["Checkout · fewer fields", "Won"],
          ["Onboarding · day-2 email", "Queued"],
        ].map(([t, s]) => (
          <div key={t} className={styles.testRow}>
            <span>{t}</span>
            <b data-s={s}>{s}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Operations: workflow canvas + copilot ------------------------------ */
function Operations() {
  return (
    <div className={styles.ops} aria-hidden="true">
      <div className={`${styles.sheet} ${styles.canvas}`}>
        <span className={styles.micro}>Workflow · inbound qualification</span>
        <svg viewBox="0 0 420 230" className={styles.flowSvg}>
          <path className={styles.edge} d="M92 60 H150" />
          <path className={styles.edge} d="M250 60 C 280 60, 280 60, 300 60" />
          <path className={styles.edge} d="M200 84 V118" />
          <path className={styles.edge} d="M200 160 C 200 190, 120 180, 110 196" />
          <path className={styles.edge} d="M200 160 C 200 190, 290 180, 300 196" />
          <circle className={styles.packet} r="3">
            <animateMotion dur="3.2s" repeatCount="indefinite" path="M92 60 H150 M200 84 V118 M200 160 C 200 190, 290 180, 300 196" />
          </circle>
        </svg>
        <div className={styles.fNode} style={{ left: "2%", top: "18%" }}>
          <b>Trigger</b>
          <span>Form submitted</span>
        </div>
        <div className={styles.fNode} style={{ left: "36%", top: "18%" }}>
          <b>Enrich</b>
          <span>Company · role · intent</span>
        </div>
        <div className={styles.fNode} data-ai="" style={{ left: "72%", top: "18%" }}>
          <b>Summarise</b>
          <span>AI · account brief</span>
        </div>
        <div className={styles.fNode} data-ai="" style={{ left: "36%", top: "52%" }}>
          <b>Score</b>
          <span>Fit 0.86 · threshold 0.7</span>
        </div>
        <div className={styles.fNode} style={{ left: "12%", top: "82%" }}>
          <b>Nurture</b>
          <span>Sequence B</span>
        </div>
        <div className={styles.fNode} data-live="" style={{ left: "60%", top: "82%" }}>
          <b>Route → AE</b>
          <span>Notified in 40s</span>
        </div>
      </div>
      <div className={`${styles.sheet} ${styles.copilot}`}>
        <span className={styles.micro}>Internal copilot</span>
        <p className={styles.ask}>What did we agree with this account on onboarding?</p>
        <p className={styles.answer}>
          Dedicated onboarding lead, data migration in week one, and a 30-day success review.
        </p>
        <div className={styles.sources}>
          <span>SOW-2291.pdf</span>
          <span>Call notes · 12 May</span>
        </div>
      </div>
    </div>
  );
}

/* ---- Product: SaaS interface --------------------------------------------- */
function Product() {
  return (
    <div className={styles.product} aria-hidden="true">
      <div className={`${styles.sheet} ${styles.app}`}>
        <aside className={styles.appNav}>
          <span className={styles.appLogo} />
          {["Overview", "Projects", "Workflows", "Reports", "Settings"].map((n, i) => (
            <span key={n} data-on={i === 1 || undefined}>
              {n}
            </span>
          ))}
        </aside>
        <div className={styles.appMain}>
          <div className={styles.rowBetween}>
            <span className={styles.appTitle}>Projects</span>
            <span className={styles.appBtn}>New project</span>
          </div>
          <div className={styles.table}>
            {[
              ["Platform migration", "In review", 72],
              ["Onboarding v2", "Shipping", 94],
              ["Billing redesign", "Design", 38],
              ["Access controls", "Research", 16],
            ].map(([n, s, p]) => (
              <div key={n as string} className={styles.tr}>
                <span>{n}</span>
                <b data-s={s}>{s}</b>
                <i style={{ "--w": `${p}%` } as CSSProperties} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`${styles.sheet} ${styles.tokensCard}`}>
        <span className={styles.micro}>Design system</span>
        <div className={styles.compRow}>
          <span className={styles.cPrimary}>Primary</span>
          <span className={styles.cSecondary}>Secondary</span>
        </div>
        <div className={styles.compRow}>
          <span className={styles.cToggle} />
          <span className={styles.cChip}>Status</span>
          <span className={styles.cInput}>Search…</span>
        </div>
      </div>
    </div>
  );
}
