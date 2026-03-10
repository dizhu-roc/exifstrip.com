# ExifStrip 网站 SEO 关键词规划

> 围绕「EXIF 查看 / 编辑 / 删除」「隐私」「在线工具」等需求整理，便于落地到 title、description、正文与博客/教程。

---

## 语言与 URL 约定（当前）

**当前实现**：多语言切换不改变 URL（语言由前端状态/本地存储决定，同一路径如 `/`、`/guides/what-is-exif` 随用户选择展示中/英/日）。

**对 SEO 的影响**：搜索引擎抓取同一 URL 时，通常只稳定收录**一种**语言（多为服务端默认或首屏渲染内容）。若默认是英文，则 Google 等主要索引的是英文版，中文/日文关键词很难在同一 URL 上获得排名。

**结论**：**SEO 应主推一种语言的关键词**，建议以**英文**为主：
- 所有 title、description、OG 等 meta 以英文为准并围绕英文关键词优化。
- 正文、Guides、Blog、FAQ 的「主版本」按英文撰写并做关键词布局；中/日为翻译，用于站内体验，不作为当前 SEO 主战场。
- 若日后改为「按语言区分 URL」（如 `/zh-CN/`、`/ja/` 或子域名）并配合 hreflang，再单独规划中/日关键词与落地页。

下文一～四为**英文**主推词；五保留中/日词表，供将来多语言 URL 或本地化推广时使用。

---

## 一、核心关键词（主推、流量与品牌）

用于首页、主导航页、品牌露出；竞争度偏高，需与落地页功能强相关。

| 类别 | 英文（主站） | 说明 |
|------|----------------|------|
| **品类词** | EXIF viewer | 查看 EXIF 的通用需求 |
| | EXIF editor | 编辑 EXIF |
| | EXIF remover / remove EXIF | 删除/移除 EXIF |
| | EXIF stripper / strip EXIF | 剥离 EXIF（与产品「Strip」一致） |
| | metadata remover | 元数据移除（更泛） |
| **工具形态** | online EXIF tool | 在线 EXIF 工具 |
| | browser EXIF tool | 浏览器内 EXIF 工具 |
| | free EXIF viewer | 免费 EXIF 查看器 |
| **隐私向** | remove GPS from photo | 从照片移除 GPS |
| | remove location from image | 从图片移除位置信息 |
| | photo privacy tool | 照片隐私工具 |

**补充**：
- **品牌词**：ExifStrip（用于品牌搜索、正文与 OG siteName；可写「ExifStrip - free online EXIF viewer」等）。
- **常见变体**：exif data / exif info（用户常搜「exif data」而非仅「exif viewer」）、photo metadata viewer、image metadata remover（比 EXIF 更泛，可作补充）。

**落地建议**：首页 title/description 必须包含「EXIF viewer」「edit」「remove/strip」及「browser / online」「free」「privacy」中若干项；Guides 首页可带「EXIF guide」「how to view/edit/remove EXIF」。

---

## 二、长尾关键词（意图 + 场景/格式/设备）

用于 Guides、Blog、FAQ 及具体功能页；竞争度相对低，转化意图明确。

### 2.1 操作意图 + 格式/设备

| 英文 | 可写内容/页面 |
|------|----------------|
| remove EXIF from JPEG | 剥离说明页、how-to-edit-strip |
| remove EXIF from PNG | 格式支持说明、FAQ |
| remove EXIF from iPhone photos / HEIC | 格式/HEIC 说明、博客 |
| view EXIF online | 首页、how-to-view |
| edit EXIF online | 首页、编辑功能说明 |
| strip metadata from photo before sharing | 隐私/分享前、before-you-share |
| remove GPS from photo before posting | 隐私、preset「GPS only」 |
| remove camera info from image | 设备信息、preset「device only」 |
| batch remove EXIF from images | 多图处理、博客/技巧 |
| export EXIF to CSV / JSON | 导出功能、what-exifstrip-does |

### 2.2 场景 / 用途

| 英文 | 可写内容/页面 |
|------|----------------|
| check EXIF before sharing photo | 分享前检查、before-you-share、隐私 |
| clean EXIF for privacy | 隐私说明、why-care-privacy、sensitive-fields |
| remove location data from photos for social media | 社交分享、博客、FAQ（SNS 是否 strip） |
| what EXIF data is in my photo | 什么是 EXIF、维度说明、how-to-view |
| which EXIF fields are sensitive | sensitive-fields、隐私 |
| does removing EXIF affect image quality | FAQ、faq-remove-safe |
| can I recover EXIF after removal | FAQ、faq-can-recover |
| who writes EXIF to photos | FAQ、dimension-device |
| do social networks remove EXIF | FAQ、faq-social-network |

