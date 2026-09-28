import type { CSSProperties } from "react";
import styles from "./ServiceArt.module.css";

/**
 * Bespoke looping illustrations — one per discipline. Pure SVG/CSS, sized in
 * `em` against the container width so each scales as a single object.
 * Representations of the work, not claims: no numbers are shown.
 */
export function ServiceArt({ id }: { id: string }) {
  return (
    <div className={styles.art} data-art={id} aria-hidden="true">
      {id === "brand" && <Brand />}
      {id === "web" && <Web />}
      {id === "product" && <Product />}
      {id === "growth" && <Growth />}
      {id === "organic" && <Organic />}
      {id === "intelligence" && <Intelligence />}
      {id === "automation" && <Automation />}
      {id === "transformation" && <Transformation />}
    </div>
  );
}

const v = (o: Record<string, string | number>) => o as CSSProperties;

function Brand() {
  return (
    <div className={styles.brand}>
      <svg className={styles.grid} viewBox="0 0 160 100" preserveAspectRatio="none">
        {[20, 40, 60, 80, 100, 120, 140].map((x, i) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" style={v({ "--i": i })} />
        ))}
        {[25, 50, 75].map((y, i) => (
          <line key={`h${y}`} x1="0" y1={y} x2="160" y2={y} style={v({ "--i": i + 7 })} />
        ))}
        <circle cx="62" cy="50" r="30" style={v({ "--i": 11 })} />
      </svg>
      <span className={styles.glyph}>Aa</span>
      <div className={styles.swatches}>
        {["#f1efea", "#18181a", "#5b7cff", "#c9b58f"].map((c, i) => (
          <i key={c} style={v({ "--c": c, "--i": i })} />
        ))}
      </div>
      <div className={styles.ramp}>
        {[100, 72, 48].map((w, i) => (
          <i key={w} style={v({ "--w": `${w}%`, "--i": i })} />
        ))}
      </div>
    </div>
  );
}

function Web() {
  return (
    <div className={styles.web}>
      <div className={styles.browser}>
        <div className={styles.url}>
          <i />
          <span />
        </div>
        <div className={styles.page}>
          <i className={styles.nav} style={v({ "--i": 0 })} />
          <i className={styles.h1} style={v({ "--i": 1 })} />
          <i className={styles.h1b} style={v({ "--i": 2 })} />
          <i className={styles.cta} style={v({ "--i": 3 })} />
          <div className={styles.cards}>
            {[4, 5, 6].map((i) => (
              <i key={i} style={v({ "--i": i })} />
            ))}
          </div>
          <span className={styles.cursor} />
        </div>
      </div>
      <svg className={styles.ring} viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="16" className={styles.ringTrack} />
        <circle cx="20" cy="20" r="16" className={styles.ringFill} pathLength={1} />
      </svg>
    </div>
  );
}

function Product() {
  return (
    <div className={styles.product}>
      <div className={styles.tile}>
        <span className={styles.toggle}>
          <i />
        </span>
        <span className={styles.caption}>Toggle</span>
      </div>
      <div className={styles.tile}>
        <span className={styles.segment}>
          <b />
          <i />
          <i />
          <i />
        </span>
        <span className={styles.caption}>Segmented</span>
      </div>
      <div className={styles.tile}>
        <span className={styles.slider}>
          <b />
          <i />
        </span>
        <span className={styles.caption}>Range</span>
      </div>
      <div className={styles.tile}>
        <span className={styles.stack}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.caption}>Cards</span>
      </div>
    </div>
  );
}

