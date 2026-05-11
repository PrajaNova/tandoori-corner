import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.8.126"],
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "www.tandooricorner.com.sg",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
