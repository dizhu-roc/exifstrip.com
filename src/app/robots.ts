import type { MetadataRoute } from "next";

const BASE = "https://exifstrip.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: [] },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
