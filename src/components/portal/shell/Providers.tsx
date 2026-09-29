"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Motion follows the visitor's reduced-motion preference everywhere in the portal. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
