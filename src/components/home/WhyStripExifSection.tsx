"use client";

import { useTranslations } from "@/contexts/LocaleContext";

const QUOTE_KEYS = [
  { quoteKey: "whyStripExif.item1Quote", descKey: "whyStripExif.item1Desc" },
  { quoteKey: "whyStripExif.item2Quote", descKey: "whyStripExif.item2Desc" },
  { quoteKey: "whyStripExif.item3Quote", descKey: "whyStripExif.item3Desc" },
  { quoteKey: "whyStripExif.item4Quote", descKey: "whyStripExif.item4Desc" },
] as const;

/**
 * 元数据关系图下方的独立区块：采用引用样式横排展示「为什么要移除 EXIF」的 4 个要点。
 * 标题、描述字体字号字重与 FourCards 一致。
 */
export default function WhyStripExifSection() {
  const t = useTranslations();

  return (
    <section
      id="why-strip-exif"
      className="scroll-mt-24 bg-elevated py-4"
      data-section="why-strip-exif"
    >
      <div className="mx-auto w-full max-w-content">
        <div className="rounded-[4px] bg-block px-4 py-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {QUOTE_KEYS.map(({ quoteKey, descKey }) => (
            <div key={quoteKey} className="min-w-0">
              <p className="border-l-[3px] border-l-[#4FA4E2] pl-3 text-base font-semibold text-[var(--color-text-primary)]">
                {t(quoteKey)}
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)] pl-3 border-l-[3px] border-l-[var(--color-border-subtle)]">
                {t(descKey)}
              </p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
