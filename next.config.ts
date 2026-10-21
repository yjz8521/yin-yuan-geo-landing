import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH || "";

/** Single site-origin switch: SITE_URL (or NEXT_PUBLIC_SITE_URL). Default stays the Vercel URL in src/lib/site.ts. */
const siteUrl = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  env: siteUrl ? { NEXT_PUBLIC_SITE_URL: siteUrl } : {},
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
};

export default nextConfig;
