"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useTranslations } from "@/contexts/LocaleContext";
import { useUploadContext } from "@/contexts/UploadContext";
import { blocksFromTags, type BlockRows } from "@/lib/parseExif";
import {
  buildExifExportContent,
  buildExifExportHex,
  downloadBlob,
  type ExportFormat,
} from "@/lib/exportExif";
import { getRiskFromBlocks } from "@/lib/exifRisk";
import { stripExifFromFile, isPresetSupportedForFormat, isStripSupportedForFormat, type CleanPresetId } from "@/lib/stripExif";
import {
  BLOCK_TAG_NAMES,
  canShowDeleteButton,
  canShowEditButton,
  type BlockId,
} from "@/constants/exifBlocks";
import { getFieldId, getDropdownOptions, getOptionLabelKey, isDropdownTag, parseDisplayToOptionValue } from "@/data/exifFieldOptions";
import { exportJpegWithEdits, mergeLatLngEdit, validateEditValue, type FieldId } from "@/lib/exifEdit";
import {
  BlockDimensionIcon,
  CancelIcon,
  ChevronDownIcon,
  CleanPresetIcon,
  DeleteIconSolid,
  DownloadFileIcon,
  EditIconSolid,
  ExportExifIcon,
  MetadataTitleIcon,
  SaveIcon,
} from "./MetadataIcons";
import Toast from "./Toast";

const BTN_BASE =
  "inline-flex w-fit items-center gap-2 rounded-[4px] px-3 py-2 text-xs font-bold uppercase hover:opacity-90";

const PRESETS: { id: CleanPresetId; i18nKey: string }[] = [
  { id: "full", i18nKey: "presetFull" },
  { id: "privacy", i18nKey: "presetPrivacy" },
  { id: "gps-only", i18nKey: "presetGpsOnly" },
  { id: "device-only", i18nKey: "presetDeviceOnly" },
];

/** 维度列最小宽度 */
const COLUMN_MIN_WIDTH = "340px";

const BLOCK_IDS: { id: BlockId; color: string }[] = [
  { id: "device", color: "var(--color-block-device)" },
  { id: "imageSettings", color: "var(--color-block-image-settings)" },
  { id: "location", color: "var(--color-block-location)" },
  { id: "dateTime", color: "var(--color-block-datetime)" },
  { id: "other", color: "var(--color-block-other)" },
  { id: "image", color: "var(--color-block-image)" },
  { id: "icc", color: "var(--color-block-icc)" },
];

const emptyBlocks = (): Record<BlockId, BlockRows> => {
  const o = {} as Record<BlockId, BlockRows>;
  BLOCK_IDS.forEach(({ id }) => {
    o[id] = [];
  });
  return o;
};

