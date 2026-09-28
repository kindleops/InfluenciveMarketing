"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * The visitor's reduced-motion preference, safe across hydration.
 *
 * The server can't know the preference, so the first client render matches
 * the server (false) and React re-renders with the real value immediately
 * after hydrating — attributes such as `data-reduced` are then applied, and
 * the page also responds if the setting changes while it's open. (motion's
 * own hook reads the value once during hydration, where React keeps the
 * server's attributes, so reduced-motion styling never applied.)
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
