import { Shell } from "@/components/portal/shell/Shell";
import { loadShell, requirePortal } from "@/portal/server";

export default async function PortalAppLayout({ children }: { children: React.ReactNode }) {
  const portal = await requirePortal();
  const data = await loadShell(portal);
  return <Shell data={data}>{children}</Shell>;
}
