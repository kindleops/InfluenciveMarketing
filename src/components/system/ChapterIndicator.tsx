"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./ChapterIndicator.module.css";

/**
 * Editorial furniture: the chapter you are in, and how far through the
 * story you are. Reads [data-chapter="NN|Name"] on scene roots; hidden
 * wherever no chapter crosses the middle of the screen (e.g. the hero).
 */
export function ChapterIndicator() {
  const pathname = usePathname();
  const [chapter, setChapter] = useState<{ index: string; name: string } | null>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setChapter(null);
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (!els.length) return;
    const visible = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target as HTMLElement);
          else visible.delete(e.target as HTMLElement);
        }
        const current = els.find((el) => visible.has(el));
        if (!current) return setChapter(null);
        const [index, name] = (current.dataset.chapter ?? "").split("|");
        setChapter((c) => (c?.index === index ? c : { index, name }));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        barRef.current?.style.setProperty("transform", `scaleY(${max > 0 ? window.scrollY / max : 0})`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <div className={styles.indicator} data-on={chapter ? "" : undefined} aria-hidden="true">
      <span className={styles.index} key={chapter?.index}>
        {chapter ? `(${chapter.index})` : ""}
      </span>
      <span className={styles.name} key={chapter?.name}>
        {chapter?.name}
      </span>
      <span className={styles.track}>
        <span ref={barRef} className={styles.bar} />
      </span>
    </div>
  );
}
