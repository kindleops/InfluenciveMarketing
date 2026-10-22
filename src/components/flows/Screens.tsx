import type { CSSProperties, ReactNode } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { FlowSystem } from "@/content/flows";
import type { Screen } from "@/content/flow-screens";
import s from "./screens.module.css";

/*
 * Simplified recreations of the tools a flow touches, each in its own
 * visual language (light or dark, accent, layout), filled with the step's
 * example data. Drawn, not captured; labelled illustrative by the theater.
 */

type Look = { url: string; dark?: boolean; accent: string };

const LOOK: Record<string, Look> = {
  Shopify: { url: "admin.shopify.com/store/northwind/orders/1042", accent: "#008060" },
  Stripe: { url: "dashboard.stripe.com/payments", accent: "#635bff" },
  Agent: { url: "agents.northwind.app/runs", dark: true, accent: "#8f9bff" },
  QuickBooks: { url: "qbo.intuit.com/app/transactions", accent: "#2ca01c" },
  Gmail: { url: "mail.google.com/mail/u/0", accent: "#c5221f" },
  Slack: { url: "app.slack.com/client", accent: "#4a154b" },
  Typeform: { url: "admin.typeform.com/responses", accent: "#262627" },
  HubSpot: { url: "app.hubspot.com/contacts", accent: "#ff5c35" },
  "Google Calendar": { url: "calendar.google.com/calendar/r/week", accent: "#1a73e8" },
  Zendesk: { url: "northwind.zendesk.com/agent/tickets/5521", accent: "#03363d" },
  Notion: { url: "notion.so/northwind/Shipping-policy", accent: "#37352f" },
  Airtable: { url: "airtable.com/app/purchase-orders", accent: "#166ee1" },
  "Google Sheets": { url: "docs.google.com/spreadsheets", accent: "#188038" },
  Sentry: { url: "northwind.sentry.io/issues/4821", accent: "#6c5fc7" },
  GitHub: { url: "github.com/northwind/checkout-api/commits", dark: true, accent: "#2f81f7" },
  Linear: { url: "linear.app/northwind/issue/PAY-219", dark: true, accent: "#5e6ad2" },
  PagerDuty: { url: "northwind.pagerduty.com/incidents", accent: "#048a24" },
  Asana: { url: "app.asana.com/0/northwind-onboarding", accent: "#f06a6a" },
  "Google Drive": { url: "drive.google.com/drive/shared-drives", accent: "#1a73e8" },
  "E-signature": { url: "sign.northwind.app/envelopes", accent: "#2b59c3" },
  PostgreSQL: { url: "psql · recon@db-primary", dark: true, accent: "#336791" },
  Snowflake: { url: "app.snowflake.com/worksheets", accent: "#1a8fd6" },
};

const d = (i: number) => ({ "--d": `${i * 90 + 180}ms` }) as CSSProperties;

export function ScreenWindow({ sys, screen }: { sys: FlowSystem; screen: Screen }) {
  const look = LOOK[sys.name] ?? { url: sys.name.toLowerCase(), accent: "#8f9bff" };
  return (
    <div className={s.win} data-dark={look.dark || undefined} style={{ "--acc": look.accent } as CSSProperties}>
      <div className={s.chrome}>
        <span className={s.lights}>
          <i />
          <i />
          <i />
        </span>
        <span className={s.url}>
          {sys.logo ? <BrandLogo slug={sys.logo} size={11} /> : <b>{sys.mono}</b>}
          {look.url}
        </span>
      </div>
      <div className={s.body}>
        <Body screen={screen} />
      </div>
    </div>
  );
}

function Pill({ children, t = "muted" }: { children: ReactNode; t?: string }) {
  return (
    <span className={s.pill} data-t={t}>
      {children}
    </span>
  );
}

