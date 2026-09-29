import { brand } from "@/config/brand";
import { requirePortal } from "@/portal/server";
import { Avatar, Icon, Kbd, PageHead, Panel, PanelHead, PLink } from "@/components/portal/ui";
import s from "@/components/portal/secondary/secondary.module.css";

export const metadata = { title: "Help" };

const FAQ = [
  {
    q: "How do approvals work?",
    a: "Anything that needs your decision appears in Approvals and on Command. Each one explains what you’re approving, why it matters, what changed and what happens next. Approve, or request changes with a note — both are recorded with your name and the time.",
  },
  {
    q: "Where do the numbers come from?",
    a: "Only from the accounts listed in Integrations. We never estimate or fill in a number; if a source isn’t connected, the portal says so instead of showing a figure.",
  },
  {
    q: "Who can see what?",
    a: "Owners and admins can approve, invite and see billing. Members can approve and comment. Viewers can read and download. Your role is shown under Account.",
  },
  {
    q: "How quickly will the team reply?",
    a: "Messages go straight to the people named on the work. For anything urgent, say so in the subject line and your engagement lead will pick it up.",
  },
];

export default async function HelpPage() {
  const { source } = await requirePortal();
  const team = await source.team();
  const lead = team.find((t) => t.lead) ?? team[0];
  return (
    <>
      <PageHead title="Help" lead={`How the portal works, and how to reach the people running your account at ${brand.name}.`} />
      <div className={s.two}>
        <div className={s.stack}>
          {lead && (
            <Panel glass as="section" className={s.card} aria-label="Your engagement lead">
              <div className={s.cardTop}>
                <Avatar id={lead.id} name={lead.name} size={52} />
                <div>
                  <p className={s.cardName}>{lead.name}</p>
                  <p className={s.cardTitle}>{lead.title} · your engagement lead</p>
                </div>
              </div>
              <p className={s.cardFocus}>For anything at all — a question, a concern, or a new idea — start here.</p>
              <PLink href="/portal/messages?compose=1" variant="primary" size="sm" icon="messages">
                Message {lead.name.split(" ")[0]}
              </PLink>
            </Panel>
          )}
          <Panel as="section" aria-labelledby="keys-title">
            <PanelHead title="Keyboard" id="keys-title" />
            <ul className={s.keys} role="list">
              <li>
                <span>Search and jump anywhere</span>
                <span>
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </span>
              </li>
              <li>
                <span>Open search</span>
                <span>
                  <Kbd>/</Kbd>
                </span>
              </li>
              <li>
                <span>Send a comment or message</span>
                <span>
                  <Kbd>⌘</Kbd>
                  <Kbd>↵</Kbd>
                </span>
              </li>
              <li>
                <span>Close a panel or dialog</span>
                <span>
                  <Kbd>esc</Kbd>
                </span>
              </li>
            </ul>
          </Panel>
        </div>
        <Panel as="section" aria-labelledby="faq-title">
          <PanelHead title="Common questions" id="faq-title" />
          <ul className={s.faq} role="list">
            {FAQ.map((f) => (
              <li key={f.q}>
                <details>
                  <summary>
                    {f.q}
                    <Icon name="chevronDown" size={16} />
                  </summary>
                  <p>{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
