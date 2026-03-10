"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import en from "@/locales/en.json";
import ja from "@/locales/ja.json";
import zhCN from "@/locales/zh-CN.json";

const STORAGE_KEY = "exifstrip-locale";

export type Locale = "en" | "zh-CN" | "ja";

const SUPPORTED: Locale[] = ["en", "zh-CN", "ja"];
const MESSAGES: Record<Locale, Record<string, unknown>> = {
  en: en as Record<string, unknown>,
  "zh-CN": zhCN as Record<string, unknown>,
  ja: ja as Record<string, unknown>,
};

/** 默认英文；仅当用户曾在本站选择过语言时使用 localStorage（不再跟浏览器语言自动切换）。 */
function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored as Locale)) return stored as Locale;
  return "en";
}

function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  messages: Record<string, unknown>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setLocaleState(getInitialLocale());
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale === "zh-CN" ? "zh-CN" : locale;
  }, [mounted, locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key: string) => {
      const value = getNested(MESSAGES[locale], key);
      return value ?? key;
    },
    [locale]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t, messages: MESSAGES[locale] }),
    [locale, setLocale, t]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useTranslations() {
  const { t } = useLocale();
  return t;
}
