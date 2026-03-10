"use client";

import { useTranslations } from "@/contexts/LocaleContext";
import PageLayout from "@/components/layout/PageLayout";
import { GUIDES_CATEGORIES } from "@/data/guidesStructure";
import Link from "next/link";

/** 类目标题前：列表形状（实体） */
function GuideCategoryIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <rect x="4" y="5" width="16" height="2.5" rx="0.8" />
      <rect x="4" y="10.75" width="16" height="2.5" rx="0.8" />
      <rect x="4" y="16.5" width="16" height="2.5" rx="0.8" />
    </svg>
  );
}

/** 教程卡片标题前：文档/文章图标（实体） */
function GuideCardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm8 1.5V8h4.5L14 3.5z" />
    </svg>
  );
}

export default function GuidesPage() {
  const t = useTranslations();

  return (
    <PageLayout>
      {/* Hero：与首页首屏样式一致 */}
      <section className="scroll-mt-24 bg-black py-10 text-white" aria-label={t("guides.pageTitle")}>
        <div className="mx-auto w-full max-w-content px-4">
          <h1 className="font-bold text-white" style={{ fontSize: "2rem" }}>
            {t("guides.pageTitle")}
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/90">
            {t("guides.heroSubtitle")}
          </p>
        </div>
      </section>

      <section className="bg-elevated py-4">
        <div className="mx-auto w-full max-w-content">
          <div className="overflow-hidden rounded-[4px] bg-block px-4 py-6">
            <div className="space-y-10">
              {GUIDES_CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[var(--color-text-primary)]">
                    <span className="text-[#4FA4E2]" aria-hidden>
                      <GuideCategoryIcon />
                    </span>
                    {t(cat.titleKey)}
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {cat.entries.map((entry) => (
                      <Link
                        key={entry.id}
                        href={`/guides/${entry.id}`}
                        className="flex flex-col rounded-[4px] border border-[var(--color-border-subtle)] bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                      >
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)]">
                          <span className="text-[#4FA4E2]" aria-hidden>
                            <GuideCardIcon />
                          </span>
                          {t(entry.titleKey)}
                        </h3>
                        <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
                          {t(entry.descKey)}
                        </p>
                      </Link>
                    ))}
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
