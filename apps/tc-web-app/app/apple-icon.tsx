import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#2c2621",
        color: "#eaa34c",
        display: "flex",
        flexDirection: "column",
        fontFamily: "serif",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div style={{ fontSize: 58, fontWeight: 900, lineHeight: 1 }}>TC</div>
      <div
        style={{
          color: "#faf8f5",
          fontFamily: "sans-serif",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 2,
          marginTop: 12,
          textTransform: "uppercase",
        }}
      >
        Tandoori
      </div>
    </div>,
    size,
  );
}
