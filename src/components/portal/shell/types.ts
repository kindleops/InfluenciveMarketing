import type { Accent, ClientRole } from "@/portal/model";

export interface ShellData {
  client: { id: string; name: string; monogram: string; accent: Accent; meta: string };
  clients: { id: string; name: string; monogram: string }[];
  user: { id: string; name: string; title: string; role: ClientRole; roleLabel: string };
  demo: boolean;
  counts: { approvals: number; messages: number };
  notifications: { id: string; kind: string; title: string; body?: string; href: string; read: boolean; ago: string }[];
  team: { id: string; name: string; title: string; focus?: string }[];
  signal: string;
  canBilling: boolean;
}
