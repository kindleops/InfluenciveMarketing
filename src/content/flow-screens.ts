/*
 * What each step of an example flow looks like inside the tool it touches:
 * simplified recreations of familiar interfaces, filled with example data.
 * They are drawings, not screenshots, and are labelled as illustrative
 * wherever they render. One entry per step, in step order.
 */

type Tone = "ok" | "warn" | "bad" | "info" | "muted";

export type Screen =
  | { t: "order"; id: string; customer: string; items: [string, number, string][]; total: string; badges: [string, Tone][] }
  | { t: "payment"; amount: string; customer: string; method: string; risk: string; events: string[] }
  | { t: "agent"; task: string; input: string; out: [string, string][]; verdict: string; tone: Tone }
  | { t: "receipt"; doc: string; party: string; lines: [string, string][]; total: string; badge: string }
  | { t: "email"; folder: string; from: string; to: string; subject: string; body: string[]; attach?: string; sent?: boolean }
  | { t: "chat"; channel: string; text: string; fields?: [string, string][]; actions?: string[]; approved?: string }
  | { t: "form"; title: string; answers: [string, string][] }
  | { t: "crm"; kind: "Contact" | "Deal"; name: string; sub: string; props: [string, string][]; stage?: string[]; at?: number }
  | { t: "calendar"; day: string; title: string; time: string; who: string[] }
  | { t: "ticket"; id: string; subject: string; requester: string; message: string; draft?: string; tags: string[]; solved?: boolean }
  | { t: "doc"; icon: string; title: string; blocks: string[]; hl: number[] }
  | { t: "table"; app: "airtable" | "sheets" | "snowflake"; title: string; cols: string[]; rows: string[][]; hl: number; sql?: string }
  | { t: "chart"; issue: string; where: string; events: string; series: number[] }
  | { t: "commits"; repo: string; items: [string, string, string, boolean?][] }
  | { t: "issue"; key: string; title: string; status: string; priority: string; team: string; labels: string[]; body: string }
  | { t: "incident"; title: string; service: string; urgency: string; oncall: string; steps: [string, string][] }
  | { t: "tasks"; project: string; sections: [string, [string, string, string][]][] }
  | { t: "files"; path: string[]; files: [string, string][] }
  | { t: "esign"; doc: string; signers: [string, string][] }
  | { t: "terminal"; prompt: string; lines: string[] };

