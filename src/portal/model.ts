/**
 * Client portal — canonical entities.
 *
 * The portal renders only what a PortalSource returns. Nothing in the UI
 * invents a number, a person or a piece of work: when a source has nothing
 * for a slice, the surface shows an honest empty state instead.
 */

export type ISODate = string;

/* ---- People & access ------------------------------------------------- */

export type ClientRole = "owner" | "admin" | "member" | "viewer";
export type Capability = "approve" | "billing" | "invite" | "download" | "comment" | "analytics";

export interface TeamMember {
  id: string;
  name: string;
  /** Their role on the account, e.g. "Growth Strategist". */
  title: string;
  /** What they own on this account, in a phrase. */
  focus?: string;
  email?: string;
  lead?: boolean;
}

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  title?: string;
  role: ClientRole;
}

export type Accent = "blue" | "gold" | "violet" | "teal";

export interface Client {
  id: string;
  name: string;
  /** Two-letter monogram used when no logo is supplied. */
  monogram: string;
  logoUrl?: string;
  industry?: string;
  website?: string;
  accent?: Accent;
  /** IANA zone every date on the account is set in. */
  timezone: string;
  currency: string;
  engagementStart: ISODate;
  /** Which outcome metrics matter to this business, in order. */
  metrics: MetricKey[];
  /** The business's own words for a metric, e.g. conversions → "Orders". */
  labels?: Partial<Record<MetricKey, string>>;
}

export interface Session {
  client: Client;
  user: ClientUser;
  /** Accounts this user can switch between. */
  clients: { id: string; name: string; monogram: string }[];
  /** True when the portal is rendering developer fixtures. */
  demo: boolean;
}

/* ---- References between objects -------------------------------------- */

export type ObjectKind =
  | "campaign"
  | "content"
  | "creative"
  | "deliverable"
  | "approval"
  | "opportunity"
  | "experiment"
  | "invoice"
  | "workstream";

export interface ObjectRef {
  kind: ObjectKind;
  id: string;
  label: string;
}

export interface Comment {
  id: string;
  authorId: string;
  at: ISODate;
  body: string;
}

export interface Revision {
  version: string;
  at: ISODate;
  byId: string;
  note: string;
}

/* ---- Work ------------------------------------------------------------ */

export type WorkState =
  | "active"
  | "in_progress"
  | "needs_approval"
  | "performing"
  | "improving"
  | "blocked"
  | "delivered"
  | "next";

/** Progress is only expressed in units the work actually has. */
export type WorkProgress =
  | { type: "steps"; done: number; total: number; unit: string }
  | { type: "live"; since: ISODate }
  | { type: "stage"; label: string };

export interface Workstream {
  id: string;
  name: string;
  state: WorkState;
  progress: WorkProgress;
  ownerId: string;
  next?: { label: string; at?: ISODate };
  ref?: ObjectRef;
}

export interface ClientTask {
  id: string;
  title: string;
  reason: string;
  dueAt: ISODate;
  ownerId: string;
  action: string;
  ref?: ObjectRef;
}

/* ---- Campaigns ------------------------------------------------------- */

export type CampaignStatus =
  | "draft"
  | "preparing"
  | "awaiting_approval"
  | "scheduled"
  | "live"
  | "optimizing"
  | "paused"
  | "complete";

export type Channel =
  | "meta"
  | "google"
  | "linkedin"
  | "tiktok"
  | "email"
  | "organic_social"
  | "seo"
  | "influencer"
  | "launch"
  | "web";

export interface KpiReading {
  key: MetricKey;
  value: number;
  previous?: number;
  target?: number;
}

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  /** What this campaign is trying to accomplish, in plain language. */
  brief: string;
  channel: Channel;
  status: CampaignStatus;
  ownerId: string;
  start: ISODate;
  end?: ISODate;
  budget?: { total: number; spent: number; period: "flight" | "monthly" };
  primary?: KpiReading;
  secondary: KpiReading[];
  /** Daily readings of the primary KPI (and the prior period, aligned). */
  series?: { date: ISODate; value: number; previous?: number }[];
  audience?: { summary: string; segments: { name: string; note: string; share?: number }[] };
  timeline: { at: ISODate; title: string; detail?: string; byId: string }[];
  creativeIds: string[];
  experimentIds: string[];
  interpretation?: string;
}

/* ---- Content --------------------------------------------------------- */

export type ContentStage =
  | "idea"
  | "drafting"
  | "design"
  | "internal_review"
  | "client_review"
  | "approved"
  | "scheduled"
  | "published"
  | "archived";

