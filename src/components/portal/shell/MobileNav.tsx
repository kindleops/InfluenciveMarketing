"use client";

import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { NAV_GROUPS, SECONDARY, sectionFor } from "@/portal/nav";
import { Icon, type IconName } from "../ui/Icon";
import { Dialog } from "../ui/Dialog";
import type { ShellData } from "./types";
import s from "./shell.module.css";

const TABS: { href: string; label: string; icon: IconName; badge?: "approvals" | "messages" }[] = [
  { href: "/portal", label: "Command", icon: "command" },
  { href: "/portal/approvals", label: "Approvals", icon: "approvals", badge: "approvals" },
  { href: "/portal/campaigns", label: "Campaigns", icon: "campaigns" },
  { href: "/portal/messages", label: "Messages", icon: "messages", badge: "messages" },
];

const LENS = { type: "spring", stiffness: 520, damping: 42 } as const;

export function MobileNav({ data }: { data: ShellData }) {
  const pathname = usePathname();
  const current = sectionFor(pathname).href;
  const [more, setMore] = useState(false);
  const inTabs = TABS.some((t) => t.href === current);
  const moreItems = [...NAV_GROUPS.flatMap((g) => g.items), ...SECONDARY].filter(
    (i) => !TABS.some((t) => t.href === i.href) && (i.href !== "/portal/billing" || data.canBilling),
  );

  return (
    <>
      <LayoutGroup id="portal-tabs">
        <nav className={s.bottomNav} aria-label="Primary">
          {TABS.map((t) => {
            const active = current === t.href;
            const n = t.badge ? data.counts[t.badge] : 0;
            return (
              <Link key={t.href} href={t.href} className={s.tab} aria-current={active ? "page" : undefined}>
                {active && <motion.span layoutId="portal-tab-lens" className={s.tabLens} transition={LENS} aria-hidden="true" />}
                <span className={s.tabIcon}>
                  <Icon name={t.icon} size={21} />
                </span>
                {t.label}
                {n > 0 && (
                  <span className={s.tabBadge} data-tone={t.badge === "messages" ? "neutral" : undefined}>
                    {n}
                    <span className="sr-only"> {t.badge === "approvals" ? "waiting on you" : "unread"}</span>
                  </span>
                )}
              </Link>
            );
          })}
          <button type="button" className={s.tab} aria-expanded={more} aria-haspopup="dialog" onClick={() => setMore(true)}>
            {!inTabs && <motion.span layoutId="portal-tab-lens" className={s.tabLens} transition={LENS} aria-hidden="true" />}
            <span className={s.tabIcon}>
              <Icon name="more" size={21} strokeWidth={2.4} />
            </span>
            More
          </button>
        </nav>
      </LayoutGroup>
      <Dialog open={more} onClose={() => setMore(false)} label="More sections">
        <div className={s.moreHead}>
          <p style={{ fontSize: "var(--p-fs-h2)", fontWeight: 520 }}>{data.client.name}</p>
          <p style={{ fontSize: "var(--p-fs-meta)", color: "var(--text-muted)" }}>{data.client.meta}</p>
        </div>
        <div className={s.moreGrid}>
          {moreItems.map((i) => (
            <Link key={i.href} href={i.href} className={s.moreItem} aria-current={current === i.href ? "page" : undefined} onClick={() => setMore(false)}>
              <Icon name={i.icon} size={19} />
              {i.label}
            </Link>
          ))}
        </div>
      </Dialog>
    </>
  );
}
