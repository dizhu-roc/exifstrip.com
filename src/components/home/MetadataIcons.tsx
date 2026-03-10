"use client";

import type { BlockId } from "@/constants/exifBlocks";

const ICON_BOX = "h-4 w-4 shrink-0";
const SECTION_ICON_BOX = "h-6 w-6 shrink-0";

/** 网站介绍卡片标题前：小圆点/信息感 */
export function IntroCardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

/** Graph 区块标题：节点连线/关系图 */
export function MetadataGraphTitleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`${SECTION_ICON_BOX} ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="5" cy="8" r="2" fill="currentColor" />
      <circle cx="19" cy="8" r="2" fill="currentColor" />
      <circle cx="7" cy="17" r="2" fill="currentColor" />
      <circle cx="17" cy="17" r="2" fill="currentColor" />
      <path d="M6.5 9.2L10 11M17.5 9.2L14 11M9 13.5l-1.5 2.5M15 13.5l1.5 2.5" />
    </svg>
  );
}

/** EXIF 参考表区块标题：实体表格（表头+行） */
export function ExifTableTitleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`${SECTION_ICON_BOX} ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4 4h16v5H4V4zm0 7h16v4H4v-4zm0 6h16v4H4v-4z" />
    </svg>
  );
}

/** Metadata 区块标题前：实体层叠/数据感，单色 */
export function MetadataTitleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`${SECTION_ICON_BOX} ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2H4V6zm0 4h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8zm3 2v6h10v-6H7z" />
    </svg>
  );
}

/** 各维度实体图标，fill 用 currentColor，外层设 color 为 block 色相 */
function IconWrap({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span className={ICON_BOX} style={{ color }} aria-hidden>
      {children}
    </span>
  );
}

export function BlockDimensionIcon({
  blockId,
  color,
}: {
  blockId: BlockId;
  color: string;
}) {
  switch (blockId) {
    case "device":
      return (
        <IconWrap color={color}>
          <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 4L7.17 6H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-3.17L15 4H9zm3 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
          </svg>
        </IconWrap>
      );
    case "imageSettings":
      return (
        <IconWrap color={color}>
          <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 6h16v3H4V6zm0 7h10v3H4v-3zm0 7h14v3H4v-3z" />
          </svg>
        </IconWrap>
      );
    case "location":
      return (
        <IconWrap color={color}>
          <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </IconWrap>
      );
    case "dateTime":
      return (
        <IconWrap color={color}>
          <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
          </svg>
        </IconWrap>
      );
    case "other":
      return (
        <IconWrap color={color}>
          <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 12h8v2H8v-2zm0 4h8v2H8v-2z" />
          </svg>
        </IconWrap>
      );
    case "image":
      return (
        <IconWrap color={color}>
          <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        </IconWrap>
      );
    case "icc":
      return (
        <IconWrap color={color}>
          <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5 16 5.67 16 6.5 15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
        </IconWrap>
      );
    default:
      return (
        <IconWrap color={color}>
          <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          </svg>
        </IconWrap>
      );
  }
}

/** 实体铅笔，无背景；颜色由父级 text-* 或 style 控制 */
export function EditIconSolid({ className }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}

/** 实体垃圾桶，无背景；颜色由父级控制，建议红色 */
export function DeleteIconSolid({ className }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  );
}

const BTN_ICON = "h-4 w-4 shrink-0";

/** 导出 EXIF：向下箭头 + 底边横线，通用下载符号 */
export function ExportExifIcon({ className }: { className?: string }) {
  return (
    <svg className={`${BTN_ICON} ${className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 5v10" />
      <path d="M8 11l4 4 4-4" />
      <path d="M4 19h16" />
    </svg>
  );
}

/** 清理预设：橡皮擦块（梯形，上窄下宽） */
export function CleanPresetIcon({ className }: { className?: string }) {
  return (
    <svg className={`${BTN_ICON} ${className ?? ""}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 6h10l-2 12H9L7 6z" />
    </svg>
  );
}

/** 下载清理后图片：向下箭头入托盘 */
export function DownloadFileIcon({ className }: { className?: string }) {
  return (
    <svg className={`${BTN_ICON} ${className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

/** 下拉小三角 */
export function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={`h-3 w-3 shrink-0 ${className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/** 保存：勾选 */
export function SaveIcon({ className }: { className?: string }) {
  return (
    <svg className={`${BTN_ICON} ${className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/** 取消：叉 */
export function CancelIcon({ className }: { className?: string }) {
  return (
    <svg className={`${BTN_ICON} ${className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

/** Privacy 区块标题：盾牌/隐私（实体） */
export function PrivacyTitleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`${SECTION_ICON_BOX} ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
    </svg>
  );
}

/** FAQ 区块标题：问号/帮助（实体） */
export function FaqTitleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`${SECTION_ICON_BOX} ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.12-2.79l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </svg>
  );
}

/** 底部栏：X (Twitter) 图标 */
export function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** 底部栏：GitHub 图标 */
export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}
