/**
 * The moving light liquid glass sits over. Four pools in the site's light
 * roles on long, offset loops; `tone` picks the key light. Decorative, and
 * held while off-screen.
 */
export function LightField({ tone, intensity, className }: { tone?: "blue" | "gold" | "violet" | "teal"; intensity?: "low"; className?: string }) {
  return (
    <div
      className={["light-field", className].filter(Boolean).join(" ")}
      data-key={tone === "blue" ? undefined : tone}
      data-intensity={intensity}
      data-pause-offscreen=""
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}
