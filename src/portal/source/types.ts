import type {
  ActivityEvent,
  AnalyticsReport,
  Approval,
  Billing,
  Campaign,
  ClientTask,
  ClientUser,
  ContentItem,
  CreativeAsset,
  DateRange,
  Deliverable,
  Experiment,
  Insight,
  Integration,
  MessageThread,
  Notification,
  NotificationPrefs,
  OnboardingStep,
  Opportunity,
  Session,
  TeamMember,
  Workstream,
} from "../model";

/** Anyone who can author something on the account. */
export interface Person {
  id: string;
  name: string;
  title: string;
  side: "studio" | "client";
}

export type CommentTarget = { kind: "content" | "creative" | "approval"; id: string };

/**
 * The contract between the portal UI and wherever client data lives.
 * A production implementation talks to the operating backend; the fixture
 * implementation (developer-only) keeps an in-memory world per process.
 * Every method is scoped to the session's client.
 */
export interface PortalSource {
  readonly kind: "fixture" | "api";

  team(): Promise<TeamMember[]>;
  clientUsers(): Promise<ClientUser[]>;
  people(): Promise<Record<string, Person>>;

  workstreams(): Promise<Workstream[]>;
  tasks(): Promise<ClientTask[]>;
  campaigns(): Promise<Campaign[]>;
  content(): Promise<ContentItem[]>;
  creative(): Promise<CreativeAsset[]>;
  approvals(): Promise<Approval[]>;
  threads(): Promise<MessageThread[]>;
  deliverables(): Promise<Deliverable[]>;
  /** null when no analytics source is connected yet. */
  analytics(range: DateRange): Promise<AnalyticsReport | null>;
  opportunities(): Promise<Opportunity[]>;
  experiments(): Promise<Experiment[]>;
  insights(): Promise<Insight[]>;
  activity(): Promise<ActivityEvent[]>;
  notifications(): Promise<Notification[]>;
  billing(): Promise<Billing | null>;
  integrations(): Promise<Integration[]>;
  onboarding(): Promise<OnboardingStep[]>;
  prefs(): Promise<NotificationPrefs>;

  decide(approvalId: string, decision: "approved" | "changes_requested", note?: string): Promise<void>;
  comment(target: CommentTarget, body: string): Promise<void>;
  reply(threadId: string, body: string): Promise<void>;
  startThread(subject: string, body: string, ref?: { kind: string; id: string; label: string }): Promise<string>;
  setThreadStatus(threadId: string, status: "open" | "resolved"): Promise<void>;
  readThread(threadId: string): Promise<void>;
  markNotificationsRead(): Promise<void>;
  setInsightStatus(id: string, status: Insight["status"]): Promise<void>;
  setPrefs(prefs: NotificationPrefs): Promise<void>;
}

export interface Portal {
  session: Session;
  source: PortalSource;
}
