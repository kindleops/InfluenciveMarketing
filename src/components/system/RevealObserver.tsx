"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-inview", "");
          io.unobserve(entry.target);
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

  return null;
}
