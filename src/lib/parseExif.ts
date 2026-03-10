import ExifReader from "exifreader";
import { BLOCK_TAG_NAMES, type BlockId } from "@/constants/exifBlocks";

/** ExifReader Tags 单项常见形态；供 loadExifTags 等单次解析结果使用 */
export type TagEntry = { description?: string; value?: unknown };

export type ExifTags = Record<string, TagEntry>;

/** 供 EXIF 参考表等展示用：取单个 tag 的展示字符串 */
export function getTagDisplayValue(tags: ExifTags, tagName: string): string {
  return tagDescription(tags, tagName);
}

function tagDescription(tags: Record<string, TagEntry>, tagName: string): string {
  const t = tags[tagName];
  if (!t) return "";
  if (typeof t.description === "string" && t.description.length > 0)
    return t.description;
  if (t.value !== undefined && t.value !== null) {
    if (Array.isArray(t.value)) return t.value.join(", ");
    return String(t.value);
  }
  return "";
}

/** 纬度/经度展示为小数度，固定 6 位小数，如 39.123456 */
function formatGpsLatLonDisplay(raw: string): string {
  if (!raw.trim()) return raw;
  const n = parseFloat(raw.replace(/,/g, "."));
  if (!Number.isFinite(n)) return raw;
  return n.toFixed(6);
}

/**
 * EXIF GPS 度分秒有理数三元组 → 十进制度数。
 * 约定：value = [ [degNum, degDen], [minNum, minDen], [secNum, secDen] ]，即 [分子, 分母]。
 * 公式：十进制度 = deg + min/60 + sec/3600。
 */
function gpsRationalTripleToDecimal(value: unknown): number | null {
  if (!Array.isArray(value) || value.length < 3) return null;
  const deg = value[0] as number[];
  const min = value[1] as number[];
  const sec = value[2] as number[];
  if (
    !Array.isArray(deg) ||
    !Array.isArray(min) ||
    !Array.isArray(sec) ||
    deg.length < 2 ||
    min.length < 2 ||
    sec.length < 2
  ) {
    return null;
  }
  const d0 = deg[0] / deg[1];
  const d1 = min[0] / min[1];
  const d2 = sec[0] / sec[1];
  if (![d0, d1, d2].every(Number.isFinite)) return null;
  return d0 + d1 / 60 + d2 / 3600;
}

function formatGpsCoordinate(
  tag: string,
  tags: Record<string, TagEntry>
): string {
  const entry = tags[tag];
  if (!entry) return "";

  // ExifReader 常为 number（getCalculatedGpsValue）；TagEntry 类型未声明 number，运行期存在
  const desc = entry.description as string | number | undefined;
  if (typeof desc === "number" && Number.isFinite(desc)) {
    return desc.toFixed(6);
  }

  const fromRational = gpsRationalTripleToDecimal(entry.value);
  if (fromRational !== null) return fromRational.toFixed(6);

  return formatGpsLatLonDisplay(tagDescription(tags, tag));
}

/** 从 tag 取十进制度数值（正数，不含 Ref 符号）；用于展示时会再 format 成 6 位小数 */
function gpsDecimalNumber(tag: string, tags: Record<string, TagEntry>): number | null {
  const s = formatGpsCoordinate(tag, tags);
  if (!s) return null;
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : null;
}

/** 从 tag 取原始十进制度数值（不做 toFixed 截断），用于地图定位等需要精度的场景 */
function gpsDecimalNumberRaw(tag: string, tags: Record<string, TagEntry>): number | null {
  const entry = tags[tag];
  if (!entry) return null;
  const desc = entry.description as string | number | undefined;
  if (typeof desc === "number" && Number.isFinite(desc)) return desc;
  const fromRational = gpsRationalTripleToDecimal(entry.value);
  if (fromRational !== null) return fromRational;
  const s = tagDescription(tags, tag);
  if (!s.trim()) return null;
  const n = parseFloat(s.replace(/,/g, "."));
  return Number.isFinite(n) ? n : null;
}

/** 仅用首字母判断方向，避免 "East" 里的 "S" 被误判为南/西导致东经变西经（河北标到美国） */
function refIsSouthOrWest(tags: Record<string, TagEntry>, refTag: string): boolean {
  const t = tags[refTag];
  if (!t) return false;
  const d = tagDescription(tags, refTag);
  const first = String(d).trim().toUpperCase().charAt(0);
  if (refTag === "GPSLatitudeRef") return first === "S";
  if (refTag === "GPSLongitudeRef") return first === "W";
  return false;
}

export type GpsLatLng = { lat: number; lng: number };

/**
 * 约定：全项目统一使用「带符号十进制度」。
 * - 北纬 / 东经 = 正数，南纬 / 西经 = 负数。
 * - 纬度范围 [-90, 90]，经度范围 [-180, 180]。
 * - 地图、Metadata 展示、后续编辑均使用此约定；写回 EXIF 时用 signedLatLngToExif 转成 绝对值 + Ref。
 */

