import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import { requirePortal } from "@/portal/server";
import { fmtDate } from "@/portal/format";
import { todayIn } from "@/portal/range";
import { CONTENT_STAGE, CONTENT_STAGES, CONTENT_TYPE } from "@/portal/status";
import type { ContentItem, ContentType } from "@/portal/model";
import { ContentViewer } from "@/components/portal/content/ContentViewer";
import { Preview } from "@/components/portal/Preview";
import { RouteDialog } from "@/components/portal/ui/Dialog";
import { Avatar, Empty, PageHead, Panel, PLink, Status } from "@/components/portal/ui";
import { Segmented } from "@/components/portal/ui/Segmented";
import s from "@/components/portal/content/content.module.css";

export const metadata = { title: "Content" };

type SP = Promise<{ view?: string; month?: string; type?: string; item?: string }>;
const localDay = (iso: string, tz: string) => new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));

export default async function ContentPage({ searchParams }: { searchParams: SP }) {
  const { session, source } = await requirePortal();
  const sp = await searchParams;
  const now = Date.now();
  const tz = session.client.timezone;
  const [content, people, approvals, campaigns] = await Promise.all([source.content(), source.people(), source.approvals(), source.campaigns()]);

  const view = sp.view === "pipeline" || sp.view === "library" ? sp.view : "calendar";
  const today = todayIn(tz, now);
  const month = sp.month && /^\d{4}-\d{2}$/.test(sp.month) ? sp.month : today.slice(0, 7);
  const [y, m] = month.split("-").map(Number);
  const shift = (d: number) => {
    const t = new Date(Date.UTC(y, m - 1 + d, 1));
    return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, "0")}`;
  };
  const base = (o: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const merged = { view: view === "calendar" ? undefined : view, month: sp.month, type: sp.type, ...o };
    for (const [k, v] of Object.entries(merged)) if (v) p.set(k, v);
    const q = p.toString();
    return `/portal/content${q ? `?${q}` : ""}`;
  };

  const selected = sp.item ? content.find((c) => c.id === sp.item) : undefined;
  const reviewCount = content.filter((c) => c.stage === "client_review").length;

  // Calendar grid: Monday-first weeks covering the month.
  const first = new Date(Date.UTC(y, m - 1, 1));
  const lead = (first.getUTCDay() + 6) % 7;
  const daysIn = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells = Math.ceil((lead + daysIn) / 7) * 7;
  const byDay = new Map<string, ContentItem[]>();
  for (const c of content)
    if (c.publishAt) {
      const k = localDay(c.publishAt, tz);
      byDay.set(k, [...(byDay.get(k) ?? []), c].sort((a, b) => a.publishAt!.localeCompare(b.publishAt!)));
    }
  const grid = Array.from({ length: cells }, (_, i) => {
    const d = new Date(Date.UTC(y, m - 1, 1 - lead + i));
    const key = d.toISOString().slice(0, 10);
    return { key, day: d.getUTCDate(), out: d.getUTCMonth() !== m - 1, weekend: [0, 6].includes(d.getUTCDay()), items: byDay.get(key) ?? [] };
  });
  const monthItems = grid.filter((g) => !g.out && g.items.length);
  const unscheduled = content.filter((c) => !c.publishAt && c.stage !== "archived");

  const entry = (c: ContentItem, withTime = true) => {
    const st = CONTENT_STAGE[c.stage];
    return (
      <Link key={c.id} href={base({ item: c.id })} scroll={false} className={s.entry} data-tone={st.tone} title={`${c.title} — ${st.label}`}>
        <span className={s.entryText}>
          {withTime && c.publishAt && <small>{fmtDate(c.publishAt, tz, "time").replace(":00", "").replace(" ", "").toLowerCase()}</small>}
          {c.title}
          <span className="sr-only"> — {st.label}, {CONTENT_TYPE[c.type]}</span>
        </span>
      </Link>
    );
  };

  const types = [...new Set(content.map((c) => c.type))];
  const typeFilter = sp.type && types.includes(sp.type as ContentType) ? (sp.type as ContentType) : undefined;

  return (
    <>
      <PageHead
        title="Content"
        lead={
          content.length
            ? reviewCount
              ? `${reviewCount} piece${reviewCount === 1 ? " is" : "s are"} in your review. Open anything to see it as it will run, and decide right there.`
              : "Everything being written, designed, scheduled and published for you."
            : undefined
        }
        actions={
          reviewCount > 0 ? (
            <PLink href={base({ view: "pipeline" })} variant="secondary" size="sm">
              {reviewCount} in your review
            </PLink>
          ) : undefined
        }
      />
      {content.length === 0 ? (
        <Panel>
          <Empty
            center
            icon="content"
            title="No content in the works yet."
            body="Once your content plan is agreed, every post, article and email appears here from first idea to published — with approvals in place."
          />
        </Panel>
      ) : (
        <>
          <div className={s.toolbar}>
            <Segmented
              label="View"
              active={view}
              items={[
                { key: "calendar", label: "Calendar", href: base({ view: undefined, type: undefined }) },
                { key: "pipeline", label: "Pipeline", href: base({ view: "pipeline", month: undefined, type: undefined }) },
                { key: "library", label: "Library", href: base({ view: "library", month: undefined }) },
              ]}
            />
            {view === "calendar" && (
              <div className={s.monthNav}>
                <PLink href={base({ month: shift(-1) })} variant="ghost" size="sm" icon="chevronLeft" iconOnly scroll={false}>
                  Previous month
                </PLink>
                <span className={s.month} aria-live="polite">
                  {fmtDate(`${month}-01`, tz, "month")}
                </span>
                <PLink href={base({ month: shift(1) })} variant="ghost" size="sm" icon="chevronRight" iconOnly scroll={false}>
                  Next month
                </PLink>
                {month !== today.slice(0, 7) && (
                  <PLink href={base({ month: undefined })} variant="secondary" size="sm" scroll={false}>
                    Today
                  </PLink>
                )}
              </div>
            )}
            {view === "library" && types.length > 1 && (
              <Segmented
                size="sm"
                label="Type"
                active={typeFilter ?? "all"}
                items={[{ key: "all", label: "All", href: base({ type: undefined }) }, ...types.map((t) => ({ key: t, label: CONTENT_TYPE[t], href: base({ type: t }) }))]}
              />
            )}
          </div>

          {view === "calendar" && (
            <>
              <Panel className={s.cal} as="section" aria-label={`Content calendar, ${fmtDate(`${month}-01`, tz, "month")}`}>
                <div className={s.calendarDesktop}>
                  <div className={s.weekdays} aria-hidden="true">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                  <div className={s.grid}>
                    {grid.map((g) => (
                      <div key={g.key} className={s.cell} data-out={g.out ? "" : undefined} data-weekend={g.weekend ? "" : undefined} data-today={g.key === today ? "" : undefined}>
                        <span className={s.date}>
                          {g.day}
                          <span className="sr-only"> {fmtDate(g.key, tz, "month")}</span>
                        </span>
                        {g.items.length > 0 && (
                          <ul className={s.entries} role="list">
                            {g.items.slice(0, 3).map((c) => (
                              <li key={c.id}>{entry(c)}</li>
                            ))}
                            {g.items.length > 3 && <li style={{ fontSize: "0.72rem", color: "var(--text-muted)", paddingLeft: 6 }}>+{g.items.length - 3} more</li>}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={s.agenda}>
                  {monthItems.length === 0 ? (
                    <Empty title="Nothing scheduled this month." />
                  ) : (
                    monthItems.map((g) => (
                      <div key={g.key} className={s.agendaDay}>
                        <p className={s.agendaDate} data-today={g.key === today ? "" : undefined}>
                          {g.key === today ? "Today · " : ""}
                          {fmtDate(g.key, tz, "full")}
                        </p>
                        <div className={s.entries}>{g.items.map((c) => entry(c))}</div>
                      </div>
                    ))
                  )}
                </div>
                <div className={s.legend} aria-label="Legend">
                  {(["client_review", "drafting", "scheduled", "approved", "published"] as const).map((k) => (
                    <Status key={k} tone={CONTENT_STAGE[k].tone} label={CONTENT_STAGE[k].label} />
                  ))}
                </div>
              </Panel>
              {unscheduled.length > 0 && (
                <Panel className={s.unscheduled} aria-label="Not yet scheduled">
                  <div style={{ padding: "1rem 1.1rem", display: "grid", gap: "0.6rem" }}>
                    <p style={{ fontSize: "var(--p-fs-meta)", color: "var(--text-muted)" }}>Not yet scheduled · {unscheduled.length}</p>
                    <div className={s.entries} style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
                      {unscheduled.map((c) => entry(c, false))}
                    </div>
                  </div>
                </Panel>
              )}
            </>
          )}

          {view === "pipeline" && (
            <div className={s.pipeline} role="list" aria-label="Content pipeline" tabIndex={0}>
              {CONTENT_STAGES.map((stage) => {
                const items = content.filter((c) => c.stage === stage).sort((a, b) => (a.publishAt ?? "z").localeCompare(b.publishAt ?? "z"));
                const st = CONTENT_STAGE[stage];
                return (
                  <div key={stage} className={s.column} role="listitem" data-you={stage === "client_review" ? "" : undefined} aria-label={`${st.label}, ${items.length}`}>
                    <header className={s.colHead}>
                      <Status tone={st.tone} label={st.label} />
                      <span className={s.colCount}>{items.length}</span>
                    </header>
                    {items.length === 0 ? (
                      <p className={s.colEmpty}>Nothing here</p>
                    ) : (
                      <ul className={s.cards} role="list">
                        {items.map((c) => (
                          <li key={c.id}>
                            <Link href={base({ item: c.id })} scroll={false} className={s.card}>
                              <span className={s.thumb}>
                                <Preview preview={{ ...c.preview, aspect: "1/1", layout: c.preview.plate ? "frame" : c.preview.layout, headline: undefined, sub: undefined }} sizes="52px" />
                              </span>
                              <span className={s.cardText}>
                                <span className={s.cardTitle}>{c.title}</span>
                                <span className={s.cardMeta}>
                                  {CONTENT_TYPE[c.type]} · {c.publishAt ? fmtDate(c.publishAt, tz, "dayShort") : "unscheduled"}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {view === "library" && (
            <div className={s.library}>
              {content
                .filter((c) => !typeFilter || c.type === typeFilter)
                .sort((a, b) => (b.publishAt ?? "").localeCompare(a.publishAt ?? ""))
                .map((c) => {
                  const st = CONTENT_STAGE[c.stage];
                  const owner = people[c.ownerId];
                  return (
                    <Link key={c.id} href={base({ item: c.id })} scroll={false} className={s.libItem}>
                      <Preview preview={c.preview} brand={session.client.name} sizes="(min-width: 1100px) 22vw, 45vw" />
                      <span className={s.libText}>
                        <span className={s.libTitle}>{c.title}</span>
                        <span className={s.libMeta}>
                          <span>
                            {CONTENT_TYPE[c.type]} · {c.platform}
                          </span>
                          <Status tone={st.tone} label={st.label} />
                        </span>
                        {owner && (
                          <span className={s.libMeta} style={{ justifyContent: "flex-start", alignItems: "center", gap: "0.4rem" }}>
                            <Avatar id={owner.id} name={owner.name} size={18} />
                            {owner.name}
                          </span>
                        )}
                      </span>
                    </Link>
                  );
                })}
            </div>
          )}
        </>
      )}

      {selected && (
        <RouteDialog closeHref={base({ item: undefined })} labelledBy="viewer-title" size="wide">
          <ContentViewer
            item={selected}
            approval={approvals.find((a) => a.id === selected.approvalId)}
            batchSize={content.filter((c) => c.approvalId && c.approvalId === selected.approvalId).length}
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
