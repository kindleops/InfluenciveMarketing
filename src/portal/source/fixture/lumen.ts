/*
 * DEVELOPER FIXTURE — "Lumen Dental Group" is a fictional client in its first
 * week. It exists to exercise onboarding and every empty state honestly.
 */
import type { Client, ClientUser } from "../../model";
import { clock } from "./kit";
import type { World } from "./world";

export function buildLumen(now: number): World {
  const { at, h } = clock(now);
  const client: Client = {
    id: "lumen",
    name: "Lumen Dental Group",
    monogram: "LD",
    industry: "Multi-location dental practice",
    website: "lumendental.example",
    accent: "teal",
    timezone: "America/Chicago",
    currency: "USD",
    engagementStart: at(-3),
    metrics: ["qualified_leads", "booked_calls", "cpl", "conversion_rate", "sessions"],
    labels: { qualified_leads: "New patient inquiries", booked_calls: "Booked appointments" },
  };
  const users: ClientUser[] = [
    { id: "u-morgan", name: "Morgan Hale", email: "morgan@lumendental.example", title: "Director of Growth", role: "owner" },
  ];
  return {
    client,
    users,
    sessionUserId: "u-morgan",
    specs: null,
    days: [],
    paidChannels: [],
    campaignChannel: {},
    targets: {},
    workstreams: [
      { id: "lw-kickoff", name: "Onboarding & discovery", state: "in_progress", progress: { type: "steps", done: 2, total: 7, unit: "setup steps" }, ownerId: "t-avery", next: { label: "Analytics access", at: at(2) } },
      { id: "lw-plan", name: "90-day growth plan", state: "next", progress: { type: "stage", label: "Starts after discovery" }, ownerId: "t-ryan", next: { label: "Plan review", at: at(12) } },
    ],
    tasks: [
      { id: "lk-ga", title: "Share Google Analytics access", reason: "We need read access to baseline your current patient inquiries before planning.", dueAt: at(2, 21), ownerId: "t-avery", action: "Open setup" },
    ],
    campaigns: [],
    content: [],
    creative: [],
    approvals: [],
    threads: [
      {
        id: "lm-welcome",
        subject: "Welcome to the engagement",
        status: "open",
        unread: 1,
        messages: [
          {
            id: "lm1",
            authorId: "t-ryan",
            at: h(-20),
            body: "Welcome aboard. This week is discovery: we’ll get access to your analytics and ad accounts, interview two of your front-desk leads, and come back with a 90-day plan. Everything we do will show up here as it happens.",
          },
        ],
      },
    ],
    deliverables: [],
    opportunities: [],
    experiments: [],
    insights: [],
    activity: [
      { id: "le1", at: h(-20), kind: "message", title: "Ryan sent a welcome note", actorId: "t-ryan" },
      { id: "le2", at: h(-22), kind: "connected", title: "Engagement started", actorId: "t-ryan" },
    ],
    notifications: [{ id: "ln1", at: h(-20), kind: "reply", title: "Ryan sent you a message", body: "Welcome to the engagement", href: "/portal/messages?thread=lm-welcome", read: false }],
    billing: {
      engagement: {
        name: "Growth System",
        plan: "Retainer · strategy, acquisition and web",
        startedAt: client.engagementStart,
        term: "6 months, then monthly",
        retainer: 12_000,
        nextBillingDate: at(27),
        scope: ["Strategy & reporting", "Paid acquisition", "Website & conversion"],
        leadId: "t-ryan",
      },
      invoices: [
        { id: "linv-1", number: "LD-0001", issuedAt: at(-3), dueAt: at(12), amount: 12_000, status: "due", lines: [{ label: "Growth System retainer — month 1", amount: 12_000 }] },
      ],
      additionalWork: [],
    },
    integrations: [
      { id: "ga4", name: "Google Analytics 4", category: "analytics", status: "not_connected", note: "Needed to baseline patient inquiries." },
      { id: "google-ads", name: "Google Ads", category: "advertising", status: "not_connected" },
      { id: "meta", name: "Meta Ads", category: "advertising", status: "not_connected" },
      { id: "website", name: "Website (WordPress)", category: "website", status: "not_connected" },
    ],
    onboarding: [
      { id: "company", label: "Company information", detail: "Legal name, locations and billing contact", status: "done", owner: "client" },
      { id: "goals", label: "Primary goals", detail: "New patient inquiries and booked appointments", status: "done", owner: "client" },
      { id: "team", label: "Invite your team", detail: "Practice managers who approve work", status: "in_progress", owner: "client" },
      { id: "analytics", label: "Connect analytics", detail: "Google Analytics read access", status: "todo", owner: "client" },
      { id: "ads", label: "Connect ad accounts", detail: "Google and Meta, if you have them", status: "todo", owner: "client" },
      { id: "website", label: "Website access", detail: "An editor login for your site", status: "todo", owner: "client" },
      { id: "billing", label: "Billing details", detail: "Payment method for the retainer", status: "todo", owner: "client" },
    ],
    prefs: { approvals: true, launches: true, deliverables: true, replies: true, reports: true, digest: "weekly" },
  };
}
