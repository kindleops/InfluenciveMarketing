"use server";

import { cookies } from "next/headers";
import { refresh } from "next/cache";
import { getPortal, CLIENT_COOKIE, ROLE_COOKIE } from "@/portal/source";
import { can } from "@/portal/access";
import type { Capability, ClientRole, Insight, NotificationPrefs } from "@/portal/model";

/*
 * Every action re-resolves the session and checks the capability itself —
 * server actions are reachable by direct POST, so the UI hiding a button is
 * never the only guard.
 */

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

async function session(capability?: Capability) {
  const portal = await getPortal();
  if (!portal) throw new Error("No portal session");
  if (capability && !can(portal.session.user.role, capability)) return { portal, denied: true as const };
  return { portal, denied: false as const };
}

const clean = (s: unknown, max = 4000) => (typeof s === "string" ? s.trim().slice(0, max) : "");
const DENIED: ActionResult = { ok: false, error: "Your role on this account can’t do that. Ask an owner or admin." };
const FAILED: ActionResult = { ok: false, error: "That didn’t go through. Try again, or message your strategist." };

export async function decideApproval(approvalId: string, decision: "approved" | "changes_requested", note?: string): Promise<ActionResult> {
  try {
    const { portal, denied } = await session("approve");
    if (denied) return DENIED;
    const body = clean(note, 2000);
    if (decision === "changes_requested" && !body) return { ok: false, error: "Tell the team what should change." };
    await portal.source.decide(clean(approvalId, 80), decision === "approved" ? "approved" : "changes_requested", body);
    refresh();
    return { ok: true };
  } catch {
    return FAILED;
  }
}

export async function addComment(kind: "content" | "creative" | "approval", id: string, body: string): Promise<ActionResult> {
  try {
    const { portal, denied } = await session("comment");
    if (denied) return DENIED;
    const text = clean(body);
    if (!text) return { ok: false, error: "Write a comment first." };
    if (!["content", "creative", "approval"].includes(kind)) return FAILED;
    await portal.source.comment({ kind, id: clean(id, 80) }, text);
    refresh();
    return { ok: true };
  } catch {
    return FAILED;
  }
}

export async function sendReply(threadId: string, body: string): Promise<ActionResult> {
  try {
    const { portal, denied } = await session("comment");
    if (denied) return DENIED;
    const text = clean(body);
    if (!text) return { ok: false, error: "Write a message first." };
    await portal.source.reply(clean(threadId, 80), text);
    refresh();
    return { ok: true };
  } catch {
    return FAILED;
  }
}

export async function startThread(subject: string, body: string, ref?: { kind: string; id: string; label: string }): Promise<ActionResult> {
  try {
    const { portal, denied } = await session("comment");
    if (denied) return DENIED;
    const s = clean(subject, 140);
    const b = clean(body);
    if (!s || !b) return { ok: false, error: "Add a subject and a message." };
    const id = await portal.source.startThread(
      s,
      b,
      ref ? { kind: clean(ref.kind, 20), id: clean(ref.id, 80), label: clean(ref.label, 140) } : undefined,
    );
    refresh();
    return { ok: true, id };
  } catch {
    return FAILED;
  }
}

export async function setThreadStatus(threadId: string, status: "open" | "resolved"): Promise<ActionResult> {
  try {
    const { portal, denied } = await session("comment");
    if (denied) return DENIED;
    await portal.source.setThreadStatus(clean(threadId, 80), status === "resolved" ? "resolved" : "open");
    refresh();
    return { ok: true };
  } catch {
    return FAILED;
  }
}

export async function markThreadRead(threadId: string): Promise<ActionResult> {
  try {
    const { portal } = await session();
    await portal.source.readThread(clean(threadId, 80));
    refresh();
    return { ok: true };
  } catch {
    return FAILED;
  }
}

export async function markNotificationsRead(): Promise<ActionResult> {
  try {
    const { portal } = await session();
    await portal.source.markNotificationsRead();
    refresh();
    return { ok: true };
  } catch {
    return FAILED;
  }
}

export async function setInsightStatus(id: string, status: Insight["status"]): Promise<ActionResult> {
  try {
    const { portal, denied } = await session("approve");
    if (denied) return DENIED;
    if (!["accepted", "dismissed", "new"].includes(status)) return FAILED;
    await portal.source.setInsightStatus(clean(id, 80), status);
    refresh();
    return { ok: true };
  } catch {
    return FAILED;
  }
}

export async function savePrefs(prefs: NotificationPrefs): Promise<ActionResult> {
  try {
    const { portal } = await session();
    const b = (v: unknown) => v === true;
    await portal.source.setPrefs({
      approvals: b(prefs.approvals),
      launches: b(prefs.launches),
      deliverables: b(prefs.deliverables),
      replies: b(prefs.replies),
      reports: b(prefs.reports),
      digest: prefs.digest === "daily" || prefs.digest === "off" ? prefs.digest : "weekly",
    });
    refresh();
    return { ok: true };
  } catch {
    return FAILED;
  }
}

export async function switchClient(clientId: string): Promise<ActionResult> {
  try {
    const { portal } = await session();
    if (!portal.session.clients.some((c) => c.id === clientId)) return FAILED;
    (await cookies()).set(CLIENT_COOKIE, clientId, { path: "/portal", sameSite: "lax", httpOnly: true, maxAge: 60 * 60 * 24 * 180 });
    return { ok: true };
  } catch {
    return FAILED;
  }
}

/** Developer fixtures only: preview the portal as another client role. */
export async function setDemoRole(role: ClientRole): Promise<ActionResult> {
  try {
    const { portal } = await session();
    if (!portal.session.demo) return FAILED;
    if (!["owner", "admin", "member", "viewer"].includes(role)) return FAILED;
    (await cookies()).set(ROLE_COOKIE, role, { path: "/portal", sameSite: "lax", httpOnly: true });
    refresh();
    return { ok: true };
  } catch {
    return FAILED;
  }
}
