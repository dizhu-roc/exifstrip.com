"use client";

import Image from "next/image";
import { useTranslations } from "@/contexts/LocaleContext";
import { TwitterIcon, GitHubIcon } from "./MetadataIcons";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  const copyrightText = t("footer.copyright").replace("{year}", String(year));

  return (
    <footer className="bg-black py-8 text-white">
      <div className="mx-auto flex w-full max-w-content justify-center px-4">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          {/* 左栏：favicon + 网站名 + 简短介绍 + 版权 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/fav/favicon-32x32.png"
                alt=""
                width={32}
                height={32}
                className="h-6 w-6 shrink-0"
                aria-hidden
              />
              <span className="text-base font-semibold text-white">
                {t("footer.siteName")}
              </span>
            </div>
            <p className="text-sm text-white/85 leading-relaxed">
              {t("footer.intro")}
            </p>
            <p className="mt-2 text-xs text-white/70">
              {copyrightText}
            </p>
          </div>

          {/* 中栏：跳转链接 */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-white">
              {t("footer.links")}
            </span>
            <nav className="flex flex-col gap-1.5 text-sm">
              <a
                href="/privacy"
                className="text-white/85 hover:text-white hover:font-bold"
              >
                {t("footer.privacy")}
              </a>
              <a
                href="/terms"
                className="text-white/85 hover:text-white hover:font-bold"
              >
                {t("footer.terms")}
              </a>
              <a
                href="/about"
                className="text-white/85 hover:text-white hover:font-bold"
              >
                {t("footer.about")}
              </a>
              <a
                href="/faq"
                className="text-white/85 hover:text-white hover:font-bold"
              >
                {t("footer.faq")}
              </a>
            </nav>
          </div>

          {/* 右栏：联系我们（Twitter、GitHub 占位）+ 反馈占位 */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-white">
              {t("footer.contactUs")}
            </span>
            <div className="flex flex-col gap-1.5 text-sm text-white/85">
              <a
                href="https://x.com/buglife159357"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white hover:font-bold"
                aria-label={t("footer.twitter")}
              >
                <TwitterIcon className="text-white/85" />
                {t("footer.twitter")}
              </a>
              <a
                href="https://github.com/dizhu-roc/exifstrip.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white hover:font-bold"
                aria-label={t("footer.github")}
              >
                <GitHubIcon className="text-white/85" />
                {t("footer.github")}
              </a>
            </div>
            <span className="mt-3 text-sm font-semibold text-white">
              {t("footer.feedback")}
            </span>
            <p className="text-sm text-white/60">
              —
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
