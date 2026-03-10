import type { Metadata } from "next";

const SITE_URL = "https://exifstrip.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "ExifStrip privacy policy: Your images and EXIF never leave your device. We do not store or transmit your files. No tracking.",
  openGraph: {
    title: "Privacy Policy | ExifStrip",
    description:
      "Your photos stay on your device. We never see, store, or transmit your images or metadata.",
    url: `${SITE_URL}/privacy`,
  },
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
