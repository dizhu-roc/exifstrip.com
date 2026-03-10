/**
 * 与 docs/EXIF维度解析与字段说明.md 3.2 BLOCK_TAG_NAMES 对齐
 * ExifReader 返回的 Tags 键为 PascalCase，与 tag 名一致
 */
export const BLOCK_TAG_NAMES: Record<string, readonly string[]> = {
  device: [
    "Make",
    "Model",
    "BodySerialNumber",
    "CameraSerialNumber",
    "LensMake",
    "LensModel",
    "Software",
    "FirmwareVersion",
  ],
  imageSettings: [
    "Orientation",
    "ExposureTime",
    "FNumber",
    "FocalLength",
    "ISOSpeedRatings",
    "WhiteBalance",
    "Flash",
    "ExposureProgram",
    "ExposureMode",
    "MeteringMode",
    "SceneCaptureType",
    "SceneType",
    "ExposureBiasValue",
  ],
  location: [
    "GPSLatitude",
    "GPSLongitude",
    "GPSAltitude",
    "GPSDateStamp",
    "GPSTimeStamp",
    "GPSLatitudeRef",
    "GPSLongitudeRef",
    "GPSSpeedRef",
    "GPSImgDirection",
    "GPSImgDirectionRef",
    "GPSDestBearing",
    "GPSDestBearingRef",
  ],
  dateTime: ["DateTimeOriginal", "DateTime", "DateTimeDigitized"],
  other: [
    "Artist",
    "Copyright",
    "UserComment",
    "ImageDescription",
    "MakerNote",
  ],
  image: [
    "ImageWidth",
    "ImageLength",
    "XResolution",
    "YResolution",
    "ResolutionUnit",
    "ColorSpace",
    "BitsPerSample",
    "SamplesPerPixel",
    "Compression",
    "PhotometricInterpretation",
    "YCbCrPositioning",
    "PlanarConfiguration",
    "ExifVersion",
    "FlashPixVersion",
    "ComponentsConfiguration",
    "CompressedBitsPerPixel",
  ],
  icc: [] as readonly string[],
};

export type BlockId = keyof typeof BLOCK_TAG_NAMES;

/**
 * 文档 6.1 — 仅可删不可改
 */
export const READ_ONLY_EDIT_TAGS = new Set<string>([
  "MakerNote",
  "FirmwareVersion",
  "SceneType",
]);

/**
 * 文档 6.2 — 仅展示，无编辑/删除按钮（Image 中可编辑的除外，见 EDITABLE_IMAGE_TAGS）
 */
export const DISPLAY_ONLY_TAGS = new Set<string>([
  "ImageWidth",
  "ImageLength",
  "BitsPerSample",
  "SamplesPerPixel",
  "Compression",
  "PhotometricInterpretation",
  "YCbCrPositioning",
  "PlanarConfiguration",
  "ExifVersion",
  "FlashPixVersion",
  "ComponentsConfiguration",
  "CompressedBitsPerPixel",
]);

/** Image 区块中允许编辑的 tag（与 DISPLAY_ONLY 互补） */
export const EDITABLE_IMAGE_TAGS = new Set<string>([
  "XResolution",
  "YResolution",
  "ResolutionUnit",
  "ColorSpace",
]);

/** 是否显示编辑按钮：非 DISPLAY_ONLY；Image 块仅 EDITABLE_IMAGE_TAGS 可编辑；READ_ONLY_EDIT 不可编辑 */
export function canShowEditButton(tag: string, blockId: BlockId): boolean {
  if (READ_ONLY_EDIT_TAGS.has(tag)) return false;
  if (blockId === "image") {
    if (EDITABLE_IMAGE_TAGS.has(tag)) return true;
    if (DISPLAY_ONLY_TAGS.has(tag)) return false;
    // image 块中未列入 EDITABLE_IMAGE_TAGS 与 DISPLAY_ONLY_TAGS 的 tag 默认允许编辑（当前无此类 tag）
    return true;
  }
  if (DISPLAY_ONLY_TAGS.has(tag)) return false;
  return true;
}

/** 是否显示删除按钮：非 DISPLAY_ONLY（READ_ONLY_EDIT 仅删不可改，仍显示删除） */
export function canShowDeleteButton(tag: string, _blockId: BlockId): boolean {
  return !DISPLAY_ONLY_TAGS.has(tag);
}
