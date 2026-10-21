"use client";

import { useState, type CSSProperties } from "react";
import s from "./canvas.module.css";

/*
 * An automation as its owner sees it: one trigger, a few steps, and a fork
 * where the model's classification decides whether a person gets involved.
 * Pick the kind of request and the route through the graph lights up.
 * The graph is an example, labelled as such where it renders.
 */

type Node = { id: string; x: number; y: number; kind: string; title: string; meta: string; route?: "high" | "routine" };

const NODES: Node[] = [
  { id: "trigger", x: 9, y: 50, kind: "Trigger", title: "Request received", meta: "Form, email or chat" },
  { id: "enrich", x: 28.5, y: 50, kind: "Tool", title: "Enrich & dedupe", meta: "CRM + company data · retries 3" },
  { id: "classify", x: 48, y: 50, kind: "Model", title: "Classify intent", meta: "Structured output, schema-checked" },
  { id: "review", x: 70, y: 22, kind: "Human", title: "Owner reviews", meta: "Approve or edit in Slack", route: "high" },
  { id: "deal", x: 90.5, y: 22, kind: "Action", title: "Create deal, book call", meta: "CRM · calendar", route: "high" },
  { id: "draft", x: 70, y: 78, kind: "Model", title: "Draft answer", meta: "Grounded in your docs", route: "routine" },
  { id: "send", x: 90.5, y: 78, kind: "Action", title: "Send and log", meta: "Email · help desk", route: "routine" },
];

const EDGES: [string, string, ("high" | "routine")?][] = [
  ["trigger", "enrich"],
  ["enrich", "classify"],
  ["classify", "review", "high"],
  ["review", "deal", "high"],
  ["classify", "draft", "routine"],
  ["draft", "send", "routine"],
];

const at = (id: string) => NODES.find((n) => n.id === id)!;

export function WorkflowCanvas() {
  const [route, setRoute] = useState<"high" | "routine">("high");
  return (
    <div className={s.wrap}>
      <div className={s.toolbar}>
        <span className={s.name}>
          <i aria-hidden="true" />
          Inbound requests
        </span>
        <div className={s.switch} role="radiogroup" aria-label="Run the workflow with">
          {(
            [
              ["high", "High-value lead"],
              ["routine", "Routine question"],
            ] as const
          ).map(([v, label]) => (
            <button key={v} type="button" role="radio" aria-checked={route === v} onClick={() => setRoute(v)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={s.canvas} data-route={route}>
        <svg className={s.edges} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {EDGES.map(([a, b, r]) => {
            const A = at(a);
            const B = at(b);
            const mx = (A.x + B.x) / 2;
            const d = `M ${A.x} ${A.y} C ${mx} ${A.y}, ${mx} ${B.y}, ${B.x} ${B.y}`;
            const on = !r || r === route;
            return (
              <g key={a + b} data-on={on || undefined}>
                <path d={d} className={s.edge} vectorEffect="non-scaling-stroke" />
                <path d={d} className={s.flow} vectorEffect="non-scaling-stroke" pathLength={100} />
              </g>
            );
          })}
        </svg>
        <ol className={s.nodes} aria-label={`Workflow steps for a ${route === "high" ? "high-value lead" : "routine question"}`}>
          {NODES.map((n, i) => {
            const on = !n.route || n.route === route;
            return (
              <li
                key={n.id}
                className={s.node}
                data-kind={n.kind}
                data-on={on || undefined}
                aria-hidden={!on || undefined}
                style={{ "--x": `${n.x}%`, "--y": `${n.y}%`, "--i": i } as CSSProperties}
              >
                <span className={s.kind}>{n.kind}</span>
                <b>{n.title}</b>
                <span className={s.meta}>{n.meta}</span>
              </li>
            );
          })}
        </ol>
      </div>
      <div className={s.foot} aria-hidden="true">
        <span>
          <i data-tone="ok" />
          Every run logged
        </span>
        <span>
          <i data-tone="warn" />
          Failures retried, then queued for a person
        </span>
        <span>
          <i data-tone="accent" />
          Owner notified on anything unusual
        </span>
      </div>
    </div>
  );
}
