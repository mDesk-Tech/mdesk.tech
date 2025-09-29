/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type checking during `next build`
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
