import { ImageResponse } from "next/og";

import { restaurantSeo } from "@/lib/seo";

export const alt =
  "Tandoori Corner North Indian restaurant in Balestier, Singapore";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#2c2621",
        color: "#faf8f5",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        height: "100%",
        justifyContent: "space-between",
        padding: 72,
        width: "100%",
      }}
    >
      <div
        style={{
          color: "#eaa34c",
          fontFamily: "serif",
          fontSize: 84,
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        Tandoori Corner
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 840,
        }}
      >
        <div
          style={{
            color: "#faf8f5",
            fontFamily: "serif",
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          North Indian Dining at Balestier Plaza
        </div>
        <div style={{ color: "#e3d6c8", fontSize: 30, lineHeight: 1.35 }}>
          Alfresco dining, TCB Bar, takeaway, delivery, and catering in
          Singapore.
        </div>
      </div>
      <div
        style={{
          alignItems: "center",
          borderTop: "2px solid #8a4a2e",
          color: "#eaa34c",
          display: "flex",
          fontSize: 24,
          fontWeight: 700,
          justifyContent: "space-between",
          paddingTop: 28,
          textTransform: "uppercase",
          width: "100%",
        }}
      >
        <span>Est. 2008</span>
        <span>{restaurantSeo.siteUrl.replace("https://", "")}</span>
      </div>
    </div>,
    size,
  );
}
