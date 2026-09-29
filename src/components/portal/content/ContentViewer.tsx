import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import type { CSSProperties } from "react";
import type { Approval, ContentItem } from "@/portal/model";
import type { Person } from "@/portal/source";
import { can, ROLE_LABEL } from "@/portal/access";
import type { ClientRole } from "@/portal/model";
import { due, fmtDate } from "@/portal/format";
import { hrefFor } from "@/portal/nav";
import { CONTENT_STAGE, CONTENT_TYPE } from "@/portal/status";
import { Decision } from "../approvals/Decision";
import { CommentBox } from "../CommentBox";
import { Comments } from "../Comments";
import { Preview } from "../Preview";
import { FullscreenButton } from "../StageTools";
import { Chip, Person as PersonChip, Status } from "../ui";
import v from "../viewer.module.css";

/** The actual content object: preview, copy, where it runs, its history, and the decision in context. */
export function ContentViewer({
  item,
  approval,
  batchSize,
  campaignName,
  people,
  role,
  brandName,
  now,
  tz,
}: {
  item: ContentItem;
  approval?: Approval;
  batchSize: number;
  campaignName?: string;
  people: Record<string, Person>;
  role: ClientRole;
  brandName: string;
  now: number;
  tz: string;
}) {
  const st = CONTENT_STAGE[item.stage];
  const owner = people[item.ownerId];
  const pw = item.preview.aspect === "16/9" || item.preview.aspect === "3/2" ? "760px" : item.preview.aspect === "9/16" ? "340px" : "460px";
  return (
    <div className={v.viewer}>
      <div className={v.stage} id="content-stage">
        <div className={v.tools}>
          <Status tone={st.tone} label={st.label} />
          <span style={{ fontSize: "var(--p-fs-meta)", color: "var(--text-muted)" }}>
            {CONTENT_TYPE[item.type]} · {item.platform}
          </span>
          <FullscreenButton targetId="content-stage" />
        </div>
        <div className={v.canvas}>
          <div className={v.canvasInner} style={{ "--pw": pw } as CSSProperties}>
            <Preview preview={item.preview} brand={brandName} sizes="(min-width: 900px) 55vw, 90vw" priority />
          </div>
        </div>
      </div>
      <div className={v.rail}>
        <div className={v.railHead}>
          <p className={v.railKicker}>
            <span>{CONTENT_TYPE[item.type]}</span>
            <span>{item.revisions.at(-1)?.version}</span>
          </p>
          <h2 className={v.railTitle} id="viewer-title">
            {item.title}
          </h2>
          <dl className={v.facts}>
            <dt>Publishes</dt>
            <dd>{item.publishAt ? fmtDate(item.publishAt, tz, "dayTime") : "Not scheduled yet"}</dd>
            <dt>Channel</dt>
            <dd>{item.platform}</dd>
            {campaignName && item.campaignId && (
              <>
                <dt>Campaign</dt>
                <dd>
                  <Link href={hrefFor({ kind: "campaign", id: item.campaignId })} style={{ textDecoration: "underline", textDecorationColor: "var(--p-line-strong)", textUnderlineOffset: 3 }}>
                    {campaignName}
                  </Link>
                </dd>
              </>
            )}
            <dt>Owner</dt>
            <dd>{owner ? `${owner.name} · ${owner.title}` : "—"}</dd>
          </dl>
        </div>

        {approval && (
          <div className={v.section}>
            <div className={v.context}>
              <p className={v.contextHead}>
                <strong>{approval.state === "pending" ? "Waiting on your approval" : "Approval"}</strong>
                <span>
                  Part of “{approval.title}”{batchSize > 1 ? ` · ${batchSize} pieces decided together` : ""}
                  {approval.state === "pending" ? ` · ${due(approval.dueAt, now, tz).label}` : ""}
                </span>
              </p>
              <Decision
                id={approval.id}
                state={approval.state}
                impact={approval.impact}
                canApprove={can(role, "approve")}
                roleLabel={ROLE_LABEL[role]}
                outcome={approval.state !== "pending" ? `Revision ${approval.revision}` : undefined}
                compact
              />
              <Link href={hrefFor({ kind: "approval", id: approval.id })} style={{ fontSize: "var(--p-fs-label)", color: "var(--text-muted)" }}>
                See the full approval and its history →
              </Link>
            </div>
          </div>
        )}

        <div className={v.section}>
          <h3 className={v.sectionTitle}>Copy</h3>
          <div className={v.copy}>
            {item.copy.headline && <p className={v.copyHead}>{item.copy.headline}</p>}
            <p className={v.copyBody}>{item.copy.body}</p>
            {item.copy.cta && <span className={v.copyCta}>Button: {item.copy.cta}</span>}
          </div>
        </div>

        <div className={v.section}>
          <h3 className={v.sectionTitle}>Revisions</h3>
          <ol className={v.revisions} role="list">
            {[...item.revisions].reverse().map((r) => (
              <li key={r.version} className={v.rev}>
                <b>{r.version}</b>
                <span>
                  {r.note} <span style={{ color: "var(--text-muted)" }}>— {people[r.byId]?.name}</span>
                </span>
                <time dateTime={r.at}>{fmtDate(r.at, tz, "dayShort")}</time>
              </li>
            ))}
          </ol>
        </div>

        <div className={v.section}>
          <h3 className={v.sectionTitle}>Comments</h3>
          <Comments comments={item.comments} people={people} now={now} tz={tz} />
          <CommentBox kind="content" id={item.id} disabled={can(role, "comment") ? undefined : "Your role can view content but not comment."} />
        </div>
        {owner && (
          <div className={v.section}>
            <PersonChip person={owner} size={30} sub={`${owner.title} · owns this piece`} />
            {item.campaignId && campaignName && <Chip href={hrefFor({ kind: "campaign", id: item.campaignId })} icon="campaigns">{campaignName}</Chip>}
          </div>
        )}
      </div>
    </div>
  );
}
