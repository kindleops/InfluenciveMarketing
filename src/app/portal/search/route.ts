import { getPortal } from "@/portal/source";
import { ALL_PAGES, hrefFor } from "@/portal/nav";
import { METRICS, metricLabel } from "@/portal/format";
import { CHANNEL, CONTENT_TYPE, CREATIVE_KIND, DELIVERABLE_CATEGORY, APPROVAL_CATEGORY } from "@/portal/status";
import type { IconName } from "@/components/portal/ui/Icon";

export interface SearchItem {
  group: string;
  label: string;
  hint?: string;
  href: string;
  icon: IconName;
  keywords?: string;
}

/** The command palette's index for the signed-in account. */
export async function GET() {
  const portal = await getPortal();
  if (!portal) return Response.json({ items: [] }, { status: 401 });
  const { source, session } = portal;
  const [approvals, campaigns, content, creative, deliverables, threads] = await Promise.all([
    source.approvals(),
    source.campaigns(),
    source.content(),
    source.creative(),
    source.deliverables(),
    source.threads(),
  ]);
  const pending = approvals.filter((a) => a.state === "pending");
  const report = deliverables.filter((d) => d.category === "reports").sort((a, b) => b.deliveredAt.localeCompare(a.deliveredAt))[0];

  const items: SearchItem[] = [
    ...(pending.length
      ? [{ group: "Quick actions", label: "Approve pending work", hint: `${pending.length} waiting`, href: `/portal/approvals?id=${pending[0].id}`, icon: "approvals" as const }]
      : []),
    ...(report ? [{ group: "Quick actions", label: "Open latest report", hint: report.title, href: `/portal/deliverables?id=${report.id}`, icon: "analytics" as const }] : []),
    { group: "Quick actions", label: "Message the team", href: "/portal/messages?compose=1", icon: "messages" },
    { group: "Quick actions", label: "Download a deliverable", href: "/portal/deliverables", icon: "download" },
    ...ALL_PAGES.map((p) => ({ group: "Pages", label: p.label, href: p.href, icon: p.icon })),
    ...pending.map((a) => ({ group: "Approvals", label: a.title, hint: APPROVAL_CATEGORY[a.category], href: hrefFor({ kind: "approval", id: a.id }), icon: "approvals" as const })),
    ...campaigns.map((c) => ({ group: "Campaigns", label: c.name, hint: CHANNEL[c.channel], href: hrefFor({ kind: "campaign", id: c.id }), icon: "campaigns" as const, keywords: c.objective })),
    ...deliverables.map((d) => ({ group: "Deliverables", label: d.title, hint: DELIVERABLE_CATEGORY[d.category], href: hrefFor({ kind: "deliverable", id: d.id }), icon: "deliverables" as const, keywords: d.project })),
    ...threads.map((t) => ({ group: "Conversations", label: t.subject, hint: t.ref?.label, href: `/portal/messages?thread=${t.id}`, icon: "messages" as const })),
    ...content.map((c) => ({ group: "Content", label: c.title, hint: CONTENT_TYPE[c.type], href: hrefFor({ kind: "content", id: c.id }), icon: "content" as const, keywords: c.platform })),
    ...creative.map((c) => ({ group: "Creative", label: c.title, hint: CREATIVE_KIND[c.kind], href: hrefFor({ kind: "creative", id: c.id }), icon: "creative" as const, keywords: c.format })),
    ...session.client.metrics.map((k) => ({
      group: "Metrics",
      label: metricLabel(k, session.client.labels),
      hint: METRICS[k].short,
      href: `/portal/analytics?metric=${k}`,
      icon: "analytics" as const,
    })),
    { group: "Settings", label: "Notification preferences", href: "/portal/settings", icon: "settings" },
    { group: "Settings", label: "Connected accounts", href: "/portal/integrations", icon: "integrations" },
  ];
  return Response.json({ items }, { headers: { "Cache-Control": "private, no-store" } });
}
