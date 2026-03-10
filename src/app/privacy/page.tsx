"use client";

import { useTranslations } from "@/contexts/LocaleContext";
import PageLayout from "@/components/layout/PageLayout";
import { PrivacyTitleIcon } from "@/components/home/MetadataIcons";

const GOOGLE_ADS_URL = "https://policies.google.com/technologies/ads";
const GOOGLE_PRIVACY_URL = "https://policies.google.com/privacy";
const GOOGLE_ANALYTICS_URL = "https://policies.google.com/technologies/partner-sites";
const PRIVACY_SECTION_IDS = [
  "noUploads", "noTracking", "cookies", "adsense", "security", "openSource", "children", "contact", "summary",
] as const;

function renderWithBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

export default function PrivacyPage() {
  const t = useTranslations();

  return (
    <PageLayout>
      <section className="bg-elevated py-4">
        <div className="mx-auto w-full max-w-content">
          <div className="overflow-hidden rounded-[4px] bg-block px-4 py-6">
            <div className="mb-4 flex items-center gap-2">
              <PrivacyTitleIcon className="text-[var(--color-brand-logo)]" />
              <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
                {t("pages.privacy.title")}
              </h1>
            </div>
            <div className="space-y-3 text-sm text-[var(--color-text-secondary)]">
              <p>{renderWithBold(t("privacy.intro"))}</p>
              <p className="text-xs text-[var(--color-text-tertiary)]">{t("privacy.lastUpdated")}</p>
              {PRIVACY_SECTION_IDS.map((id) => (
                <p key={id} className="leading-relaxed">
                  <strong className="text-[var(--color-text-primary)]">{t(`privacy.${id}Title`)}.</strong>{" "}
                  {renderWithBold(t(`privacy.${id}Content`))}
                </p>
              ))}
              <p className="pt-2 font-semibold text-[var(--color-text-primary)]">{t("privacy.linksHeading")}</p>
              <p className="leading-relaxed">
                <a href={GOOGLE_ADS_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--color-link)] underline hover:text-[var(--color-link-hover)]">
                  {t("privacy.linkGoogleAdsText")}
                </a>
                {" · "}
                <a href={GOOGLE_PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--color-link)] underline hover:text-[var(--color-link-hover)]">
                  {t("privacy.linkGooglePrivacyText")}
                </a>
                {" · "}
                <a href={GOOGLE_ANALYTICS_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--color-link)] underline hover:text-[var(--color-link-hover)]">
                  {t("privacy.linkGoogleAnalyticsText")}
                </a>
              </p>
              <p className="text-xs text-[var(--color-text-tertiary)]">{renderWithBold(t("privacy.rightsNote"))}</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
