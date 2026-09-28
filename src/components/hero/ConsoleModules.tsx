import { useId, type CSSProperties, type ReactNode } from "react";
import styles from "./ConsoleModules.module.css";

/**
 * The six modules of the system console, drawn as dense, working product
 * surfaces. They read as texture in a wide shot and hold up in a close-up:
 * when a module takes focus its content performs (lines draw, a crosshair
 * scans, packets flow, gauges fill) and annotations appear beside it.
 *
 * All figures are illustrative interface content — indexed values and
 * example states — never client results.
 */

const v = (o: Record<string, string | number>) => o as CSSProperties;

/* ---- Shared pieces ------------------------------------------------------ */

function Head({ title, meta, index }: { title: string; meta?: ReactNode; index: string }) {
  return (
    <header className={styles.head}>
      <span className={styles.headTitle}>{title}</span>
      {meta && <span className={styles.headMeta}>{meta}</span>}
      <span className={styles.idx}>{index}</span>
    </header>
  );
}

/**
 * A close-up annotation. The dot marks a point on the module (x, y in %);
 * a leader runs out past the module's edge to a glass tag that floats over
 * the out-of-focus system beside it — `side` picks which edge.
 */
function Callout({ x, y, side, n, children }: { x: number; y: number; side: "left" | "right"; n: number; children: ReactNode }) {
  return (
    <span className={styles.callout} data-side={side} style={v({ "--x": `${x}%`, "--y": `${y}%`, "--n": n })} aria-hidden="true">
      <i className={styles.calloutLine} />
      <i className={styles.calloutDot} />
      <span className={styles.calloutTag}>{children}</span>
    </span>
  );
}

/** Sheen that crosses a module once as it takes focus. */
export function FocusSheen() {
  return <span className={styles.sheen} aria-hidden="true" />;
}

/* ---- 01 Brand — the identity system ------------------------------------ */

const SWATCHES = [
  ["Ivory", "#f1efea", "16.8"],
  ["Void", "#0e0f12", "—"],
  ["Cobalt", "#4a72ff", "5.1"],
  ["Iris", "#9b8cff", "7.4"],
  ["Sand", "#dcc08f", "11.2"],
] as const;

const SCALE = [
  ["Display", "96 / 0.94", 100],
  ["Title", "32 / 1.10", 62],
  ["Body", "17 / 1.60", 38],
  ["Label", "12 / +14%", 22],
] as const;

export function BrandModule() {
  return (
    <>
      <Head title="Brand system" meta="v2.4" index="01" />
      <div className={styles.specimen}>
        <span className={styles.specSans}>Aa</span>
        <span className={styles.specSerif}>Aa</span>
        <span className={styles.specNote}>
          Geist 430
          <br />
          Instrument Italic
        </span>
      </div>
      <ol className={styles.scale}>
          {SCALE.map(([name, spec, w], i) => (
            <li key={name} style={v({ "--w": `${w}%`, "--i": i })}>
              <span>{name}</span>
              <i />
              <em>{spec}</em>
            </li>
          ))}
      </ol>
      <div className={styles.swatchRow}>
        {SWATCHES.map(([name, hex, ratio], i) => (
          <div key={name} className={styles.swatch} style={v({ "--sw": hex, "--i": i })}>
            <span className={styles.chip} />
            <span className={styles.swName}>{name}</span>
            <span className={styles.swRatio}>{ratio === "—" ? "base" : `${ratio}:1`}</span>
          </div>
        ))}
      </div>
      <div className={styles.brandBottom}>
        <div className={styles.voice}>
          {[
            ["Precise", "Playful", 18],
            ["Warm", "Technical", 64],
            ["Quiet", "Bold", 34],
          ].map(([a, b, pos], i) => (
            <div key={a as string} className={styles.voiceRow} style={v({ "--p": `${pos}%`, "--i": i })}>
              <span>{a}</span>
              <i>
                <b />
              </i>
              <span>{b}</span>
            </div>
          ))}
        </div>
        <div className={styles.curve}>
          <svg viewBox="0 0 80 44" aria-hidden="true">
            <path d="M2 42 H78 M2 2 V42" className={styles.curveAxis} />
            <path d="M2 42 C 14 42, 18 4, 78 3" className={styles.curvePath} pathLength={1} />
            <circle r="2.4" className={styles.curveDot}>
              <animateMotion dur="2.6s" repeatCount="indefinite" path="M2 42 C 14 42, 18 4, 78 3" keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear" />
            </circle>
          </svg>
          <span>ease-out · 760ms</span>
        </div>
      </div>
      <Callout x={70} y={33} side="right" n={0}>Type scale · 4 steps</Callout>
      <Callout x={86} y={58} side="right" n={1}>Contrast pairs · WCAG AA</Callout>
      <Callout x={52} y={86} side="right" n={2}>Voice · motion tokens</Callout>
    </>
  );
}

