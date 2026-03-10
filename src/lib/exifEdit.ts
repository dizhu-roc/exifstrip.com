/**
 * EXIF 编辑写回：fieldId 映射、UI 值转 piexif 值、应用编辑到 dict、导出带编辑的 JPEG。
 * 对齐 docs/EXIF维度解析与字段说明.md 第七、八节。
 */
import { BLOCK_TAG_NAMES, type BlockId } from "@/constants/exifBlocks";
import { TAG_TO_IFD_AND_ID } from "./stripExifPresets";
import { isDropdownTag } from "@/data/exifFieldOptions";

export type FieldId = string;

type Ifd = "0th" | "Exif" | "GPS";

export interface FieldPiexif {
  ifd: Ifd;
  tagId: number;
}

/** fieldId (blockId.tag) → piexif ifd + tagId，仅包含 BLOCK_TAG_NAMES 中且 TAG_TO_IFD_AND_ID 存在的 tag */
const FIELD_ID_TO_PIEXIF: Record<string, FieldPiexif> = {};
(function buildFieldIdMap() {
  const blockIds = Object.keys(BLOCK_TAG_NAMES) as BlockId[];
  for (const blockId of blockIds) {
    const tags = BLOCK_TAG_NAMES[blockId];
    if (!tags) continue;
    for (const tag of tags) {
      const entry = TAG_TO_IFD_AND_ID[tag];
      if (entry) FIELD_ID_TO_PIEXIF[`${blockId}.${tag}`] = { ifd: entry.ifd, tagId: entry.tagId };
    }
  }
})();

export function getFieldPiexif(fieldId: FieldId): FieldPiexif | undefined {
  return FIELD_ID_TO_PIEXIF[fieldId];
}

/** 仅支持可打印 ASCII（英文、数字及常用符号 \x20-\x7E），用于校验 */
function isPrintableAsciiOnly(s: string): boolean {
  return !/[^\x20-\x7E]/.test(s);
}

/** 需要仅英文/数字（可打印 ASCII）的 tag，与 valueToPiexif 中 toAsciiOnly 使用处一致 */
const ASCII_ONLY_TAGS = new Set([
  "Make", "Model", "Software", "ImageDescription", "Artist", "Copyright", "UserComment",
  "BodySerialNumber", "CameraSerialNumber", "LensMake", "LensModel",
  "DateTime", "DateTimeOriginal", "DateTimeDigitized", "GPSDateStamp",
]);

/** 校验编辑值，返回错误文案（可为 i18n key）或 null 表示通过 */
export function validateEditValue(fieldId: FieldId, uiValue: string): string | null {
  const trimmed = uiValue.trim();
  const [, tag] = fieldId.includes(".") ? fieldId.split(".", 2) : ["", fieldId];
  if (isDropdownTag(tag)) return null;
  if (ASCII_ONLY_TAGS.has(tag) && trimmed !== "" && !isPrintableAsciiOnly(trimmed)) {
    return "metadata.validationAsciiOnly";
  }
  switch (tag) {
    case "ISOSpeedRatings": {
      const n = parseInt(trimmed, 10);
      if (!Number.isFinite(n) || n < 0 || !Number.isInteger(parseFloat(trimmed))) return "metadata.validationInteger";
      return null;
    }
    case "ExposureTime":
    case "FNumber":
    case "FocalLength":
    case "ExposureBiasValue":
    case "XResolution":
    case "YResolution":
    case "GPSAltitude":
      if (parseRationalFromUi(trimmed) === null && trimmed !== "") return "metadata.validationNumber";
      return null;
    case "GPSLatitude":
    case "GPSLongitude": {
      const n = parseFloat(trimmed.replace(/,/g, "."));
      if (trimmed !== "" && !Number.isFinite(n)) return "metadata.validationNumber";
      if (tag === "GPSLatitude" && Number.isFinite(n) && (n < -90 || n > 90)) return "metadata.validationLatitude";
      if (tag === "GPSLongitude" && Number.isFinite(n) && (n < -180 || n > 180)) return "metadata.validationLongitude";
      return null;
    }
    default:
      return null;
  }
}

/**
 * 经纬度编辑合并：用户只改前 6 位小数，保留原始值第 6 位小数之后的尾数。
 * 例如 originalFull="3.12222222223444"，userInput="3.122223" → "3.12222322223444"。
 */
export function mergeLatLngEdit(userInput: string, originalFull: string): string {
  const trimmed = userInput.trim().replace(/,/g, ".");
  const n = parseFloat(trimmed);
  if (!Number.isFinite(n)) return trimmed || originalFull;
  const prefix = n.toFixed(6);
  const dotIndex = originalFull.indexOf(".");
  if (dotIndex < 0) return prefix;
  const afterDot = originalFull.slice(dotIndex + 1);
  if (afterDot.length <= 6) return prefix;
  const tail = afterDot.slice(6);
  return prefix + tail;
}

