import Link from "next/link";
import type { CSSProperties } from "react";
import { published } from "@/seo/registry";
import { Arrow } from "@/components/ui/Button";
import { LightField } from "@/components/ui/LightField";
import { FORMAT_LABEL, keepHyphens } from "./Article";
import s from "./shelf.module.css";

/** The latest reports, as a shelf of journal covers. */
export function ResearchShelf({ limit = 4 }: { limit?: number }) {
  const reports = [...published.research].sort((a, b) => b.number - a.number).slice(0, limit);
  if (!reports.length) return null;
  return (
    <div className={s.shelf}>
      <LightField tone="blue" intensity="low" />
      <ul className={s.list} role="list">
        {reports.map((r, i) => (
          <li key={r.slug} data-reveal="up" style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}>
            <Link href={`/research/${r.slug}`} className={`glass ${s.cover}`} data-level="2" data-liquid="" data-interactive="true" data-pointer-light="">
              <span className={s.flag}>
                <b>No. {String(r.number).padStart(2, "0")}</b>
                <span>{FORMAT_LABEL[r.format]}</span>
              </span>
              <span className={s.title}>{keepHyphens(r.title)}</span>
              <span className={s.dek}>{r.dek}</span>
              <span className={s.go}>
                Read <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
