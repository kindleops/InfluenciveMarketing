import type { CSSProperties, ElementType, ReactNode } from "react";
import styles from "./Surface.module.css";

/* ---------------------------------------------------------------------------
   GlassSurface — the material. See styles/materials.css for construction.
--------------------------------------------------------------------------- */
export function GlassSurface({
  as: Tag = "div",
  level = 2,
  interactive = false,
  tilt,
  className,
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  level?: 1 | 2 | 3 | 4;
  /** Pointer-tracked internal light. */
  interactive?: boolean;
  /** Max tilt in degrees (desktop, motion allowed). */
  tilt?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: `data-${string}`]: unknown;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
  role?: string;
}) {
  return (
    <Tag
      className={["glass", tilt ? styles.tilt : null, className].filter(Boolean).join(" ")}
      data-level={level}
      data-interactive={interactive || undefined}
      data-pointer-light={interactive ? "" : undefined}
      data-tilt={tilt || undefined}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
   Section — a scene. `tone` sets the lighting of the scene so the page has
   rhythm: some sections restrained and dark, others opening up with light.
--------------------------------------------------------------------------- */
type Tone = "void" | "dark" | "raised" | "lit" | "warm";

export function Section({
  as: Tag = "section",
  tone = "dark",
  id,
  className,
  children,
  spacing = "default",
  labelledBy,
  bleed = false,
}: {
  as?: ElementType;
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
  spacing?: "default" | "tight" | "none";
  labelledBy?: string;
  bleed?: boolean;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={[styles.section, styles[tone], styles[`space-${spacing}`], className].filter(Boolean).join(" ")}
    >
      {bleed ? children : <div className="container">{children}</div>}
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
   AmbientGlow — a local light source. Diffused, slow, never a "blob".
--------------------------------------------------------------------------- */
const glowColors = {
  // Moonlight, not neon: low-saturation light sources.
  brand: "170 186 235",
  violet: "190 182 232",
  cyan: "178 220 232",
  gold: "226 204 164",
  ivory: "247 245 240",
} as const;

export function AmbientGlow({
  color = "brand",
  size = 900,
  x = "50%",
  y = "50%",
  intensity = 0.18,
  drift = false,
  className,
}: {
  color?: keyof typeof glowColors;
  size?: number;
  x?: string;
  y?: string;
  intensity?: number;
  drift?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={[styles.glow, drift ? styles.drift : null, className].filter(Boolean).join(" ")}
      style={
        {
          "--glow-rgb": glowColors[color],
          "--glow-size": `${size}px`,
          "--glow-x": x,
          "--glow-y": y,
          "--glow-a": intensity,
        } as CSSProperties
      }
    />
  );
}
