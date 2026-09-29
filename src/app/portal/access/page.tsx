import { redirect } from "next/navigation";
import { Wordmark } from "@/components/brand/BrandMark";
import { Panel, PLink } from "@/components/portal/ui";
import { brand } from "@/config/brand";
import { getPortal } from "@/portal/source";
import s from "./access.module.css";

export const metadata = { title: "Access" };

/**
 * Shown when no portal session is available. Sign-in is provided by the
 * operating backend; until it is connected this screen says so plainly
 * rather than rendering an empty or invented portal.
 */
export default async function AccessPage() {
  if (await getPortal()) redirect("/portal");
  return (
    <div className={s.page}>
      <span className={s.glow} aria-hidden="true" />
      <span className={s.horizon} aria-hidden="true" />
      <Panel glass className={s.card} as="main" aria-labelledby="access-title">
        <div className={s.mark}>
          <Wordmark />
        </div>
        <h1 className={s.title} id="access-title">
          The client portal is by invitation.
        </h1>
        <p className={s.body}>
          Your account team sends access when your engagement begins. If you’re expecting an invitation and haven’t received one, get in touch
          and we’ll set it up.
        </p>
        <div className={s.actions}>
          <PLink href={`mailto:${brand.email}`} variant="primary">
            Contact {brand.name}
          </PLink>
          <PLink href="/" variant="ghost">
            Back to website
          </PLink>
        </div>
        <p className={s.fine}>Sign-in opens here once your workspace is connected.</p>
      </Panel>
    </div>
  );
}
