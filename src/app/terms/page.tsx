"use client";

import { useTranslations } from "@/contexts/LocaleContext";
import PageLayout from "@/components/layout/PageLayout";

export default function TermsPage() {
  const t = useTranslations();

  return (
    <PageLayout>
      <section className="bg-elevated py-4">
        <div className="mx-auto w-full max-w-content">
          <div className="overflow-hidden rounded-[4px] bg-block px-4 py-6">
            <h1 className="mb-4 text-xl font-semibold text-[var(--color-text-primary)]">
              {t("pages.terms.title")}
            </h1>
            <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {t("pages.terms.content")}
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
