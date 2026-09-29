import { requirePortal } from "@/portal/server";
import { can } from "@/portal/access";
import { fmtDate, money, until } from "@/portal/format";
import type { Invoice } from "@/portal/model";
import { DownloadButton } from "@/components/portal/StageTools";
import { Chip, Empty, Meter, PageHead, Panel, PanelHead, Person, Status } from "@/components/portal/ui";
import s from "@/components/portal/vault/vault.module.css";

export const metadata = { title: "Billing" };

const INV: Record<Invoice["status"], { label: string; tone: "done" | "attention" | "blocked" | "progress" }> = {
  paid: { label: "Paid", tone: "done" },
  due: { label: "Due", tone: "attention" },
  overdue: { label: "Overdue", tone: "blocked" },
  processing: { label: "Processing", tone: "progress" },
};
const WORK = { approved: "Approved", in_progress: "In progress", invoiced: "Invoiced" } as const;

export default async function BillingPage() {
  const { session, source } = await requirePortal();
  const now = Date.now();
  const tz = session.client.timezone;
  const cur = session.client.currency;
  if (!can(session.user.role, "billing"))
    return (
      <>
        <PageHead title="Billing" />
        <Panel>
          <Empty center icon="lock" title="Billing is visible to owners and admins." body="Ask an owner on your account if you need an invoice or a copy of the agreement." />
        </Panel>
      </>
    );
  const [billing, people] = await Promise.all([source.billing(), source.people()]);
  if (!billing)
    return (
      <>
        <PageHead title="Billing" />
        <Panel>
          <Empty center icon="billing" title="No billing details yet." body="Your engagement, invoices and payment details appear here once the agreement is in place." />
        </Panel>
      </>
    );
  const e = billing.engagement;
  const open = billing.invoices.filter((i) => i.status !== "paid");

  return (
    <>
      <PageHead title="Billing" lead="Your engagement, invoices and any additional work you’ve approved — all in one place." />
      <div className={s.billing}>
        <div className={s.col}>
          <Panel glass className={s.plan} aria-label="Engagement">
            <div className={s.planTop}>
              <div>
                <p className={s.planName}>{e.name}</p>
                <p className={s.planSub}>{e.plan}</p>
              </div>
              <p className={s.amount}>
                <strong>{money(e.retainer, cur)}</strong>
                <span>per month</span>
              </p>
            </div>
            <ul className={s.scope} role="list" aria-label="Scope">
              {e.scope.map((x) => (
                <li key={x}>
                  <Chip>{x}</Chip>
                </li>
              ))}
            </ul>
            <dl className={s.planFacts}>
              <div>
                <dt>Next invoice</dt>
                <dd>
                  {fmtDate(e.nextBillingDate, tz, "day")} · {until(e.nextBillingDate, now, tz)}
                </dd>
              </div>
              <div>
                <dt>Started</dt>
                <dd>{fmtDate(e.startedAt, tz, "day")}</dd>
              </div>
              <div>
                <dt>Term</dt>
                <dd>{e.term}</dd>
              </div>
            </dl>
            <Person person={people[e.leadId]} size={30} sub={people[e.leadId] ? `${people[e.leadId].title} · engagement lead` : undefined} />
          </Panel>

          <Panel as="section" aria-labelledby="inv-title">
            <PanelHead title="Invoices" id="inv-title" meta={open.length ? `${open.length} open` : "All paid"} />
            <table className={s.table}>
              <caption className="sr-only">Invoices</caption>
              <thead>
                <tr>
                  <th scope="col">Invoice</th>
                  <th scope="col" className={s.hideSm}>
                    Issued
                  </th>
                  <th scope="col">Due</th>
                  <th scope="col" className={s.right}>
                    Amount
                  </th>
                  <th scope="col">Status</th>
                  <th scope="col" className={s.hideSm}>
                    <span className="sr-only">Download</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {billing.invoices.map((i) => (
                  <tr key={i.id}>
                    <td title={i.lines.map((l) => `${l.label}: ${money(l.amount, cur)}`).join("\n")}>{i.number}</td>
                    <td className={s.hideSm}>{fmtDate(i.issuedAt, tz, "day")}</td>
                    <td>{fmtDate(i.dueAt, tz, "dayShort")}</td>
                    <td className={s.right}>{money(i.amount, cur)}</td>
                    <td>
                      <Status tone={INV[i.status].tone} label={INV[i.status].label} />
                    </td>
                    <td className={`${s.right} ${s.hideSm}`}>
                      <DownloadButton name={`${i.number}.pdf`} allowed label="PDF" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>

        <div className={s.col}>
          <Panel as="section" aria-labelledby="extra-title">
            <PanelHead title="Additional approved work" id="extra-title" />
            {billing.additionalWork.length ? (
              <ul className={s.rows} role="list">
                {billing.additionalWork.map((w) => (
                  <li key={w.id} className={s.rowItem}>
                    <span>{w.title}</span>
                    <span className={s.money}>{money(w.amount, cur)}</span>
                    <small>
                      Approved {fmtDate(w.approvedAt, tz, "day")} · {WORK[w.status]}
                    </small>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty icon="check" title="Nothing outside the retainer." body="Any work beyond your plan is quoted and approved here before it starts." />
            )}
          </Panel>

          {billing.mediaManaged && (
            <Panel as="section" aria-labelledby="media-title">
              <PanelHead title="Media under management" id="media-title" meta="This month" />
              <div className={s.pad}>
                <span style={{ display: "flex", justifyContent: "space-between" }} className="tnum">
                  <span>{money(billing.mediaManaged.spent, cur)} spent</span>
                  <span style={{ color: "var(--text-muted)" }}>{money(billing.mediaManaged.planned, cur)} planned</span>
                </span>
                <Meter value={billing.mediaManaged.spent} max={billing.mediaManaged.planned} label="Media spent against plan" />
                <span style={{ color: "var(--text-muted)" }}>Ad spend is billed by each platform directly to your account — it isn’t part of these invoices.</span>
              </div>
            </Panel>
          )}

          <Panel as="section" aria-labelledby="pay-title">
            <PanelHead title="Payment" id="pay-title" />
            <div className={s.pad}>
              <span>{billing.paymentMethod ? `${billing.paymentMethod.brand} ending ${billing.paymentMethod.last4}` : "No payment method on file"}</span>
              {billing.billingContact && <span style={{ color: "var(--text-muted)" }}>Invoices go to {billing.billingContact}</span>}
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
