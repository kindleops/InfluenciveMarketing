"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import s from "./landing.module.css";

/**
 * A floating dock for long landing pages: where you are, where else you can
 * go, and the way to start — always one tap away. It rises once the hero is
 * behind you and steps aside when the closing call to action arrives, so it
 * never competes with it. The active chapter is marked by a lens that flows
 * between items.
 */
export function SectionDock({ items, cta }: { items: { id: string; label: string }[]; cta: { label: string; href: string } }) {
  const [active, setActive] = useState<string | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((x): x is HTMLElement => !!x);
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((el) => spy.observe(el));

    const hero = document.querySelector("main section");
    const end = document.querySelector('[aria-labelledby="cta-title"]') ?? document.querySelector("footer");
    let pastHero = false;
    let atEnd = false;
    const update = () => setShown(pastHero && !atEnd);
    const gate = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
        if (e.target === end) atEnd = e.isIntersecting;
      }
      update();
    });
    if (hero) gate.observe(hero);
    if (end) gate.observe(end);
    return () => {
      spy.disconnect();
      gate.disconnect();
    };
  }, [items]);

  return (
    <nav className={s.dock} data-shown={shown || undefined} aria-label="On this page">
      <div className={`glass ${s.dockBar}`} data-level="2" data-liquid="deep">
        <ul className={s.dockList} role="list">
          {items.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`} className={s.dockLink} aria-current={active === it.id ? "location" : undefined} tabIndex={shown ? undefined : -1}>
                {active === it.id && <motion.span layoutId="dock-lens" className={s.dockLens} transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.8 }} />}
                <span>{it.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href={cta.href} className={s.dockCta} tabIndex={shown ? undefined : -1}>
          {cta.label}
        </a>
      </div>
    </nav>
  );
}
