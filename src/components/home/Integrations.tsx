import type { CSSProperties } from "react";
import s from "./integrations.module.css";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { LogoSlug } from "@/content/logos";

/*
 * The systems an agent or app usually has to talk to, around the thing we
 * build, with the owner's mark where it may be redistributed. These are
 * common integration targets, not partnerships or endorsements.
 */

/** [name, logo or monogram, kind]. Brands that don't permit redistribution of their mark keep a monogram. */
const SYSTEMS: [string, LogoSlug | { mono: string }, string][] = [
  ["Salesforce", { mono: "Sf" }, "CRM"],
  ["HubSpot", "hubspot", "CRM"],
  ["Slack", { mono: "Sl" }, "Chat"],
  ["Gmail", "gmail", "Email"],
  ["Notion", "notion", "Docs"],
  ["Zendesk", "zendesk", "Support"],
  ["Stripe", "stripe", "Billing"],
  ["QuickBooks", "quickbooks", "Accounting"],
  ["Shopify", "shopify", "Commerce"],
  ["PostgreSQL", "postgresql", "Data"],
  ["Snowflake", "snowflake", "Warehouse"],
  ["Airtable", "airtable", "Tables"],
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
                {typeof mark === "string" ? <BrandLogo slug={mark} size={16} /> : mark.mono}
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
