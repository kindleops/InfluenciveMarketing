import "server-only";
import { redirect } from "next/navigation";
import { getPortal, type Portal } from "./source";
import { ROLE_LABEL, can } from "./access";
import { ago } from "./format";
import type { ShellData } from "@/components/portal/shell/types";

/** For pages inside the portal: the session, or off to the access screen. */
export async function requirePortal(): Promise<Portal> {
  const portal = await getPortal();
  if (!portal) redirect("/portal/access");
  return portal;
}

export function engagementMeta(startIso: string, now: number) {
  const days = Math.max(0, Math.floor((now - new Date(startIso).getTime()) / 86_400_000));
  if (days < 28) return `Onboarding · week ${Math.floor(days / 7) + 1}`;
  return `Growth System · month ${Math.floor(days / 30.44) + 1}`;
}

export async function loadShell(portal: Portal): Promise<ShellData> {
  const { session, source } = portal;
  const now = Date.now();
  const tz = session.client.timezone;
  const [approvals, threads, notifications, team, workstreams] = await Promise.all([
    source.approvals(),
    source.threads(),
    source.notifications(),
    source.team(),
    source.workstreams(),
  ]);
  const moving = workstreams.filter((w) => w.state !== "next" && w.state !== "delivered").length;
  return {
    client: {
      id: session.client.id,
      name: session.client.name,
      monogram: session.client.monogram,
      accent: session.client.accent ?? "blue",
      meta: engagementMeta(session.client.engagementStart, now),
    },
    clients: session.clients,
    user: {
      id: session.user.id,
      name: session.user.name,
      title: session.user.title ?? "",
      role: session.user.role,
      roleLabel: ROLE_LABEL[session.user.role],
    },
    demo: session.demo,
    counts: {
      approvals: approvals.filter((a) => a.state === "pending").length,
      messages: threads.reduce((n, t) => n + t.unread, 0),
    },
    notifications: [...notifications]
      .sort((a, b) => b.at.localeCompare(a.at))
      .slice(0, 8)
      .map((n) => ({ id: n.id, kind: n.kind, title: n.title, body: n.body, href: n.href, read: n.read, ago: ago(n.at, now, tz) })),
    team: [...team].sort((a, b) => Number(!!b.lead) - Number(!!a.lead)).map((t) => ({ id: t.id, name: t.name, title: t.title, focus: t.focus })),
    signal: moving ? `${moving} moving` : "",
    canBilling: can(session.user.role, "billing"),
  };
}