### 2.3 工具对比 / 替代

| 英文 | 可写内容/页面 |
|------|----------------|
| EXIF viewer no upload / local | 首页、隐私卖点：数据不上传 |
| remove EXIF without uploading | 同上 |
| ExifTool online alternative | 博客/对比：在线 vs 命令行 |
| online EXIF tool that doesn't store photos | 隐私、about/privacy |

### 2.4 补充长尾（易遗漏）

| 英文 | 可写内容/页面 |
|------|----------------|
| read EXIF data / get EXIF from image | 与 view 同意图；how-to-view、首页 |
| remove only GPS keep other EXIF | 预设「GPS only」、before-you-share |
| exif to CSV / export EXIF data | 导出功能、what-exifstrip-does |
| exif meaning / what does EXIF mean | what-is-exif、首段 |
| is it safe to remove EXIF / will removing EXIF damage photo | FAQ、faq-remove-safe |
| exif viewer no sign up / no account | 首页、about（若无需注册） |
| exif in photography / why do photos have EXIF | what-is-exif、博客 |
| where is EXIF stored in JPEG | exif-structure、supported-formats |

---

## 三、问句式关键词（适合 FAQ、Guides、Featured Snippet）

用户常以问句搜索，便于做「问题—简短答案—详情」结构。

| 英文 | 对应页面/区块 |
|------|----------------|
| What is EXIF? | guides/what-is-exif |
| How to view EXIF? | guides/how-to-view |
| How to remove EXIF from photos? | guides/how-to-edit-strip |
| How to remove GPS from photos? | preset、before-you-share |
| Does removing EXIF reduce quality? | guides/faq-remove-safe |
| Can you recover EXIF after stripping? | guides/faq-can-recover |
| Is EXIF removed when I post to Instagram/Facebook? | guides/faq-social-network |
| Which image formats have EXIF? | guides/supported-formats |
| What EXIF data is private? | guides/sensitive-fields、why-care-privacy |
| How to edit EXIF in JPEG? | 编辑功能、how-to-edit-strip |
| What does EXIF mean? | guides/what-is-exif |
| Is it safe to remove EXIF from photos? | guides/faq-remove-safe |
| How to remove EXIF from multiple photos? | 多图、博客/技巧 |
| Where is EXIF stored in a JPEG file? | guides/exif-structure |

---

## 四、语义相关词（丰富正文与内链）

不单独做主关键词，用于段落、小标题、内链锚文本，增强主题相关度。

| 类别 | 示例词 |
|------|--------|
| **概念** | metadata, photo metadata, image metadata, EXIF data, GPS in photos, camera metadata, location data in images |
| **操作** | view EXIF, read EXIF, strip metadata, clean EXIF, delete EXIF, remove metadata, edit EXIF, export EXIF |
| **隐私/风险** | photo privacy, EXIF privacy, sensitive EXIF, GPS privacy, camera serial number, expose location |
| **格式/技术** | JPEG EXIF, PNG metadata, HEIC EXIF, APP1 segment, EXIF tag, metadata strip presets |
| **场景** | before sharing, before posting, social media, cloud upload, share safely |
| **变体/同义** | exif data, exif info, photo metadata, image metadata, read exif, check exif, get exif |

---

## 五、多语言关键词（中/日）— 当前仅作储备

在**未**按语言区分 URL 的前提下，中/日词不作为 SEO 主推；以下词表供站内翻译与未来多语言 URL（或 hreflang）时使用。

### 5.1 中文（zh-CN）

| 类型 | 关键词示例 |
|------|------------|
| 核心 | EXIF 查看器、EXIF 编辑器、去除 EXIF、删除 EXIF、照片元数据清除、在线 EXIF 工具 |
| 长尾 | 如何查看照片 EXIF、如何删除照片位置信息、分享前清除 EXIF、照片隐私工具、批量去除 EXIF |
| 问句 | 什么是 EXIF、如何移除照片中的 GPS、去掉 EXIF 会影响画质吗、EXIF 能恢复吗 |

### 5.2 日语（ja）