function Body({ screen: x }: { screen: Screen }) {
  switch (x.t) {
    case "order":
      return (
        <div className={s.shop}>
          <div className={s.shopTop}>
            <b>Orders</b>
            <span>›</span>
            <b>{x.id}</b>
            {x.badges.map(([l, t]) => (
              <Pill key={l} t={t}>
                {l}
              </Pill>
            ))}
          </div>
          <div className={s.shopGrid}>
            <div className={s.cardL}>
              <p className={s.h}>Unfulfilled ({x.items.length})</p>
              {x.items.map(([name, q, price], i) => (
                <div key={name} className={s.line} style={d(i)}>
                  <span className={s.thumb} />
                  <span className={s.grow}>{name}</span>
                  <span className={s.dim}>× {q}</span>
                  <b>{price}</b>
                </div>
              ))}
              <div className={s.totalRow} style={d(3)}>
                <span>Total</span>
                <b>{x.total}</b>
              </div>
            </div>
            <div className={s.cardR} style={d(1)}>
              <p className={s.h}>Customer</p>
              <p>{x.customer}</p>
              <p className={s.h}>Risk</p>
              <p className={s.okText}>Low recommendation</p>
            </div>
          </div>
        </div>
      );
    case "payment":
      return (
        <div className={s.stripe}>
          <p className={s.dim}>Payment</p>
          <div className={s.amount} style={d(0)}>
            {x.amount} <span>USD</span> <Pill t="ok">Succeeded</Pill>
          </div>
          <div className={s.kv} style={d(1)}>
            <span>Customer</span>
            <b>{x.customer}</b>
            <span>Payment method</span>
            <b>{x.method}</b>
            <span>Risk evaluation</span>
            <b className={s.okText}>{x.risk}</b>
          </div>
          <div className={s.timeline}>
            {x.events.map((e, i) => (
              <span key={e} style={d(i + 2)}>
                <i />
                {e}
              </span>
            ))}
          </div>
        </div>
      );
    case "agent":
      return (
        <div className={s.agent}>
          <div className={s.agentHead}>
            <span className={s.orb} />
            <b>{x.task}</b>
            <span className={s.dim}>run · structured output</span>
          </div>
          <p className={s.input} style={d(0)}>
            <span>input</span> {x.input}
          </p>
          <pre className={s.json} style={d(1)}>
            {"{\n"}
            {x.out.map(([k, v], i) => (
              <span key={k} style={d(i + 2)}>
                {"  "}
                <em>&quot;{k}&quot;</em>: <b>&quot;{v}&quot;</b>
                {i < x.out.length - 1 ? ",\n" : "\n"}
              </span>
            ))}
            {"}"}
          </pre>
          <p className={s.verdict} data-t={x.tone} style={d(x.out.length + 2)}>
            {x.verdict}
          </p>
        </div>
      );
    case "receipt":
      return (
        <div className={s.qb}>
          <div className={s.qbTop}>
            <b>{x.doc}</b>
            <Pill t="ok">{x.badge}</Pill>
          </div>
          <p className={s.dim}>
            {x.doc.startsWith("Bill") ? "Vendor" : "Customer"} · <b className={s.ink}>{x.party}</b>
          </p>
          <div className={s.qbTable}>
            <span className={s.th}>Product/service</span>
            <span className={s.th}>Amount</span>
            {x.lines.map(([a, b], i) => (
              <span key={a} className={s.qbRow} style={d(i)}>
                <span>{a}</span>
                <span>{b}</span>
              </span>
            ))}
          </div>
          <div className={s.qbTotal} style={d(x.lines.length)}>
            Total <b>{x.total}</b>
          </div>
        </div>
      );
    case "email":
      return (
        <div className={s.gmail}>
          <div className={s.gSide}>
            <span className={s.compose}>Compose</span>
            {["Inbox", "Starred", "Sent", "Drafts"].map((f) => (
              <span key={f} data-on={f === x.folder || undefined}>
                {f}
              </span>
            ))}
          </div>
          <div className={s.gMain}>
            <p className={s.subject} style={d(0)}>
              {x.subject} <Pill>{x.folder}</Pill>
            </p>
            <div className={s.from} style={d(1)}>
              <span className={s.av}>{x.from[0]}</span>
              <span>
                <b>{x.from}</b>
                <small>to {x.to}</small>
              </span>
            </div>
            {x.body.map((p, i) => (
              <p key={i} className={s.para} style={d(i + 2)}>
                {p}
              </p>
            ))}
            {x.attach && (
              <span className={s.attach} style={d(4)}>
                <i>PDF</i>
                {x.attach}
              </span>
            )}
            {x.sent && (
              <span className={s.sentNote} style={d(4)}>
                Message sent
              </span>
            )}
          </div>
        </div>
      );
    case "chat":
      return (
        <div className={s.slack}>
          <div className={s.sSide}>
            <b>Northwind</b>
            {["general", x.channel, "random"].map((c) => (
              <span key={c} data-on={c === x.channel || undefined}>
                # {c}
              </span>
            ))}
          </div>
          <div className={s.sMain}>
            <p className={s.sHead}># {x.channel}</p>
            <div className={s.msg} style={d(0)}>
              <span className={s.botAv}>A</span>
              <div>
                <p>
                  <b>Automations</b> <span className={s.app}>APP</span> <span className={s.dim}>2:02 PM</span>
                </p>
                <p className={s.msgText}>{x.text}</p>
                {x.fields && (
                  <div className={s.fields}>
                    {x.fields.map(([k, v], i) => (
                      <span key={k} style={d(i + 1)}>
                        <small>{k}</small>
                        {v}
                      </span>
                    ))}
                  </div>
                )}
                {x.actions && (
                  <div className={s.actions} style={d(2)}>
                    {x.actions.map((a, i) => (
                      <span key={a} data-primary={i === 0 || undefined}>
                        {a}
                      </span>
                    ))}
                  </div>
                )}
                {x.approved && (
                  <p className={s.approved} style={d(5)}>
                    ✓ {x.approved}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    case "form":
      return (
        <div className={s.tf}>
          <p className={s.tfTitle}>
            {x.title} <Pill>New response</Pill>
          </p>
          {x.answers.map(([q, a], i) => (
            <div key={q} className={s.qa} style={d(i)}>
              <small>
                {i + 1} → {q}
              </small>
              <b>{a}</b>
            </div>
          ))}
        </div>
      );
    case "crm":
      return (
        <div className={s.hub}>
          <div className={s.hubTop}>
            <span className={s.hubAv}>{x.name[0]}</span>
            <span>
              <small>{x.kind}</small>
              <b>{x.name}</b>
              <span className={s.dim}>{x.sub}</span>
            </span>
          </div>
          {x.stage && (
            <div className={s.stages} style={d(0)}>
              {x.stage.map((st, i) => (
                <span key={st} data-on={i <= (x.at ?? 0) || undefined}>
                  {st}
                </span>
              ))}
            </div>
          )}
          <div className={s.props}>
            {x.props.map(([k, v], i) => (
              <span key={k} style={d(i + 1)}>
                <small>{k}</small>
                {v}
              </span>
            ))}
          </div>
        </div>
      );
    case "calendar":
      return (
        <div className={s.cal}>
          <div className={s.calHead}>
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((dd) => (
              <span key={dd} data-on={x.day.startsWith(dd) || undefined}>
                {dd}
                <b>{x.day.startsWith(dd) ? x.day.split(" ")[1] : ""}</b>
              </span>
            ))}
          </div>
          <div className={s.calGrid}>
            {["9 AM", "10 AM", "11 AM", "12 PM"].map((h) => (
              <span key={h} className={s.hour}>
                {h}
              </span>
            ))}
            <div className={s.event} style={{ ...d(0), "--col": ["Mon", "Tue", "Wed", "Thu", "Fri"].findIndex((dd) => x.day.startsWith(dd)) } as CSSProperties}>
              <b>{x.title}</b>
              <span>{x.time}</span>
              <span>{x.who.join(", ")}</span>
            </div>
          </div>
        </div>
      );
    case "ticket":
      return (
        <div className={s.zd}>
          <div className={s.zdTop}>
            <b>{x.subject}</b>
            <span className={s.dim}>{x.id}</span>
            {x.tags.map((t) => (
              <Pill key={t} t={t === "solved" ? "ok" : t === "ai-draft" ? "info" : "muted"}>
                {t}
              </Pill>
            ))}
          </div>
          <div className={s.zdMsg} style={d(0)}>
            <span className={s.av}>{x.requester[0]}</span>
            <div>
              <b>{x.requester}</b>
              <p>{x.message}</p>
            </div>
          </div>
          {x.draft && (
            <div className={s.zdDraft} data-public={x.solved || undefined} style={d(1)}>
              <small>{x.solved ? "Public reply · sent" : "Draft reply · AI · needs approval"}</small>
              <p>{x.draft}</p>
            </div>
          )}
          <div className={s.zdBar} style={d(2)}>
            <span data-solved={x.solved || undefined}>{x.solved ? "Solved" : "Submit as Open"}</span>
          </div>
        </div>
      );
    case "doc":
      return (
        <div className={s.notion}>
          <span className={s.nIcon}>{x.icon}</span>
          <p className={s.nTitle}>{x.title}</p>
          {x.blocks.map((b, i) => (
            <p key={i} className={s.nBlock} data-hl={x.hl.includes(i) || undefined} style={d(i)}>
              {b}
            </p>
          ))}
          <p className={s.nCite} style={d(4)}>
            Retrieved by agent · 2 passages cited
          </p>
        </div>
      );
    case "table":
      return (
        <div className={s.grid} data-app={x.app}>
          <div className={s.gridTop}>
            <b>{x.title}</b>
            {x.app === "snowflake" && <code className={s.sql}>{x.sql}</code>}
          </div>
          <div className={s.sheet} style={{ "--cols": x.cols.length } as CSSProperties}>
            {x.app === "sheets" && x.cols.map((_, i) => <span key={i} className={s.colL}>{String.fromCharCode(65 + i)}</span>)}
            {x.cols.map((c) => (
              <span key={c} className={s.th}>
                {c}
              </span>
            ))}
            {x.rows.map((r, ri) =>
              r.map((cell, ci) => (
                <span key={`${ri}-${ci}`} className={s.td} data-hl={ri === x.hl || undefined} style={d(ri)}>
                  {cell}
                </span>
              )),
            )}
          </div>
        </div>
      );
    case "chart": {
      const max = Math.max(...x.series);
      return (
        <div className={s.sentry}>
          <p className={s.sTitle}>
            <Pill t="bad">Unresolved</Pill> <Pill t="warn">Regression</Pill>
          </p>
          <p className={s.err} style={d(0)}>
            {x.issue}
          </p>
          <p className={s.dim}>{x.where}</p>
          <div className={s.bars}>
            {x.series.map((v, i) => (
              <i key={i} data-hot={v > max / 3 || undefined} style={{ "--h": `${(v / max) * 100}%`, ...d(i / 2) } as CSSProperties} />
            ))}
          </div>
          <p className={s.badText}>{x.events}</p>
        </div>
      );
    }
    case "commits":
      return (
        <div className={s.gh}>
          <p className={s.ghTop}>
            <b>{x.repo}</b> · Commits on main
          </p>
          {x.items.map(([sha, msg, who, flag], i) => (
            <div key={sha} className={s.commit} data-flag={flag || undefined} style={d(i)}>
              <span>
                <b>{msg}</b>
                <small>{who} committed 9 minutes ago</small>
              </span>
              <code>{sha}</code>
            </div>
          ))}
        </div>
      );
    case "issue":
      return (
        <div className={s.linear}>
          <div className={s.lMain}>
            <p className={s.dim}>
              {x.team} › {x.key}
            </p>
            <p className={s.lTitle} style={d(0)}>
              {x.title}
            </p>
            <p className={s.lBody} style={d(1)}>
              {x.body}
            </p>
          </div>
          <div className={s.lSide} style={d(2)}>
            <span>
              <small>Status</small>○ {x.status}
            </span>
            <span>
              <small>Priority</small>
              <b className={s.urgent}>! {x.priority}</b>
            </span>
            <span>
              <small>Labels</small>
              {x.labels.join(", ")}
            </span>
          </div>
        </div>
      );
    case "incident":
      return (
        <div className={s.pd}>
          <p>
            <Pill t="bad">Triggered</Pill> <Pill t="warn">{x.urgency} urgency</Pill>
          </p>
          <p className={s.pdTitle} style={d(0)}>
            {x.title}
          </p>
          <p className={s.dim}>
            {x.service} · assigned to <b className={s.ink}>{x.oncall}</b>
          </p>
          <div className={s.timeline}>
            {x.steps.map(([a, b], i) => (
              <span key={a} style={d(i + 1)}>
                <i />
                {a} <small>{b}</small>
              </span>
            ))}
          </div>
        </div>
      );
    case "tasks":
      return (
        <div className={s.asana}>
          <p className={s.aTitle}>{x.project}</p>
          {x.sections.map(([sec, items], si) => (
            <div key={sec}>
              <p className={s.aSec}>{sec}</p>
              {items.map(([t, who, due], i) => (
                <div key={t} className={s.aRow} style={d(si * 3 + i)}>
                  <span className={s.check} />
                  <span className={s.grow}>{t}</span>
                  <span className={s.dim}>{who}</span>
                  <span className={s.due}>{due}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    case "files":
      return (
        <div className={s.drive}>
          <p className={s.crumbs}>{x.path.join("  ›  ")}</p>
          <div className={s.fileGrid}>
            {x.files.map(([name, kind], i) => (
              <span key={name} className={s.file} data-kind={kind} style={d(i)}>
                <i />
                {name}
              </span>
            ))}
          </div>
        </div>
      );
    case "esign":
      return (
        <div className={s.esign}>
          <div className={s.done} style={d(0)}>
            ✓ Completed · all parties have signed
          </div>
          <div className={s.paper} style={d(1)}>
            <b>{x.doc}</b>
            <span className={s.lines} />
            <span className={s.lines} />
            <span className={s.sig}>Dana Ortiz</span>
          </div>
          {x.signers.map(([who, st], i) => (
            <p key={who} className={s.signer} style={d(i + 2)}>
              {who} <Pill t="ok">{st}</Pill>
            </p>
          ))}
        </div>
      );
    case "terminal":
      return (
        <pre className={s.term}>
          {x.lines.map((l, i) => (
            <span key={i} style={d(i)}>
              {i === 0 ? <em>{x.prompt} </em> : null}
              {l}
              {"\n"}
            </span>
          ))}
        </pre>
      );
  }
}
