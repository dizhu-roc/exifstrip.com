# 视觉与设计 Token

> 白灰主色 + 区块彩色图标标题；圆角 2px / 4px。实现时以 CSS 变量或设计 token 落地，与《EXIF 维度解析与字段说明》中区块及风险色相一致。

---

## 一、设计原则

- **主色**：白与灰，界面以中性色为主。
- **区块标题**：每个区块使用 **彩色 icon + 文案** 作为标题，图标色与区块语义对应。
- **圆角**：区块、按钮、输入框等保持 **2px 或 4px**，不采用大圆角。

---

## 二、中性色（白与灰）

### 2.1 背景与表面

| Token 名称 | 建议值 | 用途 |
|------------|--------|------|
| `--color-bg-page` | `#ffffff` | 页面主背景 |
| `--color-bg-elevated` | `#fafafa` | 抬升表面（如整块面板背景） |
| `--color-bg-block` | `#ffffff` | 区块内容区背景 |
| `--color-bg-hover` | `#f5f5f5` | 列表行 / 可点击区 hover |
| `--color-bg-active` | `#eeeeee` | 按下或选中态 |

### 2.2 边框

| Token 名称 | 建议值 | 用途 |
|------------|--------|------|
| `--color-border-subtle` | `#f0f0f0` | 轻分割线、区块内分隔 |
| `--color-border-default` | `#e5e5e5` | 默认边框（输入框、卡片轮廓） |
| `--color-border-strong` | `#d0d0d0` | 强调边框、聚焦轮廓 |

### 2.3 文字

| Token 名称 | 建议值 | 用途 |
|------------|--------|------|
| `--color-text-primary` | `#1a1a1a` | 主标题、主要正文 |
| `--color-text-secondary` | `#525252` | 次要说明、字段标签 |
| `--color-text-tertiary` | `#737373` | 占位符、辅助信息、时间戳 |
| `--color-text-disabled` | `#a3a3a3` | 禁用态文案 |
| `--color-text-inverse` | `#ffffff` | 深色背景上的文字（如主按钮） |

### 2.4 功能色（仅必要处）

| Token 名称 | 建议值 | 用途 |
|------------|--------|------|
| `--color-link` | `#2563eb` | 链接默认 |
| `--color-link-hover` | `#1d4ed8` | 链接 hover |
| `--color-focus-ring` | `#2563eb` | 聚焦环（与链接同系，保持统一） |
| `--color-error` | `#dc2626` | 错误提示、校验失败 |
| `--color-success` | `#16a34a` | 成功态（如导出成功） |

---

## 三、区块标题图标色（彩色 icon + 文案）

与《EXIF 维度解析与字段说明》中 **BLOCK_ORDER** 及 blockId 对应，每个区块标题使用 **图标色 + 文案**，图标采用下表颜色。

| blockId | Token 名称 | 建议值 | 语义 |
|---------|-------------|--------|------|
| device | `--color-block-device` | `#0ea5e9` | 设备 / 相机，偏蓝 |
| imageSettings | `--color-block-image-settings` | `#8b5cf6` | 拍摄参数，偏紫 |
| location | `--color-block-location` | `#059669` | GPS / 位置，绿 |
| dateTime | `--color-block-datetime` | `#d97706` | 时间，琥珀 |
| other | `--color-block-other` | `#b45309` | 作者/版权，深琥珀 |
| image | `--color-block-image` | `#64748b` | 图像属性，灰蓝 |
| icc | `--color-block-icc` | `#475569` | ICC，中性灰 |

- **用法**：区块标题左侧（或前）icon 使用对应 `--color-block-*`；文案使用 `--color-text-primary`，与《字体与字号规范》中区块标题 H1 Semibold 一致。
- 若某区块需同时展示**风险边框**，边框色用第四节「风险色相」，图标色仍用上表，二者可并存（图标表语义，边框表风险）。

---

## 四、风险色相（区块边框等）

与《EXIF 维度解析与字段说明》中 **getBlockRiskLevel** 一致：用于区块左边框或整框描边，表示该区块数据风险等级。

