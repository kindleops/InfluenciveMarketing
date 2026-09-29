/*
 * DEVELOPER FIXTURE SOURCE.
 *
 * An in-memory world per server process, so approvals, replies and comments
 * behave end-to-end in development and demos. State resets on restart and is
 * never shared with a real backend. Only loaded when portalMode() is
 * "fixtures" (see ../index.ts).
 */
import type { ClientRole, DateRange } from "../../model";
import type { Portal, PortalSource, Person } from "../types";
import { buildHalden } from "./halden";
import { buildLumen } from "./lumen";
import { buildReport } from "./metrics";
import { TEAM } from "./team";
import type { World } from "./world";

type Store = { built: number; worlds: Record<string, World> };
const g = globalThis as unknown as { __portalFixture?: Store };

function store(): Store {
  if (!g.__portalFixture) {
    const now = Date.now();
    g.__portalFixture = { built: now, worlds: { halden: buildHalden(now), lumen: buildLumen(now) } };
  }
  return g.__portalFixture;
}

let seq = 0;
const id = (p: string) => `${p}-${Date.now().toString(36)}${(seq++).toString(36)}`;
const nowIso = () => new Date().toISOString();

export function openFixturePortal(clientId?: string, roleOverride?: ClientRole): Portal {
  const { worlds } = store();
  const w = worlds[clientId ?? ""] ?? worlds.halden;
  const baseUser = w.users.find((u) => u.id === w.sessionUserId)!;
  const user = { ...baseUser, role: roleOverride ?? baseUser.role };

  const session = {
    client: w.client,
    user,
    clients: Object.values(worlds).map((x) => ({ id: x.client.id, name: x.client.name, monogram: x.client.monogram })),
    demo: true,
  };

  const people = (): Record<string, Person> => {
    const out: Record<string, Person> = {};
    for (const t of TEAM) out[t.id] = { id: t.id, name: t.name, title: t.title, side: "studio" };
    for (const u of w.users) out[u.id] = { id: u.id, name: u.name, title: u.title ?? "", side: "client" };
    return out;
  };

  const log = (e: Omit<World["activity"][number], "id" | "at" | "actorId">) =>
    w.activity.unshift({ id: id("e"), at: nowIso(), actorId: user.id, ...e });

  const source: PortalSource = {
    kind: "fixture",
    team: async () => TEAM,
    clientUsers: async () => w.users,
    people: async () => people(),
    workstreams: async () => w.workstreams,
    tasks: async () => w.tasks,
    campaigns: async () => w.campaigns,
    content: async () => w.content,
    creative: async () => w.creative,
    approvals: async () => w.approvals,
    threads: async () => w.threads,
    deliverables: async () => w.deliverables,
    analytics: async (range: DateRange) => {
      if (!w.specs) return null;
      return buildReport({
        days: w.days,
        range,
        specs: w.specs,
        paid: w.paidChannels,
        metrics: w.client.metrics,
        targets: w.targets,
        campaigns: w.campaigns,
        campaignChannel: w.campaignChannel,
        creatives: w.creative,
        seed: 3,
      });
    },
    opportunities: async () => w.opportunities,
    experiments: async () => w.experiments,
    insights: async () => w.insights,
    activity: async () => w.activity,
    notifications: async () => w.notifications,
    billing: async () => w.billing,
    integrations: async () => w.integrations,
    onboarding: async () => w.onboarding,
    prefs: async () => w.prefs,

    async decide(approvalId, decision, note) {
      const a = w.approvals.find((x) => x.id === approvalId);
      if (!a || a.state !== "pending") return;
      a.state = decision;
      a.audit.push({ at: nowIso(), actorId: user.id, action: decision, revision: a.revision, note: note || undefined });
      const approved = decision === "approved";
      for (const c of w.creative) if (c.approvalId === a.id) c.status = approved ? "approved" : "changes_requested";
      for (const c of w.content)
        if (c.approvalId === a.id) c.stage = approved ? (c.publishAt ? "scheduled" : "approved") : "drafting";
      if (a.subject?.kind === "campaign") {
        const camp = w.campaigns.find((c) => c.id === a.subject!.id);
        camp?.timeline.push({ at: nowIso(), title: approved ? `${a.title} — approved` : `Changes requested: ${a.title}`, detail: note || undefined, byId: user.id });
      }
      log({
        kind: approved ? "approved" : "changes",
        title: approved ? `${a.title.replace(/^(Approve|Review|Confirm) /, "")} approved` : `Changes requested on ${a.title.replace(/^(Approve|Review|Confirm) /, "").toLowerCase()}`,
        detail: note || undefined,
        ref: { kind: "approval", id: a.id, label: a.title },
      });
    },

    async comment(target, body) {
      const c = { id: id("cm"), authorId: user.id, at: nowIso(), body };
      if (target.kind === "content") w.content.find((x) => x.id === target.id)?.comments.push(c);
      if (target.kind === "creative") w.creative.find((x) => x.id === target.id)?.comments.push(c);
      if (target.kind === "approval") {
        const a = w.approvals.find((x) => x.id === target.id);
        a?.audit.push({ at: c.at, actorId: user.id, action: "commented", revision: a.revision, note: body });
      }
    },

    async reply(threadId, body) {
      const t = w.threads.find((x) => x.id === threadId);
      if (!t) return;
      t.messages.push({ id: id("m"), authorId: user.id, at: nowIso(), body });
      t.unread = 0;
      if (t.status === "resolved") t.status = "open";
    },

    async startThread(subject, body, ref) {
      const tid = id("m");
      w.threads.unshift({
        id: tid,
        subject,
        status: "open",
        unread: 0,
        ref: ref ? { kind: ref.kind as never, id: ref.id, label: ref.label } : undefined,
        messages: [{ id: id("m"), authorId: user.id, at: nowIso(), body }],
      });
      return tid;
    },

    async setThreadStatus(threadId, status) {
      const t = w.threads.find((x) => x.id === threadId);
      if (t) t.status = status;
    },

    async readThread(threadId) {
      const t = w.threads.find((x) => x.id === threadId);
      if (t) t.unread = 0;
      for (const n of w.notifications) if (n.href.endsWith(`thread=${threadId}`)) n.read = true;
    },

    async markNotificationsRead() {
      for (const n of w.notifications) n.read = true;
    },

    async setInsightStatus(insightId, status) {
      const i = w.insights.find((x) => x.id === insightId);
      if (i) i.status = status;
    },

    async setPrefs(prefs) {
      w.prefs = prefs;
    },
  };

  return { session, source };
}