| 类型 | 关键词示例 |
|------|------------|
| 核心 | EXIF ビューア、EXIF 削除、EXIF 除去、写真 メタデータ 削除、オンライン EXIF ツール |
| 长尾 | 写真から位置情報を削除、共有前にEXIFを削除、JPEGのEXIFを消す、EXIF 確認 方法 |
| 问句 | EXIFとは、EXIFの削除で画質は落ちるか、SNSに投稿するとEXIFは消えるか |

---

## 六、落地优先级建议

| 优先级 | 动作 | 关键词侧重 |
|--------|------|-------------|
| **P0** | 首页、Guides 首页、layout 默认 meta | 核心词：EXIF viewer, remove/edit EXIF, online, free, privacy；description 自然带 1～2 条长尾 |
| **P1** | 各 Guide 文章 title/description/首段 | 对应问句与长尾（如 how to view EXIF, remove GPS, sensitive fields） |
| **P2** | Blog、FAQ 标题与首句 | 问句式 + 场景长尾（before sharing, batch, quality, recover, SNS） |
| **P3** | 正文、内链、图片 alt | 语义相关词、格式/设备长尾 |
| **P4** | 多语言 SEO（仅当改为按语言区分 URL 或 hreflang 时） | 五、中/日对应词；当前不主推 |

---

## 七、与现有内容的对应关系（均以英文版为 SEO 主版本）

- **首页 / 品牌**：主推「EXIF viewer」「edit」「strip/remove」「online」「free」「privacy」「no upload」。
- **Guides**：每篇用 1 个问句或长尾做主关键词（如 What is EXIF、How to view EXIF、Which fields are sensitive），description 与首段包含目标词。
- **Blog**：按选题用场景长尾（分享前清理、批量处理、只删 GPS、导出备份等）。
- **FAQ**：每条 FAQ 标题即一问句关键词，答案首句可做成 featured snippet 式短答。

文档迭代时可将实际采用的词与对应 URL 填入上表，便于后续扩展与效果复盘。

---

## 八、落地与执行补充（非关键词但影响收录与点击）

| 项 | 说明 |
|----|------|
| **默认首屏语言** | 确保服务端/SSR 或默认 HTML 输出为英文，以便爬虫稳定收录英文版。 |
| **Canonical 与 OG** | 全站统一 canonical URL；OG title/description 与主 title/description 一致且为英文。 |
| **图片 alt** | 配图 alt 文本含目标词（如「EXIF metadata by dimension」「strip EXIF preset」），避免留空。 |
| **H1 与标题层级** | 每页一个 H1，与当前页主关键词一致；Guides/FAQ 问句可直接作 H1 或 H2。 |
| **结构化数据（可选）** | 考虑 FAQPage（FAQ 页）、HowTo（教程页）、WebApplication（首页），便于富媒体结果。 |
| **搜索意图区分** | 首页/下载入口偏「工具型/交易型」；Guides/Blog 偏「信息型」— 标题与首段需与意图匹配。 |

---

## 九、本次实施记录与 Google 友好检查

### 9.1 已实施项（代码）

| 项 | 位置 | 说明 |
|----|------|------|
| **根 layout** | `src/app/layout.tsx` | title/description 含 EXIF viewer, editor, remover, free, online, no upload, privacy；keywords 数组；OG + Twitter 卡片；alternates.canonical；robots index,follow；WebApplication JSON-LD |
| **Guides 列表** | `src/app/guides/layout.tsx` | title/description/OG/canonical，问句式与长尾 |
| **各 Guide 详情** | `src/app/guides/[id]/layout.tsx` + `src/data/guideSeo.ts` | generateMetadata 按 id 取英文 title/description，canonical，OG |
| **Blog 列表** | `src/app/blog/layout.tsx` | title/description/OG/canonical |
| **各 Blog 详情** | `src/app/blog/[id]/layout.tsx` + `src/data/blogSeo.ts` | generateMetadata，canonical，OG |
| **FAQ / About / Privacy / Terms** | 各 `layout.tsx` | 独立 title/description/OG/canonical |
| **FAQ JSON-LD** | `src/app/faq/layout.tsx` | FAQPage schema，4 条主问句 + 短答 |
| **Guide 配图 alt** | `src/app/guides/[id]/page.tsx` | exif-structure 图 alt 为「EXIF structure diagram…」；其余为「Guide illustration」 |
| **Sitemap** | `src/app/sitemap.ts` | 静态页 + 所有 guides/[id] + blog/[id]，changeFrequency 与 priority |
| **Robots** | `src/app/robots.ts` | allow /，sitemap 指向 /sitemap.xml |

