import type { CSSProperties, ReactNode } from "react";
import s from "./home.module.css";

/*
 * "Production, not demos": the six things that separate an agent that runs
 * the business from one that impresses in a meeting. Each cell carries a
 * small drawing of the mechanism; the drawings are examples.
 */

function Cell({ title, text, children, wide, full }: { title: string; text: string; children: ReactNode; wide?: boolean; full?: boolean }) {
  return (
    <li className={s.cell} data-wide={wide || undefined} data-full={full || undefined}>
      <div className={s.cellArt} aria-hidden="true">
        {children}
      </div>
      <div className={s.cellText}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </li>
  );
}

export function Production() {
  return (
    <ul className={s.bento} role="list" data-stagger="">
      <Cell wide title="Evaluations before launch" text="Every agent ships with a test set built from your real cases. A change to a prompt, a model or a tool is run against it before it reaches anyone.">
        <div className={s.evals}>
          {["Refund over limit → escalates", "Missing order number → asks", "Angry tone → hands to a person", "Policy question → cites source", "Out of scope → declines politely"].map((c, i) => (
            <span key={c} style={{ "--i": i } as CSSProperties} data-fail={i === 2 || undefined}>
              <i />
              {c}
              <b>{i === 2 ? "fixed" : "pass"}</b>
            </span>
          ))}
        </div>
      </Cell>
      <Cell title="Guardrails" text="Inputs and outputs are constrained to a schema. Personal data is redacted before it reaches a model.">
        <pre className={s.schema}>
          {"{\n  intent: "}
          <em>&quot;refund&quot;</em>
          {",\n  amount: "}
          <em>42.00</em>
          {",\n  email: "}
          <mark>[redacted]</mark>
          {"\n}"}
        </pre>
      </Cell>
      <Cell title="A person where it matters" text="Anything costly, public or irreversible waits for approval, in the tool your team already uses.">
        <div className={s.approve}>
          <span>Send refund of $42.00?</span>
          <span className={s.approveBtns}>
            <b>Approve</b>
            <i>Edit</i>
          </span>
        </div>
      </Cell>
      <Cell title="Grounded in your documents" text="Answers come from your policies, product docs and records, with the passage cited. No source, no answer.">
        <div className={s.cite}>
          <span>
            Orders can be returned within the window in your policy <sup>1</sup>, and exchanges ship free <sup>2</sup>.
          </span>
          <small>1 returns-policy.pdf · 2 shipping.md</small>
        </div>
      </Cell>
      <Cell title="Every run traced" text="Each step, tool call, prompt and output is logged, so a wrong answer can be traced to its cause in minutes.">
        <div className={s.trace}>
          {[
            [0, 18],
            [18, 30],
            [30, 70],
            [72, 96],
          ].map(([a, b], i) => (
            <span key={i} style={{ "--a": `${a}%`, "--b": `${b}%`, "--i": i } as CSSProperties} />
          ))}
        </div>
      </Cell>
      <Cell full title="Cost you can predict" text="Small, fast models handle routing and extraction; larger ones only draft and reason. Every agent has a budget per run and an alert when it drifts.">
        <div className={s.route}>
          <span>
            <b>Route</b>
            <i>small model</i>
          </span>
          <span>
            <b>Extract</b>
            <i>small model</i>
          </span>
          <span data-big="">
            <b>Draft</b>
            <i>large model</i>
          </span>
          <span>
            <b>Check</b>
            <i>rules + small model</i>
          </span>
        </div>
      </Cell>
    </ul>
  );
}