/* ---- 02 Experience — a live surface ------------------------------------ */

export function ExperienceModule() {
  return (
    <>
      <Head title="Experience" meta="/pricing" index="02" />
      <div className={styles.expBar}>
        <span className={styles.seg}>
          <i>390</i>
          <i>768</i>
          <i data-on="">1440</i>
        </span>
        <span className={styles.expPreview}>
          <i className={styles.liveDot} /> Preview
        </span>
      </div>
      <div className={styles.browser}>
        <div className={styles.browserBar}>
          <i />
          <i />
          <i />
          <span>/pricing</span>
        </div>
        <div className={styles.site}>
          <div className={styles.siteNav}>
            <b />
            <i />
            <i />
            <i />
            <em />
          </div>
          <div className={styles.siteHero} data-outline="Hero">
            <i style={v({ "--w": "68%" })} />
            <i style={v({ "--w": "44%" })} />
            <span className={styles.siteCta} />
          </div>
          <div className={styles.plans} data-outline="Pricing grid">
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles.plan} data-featured={i === 1 || undefined}>
                <i />
                <b />
                <i />
                <i />
                <span />
              </div>
            ))}
          </div>
          <span className={styles.cursor} />
        </div>
      </div>
      <div className={styles.gauges}>
        {[
          ["LCP", "1.1s", 0.82],
          ["INP", "88ms", 0.9],
          ["CLS", "0.01", 0.96],
        ].map(([k, val, f], i) => (
          <div key={k as string} className={styles.gauge} style={v({ "--f": f, "--i": i })}>
            <svg viewBox="0 0 36 36" aria-hidden="true">
              <circle cx="18" cy="18" r="15" className={styles.gTrack} pathLength={100} />
              <circle cx="18" cy="18" r="15" className={styles.gFill} pathLength={100} />
            </svg>
            <span>
              <em>{k}</em>
              {val}
            </span>
          </div>
        ))}
        <span className={styles.gNote}>p75 · field</span>
      </div>
      <Callout x={6} y={36} side="left" n={0}>Components · one library</Callout>
      <Callout x={10} y={64} side="left" n={1}>Pricing grid · variant B</Callout>
      <Callout x={6} y={90} side="left" n={2}>Core Web Vitals · passing</Callout>
    </>
  );
}

/* ---- 03 Acquisition — demand ------------------------------------------- */

const SERIES = [100, 102, 101, 106, 109, 108, 114, 119, 117, 125, 131, 129, 138, 146, 151, 158, 164];
const SPEND = [100, 101, 103, 102, 104, 106, 105, 107, 106, 108, 109, 108, 110, 111, 110, 112, 112];

function toPath(values: number[], w: number, h: number, min = 92, max = 170) {
  const pts = values.map((val, i) => [(i / (values.length - 1)) * w, h - ((val - min) / (max - min)) * h]);
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return { d, end: pts[pts.length - 1] };
}
const CW = 400;
const CH = 120;
const PIPE = toPath(SERIES, CW, CH);
const SPND = toPath(SPEND, CW, CH);

const CHANNELS = [
  ["Organic", 38, "#9db0ff"],
  ["Paid social", 24, "#7fe0ff"],
  ["Search", 18, "#b09cff"],
  ["Lifecycle", 12, "#dcc08f"],
  ["Referral", 8, "#f1efea"],
] as const;

