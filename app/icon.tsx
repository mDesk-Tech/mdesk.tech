import { ImageResponse } from "@takumi-rs/image-response";

export const runtime = "nodejs";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

/**
 * Dynamic favicon generator
 */
export default function Icon() {
  return new ImageResponse(
    <div
      tw="flex items-center justify-center w-full h-full relative"
      style={{
        background: "#0a0a0a",
      }}
    >
      {/* Outer border */}
      <div
        style={{
          position: "absolute",
          inset: 2,
          border: "2px solid #ff6b35",
          borderRadius: 4,
        }}
      />

      {/* Inner border */}
      <div
        style={{
          position: "absolute",
          inset: 4,
          border: "1px solid #00d4aa",
          borderRadius: 2,
        }}
      />

      {/* M letter */}
      <div
        tw="font-bold text-center"
        style={{
          fontSize: 18,
          fontFamily: "Geist Mono",
          color: "#ff6b35",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          textShadow: "0 0 4px rgba(255, 107, 53, 0.5)",
        }}
      >
        M
      </div>

      {/* Pixel dots */}
      <div
        style={{
          position: "absolute",
          bottom: 5,
          right: 5,
          width: 3,
          height: 3,
          background: "#00d4aa",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 5,
          left: 5,
          width: 2,
          height: 2,
          background: "#ff6b35",
        }}
      />
    </div>,
    {
      ...size,
    },
  );
}
