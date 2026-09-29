"use client";

import { IntentLink as Link } from "./IntentLink";
import { LayoutGroup, motion } from "motion/react";
import { useId, type ReactNode } from "react";
import s from "./segmented.module.css";

export interface SegItem {
  key: string;
  label: ReactNode;
  href: string;
  count?: number;
}

/**
 * Link-based segmented control. The selection surface slides between
 * options, so a filter change reads as the same control moving.
 */
export function Segmented({ items, active, label, size = "md" }: { items: SegItem[]; active: string; label: string; size?: "sm" | "md" }) {
  const id = useId();
  return (
    <LayoutGroup id={id}>
      <nav className={s.seg} aria-label={label} data-size={size}>
        {items.map((it) => {
          const on = it.key === active;
          return (
            <Link key={it.key} href={it.href} scroll={false} className={s.opt} aria-current={on ? "true" : undefined}>
              {on && <motion.span layoutId="seg" className={s.lens} transition={{ type: "spring", stiffness: 560, damping: 44 }} aria-hidden="true" />}
              <span className={s.text}>
                {it.label}
                {it.count !== undefined && <span className={s.count}>{it.count}</span>}
              </span>
            </Link>
          );
        })}
      </nav>
    </LayoutGroup>
  );
}
