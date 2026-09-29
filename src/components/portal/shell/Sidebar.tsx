"use client";

import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGroup, motion } from "motion/react";
import { useTransition } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import { brand } from "@/config/brand";
import { COMMAND, NAV_GROUPS, SECONDARY, sectionFor, type NavItem } from "@/portal/nav";
import { switchClient } from "@/app/portal/actions";
import { Icon } from "../ui/Icon";
import { Menu, menuStyles as m } from "../ui/Menu";
import type { ShellData } from "./types";
import s from "./shell.module.css";

const LENS = { type: "spring", stiffness: 520, damping: 44, mass: 0.9 } as const;

function Lens() {
  return <motion.span layoutId="portal-nav-lens" className={s.lens} transition={LENS} aria-hidden="true" />;
}

export function ClientSwitcher({ data, compact }: { data: ShellData; compact?: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const { client, clients } = data;
  const body = (
    <>
      <span className={s.monogram} data-size={compact ? "sm" : undefined}>
        {client.monogram}
      </span>
      {!compact && (
        <>
          <span className={s.clientText}>
            <span className={s.clientName}>{client.name}</span>
            <span className={s.clientMeta}>{client.meta}</span>
          </span>
          {clients.length > 1 && <Icon name="switch" size={16} />}
        </>
      )}
    </>
  );
  if (clients.length < 2)
    return (
      <div className={compact ? undefined : s.clientBtn} title={client.name}>
        {body}
      </div>
    );
  return (
    <Menu label={`Switch account — current: ${client.name}`} trigger={body} triggerClassName={compact ? s.iconBtn : s.clientBtn} align="start" width={280}>
      {() => (
        <>
          <p className={m.label}>Accounts</p>
          {clients.map((c) => (
            <button
              key={c.id}
              type="button"
              role="menuitemradio"
              aria-checked={c.id === client.id}
              className={m.item}
              disabled={pending}
              onClick={() =>
                start(async () => {
                  if (c.id === client.id) return;
                  await switchClient(c.id);
                  router.push("/portal");
                  router.refresh();
                })
              }
            >
              <span className={s.monogram} data-size="sm">
                {c.monogram}
              </span>
              <span style={{ flex: 1 }}>{c.name}</span>
              {c.id === client.id && <Icon name="check" size={16} />}
            </button>
          ))}
        </>
      )}
    </Menu>
  );
}

function Item({ item, active, badge, className }: { item: NavItem; active: boolean; badge?: { n: number; tone?: "attention" }; className?: string }) {
  return (
    <Link href={item.href} className={`${s.item} ${className ?? ""}`} aria-current={active ? "page" : undefined} title={item.label}>
      {active && <Lens />}
      <Icon name={item.icon} size={18} />
      <span className={s.itemLabel}>{item.label}</span>
      {badge && badge.n > 0 && (
        <>
          <span className={s.badgeWrap}>
            <span className={s.badge} data-tone={badge.tone}>
              {badge.n}
              <span className="sr-only"> {item.badge === "approvals" ? "waiting on you" : "unread"}</span>
            </span>
          </span>
          <span className={s.railBadge} aria-hidden="true" />
        </>
      )}
    </Link>
  );
}

export function Sidebar({ data }: { data: ShellData }) {
  const pathname = usePathname();
  const current = sectionFor(pathname);
  const badge = (b?: NavItem["badge"]) =>
    b === "approvals" ? { n: data.counts.approvals, tone: "attention" as const } : b === "messages" ? { n: data.counts.messages } : undefined;

  return (
    <aside className={s.sidebar} aria-label="Portal">
      <div className={s.brand}>
        <Link href="/portal" className={s.brandLink} aria-label={`${brand.name} — Command`}>
          <BrandMark size={22} />
        </Link>
        <span className={s.brandTag}>Client portal</span>
      </div>
      <ClientSwitcher data={data} />
      <LayoutGroup id="portal-nav">
        <nav className={s.nav} aria-label="Primary">
          <ul className={s.list} role="list">
            <li>
              <Link href={COMMAND.href} className={`${s.item} ${s.command}`} aria-current={current.href === "/portal" ? "page" : undefined} title="Command">
                {current.href === "/portal" && <Lens />}
                <Icon name="command" size={18} />
                <span className={s.itemLabel}>Command</span>
                <span className={s.commandSignal}>{data.signal}</span>
              </Link>
            </li>
          </ul>
          {NAV_GROUPS.filter((g) => g.label !== "Account" || data.canBilling).map((g) => (
            <div key={g.label} className={s.group}>
              <span className={s.groupLabel}>{g.label}</span>
              <ul className={s.list} role="list">
                {g.items.map((it) => (
                  <li key={it.href}>
                    <Item item={it} active={current.href === it.href} badge={badge(it.badge)} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className={s.foot}>
          <ul className={s.secondary} role="list" aria-label="More">
            {SECONDARY.map((it) => (
              <li key={it.href}>
                <Item item={it} active={current.href === it.href} />
              </li>
            ))}
          </ul>
        </div>
      </LayoutGroup>
    </aside>
  );
}
