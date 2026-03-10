"use client";

/* eslint-disable react-hooks/refs -- upload API 需将 inputRef 传给原生 input，未在 render 中读 ref.current */
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "@/contexts/LocaleContext";
import dynamic from "next/dynamic";
import {
  blocksFromTags,
  fileInfoFromTags,
  fileInfoFromFile,
  getSignedLatLngFromTags,
  type FileInfoDisplay,
} from "@/lib/parseExif";
import { getRiskFromBlocks, type RiskAnalysis } from "@/lib/exifRisk";
import { useUploadContext } from "@/contexts/UploadContext";
import type { UploadFilesApi } from "./useUploadFiles";
import type { BlockId } from "@/constants/exifBlocks";
import type { BlockRows } from "@/lib/parseExif";

const GpsMapPanel = dynamic(() => import("./GpsMapPanel"), { ssr: false });

/** 各维度在隐私分析中展示的关键字段（仅列重要几项） */
const RISK_KEY_TAGS: Partial<Record<BlockId, string[]>> = {
  location: ["GPSLatitude", "GPSLongitude"],
  device: ["Make", "Model"],
  other: ["Artist", "Copyright", "UserComment"],
  dateTime: ["DateTimeOriginal", "DateTime"],
};

/** 维度说明文案 key */
const RISK_DESC_KEYS: Partial<Record<BlockId, string>> = {
  location: "upload.riskDescLocation",
  device: "upload.riskDescDevice",
  other: "upload.riskDescOther",
  dateTime: "upload.riskDescDateTime",
};

type RiskLevel = "high" | "medium" | "low" | "safe";

const RISK_SECTION_STYLES: Record<
  Exclude<RiskLevel, "safe">,
  { label: string; headerClass: string; bgClass: string; iconClass: string }
> = {
  high: {
    label: "upload.riskHigh",
    headerClass: "text-red-600 font-semibold",
    bgClass: "bg-red-50 dark:bg-red-950/20",
    iconClass: "text-red-600",
  },
  medium: {
    label: "upload.riskMedium",
    headerClass: "text-amber-600 font-semibold",
    bgClass: "bg-amber-50 dark:bg-amber-950/20",
    iconClass: "text-amber-600",
  },
  low: {
    label: "upload.riskLow",
    headerClass: "text-blue-600 font-semibold",
    bgClass: "bg-blue-50 dark:bg-blue-950/20",
    iconClass: "text-blue-600",
  },
};

function DimensionIcon({ blockId, className }: { blockId: BlockId; className?: string }) {
  switch (blockId) {
    case "location":
      return <LocationPinIcon className={className} />;
    case "device":
      return <CameraIcon className={className} />;
    case "other":
      return <DocumentIcon className={className} />;
    case "dateTime":
      return <CalendarIcon className={className} />;
    default:
      return <DocumentIcon className={className} />;
  }
}

