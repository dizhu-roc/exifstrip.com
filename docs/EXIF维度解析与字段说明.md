# EXIF 维度解析与字段说明

> 解析维度、区块、风险色相、清理预设、可编辑/删除字段及值格式，便于复刻 EXIF 相关逻辑与 UI。

---

## 〇、纯前端可解析的 EXIF 维度与字段总览

> 以下为 **exifreader 4.x（expanded: true, includeUnknown: true）** 在浏览器端能解析出的全部维度与字段；与 `lib/services/exif-reader.ts` 的 TAG_TO_* 及 `lib/constants/exif-blocks.ts` 的 BLOCK_TAG_NAMES 一致。未列入维度的 tag 仍会出现在 `raw` 中供展示或 getOriginalValueForField 使用。

### 1. camera（设备/相机）

| ExifReader Tag       | snake_case 键           | 说明           | 是否在 UI 展示 |
|----------------------|-------------------------|----------------|----------------|
| Make                 | make                    | 制造商         | 是，device     |
| Model                | model                   | 型号           | 是，device     |
| BodySerialNumber     | body_serial_number      | 机身序列号     | 是，device     |
| CameraSerialNumber   | camera_serial_number    | 相机序列号     | 是，device     |
| LensMake             | lens_make               | 镜头制造商     | 是，device     |
| LensModel            | lens_model              | 镜头型号       | 是，device     |
| Software             | software                | 软件           | 是，device     |
| FirmwareVersion      | firmware_version        | 固件版本       | 是，device     |

### 2. shooting（拍摄参数）

| ExifReader Tag       | snake_case 键           | 说明           | 是否在 UI 展示 |
|----------------------|-------------------------|----------------|----------------|
| DateTimeOriginal     | date_time_original      | 拍摄时间       | 是，dateTime   |
| DateTime             | date_time               | 修改时间       | 是，dateTime   |
| DateTimeDigitized    | date_time_digitized     | 数字化时间     | 是，dateTime   |
| ISOSpeedRatings      | iso_speed_ratings       | ISO            | 是，imageSettings |
| FNumber              | f_number                | 光圈           | 是，imageSettings |
| ExposureTime         | exposure_time           | 快门           | 是，imageSettings |
| FocalLength          | focal_length            | 焦距           | 是，imageSettings |
| FocalLengthIn35mmFilm| focal_length_in_35mm_film | 35mm 等效焦距 | 否，仅 raw     |
| WhiteBalance         | white_balance           | 白平衡         | 是，imageSettings |
| Flash                | flash                   | 闪光灯         | 是，imageSettings |
| ExposureProgram      | exposure_program        | 曝光程序       | 是，imageSettings |
| ExposureMode         | exposure_mode           | 曝光模式       | 是，imageSettings |
| MeteringMode         | metering_mode           | 测光模式       | 是，imageSettings |
| SceneCaptureType     | scene_capture_type      | 场景类型       | 是，imageSettings |
| SceneType            | scene_type              | 场景类型(字节)  | 是，imageSettings |
| ExposureBiasValue    | exposure_bias_value     | 曝光补偿       | 是，imageSettings |
| MaxApertureValue      | max_aperture_value      | 最大光圈       | 否，仅 raw     |
| BrightnessValue      | brightness_value        | 亮度           | 否，仅 raw     |
| SubjectDistance      | subject_distance        | 对焦距离       | 否，仅 raw     |
| DigitalZoomRatio     | digital_zoom_ratio      | 数码变焦比     | 否，仅 raw     |
| LightSource          | light_source            | 光源           | 否，仅 raw     |
| Contrast             | contrast                | 对比度         | 否，仅 raw     |
| Saturation           | saturation              | 饱和度         | 否，仅 raw     |
| Sharpness            | sharpness               | 锐度           | 否，仅 raw     |
| GainControl          | gain_control            | 增益控制       | 否，仅 raw     |

### 3. location（GPS）

