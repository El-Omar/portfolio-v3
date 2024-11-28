import type { NextConfig } from "next";
import withSvgr from "next-svgr";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
    ],
  },
};

export default withSvgr(nextConfig);
