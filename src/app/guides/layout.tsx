import type { Metadata } from "next";

const SITE_URL = "https://exifstrip.com";

export const metadata: Metadata = {
  title: "EXIF Guide – How to View, Edit & Remove EXIF",
  description:
    "Understand EXIF, privacy, and how to use ExifStrip. What is EXIF? How to view EXIF online? How to remove GPS from photos? Which EXIF fields are sensitive? Free guides.",
  openGraph: {
    title: "EXIF Guide – How to View, Edit & Remove EXIF | ExifStrip",
    description:
      "Free EXIF guides: what is EXIF, how to view and strip EXIF, which fields are sensitive, remove GPS for privacy.",
    url: `${SITE_URL}/guides`,
  },
  alternates: { canonical: `${SITE_URL}/guides` },
};

export default function GuidesLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
