/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Skip type checking during `next build`
    ignoreBuildErrors: true,
  },
  // Optimize CSS delivery
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // CSS chunking to reduce blocking
  // experimental: {
  //   cssChunking: "strict",
  // },
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