/**
 * 从已解析的 tags 计算带符号经纬度（与 parseGpsFromFile 同源逻辑，保证展示与地图一致）。
 */
export function getSignedLatLngFromTags(
  tags: Record<string, TagEntry>
): GpsLatLng | null {
  const latRaw = gpsDecimalNumberRaw("GPSLatitude", tags);
  const lngRaw = gpsDecimalNumberRaw("GPSLongitude", tags);
  if (latRaw === null || lngRaw === null) return null;

  const lat =
    refIsSouthOrWest(tags, "GPSLatitudeRef") ? -Math.abs(latRaw) : Math.abs(latRaw);
  const lng =
    refIsSouthOrWest(tags, "GPSLongitudeRef") ? -Math.abs(lngRaw) : Math.abs(lngRaw);

  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return { lat, lng };
}

/**
 * 从 tags 取经纬度全精度字符串（供编辑时保留第 6 位小数之后的尾数用）。
 * 仅支持 GPSLatitude / GPSLongitude，否则返回 null。
 */
export function getRawGpsDecimalString(
  tag: "GPSLatitude" | "GPSLongitude",
  tags: Record<string, TagEntry>
): string | null {
  const signed = getSignedLatLngFromTags(tags);
  if (signed === null) return null;
  if (tag === "GPSLatitude") return String(signed.lat);
  if (tag === "GPSLongitude") return String(signed.lng);
  return null;
}

/**
 * 单次加载 EXIF tags，供上层派生 fileInfo / blocks / gps 使用，避免同一文件多次 ExifReader.load。
 */
export async function loadExifTags(
  file: File
): Promise<{ ok: true; tags: ExifTags } | { ok: false }> {
  try {
    const tags = (await ExifReader.load(file, {
      expanded: false,
      includeUnknown: true,
    })) as ExifTags;
    return { ok: true, tags };
  } catch {
    return { ok: false };
  }
}

/**
 * 仅用 file 自身信息生成 File Information（无 EXIF 或解析失败时使用）。
 */
export function fileInfoFromFile(file: File): FileInfoDisplay {
  return {
    fileType: getFileTypeLabel(file),
    fileSize: formatSize(file.size),
    imageSize: "",
    bitsPerSample: "",
    colorSpace: "",
    mimeType: file.type || "",
    lastModified: file.lastModified
      ? new Date(file.lastModified).toLocaleString()
      : "",
    caption: "",
    artist: "",
    copyright: "",
  };
}

/**
 * 从已加载的 tags 派生 File Information 展示数据（需配合 file 的 type/size/lastModified）。
 */
export function fileInfoFromTags(file: File, tags: ExifTags): FileInfoDisplay {
  const out = fileInfoFromFile(file);
  const w = tagDescription(tags, "ImageWidth");
  const h = tagDescription(tags, "ImageLength");
  if (w && h) out.imageSize = `${w} × ${h}`;
  const bps = tagDescription(tags, "BitsPerSample");
  if (bps) out.bitsPerSample = bps;
  const cs = tagDescription(tags, "ColorSpace");
  if (cs) out.colorSpace = cs;
  const desc = tagDescription(tags, "ImageDescription");
  if (desc) out.caption = desc;
  const artist = tagDescription(tags, "Artist");
  if (artist) out.artist = artist;
  const copyright = tagDescription(tags, "Copyright");
  if (copyright) out.copyright = copyright;
  return out;
}

/**
 * 从已加载的 tags 按区块生成 blocks（与 parseExifForBlocks 成功路径一致）。
 */
export function blocksFromTags(tags: ExifTags): Record<BlockId, BlockRows> {
  const empty = {} as Record<BlockId, BlockRows>;
  (Object.keys(BLOCK_TAG_NAMES) as BlockId[]).forEach((id) => {
    empty[id] = [];
  });
  const signed = getSignedLatLngFromTags(tags);
  (Object.entries(BLOCK_TAG_NAMES) as [BlockId, readonly string[]][]).forEach(
    ([blockId, names]) => {
      if (names.length === 0) return;
      empty[blockId] = names.map((tag) => {
        let value: string;
        if (tag === "GPSLatitude" && signed !== null)
          value = String(signed.lat);
        else if (tag === "GPSLongitude" && signed !== null)
          value = String(signed.lng);
        else if (tag === "GPSLatitude" || tag === "GPSLongitude")
          value = formatGpsCoordinate(tag, tags);
        else if (tag === "Orientation") {
          const entry = tags[tag];
          if (entry?.value !== undefined && typeof entry.value === "number")
            value = String(entry.value);
          else
            value = tagDescription(tags, tag);
        } else value = tagDescription(tags, tag);
        return { tag, value };
      });
    }
  );
  return empty;
}

/**
 * 从当前文件解析 GPS；无或无效则 null。纬度南、经度西为负。
 */
export async function parseGpsFromFile(file: File): Promise<GpsLatLng | null> {
  try {
    const tags = (await ExifReader.load(file, {
      expanded: false,
      includeUnknown: true,
    })) as Record<string, TagEntry>;
    return getSignedLatLngFromTags(tags);
  } catch {
    return null;
  }
}

