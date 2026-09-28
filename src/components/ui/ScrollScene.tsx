"use client";

import { useRef, type ReactNode } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Offset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/**
 * Writes this element's scroll progress (0–1) to a CSS variable on itself,
 * so server-rendered children can be choreographed in CSS. With reduced
 * motion the variable is pinned to 1 (the resolved state).
 */
export function ScrollScene({
  name,
  offset = ["start 0.9", "end 0.5"],
  className,
  children,
}: {
  name: `--${string}`;
  offset?: Offset;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    ref.current?.style.setProperty(name, reduced ? "1" : p.toFixed(4));
  });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
