/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  serverExternalPackages: ["mongodb"],
  experimental: {
    // Enable optimizations
    optimizeCss: true,
    optimizePackageImports: ["framer-motion", "lucide-react"],
    serverActions: {
      bodySizeLimit: "2mb",
    },
    // Improve code splitting
    webpackBuildWorker: true,
    // Add these new optimizations
    optimizeServerReact: true,
    turbo: {},
  },
};

export default nextConfig;
