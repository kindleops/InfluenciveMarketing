/**
 * Motion tokens mirrored for JavaScript-driven animation.
 * Keep in sync with the `--ease-*` / `--dur-*` custom properties in tokens.css.
 */
export const ease = {
  out: [0.16, 1, 0.3, 1],
  soft: [0.25, 1, 0.5, 1],
  inOut: [0.65, 0, 0.35, 1],
  emphasized: [0.2, 0, 0, 1],
  in: [0.55, 0, 1, 0.45],
} as const satisfies Record<string, readonly [number, number, number, number]>;

export const duration = {
  micro: 0.16,
  ui: 0.28,
  reveal: 0.76,
  cinematic: 1.2,
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Map v from [a,b] to [0,1], clamped. */
export const progress = (v: number, a: number, b: number) => clamp((v - a) / (b - a));
