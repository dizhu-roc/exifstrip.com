import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["leaflet", "react-leaflet", "@react-leaflet/core"],
  images: {
    // 允许 quality=100（如 Logo 需无损），默认仅 [75]
    qualities: [100, 75],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
