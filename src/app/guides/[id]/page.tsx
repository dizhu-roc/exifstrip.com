"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslations } from "@/contexts/LocaleContext";
import PageLayout from "@/components/layout/PageLayout";
import { getGuideEntryById } from "@/data/guidesStructure";
import { GUIDE_REFERENCES } from "@/data/guideReferences";
import { RelatedReading } from "@/components/content/RelatedReading";

/** 内部链接 /guides/xxx 用 Next Link，其余用普通 a */
function GuideMarkdown({ content }: { content: string }) {
  return (
    <div className="guide-content prose prose-sm max-w-none text-sm leading-loose text-[var(--color-text-primary)] [&_p]:mb-5 [&_h1]:text-lg [&_h1]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:first:mt-0 [&_ul]:my-4 [&_figure]:my-6 [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-[var(--color-border-default)] [&_th]:bg-[var(--color-bg-elevated)] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_td]:border [&_td]:border-[var(--color-border-subtle)] [&_td]:px-3 [&_td]:py-2 [&_img]:max-w-[min(100%,540px)] [&_img]:h-auto [&_img]:my-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        a: ({ href, children }) => {
          if (href?.startsWith("/guides/")) {
            return (
              <Link href={href} className="text-[var(--color-link)] hover:underline">
                {children}
              </Link>
            );
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--color-link)] hover:underline">
              {children}
            </a>
          );
        },
      }}
    >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function GuideEntryPage() {
  const params = useParams();
  const t = useTranslations();
  const id = typeof params?.id === "string" ? params.id : "";
  const entry = getGuideEntryById(id);

  if (!entry) {
    return (
      <PageLayout>
        <section className="bg-elevated py-4">
          <div className="mx-auto w-full max-w-content">
            <div className="overflow-hidden rounded-[4px] bg-block px-4 py-6">
              <p className="text-sm text-[var(--color-text-secondary)]">
                {t("guides.notFound")}
              </p>
              <Link
                href="/guides"
                className="mt-4 inline-block text-sm font-medium text-[var(--color-link)] hover:underline"
              >
                ← {t("nav.guides")}
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  const hasLead = entry.leadKey && t(entry.leadKey) !== entry.leadKey;
  const hasImage = entry.image;

  return (
    <PageLayout>
      <section className="bg-elevated py-4">
        <div className="mx-auto w-full max-w-content">
          <div className="overflow-hidden rounded-[4px] bg-block px-4 py-6">
            <Link
              href="/guides"
              className="mb-4 inline-block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-link)]"
            >
              ← {t("nav.guides")}
            </Link>
            <h1 className="mb-2 text-xl font-semibold text-[var(--color-text-primary)]">
              {t(entry.titleKey)}
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {t(entry.descKey)}
            </p>

            {/* 开篇引题 + 配图（仅当该条目配置了 leadKey / image 时显示） */}
            {(hasLead || hasImage) && (
              <div className="mb-8 space-y-4">
                {hasLead && (
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {t(entry.leadKey!)}
                  </p>
                )}
                {hasImage && (
                  <figure className="my-4">
                    <img
                      src={entry.image!}
                      alt={entry.id === "exif-structure" ? "EXIF structure diagram: 0th IFD, Exif sub-IFD, GPS sub-IFD" : "Guide illustration"}
                      width={420}
                      height={280}
                      className="max-w-full h-auto rounded border border-[var(--color-border-subtle)]"
                    />
                  </figure>
                )}
              </div>
            )}

            {entry.contentKey && t(entry.contentKey) !== entry.contentKey ? (
              <>
                <div className="guide-content-wrapper">
                  <GuideMarkdown content={t(entry.contentKey)} />
                </div>
                <RelatedReading variant="guide" currentId={entry.id} />
                {GUIDE_REFERENCES[entry.id]?.length > 0 && (
                  <div className="mt-10 border-t border-[var(--color-border-subtle)] pt-6">
                    <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">
                      {t("guides.referencesTitle")}
                    </h2>
                    <ul className="space-y-2 text-sm">
                      {GUIDE_REFERENCES[entry.id].map((ref, i) => (
                        <li key={i} className="flex flex-col gap-0.5">
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-link)] hover:underline"
                          >
                            {ref.title}
                          </a>
                          {ref.url && (
                            <span className="break-all text-xs text-[var(--color-text-tertiary)]">
                              {ref.url}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-[var(--color-text-tertiary)]">
                {t("guides.comingSoon")}
              </p>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
