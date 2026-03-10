"use client";

import { useEffect, useMemo, useState } from "react";
import type { BlockId } from "@/constants/exifBlocks";
import type { BlockRows } from "@/lib/parseExif";

type BlockMeta = { id: BlockId; color: string };

export type MetadataDimensionGraphProps = {
  blocks: Record<BlockId, BlockRows>;
  blockList: BlockMeta[];
  labelForBlock: (id: BlockId) => string;
  imageNodeLabel: string;
  closePanelLabel: string;
  loading?: boolean;
  noFile?: boolean;
};

function rowsWithValue(rows: BlockRows): BlockRows {
  return rows.filter((r) => (r.value ?? "").toString().trim() !== "");
}

export default function MetadataDimensionGraph({
  blocks,
  blockList,
  labelForBlock,
  imageNodeLabel,
  closePanelLabel,
  loading,
  noFile,
}: MetadataDimensionGraphProps) {
  const dimensions = useMemo(() => {
    const out: { id: BlockId; color: string; rows: BlockRows }[] = [];
    for (const { id, color } of blockList) {
      const rows = rowsWithValue(blocks[id] ?? []);
      if (rows.length > 0) out.push({ id, color, rows });
    }
    return out;
  }, [blocks, blockList]);

  const [selectedBlockId, setSelectedBlockId] = useState<BlockId | null>(null);

  useEffect(() => {
    if (dimensions.length === 0) {
      queueMicrotask(() => setSelectedBlockId(null));
      return;
    }
    const ids = new Set(dimensions.map((d) => d.id));
    queueMicrotask(() =>
      setSelectedBlockId((prev) =>
        prev && ids.has(prev) ? prev : dimensions[0].id
      )
    );
  }, [dimensions]);

  const selectedRows = useMemo(() => {
    if (!selectedBlockId) return [];
    return rowsWithValue(blocks[selectedBlockId] ?? []);
  }, [blocks, selectedBlockId]);

  const selectedColor = useMemo(() => {
    if (!selectedBlockId) return undefined;
    return blockList.find((b) => b.id === selectedBlockId)?.color;
  }, [blockList, selectedBlockId]);

  const maxCount = useMemo(() => {
    if (dimensions.length === 0) return 1;
    return Math.max(...dimensions.map((d) => d.rows.length), 1);
  }, [dimensions]);

  if (loading || noFile || dimensions.length === 0) {
    return null;
  }

  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden rounded-[4px] border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] shadow-block">
      {/* 左侧 2/3：条形图 + 字段摘要（样式对齐 exif-graph-demos 条形图，白底） */}
      <div className="flex min-w-0 flex-[2] flex-col overflow-auto bg-white p-4">
        <div className="flex max-w-[640px] flex-col">
          {dimensions.map((dim) => {
            const count = dim.rows.length;
            const pct = (count / maxCount) * 100;
            const isSelected = selectedBlockId === dim.id;
            return (
              <button
                key={dim.id}
                type="button"
                onClick={() => setSelectedBlockId(dim.id)}
                className={`mb-3.5 w-full rounded-md px-2 py-1.5 text-left transition-colors ${
                  isSelected ? "bg-[#f3f4f6]" : ""
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-[110px] shrink-0 text-xs font-semibold"
                    style={{ color: dim.color }}
                  >
                    {labelForBlock(dim.id)}
                  </span>
                  <div className="h-[22px] min-w-0 flex-1 overflow-hidden rounded-md bg-[#e5e7eb]">
                    <div
                      className="h-full rounded-md transition-[width]"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: dim.color,
                        opacity: 0.75,
                      }}
                    />
                  </div>
                  <span className="w-7 shrink-0 text-right text-[11px] text-[#6b7280]">
                    {count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 右侧 1/3：选中维度的字段 + 值列表 */}
      <aside
        className="flex min-w-0 flex-1 flex-col border-l border-[var(--color-border-subtle)] bg-[var(--color-bg-block)]"
        style={
          selectedColor
            ? { borderLeftWidth: 3, borderLeftColor: selectedColor }
            : undefined
        }
      >
        <div className="shrink-0 border-b border-[var(--color-border-subtle)] px-3 py-2">
          <span className="text-sm font-semibold text-[var(--color-text-primary)]">
            {selectedBlockId ? labelForBlock(selectedBlockId) : ""}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 text-sm">
          {selectedRows.map(({ tag, value }) => (
            <div
              key={tag}
              className="border-b border-[var(--color-border-subtle)] py-2 last:border-b-0"
            >
              <div className="font-semibold text-[var(--color-text-tertiary)]">
                {tag}
              </div>
              <div className="mt-0.5 break-words text-[var(--color-text-primary)]">
                {value || "—"}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
