import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#2c2621",
        color: "#eaa34c",
        display: "flex",
        fontFamily: "serif",
        fontSize: 17,
        fontWeight: 900,
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      TC
    </div>,
    size,
  );
}
