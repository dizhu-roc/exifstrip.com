"use client";

import { useTranslations } from "@/contexts/LocaleContext";
import { FaqTitleIcon } from "./MetadataIcons";

/** 首页展示的 FAQ 条目（从完整列表中筛选 5 条） */
const HOME_FAQ_ENTRIES = [
  { qKey: "pages.faq.q1", aKey: "pages.faq.a1" },
  { qKey: "pages.faq.q2", aKey: "pages.faq.a2" },
  { qKey: "pages.faq.q3", aKey: "pages.faq.a3" },
  { qKey: "pages.faq.q4", aKey: "pages.faq.a4" },
  { qKey: "pages.faq.q8", aKey: "pages.faq.a8" },
] as const;

export default function FAQSection() {
  const t = useTranslations();

  return (
    <section id="faq" className="scroll-mt-24 bg-elevated py-4">
      <div className="mx-auto w-full max-w-content">
        <div className="overflow-hidden rounded-[4px] bg-block px-4 py-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--color-text-primary)]">
              <FaqTitleIcon className="text-[#4FA4E2]" />
              {t("pages.faq.title")}
            </h2>
            <a
              href="/faq"
              className="text-sm text-[var(--color-text-primary)] hover:font-bold"
            >
              {t("pages.faq.viewAll")}
            </a>
          </div>
          <div className="relative pl-6">
            <div
              className="absolute left-[5px] top-2 bottom-2 w-[2px] rounded-full bg-[var(--color-border-subtle)]"
              aria-hidden
            />
            {HOME_FAQ_ENTRIES.map(({ qKey, aKey }) => (
              <div key={qKey} className="relative pb-8 last:pb-0">
                <span
                  className="absolute left-[4px] h-4 w-[3px] rounded-sm bg-[#4FA4E2]"
                  style={{ top: "0.35rem" }}
                  aria-hidden
                />
                <div className="pl-4">
                  <h3 className="mb-1 text-base font-semibold text-[var(--color-text-primary)]">
                    {t(qKey)}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {t(aKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
