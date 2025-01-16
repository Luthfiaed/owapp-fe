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
      },
      {
        protocol: "http",
        hostname: "ec2-18-139-223-159.ap-southeast-1.compute.amazonaws.com"
      },
    ]
  }
};

export default nextConfig;
