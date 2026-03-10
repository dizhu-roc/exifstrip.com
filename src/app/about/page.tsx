"use client";

import { useTranslations } from "@/contexts/LocaleContext";
import PageLayout from "@/components/layout/PageLayout";

export default function AboutPage() {
  const t = useTranslations();

  const SECTIONS = [1, 2, 3, 4, 5] as const;

  return (
    <PageLayout>
      <section className="bg-elevated py-4">
        <div className="mx-auto w-full max-w-content">
          <div className="overflow-hidden rounded-[4px] bg-block px-4 py-6">
            <h1 className="mb-6 text-xl font-semibold text-[var(--color-text-primary)]">
              {t("pages.about.title")}
            </h1>
            <div className="space-y-6">
              {SECTIONS.map((n) => {
                const content = t(`pages.about.section${n}Content`);
                const paragraphs = content.split(/\n\n+/).filter(Boolean);
                return (
                  <div key={n}>
                    <h2 className="mb-2 text-base font-semibold text-[var(--color-text-primary)]">
                      {t(`pages.about.section${n}Title`)}
                    </h2>
                    <div className="space-y-2">
                      {paragraphs.map((para, i) => (
                        <p
                          key={i}
                          className="text-sm leading-relaxed text-[var(--color-text-secondary)]"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
