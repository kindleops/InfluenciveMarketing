import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";
import { MARK_PATHS } from "@/components/brand/mark";

export const alt = `${brand.name} — ${brand.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(60% 70% at 72% 0%, rgba(74,114,255,0.45), transparent 70%), radial-gradient(40% 40% at 90% 30%, rgba(155,140,255,0.2), transparent 70%), #07080a",
          color: "#ece8e1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 34, letterSpacing: -1.5, fontWeight: 500 }}>
          <svg width="38" height="38" viewBox="0 0 24 24">
            <path d={MARK_PATHS.rear} fill="#ece8e1" fillOpacity="0.45" />
            <path d={MARK_PATHS.front} fill="#ece8e1" />
          </svg>
          {brand.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 112, lineHeight: 0.92, letterSpacing: -6, fontWeight: 600 }}>
          <span>Build what</span>
          <span style={{ color: "#9fb5ff" }}>growth requires.</span>
        </div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "rgba(236,232,225,0.6)" }}>
          {brand.positioning}
        </div>
      </div>
    ),
    size,
  );
}