### 9.2 Google 友好检查（回溯）

| 检查项 | 状态 |
|--------|------|
| 每页唯一且具描述性的 title | ✓ 根默认 + 各 layout/generateMetadata 覆盖 |
| 每页唯一 description，含主关键词、无堆砌 | ✓ 英文、自然句 |
| 首屏/默认输出为英文（爬虫可见） | ✓ 根 layout 与各 meta 均为英文；多语言由前端切换，不改变 URL |
| Canonical 全站统一、无重复 | ✓ 根 canonical 首页；子页各自 canonical |
| OG / Twitter 与 title/description 一致 | ✓ 同套文案 |
| 结构化数据（WebApplication、FAQPage） | ✓ 根 layout + FAQ layout |
| Sitemap 覆盖主要 URL | ✓ 静态 + 动态 guide/blog |
| robots 允许抓取并指向 sitemap | ✓ |
| 单 H1 且与主关键词一致 | ✓ 首页 hero、Guides/Blog/FAQ 页 H1 明确 |
| 图片 alt 有描述、含关键词 | ✓ Guide 详情配图已补；正文 markdown 图用文案作 alt |
| 无 cloaking、无误导性标题 | ✓ 标题与内容一致 |
| 移动端与性能 | 未改；依赖现有响应式与 LCP |

### 9.3 可选后续

- 首页如需单独 description 微调：可在 `app/page.tsx` 改为 server 并 export metadata（当前用根 layout 默认即可）。
- 更多 Guide 配图：新增 guide 时在 `page.tsx` 中为对应 `entry.image` 补语义化 alt。
- HowTo 结构化数据：若某篇 Guide 为强步骤型，可单独为该页加 HowTo JSON-LD。
- 提交 Sitemap：在 Google Search Console 提交 `https://exifstrip.com/sitemap.xml`。

---

## 十、页面文案修改建议（仅列方向，不直接改代码）

以下为**英文主站**页面文案中建议评估的项：兼顾 SEO 关键词自然露出、可读性与一致性。按「位置 → 当前/问题 → 修改方向」列出。

### 10.1 首页首屏与介绍（hero / intro）

| 位置 | 当前 / 问题 | 修改方向 |
|------|-------------|----------|
| **hero.title** | "Easy-to-use EXIF viewer and editor for your images" | 已含 viewer/editor；可考虑补「free」或「remove EXIF」以贴近核心词，例如："Free EXIF viewer, editor and metadata remover" 或保持现句。 |
| **hero.desc** | "Online EXIF tool: view, edit, and strip metadata. Free forever." | 已较好；可选把 "strip metadata" 改为 "strip EXIF" 与产品用语统一，并强化「不上传」：如 "View, edit, and strip EXIF in your browser. No upload, free forever." |
| **intro.whoWeAre** | "What is ExifStrip?" | 可保留；若希望更偏功能可改为 "What is ExifStrip?" 不变，或副标题强调 "Free online EXIF viewer and remover." |
| **intro.whoWeAreDesc** | 已有 view, edit, remove EXIF, browser, uploaded, free | 可在一句内自然带出「no sign-up」或「no account」以对应长尾 "exif viewer no sign up"。 |
| **intro.whatYouCanDo** | "What about privacy?" | 卡片标题较泛；可改为 "How we protect your privacy" 或 "Your photos never leave your device" 更直接体现卖点。 |
| **intro.whatYouCanDoDescLink** | "Privacy Detail" | 建议改为 "Privacy" 或 "privacy policy" 与 nav/footer 用词一致，避免 "Detail" 单独出现。 |
| **intro.whatIsExif** | "What can you do?" | 与「什么是 EXIF」易混；若该卡片是讲「能做什么」，建议改为 "What can you do with ExifStrip?" 或 "View, edit & remove EXIF" 更贴功能与关键词。 |
| **intro.whatIsExifDesc** | 已有 view, edit, analyze, remove EXIF, locally, free | 可保持；可选补 "export EXIF to CSV or JSON" 以带出导出长尾。 |

### 10.2 上传区与 Metadata 区块

