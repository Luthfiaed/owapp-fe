import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakeimg.pl"
      },
      {
        protocol: "http",
        hostname: "localhost"
      }
    ]
  }
};

export default nextConfig;
