"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "@/contexts/LocaleContext";
import { useUploadContext } from "@/contexts/UploadContext";
import { blocksFromTags, type BlockRows } from "@/lib/parseExif";
import type { BlockId } from "@/constants/exifBlocks";
import MetadataDimensionGraph from "./MetadataDimensionGraph";
import { MetadataGraphTitleIcon } from "./MetadataIcons";

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

/** 有值的行 */
function hasAnyValue(rows: BlockRows): boolean {
  return rows.some((r) => (r.value ?? "").toString().trim() !== "");
}

function hasGraphData(blocks: Record<BlockId, BlockRows>): boolean {
  return BLOCK_IDS.some(({ id }) => hasAnyValue(blocks[id] ?? []));
}

/** 条形图单行高度与间距（与 MetadataDimensionGraph 内 py-1.5 / h-[22px] / mb-3.5 一致） */
const BAR_ROW_PADDING_Y = 6;
const BAR_HEIGHT = 22;
const BAR_ROW_GAP = 14;
const BAR_CONTAINER_PADDING_Y = 16;
const BAR_ROWS = 7;
/** 区块内容区高度 = 以 7 条条形图行高计算（已上传 / 未上传一致） */
const SECTION_BODY_HEIGHT =
  BAR_CONTAINER_PADDING_Y * 2 +
  BAR_ROWS * (BAR_ROW_PADDING_Y * 2 + BAR_HEIGHT) +
  (BAR_ROWS - 1) * BAR_ROW_GAP;

/**
 * Metadata 下方的独立区块：元数据节点图。
 * 未上传图片时整区块置灰，文案提示上传后可见图。
 */
export default function MetadataGraphSection() {
  const t = useTranslations();
  const ctx = useUploadContext();
  const [blocks, setBlocks] = useState<Record<BlockId, BlockRows>>(emptyBlocks);
  const [loading, setLoading] = useState(false);
  const noUpload = !ctx?.items?.length;
  const file = ctx?.selectedItem?.file ?? null;
  const selectedId = ctx?.selectedId ?? null;

  useEffect(() => {
    if (!ctx) return;
    if (ctx.exifLoading) {
      queueMicrotask(() => setLoading(true));
      return;
    }
    queueMicrotask(() => {
      setLoading(false);
      if (ctx.exifResult?.ok) {
        setBlocks(blocksFromTags(ctx.exifResult.tags));
      } else {
        setBlocks(emptyBlocks());
      }
    });
  }, [ctx]);

  const showGraph = !noUpload && file && !loading && hasGraphData(blocks);

  return (
    <section
      id="metadata-graph"
      className="scroll-mt-24 bg-elevated py-4"
      aria-labelledby="metadata-graph-heading"
    >
      <div className="mx-auto w-full max-w-content">
        <div className="flex items-center gap-2 rounded-[4px] bg-block px-4 py-3">
          <h2
            id="metadata-graph-heading"
            className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text-primary)]"
          >
            <MetadataGraphTitleIcon className="text-[#4FA4E2]" />
            {t("metadataGraph.title")}
          </h2>
        </div>
        <div
          className="overflow-hidden rounded-[4px] border-t border-[var(--color-border-subtle)]"
          style={{ height: SECTION_BODY_HEIGHT }}
        >
          {noUpload ? (
            <div
              className="flex h-full flex-col items-center justify-center bg-[var(--color-bg-block)] px-6 py-10 text-center"
              role="status"
            >
              <p className="text-base font-semibold text-[var(--color-text-secondary)]">
                {t("metadataGraph.noDataTitle")}
              </p>
              <p className="mt-2 max-w-md text-sm text-[var(--color-text-secondary)]">
                {t("metadataGraph.noDataDesc")}
              </p>
            </div>
          ) : showGraph ? (
            <MetadataDimensionGraph
              key={selectedId ?? "none"}
              blocks={blocks}
              blockList={BLOCK_IDS}
              labelForBlock={(id) => t(`metadata.${id}`)}
              imageNodeLabel={t("metadata.graphRootLabel")}
              closePanelLabel={t("metadata.graphClose")}
            />
          ) : (
            <div
              className="flex h-full items-center justify-center bg-[var(--color-bg-page)] px-6 py-8 text-center text-sm text-[var(--color-text-tertiary)]"
              role="status"
            >
              {loading ? t("metadata.loading") : t("metadataGraph.noDataTitle")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
