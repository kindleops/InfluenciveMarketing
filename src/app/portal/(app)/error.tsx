"use client";

import { useEffect } from "react";
import { Empty, Panel, PButton, PLink } from "@/components/portal/ui";

/** Human errors: what didn't load, and what you can do. Details go to logs. */
export default function PortalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <Panel style={{ marginTop: "1rem" }}>
      <Empty
        icon="refresh"
        title="We couldn’t load this section."
        body="It’s usually temporary. Try again — if it keeps happening, your team can look into it."
        action={
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <PButton variant="primary" onClick={() => retry()}>
              Try again
            </PButton>
            <PLink href="/portal/messages?compose=1" variant="ghost">
              Contact your team
            </PLink>
          </div>
        }
      />
    </Panel>
  );
}
