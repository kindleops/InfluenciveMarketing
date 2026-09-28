"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { process } from "@/content/process";
import { SectionHeading } from "@/components/ui/Typography";
import styles from "./ProcessTimeline.module.css";

/**
 * Process — "How do you operate?"
 * A pinned stage counter tracks the stage crossing the centre of the
 * viewport; stages brighten as they become current.
 */
export function ProcessTimeline({ showHeading = true }: { showHeading?: boolean }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const stage = process[active];

  return (
    <div className={styles.wrap}>
      {showHeading && (
        <SectionHeading
          id="process-title"
          eyebrow="Approach"
          index="07"
          layout="split"
          title={["Methodical by design.", <em key="a" className="t-accent">Creative by nature.</em>]}
          lead="Seven stages, each with defined outputs. The creativity is in the work — the process is deliberately predictable."
        />
      )}

      <div className={styles.grid} style={{ "--progress": active / (process.length - 1) } as CSSProperties}>
        <div className={styles.counter} aria-hidden="true">
          <div className={styles.counterInner}>
            <span className={styles.bigNum} key={stage.index}>
              {stage.index}
            </span>
            <span className={styles.of}>/ {String(process.length).padStart(2, "0")}</span>
            <span className={styles.stageName} key={stage.name}>
              {stage.name}
            </span>
            <span className={styles.rail}>
              <span className={styles.railFill} />
            </span>
          </div>
        </div>

        <ol className={styles.stages} role="list">
          {process.map((s, i) => (
            <li
              key={s.name}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              data-active={i === active || undefined}
              className={styles.stage}
            >
              <div className={styles.stageHead}>
                <span className={styles.stageIdx}>{s.index}</span>
                <h3 className={styles.stageTitle}>{s.name}</h3>
              </div>
              <p className={styles.stageLine}>{s.line}</p>
              <p className={styles.stageDetail}>{s.detail}</p>
              <ul className={styles.outputs} role="list" aria-label={`${s.name} outputs`}>
                {s.outputs.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
