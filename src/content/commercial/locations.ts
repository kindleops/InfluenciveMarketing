import type { LocationPage } from "./types";

/**
 * Intentionally empty. Add an entry only for a city where the studio has an
 * office or people on the ground (`presence`), with local content written
 * for that place. Until then /locations returns 404 and nothing is listed in
 * the sitemap — pages for places we don't operate in are doorway pages.
 */
export const locationPages: LocationPage[] = [];
