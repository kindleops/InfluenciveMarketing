import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import type { CSSProperties } from "react";
import { requirePortal } from "@/portal/server";
import { can, ROLE_LABEL } from "@/portal/access";
import { ago, due, fmtDate } from "@/portal/format";
import { hrefFor, REF_ICON } from "@/portal/nav";
import { APPROVAL_CATEGORY } from "@/portal/status";
import type { Approval, ApprovalCategory } from "@/portal/model";
import { ApprovalList, type ListItem } from "@/components/portal/approvals/ApprovalList";
import { Decision } from "@/components/portal/approvals/Decision";
import { CommentBox } from "@/components/portal/CommentBox";
import { Preview } from "@/components/portal/Preview";
import { Chip, Empty, Icon, type IconName, PageHead, Panel, Person } from "@/components/portal/ui";
import { Segmented } from "@/components/portal/ui/Segmented";
import s from "@/components/portal/approvals/approvals.module.css";

export const metadata = { title: "Approvals" };

const CAT_ICON: Record<ApprovalCategory, IconName> = {
  creative: "creative",
  content: "content",
  campaign: "campaigns",
  website: "layers",
  budget: "billing",
  strategy: "target",
  deliverable: "deliverables",
};

const ACTION: Record<string, string> = {
  requested: "requested approval",
  revised: "sent a new revision",
  commented: "commented",
  approved: "approved",
  changes_requested: "requested changes",
};

type SP = Promise<{ id?: string; show?: string; cat?: string }>;

export default async function ApprovalsPage({ searchParams }: { searchParams: SP }) {
  const { session, source } = await requirePortal();
  const sp = await searchParams;
  const now = Date.now();
  const tz = session.client.timezone;
  const [approvals, people] = await Promise.all([source.approvals(), source.people()]);

  const show = sp.show === "decided" ? "decided" : "waiting";
  const cat = sp.cat && sp.cat in APPROVAL_CATEGORY ? (sp.cat as ApprovalCategory) : undefined;
  const byDue = (a: Approval, b: Approval) =>
    Number(b.priority === "high") - Number(a.priority === "high") || a.dueAt.localeCompare(b.dueAt);
  const waiting = approvals.filter((a) => a.state === "pending").sort(byDue);
  const decided = approvals.filter((a) => a.state !== "pending").sort((a, b) => (b.audit.at(-1)?.at ?? "").localeCompare(a.audit.at(-1)?.at ?? ""));
  const pool = (show === "waiting" ? waiting : decided).filter((a) => !cat || a.category === cat);
  const cats = [...new Set((show === "waiting" ? waiting : decided).map((a) => a.category))];

  const q = (o: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries({ show: show === "decided" ? "decided" : undefined, cat, ...o })) if (v) p.set(k, v);
    const str = p.toString();
    return `/portal/approvals${str ? `?${str}` : ""}`;
  };

  const selected = approvals.find((a) => a.id === sp.id) ?? pool[0];
  const items: ListItem[] = pool.map((a) => {
    const d = due(a.dueAt, now, tz);
    const last = a.audit.at(-1);
    return {
      id: a.id,
      title: a.title,
      category: APPROVAL_CATEGORY[a.category],
      icon: CAT_ICON[a.category],
      due: a.state === "pending" ? d.label : `${a.state === "approved" ? "Approved" : "Changes requested"} ${last ? ago(last.at, now, tz).toLowerCase() : ""}`,
      urgency: a.state === "pending" ? d.urgency : "later",
      who: `Prepared by ${people[a.preparedById]?.name ?? "the team"}`,
      href: q({ id: a.id }),
      high: a.priority === "high",
      state: a.state,
    };
  });

  const nextPending = waiting.find((a) => a.id !== selected?.id);

  return (
    <>
      <PageHead
        title="Approvals"
        lead={
          waiting.length
            ? `${waiting.length} decision${waiting.length === 1 ? "" : "s"} waiting on you. Each one shows what it is, why it matters and what happens next.`
            : "Nothing is waiting on you. Decisions appear here the moment the team needs one."
        }
      />
      <div className={s.layout} data-open={sp.id ? "" : undefined}>
        <div className={s.aside}>
          <div className={s.filters}>
            <Segmented
              label="Show"
              active={show}
              items={[
                { key: "waiting", label: "Waiting on you", count: waiting.length, href: "/portal/approvals" },
                { key: "decided", label: "Decided", count: decided.length, href: "/portal/approvals?show=decided" },
              ]}
            />
            {cats.length > 1 && (
              <Segmented
                size="sm"
                label="Category"
                active={cat ?? "all"}
                items={[
                  { key: "all", label: "All", href: q({ cat: undefined, id: undefined }).replace(/[?&]cat=[^&]*/, "") },
                  ...cats.map((c) => ({ key: c, label: APPROVAL_CATEGORY[c], href: q({ cat: c, id: undefined }) })),
                ]}
              />
            )}
          </div>
          <Panel className={s.listPanel} as="div">
            {items.length === 0 ? (
              <Empty
                icon="check"
                title={show === "waiting" ? "No approvals need your attention." : "Nothing decided yet."}
                body={show === "waiting" ? "Everything is moving." : "Approved and returned work will be listed here with its full history."}
              />
            ) : (
              <>
                <p className={s.groupLabel}>{show === "waiting" ? "Soonest first" : "Most recent first"}</p>
                <ApprovalList items={items} active={selected?.id} label={show === "waiting" ? "Waiting on you" : "Decided"} />
              </>
            )}
          </Panel>
        </div>

        <div className={s.detail}>
          {selected ? (
            <Detail approval={selected} people={people} now={now} tz={tz} role={session.user.role} brandName={session.client.name} nextHref={nextPending ? q({ id: nextPending.id, show: undefined }) : undefined} backHref={q({ id: undefined })} />
          ) : (
            <Panel>
              <Empty center icon="approvals" title="Select an approval" body="Choose an item to see what you’re approving and why." />
            </Panel>
          )}
        </div>
      </div>
    </>
  );
}

