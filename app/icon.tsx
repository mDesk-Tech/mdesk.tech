import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

// Image generation
export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "24px",
            height: "24px",
            background: "linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)",
            borderRadius: "4px",
            transform: "rotate(45deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "24px",
            height: "24px",
            background: "linear-gradient(45deg, #06b6d4 0%, #14b8a6 100%)",
            borderRadius: "4px",
            transform: "rotate(12deg)",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "18px",
            height: "18px",
            backgroundColor: "black",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{ color: "white", fontWeight: "bold", fontSize: "12px" }}
          >
            m
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
