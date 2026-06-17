import { ImageResponse } from "@takumi-rs/image-response";

export const runtime = "nodejs";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

/**
 * Render an Apple-style touch icon image.
 *
 * Generates an ImageResponse containing a 180×180 PNG of an app icon featuring a diagonal dark gradient background, an outer and inner decorative border, a bold monospace "M" at the center, and four colored corner indicators.
 *
 * @returns An ImageResponse containing a 180×180 PNG image of the icon
 */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
        position: "relative",
        borderRadius: 22,
      }}
    >
      {/* Outer border */}
      <div
        style={{
          position: "absolute",
          inset: 8,
          border: "4px solid #ff6b35",
          borderRadius: 16,
        }}
      />

      {/* Inner border */}
      <div
        style={{
          position: "absolute",
          inset: 14,
          border: "2px solid #00d4aa",
          borderRadius: 10,
        }}
      />

      {/* M letter */}
      <div
        style={{
          fontSize: 100,
          fontWeight: 900,
          fontFamily: "monospace",
          color: "#ff6b35",
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}
      >
        M
      </div>

      {/* Corners */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          width: 8,
          height: 8,
          background: "#00d4aa",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 18,
          right: 18,
          width: 8,
          height: 8,
          background: "#ff6b35",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 18,
          width: 8,
          height: 8,
          background: "#ff6b35",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 18,
          right: 18,
          width: 8,
          height: 8,
          background: "#00d4aa",
        }}
      />
    </div>,
    {
      ...size,
    },
  );
}
