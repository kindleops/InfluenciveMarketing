import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/system/RevealObserver";
import { InteractionLayer } from "@/components/system/InteractionLayer";
import { SmoothScroll } from "@/components/system/SmoothScroll";
import { Intro } from "@/components/system/Intro";
import { ChapterIndicator } from "@/components/system/ChapterIndicator";
import { CommandPalette } from "@/components/search/CommandPalette";

/**
 * The marketing site's frame: header, footer, film grain and the scroll /
 * pointer systems. The client portal has its own shell and never loads these.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Intro />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <div className="grain" aria-hidden="true" />
      <ChapterIndicator />
      <RevealObserver />
      <InteractionLayer />
      <SmoothScroll />
      <CommandPalette />
    </>
  );
}
