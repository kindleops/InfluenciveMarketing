import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import type { CSSProperties } from "react";
import { requirePortal } from "@/portal/server";
import { can } from "@/portal/access";
import { fmtDate } from "@/portal/format";
import { DELIVERABLE_CATEGORY } from "@/portal/status";
import type { DeliverableCategory } from "@/portal/model";
import { Preview } from "@/components/portal/Preview";
import { DownloadButton, FullscreenButton } from "@/components/portal/StageTools";
import { RouteDialog } from "@/components/portal/ui/Dialog";
import { Empty, PageHead, Panel, Person, PLink, Status } from "@/components/portal/ui";
import { Segmented } from "@/components/portal/ui/Segmented";
import v from "@/components/portal/viewer.module.css";
import s from "@/components/portal/vault/vault.module.css";

export const metadata = { title: "Deliverables" };

type SP = Promise<{ cat?: string; id?: string }>;
const STATUS = { final: { label: "Final", tone: "done" }, in_review: { label: "In review", tone: "attention" }, draft: { label: "Draft", tone: "progress" } } as const;

export default async function DeliverablesPage({ searchParams }: { searchParams: SP }) {
  const { session, source } = await requirePortal();
  const sp = await searchParams;
  const tz = session.client.timezone;
  const [items, people] = await Promise.all([source.deliverables(), source.people()]);
  const cats = (Object.keys(DELIVERABLE_CATEGORY) as DeliverableCategory[]).filter((c) => items.some((d) => d.category === c));
  const cat = sp.cat && cats.includes(sp.cat as DeliverableCategory) ? (sp.cat as DeliverableCategory) : undefined;
  const url = (o: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    for (const [k, val] of Object.entries({ cat, id: sp.id, ...o })) if (val) p.set(k, val);
    const q = p.toString();
    return `/portal/deliverables${q ? `?${q}` : ""}`;
  };
  const sorted = [...items].sort((a, b) => b.deliveredAt.localeCompare(a.deliveredAt));
  const latest = sorted.slice(0, 2);
  const shown = sorted.filter((d) => !cat || d.category === cat);
  const selected = sp.id ? items.find((d) => d.id === sp.id) : undefined;

  return (
    <>
      <PageHead
        title="Deliverables"
        lead={items.length ? `Everything we’ve delivered to ${session.client.name}, versioned and kept in one place.` : undefined}
      />
      {items.length === 0 ? (
        <Panel>
          <Empty center icon="deliverables" title="Nothing delivered yet." body="Strategy, reports, brand work and final files are archived here as each is delivered — with every version kept." />
        </Panel>
      ) : (
        <>
          {!cat && (
            <section className={s.latest} aria-label="Latest deliveries">
              {latest.map((d) => (
                <Link key={d.id} href={url({ id: d.id })} scroll={false}>
                  <Panel as="span" glass className={s.hero}>
                    <Preview preview={d.preview} brand={session.client.name} sizes="200px" />
                    <span className={s.heroText}>
                      <span className={s.heroKicker}>
                        Latest · {DELIVERABLE_CATEGORY[d.category]} · {fmtDate(d.deliveredAt, tz, "dayShort")}
                      </span>
                      <span className={s.heroTitle}>{d.title}</span>
                      <span className={s.heroSummary}>{d.summary}</span>
                      <span className={s.heroKicker}>
                        {d.format} · {d.versions.at(-1)?.version}
                      </span>
                    </span>
                  </Panel>
                </Link>
              ))}
            </section>
          )}
          <div className={s.toolbar}>
            <Segmented
              label="Category"
              active={cat ?? "all"}
              items={[
                { key: "all", label: "Everything", count: items.length, href: "/portal/deliverables" },
                ...cats.map((c) => ({ key: c, label: DELIVERABLE_CATEGORY[c], count: items.filter((d) => d.category === c).length, href: `/portal/deliverables?cat=${c}` })),
              ]}
            />
          </div>
          <ul className={s.shelf} role="list">
            {shown.map((d) => {
              const wide = d.preview.aspect === "16/9" || d.preview.aspect === "3/2";
              return (
                <li key={d.id}>
                  <Link href={url({ id: d.id })} scroll={false} className={s.item}>
                    <span className={s.cover} data-wide={wide ? "" : undefined}>
                      <Preview preview={d.preview} brand={session.client.name} sizes="200px" />
                    </span>
                    <span className={s.itemText}>
                      <span className={s.itemTitle}>{d.title}</span>
                      <span className={s.itemMeta}>
                        {DELIVERABLE_CATEGORY[d.category]} · {fmtDate(d.deliveredAt, tz, "day")}
                      </span>
                      {d.status !== "final" && <Status tone={STATUS[d.status].tone} label={STATUS[d.status].label} />}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {selected && (
        <RouteDialog closeHref={url({ id: undefined })} labelledBy="viewer-title" size="wide">
          <div className={v.viewer}>
            <div className={v.stage} id="deliverable-stage">
              <div className={v.tools}>
                <Status tone={STATUS[selected.status].tone} label={STATUS[selected.status].label} />
                <FullscreenButton targetId="deliverable-stage" />
                <DownloadButton href={selected.fileUrl} name={selected.title} allowed={can(session.user.role, "download")} />
              </div>
              <div className={v.canvas}>
                <div
                  className={v.canvasInner}
                  style={{ "--pw": selected.preview.aspect === "16/9" || selected.preview.aspect === "3/2" ? "760px" : "420px" } as CSSProperties}
                >
                  <Preview preview={selected.preview} brand={session.client.name} sizes="(min-width: 900px) 50vw, 90vw" priority />
                </div>
              </div>
            </div>
            <div className={v.rail}>
              <div className={v.railHead}>
                <p className={v.railKicker}>
                  <span>{DELIVERABLE_CATEGORY[selected.category]}</span>
                  <span>{selected.format}</span>
                </p>
                <h2 className={v.railTitle} id="viewer-title">
                  {selected.title}
                </h2>
                <dl className={v.facts}>
                  <dt>Delivered</dt>
                  <dd>{fmtDate(selected.deliveredAt, tz, "day")}</dd>
                  <dt>Project</dt>
                  <dd>{selected.project}</dd>
                  <dt>Version</dt>
                  <dd>{selected.versions.at(-1)?.version}</dd>
                </dl>
              </div>
              <div className={v.section}>
                <h3 className={v.sectionTitle}>Summary</h3>
                <p style={{ fontSize: "var(--p-fs-body)", color: "var(--text-secondary)" }}>{selected.summary}</p>
              </div>
              <div className={v.section}>
                <h3 className={v.sectionTitle}>Versions</h3>
                <ol className={v.revisions} role="list">
                  {[...selected.versions].reverse().map((r) => (
                    <li key={r.version} className={v.rev}>
                      <b>{r.version}</b>
                      <span>{r.note}</span>
                      <time dateTime={r.at}>{fmtDate(r.at, tz, "dayShort")}</time>
                    </li>
                  ))}
                </ol>
              </div>
              <div className={v.section}>
                <Person person={people[selected.ownerId]} size={30} sub={people[selected.ownerId] ? `${people[selected.ownerId].title} · delivered this` : undefined} />
                <PLink
                  href={`/portal/messages?compose=1&ref=deliverable:${selected.id}&subject=${encodeURIComponent(selected.title)}`}
                  variant="secondary"
                  size="sm"
                  icon="messages"
                >
                  {selected.commentCount ? `Discuss · ${selected.commentCount} comments` : "Discuss this"}
                </PLink>
              </div>
            </div>
          </div>
        </RouteDialog>
      )}
    </>
  );
}
