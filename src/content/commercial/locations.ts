import type { LocationPage } from "./types";
import { markets } from "./markets";

/**
 * Market pages. Most entries are `presence: "remote"` — served without a
 * premises there, which the copy never implies; an office or a local team is listed only
 * where one genuinely exists (with its address, for an office). Each page is
 * written for its market — see the rules on LocationPage.
 */
export const locationPages: LocationPage[] = [...markets];
