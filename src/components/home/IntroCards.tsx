"use client";

import Link from "next/link";
import { useTranslations } from "@/contexts/LocaleContext";
import { IntroCardIcon } from "./MetadataIcons";

const CARD_KEYS = [
  { titleKey: "intro.whoWeAre", descKey: "intro.whoWeAreDesc" },
  { titleKey: "intro.whatYouCanDo", descKey: "intro.whatYouCanDoDesc" },
  { titleKey: "intro.whatIsExif", descKey: "intro.whatIsExifDesc" },
  { titleKey: "intro.aboutPrivacy", descKey: "intro.aboutPrivacyDesc" },
  { titleKey: "intro.learnMore", descKey: "intro.learnMoreDesc" },
] as const;

export default function IntroCards() {
  const t = useTranslations();

  return (
    <section id="intro" className="scroll-mt-24 bg-elevated py-4">
      <div className="mx-auto w-full max-w-content">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CARD_KEYS.map(({ titleKey, descKey }) => (
            <div
              key={titleKey}
              className="rounded-md border border-border bg-block p-4 shadow-block"
            >
              <h3 className="flex items-center gap-2 text-base font-semibold text-[var(--color-text-primary)]">
                <IntroCardIcon className="text-[#4FA4E2]" />
                {t(titleKey)}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {titleKey === "intro.whatYouCanDo" ? (
                  <>
                    {t("intro.whatYouCanDoDescPart1")}
                    <a
                      href="#privacy"
                      className="text-red-600 underline hover:text-red-700"
                    >
                      {t("intro.whatYouCanDoDescLink")}
                    </a>
                    {t("intro.whatYouCanDoDescPart2")}
                  </>
                ) : titleKey === "intro.whatIsExif" ? (
                  <>
                    {t(descKey)}{" "}
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new CustomEvent("exifstrip:highlight-upload"))}
                      className="font-semibold text-[#4FA4E2] underline hover:text-[#3d8fc9]"
                    >
                      {t("intro.tryIt")}
                    </button>
                  </>
                ) : titleKey === "intro.learnMore" ? (
                  <>
                    {t("intro.learnMoreDescPart1")}
                    <Link href="/blog" className="text-red-600 underline hover:text-red-700">
                      {t("intro.learnMoreDescBlog")}
                    </Link>
                    {t("intro.learnMoreDescOr")}
                    <Link href="/faq" className="text-red-600 underline hover:text-red-700">
                      {t("intro.learnMoreDescFaq")}
                    </Link>
                    {t("intro.learnMoreDescPart2")}
                    <Link href="/guides" className="text-red-600 underline hover:text-red-700">
                      {t("intro.learnMoreDescTutorialsLink")}
                    </Link>
                    {t("intro.learnMoreDescPart3")}
                  </>
                ) : (
                  t(descKey)
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
