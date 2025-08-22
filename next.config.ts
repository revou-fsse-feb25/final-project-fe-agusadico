import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      { protocol: 'https', hostname: '**.ufs.sh' },
      { protocol: 'https', hostname: 'ufs.sh' },
      { protocol: 'http', hostname: 'localhost', port: '4005' },
    ],
  },
};

export default nextConfig;
