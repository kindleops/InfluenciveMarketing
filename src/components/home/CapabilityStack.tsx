"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { capabilityLayers } from "@/content/capabilities";
import styles from "./CapabilityStack.module.css";

/**
 * Capabilities — "What can you do?"
 *
 * Twelve capabilities presented as six layers of one machine. Selecting a
 * layer lights its position in the stack and the flow that runs through it.
 * Desktop: vertical tablist + detail panel. Mobile: the same data recomposed
 * as an accordion (the tab list itself expands in place).
 */
export function CapabilityStack() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = capabilityLayers.length - 1;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  const layer = capabilityLayers[active];

  return (
    <div className={styles.stack} style={{ "--active": active, "--count": capabilityLayers.length } as CSSProperties}>
      <div className={styles.list} role="tablist" aria-orientation="vertical" aria-label="Capability layers" data-stagger="">
        {capabilityLayers.map((l, i) => {
          const selected = i === active;
          return (
            <div key={l.id} className={styles.row} data-active={selected || undefined} data-passed={i < active || undefined}>
              <button
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                className={styles.tab}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setActive(i);
                }}
              >
                <span className={styles.node} aria-hidden="true" />
                <span className={styles.index}>{l.index}</span>
                <span className={styles.name}>{l.layer}</span>
                <span className={styles.question}>{l.question}</span>
                <span className={styles.count}>
                  {l.capabilities.map((c) => c.name).join(" · ")}
                </span>
              </button>

              {/* Mobile: detail expands inline under the active row. */}
              <div className={styles.inline} aria-hidden={!selected}>
                <div className={styles.inlineInner}>
                  <p className={styles.inlineSummary}>{l.summary}</p>
                  {l.capabilities.map((c) => (
                    <div key={c.name} className={styles.inlineCap}>
                      <p className={styles.capName}>{c.name}</p>
                      <p className={styles.capLine}>{c.line}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`glass ${styles.panel}`}
        data-level="3"
        data-pointer-light=""
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${active}`}
        data-reveal="scale"
      >
        <div className={styles.panelTop}>
          <span className={styles.panelLabel}>
            Layer {layer.index} <i>/</i> 06
          </span>
          <ol className={styles.meter} aria-hidden="true">
            {capabilityLayers.map((l, i) => (
              <li key={l.id} data-on={i <= active || undefined} />
            ))}
          </ol>
        </div>

        <div className={styles.panelBody} key={layer.id}>
          <h3 className={styles.panelTitle}>{layer.layer}</h3>
          <p className={styles.panelSummary}>{layer.summary}</p>

          <div className={styles.caps}>
            {layer.capabilities.map((c, i) => (
              <div key={c.name} className={styles.cap} style={{ "--i": i } as CSSProperties}>
                <div className={styles.capHead}>
                  <span className={styles.capName}>{c.name}</span>
                  <span className={styles.capRule} aria-hidden="true" />
                </div>
                <p className={styles.capLine}>{c.line}</p>
                <ul className={styles.scope} role="list">
                  {c.scope.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className={styles.output}>
            <span className={styles.outputLabel}>Output</span>
            {layer.output}
          </p>
        </div>
      </div>
    </div>
  );
}
