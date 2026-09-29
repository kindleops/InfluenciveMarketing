import { requirePortal } from "@/portal/server";
import { ago } from "@/portal/format";
import type { Integration } from "@/portal/model";
import { Empty, PageHead, Panel, PanelHead, PLink, Status } from "@/components/portal/ui";
import s from "@/components/portal/secondary/secondary.module.css";

export const metadata = { title: "Integrations" };

const CAT: Record<Integration["category"], string> = {
  analytics: "Analytics",
  advertising: "Advertising",
  commerce: "Commerce",
  crm: "CRM",
  email: "Email",
  website: "Website",
};
const ST = {
  connected: { label: "Connected", tone: "positive" },
  attention: { label: "Needs attention", tone: "attention" },
  not_connected: { label: "Not connected", tone: "quiet" },
} as const;

export default async function IntegrationsPage() {
  const { session, source } = await requirePortal();
  const now = Date.now();
  const tz = session.client.timezone;
  const list = await source.integrations();
  const cats = [...new Set(list.map((i) => i.category))];
  const connected = list.filter((i) => i.status === "connected").length;
  return (
    <>
      <PageHead
        title="Integrations"
        lead={`The sources your portal reads from. ${connected} of ${list.length} connected — numbers only ever come from these.`}
      />
      {list.length === 0 ? (
        <Panel>
          <Empty center icon="integrations" title="No connections yet." body="Your team will list the accounts we need during onboarding." />
        </Panel>
      ) : (
        <div className={s.stack}>
          {cats.map((c) => (
            <Panel key={c} as="section" aria-labelledby={`cat-${c}`}>
              <PanelHead title={CAT[c]} id={`cat-${c}`} />
              <ul className={s.rows} role="list">
                {list
                  .filter((i) => i.category === c)
                  .map((i) => {
                    const st = ST[i.status];
                    return (
                      <li key={i.id} className={s.row}>
                        <span className={s.logo} aria-hidden="true">
                          {i.name
                            .split(/\s+/)
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join("")}
                        </span>
                        <span className={s.rowText}>
                          <span className={s.rowTitle}>{i.name}</span>
                          <span className={s.rowMeta}>
                            {i.account ?? "No account linked"}
                            {i.lastSync ? ` · synced ${ago(i.lastSync, now, tz).toLowerCase()}` : ""}
                          </span>
                          {i.note && <span className={s.rowNote}>{i.note}</span>}
                        </span>
                        <span className={s.rowSide}>
                          <Status tone={st.tone} label={st.label} />
                          {i.status !== "connected" && (
                            <PLink
                              href={`/portal/messages?compose=1&subject=${encodeURIComponent(`${i.status === "attention" ? "Reauthorize" : "Connect"} ${i.name}`)}`}
                              size="sm"
                              variant={i.status === "attention" ? "primary" : "secondary"}
                            >
                              {i.status === "attention" ? "Fix with the team" : "Ask to connect"}
                            </PLink>
                          )}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </Panel>
          ))}
          <p style={{ fontSize: "var(--p-fs-meta)", color: "var(--text-muted)" }}>
            Connections are made securely by your team with read-only access wherever possible. You can revoke any of them from the platform itself at any time.
          </p>
        </div>
      )}
    </>
  );
}