| 位置 | 当前 / 问题 | 修改方向 |
|------|-------------|----------|
| **upload.title** | "Upload Image(s)" | 可保持；若希望更强「查看 EXIF」意图可改为 "Upload to view EXIF" 或保持现标题，在 hint 中带 "to view or strip EXIF"。 |
| **upload.hint** | "Drag image files here, or click to select image(s)." | 可选在句末补场景词，如 "... to view or strip EXIF" 以自然带出 strip/view。 |
| **metadata.title** | "Metadata" | 为与品类词统一，可考虑改为 "EXIF / Metadata" 或 "EXIF metadata"（若 UI 不显冗长），便于与 "EXIF viewer" 对应。 |
| **metadata.emptyStateDescLine1 / Line2** | 已有 "view metadata by dimension" | 可保持；可选将 "metadata" 改为 "EXIF" 一次以强化主词，如 "view EXIF by dimension"。 |
| **metadata.clean** | "Strip Metadata" | 与规划中 "strip EXIF" 一致；可选改为 "Strip EXIF" 以统一用语与关键词。 |
| **metadata.downloadCleaned** | "Download Image" | 易与「下载原图」混淆；建议改为 "Download stripped image" 或 "Download image (EXIF removed)" 更明确。 |

### 10.3 四张卡片（FourCards）

| 位置 | 当前 / 问题 | 修改方向 |
|------|-------------|----------|
| **fourCards.card1Title ~ card4Title** | "Card one" … "Card four" | 占位文案，需替换为真实标题。建议与首页区块或产品价值对应，例如：View EXIF / Edit & remove / Export & privacy / No upload, no account。 |
| **fourCards.card1Desc ~ card4Desc** | "Placeholder content." | 同上，改为简短说明，可自然带出 view EXIF、strip EXIF、export、privacy、no upload 等卖点。 |

### 10.4 「为什么要移除 EXIF」区块（whyStripExif）

| 位置 | 当前 / 问题 | 修改方向 |
|------|-------------|----------|
| **whyStripExif.title** | "Why remove EXIF" | 已贴词；可保持或微调为 "Why remove EXIF from photos?" 更贴近问句搜索。 |
| **whyStripExif.item1Desc** | 已有 GPS, capture time, sharing, when and where | 可保持；可选补 "Remove GPS from photos before sharing" 类短句以带长尾。 |
| **whyStripExif.item4Desc** | "only specific dimensions (e.g. location, device)" | 可保持；可选明确写出 "remove only GPS" 以对应 "remove only GPS keep other EXIF"。 |

### 10.5 页脚与全局

| 位置 | 当前 / 问题 | 修改方向 |
|------|-------------|----------|
| **footer.intro** | "View, edit, and remove EXIF metadata… Your data never leaves your device." | 已好；可选补 "No sign-up required." 以对应 no account 类搜索。 |
| **quickActions** | "Upload image" / "Metadata" / "Privacy" | 可保持；若侧栏需更强 EXIF 露出，可将 "Metadata" 改为 "EXIF" 或 "View EXIF"。 |

### 10.6 其他（Guides / FAQ / 错误与提示）

| 位置 | 当前 / 问题 | 修改方向 |
|------|-------------|----------|
| **guides.heroSubtitle** | "Understand EXIF in depth so you can better protect your own privacy." | 已含 EXIF、privacy；可保持。可选补 "How to view, edit, and remove EXIF" 以贴 Guides 列表页关键词。 |
| **toast.cleanFailed** | "Strip failed, please try again" | 可保持；若希望与按钮一致可统一为 "EXIF strip failed"（视产品语气而定）。 |
| **metadata.editDisabledNonJpeg** | "Editing is only supported for JPEG." | 已清晰；可保持。 |
| **metadata.deleteDisabledNonJpeg** | "Removing tags is only supported for JPEG in this version." | 可保持；可选简化为 "Remove EXIF is supported for JPEG only." 以带 remove EXIF。 |

### 10.7 修改优先级建议

- **优先**：FourCards 占位文案（card1~4 标题与描述）替换为真实、带关键词的短句；intro 中 "What can you do?" / "Privacy Detail" 与 "Download Image" 的语义/用词统一。
- **次之**：hero.desc 补「no upload」；metadata 区块标题或空状态中适度用「EXIF」替代一次「metadata」；Strip 按钮与下载清理后按钮文案与 SEO 词统一（Strip EXIF / Download stripped image）。
- **可选**：intro 与 footer 补「no sign-up」；whyStripExif 中补「remove only GPS」等一句；guides 副标题补「how to view, edit, remove EXIF」。

以上仅作列表与方向参考，具体措辞以产品与品牌语气为准；修改时同步更新 zh-CN、ja 对应 key 以保持多语言一致。
