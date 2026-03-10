/**
 * 博客：分类与条目结构
 * 与 docs/博客-内容与类别框架.md 一致
 */

export type BlogEntry = {
  id: string;
  titleKey: string;
  descKey: string;
  contentKey: string;
};

export type BlogCategory = {
  id: string;
  titleKey: string;
  entries: BlogEntry[];
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: "tips",
    titleKey: "blog.category.tips",
    entries: [
      {
        id: "tip-before-travel-share",
        titleKey: "blog.entry.tipBeforeTravelShare.title",
        descKey: "blog.entry.tipBeforeTravelShare.desc",
        contentKey: "blog.entry.tipBeforeTravelShare.content",
      },
      {
        id: "tip-batch-clean",
        titleKey: "blog.entry.tipBatchClean.title",
        descKey: "blog.entry.tipBatchClean.desc",
        contentKey: "blog.entry.tipBatchClean.content",
      },
      {
        id: "tip-keep-what-you-need",
        titleKey: "blog.entry.tipKeepWhatYouNeed.title",
        descKey: "blog.entry.tipKeepWhatYouNeed.desc",
        contentKey: "blog.entry.tipKeepWhatYouNeed.content",
      },
      {
        id: "tip-export-exif",
        titleKey: "blog.entry.tipExportExif.title",
        descKey: "blog.entry.tipExportExif.desc",
        contentKey: "blog.entry.tipExportExif.content",
      },
      {
        id: "tip-remove-exif-heic-iphone",
        titleKey: "blog.entry.tipRemoveExifHeicIphone.title",
        descKey: "blog.entry.tipRemoveExifHeicIphone.desc",
        contentKey: "blog.entry.tipRemoveExifHeicIphone.content",
      },
      {
        id: "tip-remove-exif-png",
        titleKey: "blog.entry.tipRemoveExifPng.title",
        descKey: "blog.entry.tipRemoveExifPng.desc",
        contentKey: "blog.entry.tipRemoveExifPng.content",
      },
    ],
  },
  {
    id: "topic",
    titleKey: "blog.category.topic",
    entries: [
      {
        id: "topic-phone-privacy",
        titleKey: "blog.entry.topicPhonePrivacy.title",
        descKey: "blog.entry.topicPhonePrivacy.desc",
        contentKey: "blog.entry.topicPhonePrivacy.content",
      },
      {
        id: "topic-platform-strip",
        titleKey: "blog.entry.topicPlatformStrip.title",
        descKey: "blog.entry.topicPlatformStrip.desc",
        contentKey: "blog.entry.topicPlatformStrip.content",
      },
      {
        id: "topic-exif-vs-metadata",
        titleKey: "blog.entry.topicExifVsMetadata.title",
        descKey: "blog.entry.topicExifVsMetadata.desc",
        contentKey: "blog.entry.topicExifVsMetadata.content",
      },
      {
        id: "topic-exiftool-vs-online",
        titleKey: "blog.entry.topicExiftoolVsOnline.title",
        descKey: "blog.entry.topicExiftoolVsOnline.desc",
        contentKey: "blog.entry.topicExiftoolVsOnline.content",
      },
    ],
  },
  {
    id: "product",
    titleKey: "blog.category.product",
    entries: [
      {
        id: "product-welcome",
        titleKey: "blog.entry.productWelcome.title",
        descKey: "blog.entry.productWelcome.desc",
        contentKey: "blog.entry.productWelcome.content",
      },
      {
        id: "product-supported-formats",
        titleKey: "blog.entry.productSupportedFormats.title",
        descKey: "blog.entry.productSupportedFormats.desc",
        contentKey: "blog.entry.productSupportedFormats.content",
      },
      {
        id: "product-update",
        titleKey: "blog.entry.productUpdate.title",
        descKey: "blog.entry.productUpdate.desc",
        contentKey: "blog.entry.productUpdate.content",
      },
    ],
  },
];

/** 根据 slug 查找博客条目 */
export function getBlogEntryById(id: string): BlogEntry | undefined {
  for (const cat of BLOG_CATEGORIES) {
    const found = cat.entries.find((e) => e.id === id);
    if (found) return found;
  }
  return undefined;
}
