"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import s from "./interactive.module.css";

function Box({ on }: { on: boolean }) {
  return (
    <span className={s.box} data-on={on || undefined} aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <motion.path
          d="M2.5 6.2 5 8.5l4.5-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </span>
  );
}

/**
 * "Is this for you?" — the fit list as something a visitor answers. Each
 * statement they recognise lights; a gauge fills; the verdict is honest
 * (including "probably not yet"), and the next step carries the context.
 */
export function FitCheck({
  items,
  notFor,
  href,
  alt,
}: {
  items: string[];
  notFor: string[];
  /** Where a good fit goes next. */
  href: string;
  /** Where a weak fit is better served (a guide, a comparison). */
  alt?: { label: string; href: string };
}) {
  const [on, setOn] = useState<boolean[]>(() => items.map(() => false));
  const n = on.filter(Boolean).length;
  const share = n / items.length;
  const verdict =
    n === 0
      ? { k: "idle", title: "Tick what’s true for you.", text: "Five seconds. You’ll know whether a conversation is worth having." }
      : share >= 0.6
        ? { k: "strong", title: "This is the work we do best.", text: "You match most of what makes an engagement like this succeed. The next step takes about three minutes." }
        : share >= 0.34
          ? { k: "maybe", title: "Worth a conversation.", text: "Some of the conditions are there. We’ll tell you plainly what would need to change first." }
          : { k: "weak", title: "Probably not yet.", text: "The conditions that make this pay off aren’t in place. Start with the reading below — and come back when they are." };

  return (
    <div className={s.fit}>
      <div className={`glass ${s.fitCard}`} data-level="3" data-liquid="deep" data-reveal="up">
        <div className={s.fitHead}>
          <p className={s.eyebrow}>Is this for you?</p>
          <span className={s.count} aria-live="polite">
            {n} of {items.length}
          </span>
        </div>
        <ul className={s.fitList} role="list">
          {items.map((t, i) => (
            <li key={t}>
              <button type="button" className={s.fitItem} aria-pressed={on[i]} onClick={() => setOn((o) => o.map((v, j) => (j === i ? !v : v)))}>
                <Box on={on[i]} />
                <span>{t}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className={s.gauge} aria-hidden="true">
          <motion.span initial={false} animate={{ scaleX: share }} transition={{ type: "spring", stiffness: 120, damping: 20 }} data-k={verdict.k} />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={verdict.k}
            className={s.verdict}
            data-k={verdict.k}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.35 }}
            aria-live="polite"
          >
            <p className={s.verdictTitle}>{verdict.title}</p>
            <p className={s.verdictText}>{verdict.text}</p>
            {verdict.k !== "idle" && (
              <div className={s.verdictCtas}>
                {verdict.k !== "weak" ? (
                  <Link href={href} className={s.go}>
                    Start with this context →
                  </Link>
                ) : (
                  alt && (
                    <Link href={alt.href} className={s.go}>
                      {alt.label} →
                    </Link>
                  )
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={s.notFor} data-reveal="up" style={{ "--reveal-delay": "100ms" } as CSSProperties}>
        <p className={s.eyebrow}>Not the right fit</p>
        <ul role="list">
          {notFor.map((t) => (
            <li key={t}>
              <span className={s.x} aria-hidden="true">
                ×
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * A checklist a reader can actually work through: tick items, watch the
 * progress ring fill, and find it as they left it when they come back
 * (kept in this browser only).
 */
export function TickList({ items, storageKey, label = "Progress" }: { items: string[]; storageKey: string; label?: string }) {
  const [on, setOn] = useState<boolean[]>(() => items.map(() => false));
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`ticks:${storageKey}`) ?? "null");
      if (Array.isArray(saved) && saved.length === items.length) setOn(saved.map(Boolean));
    } catch {}
  }, [storageKey, items.length]);
  const toggle = (i: number) =>
    setOn((o) => {
      const next = o.map((v, j) => (j === i ? !v : v));
      try {
        localStorage.setItem(`ticks:${storageKey}`, JSON.stringify(next));
      } catch {}
      return next;
    });
  const n = on.filter(Boolean).length;
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className={s.tick}>
      <div className={`glass ${s.ring}`} data-level="2" data-liquid="" aria-live="polite">
        <svg width="64" height="64" viewBox="0 0 56 56" aria-hidden="true">
          <circle cx="28" cy="28" r={r} className={s.ringTrack} />
          <motion.circle cx="28" cy="28" r={r} className={s.ringFill} strokeDasharray={c} initial={false} animate={{ strokeDashoffset: c * (1 - n / items.length) }} transition={{ type: "spring", stiffness: 90, damping: 18 }} />
        </svg>
        <span>
          <b>
            {n}/{items.length}
          </b>
          {label}
        </span>
        {n > 0 && (
          <button
            type="button"
            className={s.reset}
            onClick={() => {
              setOn(items.map(() => false));
              try {
                localStorage.removeItem(`ticks:${storageKey}`);
              } catch {}
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul className={s.tickList} role="list" aria-label="Checklist">
        {items.map((t, i) => (
          <li key={t}>
            <button type="button" className={s.tickItem} aria-pressed={on[i]} onClick={() => toggle(i)}>
              <Box on={on[i]} />
              <span>{t}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
