/**
 * 全量 EXIF 参考表静态数据（6 个维度，不含 icc）：Tag(Hex), Name, IFD, Type, Value(示例), 常见显示/解码说明。
 * 与 constants/exifBlocks.BLOCK_TAG_NAMES 一致；IFD/tagId 与 stripExifPresets 对齐，缺失的单独补全。
 */
import { BLOCK_TAG_NAMES } from "@/constants/exifBlocks";
import { TAG_TO_IFD_AND_ID } from "@/lib/stripExifPresets";

export type ExifReferenceRow = {
  tagHex: string;
  name: string;
  ifd: string;
  type: string;
  value: string;
  /** 与「Tag(Hex)」列不同：多为标签**取值**的常见显示（如 ExifVersion 的四字符 ASCII 与逐字节 hex），无则 "—" */
  valueDecoded: string;
};

const IFD_ORDER: Record<string, number> = { "0th": 0, Exif: 1, GPS: 2 };

/** 参考表未覆盖的 tag → IFD + tagId（如 FirmwareVersion 等） */
const EXTRA_TAG_IFD_ID: Record<string, { ifd: "0th" | "Exif" | "GPS"; tagId: number }> = {
  FirmwareVersion: { ifd: "Exif", tagId: 0xa431 }, // 42097，厂商常见
};

/** 常见 EXIF 类型 */
const TAG_TYPE: Record<string, string> = {
  Make: "ASCII",
  Model: "ASCII",
  Software: "ASCII",
  DateTime: "ASCII",
  ImageDescription: "ASCII",
  Artist: "ASCII",
  Copyright: "ASCII",
  Orientation: "SHORT",
  ImageWidth: "LONG",
  ImageLength: "LONG",
  XResolution: "RATIONAL",
  YResolution: "RATIONAL",
  ResolutionUnit: "SHORT",
  BitsPerSample: "SHORT",
  SamplesPerPixel: "SHORT",
  Compression: "SHORT",
  PhotometricInterpretation: "SHORT",
  YCbCrPositioning: "SHORT",
  PlanarConfiguration: "SHORT",
  ExifVersion: "UNDEFINED",
  FlashPixVersion: "UNDEFINED",
  ColorSpace: "SHORT",
  ComponentsConfiguration: "UNDEFINED",
  CompressedBitsPerPixel: "RATIONAL",
  BodySerialNumber: "ASCII",
  CameraSerialNumber: "ASCII",
  LensMake: "ASCII",
  LensModel: "ASCII",
  FirmwareVersion: "ASCII",
  DateTimeOriginal: "ASCII",
  DateTimeDigitized: "ASCII",
  ExposureTime: "RATIONAL",
  FNumber: "RATIONAL",
  FocalLength: "RATIONAL",
  ISOSpeedRatings: "SHORT",
  WhiteBalance: "SHORT",
  Flash: "SHORT",
  ExposureProgram: "SHORT",
  ExposureMode: "SHORT",
  MeteringMode: "SHORT",
  SceneCaptureType: "SHORT",
  SceneType: "UNDEFINED",
  ExposureBiasValue: "SRATIONAL",
  UserComment: "UNDEFINED",
  MakerNote: "UNDEFINED",
  GPSLatitudeRef: "ASCII",
  GPSLatitude: "RATIONAL",
  GPSLongitudeRef: "ASCII",
  GPSLongitude: "RATIONAL",
  GPSAltitudeRef: "BYTE",
  GPSAltitude: "RATIONAL",
  GPSTimeStamp: "RATIONAL",
  GPSDateStamp: "ASCII",
  GPSSpeedRef: "ASCII",
  GPSImgDirection: "RATIONAL",
  GPSImgDirectionRef: "ASCII",
  GPSDestBearing: "RATIONAL",
  GPSDestBearingRef: "ASCII",
};

