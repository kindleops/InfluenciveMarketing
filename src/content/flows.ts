import type { LogoSlug } from "./logos";

/*
 * Example automations across real third-party systems — the kinds of flows
 * we build, not records of client work. Every value (order numbers, amounts,
 * timings, names) is illustrative and labelled as such wherever it renders.
 *
 * A system is either a brand mark we may show, or a name with a monogram
 * for brands that don't permit redistribution of their mark.
 */

export type FlowSystem = { name: string; logo?: LogoSlug; mono?: string };
export type StepKind = "trigger" | "ai" | "check" | "human" | "action";

export type FlowStep = {
  sys: FlowSystem;
  kind: StepKind;
  /** The event or call, as it would appear in a log. */
  action: string;
  /** One line a person can read. */
  says: string;
  /** Example payload, shown on the active card. */
  payload: string;
  ms: number;
};

export type Flow = {
  id: string;
  team: string;
  title: string;
  summary: string;
  steps: FlowStep[];
  /** Where a person stays in charge. */
  person: string;
  outcome: string;
};

const S = {
  shopify: { name: "Shopify", logo: "shopify" },
  stripe: { name: "Stripe", logo: "stripe" },
  quickbooks: { name: "QuickBooks", logo: "quickbooks" },
  gmail: { name: "Gmail", logo: "gmail" },
  slack: { name: "Slack", mono: "Sl" },
  hubspot: { name: "HubSpot", logo: "hubspot" },
  typeform: { name: "Typeform", logo: "typeform" },
  calendar: { name: "Google Calendar", logo: "googlecalendar" },
  zendesk: { name: "Zendesk", logo: "zendesk" },
  notion: { name: "Notion", logo: "notion" },
  airtable: { name: "Airtable", logo: "airtable" },
  sheets: { name: "Google Sheets", logo: "googlesheets" },
  drive: { name: "Google Drive", logo: "googledrive" },
  sentry: { name: "Sentry", logo: "sentry" },
  github: { name: "GitHub", logo: "github" },
  linear: { name: "Linear", logo: "linear" },
  pagerduty: { name: "PagerDuty", logo: "pagerduty" },
  asana: { name: "Asana", logo: "asana" },
  postgres: { name: "PostgreSQL", logo: "postgresql" },
  snowflake: { name: "Snowflake", logo: "snowflake" },
  esign: { name: "E-signature", mono: "eS" },
  agent: { name: "Agent", mono: "AI" },
} satisfies Record<string, FlowSystem>;

