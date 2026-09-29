import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import type { CSSProperties } from "react";
import type { Approval, ClientRole, CreativeAsset } from "@/portal/model";
import type { Person } from "@/portal/source";
import { can, ROLE_LABEL } from "@/portal/access";
import { due, fmtDate } from "@/portal/format";
import { hrefFor } from "@/portal/nav";
import { CREATIVE_KIND, CREATIVE_STATUS } from "@/portal/status";
import { Decision } from "../approvals/Decision";
import { CommentBox } from "../CommentBox";
import { Comments } from "../Comments";
import { Preview } from "../Preview";
import { DownloadButton, FullscreenButton } from "../StageTools";
import { Chip, Status } from "../ui";
import { Segmented } from "../ui/Segmented";
import v from "../viewer.module.css";

/** A private screening room for one piece of creative. */
export function CreativeViewer({
  asset,
  version,
  compare,
  href,
  approval,
  campaignName,
  people,
  role,
  brandName,
  now,
  tz,
}: {
  asset: CreativeAsset;
  version?: string;
  compare: boolean;
  href: (o: Record<string, string | undefined>) => string;
  approval?: Approval;
  campaignName?: string;
  people: Record<string, Person>;
  role: ClientRole;
  brandName: string;
  now: number;
  tz: string;
}) {
  const versions = asset.versions;
  const current = versions.find((x) => x.version === version) ?? versions[versions.length - 1];
  const idx = versions.indexOf(current);
  const before = idx > 0 ? versions[idx - 1] : undefined;
  const st = CREATIVE_STATUS[asset.status];
  const wide = current.preview.aspect === "16/9" || current.preview.aspect === "3/2";
  const pw = compare && before ? "100%" : wide ? "820px" : current.preview.aspect === "9/16" ? "360px" : "520px";
  const latest = versions[versions.length - 1];

  return (
    <div className={v.viewer}>
      <div className={v.stage} id="creative-stage">
        <div className={v.tools}>
          {versions.length > 1 && (
            <Segmented
              size="sm"
              label="Version"
              active={compare ? "compare" : current.version}
              items={[
                ...versions.map((x) => ({ key: x.version, label: x.version, href: href({ v: x.version === latest.version ? undefined : x.version, compare: undefined }) })),
                ...(versions.length > 1 ? [{ key: "compare", label: "Compare", href: href({ v: version, compare: "1" }) }] : []),
              ]}
            />
          )}
          <FullscreenButton targetId="creative-stage" />
          <DownloadButton href={asset.fileUrl} name={asset.title} allowed={can(role, "download")} />
        </div>
        <div className={v.canvas}>
          {compare && before ? (
            <div className={v.compare}>
              {[before, current].map((x) => (
                <div key={x.version} className={v.compareSide}>
                  <p className={v.compareLabel}>
                    <b>{x.version}</b> · {fmtDate(x.at, tz, "dayShort")}
                  </p>
                  <div style={{ width: x.preview.aspect === "9/16" ? "60%" : "100%" }}>
                    <Preview preview={x.preview} brand={brandName} sizes="(min-width: 900px) 30vw, 90vw" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={v.canvasInner} style={{ "--pw": pw } as CSSProperties}>
              <Preview preview={current.preview} brand={brandName} sizes="(min-width: 900px) 60vw, 95vw" priority />
            </div>
          )}
        </div>
      </div>
      <div className={v.rail}>
        <div className={v.railHead}>
          <p className={v.railKicker}>
            <span>{CREATIVE_KIND[asset.kind]}</span>
            <span>{asset.format}</span>
          </p>
          <h2 className={v.railTitle} id="viewer-title">
            {asset.title}
          </h2>
          <Status tone={st.tone} label={st.label} />
          <dl className={v.facts}>
            <dt>Showing</dt>
            <dd>
              {compare && before ? `${before.version} and ${current.version} side by side` : `${current.version}${current === latest ? " (latest)" : ""}`}
            </dd>
            <dt>Made by</dt>
            <dd>{people[asset.ownerId] ? `${people[asset.ownerId].name} · ${people[asset.ownerId].title}` : "—"}</dd>
            {campaignName && asset.campaignId && (
              <>
                <dt>Campaign</dt>
                <dd>
                  <Chip href={hrefFor({ kind: "campaign", id: asset.campaignId })} icon="campaigns">
                    {campaignName}
                  </Chip>
                </dd>
              </>
            )}
          </dl>
        </div>

        {approval && (
          <div className={v.section}>
            <div className={v.context}>
              <p className={v.contextHead}>
                <strong>{approval.state === "pending" ? "Waiting on your approval" : "Approval"}</strong>
                <span>
                  {approval.title} · revision {approval.revision}
                  {approval.state === "pending" ? ` · ${due(approval.dueAt, now, tz).label}` : ""}
                </span>
              </p>
              <Decision id={approval.id} state={approval.state} impact={approval.impact} canApprove={can(role, "approve")} roleLabel={ROLE_LABEL[role]} compact />
              <Link href={hrefFor({ kind: "approval", id: approval.id })} style={{ fontSize: "var(--p-fs-label)", color: "var(--text-muted)" }}>
                What changed, why it matters, and the full history →
              </Link>
            </div>
          </div>
        )}

        <div className={v.section}>
          <h3 className={v.sectionTitle}>Revision history</h3>
          <ol className={v.revisions} role="list">
            {[...versions].reverse().map((x) => (
              <li key={x.version}>
                <Link
                  href={href({ v: x.version === latest.version ? undefined : x.version, compare: undefined })}
                  scroll={false}
                  className={v.rev}
                  aria-current={!compare && x === current ? "true" : undefined}
                >
                  <b>{x.version}</b>
                  <span>
                    {x.note} <span style={{ color: "var(--text-muted)" }}>— {people[x.byId]?.name}</span>
                  </span>
                  <time dateTime={x.at}>{fmtDate(x.at, tz, "dayShort")}</time>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className={v.section}>
          <h3 className={v.sectionTitle}>Comments</h3>
          <Comments comments={asset.comments} people={people} now={now} tz={tz} />
          <CommentBox kind="creative" id={asset.id} disabled={can(role, "comment") ? undefined : "Your role can view creative but not comment."} />
        </div>
      </div>
    </div>
  );
}
