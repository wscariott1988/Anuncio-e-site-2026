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

async function scrollFullPage(page: import("@playwright/test").Page) {
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  let current = 0;
  while (current < scrollHeight) {
    current += viewportHeight;
    await page.evaluate((y) => window.scrollTo(0, y), current);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => {
    document.querySelectorAll("img[loading='lazy']").forEach((img) => {
      img.removeAttribute("loading");
    });
  });
  await page.waitForTimeout(1000);
  await page.waitForFunction(() => {
    const imgs = Array.from(document.querySelectorAll("img")) as HTMLImageElement[];
    return imgs.every((img) => img.complete && img.naturalWidth > 0);
  }, { timeout: 10_000 });
  await page.evaluate(() => {
    const portfolio = Array.from(document.querySelectorAll('[aria-label*="Ver projeto"] img')) as HTMLImageElement[];
    portfolio.forEach((img) => {
      if (img.naturalWidth <= 0) {
        throw new Error(`Portfolio image not loaded: naturalWidth=${img.naturalWidth}`);
      }
    });
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

/* ------------------------------------------------------------------ */
/*  EXISTING CAPTURES                                                  */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  GRID CAPTURES                                                      */
/* ------------------------------------------------------------------ */

test("desktop-included-grid-final.png — 1440x900", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await waitForPageReady(page);
  await scrollToH2(page, "Tudo o que está incluído no projeto");
  await page.screenshot({ path: "artifacts/visual-review/desktop-included-grid-final.png", fullPage: false });
});

test("desktop-portfolio-centered-final.png — 1440x900", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await waitForPageReady(page);
  await scrollToH2(page, "Projetos reais desenvolvidos por mim");
  await page.screenshot({ path: "artifacts/visual-review/desktop-portfolio-centered-final.png", fullPage: false });
});

test("desktop-process-grid-final.png — 1440x900", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await waitForPageReady(page);
  await scrollToH2(page, "Da contratação à publicação em três etapas");
  await page.screenshot({ path: "artifacts/visual-review/desktop-process-grid-final.png", fullPage: false });
});

test("tablet-process-grid-final.png — 768x1024", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await waitForPageReady(page);
  await scrollToH2(page, "Da contratação à publicação em três etapas");
  await page.screenshot({ path: "artifacts/visual-review/tablet-process-grid-final.png", fullPage: false });
});

test("mobile-sections-preserved-final.png — 390x844", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await waitForPageReady(page);
  await scrollToH2(page, "Da contratação à publicação em três etapas");
  await page.screenshot({ path: "artifacts/visual-review/mobile-sections-preserved-final.png", fullPage: false });
});

/* ------------------------------------------------------------------ */
/*  NEW CAPTURES — AboutSection                                        */
/* ------------------------------------------------------------------ */

test("desktop-about-two-columns-final.png — 1440x900", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await waitForPageReady(page);
  await scrollToH2(page, "Seu projeto é desenvolvido");
  await page.screenshot({ path: "artifacts/visual-review/desktop-about-two-columns-final.png", fullPage: false });
});

test("tablet-about-final.png — 768x1024", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await waitForPageReady(page);
  await scrollToH2(page, "Seu projeto é desenvolvido");
  await page.screenshot({ path: "artifacts/visual-review/tablet-about-final.png", fullPage: false });
});

test("mobile-about-preserved-final.png — 390x844", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await waitForPageReady(page);
  await scrollToH2(page, "Seu projeto é desenvolvido");
  await page.screenshot({ path: "artifacts/visual-review/mobile-about-preserved-final.png", fullPage: false });
});

/* ------------------------------------------------------------------ */
/*  NEW CAPTURES — Portfolio closing                                   */
/* ------------------------------------------------------------------ */

test("desktop-portfolio-closing-final.png — 1440x900", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await waitForPageReady(page);
  await scrollToH2(page, "Projetos reais desenvolvidos por mim");
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(300);
  await page.screenshot({ path: "artifacts/visual-review/desktop-portfolio-closing-final.png", fullPage: false });
});

/* ------------------------------------------------------------------ */
/*  NEW CAPTURES — Full page                                           */
/* ------------------------------------------------------------------ */

test.describe("Full page captures", () => {
  test.setTimeout(120_000);

  test("landingpage-desktop-full-final.png — 1440x900 fullPage", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await waitForPageReady(page);
    await scrollFullPage(page);
    await page.screenshot({ path: "artifacts/visual-review/landingpage-desktop-full-final.png", fullPage: true });
  });

  test("landingpage-mobile-full-final.png — 390x844 fullPage", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);
    await scrollFullPage(page);
    await page.screenshot({ path: "artifacts/visual-review/landingpage-mobile-full-final.png", fullPage: true });
  });
});

/* ------------------------------------------------------------------ */
/*  SOCIAL CAPTURES                                                    */
/* ------------------------------------------------------------------ */

test("open-graph-preview-final.png — Open Graph image", async ({ page }) => {
  await page.goto("/landingpage/opengraph-image", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: "artifacts/visual-review/open-graph-preview-final.png",
    fullPage: false,
  });
});
