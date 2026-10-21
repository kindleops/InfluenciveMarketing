import type { CSSProperties } from "react";
import s from "./engineering.module.css";

/*
 * Front end and back end, drawn as the work product: a component in a
 * browser frame with the budgets it ships against, an API route as code,
 * the services behind it, and the pipeline every change goes through.
 * The budgets are targets we set, not measurements.
 */

export function FrontEndPanel() {
  return (
    <div className={s.panel} aria-hidden="true">
      <div className={s.browser}>
        <div className={s.bar}>
          <span className={s.lights}>
            <i />
            <i />
            <i />
          </span>
          <span className={s.url}>app.yourcompany.com/overview</span>
        </div>
        <div className={s.app}>
          <div className={s.appSide}>
            {["Overview", "Requests", "Customers", "Reports"].map((x, i) => (
              <span key={x} data-on={i === 0 || undefined}>
                {x}
              </span>
            ))}
          </div>
          <div className={s.appMain}>
            <div className={s.appHead}>
              <b>Overview</b>
              <span className={s.seg}>
                <i data-on="">Week</i>
                <i>Month</i>
              </span>
            </div>
            <div className={s.cards}>
              {[
                ["Open requests", "Example"],
                ["Handled by agents", "Example"],
                ["Waiting on review", "Example"],
              ].map(([k, v], i) => (
                <div key={k} className={s.card} style={{ "--i": i } as CSSProperties}>
                  <span>{k}</span>
                  <span className={s.bars}>
                    {[42, 58, 50, 66, 61, 74, 80].map((h, j) => (
                      <i key={j} style={{ height: `${h - i * 9}%`, "--j": j } as CSSProperties} />
                    ))}
                  </span>
                  <small>{v}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ul className={s.budgets}>
        {[
          ["Largest paint", "under 2.5 s"],
          ["Layout shift", "under 0.1"],
          ["Interaction", "under 200 ms"],
          ["Accessibility", "WCAG 2.2 AA"],
        ].map(([k, v]) => (
          <li key={k}>
            <span>{k}</span>
            <b>{v}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BackEndPanel() {
  return (
    <div className={s.panel} aria-hidden="true">
      <div className={s.code}>
        <div className={s.tabs}>
          <span data-on="">route.ts</span>
          <span>qualify.worker.ts</span>
          <span>schema.sql</span>
        </div>
        <pre>
          <code>
            <span className={s.c}>{"// POST /api/requests"}</span>
            {"\n"}
            <span className={s.k}>export async function</span> <span className={s.f}>POST</span>(req: <span className={s.t}>Request</span>) {"{"}
            {"\n  "}
            <span className={s.k}>const</span> input = <span className={s.t}>RequestInput</span>.<span className={s.f}>parse</span>(<span className={s.k}>await</span> req.<span className={s.f}>json</span>());
            {"\n  "}
            <span className={s.k}>const</span> row = <span className={s.k}>await</span> db.requests.<span className={s.f}>insert</span>(input);
            {"\n  "}
            <span className={s.k}>await</span> queue.<span className={s.f}>enqueue</span>(<span className={s.s}>&quot;qualify&quot;</span>, {"{"} id: row.id {"}"});
            {"\n  "}
            <span className={s.k}>return</span> <span className={s.t}>Response</span>.<span className={s.f}>json</span>({"{"} id: row.id {"}"}, {"{"} status: <span className={s.n}>202</span> {"}"});
            {"\n}"}
          </code>
        </pre>
      </div>
      <div className={s.arch}>
        {["API", "Queue", "Workers", "Postgres", "Models", "CRM"].map((x, i) => (
          <span key={x} style={{ "--i": i } as CSSProperties}>
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

const STAGES = ["Commit", "Lint", "Types", "Tests", "Preview", "Production"];

export function Pipeline() {
  return (
    <ol className={s.pipe} data-reveal="fade" aria-label="Every change goes through: commit, lint, type checks, tests, a preview deploy, then production">
      {STAGES.map((x, i) => (
        <li key={x} style={{ "--i": i } as CSSProperties}>
          <span className={s.tick} aria-hidden="true" />
          {x}
        </li>
      ))}
    </ol>
  );
}
