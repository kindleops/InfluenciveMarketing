"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import s from "./overlay.module.css";

/**
 * A small anchored panel: opens on click, closes on Escape, outside click or
 * route change, and returns focus to its trigger.
 */
export function Menu({
  label,
  trigger,
  triggerClassName,
  align = "end",
  side = "bottom",
  width = 300,
  children,
}: {
  label: string;
  trigger: ReactNode;
  triggerClassName?: string;
  align?: "start" | "end";
  side?: "top" | "bottom";
  width?: number;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();

  const close = useCallback((restore = true) => {
    setOpen(false);
    if (restore) btn.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const items = [...(panel.current?.querySelectorAll<HTMLElement>("a[href],button:not(:disabled)") ?? [])];
        if (!items.length) return;
        e.preventDefault();
        const i = items.indexOf(document.activeElement as HTMLElement);
        const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
        items[next].focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    const t = requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("a[href],button:not(:disabled)")?.focus());
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(t);
    };
  }, [open, close]);

  return (
    <div className={s.menu} ref={root}>
      <button
        ref={btn}
        type="button"
        className={triggerClassName}
        aria-expanded={open}
        aria-controls={id}
        aria-haspopup="dialog"
        aria-label={label}
        onClick={() => {
          setMounted(true);
          setOpen((o) => !o);
        }}
      >
        {trigger}
      </button>
      <div
        ref={panel}
        id={id}
        role="dialog"
        aria-label={label}
        className={s.panel}
        data-open={open ? "" : undefined}
        data-align={align}
        data-side={side}
        style={{ "--w": `${width}px` } as CSSProperties}
        onClick={(e) => {
          // Following a link inside closes the panel.
          if ((e.target as HTMLElement).closest("a[href]")) close(false);
        }}
      >
        {mounted && children(() => close())}
      </div>
    </div>
  );
}

export const menuStyles = s;
