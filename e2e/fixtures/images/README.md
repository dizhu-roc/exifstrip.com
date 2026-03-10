# 功能测试用图片

本目录用于存放 **E2E / 功能测试** 中上传用的测试图片。

## 建议准备的图片

| 文件名（示例） | 用途 | 建议内容 |
|----------------|------|----------|
| `with-exif.jpg` | 解析与展示 | 一张带 EXIF 的 JPEG：含 GPS、设备信息（Make/Model 等）、拍摄时间等，用于断言元数据区块与地图有内容 |
| `no-exif.jpg`  | 无 EXIF 场景 | 无 EXIF 或 EXIF 被清空的 JPEG，用于断言「无元数据」或空状态 |
| （可选）`with-exif.png` | 格式差异 | 带 EXIF 的 PNG，用于测试非 JPEG 时的剥离/导出行为 |

## 使用方式

- 测试里通过 **相对项目根目录** 的路径引用，例如：  
  `path.join(process.cwd(), 'e2e/fixtures/images/with-exif.jpg')`
- Playwright 上传时使用 `setInputFiles(input, path)` 注入本地文件路径。

## 说明

- 可将小体积（几十～几百 KB）的测试图提交到仓库；若图片较大，可加入 `.gitignore` 并在 CI 或本地说明中注明需自行放置。
- 不要提交含真实隐私信息的照片，用相机/手机拍一张测试用图或从无版权图库下载后保留 EXIF 即可。
