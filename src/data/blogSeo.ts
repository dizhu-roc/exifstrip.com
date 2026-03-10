/**
 * English title and description for each blog entry — for generateMetadata (SEO).
 */

export const BLOG_SEO: Record<
  string,
  { title: string; description: string }
> = {
  "tip-before-travel-share": {
    title: "Strip EXIF before sharing travel photos",
    description:
      "Clean EXIF from photos before you share. Remove GPS and location data for privacy. Quick steps with ExifStrip.",
  },
  "tip-batch-clean": {
    title: "Batch remove EXIF from multiple photos",
    description:
      "How to process multiple images at once. View and strip EXIF from several photos quickly.",
  },
  "tip-keep-what-you-need": {
    title: "Remove only GPS, keep other EXIF",
    description:
      "Strip location data only; keep device and time. Use the GPS-only preset for privacy without losing other metadata.",
  },
  "tip-export-exif": {
    title: "Export EXIF to CSV or JSON for backup",
    description:
      "View EXIF first, then export to CSV, JSON, TXT, or HEX. Backup or audit your photo metadata.",
  },
  "tip-remove-exif-heic-iphone": {
    title: "Remove EXIF from iPhone HEIC photos before sharing",
    description:
      "HEIC from iPhone often includes GPS and device info. View locally, then strip or convert to JPEG for GPS-only presets.",
  },
  "tip-remove-exif-png": {
    title: "Remove EXIF from PNG: what to expect",
    description:
      "PNG stores metadata in chunks; removing all EXIF often re-encodes. JPEG preset strip works differently.",
  },
  "topic-phone-privacy": {
    title: "Phone and album privacy settings",
    description:
      "What you can turn off for photo privacy on your device. EXIF and location in albums.",
  },
  "topic-platform-strip": {
    title: "Do social networks strip EXIF from your photos?",
    description:
      "Platform behavior varies. Don’t assume posted means EXIF is gone. Strip before upload to be sure.",
  },
  "topic-exif-vs-metadata": {
    title: "EXIF vs metadata: what's the difference?",
    description:
      "EXIF is one metadata standard; IPTC, XMP, MakerNote are others. What’s in your photo file.",
  },
  "topic-exiftool-vs-online": {
    title: "ExifTool vs online EXIF tools: when to use which",
    description:
      "Command-line batch and rare tags vs browser, no-install viewers. Both can respect privacy when used right.",
  },
  "product-welcome": {
    title: "Welcome to ExifStrip",
    description:
      "Free online EXIF viewer and remover. View, edit, strip—no upload, no sign-up.",
  },
  "product-supported-formats": {
    title: "Image formats ExifStrip supports",
    description:
      "JPEG, PNG, HEIC, WebP, TIFF, AVIF. Which formats we can read and which support preset stripping.",
  },
  "product-update": {
    title: "ExifStrip updates and changelog",
    description:
      "Product updates, new features, and release notes.",
  },
};

export function getBlogSeo(id: string): { title: string; description: string } | null {
  return BLOG_SEO[id] ?? null;
}
