import type { Metadata } from "next";

const SITE_URL = "https://exifstrip.com";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for ExifStrip. Use the EXIF viewer and metadata tool responsibly. Do not use for privacy violation or illegal purposes.",
  openGraph: {
    title: "Terms of Use | ExifStrip",
    description: "Terms of use for the free online EXIF viewer and remover.",
    url: `${SITE_URL}/terms`,
  },
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