/** 仅可打印 ASCII \x20-\x7E */
function toAsciiOnly(s: string): string {
  return s.replace(/[^\x20-\x7E]/g, "");
}

/** 解析 "a/b" 或小数 → [num, den] */
function parseRationalFromUi(s: string): [number, number] | null {
  const t = s.trim();
  if (!t) return null;
  const slash = t.indexOf("/");
  if (slash >= 0) {
    const num = parseInt(t.slice(0, slash).trim(), 10);
    const den = parseInt(t.slice(slash + 1).trim(), 10);
    if (!Number.isFinite(num) || !Number.isFinite(den) || den === 0) return null;
    return [num, den];
  }
  const n = parseFloat(t.replace(/,/g, "."));
  if (!Number.isFinite(n)) return null;
  if (Number.isInteger(n)) return [n, 1];
  const den = 10000;
  return [Math.round(n * den), den];
}

/** 十进制度 → 度分秒 [[deg,1],[min,1],[secNum,secDen]]；EXIF 规范要求为绝对值，符号由 Ref 表示 */
function decimalToDms(decimal: number): [number, number][] {
  const abs = Math.abs(decimal);
  const deg = Math.floor(abs);
  const minF = (abs - deg) * 60;
  const min = Math.floor(minF);
  const sec = (minF - min) * 60;
  const secNum = Math.round(sec * 100);
  return [[deg, 1], [min, 1], [secNum, 100]];
}

/**
 * UI 输入值 → piexif 可写入的值（string | number | [number, number] | [number, number][]）。
 * 未覆盖的 tag 按 string 写入。
 */
export function valueToPiexif(fieldId: FieldId, uiValue: string): unknown {
  const trimmed = uiValue.trim();
  const [, tag] = fieldId.includes(".") ? fieldId.split(".", 2) : ["", fieldId];

  if (isDropdownTag(tag)) {
    if (["GPSLatitudeRef", "GPSLongitudeRef", "GPSImgDirectionRef", "GPSDestBearingRef", "GPSSpeedRef"].includes(tag))
      return trimmed; // "N"/"S"/"E"/"W"/"T"/"M"/"K"/"M"/"N"
    const num = parseInt(trimmed, 10);
    return Number.isFinite(num) ? num : trimmed;
  }

  switch (tag) {
    case "ISOSpeedRatings": {
      const n = parseInt(trimmed, 10);
      return Number.isFinite(n) ? n : 0;
    }
    case "ExposureTime":
    case "FNumber":
    case "FocalLength":
    case "ExposureBiasValue":
    case "XResolution":
    case "YResolution": {
      const r = parseRationalFromUi(trimmed);
      return r ? r : [0, 1];
    }
    case "GPSLatitude":
    case "GPSLongitude": {
      const n = parseFloat(trimmed.replace(/,/g, "."));
      if (!Number.isFinite(n)) return null;
      return decimalToDms(n);
    }
    case "GPSAltitude": {
      const r = parseRationalFromUi(trimmed);
      return r ? r : [0, 1];
    }
    case "GPSTimeStamp": {
      const parts = trimmed.split(/[\s:]+/).map((p) => parseInt(p, 10));
      if (parts.length >= 3 && parts.every(Number.isFinite))
        return [[parts[0], 1], [parts[1], 1], [parts[2], 1]];
      return [[0, 1], [0, 1], [0, 1]];
    }
    case "GPSDateStamp":
      return toAsciiOnly(trimmed).slice(0, 10);
    case "DateTime":
    case "DateTimeOriginal":
    case "DateTimeDigitized":
      return toAsciiOnly(trimmed);
    case "UserComment":
      return "ASCII\x00\x00\x00" + toAsciiOnly(trimmed);
    case "Make":
    case "Model":
    case "Software":
    case "ImageDescription":
    case "Artist":
    case "Copyright":
    case "BodySerialNumber":
    case "CameraSerialNumber":
    case "LensMake":
    case "LensModel":
      return toAsciiOnly(trimmed);
    default:
      return trimmed;
  }
}

/** 在 exifDict 中写入单 tag；若 value 为 null 则删除该 tag */
function setPiexifValue(
  exifDict: Record<string, Record<number, unknown>>,
  ifd: Ifd,
  tagId: number,
  value: unknown
): void {
  if (!exifDict[ifd]) exifDict[ifd] = {};
  if (value === null || value === undefined) {
    delete exifDict[ifd][tagId];
    if (Object.keys(exifDict[ifd]).length === 0) delete exifDict[ifd];
    return;
  }
  exifDict[ifd][tagId] = value;
}

