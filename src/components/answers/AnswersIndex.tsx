"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import s from "./index.module.css";

type Item = { slug: string; question: string; topic: string; lead: string };

const sid = (t: string) =>
  t
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Every question, filterable as you type and by topic. The full list is in
 * the server-rendered HTML; filtering only hides rows.
 */
export function AnswersIndex({ items, topics }: { items: Item[]; topics: string[] }) {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState<string>("All");
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const match = (it: Item) => (topic === "All" || it.topic === topic) && words.every((w) => `${it.question} ${it.lead} ${it.topic}`.toLowerCase().includes(w));
  const visible = useMemo(() => items.filter(match), [items, q, topic]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={s.index}>
      <div className={`glass ${s.bar}`} data-level="2" data-liquid="deep">
        <label className={s.search}>
          <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="m12.2 12.2 3.6 3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="sr-only">Filter questions</span>
          <input type="search" placeholder="Filter questions — e.g. cost, Google Ads, ChatGPT" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <div className={s.chips} role="group" aria-label="Filter by topic">
          {["All", ...topics].map((t) => (
            <button key={t} type="button" aria-pressed={topic === t} onClick={() => setTopic(t)}>
              {topic === t && <motion.span layoutId="answers-lens" className={s.lens} transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span>{t}</span>
            </button>
          ))}
        </div>
      </div>
      <p className={s.count} aria-live="polite">
        {visible.length === items.length ? `${items.length} questions` : `${visible.length} of ${items.length} questions`}
      </p>

      {topics.map((t) => {
        const list = items.filter((it) => it.topic === t);
        const shown = list.filter(match);
        return (
          <section key={t} id={sid(t)} className={s.group} hidden={shown.length === 0} aria-labelledby={`${sid(t)}-title`}>
            <div className={s.groupHead}>
              <h2 id={`${sid(t)}-title`}>{t}</h2>
              <span>{list.length}</span>
            </div>
            <ul role="list" className={s.list}>
              {list.map((it) => (
                <li key={it.slug} hidden={!shown.includes(it)}>
                  <Link href={`/answers/${it.slug}`} className={s.row}>
                    <span className={s.q}>{it.question}</span>
                    <span className={s.lead}>{it.lead}</span>
                    <span className={s.go} aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      {visible.length === 0 && <p className={s.none}>No question matches “{q}”. Try fewer words — or ask us directly.</p>}
    </div>
  );
}
