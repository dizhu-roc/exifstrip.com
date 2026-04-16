/**
 * English title and description for each guide entry — used by generateMetadata (SEO, crawlers).
 * Aligned with docs/SEO关键词规划.md P1; question-style titles for featured snippets.
 */

export const GUIDE_SEO: Record<
  string,
  { title: string; description: string }
> = {
  "what-is-exif": {
    title: "What is EXIF? Meaning, information, and format",
    description:
      "What EXIF means: embedded metadata (device, time, GPS)—not a separate image format. Exif specification basics and which files carry EXIF.",
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
    title: "JPEG EXIF format: APP1 segment & IFD structure",
    description:
      "Where EXIF sits in a JPEG (APP1 / 0xFFE1), TIFF-style IFDs (0th, Exif, GPS), and how tags are stored.",
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
    title: "EXIF GPS: location, altitude, GPSAltitudeRef",
    description:
      "EXIF GPS tags: lat/lon, GPSAltitude and GPSAltitudeRef (sea level). Remove GPS from photos before sharing.",
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
    title: "IPTC vs EXIF (and XMP): how they fit together",
    description:
      "XMP vs EXIF: different metadata containers; clearing one may not clear the other. IPTC captions vs EXIF GPS—preview before sharing.",
  },
  "maker-notes-basics": {
    title: "What are camera maker notes (MakerNote)?",
    description:
      "Vendor-specific EXIF blobs explain extra fields from Canon, Nikon—in addition to standard tags.",
  },
  "orientation-tag-explained": {
    title: "EXIF Orientation values 1–8 explained",
    description:
      "EXIF Orientation tag 1–8: rotation and mirroring for display. Why the same file looks different in some apps.",
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
    title: "View EXIF online (free EXIF viewer, no upload)",
    description:
      "Free online EXIF viewer: read EXIF in your browser without uploading. OS tools, desktop apps, and ExifStrip—local parsing.",
  },
  "how-to-edit-strip": {
    title: "Remove or strip EXIF from photos (JPEG presets)",
    description:
      "Remove EXIF data, strip metadata, or scrub GPS: JPEG lossless presets (remove all, privacy, GPS only). PNG/WebP notes.",
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
    title: "Social media & EXIF: does X (Twitter) strip metadata?",
    description:
      "Instagram, Facebook, X (Twitter): EXIF handling varies. Do not assume posted = gone—strip EXIF locally first.",
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
    title: "EXIF specification & standards (official links)",
    description:
      "EXIF specification sources: CIPA/JEITA Exif standard, LOC JPEG/TIFF family, tag lists for parsers.",
  },
  "exif-specification-overview": {
    title: "EXIF specification: official sources and how to read them",
    description:
      "CIPA/JEITA Exif standard (DC-008), LOC format notes, and how the normative spec relates to JPEG APP1 EXIF—without confusing file format with metadata standard.",
  },
  "exif-datetimeoriginal-vs-datetime": {
    title: "DateTimeOriginal vs DateTime in EXIF: what’s the difference?",
    description:
      "EXIF DateTimeOriginal vs DateTime vs DateTimeDigitized: capture vs file change vs scan time, IFD placement, and common viewer mistakes.",
  },
  "exifversion-flashpixversion-explained": {
    title: "ExifVersion 0220, 0221, 0231 and FlashPixVersion explained",
    description:
      "EXIF ExifVersion four-byte field (0220/0221/0231…), FlashPixVersion, what cameras and software write, and after metadata strip.",
  },
  "exif-aperture-shutter-iso-tags": {
    title: "FNumber, ExposureTime, ISO in EXIF (aperture & shutter metadata)",
    description:
      "EXIF tags for aperture (FNumber), shutter (ExposureTime), ISO (ISOSpeedRatings), exposure bias—aligned with the tag reference table and capture settings.",
  },
  "exif-gps-reference-tags": {
    title: "GPSLatitudeRef, GPSLongitudeRef, GPSAltitudeRef in EXIF GPS",
    description:
      "EXIF GPS reference tags: N/S, E/W, above/below sea level; how they pair with GPSLatitude, GPSLongitude, GPSAltitude for decoding coordinates.",
  },
  "exif-flash-tag-bitmask": {
    title: "EXIF Flash tag: bitmask, fired, return, and mode",
    description:
      "EXIF Flash (SHORT) as a bit field: fired/not fired, strobe return, flash mode—how readers decode the value and link to capture settings.",
  },
};

export function getGuideSeo(id: string): { title: string; description: string } | null {
  return GUIDE_SEO[id] ?? null;
}
