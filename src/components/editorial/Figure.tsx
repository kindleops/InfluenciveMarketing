import type { CSSProperties } from "react";
import type { Figure as FigureSpec } from "@/content/library/types";
import { PaidSearchModel } from "./PaidSearchModel";
import s from "./figure.module.css";

/*
 * Report figures. Every number drawn here is either a worked example —
 * labelled "Illustrative" wherever it renders — or comes from the reader's
 * own inputs. Magnitudes are one hue (identity is carried by the row label,
 * never by colour alone), text stays in text tones, and every figure keeps
 * its values in readable text beside the marks.
 */

const money = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n < 100 ? 2 : 0 }).format(n);
const parseTotal = (t: string) => {
  const m = t.replace(/,/g, "").match(/\$?(\d+(?:\.\d+)?)\s*(k|K)?/);
  return m ? Number(m[1]) * (m[2] ? 1000 : 1) : null;
};

export function Figure({ n, title, caption, figure }: { n: number; title: string; caption: string; figure: FigureSpec }) {
  const illustrative = "illustrative" in figure && figure.illustrative;
  const id = `figure-${n}`;
  return (
    <figure className={`glass ${s.figure}`} data-level="2" data-liquid="deep" data-kind={figure.kind} aria-labelledby={`${id}-title`} id={id}>
      <header className={s.head}>
        <span className={s.figNum}>Figure {n}</span>
        {illustrative && <span className={s.badge}>Illustrative</span>}
        {figure.kind === "calculator" && <span className={s.badge} data-live="">Interactive</span>}
      </header>
      <p id={`${id}-title`} className={s.title}>
        {title}
      </p>
      <div className={s.body}>
        <Body figure={figure} />
      </div>
      <figcaption className={s.caption}>{caption}</figcaption>
    </figure>
  );
}

function Body({ figure: f }: { figure: FigureSpec }) {
  switch (f.kind) {
    case "flow":
      return (
        <ol className={s.flow} role="list" style={{ "--n": f.steps.length } as CSSProperties}>
          {f.steps.map((st, i) => (
            <li key={st.label}>
              <span className={s.flowNode} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <b>{st.label}</b>
              <span>{st.detail}</span>
            </li>
          ))}
        </ol>
      );

    case "stack": {
      const total = parseTotal(f.total);
      const max = Math.max(...f.parts.map((p) => p.value));
      return (
        <div className={s.stack}>
          <p className={s.total}>
            <span>Total</span>
            <b>{f.total}</b>
          </p>
          {/* The whole, in proportion: one hue, separated by surface gaps. */}
          <div className={s.whole} aria-hidden="true">
            {f.parts.map((p, i) => (
              <span key={p.label} style={{ flexGrow: p.value, "--o": 1 - (i % 2) * 0.28 } as CSSProperties} />
            ))}
          </div>
          <table className={s.rows}>
            <caption className="sr-only">Allocation of {f.total}, illustrative</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Line</th>
                <th scope="col">Share</th>
                <th scope="col">Amount</th>
                <th scope="col">Why</th>
              </tr>
            </thead>
            <tbody>
              {f.parts.map((p) => (
                <tr key={p.label}>
                  <th scope="row">{p.label}</th>
                  <td className={s.share}>
                    <span className={s.track} aria-hidden="true">
                      <span style={{ width: `${(p.value / max) * 100}%` }} />
                    </span>
                    <span className={s.val}>{p.value} of 100</span>
                  </td>
                  <td className={s.amt}>{total ? money((total * p.value) / 100) : ""}</td>
                  <td className={s.why}>{p.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case "bars": {
      const max = Math.max(...f.rows.map((r) => r.value));
      const fmt = (v: number) =>
        f.unit === "$" ? money(v) : /^dollars?\b/.test(f.unit) ? `${money(v)}${f.unit.replace(/^dollars?/, "")}` : `${v.toLocaleString("en-US")} ${f.unit}`;
      return (
        <table className={s.bars}>
          <caption className="sr-only">Values, illustrative</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">Case</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {f.rows.map((r) => (
              <tr key={r.label}>
                <th scope="row">
                  {r.label}
                  {r.note && <small>{r.note}</small>}
                </th>
                <td>
                  <span className={s.track} aria-hidden="true">
                    <span style={{ width: `${(r.value / max) * 100}%` }} />
                  </span>
                  <span className={s.val}>{fmt(r.value)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    case "formula":
      return (
        <dl className={s.formula}>
          {f.lines.map((l, i) => (
            <div key={l.label}>
              <dt>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {l.label}
              </dt>
              <dd className={s.expr}>{l.expr}</dd>
              <dd className={s.means}>{l.means}</dd>
            </div>
          ))}
        </dl>
      );

    case "matrix": {
      const [tl, tr, bl, br] = f.quadrants;
      return (
        <div className={s.matrix}>
          <span className={s.yAxis} aria-hidden="true">
            <span>{f.y[1]}</span>
            <i />
            <span>{f.y[0]}</span>
          </span>
          <ul className={s.quads} role="list">
            {[
              [tl, `${f.y[1]}, ${f.x[0]}`],
              [tr, `${f.y[1]}, ${f.x[1]}`],
              [bl, `${f.y[0]}, ${f.x[0]}`],
              [br, `${f.y[0]}, ${f.x[1]}`],
            ].map(([q, where], i) => {
              const quad = q as (typeof f.quadrants)[number];
              return (
                <li key={quad.label} data-q={i}>
                  <span className="sr-only">{where as string}: </span>
                  <b>{quad.label}</b>
                  <span>{quad.detail}</span>
                </li>
              );
            })}
          </ul>
          <span className={s.xAxis} aria-hidden="true">
            <span>{f.x[0]}</span>
            <i />
            <span>{f.x[1]}</span>
          </span>
        </div>
      );
    }

    case "calculator":
      return <PaidSearchModel />;
  }
}
