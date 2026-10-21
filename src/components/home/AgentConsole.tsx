"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import s from "./console.module.css";

/*
 * The hero's product frame: an agent working one request end to end — it
 * looks things up, retrieves, classifies, drafts, then stops for a person to
 * approve before anything leaves the building. Every value in it is an
 * example; the frame is labelled as illustrative wherever it renders.
 *
 * The run plays while the frame is on screen and holds still when it isn't.
 * Reduced motion shows the finished run.
 */

type Step = { kind: "Trigger" | "Tool" | "Retrieve" | "Model" | "Draft" | "Review" | "Action"; call: string; result: string; ms: number };

const STEPS: Step[] = [
  { kind: "Trigger", call: "form.submitted", result: "New inquiry · website", ms: 0 },
  { kind: "Tool", call: "crm.lookup(email)", result: "No existing account", ms: 180 },
  { kind: "Retrieve", call: "docs.search(\"multi-location rollout\")", result: "3 passages · onboarding guide, pricing policy", ms: 240 },
  { kind: "Model", call: "classify(intent, fit)", result: "Qualified · rollout across sites", ms: 620 },
  { kind: "Draft", call: "reply.compose(cite = true)", result: "Reply drafted with 2 citations", ms: 1400 },
  { kind: "Review", call: "approval.request(sales)", result: "Waiting for a person", ms: 0 },
  { kind: "Action", call: "crm.create · slack.notify", result: "Logged and handed over", ms: 210 },
];

const DRAFT =
  "Thanks for reaching out. Rolling out across several locations usually starts with one pilot site, then a shared template for the rest. I've attached our onboarding guide — would a call this week work to map your first site?";

const AGENTS = ["Intake & qualification", "Support triage", "Invoice matching", "Contract review", "Research briefs"];
const CHECKS = ["Cites its sources", "No pricing promises", "Personal data redacted", "Tone matches brand"];

export function AgentConsole() {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(STEPS.length); // SSR + reduced motion: the finished run
  const [chars, setChars] = useState(DRAFT.length);
  const [approved, setApproved] = useState(true);

  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let i = 0;
    let c = 0;
    const clear = () => timer && clearTimeout(timer);
    const tick = () => {
      if (!visible) return;
      // The draft streams in before the run moves on to review.
      if (i === 4 && c < DRAFT.length) {
        c = Math.min(DRAFT.length, c + 3 + Math.floor(Math.random() * 4));
        setChars(c);
        timer = setTimeout(tick, 28);
        return;
      }
      if (i === 5) {
        // Hold on the human checkpoint, then approve.
        timer = setTimeout(() => {
          setApproved(true);
          i = 6;
          setStep(7);
          timer = setTimeout(restart, 4200);
        }, 1700);
        return;
      }
      i += 1;
      setStep(i + 1);
      timer = setTimeout(tick, i === 4 ? 420 : 760);
    };
    const restart = () => {
      i = 0;
      c = 0;
      setStep(1);
      setChars(0);
      setApproved(false);
      timer = setTimeout(tick, 900);
    };
    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was) {
        clear();
        restart();
      } else if (!visible) clear();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
  }, []);

  const shown = STEPS.slice(0, step);
  const active = Math.min(step, STEPS.length) - 1;
  const done = step >= STEPS.length && approved;

  return (
    <div ref={root} className={s.window} aria-hidden="true">
      <div className={s.chrome}>
        <span className={s.crumbs}>
          <b>ascndix</b>
          <i>/</i>Agents<i>/</i>
          <span>Intake &amp; qualification</span>
        </span>
        <span className={s.status} data-done={done || undefined}>
          <i />
          {done ? "Run complete" : step <= 5 ? "Running" : "Needs review"}
        </span>
      </div>

      <div className={s.body}>
        <nav className={s.side}>
          <p className={s.sideLabel}>Agents</p>
          <ul>
            {AGENTS.map((a, i) => (
              <li key={a} data-on={i === 0 || undefined}>
                <span className={s.dot} data-live={i < 3 || undefined} />
                {a}
              </li>
            ))}
          </ul>
          <p className={s.sideLabel}>Workspace</p>
          <ul>
            {["Workflows", "Evaluations", "Run logs", "Guardrails"].map((a) => (
              <li key={a}>
                <span className={s.glyph} />
                {a}
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.main}>
          <header className={s.runHead}>
            <div>
              <p className={s.runId}>Run 1042</p>
              <p className={s.runTitle}>New inquiry from the website</p>
            </div>
            <span className={s.kbd}>
              <kbd>⌘</kbd>
              <kbd>↵</kbd> approve
            </span>
          </header>

          <ol className={s.trace}>
            {shown.map((st, i) => (
              <li key={st.kind + i} data-kind={st.kind} data-active={i === active && !done ? "" : undefined} style={{ "--i": i } as CSSProperties}>
                <span className={s.node} />
                <span className={s.kind}>{st.kind}</span>
                <code className={s.call}>{st.call}</code>
                <span className={s.ms}>{st.ms ? `${st.ms} ms` : ""}</span>
                <span className={s.result}>{st.result}</span>
                {st.kind === "Model" && (
                  <span className={s.conf}>
                    <i style={{ width: "86%" }} />
                    <b>0.86</b>
                  </span>
                )}
                {st.kind === "Draft" && (
                  <p className={s.draft}>
                    {DRAFT.slice(0, chars)}
                    {chars < DRAFT.length && <span className={s.caret} />}
                    <span className={s.ghost}>{DRAFT.slice(chars)}</span>
                  </p>
                )}
                {st.kind === "Review" && (
                  <span className={s.review} data-approved={approved || undefined}>
                    <span className={s.avatar}>SR</span>
                    {approved ? "Approved by Sales" : "Sales review requested"}
                    <span className={s.approve}>{approved ? "Approved" : "Approve"}</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        <aside className={s.inspect}>
          <p className={s.sideLabel}>Run details</p>
          <dl className={s.stats}>
            <div>
              <dt>Model</dt>
              <dd>Primary + fallback</dd>
            </div>
            <div>
              <dt>Steps</dt>
              <dd>{Math.min(step, STEPS.length)} / {STEPS.length}</dd>
            </div>
            <div>
              <dt>Latency</dt>
              <dd>2.65 s</dd>
            </div>
            <div>
              <dt>Cost</dt>
              <dd>$0.012</dd>
            </div>
          </dl>
          <p className={s.sideLabel}>Checks</p>
          <ul className={s.checks}>
            {CHECKS.map((c, i) => (
              <li key={c} data-pass={step >= 5 + (i > 1 ? 1 : 0) || undefined}>
                <span />
                {c}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
