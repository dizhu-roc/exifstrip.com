import type { MetadataRoute } from "next";
import { GUIDES_CATEGORIES } from "@/data/guidesStructure";
import { BLOG_CATEGORIES } from "@/data/blogStructure";

const BASE = "https://exifstrip.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const guideEntries: MetadataRoute.Sitemap = GUIDES_CATEGORIES.flatMap((cat) =>
    cat.entries.map((e) => ({
      url: `${BASE}/guides/${e.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  const blogEntries: MetadataRoute.Sitemap = BLOG_CATEGORIES.flatMap((cat) =>
    cat.entries.map((e) => ({
      url: `${BASE}/blog/${e.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...guideEntries, ...blogEntries];
}
