"use client";

import { IntentLink as Link } from "@/components/portal/ui/IntentLink";
import { useEffect, useRef, useState, useTransition } from "react";
import { decideApproval } from "@/app/portal/actions";
import { Icon, PButton } from "../ui";
import s from "./approvals.module.css";

/**
 * The decision surface. Approve sits on the right as the primary action;
 * "Request changes" is a secondary action that asks what should change.
 * High-impact decisions (budget, launch dates) take a second, explicit step.
 */
export function Decision({
  id,
  state,
  impact,
  canApprove,
  roleLabel,
  outcome,
  confirmLines,
  nextHref,
  compact,
}: {
  id: string;
  state: "pending" | "approved" | "changes_requested";
  impact: "standard" | "high";
  canApprove: boolean;
  roleLabel: string;
  outcome?: string;
  confirmLines?: string[];
  nextHref?: string;
  /** Inside a narrow rail: medium buttons that share the row. */
  compact?: boolean;
}) {
  const size = compact ? "md" : "lg";
  const [mode, setMode] = useState<"idle" | "changes" | "confirm">("idle");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [last, setLast] = useState<"approved" | "changes_requested" | null>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (mode === "changes") noteRef.current?.focus();
    if (mode === "confirm") confirmRef.current?.focus();
  }, [mode]);

  const send = (decision: "approved" | "changes_requested") =>
    start(async () => {
      setError(null);
      const r = await decideApproval(id, decision, note);
      if (r.ok) {
        setLast(decision);
        setMode("idle");
        setNote("");
      } else setError(r.error);
    });

  if (state !== "pending") {
    return (
      <div className={s.outcome} data-state={state} role="status">
        <span className={s.outcomeIcon} aria-hidden="true">
          <Icon name={state === "approved" ? "check" : "refresh"} size={16} />
        </span>
        <div>
          <p className={s.outcomeTitle}>{state === "approved" ? "Approved" : "Changes requested"}</p>
          {outcome && <p className={s.outcomeMeta}>{outcome}</p>}
          {last && <p className={s.outcomeMeta}>The team has been notified.</p>}
        </div>
        {nextHref && (
          <Link href={nextHref} className={s.nextLink}>
            Next approval
            <Icon name="arrowRight" size={14} />
          </Link>
        )}
      </div>
    );
  }

  if (!canApprove) {
    return (
      <p className={s.roleNote}>
        <Icon name="lock" size={15} />
        As a {roleLabel.toLowerCase()} you can comment, but approvals are made by owners, admins and members.
      </p>
    );
  }

  return (
    <div className={s.decision} data-mode={mode} data-compact={compact ? "" : undefined}>
      {mode === "changes" && (
        <div className={s.changes}>
          <label htmlFor={`note-${id}`} className={s.changesLabel}>
            What should change?
          </label>
          <textarea
            ref={noteRef}
            id={`note-${id}`}
            className={s.changesInput}
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Be as specific as you can — the team works from this."
          />
        </div>
      )}
      {mode === "confirm" && (
        <div className={s.confirm}>
          <p className={s.confirmTitle}>Confirm this decision</p>
          {confirmLines && confirmLines.length > 0 && (
            <ul className={s.confirmList} role="list">
              {confirmLines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          )}
          <p className={s.confirmNote}>Your approval is recorded with your name and the time.</p>
        </div>
      )}
      {error && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}
      <div className={s.actions}>
        {mode === "idle" && (
          <>
            <PButton variant="secondary" size={size} icon="refresh" onClick={() => setMode("changes")}>
              Request changes
            </PButton>
            <PButton
              variant="primary"
              size={size}
              icon="check"
              pending={pending}
              onClick={() => (impact === "high" ? setMode("confirm") : send("approved"))}
            >
              {impact === "high" ? "Approve…" : "Approve"}
            </PButton>
          </>
        )}
        {mode === "changes" && (
          <>
            <PButton variant="ghost" size={size} onClick={() => setMode("idle")} disabled={pending}>
              Cancel
            </PButton>
            <PButton variant="primary" size={size} icon="send" pending={pending} disabled={!note.trim()} onClick={() => send("changes_requested")}>
              Send to the team
            </PButton>
          </>
        )}
        {mode === "confirm" && (
          <>
            <PButton variant="ghost" size={size} onClick={() => setMode("idle")} disabled={pending}>
              Cancel
            </PButton>
            <PButton ref={confirmRef} variant="primary" size={size} icon="check" pending={pending} onClick={() => send("approved")}>
              Confirm &amp; approve
            </PButton>
          </>
        )}
      </div>
    </div>
  );
}
