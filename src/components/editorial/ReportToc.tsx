"use client";

import { useEffect, useRef, useState } from "react";
import s from "./article.module.css";

/**
 * Contents that know where you are: the section you're reading is lit, and
 * a thin rule fills as you read.
 */
export function ReportToc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((x): x is HTMLElement => !!x);
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => spy.observe(el));

    const prose = document.querySelector<HTMLElement>(`.${s.prose}`);
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!prose || !bar.current) return;
        const r = prose.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (innerHeight * 0.3 - r.top) / r.height));
        bar.current.style.transform = `scaleY(${p})`;
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      spy.disconnect();
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <nav className={s.tocWrap} aria-labelledby="toc-title">
      <p className={s.tocTitle} id="toc-title">
        Contents
      </p>
      <div className={s.tocBody}>
        <span className={s.tocRule} aria-hidden="true">
          <span ref={bar} />
        </span>
        <ol className={s.toc} role="list">
          {items.map((h, i) => (
            <li key={h.id}>
              <a href={`#${h.id}`} aria-current={active === h.id ? "location" : undefined}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {h.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
