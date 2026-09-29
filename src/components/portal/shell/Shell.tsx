import type { CSSProperties, ReactNode } from "react";
import { Atmosphere } from "./Atmosphere";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { PaletteHost } from "./PaletteHost";
import { Providers } from "./Providers";
import { Sidebar } from "./Sidebar";
import type { ShellData } from "./types";
import s from "./shell.module.css";

export function Shell({ data, children }: { data: ShellData; children: ReactNode }) {
  return (
    <Providers>
      <div className={s.root} style={{ "--p-accent": `var(--light-${data.client.accent})` } as CSSProperties}>
        <a href="#portal-main" className="skip-link">
          Skip to content
        </a>
        <Atmosphere />
        <Sidebar data={data} />
        <div className={s.main}>
          <Header data={data} />
          <main id="portal-main" className={s.content} tabIndex={-1}>
            {children}
          </main>
        </div>
        <MobileNav data={data} />
        <PaletteHost />
      </div>
    </Providers>
  );
}