/** Value 列示例值（仅作参考） */
const TAG_VALUE_EXAMPLE: Record<string, string> = {
  Make: "Canon",
  Model: "Canon EOS R5",
  Software: "1.0.0",
  DateTime: "2024:01:15 12:30:00",
  ImageDescription: "Sample image",
  Artist: "Photographer",
  Copyright: "© 2024",
  Orientation: "1",
  ImageWidth: "6720",
  ImageLength: "4480",
  XResolution: "72/1",
  YResolution: "72/1",
  ResolutionUnit: "2",
  BitsPerSample: "8 8 8",
  SamplesPerPixel: "3",
  Compression: "1",
  PhotometricInterpretation: "2",
  YCbCrPositioning: "1",
  PlanarConfiguration: "1",
  ExifVersion: "0231",
  FlashPixVersion: "0100",
  ColorSpace: "1",
  ComponentsConfiguration: "1 2 3 0",
  CompressedBitsPerPixel: "3/1",
  BodySerialNumber: "12345678",
  CameraSerialNumber: "12345678",
  LensMake: "Canon",
  LensModel: "RF 24-70mm F2.8",
  FirmwareVersion: "1.0.0",
  DateTimeOriginal: "2024:01:15 12:30:00",
  DateTimeDigitized: "2024:01:15 12:30:00",
  ExposureTime: "1/250",
  FNumber: "28/10",
  FocalLength: "50/1",
  ISOSpeedRatings: "400",
  WhiteBalance: "0",
  Flash: "16",
  ExposureProgram: "2",
  ExposureMode: "0",
  MeteringMode: "5",
  SceneCaptureType: "0",
  SceneType: "1",
  ExposureBiasValue: "0/1",
  UserComment: "",
  MakerNote: "(binary)",
  GPSLatitudeRef: "N",
  GPSLatitude: "39.904200",
  GPSLongitudeRef: "E",
  GPSLongitude: "116.407396",
  GPSAltitudeRef: "0",
  GPSAltitude: "50.5",
  GPSTimeStamp: "04:30:00",
  GPSDateStamp: "2024:01:15",
  GPSSpeedRef: "K",
  GPSImgDirection: "180/1",
  GPSImgDirectionRef: "T",
  GPSDestBearing: "180/1",
  GPSDestBearingRef: "T",
};

/** 示例取值对应的四字节 ASCII 的十六进制（空格分隔），用于与「0220 / 0231」类显示对照——非 Tag ID */
function asciiFourCharToByteHex(s: string): string {
  if (s.length !== 4) return "—";
  return [...s]
    .map((ch) => ch.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"))
    .join(" ");
}

/**
 * 「Value (example)」列多为工具直接展示的字符串；本列说明在文件中的常见形态（尤其 UNDEFINED 版本串）。
 * 与 IFD 里的 **Tag 编号**（tagHex，如 ExifVersion=0x9000）不是同一概念。
 */
const TAG_VALUE_DECODED: Record<string, string> = {
  ExifVersion: `ASCII "0231" (4 bytes: ${asciiFourCharToByteHex("0231")}) — not tag number 0x9000`,
  FlashPixVersion: `ASCII "0100" (4 bytes: ${asciiFourCharToByteHex("0100")})`,
};

function getIfdAndId(tagName: string): { ifd: "0th" | "Exif" | "GPS"; tagId: number } | null {
  const fromPresets = (TAG_TO_IFD_AND_ID as Record<string, { ifd: "0th" | "Exif" | "GPS"; tagId: number }>)[tagName];
  if (fromPresets) return fromPresets;
  return EXTRA_TAG_IFD_ID[tagName] ?? null;
}

/** 6 个维度（不含 icc）顺序与 exifBlocks 一致 */
const DIMENSION_IDS = ["device", "imageSettings", "location", "dateTime", "other", "image"] as const;

function collectAllTagNames(): string[] {
  const seen = new Set<string>();
  const list: string[] = [];
  for (const blockId of DIMENSION_IDS) {
    const names = BLOCK_TAG_NAMES[blockId] ?? [];
    for (const name of names) {
      if (!seen.has(name)) {
        seen.add(name);
        list.push(name);
      }
    }
  }
  return list;
}

function buildRows(): ExifReferenceRow[] {
  const tagNames = collectAllTagNames();
  const rows: ExifReferenceRow[] = [];
  for (const name of tagNames) {
    const info = getIfdAndId(name);
    const tagHex = info ? "0x" + info.tagId.toString(16).toUpperCase() : "—";
    const ifd = info ? info.ifd : "—";
    const type = TAG_TYPE[name] ?? "—";
    const value = TAG_VALUE_EXAMPLE[name] ?? "—";
    const valueDecoded = TAG_VALUE_DECODED[name] ?? "—";
    rows.push({ tagHex, name, ifd, type, value, valueDecoded });
  }
  rows.sort((a, b) => {
    const aIfd = IFD_ORDER[a.ifd] ?? 99;
    const bIfd = IFD_ORDER[b.ifd] ?? 99;
    if (aIfd !== bIfd) return aIfd - bIfd;
    const aHex = a.tagHex === "—" ? 0 : parseInt(a.tagHex, 16);
    const bHex = b.tagHex === "—" ? 0 : parseInt(b.tagHex, 16);
    return aHex - bHex;
  });
  return rows;
}

export const EXIF_REFERENCE_ROWS: ExifReferenceRow[] = buildRows();
