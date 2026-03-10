"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/contexts/LocaleContext";

const LOCALES: Locale[] = ["en", "zh-CN", "ja"];

const NAV_ITEMS: { href: string; key: string }[] = [
  { href: "/", key: "nav.home" },
  { href: "/guides", key: "nav.guides" },
  { href: "/blog", key: "nav.blog" },
  { href: "/faq", key: "nav.faq" },
  { href: "/about", key: "nav.about" },
];

export default function Nav() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-[66px] bg-white">
      <div className="relative mx-auto flex h-full w-full max-w-content items-center justify-between py-4">
        <Link href="/" className="flex h-[28px] items-center">
          <Image
            src="/logo.png"
            alt="ExifStrip"
            width={444}
            height={56}
            quality={100}
            className="h-[28px] w-auto object-contain"
            priority
            sizes="222px"
          />
        </Link>
        {/* 与 favicon.io/Bulma 一致：导航链接 #4a4a4a；选中态淡灰背景，上下 8px、左右 12px 边距 */}
        <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-6">
          {NAV_ITEMS.map(({ href, key }) => {
            const isActive = href === "/" ? pathname === "/" : pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`rounded py-2 px-3 text-base font-bold text-[#4a4a4a] hover:text-[var(--color-link)] ${
                  isActive ? "bg-[var(--color-bg-hover)]" : ""
                }`}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>
        <div className="relative flex items-center gap-2" ref={ref}>
          <svg
            className="h-5 w-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4FA4E2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex w-[120px] items-center justify-between gap-1 rounded-md border border-border px-3 py-1.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]"
          >
            <span className="truncate">{t(`languageOption.${locale}`)}</span>
            <span className="shrink-0 text-[var(--color-text-tertiary)]" aria-hidden>
              {open ? "▲" : "▼"}
            </span>
          </button>
          {open && (
            <div className="absolute right-0 top-full z-10 mt-1 min-w-[120px] rounded-md border border-border bg-white py-1 shadow-block">
              {LOCALES.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => {
                    setLocale(l);
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]"
                >
                  {t(`languageOption.${l}`)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