/**
 * 带符号经纬度 → EXIF 写入用格式（供后续编辑/写回使用）。
 * 编辑时：用户改的是带符号十进制度（如 116.123456 或 -116.123456），
 * 解析为 number 后传入本函数，得到 latMagnitude/latRef、lngMagnitude/lngRef 再写回 EXIF。
 */
export function signedLatLngToExif(lat: number, lng: number): {
  latMagnitude: number;
  latRef: "N" | "S";
  lngMagnitude: number;
  lngRef: "E" | "W";
} {
  return {
    latMagnitude: Math.abs(lat),
    latRef: lat >= 0 ? "N" : "S",
    lngMagnitude: Math.abs(lng),
    lngRef: lng >= 0 ? "E" : "W",
  };
}

export type BlockRows = { tag: string; value: string }[];

export type ParseExifForBlocksResult =
  | { ok: true; blocks: Record<BlockId, BlockRows> }
  | { ok: false };

/**
 * 解析当前文件，按区块列出 tag → 展示字符串；无则空串。
 * 解析失败（格式错误等）时返回 { ok: false }，便于 UI 区分「无 EXIF」与「解析出错」。
 */
export async function parseExifForBlocks(
  file: File
): Promise<ParseExifForBlocksResult> {
  const empty = {} as Record<BlockId, BlockRows>;
  (Object.keys(BLOCK_TAG_NAMES) as BlockId[]).forEach((id) => {
    empty[id] = [];
  });

  try {
    const tags = (await ExifReader.load(file, {
      expanded: false,
      includeUnknown: true,
    })) as Record<string, TagEntry>;

    const signed = getSignedLatLngFromTags(tags);
    (Object.entries(BLOCK_TAG_NAMES) as [BlockId, readonly string[]][]).forEach(
      ([blockId, names]) => {
        if (names.length === 0) return;
        empty[blockId] = names.map((tag) => {
          let value: string;
          if (tag === "GPSLatitude" && signed !== null)
            value = String(signed.lat);
          else if (tag === "GPSLongitude" && signed !== null)
            value = String(signed.lng);
          else if (tag === "GPSLatitude" || tag === "GPSLongitude")
            value = formatGpsCoordinate(tag, tags);
          else if (tag === "Orientation") {
            const entry = tags[tag];
            if (entry?.value !== undefined && typeof entry.value === "number")
              value = String(entry.value);
            else
              value = tagDescription(tags, tag);
          } else
            value = tagDescription(tags, tag);
          return { tag, value };
        });
      }
    );
    return { ok: true, blocks: empty };
  } catch {
    return { ok: false };
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileTypeLabel(file: File): string {
  const t = file.type?.toLowerCase();
  if (t === "image/jpeg" || t === "image/jpg") return "JPEG";
  if (t === "image/png") return "PNG";
  if (t === "image/tiff") return "TIFF";
  if (t === "image/webp") return "WebP";
  if (t === "image/avif") return "AVIF";
  if (t === "image/heic" || t === "image/heif") return "HEIC";
  const ext = file.name?.split(".").pop()?.toUpperCase();
  if (ext) return ext;
  return file.type || "";
}

export type FileInfoDisplay = {
  fileType: string;
  fileSize: string;
  imageSize: string;
  bitsPerSample: string;
  colorSpace: string;
  mimeType: string;
  lastModified: string;
  caption: string;
  artist: string;
  copyright: string;
};

/**
 * 供左侧 File Information 展示：合并 File API 与 EXIF，缺项为空串
 */
export async function parseFileInfo(file: File): Promise<FileInfoDisplay> {
  const out: FileInfoDisplay = {
    fileType: getFileTypeLabel(file),
    fileSize: formatSize(file.size),
    imageSize: "",
    bitsPerSample: "",
    colorSpace: "",
    mimeType: file.type || "",
    lastModified: file.lastModified
      ? new Date(file.lastModified).toLocaleString()
      : "",
    caption: "",
    artist: "",
    copyright: "",
  };

  try {
    const tags = (await ExifReader.load(file, {
      expanded: false,
      includeUnknown: true,
    })) as Record<string, TagEntry>;

    const w = tagDescription(tags, "ImageWidth");
    const h = tagDescription(tags, "ImageLength");
    if (w && h) out.imageSize = `${w} × ${h}`;

    const bps = tagDescription(tags, "BitsPerSample");
    if (bps) out.bitsPerSample = bps;

    const cs = tagDescription(tags, "ColorSpace");
    if (cs) out.colorSpace = cs;

    const desc = tagDescription(tags, "ImageDescription");
    if (desc) out.caption = desc;

    const artist = tagDescription(tags, "Artist");
    if (artist) out.artist = artist;

    const copyright = tagDescription(tags, "Copyright");
    if (copyright) out.copyright = copyright;
  } catch {
    // 解析失败保留 out 中已填的 file 字段
  }

  return out;
}