export const FLOWS: Flow[] = [
  {
    id: "order-to-books",
    team: "Ecommerce",
    title: "Order to books",
    summary: "Every order is risk-checked, booked in accounting and confirmed, and big ones get a heads-up.",
    person: "Orders the model flags as risky wait for a person before they ship.",
    outcome: "Order booked, customer confirmed, team told",
    steps: [
      { sys: S.shopify, kind: "trigger", action: "orders/create", says: "Order #1042 placed", payload: '{ "order": 1042, "total": 1240.00, "items": 3 }', ms: 0 },
      { sys: S.stripe, kind: "check", action: "charge.succeeded", says: "Payment captured", payload: '{ "charge": "ch_…9f2", "risk_level": "normal" }', ms: 210 },
      { sys: S.agent, kind: "ai", action: "score_risk(order)", says: "Low risk · ship", payload: '{ "risk": 0.08, "reasons": ["repeat customer"] }', ms: 640 },
      { sys: S.quickbooks, kind: "action", action: "SalesReceipt.create", says: "Sales receipt booked", payload: '{ "receipt": "SR-2291", "account": "Sales" }', ms: 380 },
      { sys: S.gmail, kind: "action", action: "messages.send", says: "Confirmation sent", payload: '{ "to": "customer", "template": "order-confirmed" }', ms: 290 },
      { sys: S.slack, kind: "action", action: "chat.postMessage", says: "#orders · high-value order", payload: '{ "channel": "#orders", "threshold": 1000 }', ms: 180 },
    ],
  },
  {
    id: "lead-to-meeting",
    team: "Sales",
    title: "Lead to meeting",
    summary: "A form fill becomes a qualified contact, a booked call and a deal, before a rep has opened their inbox.",
    person: "Leads outside the rules go to a rep to decide, with the model's reasoning attached.",
    outcome: "Qualified, booked and in the pipeline",
    steps: [
      { sys: S.typeform, kind: "trigger", action: "form_response", says: "Demo request received", payload: '{ "company": "Northwind", "team_size": "50–200" }', ms: 0 },
      { sys: S.hubspot, kind: "action", action: "contacts.upsert", says: "Contact created, deduped", payload: '{ "contact": 88213, "source": "demo form" }', ms: 260 },
      { sys: S.agent, kind: "ai", action: "qualify(lead)", says: "Fit: strong · route to AE", payload: '{ "fit": "strong", "segment": "mid-market" }', ms: 720 },
      { sys: S.calendar, kind: "action", action: "events.insert", says: "Call booked Thu 10:30", payload: '{ "owner": "AE · West", "length": 30 }', ms: 340 },
      { sys: S.slack, kind: "action", action: "chat.postMessage", says: "Rep notified with brief", payload: '{ "to": "@ae-west", "brief": true }', ms: 160 },
      { sys: S.hubspot, kind: "action", action: "deals.create", says: "Deal opened · Discovery", payload: '{ "deal": "Northwind", "stage": "discovery" }', ms: 230 },
    ],
  },
  {
    id: "ticket-to-resolution",
    team: "Support",
    title: "Ticket to resolution",
    summary: "Tickets are classified, answered from your own docs with citations, and approved before they send.",
    person: "Every refund and exception waits for a support lead's approval in Slack.",
    outcome: "Answered with sources, approved, logged",
    steps: [
      { sys: S.zendesk, kind: "trigger", action: "ticket.created", says: "Ticket #5521 · late delivery", payload: '{ "ticket": 5521, "channel": "email" }', ms: 0 },
      { sys: S.agent, kind: "ai", action: "classify(ticket)", says: "Shipping · medium urgency", payload: '{ "intent": "late_delivery", "urgency": "medium" }', ms: 410 },
      { sys: S.notion, kind: "check", action: "search(policy)", says: "2 policy passages found", payload: '{ "pages": ["Shipping policy", "Refunds"] }', ms: 280 },
      { sys: S.agent, kind: "ai", action: "draft(reply, cite)", says: "Reply drafted · reship offer", payload: '{ "citations": 2, "offer": "reship" }', ms: 1300 },
      { sys: S.slack, kind: "human", action: "approval.request", says: "Approved by support lead", payload: '{ "approver": "support lead", "edits": 0 }', ms: 0 },
      { sys: S.zendesk, kind: "action", action: "ticket.update", says: "Reply sent · solved", payload: '{ "status": "solved", "tag": "auto-drafted" }', ms: 240 },
    ],
  },
  {
    id: "invoice-to-bill",
    team: "Finance",
    title: "Invoice in, bill out",
    summary: "Supplier invoices are read, matched to the purchase order and booked, with mismatches sent to a person.",
    person: "Any mismatch against the PO goes to accounts payable to resolve.",
    outcome: "Matched, booked and logged",
    steps: [
      { sys: S.gmail, kind: "trigger", action: "message.received", says: "Invoice from Acme Supply", payload: '{ "attachment": "INV-7710.pdf" }', ms: 0 },
      { sys: S.agent, kind: "ai", action: "extract(invoice)", says: "Vendor, lines, PO-4417", payload: '{ "amount": 3180.00, "po": "PO-4417", "lines": 4 }', ms: 980 },
      { sys: S.airtable, kind: "check", action: "records.find(PO-4417)", says: "PO matched · 4 of 4 lines", payload: '{ "match": true, "variance": 0 }', ms: 310 },
      { sys: S.quickbooks, kind: "action", action: "Bill.create", says: "Bill booked · due in 30 days", payload: '{ "bill": "B-1188", "terms": "Net 30" }', ms: 420 },
      { sys: S.sheets, kind: "action", action: "values.append", says: "Logged to AP register", payload: '{ "sheet": "AP register", "row": 214 }', ms: 190 },
    ],
  },
  {
    id: "incident-to-fix",
    team: "Engineering",
    title: "Incident to fix",
    summary: "An error spike becomes a summarized, linked issue with the likely commit, and pages someone only when it matters.",
    person: "On-call decides on rollback; the agent only gathers and summarizes.",
    outcome: "Triaged, assigned and visible in minutes",
    steps: [
      { sys: S.sentry, kind: "trigger", action: "issue.alert", says: "Error spike · checkout API", payload: '{ "events": 412, "window": "5m" }', ms: 0 },
      { sys: S.github, kind: "check", action: "commits.list", says: "3 deploys in the window", payload: '{ "suspect": "a91f3c2", "author": "payments" }', ms: 330 },
      { sys: S.agent, kind: "ai", action: "summarize(incident)", says: "Likely: null tax region", payload: '{ "confidence": "medium", "evidence": 3 }', ms: 1100 },
      { sys: S.linear, kind: "action", action: "issueCreate", says: "Issue PAY-219 · urgent", payload: '{ "team": "Payments", "priority": "urgent" }', ms: 260 },
      { sys: S.pagerduty, kind: "action", action: "incidents.create", says: "On-call paged", payload: '{ "service": "checkout", "severity": "high" }', ms: 210 },
      { sys: S.slack, kind: "action", action: "chat.postMessage", says: "#incidents · summary posted", payload: '{ "channel": "#incidents", "links": 3 }', ms: 150 },
    ],
  },
  {
    id: "signed-to-kickoff",
    team: "Operations",
    title: "Signed to kickoff",
    summary: "A signed contract sets up the project, the shared folder, the welcome email and the kickoff call.",
    person: "The account lead reviews the welcome before it sends.",
    outcome: "Customer onboarded the hour they signed",
    steps: [
      { sys: S.esign, kind: "trigger", action: "envelope.completed", says: "Contract signed", payload: '{ "customer": "Northwind", "plan": "Annual" }', ms: 0 },
      { sys: S.hubspot, kind: "action", action: "deals.update", says: "Deal → Closed won", payload: '{ "stage": "closed_won" }', ms: 220 },
      { sys: S.asana, kind: "action", action: "projects.fromTemplate", says: "Onboarding project created", payload: '{ "template": "Onboarding", "tasks": 18 }', ms: 480 },
      { sys: S.drive, kind: "action", action: "files.create(folder)", says: "Shared folder set up", payload: '{ "folder": "Northwind / Onboarding" }', ms: 300 },
      { sys: S.gmail, kind: "human", action: "draft.review", says: "Welcome approved by lead", payload: '{ "approver": "account lead" }', ms: 0 },
      { sys: S.calendar, kind: "action", action: "events.insert", says: "Kickoff booked", payload: '{ "attendees": 5, "length": 45 }', ms: 260 },
    ],
  },
  {
    id: "nightly-reconciliation",
    team: "Data",
    title: "Nightly reconciliation",
    summary: "Orders and payouts are compared every night, and anything that doesn't tie out is explained and flagged.",
    person: "Finance resolves every exception; nothing is auto-corrected.",
    outcome: "Books tie out, or someone knows why",
    steps: [
      { sys: S.postgres, kind: "trigger", action: "cron 02:00", says: "Nightly job started", payload: '{ "orders": 1873, "date": "yesterday" }', ms: 0 },
      { sys: S.stripe, kind: "check", action: "payouts.list", says: "Payouts fetched", payload: '{ "payouts": 3, "currency": "usd" }', ms: 540 },
      { sys: S.snowflake, kind: "action", action: "MERGE reconciliation", says: "1,871 of 1,873 matched", payload: '{ "matched": 1871, "unmatched": 2 }', ms: 1900 },
      { sys: S.agent, kind: "ai", action: "explain(exceptions)", says: "2 partial refunds, timing", payload: '{ "cause": "refund timing", "items": 2 }', ms: 820 },
      { sys: S.slack, kind: "action", action: "chat.postMessage", says: "#finance · report posted", payload: '{ "channel": "#finance", "exceptions": 2 }', ms: 170 },
    ],
  },
];

/** The flows the home page plays, in order. */
export const HOME_FLOWS = ["order-to-books", "lead-to-meeting", "ticket-to-resolution", "invoice-to-bill", "incident-to-fix"];
