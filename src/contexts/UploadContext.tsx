"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { UploadedItem } from "@/components/home/useUploadFiles";
import type { ExifTags } from "@/lib/parseExif";

export type ExifResult = { ok: true; tags: ExifTags } | { ok: false } | null;

/** 解析时保存的经纬度全精度，供编辑时「前 6 位 + 原始第 7 位及以后」拼接用，尾数永远来自此份 */
export type OriginalGpsFull = { lat: string | null; lng: string | null } | null;

type UploadContextValue = {
  items: UploadedItem[];
  selectedId: string | null;
  setSelectedId: (id: string) => void;
  selectedItem: UploadedItem | null;
  parseErrorIds: Set<string>;
  setParseError: (id: string, hasError: boolean) => void;
  exifResult: ExifResult;
  exifLoading: boolean;
  /** 当前文件解析时保存的经纬度全精度，多次编辑均用此尾数 */
  originalGpsFull: OriginalGpsFull;
};

const UploadContext = createContext<UploadContextValue | null>(null);

export function UploadProvider({
  items,
  selectedId,
  setSelectedId,
  parseErrorIds,
  setParseError,
  exifResult,
  exifLoading,
  originalGpsFull,
  children,
}: {
  items: UploadedItem[];
  selectedId: string | null;
  setSelectedId: (id: string) => void;
  parseErrorIds: Set<string>;
  setParseError: (id: string, hasError: boolean) => void;
  exifResult: ExifResult;
  exifLoading: boolean;
  originalGpsFull: OriginalGpsFull;
  children: ReactNode;
}) {
  const selectedItem =
    items.find((i) => i.id === selectedId) ?? items[0] ?? null;

  const value = useMemo(
    () => ({
      items,
      selectedId,
      setSelectedId,
      selectedItem,
      parseErrorIds,
      setParseError,
      exifResult,
      exifLoading,
      originalGpsFull,
    }),
    [
      items,
      selectedId,
      setSelectedId,
      selectedItem,
      parseErrorIds,
      setParseError,
      exifResult,
      exifLoading,
      originalGpsFull,
    ]
  );

  return (
    <UploadContext.Provider value={value}>{children}</UploadContext.Provider>
  );
}

export function useUploadContext(): UploadContextValue | null {
  return useContext(UploadContext);
}
