import type { CSSProperties } from "react";
import s from "./integrations.module.css";

/*
 * The systems an agent or app usually has to talk to, around the thing we
 * build. Names only, set as type: these are common integration targets,
 * not partnerships or endorsements.
 */

const SYSTEMS: [string, string, string][] = [
  ["Salesforce", "Sf", "CRM"],
  ["HubSpot", "Hs", "CRM"],
  ["Slack", "Sl", "Chat"],
  ["Microsoft 365", "Ms", "Email · Docs"],
  ["Google Workspace", "Gw", "Email · Docs"],
  ["Zendesk", "Zd", "Support"],
  ["Stripe", "St", "Billing"],
  ["QuickBooks", "Qb", "Accounting"],
  ["Shopify", "Sh", "Commerce"],
  ["PostgreSQL", "Pg", "Data"],
  ["Snowflake", "Sn", "Warehouse"],
  ["Twilio", "Tw", "Voice · SMS"],
];

export function Integrations() {
  const n = SYSTEMS.length;
  return (
    <div className={s.wrap}>
      <div className={s.orbit} aria-hidden="true">
        <svg className={s.lines} viewBox="-50 -50 100 100" preserveAspectRatio="none">
          {SYSTEMS.map((_, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(a) * 41;
            const y = Math.sin(a) * 41;
            return (
              <g key={i} style={{ "--i": i } as CSSProperties}>
                <line x1="0" y1="0" x2={x} y2={y} className={s.line} vectorEffect="non-scaling-stroke" />
                <line x1="0" y1="0" x2={x} y2={y} className={s.pulse} vectorEffect="non-scaling-stroke" pathLength={100} />
              </g>
            );
          })}
        </svg>
        <div className={s.hub}>
          <span className={s.hubMark} />
          <b>Your agents & apps</b>
          <small>One typed integration layer</small>
        </div>
      </div>
      <ul className={s.tiles} role="list" aria-label="Systems we commonly integrate with">
        {SYSTEMS.map(([name, mark, kind], i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          return (
            <li key={name} style={{ "--x": `${50 + Math.cos(a) * 41}%`, "--y": `${50 + Math.sin(a) * 41}%`, "--i": i } as CSSProperties}>
              <span className={s.mono} aria-hidden="true">
                {mark}
              </span>
              <span className={s.name}>
                {name}
                <small>{kind}</small>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
