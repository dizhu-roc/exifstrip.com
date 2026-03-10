import { test, expect } from "@playwright/test";

test.describe("首页 UI", () => {
  test("首页加载成功且包含主要区块", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("main")).toBeVisible();

    // Hero 区块
    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();
    await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();

    // 上传区块（通过 section 或文案定位）
    await expect(
      page.getByRole("heading", { name: /upload|上传/i }).first()
    ).toBeVisible();

    // Metadata 区块
    await expect(page.locator("#metadata")).toBeVisible();

    // FAQ 区块
    await expect(page.locator("#faq")).toBeVisible();

    // Footer
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("未上传时 Metadata 区域显示空状态文案", async ({ page }) => {
    await page.goto("/");

    const metadataSection = page.locator("#metadata");
    await expect(metadataSection).toBeVisible();
    await expect(
      metadataSection.getByText("No metadata yet.", { exact: true })
    ).toBeVisible();
    await expect(
      metadataSection.getByText(/upload one or more images/i)
    ).toBeVisible();
  });
});

test.describe("导航", () => {
  test("顶栏导航链接可点击并跳转", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /about/i }).first().click();
    await expect(page).toHaveURL(/\/about/);

    await page.goto("/");
    await page.getByRole("link", { name: /faq/i }).first().click();
    await expect(page).toHaveURL(/\/faq/);
  });

  test("Footer 链接可点击并跳转", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("contentinfo").getByRole("link", { name: /privacy/i }).click();
    await expect(page).toHaveURL(/\/privacy/);

    await page.goto("/");
    await page.getByRole("contentinfo").getByRole("link", { name: /terms/i }).click();
    await expect(page).toHaveURL(/\/terms/);

    await page.goto("/");
    await page.getByRole("contentinfo").getByRole("link", { name: /about/i }).click();
    await expect(page).toHaveURL(/\/about/);

    await page.goto("/");
    await page.getByRole("contentinfo").getByRole("link", { name: /faq/i }).click();
    await expect(page).toHaveURL(/\/faq/);
  });
});

test.describe("子页面可访问", () => {
  test("Privacy / Terms / About / FAQ 页面可正常打开", async ({ page }) => {
    for (const path of ["/privacy", "/terms", "/about", "/faq"]) {
      await page.goto(path);
      await expect(page.getByRole("main")).toBeVisible();
      await expect(page).toHaveURL(path);
    }
  });

  test("Guides / Blog 列表页可正常打开", async ({ page }) => {
    await page.goto("/guides");
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page).toHaveURL(/\/guides/);

    await page.goto("/blog");
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page).toHaveURL(/\/blog/);
  });
});

test.describe("语言切换", () => {
  test("切换为中文后页面文案包含中文", async ({ page }) => {
    await page.goto("/");

    // 语言选择器在 header 内，点击展开下拉后选「中文」
    const langTrigger = page.locator("header").getByRole("button").filter({ hasText: /English|中文|日本語/ });
    await langTrigger.first().click();
    await page.getByRole("button", { name: "中文" }).click();

    await expect(
      page.getByRole("heading", { name: "上传图片" })
    ).toBeVisible({ timeout: 5000 });
  });
});
