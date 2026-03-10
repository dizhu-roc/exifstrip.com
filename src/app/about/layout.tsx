import type { Metadata } from "next";

const SITE_URL = "https://exifstrip.com";

export const metadata: Metadata = {
  title: "About ExifStrip",
  description:
    "ExifStrip is a free online EXIF viewer, editor, and metadata remover. Your images never leave your device. No upload, no sign-up.",
  openGraph: {
    title: "About ExifStrip",
    description:
      "Free EXIF tool: view, edit, strip metadata in your browser. Privacy-first—no upload.",
    url: `${SITE_URL}/about`,
  },
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
