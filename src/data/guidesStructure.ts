/**
 * EXIF 小百科 / 教程：分类与条目结构
 * 与 docs/EXIF小百科-内容与类别框架.md 一致
 */

export type GuideEntry = {
  id: string;
  titleKey: string;
  descKey: string;
  /** 正文 i18n key，无则显示「内容撰写中」 */
  contentKey?: string;
  /** 开篇引题 i18n key，可选 */
  leadKey?: string;
  /** 配图路径（如 /images/guides/xxx.svg），可选 */
  image?: string;
};

export type GuideCategory = {
  id: string;
  titleKey: string;
  entries: GuideEntry[];
};

export const GUIDES_CATEGORIES: GuideCategory[] = [
  {
    id: "know-exif",
    titleKey: "guides.category.knowExif",
    entries: [
      { id: "what-is-exif", titleKey: "guides.entry.whatIsExif.title", descKey: "guides.entry.whatIsExif.desc", contentKey: "guides.entry.whatIsExif.content" },
      { id: "exif-history", titleKey: "guides.entry.exifHistory.title", descKey: "guides.entry.exifHistory.desc", contentKey: "guides.entry.exifHistory.content" },
      { id: "supported-formats", titleKey: "guides.entry.supportedFormats.title", descKey: "guides.entry.supportedFormats.desc", contentKey: "guides.entry.supportedFormats.content" },
    ],
  },
  {
    id: "exif-content",
    titleKey: "guides.category.exifContent",
    entries: [
      { id: "exif-structure", titleKey: "guides.entry.exifStructure.title", descKey: "guides.entry.exifStructure.desc", contentKey: "guides.entry.exifStructure.content", leadKey: "guides.entry.exifStructure.lead", image: "/images/guides/exif-structure.svg" },
      { id: "dimension-device", titleKey: "guides.entry.dimensionDevice.title", descKey: "guides.entry.dimensionDevice.desc", contentKey: "guides.entry.dimensionDevice.content" },
      { id: "dimension-settings", titleKey: "guides.entry.dimensionSettings.title", descKey: "guides.entry.dimensionSettings.desc", contentKey: "guides.entry.dimensionSettings.content" },
      { id: "dimension-location", titleKey: "guides.entry.dimensionLocation.title", descKey: "guides.entry.dimensionLocation.desc", contentKey: "guides.entry.dimensionLocation.content" },
      { id: "dimension-datetime", titleKey: "guides.entry.dimensionDatetime.title", descKey: "guides.entry.dimensionDatetime.desc", contentKey: "guides.entry.dimensionDatetime.content" },
      { id: "dimension-image", titleKey: "guides.entry.dimensionImage.title", descKey: "guides.entry.dimensionImage.desc", contentKey: "guides.entry.dimensionImage.content" },
      { id: "dimension-other", titleKey: "guides.entry.dimensionOther.title", descKey: "guides.entry.dimensionOther.desc", contentKey: "guides.entry.dimensionOther.content" },
      {
        id: "iptc-xmp-overview",
        titleKey: "guides.entry.iptcXmpOverview.title",
        descKey: "guides.entry.iptcXmpOverview.desc",
        contentKey: "guides.entry.iptcXmpOverview.content",
      },
      {
        id: "maker-notes-basics",
        titleKey: "guides.entry.makerNotesBasics.title",
        descKey: "guides.entry.makerNotesBasics.desc",
        contentKey: "guides.entry.makerNotesBasics.content",
      },
      {
        id: "orientation-tag-explained",
        titleKey: "guides.entry.orientationTagExplained.title",
        descKey: "guides.entry.orientationTagExplained.desc",
        contentKey: "guides.entry.orientationTagExplained.content",
      },
    ],
  },
  {
    id: "privacy",
    titleKey: "guides.category.privacy",
    entries: [
      { id: "why-care-privacy", titleKey: "guides.entry.whyCarePrivacy.title", descKey: "guides.entry.whyCarePrivacy.desc", contentKey: "guides.entry.whyCarePrivacy.content" },
      { id: "sensitive-fields", titleKey: "guides.entry.sensitiveFields.title", descKey: "guides.entry.sensitiveFields.desc", contentKey: "guides.entry.sensitiveFields.content" },
      { id: "before-you-share", titleKey: "guides.entry.beforeYouShare.title", descKey: "guides.entry.beforeYouShare.desc", contentKey: "guides.entry.beforeYouShare.content" },
    ],
  },
  {
    id: "how-to",
    titleKey: "guides.category.howTo",
    entries: [
      { id: "how-to-view", titleKey: "guides.entry.howToView.title", descKey: "guides.entry.howToView.desc", contentKey: "guides.entry.howToView.content" },
      { id: "how-to-edit-strip", titleKey: "guides.entry.howToEditStrip.title", descKey: "guides.entry.howToEditStrip.desc", contentKey: "guides.entry.howToEditStrip.content" },
      { id: "what-exifstrip-does", titleKey: "guides.entry.whatExifstripDoes.title", descKey: "guides.entry.whatExifstripDoes.desc", contentKey: "guides.entry.whatExifstripDoes.content" },
    ],
  },
  {
    id: "faq",
    titleKey: "guides.category.faq",
    entries: [
      { id: "faq-remove-safe", titleKey: "guides.entry.faqRemoveSafe.title", descKey: "guides.entry.faqRemoveSafe.desc", contentKey: "guides.entry.faqRemoveSafe.content" },
      { id: "faq-who-writes", titleKey: "guides.entry.faqWhoWrites.title", descKey: "guides.entry.faqWhoWrites.desc", contentKey: "guides.entry.faqWhoWrites.content" },
      { id: "faq-social-network", titleKey: "guides.entry.faqSocialNetwork.title", descKey: "guides.entry.faqSocialNetwork.desc", contentKey: "guides.entry.faqSocialNetwork.content" },
      { id: "faq-can-recover", titleKey: "guides.entry.faqCanRecover.title", descKey: "guides.entry.faqCanRecover.desc", contentKey: "guides.entry.faqCanRecover.content" },
      { id: "faq-raw-heic", titleKey: "guides.entry.faqRawHeic.title", descKey: "guides.entry.faqRawHeic.desc", contentKey: "guides.entry.faqRawHeic.content" },
    ],
  },
  {
    id: "reference",
    titleKey: "guides.category.reference",
    entries: [
      { id: "tag-reference", titleKey: "guides.entry.tagReference.title", descKey: "guides.entry.tagReference.desc", contentKey: "guides.entry.tagReference.content" },
      { id: "standards-links", titleKey: "guides.entry.standardsLinks.title", descKey: "guides.entry.standardsLinks.desc", contentKey: "guides.entry.standardsLinks.content" },
      {
        id: "exif-specification-overview",
        titleKey: "guides.entry.exifSpecificationOverview.title",
        descKey: "guides.entry.exifSpecificationOverview.desc",
        contentKey: "guides.entry.exifSpecificationOverview.content",
      },
      {
        id: "exif-datetimeoriginal-vs-datetime",
        titleKey: "guides.entry.exifDatetimeoriginalVsDatetime.title",
        descKey: "guides.entry.exifDatetimeoriginalVsDatetime.desc",
        contentKey: "guides.entry.exifDatetimeoriginalVsDatetime.content",
      },
      {
        id: "exifversion-flashpixversion-explained",
        titleKey: "guides.entry.exifVersionFlashpixVersionExplained.title",
        descKey: "guides.entry.exifVersionFlashpixVersionExplained.desc",
        contentKey: "guides.entry.exifVersionFlashpixVersionExplained.content",
      },
      {
        id: "exif-aperture-shutter-iso-tags",
        titleKey: "guides.entry.exifApertureShutterIsoTags.title",
        descKey: "guides.entry.exifApertureShutterIsoTags.desc",
        contentKey: "guides.entry.exifApertureShutterIsoTags.content",
      },
      {
        id: "exif-gps-reference-tags",
        titleKey: "guides.entry.exifGpsReferenceTags.title",
        descKey: "guides.entry.exifGpsReferenceTags.desc",
        contentKey: "guides.entry.exifGpsReferenceTags.content",
      },
      {
        id: "exif-flash-tag-bitmask",
        titleKey: "guides.entry.exifFlashTagBitmask.title",
        descKey: "guides.entry.exifFlashTagBitmask.desc",
        contentKey: "guides.entry.exifFlashTagBitmask.content",
      },
    ],
  },
];

/** 根据条目 id 查找条目（用于详情页） */
export function getGuideEntryById(id: string): GuideEntry | undefined {
  for (const cat of GUIDES_CATEGORIES) {
    const found = cat.entries.find((e) => e.id === id);
    if (found) return found;
  }
  return undefined;
}
