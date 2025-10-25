import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 180,
  height: 180,
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
          borderRadius: "36px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "120px",
            height: "120px",
            background: "linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)",
            borderRadius: "16px",
            transform: "rotate(45deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "120px",
            height: "120px",
            background: "linear-gradient(45deg, #06b6d4 0%, #14b8a6 100%)",
            borderRadius: "16px",
            transform: "rotate(12deg)",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "90px",
            height: "90px",
            backgroundColor: "black",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{ color: "white", fontWeight: "bold", fontSize: "50px" }}
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