| ExifReader Tag       | snake_case 键           | 说明           | 是否在 UI 展示 |
|----------------------|-------------------------|----------------|----------------|
| GPSLatitude          | gps_latitude            | 纬度           | 是，location   |
| GPSLongitude         | gps_longitude           | 经度           | 是，location   |
| GPSAltitude          | gps_altitude            | 海拔           | 是，location   |
| GPSAltitudeRef       | gps_altitude_ref        | 海拔参照       | 否，仅 raw     |
| GPSLatitudeRef       | gps_latitude_ref        | 南北           | 是，location   |
| GPSLongitudeRef      | gps_longitude_ref       | 东西           | 是，location   |
| GPSDateStamp         | gps_date_stamp          | GPS 日期       | 是，location   |
| GPSTimeStamp         | gps_time_stamp          | GPS 时间       | 是，location   |
| GPSSpeedRef          | gps_speed_ref           | 速度单位       | 是，location   |
| GPSSpeed             | gps_speed               | 速度           | 否，仅 raw     |
| GPSImgDirection      | gps_img_direction       | 图像方向       | 是，location   |
| GPSImgDirectionRef   | gps_img_direction_ref   | 方向参照       | 是，location   |
| GPSDestBearing       | gps_dest_bearing        | 目标方位       | 是，location   |
| GPSDestBearingRef    | gps_dest_bearing_ref    | 目标方位参照   | 是，location   |

### 4. image（图像属性）

| ExifReader Tag       | snake_case 键           | 说明           | 是否在 UI 展示 |
|----------------------|-------------------------|----------------|----------------|
| ImageWidth           | image_width             | 图像宽         | 是，image     |
| ImageLength          | image_length            | 图像高         | 是，image     |
| PixelXDimension      | pixel_x_dimension       | 像素宽(Exif)   | 否，仅 raw     |
| PixelYDimension      | pixel_y_dimension       | 像素高(Exif)   | 否，仅 raw     |
| Orientation          | orientation             | 方向           | 是，imageSettings |
| XResolution          | x_resolution            | 水平分辨率     | 是，image     |
| YResolution          | y_resolution            | 垂直分辨率     | 是，image     |
| ResolutionUnit       | resolution_unit         | 分辨率单位     | 是，image     |
| ColorSpace           | color_space             | 色彩空间       | 是，image     |
| BitsPerSample        | bits_per_sample         | 位深           | 是，image     |
| SamplesPerPixel      | samples_per_pixel       | 采样数         | 是，image     |
| Compression          | compression             | 压缩           | 是，image     |
| PhotometricInterpretation | photometric_interpretation | 光度解释 | 是，image     |
| YCbCrPositioning     | y_cb_cr_positioning     | YCbCr 定位     | 是，image     |
| PlanarConfiguration  | planar_configuration    | 平面配置       | 是，image     |
| ExifVersion          | exif_version            | EXIF 版本      | 是，image     |
| FlashPixVersion      | flash_pix_version       | FlashPix 版本  | 是，image     |
| ComponentsConfiguration | components_configuration | 分量配置   | 是，image     |
| CompressedBitsPerPixel | compressed_bits_per_pixel | 压缩位/像素 | 是，image     |

### 5. copyright（作者/版权）

| ExifReader Tag       | snake_case 键           | 说明           | 是否在 UI 展示 |
|----------------------|-------------------------|----------------|----------------|
| Artist               | artist                  | 作者           | 是，other      |
| Copyright            | copyright               | 版权           | 是，other      |
| UserComment          | user_comment            | 用户注释       | 是，other      |
| ImageDescription     | image_description       | 图像描述       | 是，other      |
| MakerNote            | maker_note              | 制造商备注     | 是，other      |

### 6. raw 中的其他 tag（includeUnknown: true）

- 上述五类之外的 **所有** ExifReader 能读到的 tag（含 0th/Exif/GPS/Interop 等 IFD、以及厂商自定义）都会进入 `raw`，键为 ExifReader 标准 tag 名（PascalCase）。
- 界面若需展示某 tag 但未列入 BLOCK_TAG_NAMES，可通过 `raw[tagName]` 取 `description` / `value`；编辑与删除依赖 FIELD_ID_TO_PIEXIF，仅已映射的 fieldId 可写回。
- 常见仅出现在 raw 的 tag 示例：LensSerialNumber、SubSecTimeOriginal、SubSecTime、OffsetTime、OffsetTimeOriginal、OffsetTimeDigitized、ExposureIndex、SensingMethod、FileSource、CustomRendered 等。

