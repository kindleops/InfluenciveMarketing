"use client";

import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { sectionFor } from "@/portal/nav";
import { markNotificationsRead, setDemoRole } from "@/app/portal/actions";
import type { ClientRole } from "@/portal/model";
import { Avatar, Kbd } from "../ui";
import { Icon, type IconName } from "../ui/Icon";
import { Menu, menuStyles as m } from "../ui/Menu";
import { ClientSwitcher } from "./Sidebar";
import type { ShellData } from "./types";
import s from "./shell.module.css";

const NOTE_ICON: Record<string, IconName> = {
  approval: "approvals",
  launch: "bolt",
  deliverable: "deliverables",
  reply: "messages",
  report: "analytics",
};

export function openPalette() {
  window.dispatchEvent(new Event("portal:palette"));
}

export function Header({ data }: { data: ShellData }) {
  const pathname = usePathname();
  const router = useRouter();
  const section = sectionFor(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [pending, start] = useTransition();
  const [mac, setMac] = useState(true);
  const unread = data.notifications.filter((n) => !n.read).length;
  const lead = data.team[0];

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={s.header} data-scrolled={scrolled ? "" : undefined}>
      <div className={s.headerInner}>
        <div className={s.crumbs}>
          <span className={s.mobileClient}>
            <ClientSwitcher data={data} compact />
          </span>
          <span className={s.crumbClient}>{data.client.name}</span>
          <span className={s.crumbSep} aria-hidden="true">
            /
          </span>
          <strong>{section.label}</strong>
        </div>

        {data.demo && (
          <span className={s.demo} title="This portal is showing developer fixture data. Nothing here is a real client, person or result.">
            <Icon name="flag" size={13} />
            <span aria-hidden="true">
              Demo<span className={s.demoText}> data</span>
            </span>
            <span className="sr-only">Demo data: developer fixtures, not a real client</span>
          </span>
        )}

        <button type="button" className={s.search} onClick={openPalette} aria-label="Search and jump to">
          <Icon name="search" size={16} />
          <span className={s.searchText}>Search or jump to…</span>
          <span className={s.keys} aria-hidden="true">
            <Kbd>{mac ? "⌘" : "Ctrl"}</Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>

        <Menu
          label={unread ? `Notifications, ${unread} unread` : "Notifications"}
          triggerClassName={s.iconBtn}
          width={360}
          trigger={
            <>
              <Icon name="bell" size={19} />
              {unread > 0 && <span className={s.bellDot} aria-hidden="true" />}
            </>
          }
        >
          {() => (
            <>
              <div className={s.popHead}>
                <span className={s.popTitle}>Notifications</span>
                {unread > 0 && (
                  <button
                    type="button"
                    className={m.item}
                    style={{ width: "auto", minHeight: 30, fontSize: "var(--p-fs-meta)" }}
                    disabled={pending}
                    onClick={() => start(() => markNotificationsRead().then(() => undefined))}
                  >
                    Mark all read
                  </button>
                )}
              </div>
              {data.notifications.length === 0 ? (
                <p className={m.label} style={{ padding: "1rem 0.65rem 1.25rem" }}>
                  You’re all caught up.
                </p>
              ) : (
                data.notifications.map((n) => (
                  <Link key={n.id} href={n.href} className={s.note} data-unread={n.read ? undefined : ""}>
                    <span className={s.noteIcon}>
                      <Icon name={NOTE_ICON[n.kind] ?? "bell"} size={16} />
                    </span>
                    <span className={s.noteText}>
                      <strong>{n.title}</strong>
                      {n.body && <span>{n.body}</span>}
                      <span>
                        {n.ago}
                        {!n.read && <span className="sr-only"> · unread</span>}
                      </span>
                    </span>
                  </Link>
                ))
              )}
            </>
          )}
        </Menu>

        {lead && (
          <span className={s.teamWrap}>
          <Menu
            label="Your team"
            triggerClassName={s.teamBtn}
            width={320}
            trigger={
              <>
                <Avatar id={lead.id} name={lead.name} size={26} />
                <span className={s.teamLabel}>Your team</span>
              </>
            }
          >
            {() => (
              <>
                <div className={s.popHead}>
                  <span className={s.popTitle}>Your team</span>
                  <Link href="/portal/team" className={m.item} style={{ width: "auto", minHeight: 30, fontSize: "var(--p-fs-meta)" }}>
                    Everyone
                  </Link>
                </div>
                <div className={s.teamCard}>
                  {data.team.slice(0, 3).map((t) => (
                    <div key={t.id} className={s.teamRow} style={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
                      <Avatar id={t.id} name={t.name} size={34} />
                      <span style={{ display: "grid", lineHeight: 1.3 }}>
                        <span style={{ fontSize: "var(--p-fs-ui)", fontWeight: 520 }}>{t.name}</span>
                        <span style={{ fontSize: "var(--p-fs-label)", color: "var(--text-muted)" }}>
                          {t.title}
                          {t.focus ? ` · ${t.focus}` : ""}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className={m.sep} />
                <Link href="/portal/messages?compose=1" className={m.item}>
                  <Icon name="messages" size={16} />
                  Message the team
                </Link>
                <Link href="/portal/help" className={m.item}>
                  <Icon name="help" size={16} />
                  How we work together
                </Link>
              </>
            )}
          </Menu>
          </span>
        )}

        <Menu
          label={`Account — ${data.user.name}`}
          triggerClassName={s.userBtn}
          width={260}
          trigger={<Avatar id={data.user.id} name={data.user.name} side="client" size={30} />}
        >
          {() => (
            <>
              <div style={{ padding: "0.65rem 0.65rem 0.5rem", display: "grid", lineHeight: 1.35 }}>
                <span style={{ fontWeight: 540, fontSize: "var(--p-fs-ui)" }}>{data.user.name}</span>
                <span style={{ fontSize: "var(--p-fs-label)", color: "var(--text-muted)" }}>
                  {data.user.title} · {data.user.roleLabel}
                </span>
              </div>
              <div className={m.sep} />
              <Link href="/portal/account" className={m.item}>
                <Icon name="account" size={16} />
                Account
              </Link>
              <Link href="/portal/settings" className={m.item}>
                <Icon name="settings" size={16} />
                Settings
              </Link>
              {data.demo && (
                <>
                  <div className={m.sep} />
                  <p className={m.label}>Preview as (demo only)</p>
                  {(["owner", "admin", "member", "viewer"] as ClientRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      role="menuitemradio"
                      aria-checked={data.user.role === r}
                      className={m.item}
                      disabled={pending}
                      onClick={() => start(() => setDemoRole(r).then(() => router.refresh()))}
                    >
                      <span style={{ flex: 1, textTransform: "capitalize" }}>{r}</span>
                      {data.user.role === r && <Icon name="check" size={16} />}
                    </button>
                  ))}
                </>
              )}
              <div className={m.sep} />
              <Link href="/" className={m.item}>
                <Icon name="logout" size={16} />
                Back to website
              </Link>
            </>
          )}
        </Menu>
      </div>
    </header>
  );
}
