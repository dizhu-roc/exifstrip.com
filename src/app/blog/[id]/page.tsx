"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslations } from "@/contexts/LocaleContext";
import PageLayout from "@/components/layout/PageLayout";
import { getBlogEntryById } from "@/data/blogStructure";
import { BLOG_REFERENCES } from "@/data/blogReferences";
import { RelatedReading } from "@/components/content/RelatedReading";

/** 站内 /blog/、/guides/ 用 Next Link，其余用 a */
function BlogMarkdown({ content }: { content: string }) {
  return (
    <div className="guide-content prose prose-sm max-w-none text-sm leading-loose text-[var(--color-text-primary)] [&_p]:mb-5 [&_h1]:text-lg [&_h1]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:first:mt-0 [&_ul]:my-4 [&_figure]:my-6 [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-[var(--color-border-default)] [&_th]:bg-[var(--color-bg-elevated)] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_td]:border [&_td]:border-[var(--color-border-subtle)] [&_td]:px-3 [&_td]:py-2 [&_img]:max-w-[min(100%,540px)] [&_img]:h-auto [&_img]:my-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            if (href?.startsWith("/blog/") || href?.startsWith("/guides/")) {
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

export default function BlogEntryPage() {
  const params = useParams();
  const t = useTranslations();
  const id = typeof params?.id === "string" ? params.id : "";
  const entry = getBlogEntryById(id);

  if (!entry) {
    return (
      <PageLayout>
        <section className="bg-elevated py-4">
          <div className="mx-auto w-full max-w-content px-4">
            <div className="overflow-hidden rounded-[4px] bg-block px-4 py-6">
              <p className="text-sm text-[var(--color-text-secondary)]">
                {t("blog.notFound")}
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-block text-sm font-medium text-[var(--color-link)] hover:underline"
              >
                ← {t("nav.blog")}
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  const content = t(entry.contentKey);

  return (
    <PageLayout>
      <section className="bg-elevated py-4">
        <div className="mx-auto w-full max-w-content px-4">
          <div className="overflow-hidden rounded-[4px] bg-block px-4 py-6">
            <Link
              href="/blog"
              className="mb-4 inline-block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-link)]"
            >
              ← {t("nav.blog")}
            </Link>
            <h1 className="mb-2 text-xl font-semibold text-[var(--color-text-primary)]">
              {t(entry.titleKey)}
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {t(entry.descKey)}
            </p>
            <BlogMarkdown content={content} />
            <RelatedReading variant="blog" currentId={id} />
            {BLOG_REFERENCES[id]?.length > 0 && (
              <div className="mt-10 border-t border-[var(--color-border-subtle)] pt-6">
                <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">
                  {t("blog.referencesTitle")}
                </h2>
                <ul className="space-y-2 text-sm">
                  {BLOG_REFERENCES[id].map((ref, i) => (
                    <li key={i} className="flex flex-col gap-0.5">
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-link)] hover:underline"
                      >
                        {ref.title}
                      </a>
                      <span className="break-all text-xs text-[var(--color-text-tertiary)]">
                        {ref.url}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