---

## 一、解析结果类型（ParsedExifData）

- **camera**：设备/相机，键为 snake_case（make, model, body_serial_number, camera_serial_number, lens_make, lens_model, software, firmware_version）
- **shooting**：拍摄参数（date_time_original, date_time, date_time_digitized, iso, f_number, exposure_time, focal_length, white_balance, flash 等）
- **location**：GPS（gps_latitude, gps_longitude, gps_altitude, gps_date_stamp 等）
- **image**：图像属性（width, height, orientation, x_resolution, color_space 等）
- **copyright**：作者/版权（artist, copyright, user_comment, image_description, maker_note）
- **icc**：ICC 描述（当前实现多为空）
- **raw**：ExifReader 原始 tag 名 → { description, value }，供展示与 getOriginalValueForField 使用

---

## 二、ExifReader Tag → 维度映射（exif-reader.ts）

- **TAG_TO_CAMERA**：Make, Model, BodySerialNumber, CameraSerialNumber, LensMake, LensModel, Software, FirmwareVersion
- **TAG_TO_SHOOTING**：DateTimeOriginal, DateTime, DateTimeDigitized, ISOSpeedRatings, FNumber, ExposureTime, FocalLength, FocalLengthIn35mmFilm, WhiteBalance, Flash, ExposureProgram, ExposureMode, MeteringMode, SceneCaptureType, ExposureBiasValue, MaxApertureValue, BrightnessValue, SubjectDistance, DigitalZoomRatio, LightSource, Contrast, Saturation, Sharpness, GainControl
- **TAG_TO_LOCATION**：GPSLatitude, GPSLongitude, GPSAltitude, GPSAltitudeRef, GPSLatitudeRef, GPSLongitudeRef, GPSDateStamp, GPSTimeStamp, GPSSpeedRef, GPSSpeed, GPSImgDirection, GPSImgDirectionRef, GPSDestBearing, GPSDestBearingRef
- **TAG_TO_IMAGE**：ImageWidth, ImageLength, PixelXDimension, PixelYDimension, Orientation, XResolution, YResolution, ResolutionUnit, ColorSpace, BitsPerSample, SamplesPerPixel, Compression, PhotometricInterpretation, YCbCrPositioning, PlanarConfiguration, ExifVersion, FlashPixVersion, ComponentsConfiguration, CompressedBitsPerPixel
- **TAG_TO_COPYRIGHT**：Artist, Copyright, UserComment, ImageDescription, MakerNote

解析时：从 expanded 打平得到 raw；camera/shooting/location/image/copyright 用 pickToRecord(raw, TAG_TO_*) 得到 snake_case 键的 Record；GPS 若在 expanded.gps 有 Latitude/Longitude 会补到 raw。

---

## 三、展示区块（exif-blocks.ts）

### 3.1 BLOCK_TITLE_KEYS（blockId → i18n key）

- device → camera
- imageSettings → imageSettings
- location → gpsData
- dateTime → dateTime
- other → authorCopyright
- image → imageProperties
- icc → icc

### 3.2 BLOCK_TAG_NAMES（区块内 tag 顺序，ExifReader 标准名）

- **device**：Make, Model, BodySerialNumber, CameraSerialNumber, LensMake, LensModel, Software, FirmwareVersion
- **imageSettings**：Orientation, ExposureTime, FNumber, FocalLength, ISOSpeedRatings, WhiteBalance, Flash, ExposureProgram, ExposureMode, MeteringMode, SceneCaptureType, SceneType, ExposureBiasValue
- **location**：GPSLatitude, GPSLongitude, GPSAltitude, GPSDateStamp, GPSTimeStamp, GPSLatitudeRef, GPSLongitudeRef, GPSSpeedRef, GPSImgDirection, GPSImgDirectionRef, GPSDestBearing, GPSDestBearingRef
- **dateTime**：DateTimeOriginal, DateTime, DateTimeDigitized
- **other**：Artist, Copyright, UserComment, ImageDescription, MakerNote
- **image**：ImageWidth, ImageLength, XResolution, YResolution, ResolutionUnit, ColorSpace, BitsPerSample, SamplesPerPixel, Compression, PhotometricInterpretation, YCbCrPositioning, PlanarConfiguration, ExifVersion, FlashPixVersion, ComponentsConfiguration, CompressedBitsPerPixel
- **icc**：[]（空）

