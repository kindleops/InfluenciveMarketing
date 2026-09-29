import type {
  ActivityEvent,
  Approval,
  Billing,
  Campaign,
  Client,
  ClientTask,
  ClientUser,
  ContentItem,
  CreativeAsset,
  Deliverable,
  Experiment,
  Insight,
  Integration,
  MessageThread,
  MetricKey,
  Notification,
  NotificationPrefs,
  OnboardingStep,
  Opportunity,
  Workstream,
} from "../../model";
import type { ChannelSpec, Day } from "./metrics";

/** Everything the fixture source knows about one client. */
export interface World {
  client: Client;
  users: ClientUser[];
  sessionUserId: string;
  /** null = no analytics connected yet. */
  specs: ChannelSpec[] | null;
  days: Day[];
  paidChannels: string[];
  campaignChannel: Record<string, string>;
  targets: Partial<Record<MetricKey, number>>;
  workstreams: Workstream[];
  tasks: ClientTask[];
  campaigns: Campaign[];
  content: ContentItem[];
  creative: CreativeAsset[];
  approvals: Approval[];
  threads: MessageThread[];
  deliverables: Deliverable[];
  opportunities: Opportunity[];
  experiments: Experiment[];
  insights: Insight[];
  activity: ActivityEvent[];
  notifications: Notification[];
  billing: Billing | null;
  integrations: Integration[];
  onboarding: OnboardingStep[];
  prefs: NotificationPrefs;
}
