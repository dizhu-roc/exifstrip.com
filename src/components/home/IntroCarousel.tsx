"use client";

import { useTranslations } from "@/contexts/LocaleContext";

export default function IntroCarousel() {
  const t = useTranslations();

  return (
    <section id="hero" className="scroll-mt-24 bg-black py-10 text-white" aria-label="Hero">
      <div className="mx-auto w-full max-w-content px-4">
        <h1 className="font-bold text-white" style={{ fontSize: "2rem" }}>
          {t("hero.title")}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/90">
          {t("hero.desc")}
        </p>
      </div>
    </section>
  );
}
