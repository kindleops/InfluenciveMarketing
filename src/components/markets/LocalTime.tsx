"use client";

import { useEffect, useState } from "react";

/**
 * The time in a market right now. Rendered after mount (the server can't
 * know the visitor's "now" without a mismatch), with a fixed-width
 * placeholder so nothing shifts when it arrives.
 */
export function LocalTime({ tz, withZone = true, className }: { tz: string; withZone?: boolean; className?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);
  if (!now)
    return (
      <span className={className} aria-hidden="true">
        --:-- --
      </span>
    );
  const time = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(now);
  const zone = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" }).formatToParts(now).find((p) => p.type === "timeZoneName")?.value;
  return (
    <time className={className} dateTime={now.toISOString()}>
      {time}
      {withZone && zone ? ` ${zone}` : ""}
    </time>
  );
}
