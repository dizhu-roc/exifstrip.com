import type { Metadata } from "next";

const SITE_URL = "https://exifstrip.com";

export const metadata: Metadata = {
  title: "Blog – EXIF Tips, Privacy & How-To",
  description:
    "Tips for viewing and stripping EXIF, photo privacy, batch cleanup, and how to use ExifStrip. Strip metadata before sharing.",
  openGraph: {
    title: "Blog – EXIF Tips & Privacy | ExifStrip",
    description:
      "Tips and how-to: strip EXIF before sharing, remove GPS, export EXIF, batch clean. Photo privacy and ExifStrip usage.",
    url: `${SITE_URL}/blog`,
  },
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
