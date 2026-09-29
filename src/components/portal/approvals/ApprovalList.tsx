"use client";

import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import { LayoutGroup, motion } from "motion/react";
import { Icon, type IconName } from "../ui/Icon";
import s from "./approvals.module.css";

export interface ListItem {
  id: string;
  title: string;
  category: string;
  icon: IconName;
  due: string;
  urgency: string;
  who: string;
  href: string;
  high: boolean;
  state: "pending" | "approved" | "changes_requested";
}

export function ApprovalList({ items, active, label }: { items: ListItem[]; active?: string; label: string }) {
  return (
    <LayoutGroup id="approvals">
      <ul className={s.list} role="list" aria-label={label}>
        {items.map((it) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <Link href={it.href} scroll={false} className={s.row} aria-current={on ? "true" : undefined}>
                {on && <motion.span layoutId="approval-lens" className={s.rowLens} transition={{ type: "spring", stiffness: 480, damping: 42 }} aria-hidden="true" />}
                <span className={s.rowIcon} data-state={it.state} aria-hidden="true">
                  <Icon name={it.state === "approved" ? "check" : it.state === "changes_requested" ? "refresh" : it.icon} size={16} />
                </span>
                <span className={s.rowText}>
                  <span className={s.rowTitle}>
                    {it.title}
                    {it.high && it.state === "pending" && <span className={s.high} title="High priority" aria-label="High priority" />}
                  </span>
                  <span className={s.rowMeta}>
                    <span>{it.category}</span>
                    <span className={s.rowDue} data-urgency={it.urgency}>
                      {it.due}
                    </span>
                  </span>
                  <span className={s.rowWho}>{it.who}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </LayoutGroup>
  );
}
