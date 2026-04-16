/**
 * 教程文章引用来源（权威出处）
 * 仅列标题与 URL，多语言页面可共用；正文中的事实与表述需与这些来源一致。
 */

export type GuideReference = {
  title: string;
  url: string;
};

export const GUIDE_REFERENCES: Record<string, GuideReference[]> = {
  "what-is-exif": [
    {
      title: "Library of Congress – Exchangeable Image File Format (Exif) Family",
      url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml",
    },
    {
      title: "CIPA – CIPA Standards (Exif Standard)",
      url: "https://www.cipa.jp/e/std/std-sec.html",
    },
    {
      title: "JEITA – Japan Electronics and Information Technology Industries Association",
      url: "https://www.jeita.or.jp/english/",
    },
    {
      title: "Library of Congress – JPEG with Exif Metadata",
      url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000147.shtml",
    },
  ],
  "exif-history": [
    {
      title: "CIPA – Update History (Exif Version History)",
      url: "https://www.cipa.jp/e/std/history_sec.html",
    },
    {
      title: "Library of Congress – Exif Format History and Versions",
      url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml",
    },
    {
      title: "CIPA – Exchangeable image file format for digital still cameras (Exif Standard)",
      url: "https://www.cipa.jp/e/std/std-sec.html",
    },
    {
      title: "Library of Congress – Exif Specification Version 3.0",
      url: "https://www.cipa.jp/std/documents/download_e.html?DC-008-Translation-2023-E",
    },
  ],
  "supported-formats": [
    {
      title: "Library of Congress – EXIF Family, JPEG with Exif, TIFF with Exif",
      url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml",
    },
    {
      title: "Library of Congress – JPEG Encoded File with Exif Metadata",
      url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000147.shtml",
    },
    {
      title: "Library of Congress – TIFF Uncompressed File with Exif Metadata",
      url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000145.shtml",
    },
    {
      title: "CIPA – Exif Standard (Image File Specifications)",
      url: "https://www.cipa.jp/e/std/std-sec.html",
    },
  ],
  "exif-structure": [
    { title: "Library of Congress – Exif Family (IFD, APP1, 0x8769, 0x8825, 0xA005)", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
    { title: "Library of Congress – Tags for TIFF and Related (Exif/GPS/Interop IFD)", url: "https://www.loc.gov/preservation/digital/formats/content/tiff_tags.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  "dimension-device": [
    { title: "Library of Congress – Exif Family (camera settings, metadata)", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  "dimension-settings": [
    { title: "Library of Congress – Exif Family (camera settings, technical image data)", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  "dimension-location": [
    { title: "Library of Congress – Exif Family (GPS from 2.0, 0x8825)", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  "dimension-datetime": [
    { title: "Library of Congress – Exif Family (date and time information)", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  "dimension-image": [
    { title: "Library of Congress – Exif Family (pixels, resolution, color space)", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  "dimension-other": [
    { title: "Library of Congress – Exif Family (descriptive metadata, copyright)", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
    { title: "CIPA – Exif Standard (Version 3.0 tag changes)", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  "why-care-privacy": [
    { title: "Library of Congress – Exif Family (metadata: geographic, camera, date/time)", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
  ],
  "sensitive-fields": [
    { title: "Library of Congress – Exif metadata tags (descriptive, technical, geographic)", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
  ],
  "faq-raw-heic": [
    { title: "Library of Congress – EXIF Family, format support", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
  ],
  "tag-reference": [
    { title: "Library of Congress – Tags for TIFF and Related Specifications", url: "https://www.loc.gov/preservation/digital/formats/content/tiff_tags.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  "standards-links": [
    { title: "CIPA – Exif Standard (DC-008)", url: "https://www.cipa.jp/e/std/std-sec.html" },
    { title: "Library of Congress – Exif Format Description", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
  ],
  "exif-specification-overview": [
    { title: "CIPA – Exchangeable image file format for digital still cameras (Exif standard)", url: "https://www.cipa.jp/e/std/std-sec.html" },
    { title: "CIPA – Update history (Exif version history)", url: "https://www.cipa.jp/e/std/history_sec.html" },
    { title: "Library of Congress – Exchangeable Image File Format (Exif) Family", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
  ],
  "exif-datetimeoriginal-vs-datetime": [
    { title: "CIPA – Exif Standard (date/time tags)", url: "https://www.cipa.jp/e/std/std-sec.html" },
    { title: "Library of Congress – Tags for TIFF and Related (Exif IFD)", url: "https://www.loc.gov/preservation/digital/formats/content/tiff_tags.shtml" },
  ],
  "exifversion-flashpixversion-explained": [
    { title: "CIPA – Exif Standard (ExifVersion, FlashPixVersion)", url: "https://www.cipa.jp/e/std/std-sec.html" },
    { title: "Library of Congress – Exif Family (versions and embedded metadata)", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
  ],
  "exif-aperture-shutter-iso-tags": [
    { title: "CIPA – Exif Standard (capture tags)", url: "https://www.cipa.jp/e/std/std-sec.html" },
    { title: "ExifTool – EXIF Tags (FNumber, ExposureTime, ISO, Flash)", url: "https://exiftool.org/TagNames/EXIF.html" },
  ],
  "exif-gps-reference-tags": [
    { title: "CIPA – Exif Standard (GPS IFD)", url: "https://www.cipa.jp/e/std/std-sec.html" },
    { title: "ExifTool – GPS Tags", url: "https://exiftool.org/TagNames/GPS.html" },
  ],
  "exif-flash-tag-bitmask": [
    { title: "CIPA – Exif Standard (Flash tag)", url: "https://www.cipa.jp/e/std/std-sec.html" },
    { title: "ExifTool – EXIF Tag Names (Flash bitmask)", url: "https://exiftool.org/TagNames/EXIF.html#Flash" },
  ],
  /** IPTC / XMP / MakerNote / Orientation (added guides) */
  "iptc-xmp-overview": [
    { title: "ExifTool – IPTC tag names", url: "https://exiftool.org/TagNames/IPTC.html" },
    { title: "ExifTool – XMP tag names", url: "https://exiftool.org/TagNames/XMP.html" },
    { title: "IPTC Photo Metadata Standard (overview)", url: "https://iptc.org/standards/photo-metadata/" },
    { title: "Library of Congress – Exif / embedded metadata context", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
  ],
  "maker-notes-basics": [
    { title: "ExifTool – Tag Names index (incl. maker notes)", url: "https://exiftool.org/TagNames/index.html" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
    { title: "Library of Congress – Exif Family", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
  ],
  "orientation-tag-explained": [
    { title: "Library of Congress – Tags for TIFF / Exif (Orientation)", url: "https://www.loc.gov/preservation/digital/formats/content/tiff_tags.shtml" },
    { title: "ExifTool – EXIF Tag Names (Orientation)", url: "https://exiftool.org/TagNames/EXIF.html#Orientation" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  /** How-to & FAQ entries (references block) */
  "how-to-view": [
    { title: "Library of Congress – Exif Format Family", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
    { title: "Wikipedia – Exif (introductory)", url: "https://en.wikipedia.org/wiki/Exif" },
  ],
  "how-to-edit-strip": [
    { title: "Library of Congress – JPEG Encoded File with Exif Metadata", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000147.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
    { title: "Library of Congress – Exif Family", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
  ],
  "what-exifstrip-does": [
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
    { title: "Library of Congress – Exif Family", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
  ],
  "before-you-share": [
    { title: "Library of Congress – Exif metadata (what may be embedded)", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  "faq-remove-safe": [
    { title: "Library of Congress – JPEG with Exif (metadata separate from image data)", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000147.shtml" },
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
  ],
  "faq-who-writes": [
    { title: "CIPA – Exif Standard", url: "https://www.cipa.jp/e/std/std-sec.html" },
    { title: "Library of Congress – Exif Family", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
  ],
  "faq-social-network": [
    { title: "Library of Congress – Exif (embedded metadata in photos)", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000618.shtml" },
  ],
  "faq-can-recover": [
    { title: "Library of Congress – JPEG with Exif Metadata", url: "https://www.loc.gov/preservation/digital/formats/fdd/fdd000147.shtml" },
  ],
};

