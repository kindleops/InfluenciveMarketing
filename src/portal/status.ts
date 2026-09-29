import type {
  ApprovalCategory,
  CampaignStatus,
  Channel,
  ContentStage,
  ContentType,
  CreativeKind,
  CreativeStatus,
  DeliverableCategory,
  OpportunityType,
  WorkState,
} from "./model";

/**
 * Tone is the only colour a status carries, and it always travels with a
 * label (and a glyph for the loud ones) — never colour alone.
 *   live      running right now (the only tone that pulses)
 *   positive  performing / improving / complete-and-good
 *   progress  being worked on
 *   attention needs the client
 *   blocked   cannot move
 *   done      finished
 *   quiet     not started, paused, archived
 */
export type Tone = "live" | "positive" | "progress" | "attention" | "blocked" | "done" | "quiet";

export const WORK_STATE: Record<WorkState, { label: string; tone: Tone }> = {
  active: { label: "Active", tone: "progress" },
  in_progress: { label: "In progress", tone: "progress" },
  needs_approval: { label: "Needs approval", tone: "attention" },
  performing: { label: "Performing", tone: "live" },
  improving: { label: "Improving", tone: "positive" },
  blocked: { label: "Blocked", tone: "blocked" },
  delivered: { label: "Delivered", tone: "done" },
  next: { label: "Next", tone: "quiet" },
};

export const CAMPAIGN_STATUS: Record<CampaignStatus, { label: string; tone: Tone }> = {
  draft: { label: "Draft", tone: "quiet" },
  preparing: { label: "Preparing", tone: "progress" },
  awaiting_approval: { label: "Awaiting approval", tone: "attention" },
  scheduled: { label: "Scheduled", tone: "progress" },
  live: { label: "Live", tone: "live" },
  optimizing: { label: "Optimizing", tone: "live" },
  paused: { label: "Paused", tone: "quiet" },
  complete: { label: "Complete", tone: "done" },
};

export const CAMPAIGN_ORDER: CampaignStatus[] = [
  "awaiting_approval",
  "live",
  "optimizing",
  "scheduled",
  "preparing",
  "draft",
  "paused",
  "complete",
];

export const CHANNEL: Record<Channel, string> = {
  meta: "Meta Ads",
  google: "Google Ads",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  email: "Email",
  organic_social: "Organic social",
  seo: "SEO",
  influencer: "Creators",
  launch: "Launch",
  web: "Website experiment",
};

export const CONTENT_STAGE: Record<ContentStage, { label: string; tone: Tone }> = {
  idea: { label: "Idea", tone: "quiet" },
  drafting: { label: "Drafting", tone: "progress" },
  design: { label: "Design", tone: "progress" },
  internal_review: { label: "Internal review", tone: "progress" },
  client_review: { label: "Your review", tone: "attention" },
  approved: { label: "Approved", tone: "positive" },
  scheduled: { label: "Scheduled", tone: "progress" },
  published: { label: "Published", tone: "done" },
  archived: { label: "Archived", tone: "quiet" },
};

export const CONTENT_STAGES: ContentStage[] = [
  "idea",
  "drafting",
  "design",
  "internal_review",
  "client_review",
  "approved",
  "scheduled",
  "published",
];

export const CONTENT_TYPE: Record<ContentType, string> = {
  social_post: "Social post",
  carousel: "Carousel",
  reel: "Reel",
  article: "Article",
  email: "Email",
  ad_creative: "Ad creative",
  landing_copy: "Landing page copy",
  campaign_concept: "Campaign concept",
};

export const CREATIVE_KIND: Record<CreativeKind, string> = {
  concept: "Concepts",
  brand: "Brand",
  campaign: "Campaign",
  photography: "Photography",
  video: "Video",
  web: "Web design",
  copy: "Copy",
  ad: "Ads",
  social: "Social",
};

export const CREATIVE_STATUS: Record<CreativeStatus, { label: string; tone: Tone }> = {
  in_production: { label: "In production", tone: "progress" },
  in_review: { label: "Your review", tone: "attention" },
  changes_requested: { label: "Changes requested", tone: "progress" },
  approved: { label: "Approved", tone: "positive" },
  final: { label: "Final", tone: "done" },
};

export const APPROVAL_CATEGORY: Record<ApprovalCategory, string> = {
  creative: "Creative",
  content: "Content",
  campaign: "Campaign",
  website: "Website",
  budget: "Budget",
  strategy: "Strategy",
  deliverable: "Deliverable",
};

export const DELIVERABLE_CATEGORY: Record<DeliverableCategory, string> = {
  brand: "Brand",
  strategy: "Strategy",
  creative: "Creative",
  website: "Website",
  reports: "Reports",
  campaigns: "Campaigns",
  research: "Research",
  media: "Media",
  documents: "Documents",
};

export const OPPORTUNITY_TYPE: Record<OpportunityType, string> = {
  conversion: "Conversion",
  audience: "Audience",
  search: "Search",
  campaign: "Campaign",
  retargeting: "Retargeting",
  content: "Content gap",
  cro: "CRO",
  email: "Email automation",
};

export const OPPORTUNITY_STATUS = {
  proposed: { label: "Proposed", tone: "attention" },
  accepted: { label: "Accepted", tone: "progress" },
  in_progress: { label: "In progress", tone: "progress" },
  shipped: { label: "Shipped", tone: "done" },
  declined: { label: "Declined", tone: "quiet" },
} as const satisfies Record<string, { label: string; tone: Tone }>;

export const EXPERIMENT_STATUS = {
  planned: { label: "Planned", tone: "quiet" },
  running: { label: "Running", tone: "live" },
  concluded: { label: "Concluded", tone: "done" },
} as const satisfies Record<string, { label: string; tone: Tone }>;
