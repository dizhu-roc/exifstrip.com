"use client";

import { useState, useEffect, useRef } from "react";
import { UploadProvider, type ExifResult, type OriginalGpsFull } from "@/contexts/UploadContext";
import { useTranslations } from "@/contexts/LocaleContext";
import { loadExifTags, getRawGpsDecimalString } from "@/lib/parseExif";
import { useUploadFiles } from "./useUploadFiles";
import UploadAndMap from "./UploadAndMap";
import MetadataStrip from "./MetadataStrip";
import MetadataGraphSection from "./MetadataGraphSection";
import WhyStripExifSection from "./WhyStripExifSection";

const UPLOAD_ICON = (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const METADATA_ICON = (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const PRIVACY_ICON = (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const QUICK_NAV_RAIL_WIDTH = "w-11";

function QuickActionsCard({ onUploadClick }: { onUploadClick: () => void }) {
  const t = useTranslations();

  const handleUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
    onUploadClick();
  };

  const linkBase =
    "flex items-center gap-3 rounded-r-md py-2.5 pr-3 text-left text-sm font-medium transition-colors hover:bg-[var(--color-bg-hover)]";
  const iconCol = "flex w-11 shrink-0 items-center justify-center";

  return (
    <>
      {/* 宽度 > 1450px：常驻面板 */}
      <aside
        className="fixed right-1 top-1/2 z-50 hidden w-[11rem] -translate-y-1/2 overflow-hidden rounded-l-xl bg-[var(--color-bg-block)] shadow-lg min-[1451px]:block"
        style={{ boxShadow: "var(--shadow-block), -2px 0 0 0 #4FA4E2" }}
        aria-label={t("quickActions.title")}
      >
        <nav className="flex flex-col px-3 py-1">
          <button
            type="button"
            onClick={handleUpload}
            className={linkBase}
            aria-label={t("quickActions.upload")}
          >
            <span className={`${iconCol} text-[#4FA4E2]`}>{UPLOAD_ICON}</span>
            <span className="text-[#4FA4E2]">{t("quickActions.upload")}</span>
          </button>
          <a href="#metadata" className={`${linkBase} text-[var(--color-text-primary)]`}>
            <span className={iconCol}>{METADATA_ICON}</span>
            <span>{t("quickActions.metadata")}</span>
          </a>
          <a href="#privacy" className={`${linkBase} text-[var(--color-text-primary)]`}>
            <span className={iconCol}>{PRIVACY_ICON}</span>
            <span>{t("quickActions.privacy")}</span>
          </a>
        </nav>
      </aside>

      {/* 宽度 <= 1450px：右侧轨道，悬停展开 */}
      <div
        className="group fixed right-1 top-1/2 z-50 hidden w-11 -translate-y-1/2 flex-row-reverse overflow-hidden rounded-l-xl bg-[var(--color-bg-block)] shadow-lg transition-[width] duration-200 ease-out hover:w-[11rem] max-[1450px]:flex min-[1451px]:hidden"
        style={{ boxShadow: "var(--shadow-block), -2px 0 0 0 #4FA4E2" }}
        aria-label={t("quickActions.title")}
      >
        {/* 展开后的文案区 */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <nav className="flex flex-col px-3 py-1">
            <button
              type="button"
              onClick={handleUpload}
              className={linkBase}
              aria-label={t("quickActions.upload")}
            >
              <span className={`${iconCol} text-[#4FA4E2]`}>{UPLOAD_ICON}</span>
              <span className="truncate text-[#4FA4E2]">{t("quickActions.upload")}</span>
            </button>
            <a href="#metadata" className={`${linkBase} text-[var(--color-text-primary)]`}>
              <span className={iconCol}>{METADATA_ICON}</span>
              <span className="truncate">{t("quickActions.metadata")}</span>
            </a>
            <a href="#privacy" className={`${linkBase} text-[var(--color-text-primary)]`}>
              <span className={iconCol}>{PRIVACY_ICON}</span>
              <span className="truncate">{t("quickActions.privacy")}</span>
            </a>
          </nav>
        </div>
        {/* 收缩时可见的图标轨道；展开后隐藏，只保留左侧一列图标+文案 */}
        <div
          className={`${QUICK_NAV_RAIL_WIDTH} shrink-0 flex flex-col border-l border-[var(--color-border)] bg-[var(--color-bg-block)] py-1 transition-[width,opacity] duration-200 group-hover:w-0 group-hover:min-w-0 group-hover:overflow-hidden group-hover:opacity-0`}
          aria-hidden
        >
          <button
            type="button"
            onClick={handleUpload}
            className="flex h-10 w-full items-center justify-center text-[#4FA4E2] transition-colors hover:bg-[var(--color-bg-hover)]"
            aria-label={t("quickActions.upload")}
          >
            {UPLOAD_ICON}
          </button>
          <a
            href="#metadata"
            className="flex h-10 w-full items-center justify-center text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-hover)]"
            aria-label={t("quickActions.metadata")}
          >
            {METADATA_ICON}
          </a>
          <a
            href="#privacy"
            className="flex h-10 w-full items-center justify-center text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-hover)]"
            aria-label={t("quickActions.privacy")}
          >
            {PRIVACY_ICON}
          </a>
        </div>
      </div>
    </>
  );
}

/**
 * 单例上传状态 + 地图 + 下方 Metadata 联动。
 * 对当前选中文件做单次 EXIF 解析，结果通过 Context 分发给子组件，避免重复 load。
 */
export default function UploadSection() {
  const upload = useUploadFiles();
  const [exifResult, setExifResult] = useState<ExifResult>(null);
  const [exifLoading, setExifLoading] = useState(false);
  const [originalGpsFull, setOriginalGpsFull] = useState<OriginalGpsFull>(null);
  const lastFileRef = useRef<File | null>(null);

  const file = upload.selectedItem?.file ?? null;
  const selectedIdRef = useRef(upload.selectedId);

  useEffect(() => {
    selectedIdRef.current = upload.selectedId;
    if (!file) {
      lastFileRef.current = null;
      queueMicrotask(() => {
        setExifResult(null);
        setOriginalGpsFull(null);
        setExifLoading(false);
      });
      return;
    }
    if (lastFileRef.current === file) return;
    lastFileRef.current = file;
    queueMicrotask(() => setExifLoading(true));
    let cancelled = false;
    loadExifTags(file).then((result) => {
      if (cancelled) return;
      setExifResult(result);
      if (result.ok) {
        setOriginalGpsFull({
          lat: getRawGpsDecimalString("GPSLatitude", result.tags),
          lng: getRawGpsDecimalString("GPSLongitude", result.tags),
        });
      } else {
        setOriginalGpsFull(null);
      }
      setExifLoading(false);
      const id = selectedIdRef.current;
      if (id) upload.setParseError(id, !result.ok);
    });
    return () => {
      cancelled = true;
    };
    // 仅依赖 file/selectedId/setParseError，不依赖整个 upload，避免 effect 因 upload 引用变化而频繁重跑
  }, [file, upload.selectedId, upload.setParseError]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UploadProvider
      items={upload.items}
      selectedId={upload.selectedId}
      setSelectedId={upload.setSelectedId}
      parseErrorIds={upload.parseErrorIds}
      setParseError={upload.setParseError}
      exifResult={exifResult}
      exifLoading={exifLoading}
      originalGpsFull={originalGpsFull}
    >
      <QuickActionsCard onUploadClick={upload.openPickerForReplaceOrAdd} />
      <UploadAndMap upload={upload} />
      <MetadataStrip />
      <MetadataGraphSection />
      <WhyStripExifSection />
    </UploadProvider>
  );
}