export type ContentType =
  | "social_post"
  | "carousel"
  | "reel"
  | "article"
  | "email"
  | "ad_creative"
  | "landing_copy"
  | "campaign_concept";

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  stage: ContentStage;
  platform: string;
  publishAt?: ISODate;
  ownerId: string;
  campaignId?: string;
  copy: { headline?: string; body: string; cta?: string };
  preview: Preview;
  revisions: Revision[];
  comments: Comment[];
  approvalId?: string;
}

/* ---- Creative -------------------------------------------------------- */

export type CreativeKind = "concept" | "brand" | "campaign" | "photography" | "video" | "web" | "copy" | "ad" | "social";
export type CreativeStatus = "in_production" | "in_review" | "changes_requested" | "approved" | "final";

/** How a preview is composed. Plates are the studio's own photography. */
export interface Preview {
  plate?: "horizon" | "growth" | "operations" | "product" | "relaunch";
  aspect: "4/5" | "1/1" | "16/9" | "9/16" | "3/2" | "3/4";
  layout: "ad" | "frame" | "page" | "doc" | "type" | "film" | "email";
  tone: Accent;
  headline?: string;
  sub?: string;
}

export interface CreativeVersion extends Revision {
  preview: Preview;
}

export interface CreativeAsset {
  id: string;
  title: string;
  kind: CreativeKind;
  format: string;
  status: CreativeStatus;
  ownerId: string;
  campaignId?: string;
  versions: CreativeVersion[];
  comments: Comment[];
  approvalId?: string;
  fileUrl?: string;
}

/* ---- Approvals ------------------------------------------------------- */

export type ApprovalCategory = "creative" | "content" | "campaign" | "website" | "budget" | "strategy" | "deliverable";
export type ApprovalState = "pending" | "approved" | "changes_requested";

export interface AuditEntry {
  at: ISODate;
  actorId: string;
  action: "requested" | "revised" | "commented" | "approved" | "changes_requested";
  revision: string;
  note?: string;
}

export interface Approval {
  id: string;
  title: string;
  category: ApprovalCategory;
  state: ApprovalState;
  priority: "high" | "normal";
  /** High-impact decisions (budget, launches) ask for an explicit confirmation. */
  impact: "standard" | "high";
  /** What am I approving? */
  summary: string;
  /** Why does it matter? */
  why: string;
  /** What changed since the last revision? */
  changes: string[];
  preparedById: string;
  requestedAt: ISODate;
  dueAt: ISODate;
  /** What happens after approval? */
  after: string;
  revision: string;
  subject?: ObjectRef;
  preview?: Preview;
  /** Optional figures shown with the decision (e.g. budget before/after). */
  figures?: { label: string; value: string; note?: string }[];
  audit: AuditEntry[];
}

/* ---- Messages -------------------------------------------------------- */

export interface Attachment {
  name: string;
  size: number;
  kind: "pdf" | "image" | "video" | "doc" | "sheet" | "link";
}

export interface Message {
  id: string;
  authorId: string;
  at: ISODate;
  body: string;
  attachments?: Attachment[];
}

export interface MessageThread {
  id: string;
  subject: string;
  ref?: ObjectRef;
  status: "open" | "resolved";
  messages: Message[];
  /** Messages the current user hasn't read. */
  unread: number;
}

/* ---- Deliverables ---------------------------------------------------- */

export type DeliverableCategory =
  | "brand"
  | "strategy"
  | "creative"
  | "website"
  | "reports"
  | "campaigns"
  | "research"
  | "media"
  | "documents";

export interface Deliverable {
  id: string;
  title: string;
  category: DeliverableCategory;
  project: string;
  ownerId: string;
  status: "final" | "in_review" | "draft";
  summary: string;
  format: string;
  preview: Preview;
  versions: Revision[];
  deliveredAt: ISODate;
  fileUrl?: string;
  commentCount: number;
}

/* ---- Metrics & analytics --------------------------------------------- */

export type MetricKey =
  | "revenue"
  | "conversions"
  | "qualified_leads"
  | "booked_calls"
  | "sessions"
  | "spend"
  | "cac"
  | "cpl"
  | "roas"
  | "conversion_rate"
  | "aov"
  | "email_subscribers";

export type RangeKey = "7d" | "30d" | "90d" | "ytd" | "custom";

export interface DateRange {
  key: RangeKey;
  from: ISODate;
  to: ISODate;
  label: string;
  /** The equal-length period immediately before. */
  compareFrom: ISODate;
  compareTo: ISODate;
}

