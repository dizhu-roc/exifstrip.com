"use client";

import { useTranslations } from "@/contexts/LocaleContext";

const CARD_KEYS = [
  { titleKey: "fourCards.card1Title", descKey: "fourCards.card1Desc" },
  { titleKey: "fourCards.card2Title", descKey: "fourCards.card2Desc" },
  { titleKey: "fourCards.card3Title", descKey: "fourCards.card3Desc" },
  { titleKey: "fourCards.card4Title", descKey: "fourCards.card4Desc" },
] as const;

export default function FourCards() {
  const t = useTranslations();

  return (
    <section className="bg-elevated py-4">
      <div className="mx-auto w-full max-w-content">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARD_KEYS.map(({ titleKey, descKey }) => (
            <div
              key={titleKey}
              className="rounded-md border border-border bg-block p-4 shadow-block"
            >
              <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                {t(titleKey)}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