export function AcquisitionModule() {
  // The console can render more than once per page (scene + phone list);
  // gradient ids must be unique or the line paints from a hidden copy.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const areaId = `cm-area-${uid}`;
  const lineId = `cm-line-${uid}`;
  return (
    <>
      <Head title="Qualified pipeline · indexed" meta="12 wk" index="03" />
      <div className={styles.acqTop}>
        <div className={styles.readout}>
          <span className={styles.readValue}>{SERIES[SERIES.length - 1]}</span>
          <span className={styles.readDelta}>▲ vs. baseline 100</span>
        </div>
        <dl className={styles.kpis}>
          <div>
            <dt>CAC · idx</dt>
            <dd>82 ▼</dd>
          </div>
          <div>
            <dt>Reach · idx</dt>
            <dd>140</dd>
          </div>
          <div>
            <dt>Win rate · idx</dt>
            <dd>118</dd>
          </div>
        </dl>
      </div>
      <div className={styles.chartBox}>
        <svg viewBox={`0 0 ${CW} ${CH + 14}`} className={styles.chart} aria-hidden="true">
          <defs>
            <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7a9bff" stopOpacity="0.34" />
              <stop offset="1" stopColor="#7a9bff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={lineId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#7fe0ff" stopOpacity="0.5" />
              <stop offset="0.6" stopColor="#7a9bff" />
              <stop offset="1" stopColor="#f1efea" />
            </linearGradient>
          </defs>
          {[0, 40, 80, 120].map((y, i) => (
            <g key={y}>
              <line x1="0" x2={CW} y1={y} y2={y} className={styles.gridLine} />
              <text x={CW} y={y - 3} className={styles.axisText} textAnchor="end">
                {[170, 144, 118, 92][i]}
              </text>
            </g>
          ))}
          {/* Annotations: moments the system changed. */}
          {[
            [118, "Brand relaunch"],
            [262, "Search program"],
          ].map(([x, label]) => (
            <g key={label as string} className={styles.marker}>
              <line x1={x} x2={x} y1="8" y2={CH} />
              <rect x={(x as number) + 3} y="6" width={(label as string).length * 4.6 + 8} height="11" rx="2" />
              <text x={(x as number) + 7} y="14">
                {label}
              </text>
            </g>
          ))}
          <path d={`${PIPE.d} L ${CW} ${CH} L 0 ${CH} Z`} fill={`url(#${areaId})`} className={styles.area} />
          <path d={SPND.d} className={styles.spend} pathLength={1} />
          <path d={PIPE.d} fill="none" stroke={`url(#${lineId})`} strokeWidth="1.8" className={styles.pipe} pathLength={1} />
          <circle cx={PIPE.end[0]} cy={PIPE.end[1]} r="3.2" className={styles.now} />
          {["W1", "W4", "W8", "W12"].map((w, i) => (
            <text key={w} x={(i / 3) * CW} y={CH + 12} className={styles.axisText} textAnchor={i === 0 ? "start" : i === 3 ? "end" : "middle"}>
              {w}
            </text>
          ))}
        </svg>
        {/* Crosshair that scans the series in a close-up. */}
        <span className={styles.scan}>
          <i />
          <span className={styles.tip}>
            <b>W9</b> pipeline 131 · spend 108
          </span>
        </span>
      </div>
      <div className={styles.mix}>
        <div className={styles.mixBar}>
          {CHANNELS.map(([name, share, c], i) => (
            <i key={name} style={v({ "--s": share, "--c": c, "--i": i })} />
          ))}
        </div>
        <ul className={styles.mixLegend}>
          {CHANNELS.map(([name, share, c]) => (
            <li key={name} style={v({ "--c": c })}>
              <i />
              {name} <em>{share}%</em>
            </li>
          ))}
        </ul>
      </div>
      <Callout x={4} y={16} side="left" n={0}>Indexed · no vanity numbers</Callout>
      <Callout x={30} y={40} side="left" n={1}>Annotated · every change logged</Callout>
      <Callout x={4} y={84} side="left" n={2}>Channel mix · contribution</Callout>
    </>
  );
}

/* ---- 04 Conversion — path to pipeline ---------------------------------- */

const FUNNEL = [
  ["Visit", 100, ""],
  ["Engage", 64, "64%"],
  ["Intent", 31, "48%"],
  ["Pipeline", 14, "45%"],
] as const;

export function ConversionModule() {
  return (
    <>
      <Head title="Conversion path" meta="30 d" index="04" />
      <ol className={styles.funnel}>
        {FUNNEL.map(([label, w, step], i) => (
          <li key={label} style={v({ "--w": `${w}%`, "--i": i })}>
            <span className={styles.fLabel}>{label}</span>
            <span className={styles.fVal}>{w}</span>
            <i className={styles.fBar}>
              <b />
            </i>
            {step && <em className={styles.fStep}>{step}</em>}
          </li>
        ))}
      </ol>
      <div className={styles.test}>
        <div className={styles.testHead}>
          <span>Test · annual default</span>
          <span className={styles.testState}>Running</span>
        </div>
        {[
          ["A", 42, false],
          ["B", 58, true],
        ].map(([k, w, lead]) => (
          <div key={k as string} className={styles.variant} data-lead={lead || undefined} style={v({ "--w": `${w}%` })}>
            <span>{k}</span>
            <i>
              <b />
            </i>
          </div>
        ))}
        <div className={styles.testFoot}>
          <span>P(B &gt; A)</span>
          <em>0.94</em>
        </div>
      </div>
      <div className={styles.path}>
        {["/", "/pricing", "/demo"].map((p, i) => (
          <span key={p} style={v({ "--i": i })}>
            {p}
          </span>
        ))}
      </div>
      <Callout x={92} y={24} side="right" n={0}>Step conversion · per stage</Callout>
      <Callout x={94} y={66} side="right" n={1}>Experiment · Bayesian</Callout>
      <Callout x={80} y={92} side="right" n={2}>Path · to demo</Callout>
    </>
  );
}

/* ---- 05 Automation — a running workflow -------------------------------- */

