import path from "node:path";
import { test, expect } from "@playwright/test";

const FIXTURES = {
  withExif: path.join(process.cwd(), "e2e/fixtures/images/with-exif.jpg"),
  noExif: path.join(process.cwd(), "e2e/fixtures/images/no-exif.jpg"),
};

test.describe("上传与解析", () => {
  test("上传带 EXIF 的图片后，元数据区块展示内容（空状态消失）", async ({
    page,
  }) => {
    await page.goto("/");

    const metadataSection = page.locator("#metadata");
    await expect(
      metadataSection.getByText("No metadata yet.", { exact: true })
    ).toBeVisible();

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(FIXTURES.withExif);

    // 等待解析完成：空状态文案消失（或出现 Loading 再消失）
    await expect(
      metadataSection.getByText("No metadata yet.", { exact: true })
    ).not.toBeVisible({ timeout: 15000 });

    // 有内容：至少不应再是纯空状态
    await expect(metadataSection).toBeVisible();
  });

  test("上传无 EXIF 的图片后，页面正常、不报错", async ({ page }) => {
    await page.goto("/");

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(FIXTURES.noExif);

    await expect(page.locator("#metadata")).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("main")).toBeVisible();
  });
});

test.describe("剥离（Strip）与下载清理后", () => {
  test("上传带 EXIF 的 JPEG 后可选预设执行剥离并下载清理后图片", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator('input[type="file"]').setInputFiles(FIXTURES.withExif);

    await expect(
      page.locator("#metadata").getByText("No metadata yet.", { exact: true })
    ).not.toBeVisible({ timeout: 15000 });

    // 打开 Strip 下拉
    await page.getByRole("button", { name: /strip exif/i }).click();
    // 选第一个预设（Full 或等价）
    await page.getByRole("button", { name: /remove all exif/i }).click();

    // 等待剥离完成：下载清理后按钮变为可点
    await expect(
      page.getByRole("button", { name: /download stripped image/i })
    ).toBeEnabled({ timeout: 15000 });

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /download stripped image/i }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/_cleaned_.*\.(jpg|jpeg|png|webp)$/i);
  });
});

test.describe("导出 EXIF", () => {
  test("上传带 EXIF 图片后可导出 CSV 并触发下载", async ({ page }) => {
    await page.goto("/");
    await page.locator('input[type="file"]').setInputFiles(FIXTURES.withExif);

    await expect(
      page.locator("#metadata").getByText("No metadata yet.", { exact: true })
    ).not.toBeVisible({ timeout: 15000 });

    const downloadPromise = page.waitForEvent("download");

    await page.getByRole("button", { name: /export exif/i }).click();
    await page.getByRole("button", { name: /^csv$/i }).click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.csv$/i);
  });

  test("上传带 EXIF 图片后可导出 JSON 并触发下载", async ({ page }) => {
    await page.goto("/");
    await page.locator('input[type="file"]').setInputFiles(FIXTURES.withExif);

    await expect(
      page.locator("#metadata").getByText("No metadata yet.", { exact: true })
    ).not.toBeVisible({ timeout: 15000 });

    const downloadPromise = page.waitForEvent("download");

    await page.getByRole("button", { name: /export exif/i }).click();
    await page.getByRole("button", { name: /^json$/i }).click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.json$/i);
  });
});
