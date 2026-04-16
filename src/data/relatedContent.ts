/**
 * 主题簇内链：百科 ↔ 博客（P0 SEO）。按条目 id 配置，不包含自身。
 */

type RelatedConfig = { guides?: string[]; blog?: string[] };

const GUIDE_RELATED: Record<string, RelatedConfig> = {
  "what-is-exif": { guides: ["exif-structure", "supported-formats", "how-to-view"], blog: ["topic-exif-vs-metadata"] },
  "exif-history": { guides: ["what-is-exif", "supported-formats"] },
  "supported-formats": { guides: ["what-is-exif", "exif-structure"], blog: ["product-supported-formats"] },
  "exif-structure": { guides: ["what-is-exif", "tag-reference"] },
  "dimension-device": { guides: ["exif-structure", "maker-notes-basics"], blog: [] },
  "dimension-settings": { guides: ["exif-structure", "orientation-tag-explained", "exif-aperture-shutter-iso-tags", "exif-flash-tag-bitmask"] },
  "dimension-location": { guides: ["sensitive-fields", "before-you-share", "exif-gps-reference-tags"], blog: ["tip-keep-what-you-need"] },
  "dimension-datetime": { guides: ["exif-structure", "dimension-device", "exif-datetimeoriginal-vs-datetime"] },
  "dimension-image": { guides: ["exif-structure", "supported-formats"] },
  "dimension-other": { guides: ["sensitive-fields", "maker-notes-basics"] },
  "iptc-xmp-overview": { guides: ["what-is-exif", "tag-reference"], blog: ["topic-exif-vs-metadata"] },
  "maker-notes-basics": { guides: ["dimension-device", "faq-who-writes"] },
  "orientation-tag-explained": { guides: ["dimension-settings", "how-to-edit-strip"] },
  "why-care-privacy": { guides: ["sensitive-fields", "before-you-share"] },
  "sensitive-fields": { guides: ["why-care-privacy", "before-you-share"] },
  "before-you-share": { guides: ["sensitive-fields", "how-to-edit-strip", "how-to-view"], blog: ["tip-before-travel-share"] },
  "how-to-view": { guides: ["what-is-exif", "how-to-edit-strip"] },
  "how-to-edit-strip": { guides: ["before-you-share", "how-to-view", "faq-remove-safe"], blog: ["tip-keep-what-you-need", "tip-strip-metadata-from-jpeg"] },
  "what-exifstrip-does": { guides: ["how-to-view", "how-to-edit-strip"], blog: ["product-welcome"] },
  "faq-remove-safe": { guides: ["how-to-edit-strip", "supported-formats"] },
  "faq-who-writes": { guides: ["dimension-device", "what-is-exif"] },
  "faq-social-network": { guides: ["before-you-share", "faq-raw-heic"], blog: ["topic-platform-strip"] },
  "faq-can-recover": { guides: ["how-to-edit-strip", "faq-remove-safe"], blog: ["tip-export-exif"] },
  "faq-raw-heic": { guides: ["supported-formats", "how-to-edit-strip"], blog: ["tip-remove-exif-heic-iphone", "product-supported-formats"] },
  "tag-reference": {
    guides: [
      "exif-structure",
      "standards-links",
      "exif-datetimeoriginal-vs-datetime",
      "exifversion-flashpixversion-explained",
      "exif-aperture-shutter-iso-tags",
      "exif-gps-reference-tags",
      "exif-flash-tag-bitmask",
    ],
  },
  "standards-links": { guides: ["tag-reference", "what-is-exif", "exif-specification-overview"] },
  "exif-specification-overview": {
    guides: ["standards-links", "exif-structure", "what-is-exif", "iptc-xmp-overview"],
  },
  "exif-datetimeoriginal-vs-datetime": {
    guides: ["dimension-datetime", "tag-reference", "how-to-view"],
  },
  "exifversion-flashpixversion-explained": {
    guides: ["exif-history", "dimension-image", "tag-reference"],
  },
  "exif-aperture-shutter-iso-tags": { guides: ["dimension-settings", "tag-reference", "exif-structure"] },
  "exif-gps-reference-tags": { guides: ["dimension-location", "tag-reference", "sensitive-fields"] },
  "exif-flash-tag-bitmask": { guides: ["dimension-settings", "tag-reference", "exif-aperture-shutter-iso-tags"] },
};

const BLOG_RELATED: Record<string, RelatedConfig> = {
  "tip-before-travel-share": { guides: ["before-you-share", "dimension-location"], blog: ["tip-keep-what-you-need"] },
  "tip-batch-clean": { guides: ["how-to-edit-strip"], blog: ["tip-keep-what-you-need"] },
  "tip-keep-what-you-need": { guides: ["how-to-edit-strip", "dimension-location"] },
  "tip-export-exif": { guides: ["how-to-edit-strip", "faq-can-recover"] },
  "tip-remove-exif-heic-iphone": { guides: ["faq-raw-heic", "supported-formats"], blog: ["product-supported-formats"] },
  "tip-remove-exif-png": { guides: ["supported-formats", "how-to-edit-strip"], blog: ["tip-remove-exif-heic-iphone"] },
  "topic-phone-privacy": { guides: ["why-care-privacy"], blog: ["topic-platform-strip"] },
  "topic-platform-strip": { guides: ["faq-social-network", "before-you-share"] },
  "topic-exif-vs-metadata": { guides: ["iptc-xmp-overview", "what-is-exif"] },
  "topic-exiftool-vs-online": { guides: ["how-to-view", "tag-reference"], blog: ["product-supported-formats", "topic-exiftool-all-vs-allall"] },
  "topic-exiftool-all-vs-allall": { guides: ["how-to-edit-strip", "exif-structure"], blog: ["topic-exiftool-vs-online"] },
  "tip-strip-metadata-from-jpeg": { guides: ["how-to-edit-strip", "iptc-xmp-overview", "faq-remove-safe"], blog: ["tip-remove-exif-png", "topic-exiftool-vs-online"] },
  "product-welcome": { guides: ["what-exifstrip-does", "how-to-view"] },
  "product-supported-formats": { guides: ["supported-formats", "faq-raw-heic"] },
  "product-update": { guides: ["what-exifstrip-does"], blog: ["product-welcome"] },
};

export function getRelatedForGuide(id: string): { guideIds: string[]; blogIds: string[] } {
  const row = GUIDE_RELATED[id];
  if (!row) return { guideIds: [], blogIds: [] };
  return {
    guideIds: (row.guides ?? []).filter((g) => g !== id),
    blogIds: row.blog ?? [],
  };
}

export function getRelatedForBlog(id: string): { guideIds: string[]; blogIds: string[] } {
  const row = BLOG_RELATED[id];
  if (!row) return { guideIds: [], blogIds: [] };
  return {
    guideIds: row.guides ?? [],
    blogIds: (row.blog ?? []).filter((b) => b !== id),
  };
}