const NODES: [number, number, string, string?][] = [
  [30, 34, "Form"],
  [108, 34, "Enrich"],
  [186, 34, "Score", "ai"],
  [264, 18, "Route"],
  [264, 54, "Nurture"],
  [342, 18, "CRM"],
];
const EDGES = ["M48 34 H90", "M126 34 H168", "M204 34 C 222 34, 228 18, 246 18", "M204 34 C 222 34, 228 54, 246 54", "M282 18 H324"];

export function AutomationModule({
  events,
}: {
  events: { n: number; k: string; d: string; tone: string; time: string }[];
}) {
  return (
    <>
      <Head title="Automation · inbound routing" meta={<span className={styles.running}>Running</span>} index="05" />
      <div className={styles.flow}>
        <svg viewBox="0 0 372 72" aria-hidden="true">
          {EDGES.map((d) => (
            <path key={d} d={d} className={styles.edge} />
          ))}
          {EDGES.map((d, i) => (
            <circle key={`p${i}`} r="2.2" className={styles.packet}>
              <animateMotion dur="1.8s" begin={`${i * 0.36}s`} repeatCount="indefinite" path={d} />
            </circle>
          ))}
          {NODES.map(([x, y, label, kind], i) => (
            <g key={label} className={styles.node} data-kind={kind} style={v({ "--i": i })}>
              <rect x={x - 18} y={y - 9} width="36" height="18" rx="5" />
              <text x={x} y={y + 3} textAnchor="middle">
                {label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <ol className={styles.events} aria-hidden="true">
        {events.slice(0, 4).map((e, i) => (
          <li key={e.n} data-tone={e.tone || undefined} data-fresh={i === 0 || undefined}>
            <time>{e.time}</time>
            <span className={styles.evKey}>{e.k}</span>
            <span className={styles.evDetail}>{e.d}</span>
          </li>
        ))}
      </ol>
      <dl className={styles.runStats}>
        <div>
          <dt>Checkpoints</dt>
          <dd>2 human</dd>
        </div>
        <div>
          <dt>Guardrails</dt>
          <dd>4 active</dd>
        </div>
        <div>
          <dt>Median run</dt>
          <dd>38s</dd>
        </div>
      </dl>
      <Callout x={48} y={33} side="left" n={0}>AI step · scored against ICP</Callout>
      <Callout x={4} y={58} side="left" n={1}>Every run logged · auditable</Callout>
      <Callout x={4} y={90} side="left" n={2}>Human checkpoints · guardrails</Callout>
    </>
  );
}

/* ---- 06 Intelligence — a recommendation, with its reasoning ------------ */

export function IntelligenceModule() {
  return (
    <>
      <Head title="Intelligence" meta="recommendation" index="06" />
      <p className={styles.insight}>
        Pricing-page visits from fintech accounts are rising. <strong>Launch a vertical page</strong> and route to the
        enterprise pod.
      </p>
      <div className={styles.intelGrid}>
        <ul className={styles.signals}>
          {[
            ["Pricing visits · fintech", 0.42],
            ["Demo requests · EMEA", 0.27],
            ["Search demand ↑", 0.18],
          ].map(([name, w], i) => (
            <li key={name as string} style={v({ "--w": w, "--i": i })}>
              <span>{name}</span>
              <i>
                <b />
              </i>
              <em>{(w as number).toFixed(2)}</em>
            </li>
          ))}
        </ul>
        <div className={styles.dial}>
          <svg viewBox="0 0 60 34" aria-hidden="true">
            <path d="M5 30 A25 25 0 0 1 55 30" className={styles.dialTrack} pathLength={100} />
            <path d="M5 30 A25 25 0 0 1 55 30" className={styles.dialFill} pathLength={100} />
          </svg>
          <span>
            0.82 <em>confidence</em>
          </span>
        </div>
      </div>
      <div className={styles.forecast}>
        <svg viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 30 C 30 28, 60 26, 100 22 L 200 6 L 200 22 L 100 22 C 60 26, 30 30, 0 32 Z" className={styles.band} />
          <path d="M0 31 C 30 29, 60 26, 100 22" className={styles.hist} />
          <path d="M100 22 C 130 19, 160 16, 200 14" className={styles.proj} />
          <line x1="100" x2="100" y1="2" y2="38" className={styles.nowLine} />
        </svg>
        <span className={styles.forecastLabel}>Projected demand · 8 wk band</span>
      </div>
      <div className={styles.intelFoot}>
        <span className={styles.guard}>✓ Brand</span>
        <span className={styles.guard}>✓ Budget</span>
        <span className={styles.actions}>
          <span className={styles.approve}>Approve</span>
          <span className={styles.review}>Review</span>
        </span>
      </div>
      <Callout x={4} y={42} side="left" n={0}>Signals · weighted evidence</Callout>
      <Callout x={4} y={70} side="left" n={1}>Forecast · with uncertainty</Callout>
      <Callout x={4} y={91} side="left" n={2}>Guardrails before action</Callout>
    </>
  );
}
