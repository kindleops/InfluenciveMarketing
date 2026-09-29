"use client";

import { useEffect, useState } from "react";
import { PAnchor, PButton, Tip } from "./ui";

/** Fullscreen for the stage around a preview. */
export function FullscreenButton({ targetId }: { targetId: string }) {
  const [on, setOn] = useState(false);
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    setSupported(!!document.fullscreenEnabled);
    const f = () => setOn(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", f);
    return () => document.removeEventListener("fullscreenchange", f);
  }, []);
  if (!supported) return null;
  return (
    <PButton
      size="sm"
      variant="ghost"
      icon="expand"
      onClick={() => {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.getElementById(targetId)?.requestFullscreen();
      }}
    >
      {on ? "Exit full screen" : "Full screen"}
    </PButton>
  );
}

/** Downloads only what actually exists; otherwise says why it can't. */
export function DownloadButton({ href, name, allowed, label = "Download" }: { href?: string; name: string; allowed: boolean; label?: string }) {
  if (href && allowed)
    return (
      <PAnchor href={href} download={name} size="sm" variant="secondary" icon="download">
        {label}
      </PAnchor>
    );
  const why = !allowed ? "Your role can’t download files on this account." : "Files become downloadable once file storage is connected.";
  return (
    <Tip tip={why}>
      <PButton size="sm" variant="secondary" icon="download" aria-disabled="true" onClick={(e) => e.preventDefault()}>
        {label}
        <span className="sr-only"> — unavailable. {why}</span>
      </PButton>
    </Tip>
  );
}
