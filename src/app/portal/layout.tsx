import type { Metadata } from "next";
import "@/styles/portal.css";

export const metadata: Metadata = {
  title: { default: "Client portal", template: "%s — Client portal" },
  robots: { index: false, follow: false },
};

export default function PortalRoot({ children }: { children: React.ReactNode }) {
  return <div data-portal="">{children}</div>;
}
