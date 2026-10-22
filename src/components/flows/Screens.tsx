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

/** A screen always renders in the app it depicts, even when an agent is the one acting in it. */
const HOME_APP: Partial<Record<Screen["t"], FlowSystem>> = {
  ticket: { name: "Zendesk", logo: "zendesk" },
};

export function ScreenWindow({ sys: actor, screen }: { sys: FlowSystem; screen: Screen }) {
  const sys = actor.name === "Agent" && screen.t !== "agent" ? (HOME_APP[screen.t] ?? actor) : actor;
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
          <div className={s.toast} data-after="arrive">
            <i /> New order {x.id} · {x.total}
          </div>
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
          <div data-scroll="pane" className={s.pane}>
            <div className={s.shopGrid}>
              <div className={s.cardL}>
                <p className={s.h}>Unfulfilled ({x.items.length})</p>
                {x.items.map(([name, q, price], i) => (
                  <div key={name} className={s.line} data-cue={`item${i}`} style={d(i)}>
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
                <p className={s.h}>Fraud analysis</p>
                <p className={s.okText} data-cue="risk">
                  Low · recommendation: fulfill
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    case "payment":
      return (
        <div className={s.stripe}>
          <p className={s.dim}>Payment</p>
          <div className={s.amount} data-cue="amount" style={d(0)}>
            {x.amount} <span>USD</span>{" "}
            <span data-before="capture">
              <Pill t="warn">Pending</Pill>
            </span>
            <span data-after="capture" className={s.pop}>
              <Pill t="ok">Succeeded</Pill>
            </span>
          </div>
          <div className={s.kv} style={d(1)}>
            <span>Customer</span>
            <b>{x.customer}</b>
            <span>Payment method</span>
            <b data-cue="method">{x.method}</b>
            <span>Risk evaluation</span>
            <b className={s.okText} data-cue="risk">
              {x.risk}
            </b>
          </div>
          <div className={s.timeline}>
            {x.events.map((e, i) => (
              <span key={e} style={d(i + 2)} {...(i > 0 ? { "data-after": "capture" } : {})}>
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
            <span>input</span> <span data-type="input">{x.input}</span>
          </p>
          <p className={s.thinkingRow} data-before="out">
            <i />
            <i />
            <i />
          </p>
          <pre className={s.json} data-after="out">
            {"{\n"}
            {x.out.map(([k, v], i) => (
              <span key={k} style={d(i)}>
                {"  "}
                <em>&quot;{k}&quot;</em>: <b>&quot;{v}&quot;</b>
                {i < x.out.length - 1 ? ",\n" : "\n"}
              </span>
            ))}
            {"}"}
          </pre>
          <p className={s.verdict} data-t={x.tone} data-after="out" data-cue="verdict" style={d(x.out.length)}>
            {x.verdict}
          </p>
        </div>
      );
    case "receipt":
      return (
        <div className={s.qb}>
          <div className={s.qbTop}>
            <b>{x.doc}</b>
            <span data-after="save" className={s.pop}>
              <Pill t="ok">{x.badge}</Pill>
            </span>
          </div>
          <p className={s.dim}>
            {x.doc.startsWith("Bill") ? "Vendor" : "Customer"} · <b className={s.ink}>{x.party}</b>
          </p>
          <div className={s.qbTable}>
            <span className={s.th}>Product/service</span>
            <span className={s.th}>Amount</span>
            {x.lines.map(([a, b], i) => (
              <span key={a} className={s.qbRow} data-cue={`line${i}`} style={d(i)}>
                <span>{a}</span>
                <span>{b}</span>
              </span>
            ))}
          </div>
          <div className={s.qbFoot}>
            <span>
              Total <b>{x.total}</b>
            </span>
            <span className={s.btnGreen} data-cue="save" data-before="save">
              Save and close
            </span>
            <span className={s.savedNote} data-after="save">
              ✓ Saved
            </span>
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
            <p className={s.para} style={d(2)}>
              {x.folder === "Inbox" ? x.body[0] : <span data-type="body">{x.body[0]}</span>}
            </p>
            {x.body.slice(1).map((p, i) => (
              <p key={i} className={s.para} style={d(i + 3)}>
                {p}
              </p>
            ))}
            {x.attach && (
              <span className={s.attach} data-cue="attach" style={d(4)}>
                <i>PDF</i>
                {x.attach}
                <small data-after="attach">· read by agent</small>
              </span>
            )}
            {x.folder !== "Inbox" && (
              <>
                <span className={s.sendBtn} data-cue="send" data-before="send" style={d(4)}>
                  Send
                </span>
                <span className={s.sentNote} data-after="send">
                  Message sent
                </span>
              </>
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
            <div className={s.msgOld}>
              <span className={s.av}>J</span>
              <p>
                <b>Jordan</b> <span className={s.dim}>1:48 PM</span>
                <br />
                Thanks, all. Picking this up after lunch.
              </p>
            </div>
            <div className={s.msg} data-after="post">
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
                  <div className={s.actions} data-before="approve">
                    {x.actions.map((a, i) => (
                      <span key={a} data-primary={i === 0 || undefined} {...(i === 0 ? { "data-cue": "approve" } : {})}>
                        {a}
                      </span>
                    ))}
                  </div>
                )}
                {x.approved && (
                  <p className={s.approved} data-after="approve">
                    ✓ {x.approved}
                  </p>
                )}
                {!x.actions && (
                  <span className={s.react} data-cue="react">
                    <span data-before="react">☺︎+</span>
                    <span data-after="react">✅ 1</span>
                  </span>
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
          <div className={s.tfPane}>
            <div data-scroll="pane" className={s.pane}>
              {x.answers.map(([q, a], i) => (
                <div key={q} className={s.qa} data-cue={`a${i}`} style={d(i)}>
                  <small>
                    {i + 1} → {q}
                  </small>
                  <b>{a}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case "crm":
      return (
        <div className={s.hub}>
          <div className={s.toast} data-after="saved">
            <i /> {x.kind === "Contact" ? "Contact created" : "Deal updated"}
          </div>
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
                <span key={st} data-on={i < (x.at ?? 0) || undefined} {...(i === (x.at ?? 0) ? { "data-cue": "advance" } : {})}>
                  {st}
                </span>
              ))}
            </div>
          )}
          <div className={s.props}>
            {x.props.map(([k, v], i) => (
              <span key={k} style={d(i + 1)} {...(i === 0 ? { "data-cue": "p0" } : {})} {...(v === "Unassigned" ? { "data-cue": "owner" } : {})}>
                <small>{k}</small>
                {v === "Unassigned" ? (
                  <>
                    <span data-before="owner">Unassigned</span>
                    <span data-after="owner" className={s.pop}>
                      AE · West
                    </span>
                  </>
                ) : (
                  v
                )}
              </span>
            ))}
          </div>
        </div>
      );
    case "calendar": {
      const col = ["Mon", "Tue", "Wed", "Thu", "Fri"].findIndex((dd) => x.day.startsWith(dd));
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
            <span className={s.busy} style={{ "--col": (col + 2) % 5, "--top": "8px" } as CSSProperties}>
              Team sync
            </span>
            <span className={s.busy} style={{ "--col": (col + 4) % 5, "--top": "112px" } as CSSProperties}>
              1:1
            </span>
            <span className={s.slot} data-cue="slot" style={{ "--col": col } as CSSProperties} />
            <div className={s.event} data-after="drop" style={{ "--col": col } as CSSProperties}>
              <b>{x.title}</b>
              <span>{x.time}</span>
              <span>{x.who.join(", ")}</span>
            </div>
          </div>
        </div>
      );
    }
    case "ticket":
      return (
        <div className={s.zd}>
          <div className={s.zdTop}>
            <b>{x.subject}</b>
            <span className={s.dim}>{x.id}</span>
            {x.tags.map((t) =>
              t === "solved" ? (
                <span key={t} data-after="submit" className={s.pop}>
                  <Pill t="ok">solved</Pill>
                </span>
              ) : (
                <Pill key={t} t={t === "ai-draft" ? "info" : "muted"}>
                  {t}
                </Pill>
              ),
            )}
          </div>
          <div className={s.zdMsg} data-cue="message" style={d(0)}>
            <span className={s.av}>{x.requester[0]}</span>
            <div>
              <b>{x.requester}</b>
              <p>{x.message}</p>
            </div>
          </div>
          {x.draft && (
            <div className={s.zdDraft} data-public={x.solved || undefined} style={d(1)}>
              <small>{x.solved ? "Public reply" : "Draft reply · AI · needs approval"}</small>
              <p>{x.solved ? x.draft : <span data-type="draft">{x.draft}</span>}</p>
            </div>
          )}
          <div className={s.zdBar} style={d(2)}>
            {x.solved ? (
              <>
                <span data-cue="submit" data-before="submit">
                  Submit as Solved
                </span>
                <span data-after="submit" data-solved="">
                  ✓ Solved
                </span>
              </>
            ) : (
              <span>Submit as Open</span>
            )}
          </div>
        </div>
      );
    case "doc":
      return (
        <div className={s.notion}>
          <div data-scroll="pane" className={s.pane}>
            <span className={s.nIcon}>{x.icon}</span>
            <p className={s.nTitle}>{x.title}</p>
            {x.blocks.map((b, i) => (
              <p key={i} className={s.nBlock} {...(x.hl.includes(i) ? { "data-cue": "hl", "data-hlb": "" } : {})} style={d(i)}>
                {x.hl.includes(i) && <span className={s.hlMark} data-after="hl" />}
                {b}
              </p>
            ))}
            <p className={s.nCite} data-after="hl">
              Retrieved by agent · passage cited in the reply
            </p>
          </div>
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
            {x.app === "sheets" &&
              x.cols.map((_, i) => (
                <span key={i} className={s.colL}>
                  {String.fromCharCode(65 + i)}
                </span>
              ))}
            {x.cols.map((c) => (
              <span key={c} className={s.th}>
                {c}
              </span>
            ))}
            {x.rows.map((r, ri) =>
              r.map((cell, ci) => (
                <span
                  key={`${ri}-${ci}`}
                  className={s.td}
                  data-row={ri === x.hl ? "hl" : undefined}
                  style={d(ri)}
                  {...(ci === 0 && ri < x.hl ? { "data-cue": `row${ri}` } : {})}
                  {...(ci === 0 && ri === x.hl ? { "data-cue": "match" } : {})}
                >
                  {ri === x.hl && ci === r.length - 1 && x.app === "sheets" ? <span data-type="cell">{cell}</span> : cell}
                </span>
              )),
            )}
          </div>
        </div>
      );
    case "chart": {
      const max = Math.max(...x.series);
      const peak = x.series.indexOf(max);
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
              <i key={i} data-hot={v > max / 3 || undefined} {...(i === peak ? { "data-cue": "spike" } : {})} style={{ "--h": `${(v / max) * 100}%`, ...d(i / 2) } as CSSProperties}>
                {i === peak && (
                  <span className={s.tip} data-after="tip">
                    {x.events}
                  </span>
                )}
              </i>
            ))}
          </div>
          <p className={s.badText}>First seen 3 minutes after deploy</p>
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
            <div key={sha} className={s.commit} data-cue={`c${i}`} data-flag={flag || undefined} style={d(i)}>
              <span>
                <b>
                  {msg}{" "}
                  {flag && (
                    <span data-after="suspect" className={s.pop}>
                      <Pill t="bad">suspect</Pill>
                    </span>
                  )}
                </b>
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
            <p className={s.lTitle}>
              <span data-type="title">{x.title}</span>
            </p>
            <p className={s.lBody} style={d(1)}>
              {x.body}
            </p>
          </div>
          <div className={s.lSide} style={d(2)}>
            <span>
              <small>Status</small>○ {x.status}
            </span>
            <span data-cue="priority" className={s.lPick}>
              <small>Priority</small>
              <b data-before="urgent" className={s.dim}>
                — No priority
              </b>
              <b data-after="urgent" className={`${s.urgent} ${s.pop}`}>
                ! {x.priority}
              </b>
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
            <span className={s.pulseBadge}>
              <Pill t="bad">Triggered</Pill>
            </span>{" "}
            <Pill t="warn">{x.urgency} urgency</Pill>
          </p>
          <p className={s.pdTitle} style={d(0)}>
            {x.title}
          </p>
          <p className={s.dim}>
            {x.service} · assigned to <b className={s.ink}>{x.oncall}</b>
          </p>
          <div className={s.timeline}>
            {x.steps.map(([a, b], i) => (
              <span key={a} style={d(i + 1)} {...(i === 1 ? { "data-after": "page", "data-cue": "notify" } : {})}>
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
          <div className={s.aHead}>
            <p className={s.aTitle}>{x.project}</p>
            <span className={s.aBtn} data-cue="assign">
              <span data-before="assign">Assign all</span>
              <span data-after="assign">✓ Assigned</span>
            </span>
          </div>
          {x.sections.map(([sec, items], si) => (
            <div key={sec}>
              <p className={s.aSec}>{sec}</p>
              {items.map(([t, who, due], i) => (
                <div key={t} className={s.aRow} data-cue={`t${si * 3 + i}`} style={d(si * 3 + i)}>
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
          <div className={s.dHead}>
            <p className={s.crumbs}>{x.path.join("  ›  ")}</p>
            <span className={s.newBtn} data-cue="new">
              + New
            </span>
          </div>
          <div className={s.fileGrid}>
            {x.files.map(([name, kind], i) => (
              <span key={name} className={s.file} data-kind={kind} style={d(i)} {...(i === 0 ? { "data-after": "folder" } : {})}>
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
          <div className={s.done} data-after="done" data-cue="doneBar">
            ✓ Completed · all parties have signed
          </div>
          <div className={s.paper} style={d(1)}>
            <b>{x.doc}</b>
            <span className={s.lines} />
            <span className={s.lines} />
            <svg className={s.sigSvg} viewBox="0 0 160 40" data-after="sign" aria-hidden="true">
              <path d="M6 28c10-18 18-22 20-12s-6 16-2 14 10-20 16-18-2 16 4 14 8-12 14-12 0 10 6 9 10-8 16-8 4 6 10 5 12-6 20-6 10 3 18 2" fill="none" stroke="#1f3a8a" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          {x.signers.map(([who, st], i) => (
            <p key={who} className={s.signer} style={d(i + 2)}>
              {who}{" "}
              <span data-after={i === 0 ? "sign" : "done"} className={s.pop}>
                <Pill t="ok">{st}</Pill>
              </span>
            </p>
          ))}
        </div>
      );
    case "terminal":
      return (
        <pre className={s.term}>
          <span>
            <em>{x.prompt} </em>
            <span data-type="query">{x.lines[0]}</span>
            {"\n"}
          </span>
          {x.lines.slice(1).map((l, i) => (
            <span key={i} data-after="run" style={d(i)}>
              {l}
              {"\n"}
            </span>
          ))}
        </pre>
      );
  }
}
