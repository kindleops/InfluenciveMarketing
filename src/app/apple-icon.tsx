import { ImageResponse } from "next/og";
import { MARK_PATHS } from "@/components/brand/mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the apex mark on the void, with a low horizon glow. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(70% 45% at 50% 100%, rgba(130,158,255,0.28), transparent 70%), #07080a",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 24 24" style={{ marginTop: -6 }}>
          <path d={MARK_PATHS.rear} fill="#f1efea" fillOpacity="0.45" />
          <path d={MARK_PATHS.front} fill="#f1efea" />
        </svg>
      </div>
    ),
    size,
  );
}
