import type { Metadata } from "next";
import { getBlogSeo } from "@/data/blogSeo";

const SITE_URL = "https://exifstrip.com";

type Props = { params: Promise<{ id: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const seo = getBlogSeo(id);
  if (!seo) {
    return {
      title: "Post not found",
      robots: { index: false, follow: true },
    };
  }
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: `${seo.title} | ExifStrip`,
      description: seo.description,
      url: `${SITE_URL}/blog/${id}`,
    },
    alternates: { canonical: `${SITE_URL}/blog/${id}` },
  };
}

export default function BlogIdLayout({ children }: { children: React.ReactNode }) {
  return children;
}
