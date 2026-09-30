"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import s from "./palette.module.css";

type Hit = { t: string; k: string; p: string; s: string };

export const OPEN_SEARCH = "open-search";

/** Score a page against the query: every word must match; titles weigh most. */
function score(h: Hit, words: string[]) {
  const t = h.t.toLowerCase();
  const rest = `${h.k} ${h.s}`.toLowerCase();
  let total = 0;
  for (const w of words) {
    if (t.startsWith(w)) total += 6;
    else if (t.includes(` ${w}`)) total += 4;
    else if (t.includes(w)) total += 3;
    else if (rest.includes(w)) total += 1;
    else return 0;
  }
  return total;
}

const SUGGESTED = ["/research", "/locations", "/services/seo", "/services/paid-media", "/industries/law-firms", "/start"];

/**
 * Site search as a command palette: ⌘K / Ctrl K (or the header button),
 * type, arrow through, Enter. Liquid glass over a dimmed page; the active
 * row is a lens that flows between results.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<Hit[] | null>(null);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const id = useId();

  const show = useCallback(() => {
    returnTo.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);
  const hide = useCallback(() => {
    setOpen(false);
    setQ("");
    setActive(0);
    returnTo.current?.focus?.();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) hide();
        else show();
      }
    };
    const onOpen = (e: Event) => {
      const q = (e as CustomEvent<{ q?: string }>).detail?.q;
      if (q) setQ(q);
      show();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH, onOpen);
    };
  }, [open, show, hide]);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => input.current?.focus());
    if (!index)
      fetch("/search-index.json")
        .then((r) => r.json())
        .then(setIndex)
        .catch(() => setIndex([]));
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open, index]);

  const results = useMemo(() => {
    if (!index) return [];
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return SUGGESTED.map((p) => index.find((h) => h.p === p)).filter((h): h is Hit => !!h);
    return index
      .map((h) => ({ h, n: score(h, words) }))
      .filter((x) => x.n > 0)
      .sort((a, b) => b.n - a.n)
      .slice(0, 12)
      .map((x) => x.h);
  }, [index, q]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (h: Hit | undefined) => {
    if (!h) return;
    hide();
    router.push(h.p);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      hide();
    } else if (e.key === "Tab") {
      // Focus stays in the palette: the input is its only stop.
      e.preventDefault();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className={s.scrim} data-lenis-prevent="" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onMouseDown={(e) => e.target === e.currentTarget && hide()}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            className={`glass ${s.panel}`}
            data-level="3"
            data-liquid="deep"
            initial={{ opacity: 0, y: -14, scale: 0.97, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, scale: 0.98, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          >
            <div className={s.field}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="m12.2 12.2 3.6 3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                ref={input}
                role="combobox"
                aria-expanded="true"
                aria-controls={`${id}-list`}
                aria-activedescendant={results[active] ? `${id}-${active}` : undefined}
                aria-autocomplete="list"
                aria-label="Search pages, reports, markets and services"
                placeholder="Search services, markets, research…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                spellCheck={false}
              />
              <kbd>esc</kbd>
            </div>
            <p className={s.label}>{q ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Suggested"}</p>
            <ul ref={list} id={`${id}-list`} role="listbox" className={s.list} aria-label="Results">
              {index === null && <li className={s.empty}>Loading…</li>}
              {index !== null && results.length === 0 && <li className={s.empty}>Nothing matches “{q}”. Try a service, an industry or a city.</li>}
              {results.map((h, i) => (
                <li
                  key={h.p}
                  id={`${id}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  data-i={i}
                  className={s.row}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(h)}
                >
                  {i === active && <motion.span layoutId="palette-lens" className={s.lens} transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
                  <span className={s.kind}>{h.k}</span>
                  <span className={s.title}>{h.t}</span>
                  <span className={s.summary}>{h.s}</span>
                  <span className={s.enter} aria-hidden="true">
                    ↵
                  </span>
                </li>
              ))}
            </ul>
            <div className={s.foot} aria-hidden="true">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> to move
              </span>
              <span>
                <kbd>↵</kbd> to open
              </span>
              <span>
                <kbd>⌘</kbd>
                <kbd>K</kbd> to toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Open the palette from anywhere — optionally with a query already typed. */
export function openSearch(q?: unknown) {
  window.dispatchEvent(new CustomEvent(OPEN_SEARCH, { detail: { q: typeof q === "string" ? q : undefined } }));
}
