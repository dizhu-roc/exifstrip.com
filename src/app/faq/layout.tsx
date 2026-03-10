import type { Metadata } from "next";

const SITE_URL = "https://exifstrip.com";

export const metadata: Metadata = {
  title: "FAQ – EXIF, Privacy & How to Use ExifStrip",
  description:
    "Frequently asked questions about EXIF: Does removing EXIF affect quality? Can you recover EXIF? Do social networks remove EXIF? How to view and strip EXIF.",
  openGraph: {
    title: "FAQ – EXIF, Privacy & How to Use ExifStrip",
    description:
      "FAQ about EXIF viewer, metadata removal, photo privacy. Does stripping EXIF reduce quality? Recover EXIF? Strip before sharing.",
    url: `${SITE_URL}/faq`,
  },
  alternates: { canonical: `${SITE_URL}/faq` },
};

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does removing EXIF affect image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you only remove metadata and don't re-encode (e.g. preset-based strip for JPEG), pixels are untouched and image quality is unchanged. Re-encoding PNG/WebP may have negligible impact.",
      },
    },
    {
      "@type": "Question",
      name: "Can you recover EXIF after stripping?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You cannot recover removed EXIF from the stripped file. Only an original backup or unmodified copy still has the metadata.",
      },
    },
    {
      "@type": "Question",
      name: "Is EXIF removed when I post to Instagram or Facebook?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Platform behavior varies and is rarely documented. Don't assume posted means EXIF is gone. Strip before upload if you want to be sure.",
      },
    },
    {
      "@type": "Question",
      name: "How to view EXIF online without uploading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ExifStrip parses EXIF in your browser—your images never leave your device. Open the site, select or drag an image, and view metadata by dimension. No sign-up required.",
      },
    },
  ],
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      {children}
    </>
  );
}
