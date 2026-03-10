/**
 * 博客文章底部引用（权威出处；标题英文便于各语言页共用）
 */

import type { GuideReference } from "./guideReferences";

export const BLOG_REFERENCES: Record<string, GuideReference[]> = {
  "tip-before-travel-share": [
    { title: "Library of Congress – Exif in photos", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  "tip-batch-clean": [
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
    { title: "ExifTool – batch / CLI documentation", url: "https://exiftool.org/exiftool_pod.html" },
  ],
  "tip-keep-what-you-need": [
    { title: "Library of Congress – Exif Family (GPS and other tags)", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  "tip-export-exif": [
    { title: "ExifTool – output formats (JSON, CSV, etc.)", url: "https://exiftool.org/exiftool_pod.html" },
    { title: "Library of Congress – Exif tag reference context", url: "https://www.loc.gov/preservation/digital/formats/content/tiff_tags.shtml" },
  ],
  "tip-remove-exif-heic-iphone": [
    { title: "Library of Congress – Exif / HEIC context", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
    { title: "Apple – Using HEIF or HEVC media on Apple devices", url: "https://support.apple.com/en-us/116944" },
  ],
  "tip-remove-exif-png": [
    { title: "W3C – Portable Network Graphics (PNG) Specification", url: "https://www.w3.org/TR/png/" },
    { title: "ExifTool – PNG tags", url: "https://exiftool.org/TagNames/PNG.html" },
  ],
  "topic-phone-privacy": [
    { title: "Library of Congress – What EXIF can contain", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
  ],
  /** Body already lists platform help links; these add format-level sources */
  "topic-platform-strip": [
    { title: "Library of Congress – Exif embedded in images", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  "topic-exif-vs-metadata": [
    { title: "ExifTool – IPTC / XMP tag namespaces", url: "https://exiftool.org/TagNames/index.html" },
    { title: "IPTC – Photo metadata", url: "https://iptc.org/standards/photo-metadata/" },
    { title: "Wikipedia – Extensible Metadata Platform (XMP)", url: "https://en.wikipedia.org/wiki/Extensible_Metadata_Platform" },
  ],
  "topic-exiftool-vs-online": [
    { title: "ExifTool official site", url: "https://exiftool.org/" },
    { title: "ExifTool – application documentation", url: "https://exiftool.org/exiftool_pod.html" },
  ],
  "product-welcome": [
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
    { title: "Library of Congress – Exif Family", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
  ],
  "product-supported-formats": [
    { title: "Library of Congress – JPEG with Exif", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000147.shtml" },
    { title: "Library of Congress – Exif Format Family", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  "product-update": [
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
};