### 3.3 BLOCK_ORDER（右侧面板顺序）

device → imageSettings → location → dateTime → other → image → icc

### 3.4 GPS_TAG_DISPLAY_LABELS（界面去 "GPS" 前缀）

GPSLatitude→Latitude, GPSLongitude→Longitude, GPSAltitude→Altitude, GPSDateStamp→Date Stamp, GPSTimeStamp→Time Stamp, GPSLatitudeRef→Latitude Ref, GPSLongitudeRef→Longitude Ref, GPSSpeedRef→Speed Ref, GPSImgDirection→Img Direction, GPSImgDirectionRef→Img Direction Ref, GPSDestBearing→Dest Bearing, GPSDestBearingRef→Dest Bearing Ref。其余 tag 用 getTagDisplayLabel(tag) 驼峰转可读。

---

## 四、风险维度与色相（exif-risk.ts）

- **维度**：location（GPS）、device（相机/镜头）、identity（作者/版权/注释/描述）、dateTime（拍摄/修改时间）、software
- **等级**：location→**high**；device、identity→**medium**；dateTime、software→**low**；无任一维度→**safe**
- **整体等级**：取存在维度的最高等级（high > medium > low > safe）
- **区块边框色**：getBlockRiskLevel(blockId, data)：location 有坐标→high；device 有数据→medium；other 有身份数据→medium；dateTime 有数据→low；imageSettings/image/icc→safe。色相与 5-视觉设计与Token 一致：high 红、medium 橙、low 黄、safe 绿。

---

## 五、清理预设（remove-presets.ts）

### 5.1 预设 ID

full、privacy、gps-only、device-only

### 5.2 各预设删除范围

- **full**：删除整块 GPS；0th IFD 除 Orientation(274) 外全删（含 271 Make, 272 Model, 305 Software, 306 DateTime, 315 Artist, 33432 Copyright, 50735 CameraSerialNumber 及 0th 中其余列出的 tag）；Exif IFD 全删（含 33434 ExposureTime, 33437 FNumber, 34850 ExposureProgram, 34855 ISOSpeedRatings, 36867 DateTimeOriginal, 37500 MakerNote, 37510 UserComment, 42033 BodySerialNumber, 42037 LensSerial 等）。实现上 full 单独走 applyFullPreset：0th 只留 274，Exif/GPS/Interop/1st 清空，thumbnail 置 null。

- **privacy**：gps: true；0th 删 Artist(315)、Copyright(33432)、Software(305)、CameraSerialNumber(50735)；Exif 删 BodySerialNumber(42033)、LensSerial(42037)、UserComment(37510)。

- **gps-only**：仅 gps: true，其余不删。

- **device-only**：0th 删 CameraSerialNumber(50735)；Exif 删 BodySerialNumber(42033)、LensSerial(42037)。

### 5.3 通则

- 所有预设**始终保留 Orientation**（0th.274）；若删除后 0th 缺 274 则补 1。
- 按区块删除（cleanJpegByBlockIds）时：FIELD_ID_TO_PIEXIF 中 fieldId 的 blockId 属于勾选区块则删该 tag；同样保留 Orientation。

---

## 六、可编辑与只读（exif-blocks.ts）

### 6.1 READ_ONLY_EDIT_TAGS（仅可删不可改）

MakerNote、FirmwareVersion、SceneType — 不提供编辑入口，仅可标记删除。

### 6.2 DISPLAY_ONLY_TAGS（仅展示，无编辑/删除按钮）

ImageWidth, ImageLength, BitsPerSample, SamplesPerPixel, Compression, PhotometricInterpretation, YCbCrPositioning, PlanarConfiguration, ExifVersion, FlashPixVersion, ComponentsConfiguration, CompressedBitsPerPixel。Image 区块中可编辑的为 XResolution、YResolution、ResolutionUnit、ColorSpace。

