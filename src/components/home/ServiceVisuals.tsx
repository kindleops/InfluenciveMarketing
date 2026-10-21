import type { CSSProperties, ReactNode } from "react";
import { BackEndPanel, FrontEndPanel } from "./Engineering";
import s from "./servicevisuals.module.css";

/*
 * Hero visuals for the AI and engineering services: the work product, drawn
 * small. Every value is an example; the heroes mark them as illustrative.
 */

function Frame({ title, status, children }: { title: string; status: string; children: ReactNode }) {
  return (
    <div className={s.frame}>
      <div className={s.head}>
        <span>{title}</span>
        <span className={s.status}>
          <i />
          {status}
        </span>
      </div>
      {children}
      <p className={s.note}>Illustrative · values are examples</p>
    </div>
  );
}

export function AgentTrace() {
  const steps = [
    ["Tool", "orders.lookup(#4821)", "Found · shipped 3 days ago"],
    ["Retrieve", "policy.search(\"late delivery\")", "2 passages"],
    ["Model", "decide(refund | reship)", "Reship · within policy"],
    ["Draft", "reply.compose(cite = true)", "Reply ready with sources"],
    ["Review", "approval.request(support)", "Waiting for a person"],
  ];
  return (
    <Frame title="Support agent · run 318" status="Needs review">
      <ol className={s.trace}>
        {steps.map(([k, call, out], i) => (
          <li key={call} data-kind={k} style={{ "--i": i } as CSSProperties}>
            <span className={s.dot} />
            <span className={s.kind}>{k}</span>
            <code>{call}</code>
            <span className={s.out}>{out}</span>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

export function FlowStack() {
  const steps = [
    ["Trigger", "New invoice email"],
    ["Extract", "Vendor, amount, PO number"],
    ["Check", "Match against purchase order"],
  ];
  return (
    <Frame title="Invoice intake" status="Live">
      <ol className={s.flow}>
        {steps.map(([k, t], i) => (
          <li key={t} style={{ "--i": i } as CSSProperties}>
            <span className={s.kind}>{k}</span>
            <b>{t}</b>
          </li>
        ))}
      </ol>
      <div className={s.fork}>
        <div style={{ "--i": 3 } as CSSProperties}>
          <span className={s.kind} data-tone="ok">
            Matched
          </span>
          <b>Post to accounting</b>
        </div>
        <div style={{ "--i": 4 } as CSSProperties} data-human="">
          <span className={s.kind} data-tone="warn">
            Mismatch
          </span>
          <b>Send to AP for review</b>
        </div>
      </div>
    </Frame>
  );
}

/** The visual for a service, when it has one of its own. */
export function serviceVisual(slug: string): ReactNode | null {
  switch (slug) {
    case "ai-agent-development":
    case "custom-ai-development":
      return <AgentTrace />;
    case "ai-automation":
    case "workflow-automation":
      return <FlowStack />;
    case "frontend-development":
    case "web-app-development":
      return (
        <div className={s.panelWrap}>
          <FrontEndPanel />
          <p className={s.note}>Illustrative · budgets are targets we set</p>
        </div>
      );
    case "backend-development":
      return (
        <div className={s.panelWrap}>
          <BackEndPanel />
          <p className={s.note}>Illustrative</p>
        </div>
      );
    default:
      return null;
  }
}
