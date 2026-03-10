import type { BlockId } from "@/constants/exifBlocks";
import type { BlockRows } from "@/lib/parseExif";

export type ExportFormat = "csv" | "json" | "txt" | "hex";

/** 文本类导出格式；hex 导出请使用 buildExifExportHex，不要传入本函数 */
export type TextExportFormat = Exclude<ExportFormat, "hex">;

function flattenBlocks(blocks: Record<BlockId, BlockRows>): { tag: string; value: string }[] {
  const out: { tag: string; value: string }[] = [];
  for (const rows of Object.values(blocks)) {
    for (const { tag, value } of rows) out.push({ tag, value });
  }
  return out;
}

/**
 * 基于区块数据生成导出内容（仅支持 csv/json/txt）。
 * hex 导出请使用 buildExifExportHex(file)。
 */
export function buildExifExportContent(
  blocks: Record<BlockId, BlockRows>,
  format: TextExportFormat,
  filenameBase: string
): { blob: Blob; filename: string } {
  const rows = flattenBlocks(blocks);
  let content: string;
  let ext: string;
  let mime: string;

  switch (format) {
    case "csv": {
      ext = "csv";
      mime = "text/csv;charset=utf-8";
      const header = "Tag,Value";
      const body = rows.map((r) => `"${r.tag.replace(/"/g, '""')}","${String(r.value).replace(/"/g, '""')}"`).join("\n");
      content = "\uFEFF" + header + "\n" + body;
      break;
    }
    case "json": {
      ext = "json";
      mime = "application/json;charset=utf-8";
      const obj: Record<string, string> = {};
      rows.forEach((r) => (obj[r.tag] = r.value));
      content = JSON.stringify(obj, null, 2);
      break;
    }
    case "txt": {
      ext = "txt";
      mime = "text/plain;charset=utf-8";
      content = rows.map((r) => `${r.tag}: ${r.value}`).join("\n");
      break;
    }
    default:
      ext = "txt";
      mime = "text/plain;charset=utf-8";
      content = rows.map((r) => `${r.tag}: ${r.value}`).join("\n");
  }

  const blob = new Blob([content], { type: mime });
  const filename = `${filenameBase.replace(/\.[^.]+$/, "")}_exif.${ext}`;
  return { blob, filename };
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * 从 JPEG 中取出 APP1 Exif 段 payload（含 "Exif\0\0" + TIFF），转为 hex dump 文本。
 * 非 JPEG 或未找到 EXIF 时返回说明文本。
 */
export async function buildExifExportHex(file: File): Promise<{ blob: Blob; filename: string }> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const len = bytes.length;

  if (len < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
    const msg = "Not a JPEG file (no SOI marker). Cannot extract EXIF segment.";
    const blob = new Blob([msg], { type: "text/plain;charset=utf-8" });
    return { blob, filename: `${file.name.replace(/\.[^.]+$/, "")}_exif_hex.txt` };
  }

  let offset = 2;
  let exifPayload: Uint8Array | null = null;

  while (offset + 4 <= len) {
    if (bytes[offset] !== 0xff) break;
    const marker = bytes[offset + 1];
    if (marker === 0xd9) break; // EOI
    const segLen = (bytes[offset + 2] << 8) | bytes[offset + 3];
    if (segLen < 2) break;
    const payloadStart = offset + 4;
    const payloadEnd = offset + 2 + segLen;
    if (marker === 0xe1 && payloadEnd <= len) {
      const payload = bytes.subarray(payloadStart, payloadEnd);
      if (payload.length >= 6 && payload[0] === 0x45 && payload[1] === 0x78 && payload[2] === 0x69 && payload[3] === 0x66) {
        exifPayload = payload;
        break;
      }
    }
    offset = payloadEnd;
  }

  if (!exifPayload || exifPayload.length === 0) {
    const msg = "No EXIF (APP1) segment found in this JPEG.";
    const blob = new Blob([msg], { type: "text/plain;charset=utf-8" });
    return { blob, filename: `${file.name.replace(/\.[^.]+$/, "")}_exif_hex.txt` };
  }

  const lines: string[] = [];
  const LINE_BYTES = 16;
  for (let i = 0; i < exifPayload.length; i += LINE_BYTES) {
    const chunk = exifPayload.subarray(i, Math.min(i + LINE_BYTES, exifPayload.length));
    const offsetHex = i.toString(16).toUpperCase().padStart(8, "0");
    const hexParts: string[] = [];
    const ascii: string[] = [];
    for (let j = 0; j < LINE_BYTES; j++) {
      if (j < chunk.length) {
        hexParts.push(chunk[j].toString(16).toUpperCase().padStart(2, "0"));
        ascii.push(chunk[j] >= 0x20 && chunk[j] <= 0x7e ? String.fromCharCode(chunk[j]) : ".");
      } else {
        hexParts.push("  ");
        ascii.push(" ");
      }
    }
    const hexLine = hexParts.slice(0, 8).join(" ") + "  " + hexParts.slice(8, 16).join(" ");
    lines.push(`${offsetHex}  ${hexLine}  |${ascii.join("")}|`);
  }

  const content = lines.join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const filename = `${file.name.replace(/\.[^.]+$/, "")}_exif_hex.txt`;
  return { blob, filename };
}
