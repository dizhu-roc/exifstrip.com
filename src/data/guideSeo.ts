/**
 * English title and description for each guide entry — used by generateMetadata (SEO, crawlers).
 * Aligned with docs/SEO关键词规划.md P1; question-style titles for featured snippets.
 */

export const GUIDE_SEO: Record<
  string,
  { title: string; description: string }
> = {
  "what-is-exif": {
    title: "What is EXIF?",
    description:
      "EXIF is a metadata standard in photos: device, time, GPS, and more. Learn what EXIF means and which formats contain it. Free EXIF guide.",
  },
  "exif-history": {
    title: "History of EXIF",
    description:
      "EXIF version evolution from 1.0 (1995) to 3.1: GPS, serials, UTF-8. CIPA/JEITA maintain the standard.",
  },
  "supported-formats": {
    title: "Which formats contain EXIF?",
    description:
      "How JPEG, TIFF, WAV carry EXIF; HEIC, RAW, WebP compatibility. What ExifStrip supports for view and strip.",
  },
  "exif-structure": {
    title: "Where is EXIF stored in a JPEG?",
    description:
      "EXIF is organized in TIFF-style directories: 0th IFD, Exif sub-IFD, GPS sub-IFD. How tags and values are stored.",
  },
  "dimension-device": {
    title: "Device and camera info in EXIF",
    description:
      "Make, Model, body and lens serials, Software. Who writes EXIF to photos. Serials are sensitive—strip before sharing.",
  },
  "dimension-settings": {
    title: "Capture settings (EXIF)",
    description:
      "Shutter, aperture, ISO, focal length, white balance. Written by the device at capture.",
  },
  "dimension-location": {
    title: "Location (GPS) in EXIF",
    description:
      "Lat/lon, altitude, GPS timestamps. Remove GPS from photo for privacy. Highly sensitive.",
  },
  "dimension-datetime": {
    title: "Date and time in EXIF",
    description:
      "Capture, modification, digitization time. Common format and timezone limitation.",
  },
  "dimension-image": {
    title: "Image properties (EXIF)",
    description:
      "Width, height, resolution, color space. Used for display; does not change pixel data.",
  },
  "dimension-other": {
    title: "Artist, copyright, and comments (EXIF)",
    description:
      "Artist, Copyright, UserComment, ImageDescription. Often editable; check before sharing.",
  },
  "iptc-xmp-overview": {
    title: "IPTC, XMP, and EXIF: how they fit together",
    description:
      "Photos can hold IPTC captions, XMP tags, and EXIF together. Learn how stripping one may not remove the rest.",
  },
  "maker-notes-basics": {
    title: "What are camera maker notes (MakerNote)?",
    description:
      "Vendor-specific EXIF blobs explain extra fields from Canon, Nikon—in addition to standard tags.",
  },
  "orientation-tag-explained": {
    title: "EXIF Orientation tag explained",
    description:
      "Orientation 1–8 tells viewers how to rotate or mirror for display; usually no JPEG recompression. Why apps disagree.",
  },
  "why-care-privacy": {
    title: "Why care about EXIF privacy?",
    description:
      "Photos carry GPS and device info by default. Check and strip EXIF before sharing. Photo privacy tool.",
  },
  "sensitive-fields": {
    title: "Which EXIF fields are sensitive?",
    description:
      "By risk: location and serials, time and model, free text. What EXIF data is private.",
  },
  "before-you-share": {
    title: "What to do before sharing photos?",
    description:
      "View EXIF first, then decide. Strip only GPS, device only, or remove all. Check before you share.",
  },
  "how-to-view": {
    title: "How to view EXIF?",
    description:
      "View EXIF online with no upload. OS, desktop apps, and this browser tool. Read EXIF data locally.",
  },
  "how-to-edit-strip": {
    title: "How to remove EXIF from photos?",
    description:
      "Edit or strip EXIF in JPEG; remove GPS, device, or all. Four presets. Safe to remove—no quality loss for JPEG.",
  },
  "what-exifstrip-does": {
    title: "What can ExifStrip do?",
    description:
      "View EXIF by dimension, edit fields, strip with presets, export to CSV/JSON. Free, no upload, no sign-up.",
  },
  "faq-remove-safe": {
    title: "Does removing EXIF affect image quality?",
    description:
      "Metadata-only removal (e.g. JPEG presets) leaves quality unchanged. Is it safe to remove EXIF?",
  },
  "faq-who-writes": {
    title: "Who writes EXIF to photos?",
    description:
      "Mainly the capture device at shutter; software and platforms may change it. EXIF is not always camera-original.",
  },
  "faq-social-network": {
    title: "Is EXIF removed when I post to Instagram or Facebook?",
    description:
      "Platform behavior varies; don’t assume posted = gone. Strip before upload if you want to be sure.",
  },
  "faq-can-recover": {
    title: "Can you recover EXIF after stripping?",
    description:
      "No. You cannot recover removed EXIF from the stripped file. Only the original backup still has it.",
  },
  "faq-raw-heic": {
    title: "What's special about RAW and HEIC EXIF?",
    description:
      "RAW is vendor-specific; HEIC uses ISOBMFF. We read HEIC EXIF; preset stripping is mainly for JPEG.",
  },
  "tag-reference": {
    title: "EXIF tag quick reference",
    description:
      "EXIF tags by dimension: device, capture, location, date/time, artist/copyright. With short descriptions.",
  },
  "standards-links": {
    title: "EXIF standards and specs",
    description:
      "CIPA spec, Library of Congress EXIF/TIFF docs. Links for parsers and tag reference.",
  },
};

export function getGuideSeo(id: string): { title: string; description: string } | null {
  return GUIDE_SEO[id] ?? null;
}
