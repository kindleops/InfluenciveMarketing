import { requirePortal, engagementMeta } from "@/portal/server";
import { capabilities, ROLE_LABEL } from "@/portal/access";
import { fmtDate } from "@/portal/format";
import { Chip, PageHead, Panel, PanelHead } from "@/components/portal/ui";
import s from "@/components/portal/secondary/secondary.module.css";

export const metadata = { title: "Account" };

const CAP_LABEL = {
  approve: "Approve work",
  billing: "See billing",
  invite: "Invite teammates",
  download: "Download files",
  comment: "Comment and message",
  analytics: "View analytics",
} as const;

export default async function AccountPage() {
  const { session, source } = await requirePortal();
  const { client, user } = session;
  const team = await source.team();
  const lead = team.find((t) => t.lead);
  const now = Date.now();
  return (
    <>
      <PageHead title="Account" />
      <div className={s.two}>
        <Panel as="section" aria-labelledby="company-title">
          <PanelHead title="Company" id="company-title" />
          <dl className={s.facts}>
            <dt>Name</dt>
            <dd>{client.name}</dd>
            {client.industry && (
              <>
                <dt>Industry</dt>
                <dd>{client.industry}</dd>
              </>
            )}
            {client.website && (
              <>
                <dt>Website</dt>
                <dd>{client.website}</dd>
              </>
            )}
            <dt>Time zone</dt>
            <dd>{client.timezone.replace("_", " ")}</dd>
            <dt>Currency</dt>
            <dd>{client.currency}</dd>
          </dl>
        </Panel>
        <Panel as="section" aria-labelledby="eng-title">
          <PanelHead title="Engagement" id="eng-title" />
          <dl className={s.facts}>
            <dt>Started</dt>
            <dd>{fmtDate(client.engagementStart, client.timezone, "day")}</dd>
            <dt>Stage</dt>
            <dd>{engagementMeta(client.engagementStart, now)}</dd>
            {lead && (
              <>
                <dt>Lead</dt>
                <dd>
                  {lead.name} · {lead.title}
                </dd>
              </>
            )}
          </dl>
        </Panel>
        <Panel as="section" aria-labelledby="you-title">
          <PanelHead title="You" id="you-title" />
          <dl className={s.facts}>
            <dt>Name</dt>
            <dd>{user.name}</dd>
            <dt>Email</dt>
            <dd>{user.email}</dd>
            {user.title && (
              <>
                <dt>Title</dt>
                <dd>{user.title}</dd>
              </>
            )}
            <dt>Role</dt>
            <dd>{ROLE_LABEL[user.role]}</dd>
          </dl>
        </Panel>
        <Panel as="section" aria-labelledby="access-title">
          <PanelHead title="What your role can do" id="access-title" />
          <div className={s.pad} style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {capabilities(user.role).map((c) => (
              <Chip key={c} icon="check">
                {CAP_LABEL[c]}
              </Chip>
            ))}
          </div>
          <p className={s.pad} style={{ fontSize: "var(--p-fs-meta)", color: "var(--text-muted)" }}>
            Roles are managed by the owners of this account.
          </p>
        </Panel>
      </div>
    </>
  );
}
