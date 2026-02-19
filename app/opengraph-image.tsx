import { ImageResponse } from "@takumi-rs/image-response";

export const runtime = "nodejs";
export const alt = "mdesk.tech - Designing and hosting your digital future";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * OG image generator
 */
export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#0a0a0a",
        position: "relative",
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />

      {/* Border */}
      <div
        style={{
          position: "absolute",
          inset: 20,
          border: "6px solid #ff6b35",
          borderRadius: 8,
        }}
      />

      {/* Inner border */}
      <div
        style={{
          position: "absolute",
          inset: 32,
          border: "2px solid #00d4aa",
          borderRadius: 4,
        }}
      />

      {/* Corners */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 24,
          height: 24,
          background: "#ff6b35",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          width: 24,
          height: 24,
          background: "#00d4aa",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          width: 24,
          height: 24,
          background: "#00d4aa",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 24,
          height: 24,
          background: "#ff6b35",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
          gap: 24,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* Logo box */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 100,
              background: "#ff6b35",
              border: "4px solid #ff6b35",
              boxShadow: "8px 8px 0 0 rgba(0, 212, 170, 0.5)",
            }}
          >
            <span
              style={{
                fontSize: 64,
                fontWeight: 900,
                fontFamily: "monospace",
                color: "#0a0a0a",
                lineHeight: 1,
              }}
            >
              M
            </span>
          </div>

          {/* Brand */}
          <h1
            style={{
              fontSize: 72,
              fontWeight: 900,
              fontFamily: "sans-serif",
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            mdesk.tech
          </h1>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(0, 212, 170, 0.1)",
            padding: "24px 48px",
            border: "2px solid #00d4aa",
            borderRadius: 4,
          }}
        >
          <p
            style={{
              fontSize: 36,
              fontWeight: 700,
              fontFamily: "monospace",
              color: "#00d4aa",
              lineHeight: 1.3,
              margin: 0,
              textAlign: "center",
            }}
          >
            Designing Your Digital Future
          </p>
        </div>

        {/* Subtext */}
        <p
          style={{
            fontSize: 24,
            fontFamily: "sans-serif",
            color: "#a0a0a0",
            maxWidth: 700,
            lineHeight: 1.5,
            margin: 0,
            textAlign: "center",
          }}
        >
          Cutting-edge web design and reliable hosting solutions
        </p>

        {/* Pixels */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 16,
          }}
        >
          <div style={{ width: 12, height: 12, background: "#ff6b35" }} />
          <div style={{ width: 12, height: 12, background: "#00d4aa" }} />
          <div style={{ width: 12, height: 12, background: "#ff6b35" }} />
          <div style={{ width: 12, height: 12, background: "#00d4aa" }} />
          <div style={{ width: 12, height: 12, background: "#ff6b35" }} />
        </div>
      </div>

      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 212, 170, 0.02)",
          pointerEvents: "none",
        }}
      />
    </div>,
    {
      ...size,
    },
  );
}
