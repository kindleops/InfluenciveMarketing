"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { SearchItem } from "@/app/portal/search/route";
import { Dialog } from "../ui/Dialog";
import { Icon } from "../ui/Icon";
import { Kbd } from "../ui";
import s from "./palette.module.css";

let cached: SearchItem[] | null = null;

export default function Palette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [items, setItems] = useState<SearchItem[] | null>(cached);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(0);
    requestAnimationFrame(() => input.current?.focus());
    // The index is small and per-session; refresh it on every open so new
    // approvals and threads are findable.
    fetch("/portal/search", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { items: SearchItem[] }) => {
        cached = d.items;
        setItems(d.items);
        setFailed(false);
      })
      .catch(() => setFailed(true));
  }, [open]);

  const results = useMemo(() => {
    if (!items) return [];
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return items.filter((i) => i.group === "Quick actions" || i.group === "Pages");
    return items
      .filter((i) => {
        const hay = `${i.label} ${i.hint ?? ""} ${i.group} ${i.keywords ?? ""}`.toLowerCase();
        return terms.every((t) => hay.includes(t));
      })
      .slice(0, 40);
  }, [items, q]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (i: SearchItem | undefined) => {
    if (!i) return;
    onClose();
    router.push(i.href);
  };

  let lastGroup = "";
  return (
    <Dialog open={open} onClose={onClose} label="Search and jump to" size="palette" hideClose>
      <div className={s.box}>
        <div className={s.field}>
          <Icon name="search" size={18} />
          <input
            ref={input}
            className={s.input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search campaigns, approvals, deliverables…"
            role="combobox"
            aria-expanded="true"
            aria-controls={`${id}-list`}
            aria-activedescendant={results[active] ? `${id}-${active}` : undefined}
            aria-autocomplete="list"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(results.length - 1, a + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(0, a - 1));
              } else if (e.key === "Enter") {
                e.preventDefault();
                go(results[active]);
              }
            }}
          />
        </div>
        <div className={s.results} ref={list} id={`${id}-list`} role="listbox" aria-label="Results">
          {!items && !failed && <p className={s.empty}>Loading…</p>}
          {failed && !items && <p className={s.empty}>Search isn’t available right now. Try again in a moment.</p>}
          {items && results.length === 0 && <p className={s.empty}>Nothing matches “{q}”.</p>}
          {results.map((r, i) => {
            const head = r.group !== lastGroup;
            lastGroup = r.group;
            return (
              <div key={`${r.group}-${r.href}-${i}`} role="presentation">
                {head && (
                  <p className={s.group} role="presentation">
                    {r.group}
                  </p>
                )}
                <div
                  id={`${id}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  className={s.option}
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(r)}
                >
                  <Icon name={r.icon} size={17} />
                  <span className={s.label}>{r.label}</span>
                  {r.hint && <span className={s.hint}>{r.hint}</span>}
                </div>
              </div>
            );
          })}
        </div>
        <div className={s.foot} aria-hidden="true">
          <span>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> to move
          </span>
          <span>
            <Kbd>↵</Kbd> to open
          </span>
          <span>
            <Kbd>esc</Kbd> to close
          </span>
        </div>
      </div>
    </Dialog>
  );
}
