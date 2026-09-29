/* Helpers for building the developer fixture world. Not used in production. */

const DAY = 86_400_000;

/** Dates relative to the moment the fixture world was built. */
export function clock(now: number) {
  const base = new Date(now);
  base.setUTCMinutes(0, 0, 0);
  const at = (days: number, hour = 15, minute = 0) => {
    const d = new Date(base.getTime() + days * DAY);
    d.setUTCHours(hour, minute, 0, 0);
    return d.toISOString();
  };
  /** Hours relative to now (negative = past). */
  const h = (hours: number) => new Date(base.getTime() + hours * 3_600_000).toISOString();
  return { at, h, now: base.getTime() };
}

/** Deterministic PRNG so the demo world is identical on every boot. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const dayKey = (t: number) => new Date(t).toISOString().slice(0, 10);
export { DAY };
