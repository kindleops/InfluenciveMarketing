import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import { requirePortal } from "@/portal/server";
import { can } from "@/portal/access";
import { ago, bytes, fmtDate } from "@/portal/format";
import { hrefFor, REF_ICON } from "@/portal/nav";
import { FileIcon, MarkRead, NewThread, Reply, ResolveButton } from "@/components/portal/messages/Compose";
import { Avatar, AvatarStack, Chip, Empty, Icon, PageHead, Panel, PLink, Status } from "@/components/portal/ui";
import { Segmented } from "@/components/portal/ui/Segmented";
import s from "@/components/portal/messages/messages.module.css";

export const metadata = { title: "Messages" };

type SP = Promise<{ thread?: string; show?: string; compose?: string; ref?: string; subject?: string }>;

export default async function MessagesPage({ searchParams }: { searchParams: SP }) {
  const { session, source } = await requirePortal();
  const sp = await searchParams;
  const now = Date.now();
  const tz = session.client.timezone;
  const [threads, people, campaigns, approvals, deliverables, creative, opportunities] = await Promise.all([
    source.threads(),
    source.people(),
    source.campaigns(),
    source.approvals(),
    source.deliverables(),
    source.creative(),
    source.opportunities(),
  ]);
  const canWrite = can(session.user.role, "comment");
  const show = sp.show === "resolved" ? "resolved" : sp.show === "all" ? "all" : "open";
  const last = (t: (typeof threads)[number]) => t.messages[t.messages.length - 1];
  const sorted = [...threads].sort((a, b) => last(b).at.localeCompare(last(a).at));
  const list = sorted.filter((t) => show === "all" || t.status === show);
  const selected = threads.find((t) => t.id === sp.thread) ?? list[0];
  const q = (o: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries({ show: show === "open" ? undefined : show, ...o })) if (v) p.set(k, v);
    const str = p.toString();
    return `/portal/messages${str ? `?${str}` : ""}`;
  };

  const options = [
    ...approvals.filter((a) => a.state === "pending").map((a) => ({ value: `approval:${a.id}`, label: a.title, group: "Approvals" })),
    ...campaigns.map((c) => ({ value: `campaign:${c.id}`, label: c.name, group: "Campaigns" })),
    ...creative.map((c) => ({ value: `creative:${c.id}`, label: c.title, group: "Creative" })),
    ...deliverables.map((d) => ({ value: `deliverable:${d.id}`, label: d.title, group: "Deliverables" })),
    ...opportunities.map((o) => ({ value: `opportunity:${o.id}`, label: o.title, group: "Growth" })),
  ];
  const initialRef = sp.ref && options.some((o) => o.value === sp.ref) ? sp.ref : undefined;
  const unreadTotal = threads.reduce((n, t) => n + t.unread, 0);

  return (
    <>
      <PageHead
        title="Messages"
        lead={
          threads.length
            ? "Conversations with your team, each attached to the work it’s about."
            : undefined
        }
        actions={
          canWrite ? (
            <PLink href={q({ compose: "1", thread: sp.thread })} variant="primary" size="sm" icon="plus" scroll={false}>
              New message
            </PLink>
          ) : undefined
        }
      />
      {threads.length === 0 ? (
        <Panel>
          <Empty center icon="messages" title="No conversations yet." body="Start one about anything — or open a campaign, approval or deliverable and ask about it there, so the context comes with it." />
        </Panel>
      ) : (
        <div className={s.layout} data-open={sp.thread ? "" : undefined}>
          <div className={s.aside}>
            <Segmented
              label="Show"
              active={show}
              items={[
                { key: "open", label: "Open", count: threads.filter((t) => t.status === "open").length, href: "/portal/messages" },
                { key: "resolved", label: "Resolved", count: threads.filter((t) => t.status === "resolved").length, href: "/portal/messages?show=resolved" },
                { key: "all", label: "All", href: "/portal/messages?show=all" },
              ]}
            />
            <Panel className={s.listPanel} as="div">
              {list.length === 0 ? (
                <Empty title={show === "open" ? "No open conversations." : "Nothing resolved yet."} />
              ) : (
                <ul className={s.list} role="list" aria-label={`Conversations${unreadTotal ? `, ${unreadTotal} unread` : ""}`}>
                  {list.map((t) => {
                    const m = last(t);
                    const who = people[m.authorId];
                    return (
                      <li key={t.id}>
                        <Link href={q({ thread: t.id })} scroll={false} className={s.row} aria-current={t.id === selected?.id ? "true" : undefined} data-unread={t.unread ? "" : undefined}>
                          {t.unread > 0 && <span className={s.unread} aria-hidden="true" />}
                          <span className={s.rowTop}>
                            <span>{who?.name ?? "Someone"}</span>
                            <span>{ago(m.at, now, tz)}</span>
                          </span>
                          <span className={s.rowSubject}>
                            {t.subject}
                            {t.unread > 0 && <span className="sr-only"> — {t.unread} unread</span>}
                          </span>
                          <span className={s.rowSnippet}>{m.body}</span>
                          {t.ref && (
                            <span className={s.rowRef}>
                              <Icon name={REF_ICON[t.ref.kind]} size={13} />
                              {t.ref.label}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Panel>
          </div>

          <div className={s.detail}>
            {selected && (
              <Panel as="article" className={s.thread} aria-labelledby="thread-title">
                <MarkRead threadId={selected.id} unread={selected.unread} />
                <header className={s.threadHead}>
                  <div style={{ minWidth: 0 }}>
                    <div className={s.back}>
                      <Link href={q({})} style={{ display: "inline-flex", gap: "0.35rem", alignItems: "center", fontSize: "var(--p-fs-meta)", color: "var(--text-muted)" }}>
                        <Icon name="arrowLeft" size={14} />
                        All conversations
                      </Link>
                    </div>
                    <h2 className={s.threadTitle} id="thread-title">
                      {selected.subject}
                    </h2>
                    <p className={s.threadMeta}>
                      {selected.ref && (
                        <Chip href={hrefFor(selected.ref)} icon={REF_ICON[selected.ref.kind]}>
                          {selected.ref.label}
                        </Chip>
                      )}
                      <Status tone={selected.status === "open" ? "progress" : "done"} label={selected.status === "open" ? "Open" : "Resolved"} />
                      <AvatarStack
                        size={22}
                        people={[...new Set(selected.messages.map((m) => m.authorId))].map((id) => ({ id, name: people[id]?.name ?? "?", side: people[id]?.side }))}
                      />
                    </p>
                  </div>
                  {canWrite && <ResolveButton threadId={selected.id} status={selected.status} />}
                </header>
                <ol className={s.messages} role="list" aria-label="Messages">
                  {selected.messages.map((m) => {
                    const p = people[m.authorId];
                    return (
                      <li key={m.id} className={s.msg} data-me={m.authorId === session.user.id ? "" : undefined}>
                        <Avatar id={m.authorId} name={p?.name ?? "?"} side={p?.side} size={36} />
                        <div>
                          <p className={s.msgHead}>
                            <strong>{p?.name ?? "Someone"}</strong>
                            {p?.side === "studio" && <span>{p.title}</span>}
                            <time dateTime={m.at}>{fmtDate(m.at, tz, "dayTime")}</time>
                          </p>
                          <p className={s.msgBody}>{m.body}</p>
                          {m.attachments && (
                            <div className={s.files}>
                              {m.attachments.map((f) => (
                                <span key={f.name} className={s.file}>
                                  <span className={s.fileIcon}>
                                    <FileIcon kind={f.kind} />
                                  </span>
                                  <span>
                                    {f.name}
                                    <small>
                                      {bytes(f.size)} · available once file storage is connected
                                    </small>
                                  </span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
                <Reply threadId={selected.id} disabled={canWrite ? undefined : "Your role can read conversations but not reply."} />
              </Panel>
            )}
          </div>
        </div>
      )}
      <NewThread
        key={`${sp.compose}-${sp.ref}-${sp.subject}`}
        open={sp.compose === "1"}
        options={options}
        initialRef={initialRef}
        initialSubject={sp.subject}
        closeHref={q({ thread: sp.thread })}
        canWrite={canWrite}
      />
    </>
  );
}
