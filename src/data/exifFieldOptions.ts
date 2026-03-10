/**
 * 可编辑 EXIF 字段的控件类型与下拉选项，对齐 docs/EXIF维度解析与字段说明.md 第九节。
 */
import type { BlockId } from "@/constants/exifBlocks";

export type FieldId = string;

/** fieldId = blockId.tag，如 device.Make, other.Artist */
export function getFieldId(blockId: BlockId, tag: string): FieldId {
  return `${blockId}.${tag}`;
}

/** 下拉类 tag 集合：这些字段用 <select> 而非 <input> */
export const DROPDOWN_FIELD_TAGS = new Set<string>([
  "Orientation",
  "WhiteBalance",
  "Flash",
  "ExposureProgram",
  "ExposureMode",
  "MeteringMode",
  "SceneCaptureType",
  "ResolutionUnit",
  "ColorSpace",
  "GPSLatitudeRef",
  "GPSLongitudeRef",
  "GPSImgDirectionRef",
  "GPSDestBearingRef",
  "GPSSpeedRef",
]);

export function isDropdownTag(tag: string): boolean {
  return DROPDOWN_FIELD_TAGS.has(tag);
}

export type DropdownOption = { value: string; labelKey: string };

/** tag → 下拉选项，value 为写入 EXIF 的值，labelKey 为 i18n key（如 metadata.opt.orientation.1） */
export const DROPDOWN_FIELD_OPTIONS: Record<string, DropdownOption[]> = {
  Orientation: [
    { value: "0", labelKey: "metadata.opt.orientation.0" },
    { value: "1", labelKey: "metadata.opt.orientation.1" },
    { value: "2", labelKey: "metadata.opt.orientation.2" },
    { value: "3", labelKey: "metadata.opt.orientation.3" },
    { value: "4", labelKey: "metadata.opt.orientation.4" },
    { value: "5", labelKey: "metadata.opt.orientation.5" },
    { value: "6", labelKey: "metadata.opt.orientation.6" },
    { value: "7", labelKey: "metadata.opt.orientation.7" },
    { value: "8", labelKey: "metadata.opt.orientation.8" },
  ],
  WhiteBalance: [
    { value: "0", labelKey: "metadata.opt.whiteBalance.0" },
    { value: "1", labelKey: "metadata.opt.whiteBalance.1" },
  ],
  Flash: [
    { value: "0", labelKey: "metadata.opt.flash.0" },
    { value: "1", labelKey: "metadata.opt.flash.1" },
    { value: "5", labelKey: "metadata.opt.flash.5" },
    { value: "7", labelKey: "metadata.opt.flash.7" },
    { value: "9", labelKey: "metadata.opt.flash.9" },
    { value: "13", labelKey: "metadata.opt.flash.13" },
    { value: "15", labelKey: "metadata.opt.flash.15" },
    { value: "16", labelKey: "metadata.opt.flash.16" },
    { value: "24", labelKey: "metadata.opt.flash.24" },
    { value: "25", labelKey: "metadata.opt.flash.25" },
    { value: "29", labelKey: "metadata.opt.flash.29" },
    { value: "31", labelKey: "metadata.opt.flash.31" },
  ],
  ExposureProgram: [
    { value: "0", labelKey: "metadata.opt.exposureProgram.0" },
    { value: "1", labelKey: "metadata.opt.exposureProgram.1" },
    { value: "2", labelKey: "metadata.opt.exposureProgram.2" },
    { value: "3", labelKey: "metadata.opt.exposureProgram.3" },
    { value: "4", labelKey: "metadata.opt.exposureProgram.4" },
    { value: "5", labelKey: "metadata.opt.exposureProgram.5" },
    { value: "6", labelKey: "metadata.opt.exposureProgram.6" },
    { value: "7", labelKey: "metadata.opt.exposureProgram.7" },
    { value: "8", labelKey: "metadata.opt.exposureProgram.8" },
  ],
  ExposureMode: [
    { value: "0", labelKey: "metadata.opt.exposureMode.0" },
    { value: "1", labelKey: "metadata.opt.exposureMode.1" },
    { value: "2", labelKey: "metadata.opt.exposureMode.2" },
  ],
  MeteringMode: [
    { value: "0", labelKey: "metadata.opt.meteringMode.0" },
    { value: "1", labelKey: "metadata.opt.meteringMode.1" },
    { value: "2", labelKey: "metadata.opt.meteringMode.2" },
    { value: "3", labelKey: "metadata.opt.meteringMode.3" },
    { value: "4", labelKey: "metadata.opt.meteringMode.4" },
    { value: "5", labelKey: "metadata.opt.meteringMode.5" },
    { value: "6", labelKey: "metadata.opt.meteringMode.6" },
  ],
  SceneCaptureType: [
    { value: "0", labelKey: "metadata.opt.sceneCaptureType.0" },
    { value: "1", labelKey: "metadata.opt.sceneCaptureType.1" },
    { value: "2", labelKey: "metadata.opt.sceneCaptureType.2" },
    { value: "3", labelKey: "metadata.opt.sceneCaptureType.3" },
  ],
  ResolutionUnit: [
    { value: "1", labelKey: "metadata.opt.resolutionUnit.1" },
    { value: "2", labelKey: "metadata.opt.resolutionUnit.2" },
    { value: "3", labelKey: "metadata.opt.resolutionUnit.3" },
  ],
  ColorSpace: [
    { value: "1", labelKey: "metadata.opt.colorSpace.1" },
    { value: "2", labelKey: "metadata.opt.colorSpace.2" },
    { value: "65535", labelKey: "metadata.opt.colorSpace.65535" },
  ],
  GPSLatitudeRef: [
    { value: "N", labelKey: "metadata.opt.gpsRef.N" },
    { value: "S", labelKey: "metadata.opt.gpsRef.S" },
  ],
  GPSLongitudeRef: [
    { value: "E", labelKey: "metadata.opt.gpsRef.E" },
    { value: "W", labelKey: "metadata.opt.gpsRef.W" },
  ],
  GPSImgDirectionRef: [
    { value: "T", labelKey: "metadata.opt.gpsDir.T" },
    { value: "M", labelKey: "metadata.opt.gpsDir.M" },
  ],
  GPSDestBearingRef: [
    { value: "T", labelKey: "metadata.opt.gpsDir.T" },
    { value: "M", labelKey: "metadata.opt.gpsDir.M" },
  ],
  GPSSpeedRef: [
    { value: "K", labelKey: "metadata.opt.gpsSpeedRef.K" },
    { value: "M", labelKey: "metadata.opt.gpsSpeedRef.M" },
    { value: "N", labelKey: "metadata.opt.gpsSpeedRef.N" },
  ],
};

export function getDropdownOptions(tag: string): DropdownOption[] {
  return DROPDOWN_FIELD_OPTIONS[tag] ?? [];
}

/** 根据 value 取选项的 labelKey，供 i18n 后展示 */
export function getOptionLabelKey(tag: string, value: string): string | undefined {
  const opts = DROPDOWN_FIELD_OPTIONS[tag];
  if (!opts) return undefined;
  const found = opts.find((o) => String(o.value) === String(value));
  return found?.labelKey;
}

/** 将展示文案（或 value）解析为选项 value，用于进入编辑态时初始化 */
export function parseDisplayToOptionValue(tag: string, displayOrValue: string, t: (key: string) => string): string {
  const opts = DROPDOWN_FIELD_OPTIONS[tag];
  if (!opts?.length) return displayOrValue;
  const byValue = opts.find((o) => String(o.value) === String(displayOrValue));
  if (byValue) return byValue.value;
  const byLabel = opts.find((o) => t(o.labelKey) === displayOrValue);
  return byLabel?.value ?? opts[0]?.value ?? displayOrValue;
}
