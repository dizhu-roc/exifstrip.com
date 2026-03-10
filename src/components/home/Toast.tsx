"use client";

import { useEffect } from "react";

const TOAST_DURATION_MS = 3500;

export type ToastProps = {
  message: string | null;
  onDismiss: () => void;
};

/** 浏览器右上角半透明红色背景提示，带 aria-live，自动消失 */
export default function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDismiss, TOAST_DURATION_MS);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed right-4 top-4 z-[9999] max-w-sm rounded-lg bg-red-600/90 px-4 py-3 text-sm font-medium text-white shadow-lg"
    >
      {message}
    </div>
  );
}
