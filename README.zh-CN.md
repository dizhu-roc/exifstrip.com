# ExifStrip

想看看照片里藏了哪些信息——机身、时间、有没有 GPS——发图之前又想顺手清掉一部分？这个工具在浏览器里完成读取和清理，文件不会传到我们的服务器，解析和导出都在你本机进行。

**[English README](README.md)**

## 在线站点

想直接用或延伸阅读可以点这里：

| | 链接 |
|--|------|
| **网站** | [exifstrip.com](https://exifstrip.com) |
| **什么是 EXIF？**（指南） | […/guides/what-is-exif](https://exifstrip.com/guides/what-is-exif) |
| **多张照片怎么一起处理**（博客） | […/blog/tip-batch-clean](https://exifstrip.com/blog/tip-batch-clean) |

仓库主页 **About** 里把 **Website** 设成 `https://exifstrip.com`，别人从 GitHub 过来能一步跳到线上版。

---

## 能干什么

拖进图片或选好文件之后，可以按块看 EXIF：设备、拍摄参数、位置、时间等。JPEG 支持改单个字段或按预设剥离（全清、偏隐私相关、只清 GPS、只清设备信息等）；别的格式可以通过重编码去掉元数据，需要时也能把读到的内容导出成文本或十六进制。

带 GPS 的话会在小地图上看到大致位置；还有一张简单的条形图，方便一眼看出这张图的元数据「有多满」。界面有中文、English、日本語，选过的语言会记在浏览器本地。

整体是纯前端逻辑——如果你本来就不想把原图交给别人的服务器，这种方式会省心一些。

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | [Next.js](https://nextjs.org/) 16（App Router）、[React](https://react.dev/) 19 |
| 语言 | [TypeScript](https://www.typescriptlang.org/) 5 |
| 样式 | [Tailwind CSS](https://tailwindcss.com/) 3 |
| EXIF 读取 | [exifreader](https://github.com/mattiasw/ExifReader) |
| EXIF 编辑/剥离（JPEG） | [piexifjs](https://github.com/hMatoba/piexifjs) |
| 地图 | [Leaflet](https://leafletjs.com/) + [react-leaflet](https://react-leaflet.js.org/) |

---

## 项目结构（简要）

```
exif-strip/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # 根布局、LocaleProvider
│   │   ├── page.tsx            # 首页
│   │   ├── globals.css         # 全局样式与 CSS 变量
│   │   ├── privacy/            # 隐私说明页
│   │   ├── terms/              # 使用条款页
│   │   ├── about/              # 关于页
│   │   └── faq/                # 常见问题页
│   ├── components/
│   │   ├── home/               # 首页各区块组件
│   │   │   ├── IntroCarousel.tsx   # Hero 大标题+描述
│   │   │   ├── IntroCards.tsx      # 网站介绍卡片
│   │   │   ├── UploadSection.tsx   # 上传与 EXIF 解析状态容器
│   │   │   ├── UploadAndMap.tsx    # 上传区 + 图片列表 + 地图
│   │   │   ├── MetadataStrip.tsx   # Metadata 按维度展示与编辑/剥离
│   │   │   ├── MetadataGraphSection.tsx  # 元数据关系图
│   │   │   ├── WhyStripExifSection.tsx    # 为什么要移除 EXIF
│   │   │   ├── PrivacySection.tsx   # 隐私说明区块
│   │   │   ├── ExifTableSection.tsx # EXIF 参考表
│   │   │   ├── FAQSection.tsx       # 首页 FAQ 摘要
│   │   │   ├── Nav.tsx, Footer.tsx  # 导航与页脚
│   │   │   └── ...
│   │   └── layout/
│   │       └── PageLayout.tsx  # 子页通用布局（Nav + 内容 + Footer）
│   ├── contexts/
│   │   ├── LocaleContext.tsx   # 多语言（en / zh-CN / ja）
│   │   └── UploadContext.tsx   # 上传列表、选中项、EXIF 解析结果
│   ├── lib/                    # 核心逻辑
│   │   ├── parseExif.ts        # EXIF 解析（ExifReader 封装）
│   │   ├── stripExif.ts        # 按预设剥离（piexifjs）
│   │   ├── stripExifPresets.ts # 预设与标签映射
│   │   ├── exportExif.ts       # 导出 EXIF 文本/十六进制
│   │   └── ...
│   ├── constants/              # 常量（如 exifBlocks）
│   ├── data/                   # 静态数据（如 EXIF 参考表数据）
│   └── locales/                # 多语言 JSON（zh-CN, en, ja）
├── docs/                       # 项目文档（如首页区块与命名规范）
├── public/
└── package.json
```

---

## 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) 18+
- npm / yarn / pnpm

### 安装与运行

```bash
cd exif-strip
npm install
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

### 常用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发服务器 |
| `npm run build` | 生产构建 |
| `npm run start` | 运行生产构建 |
| `npm run lint` | ESLint 检查 |

---

## 多语言

- 语言列表：**中文（zh-CN）**、**English（en）**、**日本語（ja）**。
- 文案存放在 `src/locales/` 下各 JSON 文件中，通过 `LocaleContext` 与 `useTranslations()` 使用。
- 用户选择的语言会写入 `localStorage`，下次访问自动沿用。

---

## 文档

- [首页区块与命名规范](docs/首页区块与命名规范.md)：首页各区块 ID、组件名、中英文术语对照，便于协作与引用。

---

## 许可证与免责声明

`package.json` 里本项目为 `"private": true`。使用前请看站内的隐私说明和使用条款。编辑或删除 EXIF 请用在合法、正当的场景——保护自己的隐私可以，别拿去碰别人的数据或违法用途。
