# EXIF 编辑功能方案（仅方案，不开发）

## 一、交互约定

- **默认态**：每行展示「标签名 + 当前值 + 右侧编辑/删除图标」。
- **点击编辑**：该行变为可编辑态：
  - 左侧标签名不变；
  - 中间由**纯展示文案**变为**输入控件**（见下「字段类型」）；
  - 右侧由「编辑 / 删除」变为「保存 / 取消」两个图标。
- **保存**：校验当前输入 → 用新值替换该字段的展示与内存中的编辑结果；退出编辑态，恢复为「值 + 编辑/删除」。
- **取消**：丢弃本次输入，恢复为原值；退出编辑态。

删除逻辑保持现状（仅删除、不进入编辑），不在此方案扩展。

---

## 二、字段类型与控件（对齐《EXIF 维度解析与字段说明》）

### 2.1 下拉选择（Select）

以下 tag 使用**下拉框**，选项来自文档「九、下拉选项」DROPDOWN_FIELD_OPTIONS，写入时用 value，展示用 label（可 i18n）：

| 区块           | Tag                   | 说明         |
|----------------|-----------------------|--------------|
| imageSettings  | Orientation           | 1～8         |
| imageSettings  | WhiteBalance          | 0/1 (Auto/Manual) |
| imageSettings  | Flash                 | 0,1,5,7,9,…  |
| imageSettings  | ExposureProgram       | 0～8         |
| imageSettings  | ExposureMode          | 0,1,2        |
| imageSettings  | MeteringMode          | 0～6         |
| imageSettings  | SceneCaptureType      | 0～3         |
| image          | ResolutionUnit        | 1,2,3        |
| image          | ColorSpace            | 1,2,65535    |
| location       | GPSLatitudeRef        | N/S          |
| location       | GPSLongitudeRef       | E/W          |
| location       | GPSImgDirectionRef    | T/M          |
| location       | GPSDestBearingRef     | T/M          |
| location       | GPSSpeedRef           | K/M/N        |

下拉选项的 value 与 EXIF 规范一致（数字或单字母），展示文案可做一份 `exif.opt.*` 的 i18n。

### 2.2 文本/数字输入（Input）

其余**可编辑** tag 使用**单行输入框**，按文档做校验与格式化：

- **仅 ASCII**（文档 6.3）：device 的 Make/Model/机身序列号/镜头等、other 的 Artist/Copyright/UserComment/ImageDescription。输入过滤：仅允许可打印 ASCII（\x20-\x7E），写入前 toAsciiOnly。
- **整数**（文档 6.4）：ISOSpeedRatings，仅允许整数。
- **数字/有理数/分数**（文档 6.5）：ExposureTime, FNumber, FocalLength, ExposureBiasValue，GPS 经纬度/海拔/方向等，XResolution, YResolution。允许数字、小数点、负号、单斜杠分数，前端 filterNumericRational 过滤非法字符。
- **日期时间字符串**：DateTimeOriginal, DateTime, DateTimeDigitized、GPSDateStamp、GPSTimeStamp 等，按文档「八、valueToPiexif」约定格式（如 YYYY:MM:DD HH:mm:ss 或 YYYY-MM-DD）校验或提示。

**只读/仅删**（文档 6.1）：MakerNote、FirmwareVersion、SceneType 不提供编辑入口，仅保留删除，不参与本编辑交互。

**仅展示**（文档 6.2）：DISPLAY_ONLY_TAGS（如 ImageWidth、ImageLength、BitsPerSample 等）无编辑/删除按钮，不参与编辑。

---

## 三、状态与数据流

- **当前展示值**：来自 ExifReader 解析结果（`blocks` / `exifResult.tags`），只读展示。
- **编辑中状态**：  
  - 行级：如 `editingTagKey: string | null`（如 `"device.Make"` 或 `blockId + tag`），表示当前哪一行处于编辑态。  
  - 控件值：由该行的「当前展示值」初始化，保存前存在本地 state（或受控 input/select 的 value），不直接写回 tags。
- **已编辑结果**：建议用 `Map<fieldId, newValue>` 或 `Record<fieldId, string>` 存「用户已保存的修改」，fieldId 与文档 7.4 一致（如 `device.Make`, `other.Artist`）。  
  - 展示时：若某 fieldId 在「已编辑结果」中有值，则展示该值，否则展示 ExifReader 解析出的原值。  
  - 导出/写回 JPEG 时：用「原 EXIF + 已编辑结果」通过 valueToPiexif 生成新 EXIF 写入（需后续接 piexif 写回逻辑）。
- **取消**：仅清空该行的编辑态并丢弃当前输入，不修改「已编辑结果」。

---

## 四、UI 细节建议

- **编辑态同一行右侧**：仅保留「保存」「取消」两个图标按钮，删除按钮可在编辑态隐藏（或保留删除，视产品而定；若保留需约定与保存/取消的先后关系）。
- **保存时校验**：若为必填或格式不符，可在行内 toast 或 inline 提示，不关闭编辑态直到通过或用户取消。
- **键盘**：支持 Enter 保存、Esc 取消，可提升效率。
- **可访问性**：输入框获得焦点时应有明确 label/aria-label，保存/取消按钮带 aria-label（如「保存」「取消」）。

---

## 五、与现有代码的衔接点

- **可编辑范围**：继续使用 `canShowEditButton(tag, blockId)`，仅对返回 true 的 tag 展示编辑按钮并进入上述编辑流程；READ_ONLY_EDIT_TAGS 仅删不编；DISPLAY_ONLY_TAGS 不展示编辑/删除。
- **控件类型分发**：需新增「tag → 控件类型」映射（下拉 vs 输入），及下拉的「tag → options」数据，可与 `exifBlocks.ts` 或新文件 `exifFieldOptions.ts` 维护。
- **写回与导出**：当前若仅有「剥离后下载」而无「编辑后写回 EXIF 再下载」，则编辑功能需增加「将已编辑结果写入 piexif dict → 再 dump/insert 回 JPEG → 触发下载」的流程；可与现有 Strip 下载共用一层「带 EXIF 的 Blob 生成」抽象（例如「当前文件 + 已编辑字段 + 已删除字段」→ 生成新 JPEG Blob）。

---

## 六、实施顺序建议（供后续开发参考）

1. **数据层**：定 fieldId 规范，实现「已编辑结果」的 state 结构（如 Record<fieldId, string>）；实现 tag → 控件类型（下拉/输入）及下拉选项数据。
2. **控件**：实现「行内下拉」「行内输入」两种编辑控件，并接好校验（ASCII/整数/有理数/日期等）。
3. **交互**：编辑按钮 → 切编辑态（输入/下拉 + 保存/取消）；保存 → 校验 → 写入已编辑结果并退出编辑态；取消 → 仅退出编辑态。
4. **写回**：实现 valueToPiexif（UI 值 → piexif 可写值）、FIELD_ID_TO_PIEXIF，以及「原图 EXIF + 已编辑 + 已删除 → 新 JPEG」的生成与下载。

按上述顺序即可在不动现有「只读展示 + 删除」的前提下，叠加完整的「编辑 → 保存/取消 → 写回」流程。
