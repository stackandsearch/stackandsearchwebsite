import { ImageResponse } from "next/og";

// 180x180 PNG for iOS home screens from the owner's favicon, generated at
// build time. Full-bleed indigo: iOS rounds the corners itself.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background: "#3B3FE8",
        }}
      >
        <svg width="150" height="150" viewBox="0 0 64 64">
          <path
            d="M34 17H25a7.5 7.5 0 0 0 0 15h14a7.5 7.5 0 0 1 0 15H21"
            fill="none"
            stroke="#ffffff"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="46.5" cy="17" r="4.5" fill="#2BE3A8" />
        </svg>
      </div>
    ),
    size,
  );
}
