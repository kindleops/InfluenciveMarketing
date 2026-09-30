"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { openSearch } from "@/components/search/CommandPalette";
import s from "./chat.module.css";

/*
 * The answer as an AI conversation: the question types itself into a
 * composer and is sent, an orb thinks, and the answer streams in.
 *
 * Everything is in the server HTML from the start — the h1 is the question,
 * the first paragraph is the full answer — so search engines, AI crawlers,
 * screen readers and visitors without scripts get the finished page. The
 * animation only changes what is visible, never what is there; text that
 * hasn't "arrived" yet keeps its space (visibility: hidden), so nothing
 * shifts as it streams. Reduced motion skips straight to the end.
 */

type Phase = "idle" | "typing" | "sent" | "thinking" | "streaming" | "done";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Streams `text` word by word once `start` is true. Returns how many words are visible. */
export function useStream(text: string, start: boolean, speed = 26, nonce = 0) {
  const words = text.split(/(\s+)/);
  const [n, setN] = useState(words.length);
  useEffect(() => {
    if (!start) return;
    if (reduced()) {
      setN(words.length);
      return;
    }
    setN(0);
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      // Tokens arrive in small, uneven bursts, like a model streaming.
      i = Math.min(words.length, i + 2 + Math.floor(Math.random() * 3));
      setN(i);
      if (i < words.length) t = setTimeout(step, speed + Math.random() * speed);
    };
    t = setTimeout(step, 60);
    return () => clearTimeout(t);
  }, [start, nonce]); // eslint-disable-line react-hooks/exhaustive-deps
  return { words, n, done: n >= words.length };
}

/** Full text stays in the DOM; what hasn't streamed yet holds its space, invisibly. */
export function Streamed({ words, n, caret }: { words: string[]; n: number; caret?: boolean }) {
  if (n >= words.length) return <>{words.join("")}</>;
  return (
    <>
      {words.slice(0, n).join("")}
      {caret && <span className={s.caret} aria-hidden="true" />}
      <span className={s.ghost}>{words.slice(n).join("")}</span>
    </>
  );
}