/** 将 editedValues 与 deletedFieldIds 应用到 piexif dict（不删 Orientation，缺时补 1） */
export function applyEditsToDict(
  exifDict: Record<string, Record<number, unknown>>,
  editedValues: Record<FieldId, string>,
  deletedFieldIds: Set<FieldId>
): void {
  const orientationTagId = 274;
  for (const fieldId of deletedFieldIds) {
    const info = FIELD_ID_TO_PIEXIF[fieldId];
    if (!info || (info.ifd === "0th" && info.tagId === orientationTagId)) continue;
    setPiexifValue(exifDict, info.ifd, info.tagId, null);
  }
  const gpsLatRefTagId = 1;
  const gpsLngRefTagId = 3;
  for (const [fieldId, uiValue] of Object.entries(editedValues)) {
    if (deletedFieldIds.has(fieldId)) continue; // 已标记删除的字段不再写回
    const info = FIELD_ID_TO_PIEXIF[fieldId];
    if (!info) continue;
    const value = valueToPiexif(fieldId, uiValue);
    if (value !== null && value !== undefined) {
      setPiexifValue(exifDict, info.ifd, info.tagId, value);
      // GPS 坐标：EXIF 要求 Ref 与度数配套，编辑 lat/lng 时同步写入 Ref
      const [, tag] = fieldId.includes(".") ? fieldId.split(".", 2) : ["", fieldId];
      if (tag === "GPSLatitude") {
        const n = parseFloat(uiValue.trim().replace(/,/g, "."));
        if (Number.isFinite(n)) setPiexifValue(exifDict, "GPS", gpsLatRefTagId, n >= 0 ? "N" : "S");
      } else if (tag === "GPSLongitude") {
        const n = parseFloat(uiValue.trim().replace(/,/g, "."));
        if (Number.isFinite(n)) setPiexifValue(exifDict, "GPS", gpsLngRefTagId, n >= 0 ? "E" : "W");
      }
    }
  }
  if (exifDict["0th"] && !(orientationTagId in exifDict["0th"])) {
    exifDict["0th"][orientationTagId] = 1;
  }
}

/** 加载 JPEG → 应用编辑/删除 → 写回 EXIF → 返回新 Blob */
export async function exportJpegWithEdits(
  file: File,
  editedValues: Record<FieldId, string>,
  deletedFieldIds: Set<FieldId>
): Promise<Blob> {
  const piexif = require("piexifjs") as {
    load: (data: string) => Record<string, Record<number, unknown>>;
    dump: (exifDict: Record<string, Record<number, unknown>>) => string;
    remove: (jpeg: string) => string;
    insert: (exif: string, jpeg: string) => string;
  };
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 8192;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  if (binary.slice(0, 2) !== "\xff\xd8") throw new Error("Not a JPEG");
  type ExifDict = Record<string, Record<number, unknown> | null>;
  let exifDict: ExifDict;
  try {
    exifDict = piexif.load(binary) as ExifDict;
  } catch {
    exifDict = { "0th": {}, Exif: {}, GPS: {}, Interop: {}, "1st": {}, thumbnail: null };
  }
  applyEditsToDict(exifDict as Record<string, Record<number, unknown>>, editedValues, deletedFieldIds);
  // piexifjs 将 UserComment(37510) 错误定义为 type:'Ascii'，EXIF 规范应为 UNDEFINED。
  // 否则写入后 ExifReader 按 ASCII 解析，getEncodedString 期望字节数组，得到错误格式，返回 'Undefined'。
  const piexifWithTAGS = piexif as typeof piexif & { TAGS?: { Exif?: Record<number, { name: string; type: string }> } };
  const origUserComment = piexifWithTAGS.TAGS?.Exif?.[37510];
  if (origUserComment?.type === "Ascii") {
    piexifWithTAGS.TAGS!.Exif![37510] = { name: "UserComment", type: "Undefined" };
  }
  let exifBytes: string;
  try {
    exifBytes = piexif.dump(exifDict as Record<string, Record<number, unknown>>);
  } catch {
    throw new Error("Failed to build EXIF");
  } finally {
    if (origUserComment) piexifWithTAGS.TAGS!.Exif![37510] = origUserComment;
  }
  const jpegNoExif = piexif.remove(binary);
  const newJpeg = piexif.insert(exifBytes, jpegNoExif);
  const out = new Uint8Array(newJpeg.length);
  for (let i = 0; i < newJpeg.length; i++) out[i] = newJpeg.charCodeAt(i);
  return new Blob([out], { type: "image/jpeg" });
}
