import type { CSSProperties } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import { brand } from "@/config/brand";
import { requirePortal } from "@/portal/server";
import { Avatar, Icon, Panel, PLink, Segments } from "@/components/portal/ui";
import s from "./welcome.module.css";

export const metadata = { title: "Welcome" };

const ACTION: Record<string, { label: string; href: string }> = {
  company: { label: "Confirm", href: "/portal/account" },
  goals: { label: "Discuss", href: "/portal/messages?compose=1&subject=Our%20goals" },
  team: { label: "Invite", href: "/portal/team" },
  analytics: { label: "Connect", href: "/portal/integrations" },
  ads: { label: "Connect", href: "/portal/integrations" },
  website: { label: "Share access", href: "/portal/messages?compose=1&subject=Website%20access" },
  billing: { label: "Add", href: "/portal/billing" },
};

/**
 * First login. Not a product tour — a clear statement of where setup stands,
 * who is doing each part, and one action for each step that needs the client.
 */
export default async function WelcomePage() {
  const { session, source } = await requirePortal();
  const [steps, team] = await Promise.all([source.onboarding(), source.team()]);
  const done = steps.filter((x) => x.status === "done").length;
  const ready = done === steps.length;
  const lead = team.find((t) => t.lead) ?? team[0];

  return (
    <main className={s.page} style={{ "--p-accent": `var(--light-${session.client.accent ?? "blue"})` } as CSSProperties} aria-labelledby="welcome-title">
      <span className={s.glow} aria-hidden="true" />
      <span className={s.horizon} aria-hidden="true" />
      <div className={s.inner}>
        <div className={s.intro}>
          <BrandMark size={28} animate />
          <p className={s.client}>
            <span className={s.mono}>{session.client.monogram}</span>
            {session.client.name}
          </p>
          <h1 className={s.title} id="welcome-title">
            Welcome to {brand.name}.{" "}
            <em>{ready ? "Your command center is ready." : "Your command center is being prepared."}</em>
          </h1>
          <p className={s.lead}>
            This is where your growth system runs: what we’re working on, what needs your decision, what it’s producing — and the people doing it.
          </p>
          {lead && (
            <p className={s.lead2}>
              <Avatar id={lead.id} name={lead.name} size={32} />
              {lead.name}, {lead.title.toLowerCase()}, leads your engagement.
            </p>
          )}
          <div className={s.actions}>
            <PLink href="/portal" variant="primary" icon="arrowRight">
              {ready ? "Enter the portal" : "Go to Command"}
            </PLink>
            <PLink href="/portal/messages?compose=1" variant="ghost">
              Message the team
            </PLink>
          </div>
        </div>

        <Panel glass className={s.panel} aria-labelledby="setup-title">
          <div className={s.progressHead}>
            <strong id="setup-title">Setup</strong>
            <span>
              {done} of {steps.length} complete
            </span>
          </div>
          <Segments done={done} total={steps.length} tone={ready ? "positive" : "attention"} label="Setup progress" />
          <ol className={s.steps} role="list">
            {steps.map((x, i) => (
              <li key={x.id} className={s.step} data-status={x.status}>
                <span className={s.mark} aria-hidden="true">
                  {x.status === "done" ? <Icon name="check" size={15} strokeWidth={2.2} /> : i + 1}
                </span>
                <span className={s.stepText}>
                  <strong>
                    {x.label}
                    <span className="sr-only"> — {x.status === "done" ? "done" : x.status === "in_progress" ? "in progress" : "to do"}</span>
                  </strong>
                  <span>
                    {x.detail} · {x.owner === "client" ? "you" : "your team"}
                  </span>
                </span>
                {x.status !== "done" && x.owner === "client" && ACTION[x.id] ? (
                  <PLink href={ACTION[x.id].href} size="sm" variant={x.status === "in_progress" ? "primary" : "secondary"}>
                    {ACTION[x.id].label}
                  </PLink>
                ) : (
                  <span />
                )}
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </main>
  );
}