### 6.3 ASCII_ONLY_EDIT_FIELD_IDS（仅可打印 ASCII）

device.Make, device.Model, device.BodySerialNumber, device.CameraSerialNumber, device.LensMake, device.LensModel, device.Software, other.Artist, other.Copyright, other.UserComment, other.ImageDescription。写入前 toAsciiOnly（过滤非 \x20-\x7E）。

### 6.4 INTEGER_ONLY_NUMERIC_TAGS

ISOSpeedRatings — 输入仅允许整数。

### 6.5 NUMERIC_INPUT_TAGS（数字/有理数/分数）

ExposureTime, FNumber, FocalLength, ISOSpeedRatings, ExposureBiasValue, GPSLatitude, GPSLongitude, GPSAltitude, GPSImgDirection, GPSDestBearing, XResolution, YResolution。允许数字、小数点、负号、单斜杠分数；filterNumericRational 过滤非法字符。

---

## 七、fieldId 与 piexif 映射（exif-export-edit.ts）

### 7.1 TAG_0TH（tag 名 → 号）

ImageDescription 270, Make 271, Model 272, Orientation 274, XResolution 282, YResolution 283, ResolutionUnit 296, Software 305, DateTime 306, Artist 315, Copyright 33432, CameraSerialNumber 50735.

### 7.2 TAG_EXIF

BodySerialNumber 42033, LensMake 42035, LensModel 42036, ExposureTime 33434, FNumber 33437, FocalLength 37386, ISOSpeedRatings 34855, WhiteBalance 41987, Flash 37385, ExposureProgram 34850, ExposureMode 41986, MeteringMode 37383, SceneCaptureType 41990, ExposureBiasValue 37380, UserComment 37510, DateTimeOriginal 36867, DateTimeDigitized 36868, MakerNote 37500, ColorSpace 40961.

### 7.3 TAG_GPS

GPSLatitudeRef 1, GPSLatitude 2, GPSLongitudeRef 3, GPSLongitude 4, GPSAltitudeRef 5, GPSAltitude 6, GPSTimeStamp 7, GPSDateStamp 29, GPSSpeedRef 12, GPSImgDirection 17, GPSImgDirectionRef 16, GPSDestBearing 24, GPSDestBearingRef 23.

### 7.4 FIELD_ID_TO_PIEXIF

由 BLOCK_TAG_NAMES 与 TAG_0TH/TAG_EXIF/TAG_GPS 生成：fieldId = `blockId.tag`（如 device.Make, other.Artist），值为 { ifd: '0th'|'Exif'|'GPS', tag: number }。用于编辑导出与按区块删除。

---

## 八、valueToPiexif（UI 值 → 写入值）

- **下拉类**（DROPDOWN_FIELD_TAGS）：Orientation/WhiteBalance/Flash/ExposureProgram/ExposureMode/MeteringMode/SceneCaptureType/ResolutionUnit/ColorSpace → 数字转 [num] 或 num；GPSLatitudeRef/GPSLongitudeRef → N/S/E/W；GPSImgDirectionRef/GPSDestBearingRef → T/M；GPSSpeedRef → K/M/N。
- **有理数**（ExposureTime, FNumber, FocalLength, ExposureBiasValue, XResolution, YResolution）：parseRationalFromUi 支持 "a/b" 或小数，返回 [num, den]。
- **ISOSpeedRatings**：整数，写 [n] 或 n（依 piexif 要求）。
- **GPS 经纬度**：小数转度分秒三元组 [[deg,1],[min,1],[secNum,secDenom]]；纬度/经度 Ref 缺时默认 N、E。
- **GPSAltitude**：有理数或小数，取绝对值；AltitudeRef 按正负写 0/1。
- **GPSTimeStamp**：HH:MM:SS 或空格分隔三数字 → [[h,1],[m,1],[s,1]]。
- **GPSDateStamp**：取前 10 字符（YYYY-MM-DD）。
- **DateTime/DateTimeOriginal/DateTimeDigitized**：字符串原样。
- **UserComment**：前缀 "ASCII\x00\x00\x00" + toAsciiOnly(trimmed)。
- **Artist/Copyright/ImageDescription/Make/Model/BodySerialNumber/CameraSerialNumber/LensMake/LensModel/Software**：toAsciiOnly(trimmed)。
- 其余：trimmed 原样（若 piexif 接受）。

