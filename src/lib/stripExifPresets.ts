/**
 * 预设与 EXIF 维度的对应关系：仅剥离预设指定的维度，其他维度不动。
 * 与 exifBlocks.BLOCK_TAG_NAMES 维度一致；tag 名与 piexifjs 的 ImageIFD/ExifIFD/GPSIFD 键名一致。
 */
import type { BlockId } from "@/constants/exifBlocks";

export type CleanPresetId = "full" | "privacy" | "gps-only" | "device-only";

/** 各预设要剥离的维度：full=全部；privacy=位置+设备+作者/版权等；gps-only=仅位置；device-only=仅设备 */
export const PRESET_TO_BLOCKS: Record<CleanPresetId, BlockId[] | "all"> = {
  full: "all",
  privacy: ["location", "device", "other"],
  "gps-only": ["location"],
  "device-only": ["device"],
};

/**
 * EXIF tag 名 → piexifjs IFD 与 tag ID。
 * 0th = Image IFD；Exif = Exif IFD；GPS = GPS IFD。
 * 来源：piexifjs ImageIFD / ExifIFD / GPSIFD 常量。
 */
export const TAG_TO_IFD_AND_ID: Record<
  string,
  { ifd: "0th" | "Exif" | "GPS"; tagId: number }
> = {
  Make: { ifd: "0th", tagId: 271 },
  Model: { ifd: "0th", tagId: 272 },
  Software: { ifd: "0th", tagId: 305 },
  DateTime: { ifd: "0th", tagId: 306 },
  ImageDescription: { ifd: "0th", tagId: 270 },
  Artist: { ifd: "0th", tagId: 315 },
  Copyright: { ifd: "0th", tagId: 33432 },
  Orientation: { ifd: "0th", tagId: 274 },
  ImageWidth: { ifd: "0th", tagId: 256 },
  ImageLength: { ifd: "0th", tagId: 257 },
  XResolution: { ifd: "0th", tagId: 282 },
  YResolution: { ifd: "0th", tagId: 283 },
  ResolutionUnit: { ifd: "0th", tagId: 296 },
  BitsPerSample: { ifd: "0th", tagId: 258 },
  SamplesPerPixel: { ifd: "0th", tagId: 277 },
  Compression: { ifd: "0th", tagId: 259 },
  PhotometricInterpretation: { ifd: "0th", tagId: 262 },
  YCbCrPositioning: { ifd: "0th", tagId: 531 },
  PlanarConfiguration: { ifd: "0th", tagId: 284 },
  ExifVersion: { ifd: "Exif", tagId: 36864 },
  FlashPixVersion: { ifd: "Exif", tagId: 40960 },
  ComponentsConfiguration: { ifd: "Exif", tagId: 37121 },
  CompressedBitsPerPixel: { ifd: "Exif", tagId: 37122 },
  ColorSpace: { ifd: "Exif", tagId: 40961 },
  BodySerialNumber: { ifd: "Exif", tagId: 42033 },
  CameraSerialNumber: { ifd: "0th", tagId: 50735 },
  LensMake: { ifd: "Exif", tagId: 42035 },
  LensModel: { ifd: "Exif", tagId: 42036 },
  DateTimeOriginal: { ifd: "Exif", tagId: 36867 },
  DateTimeDigitized: { ifd: "Exif", tagId: 36868 },
  ExposureTime: { ifd: "Exif", tagId: 33434 },
  FNumber: { ifd: "Exif", tagId: 33437 },
  FocalLength: { ifd: "Exif", tagId: 37386 },
  ISOSpeedRatings: { ifd: "Exif", tagId: 34855 },
  WhiteBalance: { ifd: "Exif", tagId: 41987 },
  Flash: { ifd: "Exif", tagId: 37385 },
  ExposureProgram: { ifd: "Exif", tagId: 34850 },
  ExposureMode: { ifd: "Exif", tagId: 41986 },
  MeteringMode: { ifd: "Exif", tagId: 37383 },
  SceneCaptureType: { ifd: "Exif", tagId: 41990 },
  SceneType: { ifd: "Exif", tagId: 41729 },
  ExposureBiasValue: { ifd: "Exif", tagId: 37380 },
  UserComment: { ifd: "Exif", tagId: 37510 },
  MakerNote: { ifd: "Exif", tagId: 37500 },
  GPSLatitudeRef: { ifd: "GPS", tagId: 1 },
  GPSLatitude: { ifd: "GPS", tagId: 2 },
  GPSLongitudeRef: { ifd: "GPS", tagId: 3 },
  GPSLongitude: { ifd: "GPS", tagId: 4 },
  GPSAltitudeRef: { ifd: "GPS", tagId: 5 },
  GPSAltitude: { ifd: "GPS", tagId: 6 },
  GPSTimeStamp: { ifd: "GPS", tagId: 7 },
  GPSDateStamp: { ifd: "GPS", tagId: 29 },
  GPSSpeedRef: { ifd: "GPS", tagId: 12 },
  GPSImgDirection: { ifd: "GPS", tagId: 17 },
  GPSImgDirectionRef: { ifd: "GPS", tagId: 16 },
  GPSDestBearing: { ifd: "GPS", tagId: 24 },
  GPSDestBearingRef: { ifd: "GPS", tagId: 23 },
};

/** FirmwareVersion 等部分相机厂商 tag 可能不在 piexif 标准中，此处不列；若需剥离可在后续扩展 */
export const PRESET_SUPPORTED_FORMATS = ["image/jpeg", "image/jpg"] as const;

/** 当前仅 JPEG 支持按预设剥离；非 JPEG 仅支持「删除全部 EXIF」 */
export function isPresetSupportedForFormat(mime: string): boolean {
  return (
    mime === "image/jpeg" ||
    mime === "image/jpg" ||
    mime.toLowerCase() === "image/jpeg"
  );
}

/** 当前支持剥离 EXIF 的格式：JPEG/PNG/WebP。HEIC/HEIF/TIFF/AVIF 浏览器解码或 toBlob 不一致，不支持剥离。 */
const STRIP_SUPPORTED_MIMES = ["image/jpeg", "image/jpg", "image/png", "image/webp"] as const;

export function isStripSupportedForFormat(mime: string): boolean {
  const normalized = (mime || "").toLowerCase();
  if (
    normalized === "image/heic" ||
    normalized === "image/heif" ||
    normalized === "image/tiff" ||
    normalized === "image/avif"
  )
    return false;
  return STRIP_SUPPORTED_MIMES.some((s) => s === normalized);
}