| 等级 | Token 名称 | 建议值 | 用途 |
|------|-------------|--------|------|
| high | `--color-risk-high` | `#dc2626` | 高风险（如 GPS） |
| medium | `--color-risk-medium` | `#ea580c` | 中风险（如设备、身份） |
| low | `--color-risk-low` | `#ca8a04` | 低风险（如时间） |
| safe | `--color-risk-safe` | `#16a34a` | 安全 |

- 仅在有数据且需展示风险时使用；无数据或无需风险提示的区块可用默认边框 `--color-border-default`。

---

## 五、圆角（Radius）

| Token 名称 | 值 | 用途 |
|------------|-----|------|
| `--radius-sm` | `2px` | 小控件：标签、徽标、小按钮 |
| `--radius-md` | `4px` | 区块、卡片、主按钮、输入框、下拉框 |

- 不引入更大圆角（如 8px、12px），保持 2px / 4px 的克制风格。

---

## 六、间距（Spacing）

与区块、按钮等配合使用，保证视觉节奏一致。

| Token 名称 | 值 | 用途 |
|------------|-----|------|
| `--space-1` | `4px` | 紧凑间距、图标与文案间距 |
| `--space-2` | `8px` | 字段间、表单项内 |
| `--space-3` | `12px` | 区块内边距、列表项间距 |
| `--space-4` | `16px` | 区块内边距、区块间 |
| `--space-5` | `24px` | 区块与区块、大组间距 |
| `--space-6` | `32px` | 页面级留白 |

- 区块内边距建议：`--space-3` 或 `--space-4`；区块标题（icon + 文案）与内容间距建议 `--space-2` 或 `--space-3`。

---

## 七、阴影（可选）

若需轻微层次，仅用轻阴影，不喧宾夺主。

| Token 名称 | 值 | 用途 |
|------------|-----|------|
| `--shadow-block` | `0 1px 2px rgba(0,0,0,0.04)` | 区块/卡片 |
| `--shadow-button` | `0 1px 2px rgba(0,0,0,0.06)` | 主按钮（可选） |

---

## 八、组件约定摘要

| 组件 | 背景 | 边框 | 圆角 | 标题/图标 |
|------|------|------|------|-----------|
| 页面 | `--color-bg-page` | — | — | — |
| 右侧 EXIF 面板 | `--color-bg-elevated` | `--color-border-subtle` | — | — |
| 单个 EXIF 区块 | `--color-bg-block` | `--color-border-default` 或风险色 | `--radius-md` (4px) | 彩色 icon `--color-block-*` + 文案 |
| 主按钮 | 主色或 `--color-link` | 无或同背景 | `--radius-md` (4px) | — |
| 次要按钮 | `--color-bg-elevated` | `--color-border-default` | `--radius-md` (4px) | — |
| 输入框 / 下拉 | `--color-bg-page` | `--color-border-default` | `--radius-md` (4px) | — |
| 小标签/徽标 | 视语义 | 可选 | `--radius-sm` (2px) | — |
| 上传区（空状态） | `--color-bg-elevated` | `--color-border-default` | `--radius-md` (4px) | 空状态文案见 PRD 2.6 |
| 图片列表项 / 选中态 | 默认 `--color-bg-block`，选中 `--color-bg-active` 或边框强调 | `--color-border-default`，选中可用 `--color-border-strong` 或区块色 | `--radius-md` | — |
| 语言切换器（导航栏右） | 同导航栏 | — | `--radius-md`（下拉） | Globe 图标 + 下拉，见 PRD 2.7 |

---

## 九、图标体系

- **图标库**：**Iconify**（或兼容 Iconify 的集成的图标集）。
- **使用方式**：图标**保存到本地**（打包进项目或构建时拉取），**不使用**运行时从 Iconify 在线 API 实时加载的形式，以保证离线可用与加载稳定。
- **区块标题图标**：与第三节「区块标题图标色」配合，每个 blockId 使用对应 `--color-block-*` 作为图标颜色；图标尺寸与区块标题（H1）搭配，建议与字号协调（如 24px 或 1.5rem）。
- **其他图标**：如导航栏 Globe、上传区、按钮等，可统一使用同一套 Iconify 图标集，风格一致（如均为线性或均为填充，由设计定）。

