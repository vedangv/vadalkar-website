import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Vadalkar And Associates - Structural & Civil Engineering Consultants";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#1e3a5f",
          fontFamily: "system-ui",
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            width: "80px",
            height: "4px",
            backgroundColor: "#d97706",
            marginBottom: "40px",
          }}
        />

        {/* Company name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          Vadalkar And Associates
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            marginBottom: "auto",
          }}
        >
          Structural & Civil Engineering Consultants
        </div>

        {/* Bottom line */}
        <div
          style={{
            fontSize: "28px",
            color: "#d97706",
          }}
        >
          {`Mumbai, India \u2022 Since 1994`}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
