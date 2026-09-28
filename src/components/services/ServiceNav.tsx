"use client";

import { useEffect, useState } from "react";
import { services } from "@/content/services";
import styles from "./ServiceNav.module.css";

/** Sticky discipline index — tracks the section currently being read. */
export function ServiceNav() {
  const [active, setActive] = useState(services[0].id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    services.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav className={styles.nav} aria-label="Disciplines">
      <ol role="list" className={styles.list}>
        {services.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className={styles.link} aria-current={active === s.id ? "location" : undefined}>
              <span className={styles.idx}>{s.index}</span>
              <span>{s.name}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
