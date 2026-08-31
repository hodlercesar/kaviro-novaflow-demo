import { ImageResponse } from "next/og";

export const alt = "NovaFlow — Functional concept SaaS by KAVIRO Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: "#f7f8fb",
        background:
          "radial-gradient(circle at 75% 15%, #2b1d64 0%, #0a0c12 45%, #07090f 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 28,
          fontWeight: 800,
        }}
      >
        <span
          style={{
            width: 52,
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            background: "#7659f5",
          }}
        >
          N
        </span>
        NovaFlow
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            color: "#a999ff",
            fontSize: 24,
            textTransform: "uppercase",
            letterSpacing: 4,
          }}
        >
          KAVIRO Studio · Technical concept demo
        </span>
        <span
          style={{
            maxWidth: 980,
            marginTop: 22,
            fontSize: 76,
            lineHeight: 1.02,
            letterSpacing: -4,
            fontWeight: 750,
          }}
        >
          Revenue operations, without the chaos.
        </span>
        <span style={{ marginTop: 28, color: "#a4adbf", fontSize: 27 }}>
          Authenticated · Responsive · Fictional evaluation data
        </span>
      </div>
    </div>,
    size,
  );
}