---

## 九、下拉选项（exif-field-options.ts）

### 9.1 DROPDOWN_FIELD_OPTIONS（tag → { value, labelKey }[]）

- **Orientation**：1～8（top-left, top-right, …）
- **WhiteBalance**：0, 1（Auto, Manual）
- **Flash**：0, 1, 5, 7, 9, 13, 15, 16, 24, 25, 29, 31（各含义见 OPTION_LABEL_EN）
- **ExposureProgram**：0～8（Undefined, Manual, Normal program, …）
- **ExposureMode**：0, 1, 2
- **MeteringMode**：0～6
- **SceneCaptureType**：0～3（Standard, Landscape, Portrait, Night scene）
- **ResolutionUnit**：1, 2, 3（Unknown, inches, centimeters）
- **ColorSpace**：1, 2, 65535（sRGB, Adobe RGB, Uncalibrated）
- **GPSLatitudeRef**：N, S；**GPSLongitudeRef**：E, W
- **GPSImgDirectionRef** / **GPSDestBearingRef**：T, M
- **GPSSpeedRef**：K, M, N

### 9.2 OPTION_LABEL_EN

英文展示文案，与 messages 中 exif.opt.* 对应；写入时用 value，展示用 t(labelKey) 或 getOptionLabelEn(tag, value)。

### 9.3 DROPDOWN_FIELD_TAGS

所有有下拉的 tag 名集合；getOriginalValueForField 对这类 tag 取 value 优先（否则 description）。

---

## 十、单张编辑导出与删除（exif-export-edit）

- **applyEditsToDict**：先遍历 deletedFieldIds，从 dict 中删对应 ifd.tag（跳过 Orientation）；再遍历 editedValues，写入 valueToPiexif(fieldId, uiValue)；GPS 纬度/经度/高度 Ref 缺时补 N/E 及 AltitudeRef 0/1；最后若 0th 无 Orientation 则写 1。
- **导出文件名**：edited-YYYYMMDDHHmmss.jpg
- **仅 JPEG**：非 JPEG 抛错 "Only JPEG is supported for editing export"；load 失败抛 "Unable to read EXIF from JPEG"。

---

## 十一、按区块清理（exif-remove.ts）

- **applyBlockIdsToDict(dict, blockIds)**：遍历 FIELD_ID_TO_PIEXIF，若 fieldId 的 blockId 在 blockIds 中则删该 tag；保留 0th.274；若 0th 无 274 则补 1。
- **cleanJpegByBlockIds(blob, blockIds)**：load → applyBlockIdsToDict → dump → insert → 返回 Blob。仅 JPEG；非 JPEG 由上层走 full 或 Canvas 路径。

---

## 十二、复刻检查清单（EXIF 相关）

- [ ] ParsedExifData 五维度 + raw 与 exif-reader 的 TAG_TO_* 一致
- [ ] BLOCK_TITLE_KEYS、BLOCK_TAG_NAMES、BLOCK_ORDER、GPS_TAG_DISPLAY_LABELS 与 UI 区块顺序及标签一致
- [ ] getExifRisk、getBlockRiskLevel、getBlockHasData 与维度/色相一致
- [ ] PRESET_SPECS 四预设与 cleanJpegByPreset/applyFullPreset 一致；始终保留 Orientation
- [ ] READ_ONLY_EDIT_TAGS、DISPLAY_ONLY_TAGS、ASCII_ONLY_EDIT_FIELD_IDS、INTEGER_ONLY_NUMERIC_TAGS、NUMERIC_INPUT_TAGS 与行内编辑/删除按钮显示一致
- [ ] FIELD_ID_TO_PIEXIF 与 TAG_0TH/TAG_EXIF/TAG_GPS 及 BLOCK_TAG_NAMES 一致
- [ ] valueToPiexif 各 tag 类型与 DROPDOWN_FIELD_OPTIONS、UserComment 前缀、toAsciiOnly 一致
- [ ] 按区块删除与 FIELD_ID_TO_PIEXIF、blockId 勾选一致
