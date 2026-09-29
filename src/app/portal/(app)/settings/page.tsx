import { requirePortal } from "@/portal/server";
import { PageHead, Panel, PanelHead } from "@/components/portal/ui";
import { Prefs } from "@/components/portal/secondary/Prefs";
import s from "@/components/portal/secondary/secondary.module.css";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const { session, source } = await requirePortal();
  const prefs = await source.prefs();
  return (
    <>
      <PageHead title="Settings" />
      <div className={s.two}>
        <Panel as="section" aria-labelledby="notif-title">
          <PanelHead title="Notifications" id="notif-title" meta="Only what needs you" />
          <Prefs initial={prefs} />
        </Panel>
        <div className={s.stack}>
          <Panel as="section" aria-labelledby="sec-title">
            <PanelHead title="Sign-in & security" id="sec-title" />
            <p className={s.pad} style={{ fontSize: "var(--p-fs-ui)", color: "var(--text-secondary)" }}>
              Sign-in, passwords and two-factor settings are managed by your workspace’s identity provider. Nothing here stores credentials.
            </p>
          </Panel>
          {session.demo && (
            <Panel as="section" aria-labelledby="demo-title">
              <PanelHead title="Demo mode" id="demo-title" />
              <p className={s.pad} style={{ fontSize: "var(--p-fs-ui)", color: "var(--text-secondary)" }}>
                This portal is showing developer fixtures: a fictional client, placeholder team members and synthetic results. Use the account menu to preview
                the portal as each client role. Fixture data never renders on a production deployment.
              </p>
            </Panel>
          )}
        </div>
      </div>
    </>
  );
}
