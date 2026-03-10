/**
 * EXIF 隐私风险：按维度判断是否有数据，并归为高/中/低。
 * 与 docs/EXIF维度解析与字段说明.md 第四节「风险维度与色相」对齐。
 */
import type { BlockId } from "@/constants/exifBlocks";
import type { BlockRows } from "@/lib/parseExif";

export type RiskLevel = "high" | "medium" | "low" | "safe";

/** 各维度风险等级 */
const BLOCK_RISK_LEVEL: Partial<Record<BlockId, RiskLevel>> = {
  location: "high",
  device: "medium",
  other: "medium",
  dateTime: "low",
};

function blockHasData(rows: BlockRows): boolean {
  return rows.some((row) => (row.value ?? "").toString().trim() !== "");
}

export type RiskAnalysis = {
  level: RiskLevel;
  items: { high: BlockId[]; medium: BlockId[]; low: BlockId[] };
};

const LEVEL_ORDER: RiskLevel[] = ["high", "medium", "low"];

/**
 * 根据当前 blocks 计算隐私分析：有数据的维度按等级归类，整体等级取最高。
 */
export function getRiskFromBlocks(
  blocks: Record<string, BlockRows>
): RiskAnalysis {
  const items: { high: BlockId[]; medium: BlockId[]; low: BlockId[] } = {
    high: [],
    medium: [],
    low: [],
  };
  let level: RiskLevel = "safe";

  for (const [blockId, rows] of Object.entries(blocks)) {
    const risk = BLOCK_RISK_LEVEL[blockId as BlockId];
    if (!risk || risk === "safe") continue;
    if (!blockHasData(rows)) continue;
    items[risk].push(blockId as BlockId);
    const currentIndex = level === "safe" ? LEVEL_ORDER.length : LEVEL_ORDER.indexOf(level);
    if (LEVEL_ORDER.indexOf(risk) < currentIndex) level = risk;
  }

  return { level, items };
}
