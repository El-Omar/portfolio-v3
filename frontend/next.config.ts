import { env } from "@/config/env";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withSvgr from "next-svgr";

const withNextIntl = createNextIntlPlugin(
  // Point to the request.ts file instead of i18n.ts
  "./src/i18n/request.ts"
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: `${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com`,
        protocol: "https",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default withSvgr(withNextIntl(nextConfig));
