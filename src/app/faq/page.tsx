"use client";

import { useTranslations } from "@/contexts/LocaleContext";
import PageLayout from "@/components/layout/PageLayout";

const FAQ_ENTRIES = [
  { qKey: "pages.faq.q1", aKey: "pages.faq.a1" },
  { qKey: "pages.faq.q2", aKey: "pages.faq.a2" },
  { qKey: "pages.faq.q3", aKey: "pages.faq.a3" },
  { qKey: "pages.faq.q4", aKey: "pages.faq.a4" },
  { qKey: "pages.faq.q5", aKey: "pages.faq.a5" },
  { qKey: "pages.faq.q6", aKey: "pages.faq.a6" },
  { qKey: "pages.faq.q7", aKey: "pages.faq.a7" },
  { qKey: "pages.faq.q8", aKey: "pages.faq.a8" },
  { qKey: "pages.faq.q9", aKey: "pages.faq.a9" },
  { qKey: "pages.faq.q10", aKey: "pages.faq.a10" },
  { qKey: "pages.faq.q11", aKey: "pages.faq.a11" },
  { qKey: "pages.faq.q12", aKey: "pages.faq.a12" },
  { qKey: "pages.faq.q13", aKey: "pages.faq.a13" },
  { qKey: "pages.faq.q14", aKey: "pages.faq.a14" },
  { qKey: "pages.faq.q15", aKey: "pages.faq.a15" },
] as const;

export default function FAQPage() {
  const t = useTranslations();

  return (
    <PageLayout>
      {/* Hero：与教程、博客页一致的样式 */}
      <section
        className="scroll-mt-24 bg-black py-10 text-white"
        aria-label={t("pages.faq.title")}
      >
        <div className="mx-auto w-full max-w-content px-4">
          <h1 className="font-bold text-white" style={{ fontSize: "2rem" }}>
            {t("pages.faq.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/90">
            {t("pages.faq.heroSubtitle")}
          </p>
        </div>
      </section>

      <section className="bg-elevated py-4">
        <div className="mx-auto w-full max-w-content">
          <div className="overflow-hidden rounded-[4px] bg-block px-4 py-6">
            {/* 时间线样式 */}
            <div className="relative pl-6">
              <div
                className="absolute left-[5px] top-2 bottom-2 w-[2px] rounded-full bg-[var(--color-border-subtle)]"
                aria-hidden
              />
              {FAQ_ENTRIES.map(({ qKey, aKey }) => (
                <div key={qKey} className="relative pb-8 last:pb-0">
                  <span
                    className="absolute left-[4px] h-4 w-[3px] rounded-sm bg-[#4FA4E2]"
                    style={{ top: "0.35rem" }}
                    aria-hidden
                  />
                  <div className="pl-4">
                    <h2 className="mb-1 text-base font-semibold text-[var(--color-text-primary)]">
                      {t(qKey)}
                    </h2>
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
    </PageLayout>
  );
}