function Growth() {
  return (
    <div className={styles.growth}>
      <svg viewBox="0 0 200 110" className={styles.chart}>
        <defs>
          <linearGradient id="sa-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9db0ff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#9db0ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[30, 55, 80].map((y) => (
          <line key={y} x1="0" x2="200" y1={y} y2={y} className={styles.gridLine} />
        ))}
        <path className={styles.area} d="M0 92 C 30 90, 45 84, 70 78 S 110 60, 135 48 S 175 22, 200 14 L200 110 L0 110Z" fill="url(#sa-g)" />
        <path className={styles.base} d="M0 80 C 40 79, 80 78, 120 76 S 180 74, 200 73" />
        <path className={styles.lineG} d="M0 92 C 30 90, 45 84, 70 78 S 110 60, 135 48 S 175 22, 200 14" pathLength={1} />
        {[
          [70, 78],
          [135, 48],
          [200, 14],
        ].map(([x, y], i) => (
          <circle key={x} cx={x} cy={y} r="2.6" className={styles.pt} style={v({ "--i": i })} />
        ))}
      </svg>
      <div className={styles.bars}>
        {[38, 56, 44, 72, 64, 88].map((h, i) => (
          <i key={i} style={v({ "--h": `${h}%`, "--i": i })} />
        ))}
      </div>
    </div>
  );
}

function Organic() {
  return (
    <div className={styles.organic}>
      <div className={styles.search}>
        <i />
        <span />
      </div>
      <div className={styles.results}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={styles.result} style={v({ "--i": i })}>
            <i />
            <b />
            <span />
          </div>
        ))}
        <div className={`${styles.result} ${styles.ours}`}>
          <i />
          <b />
          <span />
        </div>
      </div>
    </div>
  );
}

function Intelligence() {
  return (
    <div className={styles.intel}>
      <div className={styles.panel}>
        <svg viewBox="0 0 40 40" className={styles.donut}>
          <circle cx="20" cy="20" r="14" className={styles.dTrack} />
          <circle cx="20" cy="20" r="14" className={styles.dA} pathLength={100} />
          <circle cx="20" cy="20" r="14" className={styles.dB} pathLength={100} />
          <circle cx="20" cy="20" r="14" className={styles.dC} pathLength={100} />
        </svg>
      </div>
      <div className={styles.panel}>
        <div className={styles.cols}>
          {[46, 70, 58, 84, 66, 92, 76].map((h, i) => (
            <i key={i} style={v({ "--h": `${h}%`, "--i": i })} />
          ))}
        </div>
      </div>
      <div className={`${styles.panel} ${styles.wide}`}>
        <svg viewBox="0 0 200 40" preserveAspectRatio="none" className={styles.spark}>
          <path d="M0 30 L20 26 L40 28 L60 20 L80 22 L100 14 L120 17 L140 10 L160 12 L180 6 L200 8" pathLength={1} />
        </svg>
      </div>
    </div>
  );
}

function Automation() {
  const nodes: [number, number][] = [
    [20, 50],
    [70, 22],
    [70, 78],
    [120, 50],
    [170, 30],
    [170, 70],
  ];
  const edges = ["M20 50 L70 22", "M20 50 L70 78", "M70 22 L120 50", "M70 78 L120 50", "M120 50 L170 30", "M120 50 L170 70"];
  return (
    <div className={styles.auto}>
      <svg viewBox="0 0 190 100" className={styles.graph}>
        {edges.map((d) => (
          <path key={d} d={d} className={styles.edge} />
        ))}
        {edges.map((d, i) => (
          <circle key={`p${d}`} r="1.8" className={styles.packet}>
            <animateMotion dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" path={d} />
          </circle>
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i} className={styles.node} style={v({ "--i": i })}>
            <circle cx={x} cy={y} r="7.5" className={styles.halo} />
            <circle cx={x} cy={y} r="3.2" className={styles.core} />
          </g>
        ))}
      </svg>
    </div>
  );
}

function Transformation() {
  return (
    <div className={styles.trans}>
      {Array.from({ length: 40 }, (_, i) => {
        const col = i % 8;
        const row = Math.floor(i / 8);
        return <i key={i} style={v({ "--d": col + row })} />;
      })}
    </div>
  );
}
