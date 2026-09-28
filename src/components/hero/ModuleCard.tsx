"use client";

import { useEffect, useRef } from "react";
import {
  AcquisitionModule,
  AutomationModule,
  BrandModule,
  ConversionModule,
  ExperienceModule,
  FocusSheen,
  IntelligenceModule,
} from "./ConsoleModules";
import styles from "./ModuleCard.module.css";

const EVENTS = [
  { n: 4, k: "route.assigned", d: "→ enterprise pod", tone: "", time: "09:41:14" },
  { n: 3, k: "score.computed", d: "fit 0.86 · intent high", tone: "positive", time: "09:41:11" },
  { n: 2, k: "enrich.account", d: "fintech · 51–200 · EMEA", tone: "", time: "09:41:08" },
  { n: 1, k: "lead.created", d: "source organic · /pricing", tone: "brand", time: "09:41:05" },
];

const MODULES: Record<string, () => React.ReactNode> = {
  brand: () => <BrandModule />,
  experience: () => <ExperienceModule />,
  acquisition: () => <AcquisitionModule />,
  conversion: () => <ConversionModule />,
  automation: () => <AutomationModule events={EVENTS} />,
  intelligence: () => <IntelligenceModule />,
};

/**
 * One layer's module from the system console, lifted out and displayed on
 * its own lit stage. It performs its entrance when it scrolls into view —
 * the same choreography as a close-up in the product film.
 */
export function ModuleCard({ layer }: { layer: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.setAttribute("data-active", "");
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const render = MODULES[layer];
  if (!render) return null;
  return (
    <div className={`lit-stage ${styles.stage}`} data-pause-offscreen="" aria-hidden="true">
      <div ref={ref} className={`glass ${styles.card}`} data-level="3" data-pointer-light="" data-layer={layer}>
        <FocusSheen />
        {render()}
      </div>
    </div>
  );
}
