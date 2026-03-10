"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

export type UploadedItem = {
  id: string;
  file: File;
  objectUrl: string;
};

const ACCEPT_MIME = [
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/webp",
  "image/avif",
  "image/heic",
  "image/heif",
].join(",");

/** 与 MIME 一起写入 input，部分浏览器对 HEIC 等仅靠 MIME 不够 */
const ACCEPT_ATTR = `${ACCEPT_MIME},.jpg,.jpeg,.png,.tif,.tiff,.webp,.avif,.heic,.heif`;

const ACCEPT_EXT = /\.(jpe?g|png|tiff?|webp|avif|heic|heif)$/i;

/** 单文件最大 20MB */
const MAX_FILE_SIZE = 20 * 1024 * 1024;

/** 单次选择/拖拽最多 10 张 */
const MAX_FILES_PER_BATCH = 10;

function isSupportedFile(file: File): boolean {
  if (file.type && ACCEPT_MIME.split(",").includes(file.type)) return true;
  if (file.name && ACCEPT_EXT.test(file.name)) return true;
  return false;
}

function filterAndCapFiles(fileList: File[]): File[] {
  const valid = fileList.filter(
    (f) => isSupportedFile(f) && f.size > 0 && f.size <= MAX_FILE_SIZE
  );
  return valid.slice(0, MAX_FILES_PER_BATCH);
}

export type UploadFilesApi = ReturnType<typeof useUploadFiles>;

export function useUploadFiles() {
  const idPrefix = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [parseErrorIds, setParseErrorIdsState] = useState<Set<string>>(new Set());

  const selectedItem =
    items.find((i) => i.id === selectedId) ?? items[0] ?? null; // 默认选中列表第一张 items[0]

  const appendFiles = useCallback((fileList: FileList | File[]) => {
    const files = filterAndCapFiles(Array.from(fileList));
    if (files.length === 0) return;
    const newItems: UploadedItem[] = files.map((file, i) => ({
      id: `${idPrefix}-${Date.now()}-${i}`,
      file,
      objectUrl: URL.createObjectURL(file),
    }));
    setItems((prev) => {
      const next = [...prev, ...newItems];
      return next;
    });
    // 与 setItems 同批更新 selectedId，保证首张选中且 EXIF 加载 effect 能立即拿到 file
    if (newItems.length > 0) setSelectedId(newItems[0].id);
  }, [idPrefix]);

  const clear = useCallback(() => {
    setItems((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.objectUrl));
      return [];
    });
    setSelectedId(null);
    setParseErrorIdsState(new Set());
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      setSelectedId((sel) => {
        if (!sel || items.some((i) => i.id === sel)) return sel;
        return items[0]?.id ?? null;
      });
      setParseErrorIdsState((prev) => {
        const ids = new Set(items.map((i) => i.id));
        return new Set([...prev].filter((id) => ids.has(id)));
      });
    });
  }, [items]);

  const setParseError = useCallback((id: string, hasError: boolean) => {
    setParseErrorIdsState((prev) => {
      const next = new Set(prev);
      if (hasError) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
    return () => {
      itemsRef.current.forEach((p) => URL.revokeObjectURL(p.objectUrl));
    };
  }, [items]);

  const openPicker = useCallback(() => inputRef.current?.click(), []);

  const replaceOnNextSelectRef = useRef(false);
  const openPickerForReplaceOrAdd = useCallback(() => {
    replaceOnNextSelectRef.current = itemsRef.current.length > 0;
    inputRef.current?.click();
  }, []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const list = e.target.files;
      if (!list?.length) {
        e.target.value = "";
        return;
      }
      if (replaceOnNextSelectRef.current) {
        replaceOnNextSelectRef.current = false;
        const files = filterAndCapFiles(Array.from(list));
        if (files.length > 0) {
          const newItems: UploadedItem[] = files.map((file, i) => ({
            id: `${idPrefix}-${Date.now()}-${i}`,
            file,
            objectUrl: URL.createObjectURL(file),
          }));
          setItems((prev) => {
            prev.forEach((p) => URL.revokeObjectURL(p.objectUrl));
            return newItems;
          });
          setSelectedId(newItems[0].id);
          setParseErrorIdsState(new Set());
        }
      } else {
        appendFiles(list);
      }
      e.target.value = "";
    },
    [appendFiles, idPrefix]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const list = e.dataTransfer.files;
      if (list?.length) appendFiles(list);
    },
    [appendFiles]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setDragActive(false);
  }, []);

  return {
    inputRef,
    accept: ACCEPT_ATTR,
    items,
    selectedId,
    setSelectedId,
    selectedItem,
    dragActive,
    openPicker,
    openPickerForReplaceOrAdd,
    onInputChange,
    onDrop,
    onDragOver,
    onDragLeave,
    clear,
    parseErrorIds,
    setParseError,
  };
}
