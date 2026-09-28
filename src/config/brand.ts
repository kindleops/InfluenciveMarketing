/**
 * Brand configuration — the single source of truth for identity.
 *
 * The visual system, interaction system and content architecture are built
 * to be identity-agnostic. To rebrand, change the values here (and swap the
 * glyph in `components/brand/BrandMark.tsx`). Nothing else in the codebase
 * references the company name directly.
 */
export const brand = {
  /** Temporary working name. Replace when the final identity is selected. */
  name: "Influencive",
  /** Legal entity, used in the footer and legal pages. */
  legalName: "Influencive",
  /** Core positioning line. */
  positioning: "Brand. Product. Growth. Intelligence.",
  tagline: "Build what growth requires.",
  description:
    "We combine brand, product, growth, automation and intelligence to build connected digital systems for ambitious companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  email: "studio@example.com",
  /**
   * Social profiles. Leave a URL empty to hide it — the footer only renders
   * entries that have a real destination.
   */
  social: [
    { label: "LinkedIn", href: "" },
    { label: "X", href: "" },
    { label: "Instagram", href: "" },
    { label: "Dribbble", href: "" },
  ],
} as const;

export type Brand = typeof brand;
