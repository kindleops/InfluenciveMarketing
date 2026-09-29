import { brand } from "@/config/brand";
import { requirePortal } from "@/portal/server";
import { can, ROLE_LABEL } from "@/portal/access";
import { Avatar, PageHead, Panel, PanelHead, PButton, PLink, Tip } from "@/components/portal/ui";
import s from "@/components/portal/secondary/secondary.module.css";

export const metadata = { title: "Team" };

export default async function TeamPage() {
  const { session, source } = await requirePortal();
  const [team, users] = await Promise.all([source.team(), source.clientUsers()]);
  const sorted = [...team].sort((a, b) => Number(!!b.lead) - Number(!!a.lead));
  return (
    <>
      <PageHead title="Team" lead={`The people at ${brand.name} working on ${session.client.name}, and who on your side has access.`} />
      <div className={s.stack}>
        <section aria-labelledby="studio-title">
          <h2 className="sr-only" id="studio-title">
            Your {brand.name} team
          </h2>
          <ul className={s.people} role="list">
            {sorted.map((t) => (
              <li key={t.id}>
                <Panel as="div" glass={t.lead} className={s.card}>
                  <div className={s.cardTop}>
                    <Avatar id={t.id} name={t.name} size={48} />
                    <div>
                      <p className={s.cardName}>{t.name}</p>
                      <p className={s.cardTitle}>{t.title}</p>
                      {t.lead && <p className={s.lead}>Engagement lead</p>}
                    </div>
                  </div>
                  {t.focus && <p className={s.cardFocus}>{t.focus}</p>}
                  <PLink href={`/portal/messages?compose=1&subject=${encodeURIComponent(`For ${t.name.split(" ")[0]}`)}`} size="sm" variant="secondary" icon="messages">
                    Message
                  </PLink>
                </Panel>
              </li>
            ))}
          </ul>
        </section>
        <Panel as="section" aria-labelledby="client-title">
          <PanelHead
            title={`${session.client.name} team`}
            id="client-title"
            action={
              can(session.user.role, "invite") ? (
                <Tip tip="Invitations open once sign-in is connected. Until then, your team can add people for you.">
                  <PButton size="sm" variant="secondary" icon="plus" aria-disabled="true">
                    Invite
                  </PButton>
                </Tip>
              ) : undefined
            }
          />
          <ul className={s.rows} role="list">
            {users.map((u) => (
              <li key={u.id} className={s.row}>
                <Avatar id={u.id} name={u.name} side="client" size={36} />
                <span className={s.rowText}>
                  <span className={s.rowTitle}>
                    {u.name}
                    {u.id === session.user.id && <span style={{ color: "var(--text-muted)", fontWeight: 400 }}> · you</span>}
                  </span>
                  <span className={s.rowMeta}>
                    {u.title} · {u.email}
                  </span>
                </span>
                <span className={s.rowSide}>
                  <span className={s.rowMeta}>{ROLE_LABEL[u.id === session.user.id ? session.user.role : u.role]}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
