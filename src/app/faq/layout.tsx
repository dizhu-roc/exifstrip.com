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
      name: "What is EXIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EXIF (Exchangeable Image File Format) is metadata embedded in photos, which can include device, date/time, aperture, GPS, and more.",
      },
    },
    {
      "@type": "Question",
      name: "Are my images uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All processing happens in your browser on your device. We do not receive or store your images.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We support JPEG, PNG, TIFF, HEIC/HEIF, AVIF, WebP and other common formats. Preset-based stripping is supported for JPEG only.",
      },
    },
    {
      "@type": "Question",
      name: "How do I remove all EXIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose \"Remove all EXIF\" and download the cleaned image. Other formats are re-encoded to strip all metadata.",
      },
    },
    {
      "@type": "Question",
      name: "Will removing EXIF affect image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For JPEG with preset-based stripping we only rewrite metadata; pixels are unchanged. PNG, WebP, etc. are re-encoded and may differ very slightly; the difference is usually imperceptible.",
      },
    },
    {
      "@type": "Question",
      name: "Can I remove only GPS or capture time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. In the metadata block select the \"Location\" or \"Date/Time\" dimension and use \"Remove selected\" to strip only that part of the EXIF while keeping the rest.",
      },
    },
    {
      "@type": "Question",
      name: "Can I process multiple images at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can upload multiple images, then view and edit EXIF for each in the list, or strip and download the currently selected image.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data sent to your servers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All reading, editing, stripping, and export happen in your browser. We do not and cannot receive, store, or view your images or EXIF.",
      },
    },
    {
      "@type": "Question",
      name: "What is an IFD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IFD (Image File Directory) is an EXIF standard structure. Common IFDs include IFD0 (main image), Exif, GPS, and Interop; each holds different tags.",
      },
    },
    {
      "@type": "Question",
      name: "Can I restore EXIF after stripping?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Once EXIF is removed and you download the new file, the original metadata cannot be recovered from it. We recommend keeping a backup of the original.",
      },
    },
    {
      "@type": "Question",
      name: "Why do some tags show as \"Unknown\"?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some camera makers use custom tags outside the standard EXIF spec. The tool still parses and shows hex and raw values; the name may appear as unknown.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between HEIC/HEIF and JPEG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HEIC is a more efficient format used by Apple and others. We can read EXIF from HEIC; for precise preset-based stripping, converting to JPEG first is recommended.",
      },
    },
    {
      "@type": "Question",
      name: "Is my language preference saved?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Your chosen UI language is stored locally in your browser (e.g. localStorage) and will be used on your next visit.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this on phone or tablet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The site is responsive and works in mobile and tablet browsers. Support for HEIC and large files may vary by device and browser.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact you?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For privacy, usage, or technical questions, use the contact email in our privacy section; we will respond as soon as we can.",
      },
    },
    {
      "@type": "Question",
      name: "Does X (Twitter) strip EXIF from uploaded photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "X’s Help Center distinguishes optional post location from embedded image metadata; uploaded images are processed and GPS-type EXIF is generally not shown to other users—but policies change. For detail with sources, open /guides/faq-social-network and /blog/topic-platform-strip; strip locally first if you need a hard guarantee.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between remove, strip, delete, and scrub EXIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mostly wording for the same goal: later viewers should not see the old metadata. “Strip” and “scrub” usually mean clearing metadata blocks; tools differ on IPTC/XMP and on whether PNG/WebP need re-encoding. How ExifStrip handles JPEG presets is explained in /guides/how-to-edit-strip.",
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
