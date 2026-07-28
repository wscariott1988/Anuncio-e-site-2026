import { test, expect, type Page, type ConsoleMessage } from "@playwright/test";

const PRIVACY_URL = "/politica-de-privacidade";
const TERMS_URL = "/termos";

type ConsoleViolation = { type: string; text: string; url?: string };

function collectConsoleViolations(page: Page, violations: ConsoleViolation[]) {
  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error") {
      const text = msg.text();
      if (text.includes("webpack-hmr") || text.includes("WebSocket")) return;
      if (text.includes("hydration") || text.includes("React does not recognize")) return;
      if (text.includes("Failed to load resource")) return;
      violations.push({ type: "console_error", text });
    }
  });

  page.on("pageerror", (err) => {
    const msg = String(err);
    if (msg.includes("webpack-hmr") || msg.includes("WebSocket")) return;
    violations.push({ type: "pageerror", text: msg });
  });

  page.on("response", (res) => {
    const status = res.status();
    const url = res.url();
    if (status >= 400) {
      try {
        const pathname = new URL(url).pathname;
        if (status === 404 && ["/", "/landingpage/obrigado"].includes(pathname)) return;
      } catch { /* not a valid URL */ }
      if (url.includes("webpack-hmr") || url.includes("_next/")) return;
      violations.push({ type: `response_${status}`, text: `${status} ${url}`, url });
    }
  });
}

function assertNoViolations(violations: ConsoleViolation[]) {
  const critical = violations.filter(
    (v) => v.type !== "response_404" && v.type !== "response_503" && v.type !== "request_failed"
  );
  expect(critical, `Unexpected violations: ${JSON.stringify(critical, null, 2)}`).toHaveLength(0);
}

/* ------------------------------------------------------------------ */
/*  Tests                                                              */
/* ------------------------------------------------------------------ */

for (const route of [
  { name: "Política de Privacidade", url: PRIVACY_URL, date: "01/02/2026" },
  { name: "Termos de Uso", url: TERMS_URL, date: "01/02/2026" },
]) {
  test.describe(`${route.name} (${route.url})`, () => {
    const violations: ConsoleViolation[] = [];

    test.beforeEach(async ({ page }) => {
      collectConsoleViolations(page, violations);
      await page.goto(route.url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
    });

    test.afterEach(() => {
      assertNoViolations(violations);
    });

    test("returns 200", async ({ page }) => {
      const response = await page.goto(route.url);
      expect(response?.status()).toBe(200);
    });

    test("has exactly one h1", async ({ page }) => {
      const h1 = page.locator("h1");
      await expect(h1).toBeVisible();
      expect(await h1.count()).toBe(1);
    });

    test("displays last update date", async ({ page }) => {
      await expect(page.getByText(route.date)).toBeVisible();
    });

    test("has correct title", async ({ page }) => {
      await expect(page).toHaveTitle(new RegExp(route.name));
    });

    test("has noindex and follow", async ({ page }) => {
      const robots = await page.locator('meta[name="robots"]').getAttribute("content");
      expect(robots).toContain("noindex");
      expect(robots).toContain("follow");
    });

    test("has canonical URL", async ({ page }) => {
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toContain(route.url);
    });

    test("contains mailto link for contato@grupows.com", async ({ page }) => {
      const mailto = page.locator('a[href="mailto:contato@grupows.com"]');
      expect(await mailto.count()).toBeGreaterThanOrEqual(1);
      await expect(mailto.first()).toBeVisible();
    });

    test("has no CPF, CNPJ or responsible person data", async ({ page }) => {
      const body = await page.textContent("body");
      expect(body).not.toMatch(/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/);
      expect(body).not.toMatch(/\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}/);
    });

    test("has no placeholder or provisional text", async ({ page }) => {
      const body = await page.textContent("body");
      expect(body).not.toMatch(/placeholder|lorem ipsum|texto provisório|em breve/i);
    });

    test("header contains only brand and back link", async ({ page }) => {
      const header = page.locator("header");
      await expect(header).toBeVisible();
      const backLink = header.getByText("Voltar para a Landing Page");
      await expect(backLink).toBeVisible();
      expect(await backLink.getAttribute("href")).toBe("/landingpage");
    });

    test("header has no CTA button", async ({ page }) => {
      const header = page.locator("header");
      const buttons = header.locator("button");
      expect(await buttons.count()).toBe(0);
    });

    test("footer contains both legal page links", async ({ page }) => {
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
      await expect(footer.getByRole("link", { name: "Política de Privacidade" })).toBeVisible();
      await expect(footer.getByRole("link", { name: "Termos de Uso" })).toBeVisible();
    });

    test("footer contains mailto link", async ({ page }) => {
      const footer = page.locator("footer");
      const mailto = footer.locator('a[href="mailto:contato@grupows.com"]');
      expect(await mailto.count()).toBe(1);
    });

    test("footer link goes to /landingpage, not /", async ({ page }) => {
      const footer = page.locator("footer");
      const lpLink = footer.getByText("Voltar à Landing Page");
      await expect(lpLink).toBeVisible();
      expect(await lpLink.getAttribute("href")).toBe("/landingpage");
      const links = footer.locator("a");
      const count = await links.count();
      for (let i = 0; i < count; i++) {
        const href = await links.nth(i).getAttribute("href");
        if (href) {
          expect(href).not.toBe("/");
        }
      }
    });

    test("no horizontal scroll at mobile widths", async ({ page }) => {
      for (const width of [360, 390]) {
        await page.setViewportSize({ width, height: 844 });
        await page.goto(route.url, { waitUntil: "networkidle" });
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
      }
    });

    test("no horizontal scroll at tablet width", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(route.url, { waitUntil: "networkidle" });
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });

    test("no horizontal scroll at desktop width", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route.url, { waitUntil: "networkidle" });
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });

    test("has no external scripts added", async ({ page }) => {
      await page.goto(route.url, { waitUntil: "networkidle" });
      const scripts = page.locator("script[src]");
      const count = await scripts.count();
      for (let i = 0; i < count; i++) {
        const src = await scripts.nth(i).getAttribute("src");
        if (src) {
          expect(src).toMatch(/^\/_next\//);
        }
      }
    });
  });
}

test.describe("Cross-links between legal pages", () => {
  test("privacy page links to terms page", async ({ page }) => {
    await page.goto(PRIVACY_URL, { waitUntil: "networkidle" });
    const links = page.getByRole("link", { name: "Termos de Uso" });
    expect(await links.count()).toBeGreaterThanOrEqual(1);
    await expect(links.first()).toBeVisible();
    expect(await links.first().getAttribute("href")).toBe("/termos");
  });

  test("terms page links to privacy page", async ({ page }) => {
    await page.goto(TERMS_URL, { waitUntil: "networkidle" });
    const links = page.getByRole("link", { name: "Política de Privacidade" });
    expect(await links.count()).toBeGreaterThanOrEqual(1);
    await expect(links.first()).toBeVisible();
    expect(await links.first().getAttribute("href")).toBe("/politica-de-privacidade");
  });
});

test.describe("Route isolation", () => {
  test("root path / returns 404", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(404);
  });

  test("landingpage/obrigado returns 404", async ({ page }) => {
    const response = await page.goto("/landingpage/obrigado");
    expect(response?.status()).toBe(404);
  });
});
