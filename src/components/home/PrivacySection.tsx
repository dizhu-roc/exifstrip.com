"use client";

import { useTranslations } from "@/contexts/LocaleContext";
import { PrivacyTitleIcon } from "./MetadataIcons";

const PRIVACY_SECTION_IDS = [
  "noUploads",
  "noTracking",
  "cookies",
  "adsense",
  "security",
  "openSource",
  "children",
  "contact",
  "summary",
] as const;

const GOOGLE_ADS_URL = "https://policies.google.com/technologies/ads";
const GOOGLE_PRIVACY_URL = "https://policies.google.com/privacy";
const GOOGLE_ANALYTICS_URL = "https://policies.google.com/technologies/partner-sites";

/** 将文案中的 **text** 渲染为 <strong> */
function renderWithBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

export default function PrivacySection() {
  const t = useTranslations();

  return (
    <section id="privacy" className="scroll-mt-24 bg-elevated py-4">
      <div className="mx-auto w-full max-w-content">
        <div className="rounded-md border border-border bg-block shadow-block">
          <div className="flex items-center gap-2 px-4 py-3">
            <PrivacyTitleIcon className="text-[#4FA4E2]" />
            <span className="text-base font-semibold text-[var(--color-text-primary)]">
              {t("privacy.title")}
            </span>
          </div>
          <div className="border-t border-border-subtle px-4 py-4 text-sm text-[var(--color-text-secondary)]">
            <p className="mb-3">{renderWithBold(t("privacy.intro"))}</p>
            <p className="mb-4 text-xs text-[var(--color-text-tertiary)]">
              {t("privacy.lastUpdated")}
            </p>
            <div className="space-y-3">
              {PRIVACY_SECTION_IDS.map((id) => (
                <p key={id} className="leading-relaxed">
                  <strong className="text-[var(--color-text-primary)]">
                    {t(`privacy.${id}Title`)}.
                  </strong>{" "}
                  {renderWithBold(t(`privacy.${id}Content`))}
                </p>
              ))}
            </div>
            <p className="mt-4 font-semibold text-[var(--color-text-primary)]">
              {t("privacy.linksHeading")}
            </p>
            <p className="mt-1 leading-relaxed">
              <a
                href={GOOGLE_ADS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-link)] underline hover:text-[var(--color-link-hover)]"
              >
                {t("privacy.linkGoogleAdsText")}
              </a>
              {" · "}
              <a
                href={GOOGLE_PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-link)] underline hover:text-[var(--color-link-hover)]"
              >
                {t("privacy.linkGooglePrivacyText")}
              </a>
              {" · "}
              <a
                href={GOOGLE_ANALYTICS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-link)] underline hover:text-[var(--color-link-hover)]"
              >
                {t("privacy.linkGoogleAnalyticsText")}
              </a>
            </p>
            <p className="mt-4 text-xs text-[var(--color-text-tertiary)]">
              {renderWithBold(t("privacy.rightsNote"))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
