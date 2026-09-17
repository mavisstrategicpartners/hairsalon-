import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
  async redirects() {
    return [{ source: "/collections", destination: "/shop", permanent: false }];
  },
};

export default nextConfig;
