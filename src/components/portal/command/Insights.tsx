"use client";

import { useOptimistic, useTransition } from "react";
import type { Insight } from "@/portal/model";
import { setInsightStatus } from "@/app/portal/actions";
import { Icon, Person, PButton, PLink, Status } from "../ui";
import s from "./command.module.css";

type P = { id: string; name: string; title: string; side: "studio" | "client" };

/** Studio observations with their reasoning, evidence and the recommended move. */
export function InsightCard({ insight, owner, canDecide }: { insight: Insight; owner?: P; canDecide: boolean }) {
  const [status, setStatus] = useOptimistic(insight.status);
  const [pending, start] = useTransition();
  const decide = (next: Insight["status"]) =>
    start(async () => {
      setStatus(next);
      await setInsightStatus(insight.id, next);
    });
  const compose = `/portal/messages?compose=1&ref=${insight.ref ? `${insight.ref.kind}:${insight.ref.id}` : ""}&subject=${encodeURIComponent(insight.title)}`;

  return (
    <li className={s.insight}>
      <div className={s.insightTop}>
        <div>
          <h3 className={s.insightTitle}>{insight.title}</h3>
          <p className={s.insightObs}>{insight.observation}</p>
        </div>
        <p className={s.figure}>
          <strong>{insight.metric.value}</strong>
          <span>{insight.metric.label}</span>
        </p>
      </div>
      <details className={s.why}>
        <summary>
          <Icon name="chevronRight" size={14} />
          Why we think so
        </summary>
        <p>{insight.reasoning}</p>
      </details>
      <p className={s.rec}>
        <Icon name="arrowRight" size={16} />
        <span>
          <span className="sr-only">Recommended action: </span>
          {insight.action}
        </span>
      </p>
      <div className={s.insightFoot}>
        <Person person={owner} size={26} sub={owner ? `${owner.title} · owner` : undefined} />
        {status === "new" ? (
          <div className={s.insightActions}>
            <PLink href={compose} variant="ghost" size="sm">
              Discuss
            </PLink>
            {canDecide && (
              <PButton variant="secondary" size="sm" icon="check" pending={pending} onClick={() => decide("accepted")}>
                Go ahead
              </PButton>
            )}
          </div>
        ) : (
          <Status
            tone={status === "dismissed" ? "quiet" : status === "done" ? "done" : "progress"}
            label={status === "accepted" ? `Accepted — ${owner?.name.split(" ")[0] ?? "the team"} is on it` : status === "in_progress" ? "In progress" : status === "done" ? "Done" : "Set aside"}
          />
        )}
      </div>
    </li>
  );
}