export default function MetadataStrip() {
  const t = useTranslations();
  const ctx = useUploadContext();
  const [blocks, setBlocks] = useState<Record<BlockId, BlockRows>>(emptyBlocks);
  const [loading, setLoading] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [cleanOpen, setCleanOpen] = useState(false);
  const [cleanedBlobByItemId, setCleanedBlobByItemId] = useState<Record<string, Blob>>({});
  const [cleanLoading, setCleanLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingFieldId, setEditingFieldId] = useState<FieldId | null>(null);
  const [draftEditValue, setDraftEditValue] = useState("");
  const [editedValuesByItemId, setEditedValuesByItemId] = useState<Record<string, Record<FieldId, string>>>({});
  const [deletedFieldIdsByItemId, setDeletedFieldIdsByItemId] = useState<Record<string, Set<FieldId>>>({});
  const exportRef = useRef<HTMLDivElement>(null);
  const cleanRef = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  const file = ctx?.selectedItem?.file ?? null;
  const selectedId = ctx?.selectedId ?? null;

  useEffect(() => {
    setEditingFieldId(null);
  }, [selectedId]);

  useEffect(() => {
    if (editingFieldId) editInputRef.current?.focus();
  }, [editingFieldId]);
  /** 尚未上传任何图片时展示整块空状态 */
  const noUpload = !ctx?.items?.length;

  /** 从上层单次解析结果同步 blocks；loading 由 context 的 exifLoading 提供 */
  useEffect(() => {
    if (!ctx?.items?.length) setCleanedBlobByItemId({});
  }, [ctx?.items?.length]);

  useEffect(() => {
    if (!ctx) return;
    if (ctx.exifLoading) {
      setLoading(true);
      return;
    }
    setLoading(false);
    if (ctx.exifResult?.ok) {
      setBlocks(blocksFromTags(ctx.exifResult.tags));
    } else {
      setBlocks(emptyBlocks());
    }
  }, [ctx]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) setExportOpen(false);
      if (cleanRef.current && !cleanRef.current.contains(e.target as Node)) setCleanOpen(false);
    };
    if (exportOpen || cleanOpen) {
      document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }
  }, [exportOpen, cleanOpen]);

  const noFile = !file;
  const hasCleanedBlob = selectedId ? !!cleanedBlobByItemId[selectedId] : false;
  /** 仅 JPEG 支持按预设剥离；PNG 等仅可点「删除全部 EXIF」 */
  const presetSupported = file ? isPresetSupportedForFormat(file.type || "") : false;
  /** HEIC/HEIF/TIFF/AVIF 等不支持剥离，按钮置灰（同时按扩展名排除，避免 type 不准） */
  const stripSupported =
    file &&
    isStripSupportedForFormat(file.type || "") &&
    !/\.(heic|heif|tiff?|avif)$/i.test(file.name || "");

  /** 无风险项时 STRIP METADATA 不可点击 */
  const risk = file && !ctx?.exifLoading ? getRiskFromBlocks(blocks) : null;
  const hasRiskItems =
    risk !== null &&
    risk.items.high.length + risk.items.medium.length + risk.items.low.length > 0;

  const handleExport = async (format: ExportFormat) => {
    if (!file) return;
    try {
      if (format === "hex") {
        const { blob, filename } = await buildExifExportHex(file);
        downloadBlob(blob, filename);
      } else {
        const { blob, filename } = buildExifExportContent(blocks, format, file.name);
        downloadBlob(blob, filename);
      }
    } catch {
      setToastMessage(t("toast.exportFailed"));
    } finally {
      setExportOpen(false);
    }
  };

  const handleClean = async (preset: CleanPresetId) => {
    if (!file || !selectedId) return;
    const idForThisClean = selectedId;
    setCleanLoading(true);
    setCleanOpen(false);
    try {
      const blob = await stripExifFromFile(file, preset);
      if (ctx?.selectedId === idForThisClean) {
        setCleanedBlobByItemId((prev) => ({ ...prev, [idForThisClean]: blob }));
      }
    } catch {
      setToastMessage(t("toast.cleanFailed"));
    } finally {
      setCleanLoading(false);
    }
  };

  const editedForCurrent = selectedId ? editedValuesByItemId[selectedId] ?? {} : {};
  const deletedForCurrent = selectedId ? deletedFieldIdsByItemId[selectedId] ?? new Set<FieldId>() : new Set<FieldId>();

  /** 取某 field 的原始值（与写入 editedValues 的格式一致：下拉为 option value，否则为字符串） */
  function getOriginalStoredValueForFieldId(fieldId: FieldId): string {
    const [blockId, tag] = fieldId.split(".", 2);
    const rows = blocks[blockId as BlockId] ?? [];
    const row = rows.find((r) => r.tag === tag);
    const value = String(row?.value ?? "");
    const useDropdown = isDropdownTag(tag) && getDropdownOptions(tag).length > 0;
    return useDropdown ? parseDisplayToOptionValue(tag, value, t) : value;
  }

  const hasEdits =
    deletedForCurrent.size > 0 ||
    Object.entries(editedForCurrent).some(([fid, val]) => {
      const orig = getOriginalStoredValueForFieldId(fid).trim();
      const [, tag] = fid.split(".", 2);
      if (tag === "GPSLatitude" || tag === "GPSLongitude") {
        const o = parseFloat(orig);
        const v = parseFloat(val);
        if (Number.isFinite(o) && Number.isFinite(v)) return o.toFixed(6) !== v.toFixed(6);
      }
      return orig !== val.trim();
    });

  const handleDeleteField = (fieldId: FieldId) => {
    if (!selectedId) return;
    if (editingFieldId === fieldId) setEditingFieldId(null);
    setDeletedFieldIdsByItemId((prev) => {
      const cur = prev[selectedId] ?? new Set<FieldId>();
      const nextSet = new Set(cur);
      if (nextSet.has(fieldId)) nextSet.delete(fieldId);
      else nextSet.add(fieldId);
      const next = { ...prev };
      next[selectedId] = nextSet;
      return next;
    });
  };

  /** 删除/恢复该维度下所有可删字段（点击切换） */
  const handleDeleteBlock = (blockId: BlockId) => {
    if (!selectedId) return;
    const tags = BLOCK_TAG_NAMES[blockId] ?? [];
    const fieldIds = tags.filter((tag) => canShowDeleteButton(tag, blockId)).map((tag) => getFieldId(blockId, tag));
    if (fieldIds.length === 0) return;
    const allDeleted = fieldIds.every((fid) => deletedForCurrent.has(fid));
    setEditingFieldId(null);
    setDeletedFieldIdsByItemId((prev) => {
      const cur = prev[selectedId] ?? new Set<FieldId>();
      const nextSet = new Set(cur);
      if (allDeleted) fieldIds.forEach((fid) => nextSet.delete(fid));
      else fieldIds.forEach((fid) => nextSet.add(fid));
      const next = { ...prev };
      next[selectedId] = nextSet;
      if (nextSet.size === 0) delete next[selectedId];
      return next;
    });
  };

  /** 经纬度统一展示为前 6 位小数（截断不四舍五入，避免尾数导致最后一位被进位） */
  function formatLatLngDisplay(val: string): string {
    const trimmed = val.trim().replace(/,/g, ".");
    if (!trimmed) return val;
    const n = parseFloat(trimmed);
    if (!Number.isFinite(n)) return val;
    const isNeg = trimmed.startsWith("-");
    const s = isNeg ? trimmed.slice(1) : trimmed;
    const dot = s.indexOf(".");
    const intPart = dot >= 0 ? s.slice(0, dot) : s;
    const decPart = (dot >= 0 ? s.slice(dot + 1) : "").slice(0, 6).padEnd(6, "0");
    return (isNeg ? "-" : "") + (intPart || "0") + "." + decPart;
  }

  function getDisplayValue(blockId: BlockId, tag: string, parsedValue: string): string {
    const fieldId = getFieldId(blockId, tag);
    const edited = selectedId ? editedValuesByItemId[selectedId]?.[fieldId] : undefined;
    if (isDropdownTag(tag)) {
      const valueToShow = edited ?? parseDisplayToOptionValue(tag, parsedValue, t);
      const labelKey = getOptionLabelKey(tag, valueToShow);
      return labelKey ? t(labelKey) : (edited ?? parsedValue);
    }
    const raw = edited ?? parsedValue;
    if (tag === "GPSLatitude" || tag === "GPSLongitude") return formatLatLngDisplay(raw);
    return raw;
  }

  const handleStartEdit = (fieldId: FieldId, tag: string, currentDisplayValue: string, useDropdown: boolean) => {
    setEditingFieldId(fieldId);
    const edited = selectedId ? editedValuesByItemId[selectedId]?.[fieldId] : undefined;
    // 经纬度进入编辑时始终显示前 6 位小数，不把已存的全精度值填进输入框
    const initial =
      tag === "GPSLatitude" || tag === "GPSLongitude"
        ? currentDisplayValue
        : useDropdown
          ? (edited ?? parseDisplayToOptionValue(tag, currentDisplayValue, t))
          : (edited ?? currentDisplayValue);
    setDraftEditValue(initial);
  };

  const handleSaveEdit = (
    fieldId: FieldId,
    originalStoredValue: string,
    originalFullForMerge?: string | null,
    originalFromBlocks?: string
  ) => {
    const err = validateEditValue(fieldId, draftEditValue);
    if (err) {
      setToastMessage(t(err));
      return;
    }
    if (!selectedId) return;
    const trimmed = draftEditValue.trim();
    // 与当前展示值相同 = 未修改，只关闭编辑，不删已保存的编辑
    if (trimmed === originalStoredValue.trim()) {
      setEditingFieldId(null);
      return;
    }
    // 与解析的原始值相同 = 用户改回原值，移除编辑
    if (originalFromBlocks !== undefined && trimmed === originalFromBlocks.trim()) {
      setEditedValuesByItemId((prev) => {
        const cur = prev[selectedId] ?? {};
        const nextCur = { ...cur };
        delete nextCur[fieldId];
        const next = { ...prev };
        next[selectedId] = Object.keys(nextCur).length > 0 ? nextCur : {};
        if (Object.keys(next[selectedId]).length === 0) delete next[selectedId];
        return next;
      });
      setEditingFieldId(null);
      return;
    }
    const [, tag] = fieldId.split(".", 2);
    const newVal =
      (tag === "GPSLatitude" || tag === "GPSLongitude") && originalFullForMerge
        ? mergeLatLngEdit(trimmed, originalFullForMerge)
        : trimmed;
    setEditedValuesByItemId((prev) => ({
      ...prev,
      [selectedId]: { ...(prev[selectedId] ?? {}), [fieldId]: newVal },
    }));
    setEditingFieldId(null);
  };

  const handleCancelEdit = () => {
    setEditingFieldId(null);
  };

  const handleDownloadWithEdits = async () => {
    if (!file || !selectedId) return;
    try {
      const blob = await exportJpegWithEdits(file, editedForCurrent, deletedForCurrent);
      const baseName = file.name.replace(/\.[^.]+$/, "") || "image";
      const d = new Date();
      const ts = (
        `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}` +
        `${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}${String(d.getSeconds()).padStart(2, "0")}`
      ).slice(0, 12);
      downloadBlob(blob, `${baseName}_edited_${ts}.jpg`);
    } catch {
      setToastMessage(t("toast.exportFailed"));
    }
  };

  const handleDownloadCleaned = () => {
    if (!selectedId || !cleanedBlobByItemId[selectedId]) return;
    const blob = cleanedBlobByItemId[selectedId];
    const baseName = file?.name?.replace(/\.[^.]+$/, "") ?? "image";
    const ext =
      blob.type === "image/png" ? "png" : blob.type === "image/webp" ? "webp" : "jpg";
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const shortTs = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    try {
      downloadBlob(blob, `${baseName}_cleaned_${shortTs}.${ext}`);
    } catch {
      setToastMessage(t("toast.downloadFailed"));
    }
  };

  return (
    <section id="metadata" className="scroll-mt-24 bg-elevated py-4">
      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
      <div className="mx-auto w-full max-w-content">
        <div className="overflow-hidden rounded-[4px] bg-block">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text-primary)]">
                <MetadataTitleIcon className="text-[#4FA4E2]" />
                {t("metadata.title")}
              </h2>
              <span className="text-sm italic text-[var(--color-text-tertiary)]">
                {t("metadata.inputFormatHint")}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* 导出 EXIF：下拉 CSV / JSON / TXT；无图时禁用 */}
              <div className="relative" ref={exportRef}>
                <button
                  type="button"
                  disabled={noFile}
                  onClick={() => setExportOpen((o) => !o)}
                  className={`${BTN_BASE} bg-[var(--color-brand-logo)] text-white disabled:pointer-events-none disabled:opacity-50`}
                  aria-expanded={exportOpen}
                  aria-haspopup="true"
                >
                  <ExportExifIcon />
                  <span>{t("metadata.exportExif")}</span>
                  <ChevronDownIcon />
                </button>
                {exportOpen && (
                  <div className="absolute right-0 top-full z-20 mt-1 min-w-[8rem] overflow-hidden rounded-[4px] bg-[var(--color-brand-logo)] py-0 shadow-lg">
                    {(["csv", "json", "txt", "hex"] as const).map((fmt, i) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => handleExport(fmt)}
                        className={`w-full px-3 py-2 text-left text-sm font-bold text-white hover:bg-white/20 ${i > 0 ? "border-t border-white/50" : ""}`}
                      >
                        {t(`metadata.export${fmt.charAt(0).toUpperCase() + fmt.slice(1)}`)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* 清理预设：下拉 4 项；无风险项时不可点击；禁用时 title 放在外层 span 上才能悬停显示（disabled 元素不触发 title） */}
              <div className="relative" ref={cleanRef}>
                <span
                  className="inline-block"
                  title={
                    noFile
                      ? undefined
                      : !stripSupported
                        ? t("metadata.stripUnsupportedFormat")
                        : stripSupported && !hasRiskItems
                          ? t("metadata.stripNoRiskItems")
                          : undefined
                  }
                >
                  <button
                    type="button"
                    disabled={noFile || cleanLoading || !stripSupported || !hasRiskItems}
                    onClick={() => setCleanOpen((o) => !o)}
                    className={`${BTN_BASE} bg-amber-500 text-white disabled:pointer-events-none disabled:opacity-50`}
                    aria-expanded={cleanOpen}
                    aria-haspopup="true"
                  >
                    <CleanPresetIcon />
                    <span>{t("metadata.clean")}</span>
                    <ChevronDownIcon />
                  </button>
                </span>
                {cleanOpen && (
                  <div className="absolute right-0 top-full z-20 mt-1 min-w-[12rem] overflow-hidden rounded-[4px] bg-amber-500 py-0 shadow-lg">
                    {PRESETS.map((p, i) => {
                      const onlyFullAllowed = !presetSupported && p.id !== "full";
                      return (
                        <button
                          key={p.id}
                          type="button"
                          disabled={onlyFullAllowed}
                          onClick={() => !onlyFullAllowed && handleClean(p.id)}
                          className={`w-full px-3 py-2 text-left text-sm font-bold text-white hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60 ${i > 0 ? "border-t border-white/50" : ""}`}
                        >
                          {t(`metadata.${p.i18nKey}`)}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              {/* 下载清理后：仅清理完成后可点 */}
              <button
                type="button"
                disabled={!hasCleanedBlob}
                onClick={handleDownloadCleaned}
                className={`${BTN_BASE} ${hasCleanedBlob ? "bg-green-600 text-white" : "cursor-not-allowed bg-[var(--color-bg-active)] text-[var(--color-text-disabled)]"}`}
                aria-label={t("metadata.downloadCleaned")}
              >
                <DownloadFileIcon />
                <span>{t("metadata.downloadCleaned")}</span>
              </button>
              {/* 下载带编辑的 JPEG：有编辑且当前为 JPEG 时可点 */}
              {hasEdits && (
                <button
                  type="button"
                  onClick={handleDownloadWithEdits}
                  className={`${BTN_BASE} bg-[var(--color-brand-logo)] text-white`}
                  aria-label={t("metadata.downloadWithEdits")}
                >
                  <DownloadFileIcon />
                  <span>{t("metadata.downloadWithEdits")}</span>
                </button>
              )}
            </div>
          </div>
          <div>
        {/* 无上传：方案 C — 仅维度标题横排可横向滑动；下方矮灰条公用提示，不滑动 */}
        {noUpload && (
          <div
            className="flex flex-col overflow-hidden rounded-[4px] border border-[var(--color-border-subtle)] border-t-0 bg-[var(--color-bg-block)] shadow-block"
            role="status"
            aria-live="polite"
          >
            {/* 维度条：与已上传态相同 gap-4；每维一块圆角边框仅含标题行，无下面空白框 */}
            <div className="overflow-x-auto overflow-y-hidden pb-2">
              <div className="flex w-max flex-nowrap gap-4">
                {BLOCK_IDS.map((block) => (
                  <div
                    key={block.id}
                    className="flex shrink-0 flex-col overflow-hidden rounded-md border border-border bg-block shadow-block"
                    style={{ minWidth: COLUMN_MIN_WIDTH }}
                  >
                    <div
                      className="flex items-center gap-2 px-3 py-2"
                      style={{
                        borderLeftWidth: "3px",
                        borderLeftColor: block.color,
                        borderLeftStyle: "solid",
                      }}
                    >
                      <BlockDimensionIcon
                        blockId={block.id}
                        color={block.color}
                      />
                      <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                        {t(`metadata.${block.id}`)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 公用提示：标题 + 一段描述（不折行），白底 */}
            <div className="shrink-0 bg-[var(--color-bg-block)] px-4 py-4 text-center text-sm text-[var(--color-text-secondary)]">
              <p className="mb-1 text-base font-bold text-[var(--color-text-primary)]">
                {t("metadata.emptyStateTitle")}
              </p>
              <p>
                {t("metadata.emptyStateDescLine1")} {t("metadata.emptyStateDescLine2")}
              </p>
            </div>
          </div>
        )}
        {!noUpload && (
        <>
        <div className="flex h-[330px] gap-4 overflow-x-auto overflow-y-hidden rounded-[4px] bg-block pb-2">
          {BLOCK_IDS.map((block) => {
            const rows = blocks[block.id] ?? [];
            const isIcc = block.id === "icc";
            const deletableTags = (BLOCK_TAG_NAMES[block.id] ?? []).filter((tag) =>
              canShowDeleteButton(tag, block.id)
            );
            const blockFieldIds = deletableTags.map((tag) => getFieldId(block.id, tag));
            const isBlockFullyDeleted =
              blockFieldIds.length > 0 && blockFieldIds.every((fid) => deletedForCurrent.has(fid));
            const showBlockDelete =
              !noFile && deletableTags.length > 0 && !!file && (file.type === "image/jpeg" || file?.name?.toLowerCase().endsWith(".jpg") || file?.name?.toLowerCase().endsWith(".jpeg"));

            return (
              <div
                key={block.id}
                className="flex flex-1 flex-col rounded-md border border-border bg-block shadow-block"
                style={{ minWidth: COLUMN_MIN_WIDTH }}
              >
                <div
                  className="flex items-center justify-between gap-2 border-b border-border-subtle px-3 py-2"
                  style={{
                    borderLeftWidth: "3px",
                    borderLeftColor: block.color,
                  }}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <BlockDimensionIcon
                      blockId={block.id}
                      color={block.color}
                    />
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {t(`metadata.${block.id}`)}
                    </span>
                  </div>
                  {showBlockDelete && (
                    <button
                      type="button"
                      onClick={() => handleDeleteBlock(block.id)}
                      title={isBlockFullyDeleted ? t("metadata.restoreBlock") : t("metadata.deleteBlock")}
                      className="shrink-0 p-1 text-[var(--color-error)] hover:opacity-80"
                      aria-label={isBlockFullyDeleted ? t("metadata.restoreBlock") : t("metadata.deleteBlock")}
                    >
                      <DeleteIconSolid />
                    </button>
                  )}
                </div>
                <div className="flex-1 overflow-y-auto pl-3 pt-3 pb-3 pr-3 text-sm">
                  {noFile && (
                    <p className="text-[var(--color-text-tertiary)]">
                      {t("metadata.selectFileHint")}
                    </p>
                  )}
                  {!noFile && loading && (
                    <p className="text-[var(--color-text-secondary)]">
                      {t("metadata.loading")}
                    </p>
                  )}
                  {!noFile && !loading && isIcc && rows.length === 0 && (
                    <p className="text-[var(--color-text-tertiary)]">
                      {t("metadata.iccEmpty")}
                    </p>
                  )}
                  {!noFile &&
                    !loading &&
                    rows.map(({ tag, value }) => {
                      const fieldId = getFieldId(block.id, tag);
                      const isEdited = fieldId in editedForCurrent;
                      const isDeleted = deletedForCurrent.has(fieldId);
                      const displayValue = getDisplayValue(block.id, tag, value || "");
                      const isEditing = editingFieldId === fieldId;
                      const showEdit = canShowEditButton(tag, block.id);
                      const showDelete = canShowDeleteButton(tag, block.id);
                      const isJpeg =
                        file?.type === "image/jpeg" ||
                        file?.name?.toLowerCase().endsWith(".jpg") ||
                        file?.name?.toLowerCase().endsWith(".jpeg");
                      const editDisabled = !isJpeg;
                      // 无值时删除置灰；已标记删除时显示「恢复」可点
                      const hasValue = (displayValue || "").trim() !== "";
                      const deleteDisabled = !isJpeg || (!isDeleted && !hasValue);
                      const dropdownOptions = getDropdownOptions(tag);
                      const useDropdown = isDropdownTag(tag) && dropdownOptions.length > 0;
                      const rawValue = String(value ?? "");
                      // 「未修改」比较基准：经纬度用展示值；下拉用当前展示对应的 option value（有编辑用编辑值，否则用文件值），这样选 Undefined 等才会生效
                      const currentOptionValue = useDropdown
                        ? (selectedId ? editedValuesByItemId[selectedId]?.[fieldId] : undefined) ?? parseDisplayToOptionValue(tag, rawValue, t)
                        : undefined;
                      // 「未修改」比较基准：与当前展示一致。非下拉/非 GPS 用 displayValue，否则用户清空后保存会误判为「未改」而忽存
                      const originalStoredValue =
                        (tag === "GPSLatitude" || tag === "GPSLongitude")
                          ? displayValue
                          : useDropdown
                            ? (currentOptionValue ?? parseDisplayToOptionValue(tag, rawValue, t))
                            : displayValue;
                      // 解析出的原始值，用于判断「用户改回原值」时移除编辑
                      const originalFromBlocks =
                        (tag === "GPSLatitude" || tag === "GPSLongitude")
                          ? formatLatLngDisplay(rawValue)
                          : useDropdown
                            ? parseDisplayToOptionValue(tag, rawValue, t)
                            : rawValue;
                      // 拼接尾数时：有已保存值则用已保存（全精度），否则用解析时的原始值；这样再次编辑基于上次保存
                      const originalFullForMerge =
                        (tag === "GPSLatitude" || tag === "GPSLongitude") && selectedId
                          ? (editedValuesByItemId[selectedId]?.[fieldId] ?? (tag === "GPSLatitude" ? ctx?.originalGpsFull?.lat : ctx?.originalGpsFull?.lng)) ?? undefined
                          : undefined;

                      return (
                        <div
                          key={tag}
                          className={`flex items-start gap-2 border-b border-[var(--color-border-subtle)] py-1.5 last:border-b-0 ${isEdited ? "bg-sky-50 dark:bg-sky-950/30" : ""} ${isDeleted ? "text-[var(--color-text-tertiary)] line-through" : ""}`}
                        >
                          <span className="w-[38%] shrink-0 font-semibold text-[var(--color-text-tertiary)]">
                            {tag}
                          </span>
                          <div className="flex min-w-0 flex-1 items-start justify-end gap-2">
                            {isEditing ? (
                              <>
                                {useDropdown ? (
                                  <select
                                    ref={editInputRef as RefObject<HTMLSelectElement>}
                                    value={draftEditValue}
                                    onChange={(e) => setDraftEditValue(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") handleSaveEdit(fieldId, originalStoredValue, originalFullForMerge, originalFromBlocks);
                                      if (e.key === "Escape") handleCancelEdit();
                                    }}
                                    className="min-w-[220px] flex-1 rounded bg-white px-2 py-0 text-right text-sm leading-[1.25rem] text-[var(--color-text-primary)] [box-shadow:inset_0_0_0_1px_var(--color-border-default)]"
                                    aria-label={tag}
                                  >
                                    {dropdownOptions.map((opt) => (
                                      <option key={opt.value} value={opt.value}>
                                        {t(opt.labelKey)}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <input
                                    ref={editInputRef as RefObject<HTMLInputElement>}
                                    type="text"
                                    value={draftEditValue}
                                    onChange={(e) => setDraftEditValue(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") handleSaveEdit(fieldId, originalStoredValue, originalFullForMerge, originalFromBlocks);
                                      if (e.key === "Escape") handleCancelEdit();
                                    }}
                                    className="min-w-[220px] flex-1 rounded bg-white px-2 py-0 text-right text-sm leading-[1.25rem] text-[var(--color-text-primary)] [box-shadow:inset_0_0_0_1px_var(--color-border-default)]"
                                    aria-label={tag}
                                  />
                                )}
                                <div className="flex shrink-0 items-center gap-0.5">
                                  <button
                                    type="button"
                                    onClick={() => handleSaveEdit(fieldId, originalStoredValue, originalFullForMerge, originalFromBlocks)}
                                    className="p-1 text-green-600 hover:opacity-80"
                                    aria-label={t("metadata.save")}
                                    title={t("metadata.save")}
                                  >
                                    <SaveIcon />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="p-1 text-[var(--color-text-secondary)] hover:opacity-80"
                                    aria-label={t("metadata.cancel")}
                                    title={t("metadata.cancel")}
                                  >
                                    <CancelIcon />
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <span className={`min-w-0 flex-1 break-all text-right font-normal leading-[1.25rem] ${isDeleted ? "text-[var(--color-text-tertiary)]" : "text-[var(--color-text-primary)]"}`}>
                                  {displayValue || "\u00A0"}
                                </span>
                                {(showEdit || showDelete) && (
                                  <div className="flex shrink-0 items-center gap-0.5">
                                    {showEdit && (
                                      <button
                                        type="button"
                                        disabled={editDisabled}
                                        title={
                                          editDisabled
                                            ? t("metadata.editDisabledNonJpeg")
                                            : t("metadata.edit")
                                        }
                                        className="p-1 text-[var(--color-brand-logo)] hover:opacity-80 disabled:pointer-events-none disabled:opacity-40"
                                        aria-label={t("metadata.edit")}
                                        onClick={() => handleStartEdit(fieldId, tag, displayValue, useDropdown)}
                                      >
                                        <EditIconSolid />
                                      </button>
                                    )}
                                    {showDelete && (
                                      <button
                                        type="button"
                                        disabled={deleteDisabled}
                                        title={
                                          deleteDisabled
                                            ? t("metadata.deleteDisabledNonJpeg")
                                            : isDeleted
                                              ? t("metadata.restore")
                                              : t("metadata.delete")
                                        }
                                        className="p-1 text-[var(--color-error)] hover:opacity-80 disabled:pointer-events-none disabled:opacity-40"
                                        aria-label={isDeleted ? t("metadata.restore") : t("metadata.delete")}
                                        onClick={() => handleDeleteField(fieldId)}
                                      >
                                        <DeleteIconSolid />
                                      </button>
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
        {ctx?.items && ctx.items.length > 1 && (() => {
          const currentIdx = ctx.items.findIndex((i) => i.id === ctx.selectedId);
          const idx = currentIdx < 0 ? 0 : currentIdx;
          const canPrev = idx > 0;
          const canNext = idx < ctx.items.length - 1;
          return (
            <div className="flex items-center justify-between">
              <button
                type="button"
                disabled={!canPrev}
                onClick={() => canPrev && ctx.setSelectedId(ctx.items[idx - 1].id)}
                className="inline-flex w-fit items-center gap-1 rounded-[4px] bg-[var(--color-bg-active)] py-1 pl-[0.2rem] pr-[0.2rem] text-xs font-bold uppercase text-[var(--color-text-primary)] hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
                aria-label={t("metadata.prev")}
              >
                <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                {t("metadata.prev")}
              </button>
              <button
                type="button"
                disabled={!canNext}
                onClick={() => canNext && ctx.setSelectedId(ctx.items[idx + 1].id)}
                className="inline-flex w-fit items-center gap-1 rounded-[4px] bg-[var(--color-bg-active)] py-1 pl-[0.2rem] pr-[0.2rem] text-xs font-bold uppercase text-[var(--color-text-primary)] hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
                aria-label={t("metadata.next")}
              >
                {t("metadata.next")}
                <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          );
        })()}
        </>
        )}
          </div>
        </div>
      </div>
    </section>
  );
}
