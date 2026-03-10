"use client";

import { useTranslations } from "@/contexts/LocaleContext";
import PageLayout from "@/components/layout/PageLayout";
import { BLOG_CATEGORIES } from "@/data/blogStructure";
import Link from "next/link";

/** 类目标题前：列表图标 */
function BlogCategoryIcon({ className }: { className?: string }) {
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

/** 文章卡片前：文档图标 */
function BlogCardIcon({ className }: { className?: string }) {
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

export default function BlogPage() {
  const t = useTranslations();

  return (
    <PageLayout>
      {/* Hero：与首页、教程页一致的样式 */}
      <section
        className="scroll-mt-24 bg-black py-10 text-white"
        aria-label={t("blog.pageTitle")}
      >
        <div className="mx-auto w-full max-w-content px-4">
          <h1
            className="font-bold text-white"
            style={{ fontSize: "2rem" }}
          >
            {t("blog.pageTitle")}
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/90">
            {t("blog.heroSubtitle")}
          </p>
        </div>
      </section>

      <section className="bg-elevated py-4">
        <div className="mx-auto w-full max-w-content">
          <div className="overflow-hidden rounded-[4px] bg-block px-4 py-6">
            <div className="space-y-10">
              {BLOG_CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[var(--color-text-primary)]">
                    <span className="text-[#4FA4E2]" aria-hidden>
                      <BlogCategoryIcon />
                    </span>
                    {t(cat.titleKey)}
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {cat.entries.map((entry) => (
                      <Link
                        key={entry.id}
                        href={`/blog/${entry.id}`}
                        className="flex flex-col rounded-[4px] border border-[var(--color-border-subtle)] bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                      >
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)]">
                          <span className="text-[#4FA4E2]" aria-hidden>
                            <BlogCardIcon />
                          </span>
                          {t(entry.titleKey)}
                        </h3>
                        <p className="mt-2 flex-1 whitespace-pre-line text-xs leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
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
