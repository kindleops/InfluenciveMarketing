"use client";

import { lazy, Suspense, useEffect, useState } from "react";

const Palette = lazy(() => import("./Palette"));

/**
 * Listens for ⌘K / Ctrl-K (and the header's search button) and loads the
 * palette's code and search index only on first use.
 */
export function PaletteHost() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const show = () => {
      setLoaded(true);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setLoaded(true);
        setOpen((o) => !o);
      }
      if (e.key === "/" && !(e.target as HTMLElement).closest("input,textarea,[contenteditable]")) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("portal:palette", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("portal:palette", show);
    };
  }, []);
  if (!loaded) return null;
  return (
    <Suspense fallback={null}>
      <Palette open={open} onClose={() => setOpen(false)} />
    </Suspense>
  );
}
