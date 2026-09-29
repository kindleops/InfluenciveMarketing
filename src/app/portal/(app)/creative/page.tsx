import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import { requirePortal } from "@/portal/server";
import { due } from "@/portal/format";
import { CREATIVE_KIND, CREATIVE_STATUS } from "@/portal/status";
import type { CreativeKind } from "@/portal/model";
import { CreativeViewer } from "@/components/portal/creative/CreativeViewer";
import { Preview } from "@/components/portal/Preview";
import { RouteDialog } from "@/components/portal/ui/Dialog";
import { Empty, PageHead, Panel, Status } from "@/components/portal/ui";
import { Segmented } from "@/components/portal/ui/Segmented";
import s from "@/components/portal/creative/creative.module.css";

export const metadata = { title: "Creative" };

type SP = Promise<{ kind?: string; asset?: string; v?: string; compare?: string }>;

export default async function CreativePage({ searchParams }: { searchParams: SP }) {
  const { session, source } = await requirePortal();
  const sp = await searchParams;
  const now = Date.now();
  const tz = session.client.timezone;
  const [creative, people, approvals, campaigns] = await Promise.all([source.creative(), source.people(), source.approvals(), source.campaigns()]);

  const kinds = (Object.keys(CREATIVE_KIND) as CreativeKind[]).filter((k) => creative.some((c) => c.kind === k));
  const kind = sp.kind && kinds.includes(sp.kind as CreativeKind) ? (sp.kind as CreativeKind) : undefined;
  const url = (o: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const merged = { kind, asset: sp.asset, v: sp.v, compare: sp.compare, ...o };
    for (const [k, v] of Object.entries(merged)) if (v) p.set(k, v);
    const q = p.toString();
    return `/portal/creative${q ? `?${q}` : ""}`;
  };
  const inReview = creative.filter((c) => c.status === "in_review");
  const shown = creative
    .filter((c) => !kind || c.kind === kind)
    .sort((a, b) => (b.versions.at(-1)?.at ?? "").localeCompare(a.versions.at(-1)?.at ?? ""));
  const selected = sp.asset ? creative.find((c) => c.id === sp.asset) : undefined;

  return (
    <>
      <PageHead
        title="Creative"
        lead={creative.length ? "Concepts, campaign creative, film, photography and brand — every version, in one private studio." : undefined}
      />
      {creative.length === 0 ? (
        <Panel>
          <Empty center icon="creative" title="The studio is empty for now." body="Concepts, campaign creative and brand work appear here as soon as the first pieces are in production." />
        </Panel>
      ) : (
        <>
          {inReview.length > 0 && !kind && (
            <section className={s.review} aria-labelledby="review-title">
              <div className={s.reviewHead}>
                <h2 className={s.reviewTitle} id="review-title">
                  In your review · {inReview.length}
                </h2>
              </div>
              <div className={s.reviewRow} tabIndex={0} role="group" aria-label="In your review">
                {inReview.map((c) => {
                  const latest = c.versions[c.versions.length - 1];
                  const ap = approvals.find((a) => a.id === c.approvalId && a.state === "pending");
                  return (
                    <Link key={c.id} href={url({ asset: c.id, v: undefined, compare: undefined })} scroll={false} className={s.feature}>
                      <span className={s.featureStage}>
                        <Preview preview={latest.preview} brand={session.client.name} sizes="320px" fit="contain" />
                      </span>
                      <span className={s.featureText}>
                        <strong>{c.title}</strong>
                        <span>
                          {latest.version} · {c.format}
                          {ap ? ` · ${due(ap.dueAt, now, tz).label}` : ""}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <div className={s.toolbar}>
            <Segmented
              label="Kind"
              active={kind ?? "all"}
              items={[
                { key: "all", label: "Everything", count: creative.length, href: "/portal/creative" },
                ...kinds.map((k) => ({ key: k, label: CREATIVE_KIND[k], count: creative.filter((c) => c.kind === k).length, href: `/portal/creative?kind=${k}` })),
              ]}
            />
          </div>

          <div className={s.gallery}>
            {shown.map((c) => {
              const latest = c.versions[c.versions.length - 1];
              const st = CREATIVE_STATUS[c.status];
              return (
                <Link key={c.id} href={url({ asset: c.id, v: undefined, compare: undefined })} scroll={false} className={s.tile}>
                  <Preview preview={latest.preview} brand={session.client.name} sizes="(min-width: 1100px) 22vw, 45vw" />
                  <span className={s.tileText}>
                    <span className={s.tileTitle}>{c.title}</span>
                    <span className={s.tileMeta}>
                      <span>
                        {c.format} · {latest.version}
                      </span>
                      <Status tone={st.tone} label={st.label} />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </>
      )}

      {selected && (
        <RouteDialog closeHref={url({ asset: undefined, v: undefined, compare: undefined })} labelledBy="viewer-title" size="wide">
          <CreativeViewer
            asset={selected}
            version={sp.v}
            compare={sp.compare === "1"}
            href={url}
            approval={approvals.find((a) => a.id === selected.approvalId)}
            campaignName={campaigns.find((c) => c.id === selected.campaignId)?.name}
            people={people}
            role={session.user.role}
            brandName={session.client.name}
            now={now}
            tz={tz}
          />
        </RouteDialog>
      )}
    </>
  );
}
