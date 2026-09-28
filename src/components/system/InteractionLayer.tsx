"use client";

import { useEffect, useRef } from "react";
import { isFinePointer, lerp, prefersReducedMotion } from "@/lib/motion";
import styles from "./InteractionLayer.module.css";

/**
 * Site-wide, delegated pointer interactions. A single pointermove listener
 * drives every opt-in behaviour, so components stay server-rendered:
 *
 *   [data-pointer-light]  sets --mx / --my (percent) for internal glass light
 *   [data-tilt]           sets --rx / --ry (deg) for a very small perspective shift
 *   [data-magnetic]       sets --tx / --ty (px) — the element drifts toward the pointer
 *   [data-cursor="Label"] shows a contextual label in the cursor aura
 *
 * Only active on fine pointers. Magnetic/tilt disabled for reduced motion;
 * lighting is kept because it is not movement.
 */
export function InteractionLayer() {
  const auraRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isFinePointer()) return;
    const reduced = prefersReducedMotion();
    const aura = auraRef.current;
    const label = labelRef.current;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;
    let visible = false;
    let activeMagnet: HTMLElement | null = null;
    let activeTilt: HTMLElement | null = null;
    let pending: PointerEvent | null = null;

    const resetMagnet = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
      el.removeAttribute("data-magnet-active");
    };
    const resetTilt = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const process = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t || !(t instanceof Element)) return;

      const lit = t.closest<HTMLElement>("[data-pointer-light]");
      if (lit) {
        const r = lit.getBoundingClientRect();
        lit.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        lit.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      }

      if (!reduced) {
        const tilt = t.closest<HTMLElement>("[data-tilt]");
        if (tilt !== activeTilt) {
          resetTilt(activeTilt);
          activeTilt = tilt;
        }
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const strength = Number(tilt.dataset.tilt) || 3;
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          tilt.style.setProperty("--rx", `${(-ny * strength).toFixed(2)}deg`);
          tilt.style.setProperty("--ry", `${(nx * strength).toFixed(2)}deg`);
        }

        const magnet = t.closest<HTMLElement>("[data-magnetic]");
        if (magnet !== activeMagnet) {
          resetMagnet(activeMagnet);
          activeMagnet = magnet;
        }
        if (magnet) {
          const r = magnet.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          magnet.style.setProperty("--tx", `${(dx * 0.22).toFixed(1)}px`);
          magnet.style.setProperty("--ty", `${(dy * 0.3).toFixed(1)}px`);
          magnet.setAttribute("data-magnet-active", "");
        }
      }

      const ctx = t.closest<HTMLElement>("[data-cursor]");
      if (label && aura) {
        const text = ctx?.dataset.cursor ?? "";
        if (label.textContent !== text) label.textContent = text;
        aura.toggleAttribute("data-labelled", Boolean(text));
      }
    };

    const tick = () => {
      if (pending) {
        process(pending);
        pending = null;
      }
      pos.x = lerp(pos.x, target.x, reduced ? 1 : 0.16);
      pos.y = lerp(pos.y, target.y, reduced ? 1 : 0.16);
      if (aura) aura.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      const settled = Math.abs(pos.x - target.x) < 0.1 && Math.abs(pos.y - target.y) < 0.1;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      pending = e;
      if (!visible && aura) {
        visible = true;
        aura.setAttribute("data-visible", "");
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      visible = false;
      aura?.removeAttribute("data-visible");
      resetMagnet(activeMagnet);
      resetTilt(activeTilt);
      activeMagnet = activeTilt = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={auraRef} className={styles.aura} aria-hidden="true">
      <div className={styles.light} />
      <span ref={labelRef} className={styles.label} />
    </div>
  );
}
