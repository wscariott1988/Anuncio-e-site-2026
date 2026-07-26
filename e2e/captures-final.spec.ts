import { test, expect } from "@playwright/test";

const PAGE_URL = "/landingpage";

async function waitForPageReady(page: import("@playwright/test").Page) {
  await page.goto(PAGE_URL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("h1")).toBeVisible();
  await page.waitForTimeout(500);
}

async function scrollToH2(page: import("@playwright/test").Page, text: string) {
  const h2 = page.locator(`h2:has-text("${text}")`).first();
  await h2.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
}

test("tablet-hero-final.png — 768x1024", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await waitForPageReady(page);
  await page.screenshot({ path: "artifacts/visual-review/tablet-hero-final.png", fullPage: false });
});

test("mobile-header-final.png — 360x800", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await waitForPageReady(page);
  await page.screenshot({ path: "artifacts/visual-review/mobile-header-final.png", fullPage: false });
});

test("desktop-investimento-final.png — 1440x900", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await waitForPageReady(page);
  await scrollToH2(page, "Landing Page completa por");
  await page.screenshot({ path: "artifacts/visual-review/desktop-investimento-final.png", fullPage: false });
});

test("tablet-investimento-final.png — 768x1024", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await waitForPageReady(page);
  await scrollToH2(page, "Landing Page completa por");
  await page.screenshot({ path: "artifacts/visual-review/tablet-investimento-final.png", fullPage: false });
});

test("mobile-portfolio-viewer-final.png — 390x844", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await waitForPageReady(page);
  const mobileStrip = page.locator(".md\\:hidden .overflow-x-auto");
  const card = mobileStrip.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
  await card.scrollIntoViewIfNeeded();
  await card.click();
  await expect(page.locator("dialog[open]")).toBeVisible({ timeout: 10_000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "artifacts/visual-review/mobile-portfolio-viewer-final.png", fullPage: false });
  await page.keyboard.press("Escape");
});