export const SCREENS: Record<string, Screen[]> = {
  "order-to-books": [
    {
      t: "order",
      id: "#1042",
      customer: "Avery Lin · returning customer",
      items: [
        ["Linen duvet cover · Queen", 1, "$540.00"],
        ["Sateen sheet set · Queen", 1, "$420.00"],
        ["Pillowcase pair", 2, "$280.00"],
      ],
      total: "$1,240.00",
      badges: [
        ["Paid", "muted"],
        ["Unfulfilled", "warn"],
      ],
    },
    { t: "payment", amount: "$1,240.00", customer: "Avery Lin", method: "Visa •••• 4242", risk: "Normal", events: ["Payment authorized", "Payment captured", "Payout scheduled"] },
    { t: "agent", task: "Score order risk", input: "Order #1042 · $1,240 · 3 items · returning customer", out: [["risk", "0.08"], ["signals", "repeat buyer, AVS match"], ["action", "ship"]], verdict: "Low risk · release to fulfillment", tone: "ok" },
    {
      t: "receipt",
      doc: "Sales Receipt SR-2291",
      party: "Avery Lin",
      lines: [
        ["Linen duvet cover", "$540.00"],
        ["Sateen sheet set", "$420.00"],
        ["Pillowcase pair × 2", "$280.00"],
      ],
      total: "$1,240.00",
      badge: "Deposited to Undeposited Funds",
    },
    { t: "email", folder: "Sent", from: "Northwind Home", to: "avery@…", subject: "Your order #1042 is confirmed", body: ["Hi Avery, thanks for your order.", "We're packing it now and will send tracking as soon as it ships."], sent: true },
    { t: "chat", channel: "orders", text: "High-value order #1042 · $1,240.00 · low risk, released to fulfillment", fields: [["Customer", "Avery Lin"], ["Items", "3"]] },
  ],
  "lead-to-meeting": [
    { t: "form", title: "Book a demo", answers: [["Company", "Northwind"], ["Team size", "50–200"], ["What are you hoping to automate?", "Support triage and order follow-ups"], ["Work email", "dana@northwind.example"]] },
    { t: "crm", kind: "Contact", name: "Dana Ortiz", sub: "Head of Operations · Northwind", props: [["Lifecycle stage", "Lead"], ["Source", "Demo form"], ["Company size", "50–200"], ["Owner", "Unassigned"]] },
    { t: "agent", task: "Qualify inbound lead", input: "Northwind · 50–200 · ops lead · support + order automation", out: [["fit", "strong"], ["segment", "mid-market"], ["route", "AE · West"]], verdict: "Qualified · book discovery with AE", tone: "ok" },
    { t: "calendar", day: "Thu 14", title: "Northwind · Discovery", time: "10:30 – 11:00", who: ["Dana Ortiz", "AE · West"] },
    { t: "chat", channel: "sales-west", text: "New qualified demo: Northwind booked Thu 10:30. Brief attached.", fields: [["Fit", "Strong"], ["Segment", "Mid-market"]] },
    { t: "crm", kind: "Deal", name: "Northwind · Automation", sub: "Pipeline: New business", props: [["Owner", "AE · West"], ["Close date", "Next quarter"]], stage: ["Discovery", "Demo", "Proposal", "Closed won"], at: 0 },
  ],
  "ticket-to-resolution": [
    { t: "ticket", id: "#5521", subject: "Where is my order?", requester: "Sam Patel", message: "My order was due Monday and the tracking hasn't moved in three days.", tags: ["email", "new"] },
    { t: "agent", task: "Classify ticket", input: "“due Monday … tracking hasn't moved in three days”", out: [["intent", "late_delivery"], ["urgency", "medium"], ["sentiment", "frustrated"]], verdict: "Shipping · route to tier 1 with draft", tone: "info" },
    { t: "doc", icon: "📦", title: "Shipping policy", blocks: ["Orders ship within two business days.", "If tracking has not updated for 72 hours, offer a free reship or a full refund.", "Refunds over $200 need a lead's approval."], hl: [1] },
    { t: "ticket", id: "#5521", subject: "Where is my order?", requester: "Sam Patel", message: "My order was due Monday and the tracking hasn't moved in three days.", draft: "Sorry about the wait, Sam. Your tracking hasn't updated in over 72 hours, so we'll reship today at no cost and send the new tracking number.", tags: ["shipping", "ai-draft"] },
    { t: "chat", channel: "support-approvals", text: "Draft reply for #5521 (reship, policy §2). Approve?", actions: ["Approve", "Edit"], approved: "Approved by support lead" },
    { t: "ticket", id: "#5521", subject: "Where is my order?", requester: "Sam Patel", message: "My order was due Monday and the tracking hasn't moved in three days.", draft: "Sorry about the wait, Sam. Your tracking hasn't updated in over 72 hours, so we'll reship today at no cost and send the new tracking number.", tags: ["shipping", "solved"], solved: true },
  ],
  "invoice-to-bill": [
    { t: "email", folder: "Inbox", from: "Acme Supply · Billing", to: "ap@northwind…", subject: "Invoice INV-7710", body: ["Please find attached invoice INV-7710 for PO-4417.", "Payment terms: Net 30."], attach: "INV-7710.pdf" },
    { t: "agent", task: "Extract invoice", input: "INV-7710.pdf · 1 page", out: [["vendor", "Acme Supply"], ["po", "PO-4417"], ["amount", "$3,180.00"], ["lines", "4"]], verdict: "Extracted · confidence high on all fields", tone: "ok" },
    {
      t: "table",
      app: "airtable",
      title: "Purchase orders",
      cols: ["PO", "Vendor", "Amount", "Status"],
      rows: [
        ["PO-4415", "Lumen Co.", "$1,920.00", "Received"],
        ["PO-4416", "Brightline", "$640.00", "Open"],
        ["PO-4417", "Acme Supply", "$3,180.00", "Matched"],
        ["PO-4418", "Fieldworks", "$2,205.00", "Open"],
      ],
      hl: 2,
    },
    { t: "receipt", doc: "Bill B-1188", party: "Acme Supply", lines: [["Packaging · cartons", "$1,420.00"], ["Labels", "$360.00"], ["Pallet wrap", "$900.00"], ["Freight", "$500.00"]], total: "$3,180.00", badge: "Due in 30 days" },
    {
      t: "table",
      app: "sheets",
      title: "AP register",
      cols: ["Date", "Vendor", "Bill", "Amount"],
      rows: [
        ["Oct 20", "Lumen Co.", "B-1186", "$1,920.00"],
        ["Oct 21", "Brightline", "B-1187", "$640.00"],
        ["Oct 22", "Acme Supply", "B-1188", "$3,180.00"],
      ],
      hl: 2,
    },
  ],
  "incident-to-fix": [
    { t: "chart", issue: "TypeError: Cannot read properties of null (reading 'region')", where: "checkout-api · /v1/tax/quote", events: "412 events in 5 min", series: [2, 3, 2, 4, 3, 2, 3, 5, 4, 3, 18, 46, 71, 88, 92] },
    {
      t: "commits",
      repo: "northwind/checkout-api",
      items: [
        ["a91f3c2", "tax: read region from address object", "payments", true],
        ["7c10e88", "chore: bump dependencies", "platform"],
        ["e02b9d1", "copy: update checkout labels", "web"],
      ],
    },
    { t: "agent", task: "Summarize incident", input: "Sentry issue + 3 deploys in window", out: [["likely cause", "a91f3c2 · null region"], ["blast radius", "checkout tax quotes"], ["suggest", "revert or guard null"]], verdict: "Likely cause found · medium confidence", tone: "warn" },
    { t: "issue", key: "PAY-219", title: "Tax quote fails when address has no region", status: "Todo", priority: "Urgent", team: "Payments", labels: ["incident", "checkout"], body: "Spike began 3 minutes after a91f3c2. Null region on international addresses." },
    { t: "incident", title: "Checkout errors above threshold", service: "checkout-api", urgency: "High", oncall: "Payments on-call", steps: [["Triggered", "14:02"], ["Notified on-call", "14:02"], ["Acknowledged", "—"]] },
    { t: "chat", channel: "incidents", text: "Checkout tax quotes failing since 14:02. Likely a91f3c2. Issue PAY-219, on-call paged.", fields: [["Severity", "High"], ["Issue", "PAY-219"]] },
  ],
  "signed-to-kickoff": [
    { t: "esign", doc: "Northwind · Master Services Agreement", signers: [["Dana Ortiz · Northwind", "Signed"], ["Account lead", "Signed"]] },
    { t: "crm", kind: "Deal", name: "Northwind · Automation", sub: "Pipeline: New business", props: [["Owner", "AE · West"], ["Contract", "Annual"]], stage: ["Discovery", "Demo", "Proposal", "Closed won"], at: 3 },
    {
      t: "tasks",
      project: "Northwind · Onboarding",
      sections: [
        ["Week 1", [["Kickoff call", "Account lead", "Mon"], ["Access to systems", "Northwind IT", "Tue"], ["Map first process", "Automation lead", "Wed"]]],
        ["Week 2", [["Prototype on real data", "Engineering", "Fri"]]],
      ],
    },
    { t: "files", path: ["Shared drives", "Clients", "Northwind"], files: [["Onboarding", "folder"], ["Master Services Agreement.pdf", "pdf"], ["Process map", "doc"], ["Access checklist", "sheet"]] },
    { t: "email", folder: "Drafts", from: "Account lead", to: "dana@northwind…", subject: "Welcome to the team, Northwind", body: ["Hi Dana, welcome aboard.", "Your onboarding folder and kickoff invite are on the way. Here's what the first two weeks look like."] },
    { t: "calendar", day: "Mon 18", title: "Northwind · Kickoff", time: "11:00 – 11:45", who: ["Dana Ortiz", "Account lead", "+3"] },
  ],
  "nightly-reconciliation": [
    { t: "terminal", prompt: "recon=#", lines: ["SELECT count(*) FROM orders WHERE paid_at::date = current_date - 1;", " count ", "-------", "  1873", "(1 row)"] },
    { t: "payment", amount: "$148,920.40", customer: "3 payouts", method: "Bank account •••• 6789", risk: "—", events: ["Payout created", "Payout in transit", "Payout paid"] },
    {
      t: "table",
      app: "snowflake",
      title: "RECON.DAILY_MATCH",
      sql: "MERGE INTO recon.daily_match USING …",
      cols: ["STATUS", "ROWS"],
      rows: [
        ["MATCHED", "1,871"],
        ["UNMATCHED", "2"],
      ],
      hl: 1,
    },
    { t: "agent", task: "Explain exceptions", input: "2 unmatched rows · orders vs payouts", out: [["cause", "partial refunds"], ["timing", "refunds after cutoff"], ["action", "none · will clear tomorrow"]], verdict: "Explained · no money missing", tone: "ok" },
    { t: "chat", channel: "finance", text: "Nightly reconciliation: 1,871 of 1,873 matched. 2 partial refunds after cutoff; will clear tomorrow.", fields: [["Exceptions", "2"], ["Action", "None"]] },
  ],
};
