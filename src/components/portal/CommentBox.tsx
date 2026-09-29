"use client";

import { useRef, useState, useTransition } from "react";
import { addComment } from "@/app/portal/actions";
import { PButton } from "./ui";
import s from "./comment.module.css";

/** Leave a comment on a piece of work, in context. */
export function CommentBox({
  kind,
  id,
  placeholder = "Add a comment for the team…",
  disabled,
}: {
  kind: "content" | "creative" | "approval";
  id: string;
  placeholder?: string;
  disabled?: string;
}) {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const ref = useRef<HTMLTextAreaElement>(null);
  if (disabled) return <p className={s.note}>{disabled}</p>;
  const submit = () =>
    start(async () => {
      setError(null);
      const r = await addComment(kind, id, body);
      if (r.ok) setBody("");
      else setError(r.error);
    });
  return (
    <form
      className={s.box}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <label className="sr-only" htmlFor={`c-${kind}-${id}`}>
        Comment
      </label>
      <textarea
        ref={ref}
        id={`c-${kind}-${id}`}
        className={s.input}
        rows={2}
        value={body}
        placeholder={placeholder}
        onChange={(e) => setBody(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && body.trim()) {
            e.preventDefault();
            submit();
          }
        }}
      />
      <div className={s.row}>
        <span className={s.hint} aria-live="polite">
          {error ?? "⌘ ↵ to send"}
        </span>
        <PButton type="submit" size="sm" variant="secondary" disabled={!body.trim()} pending={pending}>
          Comment
        </PButton>
      </div>
    </form>
  );
}
