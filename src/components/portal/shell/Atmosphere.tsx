"use client";

import { useEffect, useRef } from "react";
import s from "./shell.module.css";

/**
 * Ambient light for the whole portal: three slow spectral fields and a
 * faint light that follows a fine pointer. Transform-only, one rAF per
 * pointer move, nothing when the tab is hidden.
 */
export function Atmosphere() {
  const pointer = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    const el = pointer.current;
    if (!el) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.setProperty("--px", `${x}px`);
          el.style.setProperty("--py", `${y}px`);
        });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className={s.atmosphere} aria-hidden="true">
      <span className={s.grid} />
      <span className={`${s.field} ${s.f1}`} />
      <span className={`${s.field} ${s.f2}`} />
      <span className={`${s.field} ${s.f3}`} />
      <span className={s.pointer} ref={pointer} />
      <span className={s.vignette} />
    </div>
  );
}
