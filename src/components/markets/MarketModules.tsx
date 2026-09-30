import Link from "next/link";
import type { CSSProperties } from "react";
import type { Item } from "@/content/commercial/types";
import { Arrow } from "@/components/ui/Button";
import s from "./markets.module.css";

/** The industries that matter in a market, as cards that lead onward. */
export function SectorCards({ items }: { items: { name: string; note: string; href: string }[] }) {
  return (
    <ul className={s.sectors} role="list">
      {items.map((x, i) => (
        <li key={x.href} data-reveal="up" style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}>
          <Link href={x.href} className={`glass ${s.sector}`} data-level="2" data-liquid="" data-interactive="true" data-pointer-light="" data-tilt="5">
            <span className={s.sectorIdx}>{String(i + 1).padStart(2, "0")}</span>
            <span className={s.sectorName}>{x.name}</span>
            <span className={s.sectorNote}>{x.note}</span>
            <span className={s.sectorGo}>
              Industry deep-dive <Arrow />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** State and local rules, set as a document: numbered, tagged, footnoted. */
export function Ledger({ region, code, items }: { region: string; code: string; items: Item[] }) {
  return (
    <div className={`glass ${s.ledger}`} data-level="3" data-liquid="deep" data-reveal="up">
      <div className={s.ledgerHead}>
        <span>
          <b>{code}</b> Plan-around list
        </span>
        <span>{region}</span>
      </div>
      <ol className={s.ledgerRows} role="list">
        {items.map((r, i) => (
          <li key={r.title}>
            <span className={s.ledgerIdx}>§ {String(i + 1).padStart(2, "0")}</span>
            <h3>{r.title}</h3>
            <p>{r.detail}</p>
          </li>
        ))}
      </ol>
      <p className={s.ledgerFoot}>Not legal advice. We plan campaigns around these and confirm the specifics with your counsel.</p>
    </div>
  );
}
