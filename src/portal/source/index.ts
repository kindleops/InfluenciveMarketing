import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import type { ClientRole } from "../model";
import type { Portal } from "./types";

export type { Portal, PortalSource, Person, CommentTarget } from "./types";

export const CLIENT_COOKIE = "portal-client";
export const ROLE_COOKIE = "portal-demo-role";

/**
 * Where portal data comes from.
 *
 *   fixtures     developer-only demo world. On automatically in `next dev`;
 *                elsewhere only with PORTAL_DATA=fixtures, and never on a
 *                production Vercel deployment. Every screen shows a
 *                "Demo data" marker while it is on.
 *   unconnected  no operating backend is wired yet: the portal renders its
 *                access screen and no client data at all.
 */
export function portalMode(): "fixtures" | "unconnected" {
  if (process.env.VERCEL_ENV === "production") return "unconnected";
  const flag = process.env.PORTAL_DATA;
  if (flag === "fixtures") return "fixtures";
  if (flag === "off") return "unconnected";
  return process.env.NODE_ENV === "development" ? "fixtures" : "unconnected";
}

const ROLES: ClientRole[] = ["owner", "admin", "member", "viewer"];

/** The signed-in portal for this request, or null when none is available. */
export const getPortal = cache(async (): Promise<Portal | null> => {
  // Read the request first: the portal is always rendered per request, never
  // prerendered, whichever source is active.
  const jar = await cookies();
  if (portalMode() !== "fixtures") return null;
  const clientId = jar.get(CLIENT_COOKIE)?.value;
  const roleCookie = jar.get(ROLE_COOKIE)?.value as ClientRole | undefined;
  const role = roleCookie && ROLES.includes(roleCookie) ? roleCookie : undefined;
  const { openFixturePortal } = await import("./fixture");
  return openFixturePortal(clientId, role);
});
