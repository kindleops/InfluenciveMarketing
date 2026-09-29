import type { Comment } from "@/portal/model";
import type { Person } from "@/portal/source";
import { ago } from "@/portal/format";
import { Avatar } from "./ui";
import s from "./comment.module.css";

export function Comments({ comments, people, now, tz }: { comments: Comment[]; people: Record<string, Person>; now: number; tz: string }) {
  if (!comments.length) return null;
  return (
    <ol className={s.thread} role="list">
      {comments.map((c) => {
        const p = people[c.authorId];
        return (
          <li key={c.id} className={s.comment}>
            <Avatar id={c.authorId} name={p?.name ?? "?"} side={p?.side} size={28} />
            <div>
              <p className={s.commentHead}>
                <strong>{p?.name ?? "Someone"}</strong>
                {p?.side === "studio" && <span>{p.title}</span>}
                <span>· {ago(c.at, now, tz)}</span>
              </p>
              <p className={s.commentBody}>{c.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