export function Orb({ state = "idle", size = 40 }: { state?: Phase | "idle"; size?: number }) {
  return (
    <span className={s.orb} data-state={state} style={{ "--orb": `${size}px` } as CSSProperties} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

/** The follow-up composer: a real input that hands the question to search. */
function Composer({ placeholder = "Ask a follow-up…" }: { placeholder?: string }) {
  const [draft, setDraft] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    openSearch(draft.trim() || undefined);
  };
  return (
    <form className={s.composer} onSubmit={submit} role="search">
      <Orb size={22} />
      <label className="sr-only" htmlFor="chat-ask">
        Ask another question
      </label>
      <input id="chat-ask" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={placeholder} autoComplete="off" />
      <kbd className={s.kbd} aria-hidden="true">
        ⌘K
      </kbd>
      <button type="submit" className={s.send} aria-label="Search the answers">
        <SendIcon />
      </button>
    </form>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AnswerChat({
  question,
  answer,
  points,
  topic,
  suggestions,
}: {
  question: string;
  answer: string;
  points: string[];
  topic: string;
  suggestions: { q: string; href: string }[];
}) {
  // SSR and first paint show the finished conversation ("done"); the
  // sequence starts after hydration. html.js + data-chat="pending" hides the
  // unfinished parts before paint so there is no flash.
  const [phase, setPhase] = useState<Phase | "pending">("pending");
  const [typed, setTyped] = useState("");
  const stream = useStream(answer, phase === "streaming");
  useEffect(() => {
    if (reduced()) {
      setPhase("done");
      return;
    }
    let live = true;
    (async () => {
      setPhase("typing");
      await wait(350);
      for (let i = 1; i <= question.length && live; i++) {
        setTyped(question.slice(0, i));
        await wait(18 + Math.random() * 32);
      }
      if (!live) return;
      await wait(260);
      setPhase("sent");
      await wait(520);
      setPhase("thinking");
      await wait(1150);
      if (live) setPhase("streaming");
    })();
    return () => {
      live = false;
    };
  }, [question]);

  useEffect(() => {
    if (phase === "streaming" && stream.done) {
      const t = setTimeout(() => setPhase("done"), 200);
      return () => clearTimeout(t);
    }
  }, [phase, stream.done]);

  const showBubble = phase === "pending" || phase === "sent" || phase === "thinking" || phase === "streaming" || phase === "done";
  const orbState = phase === "thinking" ? "thinking" : phase === "streaming" ? "streaming" : "idle";

  return (
    <div className={s.chat} data-chat={phase}>
      <div className={s.thread}>
        <div className={s.userRow} data-show={showBubble || undefined}>
          {/* The question being typed and sent, in the slot its bubble lands in. */}
          <div className={s.draft} aria-hidden="true">
            <span className={s.draftText}>
              {typed || <span className={s.draftPh}>Ask anything</span>}
              <span className={s.typeCaret} />
            </span>
            <span className={s.send} data-pressed={phase === "sent" || undefined}>
              <SendIcon />
            </span>
          </div>
          <h1 id="page-title" className={s.bubble}>
            {question}
          </h1>
        </div>

        <div className={s.botRow}>
          <Orb state={orbState} />
          <div className={s.msg} data-glow={phase === "thinking" || phase === "streaming" || undefined}>
            <div className={s.msgHead}>
              <span>Answer · {topic}</span>
              <span className={s.thinking} aria-hidden="true">
                Thinking
                <i />
                <i />
                <i />
              </span>
            </div>
            <p className={s.answer}>
              <Streamed words={stream.words} n={phase === "streaming" ? stream.n : phase === "done" || phase === "pending" ? stream.words.length : 0} caret />
            </p>
            <div className={s.pointsWrap}>
              <ol className={s.points} role="list" aria-label="Key points">
                {points.map((p, i) => (
                  <li key={p} style={{ "--i": i } as CSSProperties}>
                    <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    {p}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <Composer />

      {suggestions.length > 0 && (
        <nav className={s.suggest} aria-label="Suggested follow-up questions">
          {suggestions.map((x, i) => (
            <Link key={x.href} href={x.href} style={{ "--i": i } as CSSProperties}>
              {x.q}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

/** Related questions: open one and its answer streams in. */
export function StreamFaqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <ul className={s.faqs} role="list">
      {faqs.map((f) => (
        <StreamFaq key={f.q} q={f.q} a={f.a} />
      ))}
    </ul>
  );
}

function StreamFaq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const [go, setGo] = useState(0);
  const stream = useStream(a, go > 0, 22, go);
  return (
    <li>
      <details
        className={`glass ${s.faq}`}
        data-level="2"
        data-liquid=""
        onToggle={(e) => {
          const o = (e.currentTarget as HTMLDetailsElement).open;
          setOpen(o);
          if (o) setGo((g) => g + 1);
        }}
      >
        <summary>
          <span className={s.faqQ}>{q}</span>
          <i aria-hidden="true" />
        </summary>
        <div className={s.faqA}>
          <Orb state={open && !stream.done ? "streaming" : "idle"} size={26} />
          <p>
            <Streamed words={stream.words} n={go > 0 ? stream.n : stream.words.length} caret />
          </p>
        </div>
      </details>
    </li>
  );
}

/**
 * The hub's hero: a composer asking the library's real questions, one after
 * another, each answer streaming in beneath with a link to the full page.
 */
export function AskDemo({ items, total }: { items: { q: string; a: string; href: string }[]; total: number }) {
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const item = items[i % items.length];
  const first = item.a.split(/(?<=[.!?])\s/)[0];
  const stream = useStream(first, phase === "streaming", 30);

  useEffect(() => {
    if (reduced()) {
      setTyped(item.q);
      setPhase("done");
      return;
    }
    let live = true;
    (async () => {
      setPhase("typing");
      setTyped("");
      await wait(500);
      for (let c = 1; c <= item.q.length && live; c++) {
        setTyped(item.q.slice(0, c));
        await wait(22 + Math.random() * 36);
      }
      if (!live) return;
      await wait(300);
      setPhase("sent");
      await wait(380);
      setPhase("thinking");
      await wait(900);
      if (live) setPhase("streaming");
    })();
    return () => {
      live = false;
    };
  }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (phase === "streaming" && stream.done) {
      // Deferred, so the stream's own reset lands first and cancels it.
      const t = setTimeout(() => setPhase("done"), 200);
      return () => clearTimeout(t);
    }
    if (phase === "done" && !reduced()) {
      const t = setTimeout(() => setI((x) => x + 1), 3800);
      return () => clearTimeout(t);
    }
  }, [phase, stream.done]);

  const orbState = phase === "thinking" ? "thinking" : phase === "streaming" ? "streaming" : "idle";
  return (
    <div className={s.demo} data-chat={phase} role="group" aria-label="Example answers from the library">
      <div className={`glass ${s.demoCard}`} data-level="3" data-liquid="deep" data-glow={phase === "thinking" || phase === "streaming" || undefined}>
        <div className={s.demoHead}>
          <Orb state={orbState} size={34} />
          <span>
            Ask anything <b>{total} answers</b>
          </span>
        </div>
        <div className={s.demoQ} aria-hidden="true">
          {phase === "typing" || phase === "idle" ? (
            <span className={s.placeholder}>
              {typed}
              <span className={s.typeCaret} />
            </span>
          ) : (
            <span className={s.demoBubble}>{item.q}</span>
          )}
        </div>
        <div className={s.demoA} aria-live="off">
          {phase === "thinking" && (
            <span className={s.thinkingInline} aria-hidden="true">
              Thinking
              <i />
              <i />
              <i />
            </span>
          )}
          {(phase === "streaming" || phase === "done") && (
            <p>
              <Streamed words={stream.words} n={stream.n} caret />
            </p>
          )}
        </div>
        <div className={s.demoFoot}>
          <Link href={item.href} className={s.demoLink}>
            Read the full answer →
          </Link>
          <button type="button" className={s.demoSearch} onClick={() => openSearch()}>
            Ask your own
            <kbd>⌘K</kbd>
          </button>
        </div>
      </div>
    </div>
  );
}
