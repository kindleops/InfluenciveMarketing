import type { LocationPage } from "./types";
import { markets } from "./markets";

/**
 * Market pages. We're a remote team, so most entries are `presence:
 * "remote"` and say so on the page; an office or a local team is listed only
 * where one genuinely exists (with its address, for an office). Each page is
 * written for its market — see the rules on LocationPage.
 */
export const locationPages: LocationPage[] = [...markets];
