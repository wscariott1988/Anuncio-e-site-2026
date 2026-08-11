import { expect, test } from "@playwright/test";

const PAGE_URL = "/landingpage-essencial";
const OUT_DIR = "artifacts/visual-review-essential";

async function scrollToH2(page: import("@playwright/test").Page, text: string) {
  const h2 = page.locator(`h2:has-text("${text}")`).first();
  await h2.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
}

test.describe("Essential route captures", () => {
  test("Desktop captures — 1440x900 viewport clips", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toBeVisible();
    await page.waitForTimeout(500);

    await page.screenshot({ path: `${OUT_DIR}/desktop-hero.png`, fullPage: false });

    await scrollToH2(page, "Tudo o que está incluído no projeto Essencial");
    await page.screenshot({ path: `${OUT_DIR}/desktop-incluido.png`, fullPage: false });

    await scrollToH2(page, "Projetos reais desenvolvidos por mim");
    await page.screenshot({ path: `${OUT_DIR}/desktop-portfolio.png`, fullPage: false });

    await scrollToH2(page, "Da contratação à publicação em quatro etapas");
    await page.screenshot({ path: `${OUT_DIR}/desktop-processo.png`, fullPage: false });

    await scrollToH2(page, "Sua Landing Page Essencial por");
    await page.screenshot({ path: `${OUT_DIR}/desktop-investimento.png`, fullPage: false });

    await scrollToH2(page, "O que você precisa saber antes de iniciar");
    await page.screenshot({ path: `${OUT_DIR}/desktop-faq-cta.png`, fullPage: false });
  });

  test("Mobile captures — 390x844 viewport clips", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toBeVisible();
    await page.waitForTimeout(500);

    await page.screenshot({ path: `${OUT_DIR}/mobile-hero.png`, fullPage: false });

    await scrollToH2(page, "Projetos reais desenvolvidos por mim");
    await page.screenshot({ path: `${OUT_DIR}/mobile-portfolio.png`, fullPage: false });

    await scrollToH2(page, "Sua Landing Page Essencial por");
    await page.screenshot({ path: `${OUT_DIR}/mobile-investimento.png`, fullPage: false });

    await scrollToH2(page, "O que você precisa saber antes de iniciar");
    await page.screenshot({ path: `${OUT_DIR}/mobile-faq.png`, fullPage: false });

    const mobileStrip = page.locator(".md\\:hidden .overflow-x-auto");
    const card = mobileStrip.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
    await card.scrollIntoViewIfNeeded();
    await card.click();
    await expect(page.locator("dialog[open]")).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${OUT_DIR}/mobile-portfolio-viewer.png`, fullPage: false });
    await page.keyboard.press("Escape");
  });

  test("Tablet captures — 768x1024 viewport clips", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toBeVisible();
    await page.waitForTimeout(500);

    await page.screenshot({ path: `${OUT_DIR}/tablet-hero.png`, fullPage: false });

    await scrollToH2(page, "Projetos reais desenvolvidos por mim");
    await page.screenshot({ path: `${OUT_DIR}/tablet-portfolio.png`, fullPage: false });

    await scrollToH2(page, "Sua Landing Page Essencial por");
    await page.screenshot({ path: `${OUT_DIR}/tablet-investimento.png`, fullPage: false });
  });
});
