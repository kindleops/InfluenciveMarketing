"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·—";

/** Resolve a label from noise, left to right — the decode of a system label. */
function scramble(el: HTMLElement) {
  if (el.dataset.scrambled) return;
  el.dataset.scrambled = "1";
  const final = el.textContent ?? "";
  const start = performance.now();
  const dur = 520 + final.length * 18;
  const frame = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    const settled = Math.floor(p * final.length);
    let out = "";
    for (let i = 0; i < final.length; i++) {
      const ch = final[i];
      out += i < settled || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = final;
  };
  requestAnimationFrame(frame);
}

const SELECTOR = "[data-reveal]:not([data-inview]), [data-split]:not([data-inview]), [data-stagger]:not([data-inview])";

/**
 * One IntersectionObserver for the entire site.
 *
 * Any element carrying [data-reveal], [data-split] or [data-stagger] is
 * picked up automatically — including elements rendered by server
 * components — so reveals cost no per-component JavaScript.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-inview", "");
          io.unobserve(entry.target);
          if (!reduced) entry.target.querySelectorAll<HTMLElement>("[data-scramble]").forEach(scramble);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    const scan = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (el.dataset.observed) return;
        el.dataset.observed = "1";
        if (el.hasAttribute("data-stagger")) {
          Array.from(el.children).forEach((child, i) =>
            (child as HTMLElement).style.setProperty("--i", String(i)),
          );
        }
        io.observe(el);
      });
    };

    scan(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches(SELECTOR)) scan(node.parentElement ?? document);
            else scan(node);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      document.querySelectorAll<HTMLElement>("[data-observed]").forEach((el) => {
        if (!el.hasAttribute("data-inview")) delete el.dataset.observed;
      });
    };
  }, [pathname]);

  // Scenes off screen hold their ambient animations — CSS (drifts, orbits,
  // breathing type) through [data-offscreen], and SVG SMIL (travelling
  // packets), which ignores CSS and would otherwise invalidate layout every
  // frame — so an idle page costs nothing for what can't be seen.
  useEffect(() => {
    const scenes = document.querySelectorAll<HTMLElement>("main section:not(section section), footer");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const off = !e.isIntersecting;
          e.target.toggleAttribute("data-offscreen", off);
          e.target.querySelectorAll("svg").forEach((svg) => {
            if (!svg.querySelector("animate, animateMotion, animateTransform")) return;
            if (off) svg.pauseAnimations();
            else svg.unpauseAnimations();
          });
        }
      },
      { rootMargin: "25% 0px 25% 0px" },
    );
    scenes.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      scenes.forEach((el) => el.removeAttribute("data-offscreen"));
    };
  }, [pathname]);

  return null;
}
