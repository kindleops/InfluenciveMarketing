"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { markThreadRead, sendReply, setThreadStatus, startThread } from "@/app/portal/actions";
import { Dialog } from "../ui/Dialog";
import { Icon, PButton, Tip } from "../ui";
import s from "./messages.module.css";

export function Reply({ threadId, disabled }: { threadId: string; disabled?: string }) {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const send = () =>
    start(async () => {
      setError(null);
      const r = await sendReply(threadId, body);
      if (r.ok) setBody("");
      else setError(r.error);
    });
  if (disabled)
    return (
      <div className={s.composer}>
        <p className={s.hint} style={{ padding: "0.75rem 0.5rem" }}>
          {disabled}
        </p>
      </div>
    );
  return (
    <form
      className={s.composer}
      onSubmit={(e) => {
        e.preventDefault();
        if (body.trim()) send();
      }}
    >
      <div className={s.composeBox}>
        <label htmlFor={`reply-${threadId}`} className="sr-only">
          Reply
        </label>
        <textarea
          id={`reply-${threadId}`}
          className={s.input}
          rows={2}
          value={body}
          placeholder="Reply to the team…"
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && body.trim()) {
              e.preventDefault();
              send();
            }
          }}
        />
        <div className={s.composeRow}>
          <Tip align="start" tip="Attachments open once file storage is connected. For now, share a link in your message.">
            <PButton variant="ghost" size="sm" icon="paperclip" iconOnly aria-disabled="true" onClick={(e) => e.preventDefault()}>
              Attach a file (unavailable until file storage is connected)
            </PButton>
          </Tip>
          <span className={s.hint} aria-live="polite">
            {error ?? "⌘ ↵ to send"}
          </span>
          <PButton type="submit" variant="primary" size="sm" icon="send" disabled={!body.trim()} pending={pending}>
            Send
          </PButton>
        </div>
      </div>
    </form>
  );
}

export function ResolveButton({ threadId, status }: { threadId: string; status: "open" | "resolved" }) {
  const [pending, start] = useTransition();
  return (
    <PButton
      variant="secondary"
      size="sm"
      icon={status === "open" ? "check" : "refresh"}
      pending={pending}
      onClick={() => start(() => setThreadStatus(threadId, status === "open" ? "resolved" : "open").then(() => undefined))}
    >
      {status === "open" ? "Mark resolved" : "Reopen"}
    </PButton>
  );
}

/** Opening an unread thread marks it read (after it has been shown). */
export function MarkRead({ threadId, unread }: { threadId: string; unread: number }) {
  const done = useRef(false);
  useEffect(() => {
    if (!unread || done.current) return;
    done.current = true;
    const t = setTimeout(() => void markThreadRead(threadId), 1200);
    return () => clearTimeout(t);
  }, [threadId, unread]);
  return null;
}

export function NewThread({
  open,
  options,
  initialRef,
  initialSubject,
  closeHref,
  canWrite,
}: {
  open: boolean;
  options: { value: string; label: string; group: string }[];
  initialRef?: string;
  initialSubject?: string;
  closeHref: string;
  canWrite: boolean;
}) {
  const router = useRouter();
  const [subject, setSubject] = useState(initialSubject ?? "");
  const [ref, setRef] = useState(initialRef ?? "");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const groups = [...new Set(options.map((o) => o.group))];

  const submit = () =>
    start(async () => {
      setError(null);
      const opt = options.find((o) => o.value === ref);
      const [kind, id] = ref.split(":");
      const r = await startThread(subject, body, opt ? { kind, id, label: opt.label } : undefined);
      if (r.ok && r.id) router.push(`/portal/messages?thread=${r.id}`);
      else if (!r.ok) setError(r.error);
    });

  return (
    <Dialog open={open} onClose={() => router.push(closeHref, { scroll: false })} labelledBy="compose-title">
      <form
        className={s.form}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <h2 className={s.formTitle} id="compose-title">
          Message the team
        </h2>
        {!canWrite ? (
          <p className={s.hint}>Your role can read conversations but not start them.</p>
        ) : (
          <>
            <label className={s.field}>
              Subject
              <input className={s.control} value={subject} onChange={(e) => setSubject(e.target.value)} required maxLength={140} autoFocus />
            </label>
            <label className={s.field}>
              About (optional)
              <select className={s.control} value={ref} onChange={(e) => setRef(e.target.value)}>
                <option value="">Nothing specific</option>
                {groups.map((g) => (
                  <optgroup key={g} label={g}>
                    {options
                      .filter((o) => o.group === g)
                      .map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <label className={s.field}>
              Message
              <textarea className={s.control} value={body} onChange={(e) => setBody(e.target.value)} required />
            </label>
            {error && (
              <p className={s.error} role="alert">
                {error}
              </p>
            )}
            <div className={s.formActions}>
              <PButton variant="ghost" onClick={() => router.push(closeHref, { scroll: false })}>
                Cancel
              </PButton>
              <PButton type="submit" variant="primary" icon="send" pending={pending} disabled={!subject.trim() || !body.trim()}>
                Send
              </PButton>
            </div>
          </>
        )}
      </form>
    </Dialog>
  );
}

export function FileIcon({ kind }: { kind: string }) {
  return <Icon name={kind === "video" ? "video" : kind === "image" ? "image" : kind === "sheet" ? "sheet" : kind === "link" ? "link" : "file"} size={16} />;
}