function Detail({
  approval: a,
  people,
  now,
  tz,
  role,
  brandName,
  nextHref,
  backHref,
}: {
  approval: Approval;
  people: Awaited<ReturnType<Awaited<ReturnType<typeof requirePortal>>["source"]["people"]>>;
  now: number;
  tz: string;
  role: Parameters<typeof can>[0];
  brandName: string;
  nextHref?: string;
  backHref: string;
}) {
  const d = due(a.dueAt, now, tz);
  const preparer = people[a.preparedById];
  const decision = [...a.audit].reverse().find((e) => e.action === "approved" || e.action === "changes_requested");
  const decider = decision ? people[decision.actorId] : undefined;
  const outcome = decision ? `${decider?.name ?? "Someone"} · ${fmtDate(decision.at, tz, "dayTime")} · revision ${decision.revision}${decision.note ? ` — “${decision.note}”` : ""}` : undefined;
  const wide = a.preview && (a.preview.aspect === "16/9" || a.preview.aspect === "3/2");

  return (
    <Panel glass as="article" aria-labelledby="approval-title">
      <div className={s.detailInner}>
        <div>
          <div className={s.back}>
            <Link href={backHref} className={s.nextLink} scroll={false}>
              <Icon name="arrowLeft" size={14} />
              All approvals
            </Link>
          </div>
          <p className={s.kicker}>
            <Chip icon={CAT_ICON[a.category]}>{APPROVAL_CATEGORY[a.category]}</Chip>
            <span>Revision {a.revision}</span>
            {a.priority === "high" && a.state === "pending" && <span style={{ color: "rgb(var(--tone-attention))" }}>High priority</span>}
            {a.impact === "high" && <span>Needs confirmation</span>}
          </p>
          <h2 className={s.title} id="approval-title">
            {a.title}
          </h2>
          <div className={s.byline}>
            <Person person={preparer} size={34} sub={preparer ? `${preparer.title} · sent ${ago(a.requestedAt, now, tz).toLowerCase()}` : undefined} />
            {a.state === "pending" && (
              <p className={s.due} data-urgency={d.urgency}>
                <strong>{d.label}</strong>
                {fmtDate(a.dueAt, tz, "full")}
              </p>
            )}
          </div>
        </div>

        {a.preview && (
          <div className={s.stage}>
            <div className={s.stagePreview} style={{ "--pw": wide ? "760px" : a.preview.aspect === "9/16" ? "300px" : "440px" } as CSSProperties}>
              <Preview preview={a.preview} brand={brandName} sizes="(min-width: 1100px) 50vw, 90vw" priority />
            </div>
          </div>
        )}

        {a.figures && (
          <div className={s.figures}>
            {a.figures.map((f) => (
              <div key={f.label} className={s.figure}>
                <span>{f.label}</span>
                <strong>{f.value}</strong>
                {f.note && <em>{f.note}</em>}
              </div>
            ))}
          </div>
        )}

        <div className={s.qa}>
          <section className={s.q} data-wide="">
            <h3>What you’re approving</h3>
            <p style={{ color: "var(--text-primary)", fontSize: "1.0625rem" }}>{a.summary}</p>
          </section>
          <section className={s.q}>
            <h3>Why it matters</h3>
            <p>{a.why}</p>
          </section>
          <section className={s.q}>
            <h3>What happens after you approve</h3>
            <p>{a.after}</p>
          </section>
          {a.changes.length > 0 && (
            <section className={s.q} data-wide="">
              <h3>What changed in {a.revision}</h3>
              <ul role="list">
                {a.changes.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          )}
          {a.subject && (
            <section className={s.q} data-wide="">
              <h3>Related</h3>
              <p>
                <Chip href={hrefFor(a.subject)} icon={REF_ICON[a.subject.kind]}>
                  {a.subject.label}
                </Chip>
              </p>
            </section>
          )}
        </div>

        <div className={s.split}>
          <section aria-labelledby="discussion-title">
            <h3 className={s.sectionTitle} id="discussion-title">
              Discussion
            </h3>
            <CommentBox kind="approval" id={a.id} placeholder="Ask a question or leave a note…" disabled={can(role, "comment") ? undefined : "Your role can view approvals but not comment."} />
          </section>
          <section aria-labelledby="audit-title">
            <h3 className={s.sectionTitle} id="audit-title">
              History
            </h3>
            <ol className={s.audit} role="list">
              {a.audit.map((e, i) => {
                const p = people[e.actorId];
                return (
                  <li key={i} className={s.auditItem} data-action={e.action}>
                    <span className={s.auditDot} aria-hidden="true" />
                    <span>
                      <strong>{p?.name ?? "Someone"}</strong> {ACTION[e.action]} · {e.revision}
                      {e.note && <span className={s.auditNote}>“{e.note}”</span>}
                    </span>
                    <time className={s.auditTime} dateTime={e.at}>
                      {fmtDate(e.at, tz, "dayTime")}
                    </time>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </div>
      <div className={s.decisionDock}>
        <Decision
          key={a.id}
          id={a.id}
          state={a.state}
          impact={a.impact}
          canApprove={can(role, "approve")}
          roleLabel={ROLE_LABEL[role]}
          outcome={outcome}
          confirmLines={a.figures?.map((f) => `${f.label}: ${f.value}`)}
          nextHref={nextHref}
        />
      </div>
    </Panel>
  );
}
