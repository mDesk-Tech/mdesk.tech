/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  typescript: {
    // Skip type checking during `next build`
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  reactCompiler: true,
  experimental: {
    cssChunking: "strict",
    useCache: true,
    optimizeCss: true,
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@radix-ui/react-dialog",
      "motion",
      "dotted-map",
      "react",
      "react-dom",
    ],
  },
  // Optimize server components for better performance
  serverExternalPackages: ["mongodb"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    unoptimized: true,
  },
  compress: true,
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
    },
  },
  turbopack: {
    root: ".",
  },
  // Enable SWC minification for faster builds
  // Optimize production bundle
  productionBrowserSourceMaps: false,
  // Optimize output for better performance
  poweredByHeader: false,
  // Enable gzip compression
  httpAgentOptions: {
    keepAlive: true,
  },
};

export default nextConfig;
