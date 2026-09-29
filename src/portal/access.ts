import type { Capability, ClientRole } from "./model";

/**
 * Client-side roles. Studio (internal) roles live in the operating backend
 * and never pass through the client portal.
 */
const MATRIX: Record<ClientRole, readonly Capability[]> = {
  owner: ["approve", "billing", "invite", "download", "comment", "analytics"],
  admin: ["approve", "billing", "invite", "download", "comment", "analytics"],
  member: ["approve", "download", "comment", "analytics"],
  viewer: ["download", "analytics"],
};

export const ROLE_LABEL: Record<ClientRole, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
  viewer: "Viewer",
};

export function can(role: ClientRole, capability: Capability): boolean {
  return MATRIX[role].includes(capability);
}

export function capabilities(role: ClientRole): Capability[] {
  return [...MATRIX[role]];
}
