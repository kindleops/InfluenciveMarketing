import type { CSSProperties } from "react";
import { LOGOS, type LogoSlug } from "@/content/logos";

/**
 * A brand mark, drawn in currentColor. `--brand` carries the owner's colour
 * for hover states; very dark brand colours fall back to white so they stay
 * visible on the dark site.
 */
export function BrandLogo({ slug, size = 20, className }: { slug: LogoSlug; size?: number; className?: string }) {
  const logo = LOGOS[slug];
  const hex = logo.hex;
  const lum = (0.299 * parseInt(hex.slice(0, 2), 16) + 0.587 * parseInt(hex.slice(2, 4), 16) + 0.114 * parseInt(hex.slice(4, 6), 16)) / 255;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      style={{ "--brand": lum < 0.28 ? "#ffffff" : `#${hex}` } as CSSProperties}
    >
      <path d={logo.path} />
    </svg>
  );
}
