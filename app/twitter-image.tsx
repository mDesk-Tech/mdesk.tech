import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "mdesk.tech - Designing and hosting your digital future";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0f1117",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(6, 182, 212, 0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(20, 184, 166, 0.15) 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          position: "relative",
        }}
      >
        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px",
            maxWidth: "900px",
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "80px",
                height: "80px",
                marginRight: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "80px",
                  height: "80px",
                  background:
                    "linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)",
                  borderRadius: "8px",
                  transform: "rotate(45deg)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: "80px",
                  height: "80px",
                  background:
                    "linear-gradient(45deg, #06b6d4 0%, #14b8a6 100%)",
                  borderRadius: "8px",
                  transform: "rotate(12deg)",
                  opacity: 0.7,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#0f1117",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "32px",
                  }}
                >
                  m
                </span>
              </div>
            </div>
            <span
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                background: "linear-gradient(to right, #06b6d4, #14b8a6)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              mdesk.tech
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "white",
              margin: "0 0 24px 0",
              lineHeight: 1.2,
            }}
          >
            Designing Your Digital Future
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              margin: "0",
              maxWidth: "700px",
            }}
          >
            Cutting-edge web design and reliable hosting solutions for
            businesses that want to stand out
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "30%",
            width: "400px",
            height: "400px",
            borderRadius: "100%",
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(20, 184, 166, 0.1) 50%, transparent 80%)",
            transform: "translate(-50%, -50%)",
            opacity: 0.6,
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "20%",
            width: "300px",
            height: "300px",
            borderRadius: "100%",
            background:
              "radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 80%)",
            opacity: 0.5,
            zIndex: 1,
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