function PrivacyRiskSections({
  risk,
  blocks,
  t,
}: {
  risk: RiskAnalysis;
  blocks: Record<string, BlockRows>;
  t: (key: string) => string;
}) {
  const level = risk.level;
  const hasHigh = risk.items.high.length > 0;
  const hasMedium = risk.items.medium.length > 0;
  const hasLow = risk.items.low.length > 0;

  const renderDimensionCards = (blockIds: BlockId[], riskLevel: Exclude<RiskLevel, "safe">) => {
    const style = RISK_SECTION_STYLES[riskLevel];
    return blockIds.map((blockId) => {
      const rows = blocks[blockId] ?? [];
      const keyTags = RISK_KEY_TAGS[blockId];
      const keyValues = keyTags
        ? keyTags
            .map((tag) => rows.find((r) => r.tag === tag)?.value)
            .filter((v): v is string => v != null && String(v).trim() !== "")
        : [];
      if (keyValues.length === 0) return null;
      // 位置维度：经纬度合并为一行展示
      const displayValues =
        blockId === "location" && keyValues.length >= 2
          ? [keyValues.join(", ")]
          : blockId === "location" && keyValues.length === 1
            ? keyValues
            : keyValues;
      const descKey = RISK_DESC_KEYS[blockId];
      return (
        <div
          key={blockId}
          className={`rounded-md border border-[var(--color-border-subtle)] p-3 ${style.bgClass}`}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className={style.iconClass} aria-hidden>
              <DimensionIcon blockId={blockId} className="h-4 w-4 shrink-0" />
            </span>
            <span className={`text-sm font-semibold ${style.headerClass}`}>
              {t(`metadata.${blockId}`)}
            </span>
          </div>
          {descKey && (
            <p className="mb-2 text-xs text-[var(--color-text-tertiary)]">
              {t(descKey)}
            </p>
          )}
          <div className="space-y-1.5">
            {displayValues.map((val, i) => (
              <div
                key={i}
                className="rounded border border-[var(--color-border-default)] bg-white px-2 py-1.5 text-sm text-[var(--color-text-primary)]"
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-3 text-sm">
      {level === "safe" && !hasHigh && !hasMedium && !hasLow ? (
        <div className="rounded-md border border-[var(--color-border-subtle)] bg-emerald-50 dark:bg-emerald-950/20 p-4">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold mb-1">
            <RiskTriangleIcon className="h-4 w-4 shrink-0" />
            {t("upload.riskNone")}
          </div>
          <p className="text-[var(--color-text-secondary)]">{t("upload.riskSafe")}</p>
        </div>
      ) : (
        <>
          {hasHigh && (
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <RiskTriangleIcon className="h-4 w-4 shrink-0 text-red-600" />
                <span className={RISK_SECTION_STYLES.high.headerClass}>
                  {t(RISK_SECTION_STYLES.high.label)}
                </span>
              </div>
              <div className={`space-y-2 rounded-md p-2 ${RISK_SECTION_STYLES.high.bgClass}`}>
                {renderDimensionCards(risk.items.high, "high")}
              </div>
            </div>
          )}
          {hasMedium && (
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <RiskTriangleIcon className="h-4 w-4 shrink-0 text-amber-600" />
                <span className={RISK_SECTION_STYLES.medium.headerClass}>
                  {t(RISK_SECTION_STYLES.medium.label)}
                </span>
              </div>
              <div className={`space-y-2 rounded-md p-2 ${RISK_SECTION_STYLES.medium.bgClass}`}>
                {renderDimensionCards(risk.items.medium, "medium")}
              </div>
            </div>
          )}
          {hasLow && (
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <RiskTriangleIcon className="h-4 w-4 shrink-0 text-blue-600" />
                <span className={RISK_SECTION_STYLES.low.headerClass}>
                  {t(RISK_SECTION_STYLES.low.label)}
                </span>
              </div>
              <div className={`space-y-2 rounded-md p-2 ${RISK_SECTION_STYLES.low.bgClass}`}>
                {renderDimensionCards(risk.items.low, "low")}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/** 红色错误图标（解析失败等） */
function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

/** 填充相机图标（非线条），通体 currentColor */
function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M9 4L7.17 6H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-3.17L15 4H9zm3 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

/** 上传图标：图片框 + 向上箭头，表示上传图片 */
function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 8v8" />
      <path d="m9 11 3-3 3 3" />
    </svg>
  );
}

/** 风险等级标题用三角警示图标 */
function RiskTriangleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2L2 20h20L12 2zm0 3.5L18.5 18h-13L12 5.5z" />
    </svg>
  );
}

/** 维度：位置（地图钉） */
function LocationPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

/** 维度：日期时间（日历） */
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
    </svg>
  );
}

/** 维度：其他（文档/信息） */
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </svg>
  );
}

/** 盾牌图标（隐私/安全） */
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

/** 参考图：灰色圆圈问号 */
function HelpCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

/** 白底圆 + 红色线条旋转箭头 */
function ResetIcon({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-white ${className ?? ""}`}
      aria-hidden
    >
      <svg
        className="block"
        width="8"
        height="8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-error)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    </span>
  );
}

const FORMATS = ["JPEG", "PNG", "TIFF", "HEIC / HEIF", "AVIF", "WebP"];

export default function UploadAndMap({ upload }: { upload: UploadFilesApi }) {
  const t = useTranslations();
  const [formatsOpen, setFormatsOpen] = useState(false);
  const formatsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        formatsRef.current &&
        !formatsRef.current.contains(e.target as Node)
      ) {
        setFormatsOpen(false);
      }
    }
    if (formatsOpen) {
      document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }
  }, [formatsOpen]);

  const hasFiles = upload.items.length > 0;
  const ctx = useUploadContext();
  const file = upload.selectedItem?.file ?? null;
  const fileInfo: FileInfoDisplay | null =
    !file
      ? null
      : ctx?.exifResult?.ok
        ? fileInfoFromTags(file, ctx.exifResult.tags)
        : fileInfoFromFile(file);
  const gps =
    ctx?.exifResult?.ok ? getSignedLatLngFromTags(ctx.exifResult.tags) : null;
  const blocks = ctx?.exifResult?.ok ? blocksFromTags(ctx.exifResult.tags) : {};
  const risk: RiskAnalysis | null =
    file && !ctx?.exifLoading ? getRiskFromBlocks(blocks) : null;

  const singleFile = upload.items.length === 1;
  const multipleFiles = upload.items.length > 1;

  const [uploadHighlight, setUploadHighlight] = useState(false);
  const highlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onHighlightRequest() {
      setUploadHighlight(true);
      if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
      highlightTimeoutRef.current = setTimeout(() => {
        setUploadHighlight(false);
        highlightTimeoutRef.current = null;
      }, 2500);
    }
    window.addEventListener("exifstrip:highlight-upload", onHighlightRequest);
    return () => {
      window.removeEventListener("exifstrip:highlight-upload", onHighlightRequest);
      if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
    };
  }, []);

  return (
    <section id="upload" className="scroll-mt-24 bg-elevated py-4">
      <div className="mx-auto w-full max-w-content">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_3fr] md:items-stretch">
          {/* 左侧：有图时 File Information 常驻展开，无折叠 */}
          <div className="flex min-h-[300px] flex-col gap-4 rounded-[4px] border border-[var(--color-border-subtle)] bg-white p-4 shadow-block">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="text-[#4FA4E2]"
                  aria-hidden
                >
                  <CameraIcon className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {t("upload.title")}
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-3">
              {/* 支持的格式 */}
              <div className="relative" ref={formatsRef}>
                <button
                  type="button"
                  onClick={() => setFormatsOpen((o) => !o)}
                  className="inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
                  aria-expanded={formatsOpen}
                >
                  <HelpCircleIcon className="h-4 w-4 shrink-0" />
                  <span>{t("upload.supportedFormats")}</span>
                </button>
                {formatsOpen && (
                  <div
                    className="absolute right-0 top-full z-20 mt-2 max-w-xs rounded-md bg-black px-3 py-2.5 text-sm italic text-white"
                    role="tooltip"
                  >
                    <p className="mb-1.5 border-b border-white/20 pb-1.5 text-white/95">
                      {FORMATS.join(", ")}
                    </p>
                    <p className="text-xs not-italic text-white/70">
                      {t("upload.supportedFormatsFooter")}
                    </p>
                  </div>
                )}
              </div>
              {/* 有文件时最右侧：与 Choose File 同形，红底白字加粗大写 */}
              {hasFiles && (
                <button
                  type="button"
                  onClick={() => upload.clear()}
                  className="inline-flex w-fit items-center gap-1 rounded-[4px] bg-[var(--color-error)] py-1 pl-[0.2rem] pr-[0.2rem] text-xs font-bold uppercase text-white hover:opacity-90"
                >
                  <ResetIcon className="h-[14px] w-[14px] shrink-0 p-[1px]" />
                  <span>{t("upload.reset")}</span>
                </button>
              )}
              </div>
            </div>

            <input
              ref={upload.inputRef}
              type="file"
              accept={upload.accept}
              multiple
              className="hidden"
              onChange={upload.onInputChange}
            />

            {/* 上传区：高度 200px；有图时无内边距贴边；多图列表滚动；单张 object-contain 不超出 */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => !hasFiles && upload.openPicker()}
              onKeyDown={(e) => {
                if (!hasFiles && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  upload.openPicker();
                }
              }}
              onDrop={upload.onDrop}
              onDragOver={upload.onDragOver}
              onDragLeave={upload.onDragLeave}
              className={[
                "group flex h-[200px] flex-col overflow-hidden rounded-[4px] border-2 border-dashed text-center transition-all duration-300",
                hasFiles ? "bg-white p-0" : "bg-gray-100 p-6",
                uploadHighlight
                  ? "scale-[1.02] border-green-500 shadow-md"
                  : "border-[var(--color-border-default)]",
                !uploadHighlight && upload.dragActive && "border-[var(--color-brand-logo)] bg-[var(--color-bg-hover)]",
                !hasFiles && !uploadHighlight &&
                  "cursor-pointer hover:border-[var(--color-border-strong)]",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {!hasFiles && (
                <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 min-w-[320px]">
                  <span
                    className="text-[var(--color-text-tertiary)]"
                    aria-hidden
                  >
                    <UploadIcon className="mx-auto h-14 w-14" />
                  </span>
                  <p className="text-sm font-bold text-[var(--color-text-secondary)]">
                    {t("upload.hintDrag")}
                  </p>
                  <p className="text-sm text-[var(--color-text-tertiary)]">
                    {t("upload.or")}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      upload.openPicker();
                    }}
                    className="mt-1 rounded-[4px] bg-[#4FA4E2] px-3 py-1 text-sm font-bold text-white hover:opacity-90"
                  >
                    {t("upload.browse")}
                  </button>
                </div>
              )}

              {singleFile && upload.selectedItem && (
                <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- blob URL */}
                  <img
                    src={upload.selectedItem.objectUrl}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}

              {/* 多图列表：占满固定高度，超出部分滚动 */}
              {multipleFiles && (
                <div className="min-h-0 flex-1 w-full overflow-y-auto bg-white text-left">
                  {upload.items.map((item) => {
                    const selected = upload.selectedId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          upload.setSelectedId(item.id);
                        }}
                        className={`flex w-full items-center gap-3 border-b border-[var(--color-border-subtle)] px-3 py-2 text-left last:border-b-0 ${
                          selected
                            ? "bg-[var(--color-upload-list-selected)]"
                            : "bg-white hover:bg-[var(--color-bg-hover)]"
                        }`}
                      >
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-white ring-1 ring-[var(--color-border-subtle)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.objectUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="min-w-0 flex-1 truncate text-sm text-[var(--color-text-primary)]">
                          {item.file.name}
                        </span>
                        {upload.parseErrorIds.has(item.id) && (
                          <span
                            className="shrink-0 text-[var(--color-error)]"
                            title={t("toast.parseError")}
                            aria-label={t("toast.parseError")}
                          >
                            <ErrorIcon className="h-5 w-5" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* File Information：不折叠；有图时默认展开展示，无图时置灰不可点 */}
            <div
              className={`rounded-[4px] border border-[var(--color-border-subtle)] ${
                hasFiles
                  ? "bg-[var(--color-bg-hover)]"
                  : "cursor-not-allowed bg-[var(--color-bg-active)] opacity-75"
              }`}
            >
              <div
                className={`flex w-full items-center gap-2 px-4 py-3 ${
                  hasFiles ? "text-[var(--color-text-primary)]" : "select-none text-[var(--color-text-disabled)]"
                }`}
                aria-disabled={!hasFiles}
              >
                <span
                  className={`shrink-0 ${hasFiles ? "text-[var(--color-block-device)]" : "text-[var(--color-text-disabled)]"}`}
                  aria-hidden
                >
                  <InfoIcon className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold">
                  {t("upload.fileInfo")}
                </span>
              </div>
              {hasFiles && (
                <div className="border-t border-border-subtle bg-white px-4 py-3">
                  {!upload.selectedItem ? (
                    <p className="text-sm text-[var(--color-text-tertiary)]">
                      {t("upload.fileInfoPlaceholder")}
                    </p>
                  ) : fileInfo ? (
                    <div className="space-y-2 text-sm">
                      {(
                        [
                          ["fileType", "fileType"],
                          ["fileSize", "fileSize"],
                          ["imageSize", "imageSize"],
                          ["bitsPerSample", "bitsPerSample"],
                          ["colorSpace", "colorSpace"],
                          ["mimeType", "mimeType"],
                          ["lastModified", "lastModified"],
                          ["caption", "caption"],
                          ["artist", "artist"],
                          ["copyright", "copyright"],
                        ] as const
                      ).map(([key, i18nKey]) => (
                        <div
                          key={key}
                          className="grid grid-cols-[minmax(6rem,1fr)_minmax(0,2fr)] items-start gap-x-6 gap-y-1"
                        >
                          <div className="shrink-0 font-semibold text-[var(--color-text-tertiary)]">
                            {t(`upload.${i18nKey}`)}
                          </div>
                          <div className="min-w-0 break-all font-normal text-[var(--color-text-primary)]">
                            {fileInfo[key] || ""}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : upload.selectedItem && !fileInfo ? (
                    <p className="text-sm text-[var(--color-text-tertiary)]">
                      …
                    </p>
                  ) : (
                    <p className="text-sm text-[var(--color-text-tertiary)]">
                      {t("upload.fileInfoPlaceholder")}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 右侧：地图仅左右边距，隐私分析单独一块 */}
          <div className="flex min-h-[300px] min-w-0 flex-col gap-4 rounded-[4px] border border-[var(--color-border-subtle)] bg-white shadow-block md:min-h-0">
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[4px] px-4">
              <GpsMapPanel
                gps={gps}
                fileKey={upload.selectedId ?? undefined}
              />
            </div>
            {hasFiles && (
              <div className="flex h-[280px] flex-col overflow-hidden rounded-[4px] border border-[var(--color-border-subtle)] bg-white px-4 pb-4">
                <div className="flex shrink-0 w-full items-center gap-2 bg-gray-100 px-4 py-3 text-[var(--color-text-primary)] dark:bg-gray-800">
                  <span className="shrink-0 text-[#4FA4E2]" aria-hidden>
                    <ShieldIcon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-bold">
                    {t("upload.privacyAnalysis")}
                  </span>
                  {upload.selectedItem && risk && (() => {
                    const count = risk.items.high.length + risk.items.medium.length + risk.items.low.length;
                    return count > 0 ? (
                      <span className="ml-auto text-xs font-normal text-[var(--color-text-secondary)]">
                        {t("upload.issuesFound").replace("{{count}}", String(count))}
                      </span>
                    ) : null;
                  })()}
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto border-t border-border-subtle bg-white px-4 py-3">
                  {!upload.selectedItem ? (
                    <p className="text-sm text-[var(--color-text-tertiary)]">
                      {t("upload.privacyAnalysisPlaceholder")}
                    </p>
                  ) : risk ? (
                    <PrivacyRiskSections
                      risk={risk}
                      blocks={blocks}
                      t={t}
                    />
                  ) : (
                    <p className="text-sm text-[var(--color-text-tertiary)]">
                      …
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
