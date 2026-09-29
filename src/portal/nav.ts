import type { IconName } from "@/components/portal/ui/Icon";
import type { ObjectRef } from "./model";

export interface NavItem {
  href: string;
  label: string;
  icon: IconName;
  badge?: "approvals" | "messages";
}

export const COMMAND: NavItem = { href: "/portal", label: "Command", icon: "command" };

export const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: "Operate",
    items: [
      { href: "/portal/campaigns", label: "Campaigns", icon: "campaigns" },
      { href: "/portal/content", label: "Content", icon: "content" },
      { href: "/portal/creative", label: "Creative", icon: "creative" },
    ],
  },
  {
    label: "Understand",
    items: [
      { href: "/portal/analytics", label: "Analytics", icon: "analytics" },
      { href: "/portal/growth", label: "Growth", icon: "growth" },
    ],
  },
  {
    label: "Collaborate",
    items: [
      { href: "/portal/approvals", label: "Approvals", icon: "approvals", badge: "approvals" },
      { href: "/portal/messages", label: "Messages", icon: "messages", badge: "messages" },
      { href: "/portal/deliverables", label: "Deliverables", icon: "deliverables" },
    ],
  },
  {
    label: "Account",
    items: [{ href: "/portal/billing", label: "Billing", icon: "billing" }],
  },
];

export const SECONDARY: NavItem[] = [
  { href: "/portal/integrations", label: "Integrations", icon: "integrations" },
  { href: "/portal/team", label: "Team", icon: "team" },
  { href: "/portal/help", label: "Help", icon: "help" },
  { href: "/portal/settings", label: "Settings", icon: "settings" },
];

export const ALL_PAGES: NavItem[] = [
  COMMAND,
  ...NAV_GROUPS.flatMap((g) => g.items),
  ...SECONDARY,
  { href: "/portal/account", label: "Account", icon: "account" },
];

/** The section a path belongs to (for the active lens and the header). */
export function sectionFor(pathname: string): NavItem {
  if (pathname === "/portal") return COMMAND;
  const match = ALL_PAGES.filter((p) => p.href !== "/portal" && (pathname === p.href || pathname.startsWith(p.href + "/")));
  return match.sort((a, b) => b.href.length - a.href.length)[0] ?? COMMAND;
}

export function hrefFor(ref: Pick<ObjectRef, "kind" | "id">): string {
  switch (ref.kind) {
    case "campaign":
      return `/portal/campaigns/${ref.id}`;
    case "content":
      return `/portal/content?item=${ref.id}`;
    case "creative":
      return `/portal/creative?asset=${ref.id}`;
    case "deliverable":
      return `/portal/deliverables?id=${ref.id}`;
    case "approval":
      return `/portal/approvals?id=${ref.id}`;
    case "opportunity":
    case "experiment":
      return `/portal/growth#${ref.id}`;
    case "invoice":
      return "/portal/billing";
    default:
      return "/portal";
  }
}

export const REF_ICON: Record<ObjectRef["kind"], IconName> = {
  campaign: "campaigns",
  content: "content",
  creative: "creative",
  deliverable: "deliverables",
  approval: "approvals",
  opportunity: "growth",
  experiment: "target",
  invoice: "billing",
  workstream: "layers",
};
