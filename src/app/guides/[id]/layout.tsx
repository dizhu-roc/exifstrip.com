import type { Metadata } from "next";
import { getGuideSeo } from "@/data/guideSeo";

const SITE_URL = "https://exifstrip.com";

type Props = { params: Promise<{ id: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const seo = getGuideSeo(id);
  if (!seo) {
    return {
      title: "Guide not found",
      robots: { index: false, follow: true },
    };
  }
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: `${seo.title} | ExifStrip`,
      description: seo.description,
      url: `${SITE_URL}/guides/${id}`,
    },
    alternates: { canonical: `${SITE_URL}/guides/${id}` },
  };
}

export default function GuideIdLayout({ children }: { children: React.ReactNode }) {
  return children;
}
