/**
 * 按预设剥离 EXIF：仅剥离用户选择预设指定的维度，其他维度不动。
 * JPEG 支持四种预设（full / privacy / gps-only / device-only）；非 JPEG 仅支持「删除全部 EXIF」。
 * 导出格式与原图一致：JPEG→JPEG，PNG→PNG，WebP→WebP。
 */

import { BLOCK_TAG_NAMES, type BlockId } from "@/constants/exifBlocks";
import {
  type CleanPresetId,
  PRESET_TO_BLOCKS,
  TAG_TO_IFD_AND_ID,
  isPresetSupportedForFormat,
  isStripSupportedForFormat,
} from "./stripExifPresets";

// piexifjs 为 CommonJS，无 default export
const piexif = require("piexifjs") as {
  load: (data: string) => Record<string, Record<number, unknown>>;
  dump: (exifDict: Record<string, Record<number, unknown>>) => string;
  remove: (jpeg: string) => string;
  insert: (exif: string, jpeg: string) => string;
};

export type { CleanPresetId } from "./stripExifPresets";

function arrayBufferToBinaryString(ab: ArrayBuffer): string {
  const u8 = new Uint8Array(ab);
  const chunk = 8192;
  let s = "";
  for (let i = 0; i < u8.length; i += chunk) {
    s += String.fromCharCode.apply(
      null,
      Array.from(u8.subarray(i, i + chunk))
    );
  }
  return s;
}

function binaryStringToUint8Array(s: string): Uint8Array {
  const u8 = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) u8[i] = s.charCodeAt(i);
  return u8;
}

function binaryStringToBlob(s: string, type: string): Blob {
  const u8 = binaryStringToUint8Array(s);
  const ab = new ArrayBuffer(u8.length);
  new Uint8Array(ab).set(u8);
  return new Blob([ab], { type });
}

/** 收集某预设要删除的 tag 对应的 (ifd, tagId) 列表 */
function getTagIdsToRemove(preset: CleanPresetId): { ifd: "0th" | "Exif" | "GPS"; tagId: number }[] {
  const blocks = PRESET_TO_BLOCKS[preset];
  if (blocks === "all") return []; // full 时整段 EXIF 删除，不按 tag 删

  const out: { ifd: "0th" | "Exif" | "GPS"; tagId: number }[] = [];
  for (const blockId of blocks) {
    const names = BLOCK_TAG_NAMES[blockId as BlockId];
    if (!names) continue;
    for (const tagName of names) {
      const entry = TAG_TO_IFD_AND_ID[tagName];
      if (entry) out.push(entry);
    }
  }
  return out;
}

/** 从 exif_dict 中删除指定的 tagId（按 ifd），其他不动 */
function deleteTagsFromExifDict(
  exifDict: Record<string, Record<number, unknown>>,
  toRemove: { ifd: "0th" | "Exif" | "GPS"; tagId: number }[]
): void {
  const byIfd: Record<"0th" | "Exif" | "GPS", Set<number>> = {
    "0th": new Set(),
    Exif: new Set(),
    GPS: new Set(),
  };
  for (const { ifd, tagId } of toRemove) {
    byIfd[ifd].add(tagId);
  }
  for (const ifd of ["0th", "Exif", "GPS"] as const) {
    const set = byIfd[ifd];
    if (set.size === 0) continue;
    const d = exifDict[ifd];
    if (!d) continue;
    for (const tagId of set) {
      delete d[tagId];
    }
    if (Object.keys(d).length === 0) {
      delete exifDict[ifd];
    }
  }
  if (exifDict.GPS && Object.keys(exifDict.GPS).length === 0) delete exifDict.GPS;
  if (exifDict.Exif && Object.keys(exifDict.Exif).length === 0) delete exifDict.Exif;
}

/** 根据文件 type/name 决定输出 MIME 与扩展名 */
function getOutputFormat(file: File): { mime: string; ext: string } {
  const t = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  if (t === "image/png" || name.endsWith(".png")) return { mime: "image/png", ext: "png" };
  if (t === "image/webp" || name.endsWith(".webp")) return { mime: "image/webp", ext: "webp" };
  return { mime: "image/jpeg", ext: "jpg" };
}

/**
 * 按预设剥离 EXIF，返回新 Blob。
 * - JPEG：支持四种预设，仅剥离预设指定维度；full 则删除整段 EXIF。输出 JPEG。
 * - 非 JPEG（如 PNG）：仅支持「删除全部 EXIF」预设（其他预设由 UI 禁用）；Canvas 重绘后按原格式输出（PNG→PNG，WebP→WebP）。
 */
export async function stripExifFromFile(file: File, preset: CleanPresetId): Promise<Blob> {
  const mime = (file.type || "").toLowerCase();
  const isJpeg =
    mime === "image/jpeg" ||
    mime === "image/jpg" ||
    (file.name || "").toLowerCase().match(/\.jpe?g$/);

  if (isJpeg) {
    return stripJpegExif(file, preset);
  }

  // 非 JPEG：仅支持「删除全部 EXIF」（其他预设由 UI 禁用）；Canvas 重绘，按原格式输出
  return stripNonJpegFull(file);
}

async function stripJpegExif(file: File, preset: CleanPresetId): Promise<Blob> {
  const buffer = await file.arrayBuffer();
  let jpegStr = arrayBufferToBinaryString(buffer);

  if (jpegStr.slice(0, 2) !== "\xff\xd8") {
    return stripNonJpegFull(file);
  }

  if (preset === "full") {
    const outStr = piexif.remove(jpegStr);
    return binaryStringToBlob(outStr, "image/jpeg");
  }

  let exifDict: Record<string, Record<number, unknown>>;
  try {
    exifDict = piexif.load(jpegStr);
  } catch {
    return binaryStringToBlob(jpegStr, "image/jpeg");
  }

  const toRemove = getTagIdsToRemove(preset);
  deleteTagsFromExifDict(exifDict, toRemove);

  let newExif: string;
  try {
    newExif = piexif.dump(exifDict);
  } catch {
    return binaryStringToBlob(jpegStr, "image/jpeg");
  }

  const jpegNoExif = piexif.remove(jpegStr);
  const newJpegStr = piexif.insert(newExif, jpegNoExif);
  return binaryStringToBlob(newJpegStr, "image/jpeg");
}

/** 非 JPEG 或无法按预设处理时：Canvas 全量剥离，输出格式与原图一致（PNG→PNG，WebP→WebP） */
function stripNonJpegFull(file: File): Promise<Blob> {
  const { mime } = getOutputFormat(file);
  const canvasMime = mime === "image/jpeg" ? "image/jpeg" : mime;
  const quality = canvasMime === "image/jpeg" ? 0.92 : undefined;

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas 2d not available"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("toBlob failed"));
        },
        canvasMime,
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image load failed"));
    };
    img.src = url;
  });
}

/** 供 UI 判断：当前文件格式是否支持多预设（仅 JPEG 支持）、是否支持剥离 */
export { isPresetSupportedForFormat, isStripSupportedForFormat };