export interface MetricSummary {
  key: MetricKey;
  value: number;
  previous: number;
  target?: number;
  /** Aligned current / comparison readings for the trend chart. */
  series: { date: ISODate; value: number; previous: number }[];
}

export interface ChannelRow {
  id: string;
  label: string;
  sessions: number;
  conversions: number;
  revenue: number;
  spend: number;
  leads: number;
  previousConversions: number;
}

export interface AnalyticsReport {
  range: DateRange;
  granularity: "day" | "week";
  outcomes: MetricSummary[];
  channels: ChannelRow[];
  campaigns: { id: string; name: string; channel: Channel; conversions: number; revenue: number; spend: number; leads: number }[];
  creatives: { id: string; title: string; campaign: string; impressions: number; ctr: number; conversions: number; spend: number }[];
  attribution: {
    model: string;
    note: string;
    rows: { channel: string; firstTouch: number; lastTouch: number }[];
  } | null;
  journey: { step: string; count: number }[] | null;
  devices: { label: string; sessions: number; conversionRate: number }[] | null;
  regions: { label: string; conversions: number; share: number }[] | null;
}

/* ---- Growth ---------------------------------------------------------- */

export type OpportunityType =
  | "conversion"
  | "audience"
  | "search"
  | "campaign"
  | "retargeting"
  | "content"
  | "cro"
  | "email";

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  observation: string;
  evidence: { label: string; value: string };
  expectedImpact: string;
  confidence: "high" | "medium" | "exploratory";
  action: string;
  ownerId: string;
  status: "proposed" | "accepted" | "in_progress" | "shipped" | "declined";
  horizon: "now" | "next" | "later";
}

export interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  metric: string;
  expectedImpact: string;
  status: "planned" | "running" | "concluded";
  ownerId: string;
  startedAt?: ISODate;
  endsAt?: ISODate;
  campaignId?: string;
  result?: { summary: string; outcome: "win" | "loss" | "inconclusive"; lift?: string };
}

export interface Insight {
  id: string;
  title: string;
  observation: string;
  reasoning: string;
  metric: { label: string; value: string };
  action: string;
  ownerId: string;
  status: "new" | "accepted" | "in_progress" | "done" | "dismissed";
  ref?: ObjectRef;
}

/* ---- Timeline -------------------------------------------------------- */

export type ActivityKind =
  | "published"
  | "approved"
  | "changes"
  | "launched"
  | "budget"
  | "improved"
  | "connected"
  | "delivered"
  | "scheduled"
  | "message"
  | "experiment";

export interface ActivityEvent {
  id: string;
  at: ISODate;
  kind: ActivityKind;
  title: string;
  detail?: string;
  actorId: string;
  ref?: ObjectRef;
}

export interface Notification {
  id: string;
  at: ISODate;
  kind: "approval" | "launch" | "deliverable" | "reply" | "report";
  title: string;
  body?: string;
  href: string;
  read: boolean;
}

/* ---- Account --------------------------------------------------------- */

export interface Engagement {
  name: string;
  plan: string;
  startedAt: ISODate;
  term: string;
  retainer: number;
  nextBillingDate: ISODate;
  scope: string[];
  leadId: string;
}

export interface Invoice {
  id: string;
  number: string;
  issuedAt: ISODate;
  dueAt: ISODate;
  amount: number;
  status: "paid" | "due" | "overdue" | "processing";
  lines: { label: string; amount: number }[];
}

export interface Billing {
  engagement: Engagement;
  paymentMethod?: { brand: string; last4: string };
  billingContact?: string;
  invoices: Invoice[];
  additionalWork: { id: string; title: string; approvedAt: ISODate; amount: number; status: "approved" | "in_progress" | "invoiced" }[];
  mediaManaged?: { label: string; spent: number; planned: number };
}

export interface Integration {
  id: string;
  name: string;
  category: "analytics" | "advertising" | "commerce" | "crm" | "email" | "website";
  status: "connected" | "attention" | "not_connected";
  account?: string;
  lastSync?: ISODate;
  note?: string;
}

export interface OnboardingStep {
  id: string;
  label: string;
  detail: string;
  status: "done" | "in_progress" | "todo";
  owner: "client" | "studio";
}

export interface NotificationPrefs {
  approvals: boolean;
  launches: boolean;
  deliverables: boolean;
  replies: boolean;
  reports: boolean;
  digest: "off" | "daily" | "weekly";
}
