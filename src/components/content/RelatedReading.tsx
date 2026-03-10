"use client";

import Link from "next/link";
import { useTranslations } from "@/contexts/LocaleContext";
import { getBlogEntryById } from "@/data/blogStructure";
import { getGuideEntryById } from "@/data/guidesStructure";
import { getRelatedForBlog, getRelatedForGuide } from "@/data/relatedContent";

type Props = {
  variant: "guide" | "blog";
  currentId: string;
};

export function RelatedReading({ variant, currentId }: Props) {
  const t = useTranslations();
  const rel =
    variant === "guide"
      ? getRelatedForGuide(currentId)
      : getRelatedForBlog(currentId);

  if (rel.guideIds.length === 0 && rel.blogIds.length === 0) return null;

  return (
    <nav
      className="mt-10 border-t border-[var(--color-border-subtle)] pt-6"
      aria-label={t("seo.relatedReading")}
    >
      <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">
        {t("seo.relatedReading")}
      </h2>
      <ul className="flex flex-col gap-2 text-sm text-[var(--color-text-secondary)]">
        {rel.guideIds.map((gid) => {
          const entry = getGuideEntryById(gid);
          if (!entry) return null;
          return (
            <li key={`g-${gid}`}>
              <Link
                href={`/guides/${gid}`}
                className="text-[var(--color-link)] hover:underline"
              >
                {t(entry.titleKey)}
              </Link>
              <span className="ml-1 text-xs text-[var(--color-text-tertiary)]">
                ({t("nav.guides")})
              </span>
            </li>
          );
        })}
        {rel.blogIds.map((bid) => {
          const entry = getBlogEntryById(bid);
          if (!entry) return null;
          return (
            <li key={`b-${bid}`}>
              <Link
                href={`/blog/${bid}`}
                className="text-[var(--color-link)] hover:underline"
              >
                {t(entry.titleKey)}
              </Link>
              <span className="ml-1 text-xs text-[var(--color-text-tertiary)]">
                ({t("nav.blog")})
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