---

## 十、响应式与断点

- **版心**：设计基准 1200px；小屏下版心可为 100% 或保留左右边距（如 `max-width: 1200px; margin: 0 auto`）。
- **断点**：以视口宽度（width）为基准，建议三档，与常见设备对齐：

| 断点名称 | 范围 | 说明 |
|----------|------|------|
| **desktop** | ≥1200px | 标准桌面，版心 1200px 居中；上传区与 GPS、卡片等按设计稿多列/并排。 |
| **tablet** | 768px ~ 1199px | 平板或小桌面；版心可 100% 或略窄；上传区与 GPS 可左右并排或上下堆叠；网站介绍/卡片可 2 列；Metadata 区域保持横向滑动 + 区块内纵向滚动。 |
| **mobile** | &lt;768px | 竖屏窄屏（大屏手机/小平板）；单列布局；导航栏可收缩（如汉堡菜单）；上传区与 GPS 上下堆叠；Metadata 仍可横向滑动（触屏友好）；卡片、Full EXIF 表、隐私介绍单列；表格可横向滚动。 |

- **实现约定**：
  - 使用 **min-width** 做 mobile-first，或 **max-width** 做 desktop-first，团队统一其一即可。
  - Token 建议：`--bp-desktop: 1200px`、`--bp-tablet: 768px`（或 `--bp-mobile-max: 767px`），便于媒体查询与 JS 判断。
- **可选**：若仅支持「PC + 触屏」、不强调手机竖屏，可只做 **desktop** 与 **tablet** 两档，&lt;768px 时仍用 tablet 布局或提示「建议使用更大屏幕」。

---

## 十一、待补充的 Token / 组件（与「产品需求文档」六补对应）

以下在实现时建议补全，避免视觉不统一。

| 类别 | 建议补充的 Token 或约定 |
|------|--------------------------|
| **上传区** | 拖拽 over 态背景/边框；禁用态（不支持格式时）；其余见上方组件约定与 PRD 2.6 |
| **图片列表 / 选中态** | 见上方组件约定「图片列表项 / 选中态」；多张时竖排、缩略图+文件名见 PRD 2.6 |
| **主图预览区** | 预览区背景、边框（可与 `--color-border-subtle` 一致）、圆角 |
| **加载态** | 遮罩背景色、Spinner 颜色（可与 `--color-text-tertiary` 或主色一致） |
| **弹层 / Modal** | 遮罩色（如 `rgba(0,0,0,0.4)`）、弹层背景、圆角 `--radius-md`、阴影 |
| **Toast / 行内错误** | 错误提示背景（浅红或白+左边框 `--color-error`）、成功提示背景 |
| **按钮：危险操作** | 危险主按钮背景/边框（如 `--color-error`）、hover 加深 |
| **按钮 / 输入：禁用态** | 背景 `--color-bg-elevated` 或更浅、边框 `--color-border-subtle`、文字 `--color-text-disabled`、`cursor: not-allowed` |
| **语言切换器** | 见上方组件约定及 PRD 2.7（导航栏右侧、Globe + 下拉）；字号可复用 Small、`--color-text-secondary` |

---

## 十二、与现有文档的对应关系

- **区块 blockId**：与《EXIF 维度解析与字段说明》中 **BLOCK_TITLE_KEYS、BLOCK_ORDER** 一致；图标色见第三节。
- **风险等级与色相**：与同文档 **getBlockRiskLevel**、区块边框色一致；Token 见第四节。
- **字体与字号**：区块标题、字段标签与值等沿用《字体与字号规范》，本文档不重复字号/字重。

---

## 十三、实现建议

- 在全局 CSS 或主题文件中定义上述 `--color-*`、`--radius-*`、`--space-*`、`--shadow-*`，组件通过变量引用。
- 若使用 Tailwind：在 `theme.extend` 中映射上述 token，例如 `colors.bg.page`、`colors.block.device`、`borderRadius.md`、`spacing` 等。
- 暗色模式若后续支持，可在此文档增加 `*-dark` 变量表，与当前亮色 token 一一对应。
