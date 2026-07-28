import { test } from "@playwright/test";

const routes = [
  { name: "politica-de-privacidade", url: "/politica-de-privacidade" },
  { name: "termos", url: "/termos" },
];

for (const route of routes) {
  test(`${route.name}-mobile.png — 390x844`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route.url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `e2e/captures/${route.name}-mobile.png`, fullPage: true });
  });

  test(`${route.name}-desktop.png — 1440x900`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(route.url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `e2e/captures/${route.name}-desktop.png`, fullPage: true });
  });
}
