# GSC 查询词 → 博文 / 百科选题与大纲（规划稿）

> 依据 GSC 中出现的英文查询词整理；**仅选题与大纲**；新建条目落地时同步更新 `guidesStructure.ts` / `blogStructure.ts` 与 [`百科与博客增补规划.md`](./百科与博客增补规划.md)。  
> 写作语言建议以**英文正文为主**（与 [`SEO关键词规划.md`](./SEO关键词规划.md) 一致），中/日可作为站内翻译。

### 与 Google 搜索 / GSC 相关的阅读方式（审计用）

以下**不是** Google 的「官方排名公式」，而是结合 [Google 搜索中心](https://developers.google.com/search/docs) 与 Search Console 常见用法、用于**自查归类与缺口**时的惯例：

- **GSC「查询」是用户实际输入的集合**：同一意图会有大量变体（大小写、介词、语序）；**不必**为每个变体各建一页，应以**意图簇**规划落地页（与 Google 对「有用内容」的表述一致：满足主题，而非机械堆词）。
- **意图粗分**：**信息型**（what is / difference / meaning）→ 百科、长文；**工具型**（remove / strip / online tool）→ 首页、`how-to`、博客技巧；**对比/命令型**（exiftool flags）→ 博客专题。归类错误常见表现：把**强工具意图**只放在百科定义页，或把**定义型问句**只塞在工具页首段而无对应百科。
- **同一 URL 多语言**：若未做 `hreflang` 与分语言 URL，GSC 中**英文查询**与**默认索引语言**可能不一致；本表仍以**英文意图簇**为主（与 [`SEO关键词规划.md`](./SEO关键词规划.md) 一致）。
- **「strip data」类泛词**：单独出现时可能指非图像场景（日志脱敏、表格等），在 GSC 中宜看**着陆页**是否与图片元数据一致；内容侧应优先对齐 **strip metadata / strip photo metadata**，并在文中写明范围，避免误归类为「全站唯一主题词」。

---

## 状态图例

| 标记 | 含义 |
|------|------|
| **✅ 已落地** | 独立 slug 已存在，或本轮已明确完成「独立篇」级内容 |
| **🔄 部分达成** | 核心关键词/段落已写入**现有**百科或博客（on-page 补强），**独立 slug 未建** |
| **⏳ 未开始** | 尚未写作或未进 `src/locales` |

**说明（2026-04 对齐仓库现状）**：第一节「对照表」与若干百科/博客已做 **🔄 部分达成** 的文案与 SEO meta 补强；第二节 **A/B/C 独立篇均未新建 slug**。下文第二节在原有 A–C 基础上，**补充多条与 [`guides/tag-reference`](/guides/tag-reference) 及 `src/data/exifReferenceTable.ts` 字段对齐的 tag 专题**，并标注**权重可能性**（相对站内摄影/隐私检索意图，非 Google 官方分数）。

---

## 一、与现有内容的对照（优先补强而非新开）

| 查询意图（示例词） | 站内已有承载 | 建议动作 | 状态 |
|--------------------|--------------|----------|------|
| what is exif / meaning / format / information | Guides：`what-is-exif`、`exif-structure` | 标题与首段覆盖问句变体；FAQ 可链百科 | **🔄 部分达成**（`what-is-exif` 等已补强） |
| remove exif / stripping / delete / scrubber / deleter | Guides：`how-to-edit-strip`；Blog：PNG/HEIC 技巧 | 独立工具向文或 how-to 内 H2 | **✅ 已达成**（同义段 + **strip data** 歧义短节，三语） |
| iptc vs exif | Guides：`iptc-xmp-overview` | H2 对比表 + meta | **✅ 已达成**（IPTC 表 + **XMP vs EXIF** H2，`guideSeo`） |
| online exiftool / exiftool online | Blog：`topic-exiftool-vs-online` | FAQ 式小标题 | **🔄 部分达成**（已增「非 ExifTool 本体」段） |
| does X (Twitter) strip EXIF | Blog：`topic-platform-strip`；FAQ：`faq-social-network` | X 专段 + 日期注记 | **🔄 部分达成**（博客 + FAQ + `faq-social-network`） |
| exif gps | Guides：`dimension-location` | 首段 *EXIF GPS*、内链敏感字段 | **🔄 部分达成**（含 GPSAltitudeRef 专段） |
| exif specification / standards | Guides：`standards-links`、`tag-reference` | 规范导读独立篇或继续补强 | **🔄 部分达成**（`standards-links` 已增「规范 vs JPEG 内 EXIF」） |
| view EXIF / EXIF viewer / view EXIF online | Guides：`how-to-view`；首页功能 | 首段与 meta 含 *viewer*、*read EXIF*；与「工具型」共用落地 | **✅ 已达成**（首段 + `guideSeo`：*free online EXIF viewer* 等） |
| Meta / Instagram / Facebook 与 EXIF | Blog：`topic-platform-strip`；`faq-social-network` | 与 X 同属「平台是否 strip」簇，勿只绑 X 一文 | **🔄 部分达成**（博客正文含 Meta；**归类注意**：勿与「仅 X」行互斥，应视为**同一意图簇**） |
| XMP only / remove XMP vs EXIF | Guides：`iptc-xmp-overview`；`topic-exif-vs-metadata` | 首轮仅有 *iptc vs exif*；**XMP 单独检索**宜在 iptc-xmp 文内增加 H2 或同义词 | **✅ 已达成**（`iptc-xmp-overview` 内 **XMP vs EXIF** H2 + 表；博客增速览；`blogSeo`；*remove XMP* 仍以工具说明为准、未单开 slug） |
| HEIC / WebP / PNG 元数据 | Blog：`tip-remove-exif-heic-iphone`、`tip-remove-exif-png`；`product-supported-formats` | 与「strip metadata from jpg」并列的工具向簇 | **✅ 已落地**（博客与产品文）；**归类注意**：勿只归入 JPEG 博客 **E** |

---

## 二、新建百科（Guides）建议

### 2.1 原规划条目 A–C（概念/单点）

| ID | 建议 slug | 英文 SEO 标题（示例） | 覆盖关键词（示例） | 状态 |
|----|-----------|------------------------|----------------------|------|
| **A** | `exif-specification-overview`（或与 `standards-links` 二选一） | *EXIF specification: official sources and how to read them* | exif specification、jpeg exif format | **⏳ 未开始**（独立篇）；**🔄** `standards-links` 已部分覆盖 |
| **B** | `exif-version-0220-0221` | *EXIF version 0220 vs 0221: what ExifVersion means* | exif version、exif 0220、exif version 0221 | **⏳ 未开始** |
| **C** | `gps-altituderef-explained` | *GPSAltitudeRef in EXIF: sea level above or below?* | gpsaltituderef、exif gps | **⏳ 未开始**（独立篇）；**🔄** `dimension-location` + `tag-reference` 已含 GPSAltitudeRef |

**原 A 大纲摘要**：CIPA/JEITA 文档层级 → JPEG APP1 位置 → 链 `exif-structure`、`iptc-xmp-overview` → 本站边界 → 外链。  
**原 B 大纲摘要**：`ExifVersion` 四字符 → 0220/0221/0231 等表（以规范为准）→ 固件/软件写入 → 剥离后是否保留 → 站内查看路径。  
**原 C 大纲摘要**：参考面 → 0/1 → 与 `GPSAltitude` 配对 → 隐私 → 预设说明。

---

### 2.2 新增：高权重潜力 **tag-reference 对齐** 专题（优先队列）

下列条目均可在正文内用 **「Tag → IFD → 与 `tag-reference` 表一致」** 写法，并互链到 [`/guides/tag-reference`](/guides/tag-reference) 与对应维度百科（`dimension-*`）。**权重可能性**为站内选题优先级（长尾问句 + 与表字段一致 = 易做精选摘要与内链）。

| 优先级 | 建议 slug | 主标签（`exifReferenceTable` / 速查表） | 英文标题方向（SEO） | 权重可能性 | 备注 |
|--------|-----------|----------------------------------------|------------------------|------------|------|
| P1 | `exif-datetimeoriginal-vs-datetime` | `DateTimeOriginal`、`DateTime`、`DateTimeDigitized` | *DateTimeOriginal vs DateTime in EXIF: what’s the difference?* | **高** | 极强问答意图；与 [`dimension-datetime`](/guides/dimension-datetime) 互补，避免重复可写「对照表 + 常见误解」 |
| P1 | `exifversion-flashpixversion-explained` | `ExifVersion`、`FlashPixVersion` | *ExifVersion 0220, 0221, 0231 and FlashPixVersion explained* | **高** | 与上节 **B** 合并为一篇即可，避免两篇抢同一批词 |
| P1 | `exif-aperture-shutter-iso-tags` | `FNumber`、`ExposureTime`、`ISOSpeedRatings`、`ExposureBiasValue` | *FNumber, ExposureTime, ISO in EXIF (aperture & shutter metadata)* | **高** | 承接 *aperture*、*shutter*、相机参数类检索；链 [`dimension-settings`](/guides/dimension-settings) |
| P2 | `gps-latitude-longitude-ref-tags` | `GPSLatitudeRef`、`GPSLongitudeRef`、`GPSLatitude`、`GPSLongitude` | *GPSLatitudeRef and GPSLongitudeRef: N/S and E/W in EXIF GPS* | **中高** | 与 **C**（AltitudeRef）成套；可一篇「GPS 参考类标签」或拆两篇 |
| P2 | `exif-orientation-values-1-8` | `Orientation` | *EXIF Orientation values 1–8 explained* | **中** | 与已有 [`orientation-tag-explained`](/guides/orientation-tag-explained) **高度重叠** → 建议 **不新建**，仅加强现文 H2「1–8 表」与 *orientation exif* 关键词 |
| P2 | `exif-flash-tag-bitmask` | `Flash` | *EXIF Flash tag: bitmask and fired / return / mode* | **中** | 技术向长尾；链 `dimension-settings` |
| P3 | `exif-usercomment-encoding` | `UserComment` | *EXIF UserComment: character code and UNICODE* | **中低** | 开发者/修图人群；链 [`dimension-other`](/guides/dimension-other) |
| P3 | `exif-colorspace-srgb-adobe` | `ColorSpace` | *EXIF ColorSpace: sRGB vs Adobe RGB (tag meaning)* | **中** | 与 [`dimension-image`](/guides/dimension-image) 互补 |
| P3 | `serial-tags-body-camera-exif` | `BodySerialNumber`、`CameraSerialNumber` | *BodySerialNumber and CameraSerialNumber in EXIF (privacy)* | **中高** | 隐私检索；链 [`sensitive-fields`](/guides/sensitive-fields)、[`dimension-device`](/guides/dimension-device) |

**落地建议**

- **P1 三篇**（日期对照、版本号、光圈快门 ISO）与 GSC「*what is / difference / exif 0220*」类查询重合度最高，建议作为 **第二节之后的首批独立百科**。  
- **B** 与 **`exifversion-flashpixversion-explained`** 合并为 **一篇** 即可。  
- **C** 与 **`gps-latitude-longitude-ref-tags` / `gps-altituderef`** 可合并为 **一篇「EXIF GPS 参考标签」**（AltitudeRef + Lat/Lon Ref 一节），减少碎片化。  
- **`orientation`**：**不新起 slug**，强化现有 `orientation-tag-explained`。

---

## 三、新建博客（Blog）建议

| ID | 建议 slug | 英文 SEO 标题（示例） | 状态 |
|----|-----------|------------------------|------|
| **D** | `topic-exiftool-all-vs-allall` | *ExifTool \`-all=\` vs \`-all:all=\`: difference explained* | **⏳ 未开始** |
| **E** | `tip-strip-metadata-from-jpeg` | *Strip metadata from JPEG: EXIF, IPTC, XMP, and quality* | **⏳ 未开始** |
| **F** | `topic-exif-deleter-scrubber-wording` | *EXIF deleter vs scrubber vs stripper: naming and risks* | **⏳ 未开始**（与 `how-to-edit-strip` 有重叠，可降优先） |
| **G** | `tip-exift-typo-exiftool` | *“Exift” search results: did you mean ExifTool?* | **⏳ 未开始** |

---

## 四、不建议单独成篇的查询

| 查询 | 理由 | 替代 |
|------|------|------|
| aperture inurl:blog | 含 `inurl:` 的搜索语法 + 摄影词，**不是**用户自然口语查询；与工具站主意图弱相关 | 不单独跟；摄影向长线可选；技术向并入 **P1 `exif-aperture-shutter-iso-tags`**（*aperture in EXIF / FNumber*） |
| what is exif（及大量同义问句） | 已有 `what-is-exif` | 继续 on-page；**🔄 已部分达成** |
| strip data（单独出现、无 image/photo/metadata） | **歧义极高**（可指通用「删数据」） | 仅在落地页用 **strip metadata / strip photo metadata** 对齐；见 **§八 簇 4** |

---

## 五、落地优先级（更新）

1. **高**：博客 **D**、**E**（ExifTool 参数、JPEG 剥离实操）— 与 GSC 技术/工具意图重合度高。  
2. **高**：百科 **P1**（`DateTimeOriginal` 对照、`ExifVersion`/0220/0221、`FNumber`/快门/ISO）— **tag-reference 对齐**，易占「difference / what is」类摘要。  
3. **中**：合并后的 **GPS 参考标签篇**（含 AltitudeRef + Lat/Lon Ref；原 **C**）、**A**（或维持仅 `standards-links` 补强）。  
4. **中**：**Flash**、**ColorSpace**、**序列号** 单篇或并入隐私/设备维度。  
5. **低**：博客 **F**、**G**；百科 **UserComment**。

---

## 六、每篇通用检查（发布前）

- Title / description 含主关键词的自然变体  
- 首屏 1–2 句直接回答问题（利于 CTR 与精选摘要）  
- 正文标注 **Tag 名** 并与 [`/guides/tag-reference`](/guides/tag-reference) 互链  
- 涉及 ExifTool / 规范处附外链与「以官方为准」表述  

---

## 七、维护记录

| 日期 | 说明 |
|------|------|
| 2026-04 | 第一节多行 **🔄 部分达成**；第二节 A/B/C 独立篇 **⏳**；新增 **2.2 tag-reference 对齐专题表** 与优先级；第三至五节状态列更新。 |
| 2026-04 | **§八 GSC 覆盖审计**：对照首轮查询词归簇；补充 Google/GSC 阅读说明；修正平台类（X vs Meta）与 *strip data* 歧义；补 **viewer/XMP/监控词** 缺口说明。 |
| 2026-04-15 | 闭环 **§一** 若干 🔄：`how-to-view` / `exif-structure` / `orientation-tag-explained` / `how-to-edit-strip` / `iptc-xmp-overview` / `topic-exif-vs-metadata` 三语 on-page；`guideSeo`・`blogSeo` 更新；`/faq` **FAQPage JSON-LD** 扩展为与页面 17 问一致的 `mainEntity`（英文）。 |

---

## 八、GSC 查询词覆盖审计（对照首轮导出词表）

下列将**首轮对话中出现的英文查询**归为 **意图簇**，并标注与本文档章节之对应及**遗漏/归类修正**。若 GSC 后续导出增删查询，应以此表为模板**整簇更新**，而非逐词追加。

| 簇编号 | 意图簇（示例词） | 文档中的承载/章节 | 状态与说明 |
|--------|------------------|---------------------|------------|
| 1 | **定义/科普**：what is exif, what is an exif, what does exif mean, exif meaning, what is exif information, what is exif format, exif format | §一 → `what-is-exif`、`exif-structure` | **🔄**（`exif-structure` 已增 *jpeg exif format* / APP1 开篇）；勿与「工具型」混为一谈 |
| 2 | **规范/格式**：exif specification, jpeg exif format, exif version, exif 0220, exif version 0221 | §一、§二 **A/B**、**P1 ExifVersion** | **🔄 + ⏳**；版本号长尾宜独立篇或合并 **B+P1** |
| 3 | **删除/剥离（工具）**：remove exif, remove exif data, removing exif data, exif delete, delete exif, exif stripping, stripping exif data, exif data remove, strip photo metadata, remove metadata from images, exif scrubber, exif deleter | §一 → `how-to-edit-strip`；博客 **E**、**F** | **🔄**；**F** 与 how-to 重叠已在 §五 降级 |
| 4 | **泛词需限定**：strip data | §四、本节、`how-to-edit-strip` | **on-page**：`how-to-edit-strip` 已加「strip data」歧义短节（三语），引导至 strip photo metadata；GSC 仍可能混入非图片噪声 |
| 5 | **命令/对比**：exiftool -all= vs -all:all=, …difference, exiftool online, online exiftool | §一、博客 **D**、`topic-exiftool-vs-online` | **🔄 + ⏳ D** |
| 6 | **拼写/品牌**：exift | 博客 **G** | **⏳** |
| 7 | **平台**：does X strip EXIF, twitter strip exif metadata… | §一、`topic-platform-strip`、`faq-social-network` | **🔄**；**归类修正**：与 **Instagram/Facebook** 同属**平台 strip** 簇（§一 已增行） |
| 8 | **标准对立**：iptc vs exif, xmp vs exif | §一 `iptc-xmp-overview`、`topic-exif-vs-metadata` | **✅**（`iptc-xmp-overview` 内 **XMP vs EXIF** H2 + 表；博客增速览；*仅 XMP* 长尾仍无独立 slug，属刻意范围控制） |
| 9 | **GPS/字段**：exif gps, gpsaltituderef | §一 `dimension-location`；§二 **C**、**P2 GPS** | **🔄 + ⏳** 独立篇 |
| 10 | **首轮未出现但常见于同类站点**（建议监控 GSC）：free exif viewer, exif viewer online, metadata remover, remove gps from photo, HEIC EXIF | `how-to-view`、首页、`tip-remove-exif-heic-*` 等 | **🔄→✅ viewer**：`how-to-view` 首段 + `guideSeo` 已对齐 *online EXIF viewer / no upload*；其余仍监控 GSC；勿与簇 1/3 混排 |

**审计结论摘要**

1. **归类修正**：「Meta/Instagram/Facebook」与 X 同属**平台 strip** 簇，不应仅出现在「X」行而被误认为未覆盖。  
2. **遗漏补录**：**view EXIF / viewer**、**XMP 单独词**、**strip data 歧义**、**首轮未列的常见词** 已在上表与 §一 补充。  
3. **第二节 P1** 已覆盖 **aperture/shutter** 与 **FNumber** 相关检索，与「aperture inurl:blog」不同，后者保留 §四 不跟策略。

本文档为规划稿；**新建 slug 实现时** 请更新 `guidesStructure.ts` / `blogStructure.ts`、`百科与博客增补规划.md` 与本表及 **§八** 状态列。
