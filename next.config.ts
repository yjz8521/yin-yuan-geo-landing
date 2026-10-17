import type { NextConfig } from "next";

const basePath = "/yin-yuan-geo-landing";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
};

export default nextConfig;
