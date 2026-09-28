"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/motion";

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

/**
 * Inertial scrolling on desktop only. Touch devices keep native momentum;
 * reduced-motion users keep native scroll entirely.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const instance = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 0.95,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -88 },
    });
    lenis = instance;
    let raf = requestAnimationFrame(function loop(time) {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
