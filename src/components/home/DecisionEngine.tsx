"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import { scenarios } from "@/content/intelligence";
import styles from "./DecisionEngine.module.css";

const KIND_LABEL = { auto: "Automation", ai: "AI", decision: "Rule", human: "Human", learn: "Feedback" } as const;

/**
 * A working-looking workflow runner. Steps execute in sequence; switching
 * scenario restarts the run. Pauses offscreen. Reduced motion shows the
 * completed run.
 */
export function DecisionEngine() {
  const [sid, setSid] = useState(0);
  const [step, setStep] = useState(-1);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const scenario = scenarios[sid];
  const total = scenario.steps.length;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setStep(total);
      return;
    }
    if (!visible) return;
    const id = setInterval(() => {
      setStep((s) => (s >= total + 3 ? -1 : s + 1));
    }, 850);
    return () => clearInterval(id);
  }, [visible, reduced, total, sid]);

  const select = (i: number) => {
    setSid(i);
    setStep(reduced ? scenarios[i].steps.length : -1);
  };

  const done = step >= total;

  return (
    <div ref={ref} className={`glass ${styles.engine}`} data-level="3" data-pointer-light="">
      <div className={styles.head}>
        <div className={styles.tabs} role="group" aria-label="Example workflows">
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={i === sid}
              className={styles.tab}
              onClick={() => select(i)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <span className={styles.badge}>Example workflow</span>
      </div>

      <div className={styles.body}>
        <div className={styles.input}>
          <span className={styles.micro}>Input</span>
          <p className={styles.inputTitle}>{scenario.input.title}</p>
          <ul role="list">
            {scenario.input.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>

        <ol className={styles.steps} style={{ "--progress": Math.max(0, Math.min(step, total - 1)) / (total - 1) } as CSSProperties}>
          {scenario.steps.map((s, i) => {
            const state = i < step ? "done" : i === step ? "running" : "pending";
            return (
              <li key={s.name + i} className={styles.step} data-state={state} data-kind={s.kind}>
                <span className={styles.marker} aria-hidden="true">
                  {state === "done" ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5.2 4.1 7.3 8 2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </span>
                <span className={styles.stepName}>{s.name}</span>
                <span className={styles.stepKind}>{KIND_LABEL[s.kind]}</span>
                <span className={styles.stepDetail}>{s.detail}</span>
              </li>
            );
          })}
        </ol>

        <div className={styles.outcome} data-on={done || undefined}>
          <span className={styles.micro}>Outcome</span>
          <p>{done ? scenario.outcome : "Running…"}</p>
        </div>
      </div>
    </div>
  );
}
