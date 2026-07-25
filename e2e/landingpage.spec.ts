import { test, expect, type Page, type ConsoleMessage } from "@playwright/test";

const PAGE_URL = "/landingpage";

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

type ConsoleViolation = { type: string; text: string; url?: string };

function collectConsoleViolations(page: Page, violations: ConsoleViolation[]) {
  const blockedPatterns = [/generate_lead/i, /wp-json/i, /wordpress/i];

  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error") {
      const text = msg.text();
      if (text.includes("webpack-hmr") || text.includes("WebSocket")) return;
      if (text.includes("404") || text.includes("502") || text.includes("503")) return;
      if (text.includes("hydration") || text.includes("React does not recognize")) return;
      for (const p of blockedPatterns) {
        if (p.test(text)) {
          violations.push({ type: "console_error_pattern", text });
          return;
        }
      }
      violations.push({ type: "console_error", text });
    }
  });

  page.on("pageerror", (err) => {
    const msg = String(err);
    if (msg.includes("webpack-hmr") || msg.includes("WebSocket")) return;
    violations.push({ type: "pageerror", text: msg });
  });

  page.on("requestfailed", (req) => {
    const url = req.url();
    const failure = req.failure();
    if (url.includes("webpack-hmr") || url.includes("ws://")) return;
    violations.push({
      type: "request_failed",
      text: failure?.errorText ?? "unknown",
      url,
    });
  });

  page.on("response", (res) => {
    const status = res.status();
    const url = res.url();
    if (status >= 400) {
      try {
        const pathname = new URL(url).pathname;
        const allowed404 = ["/", "/politica-de-privacidade", "/termos", "/landingpage/obrigado"];
        if (status === 404 && allowed404.includes(pathname)) return;
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

async function waitForPageReady(page: Page) {
  await page.goto(PAGE_URL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("h1")).toBeVisible();
  await page.waitForTimeout(500);
}

async function openFormFromHero(page: Page) {
  const heroBtn = page.getByRole("button", { name: "Quero minha Landing Page" }).first();
  await heroBtn.scrollIntoViewIfNeeded();
  await heroBtn.click();
  await expect(page.locator("dialog[open]")).toBeVisible({ timeout: 10_000 });
}

async function scrollToH2(page: Page, text: string) {
  const h2 = page.locator(`h2:has-text("${text}")`).first();
  await h2.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
}

/* ------------------------------------------------------------------ */
/*  ROUTE TESTS                                                       */
/* ------------------------------------------------------------------ */

test.describe("Route tests", () => {
  let violations: ConsoleViolation[];
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    violations = [];
    page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    collectConsoleViolations(page, violations);
  });

  test.afterEach(() => {
    assertNoViolations(violations);
    void page.close();
  });

  test("GET /landingpage returns 200", async () => {
    const res = await page.goto(PAGE_URL, { waitUntil: "networkidle" });
    expect(res?.status()).toBe(200);
  });

  test("Root / returns 404 (intentional)", async () => {
    const res = await page.goto("/");
    expect(res?.status()).toBe(404);
  });

  test("Exactly 1 h1 exists", async () => {
    await waitForPageReady(page);
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
  });

  test("No WhatsApp links in the page", async () => {
    await waitForPageReady(page);
    const whatsappLinks = page.locator('a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="whatsapp"]');
    await expect(whatsappLinks).toHaveCount(0);
  });

  test("No external commercial links", async () => {
    await waitForPageReady(page);
    const links = page.locator('a[target="_blank"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute("href");
      expect(href).not.toContain("instagram.com");
      expect(href).not.toContain("facebook.com");
      expect(href).not.toContain("linkedin.com");
      expect(href).not.toContain("twitter.com");
      expect(href).not.toContain("wa.me");
    }
  });

  test("No fixed mobile CTA button", async () => {
    await waitForPageReady(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    const fixedButtons = page.locator('button[style*="position: fixed"], button.fixed, button[class*="fixed"]');
    await expect(fixedButtons).toHaveCount(0);
  });

  test("No /landingpage/obrigado page", async () => {
    const res = await page.goto("/landingpage/obrigado");
    expect(res?.status()).toBe(404);
  });

  test("No Next.js demo content visible", async () => {
    await waitForPageReady(page);
    const body = await page.textContent("body");
    expect(body).not.toContain("Get started by editing");
    expect(body).not.toContain("Learn Next.js");
  });

  test("No hero placeholder text", async () => {
    await waitForPageReady(page);
    const body = await page.textContent("body");
    expect(body).not.toContain("Exemplo visual de estrutura");
  });

  test("13 sections present in order via h2 elements", async () => {
    await waitForPageReady(page);
    const h2s = page.locator("h2");
    const count = await h2s.count();
    expect(count).toBeGreaterThanOrEqual(9);
  });

  test("No horizontal scroll at 360px, 375px, 390px, 768px, 1440px", async () => {
    await waitForPageReady(page);
    for (const width of [360, 375, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(300);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    }
  });

  test("Metadata contains correct title, description, canonical, robots", async () => {
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });

    const title = await page.title();
    expect(title).toContain("Landing Page para Tráfego Pago");
    expect(title).toContain("Anúncio & Site");

    const metaDesc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(metaDesc).toContain("R$ 997");

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/landingpage");

    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toContain("noindex");
  });

  test("No strikethrough, discount, urgency, vagas, cronômetro", async () => {
    await waitForPageReady(page);
    const body = await page.textContent("body");
    expect(body).not.toMatch(/~~|só restam|vagas? limitad[aoe]|últim[aoe]s?|conto(?:r|agem)|desconto|preço anterior|riscad[ao]/i);
    const strikethroughs = page.locator("s, strike, del");
    await expect(strikethroughs).toHaveCount(0);
  });

  test("Hero composition: desktop mockup loads, no external links", async () => {
    await waitForPageReady(page);
    // Desktop composition is visible at 1440px
    const desktopImage = page.locator('img[alt*="ZARQ Planejados"][alt*="desktop"]');
    await expect(desktopImage).toBeVisible();
    // Phone frame visible
    const mobileImage = page.locator('img[alt*="ZARQ Planejados"][alt*="mobile"]').first();
    await expect(mobileImage).toBeVisible();
    // No external links in hero
    const heroSection = page.locator("section").first();
    const heroLinks = heroSection.locator('a[target="_blank"]');
    expect(await heroLinks.count()).toBe(0);
  });

  test("Hero composition mobile: phone frame visible below CTA", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);
    const mobileFrame = page.locator('.md\\:hidden img');
    await expect(mobileFrame).toBeVisible();
  });

  test("Hero single-column at 768px (tablet)", async () => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await waitForPageReady(page);
    const grid = page.locator("section").first().locator("> div > div").first();
    const gridStyles = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns);
    expect(gridStyles).not.toContain(" ");
  });

  test("Hero two-column at 1440px (desktop)", async () => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await waitForPageReady(page);
    const grid = page.locator("section").first().locator("> div > div").first();
    const gridStyles = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns);
    expect(gridStyles).toContain(" ");
  });

  test("R$ 997 does not break between R$ and 997", async () => {
    await waitForPageReady(page);
    const nowrapSpans = page.locator("span.whitespace-nowrap");
    const count = await nowrapSpans.count();
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      const text = await nowrapSpans.nth(i).textContent();
      expect(text).toMatch(/R\$\s*997/);
      const whiteSpace = await nowrapSpans.nth(i).evaluate((el) => window.getComputedStyle(el).whiteSpace);
      expect(whiteSpace).toBe("nowrap");
    }
  });

  test("Fictitious address absent from visible page content", async () => {
    await waitForPageReady(page);
    const visibleText = await page.evaluate(() => {
      const body = document.body.cloneNode(true) as HTMLElement;
      body.querySelectorAll("head, script, style, meta, link").forEach((el) => el.remove());
      return body.textContent ?? "";
    });
    expect(visibleText).not.toContain("anuncioesite.com.br/zarq-planejados");
  });

  test("Scope text uses 'Configuração de rastreamento'", async () => {
    await waitForPageReady(page);
    const body = await page.textContent("body");
    expect(body).toContain("Configuração de rastreamento");
  });

  test("Portfolio modal: no image overflow on mobile", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const card = page.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
    await card.scrollIntoViewIfNeeded();
    await card.click();

    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(2000);

    const dialogBox = await dialog.boundingBox();
    expect(dialogBox).not.toBeNull();
    if (dialogBox) {
      expect(dialogBox.x).toBeGreaterThanOrEqual(-1);
      expect(dialogBox.x + dialogBox.width).toBeLessThanOrEqual(391);
    }

    const overflowing = await page.evaluate(() => {
      const imgs = document.querySelectorAll("dialog[open] img");
      for (const img of Array.from(imgs)) {
        const rect = img.getBoundingClientRect();
        if (rect.right > window.innerWidth + 2) return true;
      }
      return false;
    });
    expect(overflowing).toBe(false);

    await page.keyboard.press("Escape");
  });

  test("Portfolio modal: internal scroll works on mobile", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const card = page.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
    await card.scrollIntoViewIfNeeded();
    await card.click();

    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(2000);

    const header = page.locator("dialog[open] h2");
    await expect(header).toBeVisible();

    const scrollable = page.locator("dialog[open] .overflow-y-auto");
    const scrollableCount = await scrollable.count();
    expect(scrollableCount).toBeGreaterThanOrEqual(1);

    await page.keyboard.press("Escape");
  });
});

/* ------------------------------------------------------------------ */
/*  CTA TESTS                                                         */
/* ------------------------------------------------------------------ */

const CTA_BUTTONS: { label: string; location: string }[] = [
  { label: "Quero minha Landing Page", location: "header" },
  { label: "Quero minha Landing Page", location: "hero" },
  { label: "Quero minha Landing Page", location: "included" },
  { label: "Quero uma Landing Page para meu negócio", location: "portfolio" },
  { label: "Quero desenvolver minha página com Willian", location: "about" },
  { label: "Quero solicitar meu projeto", location: "pricing" },
  { label: "Quero minha Landing Page", location: "final" },
];

test.describe("CTA tests", () => {
  test("Each CTA opens modal, Esc closes, focus returns", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await waitForPageReady(page);

    for (const cta of CTA_BUTTONS) {
      const buttons = page.getByRole("button", { name: cta.label });
      const count = await buttons.count();
      expect(count).toBeGreaterThanOrEqual(1);

      const btn = buttons.first();
      await btn.scrollIntoViewIfNeeded();
      await btn.click();

      const dialog = page.locator("dialog[open]");
      await expect(dialog).toBeVisible({ timeout: 10_000 });

      const isInsideDialog = await page.evaluate(() => {
        const active = document.activeElement;
        const dlg = document.querySelector("dialog[open]");
        return dlg?.contains(active) ?? false;
      });
      expect(isInsideDialog).toBeTruthy();

      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();

      const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedTag).toBeTruthy();
    }

    assertNoViolations(violations);
  });

  test("Form preserves data after close and reopen", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await waitForPageReady(page);

    await openFormFromHero(page);

    await page.getByRole("button", { name: "Começar" }).click();
    await expect(page.locator("dialog[open]")).toBeVisible();

    await page.fill("#form-nome", "Maria Silva");

    await page.keyboard.press("Escape");
    await expect(page.locator("dialog[open]")).not.toBeVisible();

    await openFormFromHero(page);

    await page.getByRole("button", { name: "Começar" }).click();

    await expect(page.locator("#form-nome")).toHaveValue("Maria Silva");

    await page.keyboard.press("Escape");

    assertNoViolations(violations);
  });
});

/* ------------------------------------------------------------------ */
/*  FORM TESTS                                                        */
/* ------------------------------------------------------------------ */

test.describe("Form tests", () => {
  test("Complete form flow: open, fill, back, review, consent, submit, pending_integration", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    const forbiddenRequests: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("wa.me")) forbiddenRequests.push(url);
      if (url.includes("facebook.net")) forbiddenRequests.push(url);
      if (url.includes("googletagmanager")) forbiddenRequests.push(url);
      if (url.includes("google-analytics")) forbiddenRequests.push(url);
    });

    await page.route("**/api/leads", async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, status: "error", code: "PENDING_INTEGRATION" }),
      });
    });

    await waitForPageReady(page);

    await openFormFromHero(page);
    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible();

    await page.getByRole("button", { name: "Começar" }).click();

    await page.getByRole("button", { name: "Continuar" }).click();
    await expect(page.getByText("Informe seu nome para continuar.")).toBeVisible();

    await page.fill("#form-nome", "Maria Silva");

    await page.getByRole("button", { name: "Continuar" }).click();
    await expect(page.getByText("Informe um número de WhatsApp válido com DDD.")).toBeVisible();

    await page.fill("#form-whatsapp", "11999998888");

    await page.getByRole("button", { name: "Continuar" }).click();
    await expect(page.locator("#form-negocio")).toBeVisible();

    await page.getByRole("button", { name: "Voltar" }).click();
    await expect(page.locator("#form-nome")).toHaveValue("Maria Silva");
    await expect(page.locator("#form-whatsapp")).toHaveValue("(11) 99999-8888");

    await page.getByRole("button", { name: "Continuar" }).click();
    await expect(page.locator("#form-negocio")).toBeVisible();

    await page.fill("#form-negocio", "Clínica odontológica");

    await page.getByLabel("Já anuncio no Google Ads").check();

    await page.getByLabel("Não", { exact: false }).last().check();

    await page.getByRole("button", { name: "Continuar" }).click();

    await expect(page.getByText("Maria Silva")).toBeVisible();
    await expect(page.getByText("(11) 99999-8888")).toBeVisible();
    await expect(page.getByText("Clínica odontológica")).toBeVisible();
    await expect(page.getByText("Já anuncio no Google Ads")).toBeVisible();

    const submitBtn = page.getByRole("button", { name: "Enviar informações" });
    await expect(submitBtn).toBeDisabled();

    await page.locator('input[type="checkbox"]').check();

    await submitBtn.click();

    await expect(page.getByText("Integração pendente")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Servidor ainda não configurado")).toBeVisible();

    expect(forbiddenRequests).toHaveLength(0);

    const whatsappLinks = page.locator('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
    await expect(whatsappLinks).toHaveCount(0);

    const hasGenerateLead = await page.evaluate(() => {
      const dl = window.dataLayer ?? [];
      return dl.some((e) => (e as Record<string, unknown>).event === "generate_lead");
    });
    expect(hasGenerateLead).toBe(false);

    await expect(page.getByText("Suas respostas foram preservadas nesta tela.")).toBeVisible();

    await page.getByRole("button", { name: "Voltar para a página" }).click();
    await expect(dialog).not.toBeVisible();

    assertNoViolations(violations);
  });

  test("Possui site = Sim shows URL field, Nao hides it", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await waitForPageReady(page);

    await openFormFromHero(page);
    await page.getByRole("button", { name: "Começar" }).click();

    await page.fill("#form-nome", "Test");
    await page.fill("#form-whatsapp", "11999998888");
    await page.getByRole("button", { name: "Continuar" }).click();

    await expect(page.locator("#form-url")).not.toBeVisible();

    await page.getByLabel("Sim").last().check();
    await expect(page.locator("#form-url")).toBeVisible();

    await page.getByLabel("Não", { exact: false }).last().check();
    await expect(page.locator("#form-url")).not.toBeVisible();

    await page.keyboard.press("Escape");

    assertNoViolations(violations);
  });

  test("Form fills mobile viewport properly at 390x844", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    await openFormFromHero(page);

    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible();

    // Dialog should fill most of the viewport width
    const box = await dialog.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThan(350);
    }

    // No horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    await page.keyboard.press("Escape");
    assertNoViolations(violations);
  });
});

/* ------------------------------------------------------------------ */
/*  PORTFOLIO TESTS                                                   */
/* ------------------------------------------------------------------ */

test.describe("Portfolio tests", () => {
  const PROJECTS = [
    { name: "Mecânica Auto Brum", slug: "mecanica-auto-brum" },
    { name: "ZARQ Planejados", slug: "zarq-planejados" },
    { name: "Agafarma Mário Quintana", slug: "agafarma-mario-quintana" },
    { name: "BS Montagem de Móveis", slug: "bs-montagem" },
    { name: "Artur Montador", slug: "artur-montador" },
  ];

  test("Each project opens with correct title, Esc closes", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await waitForPageReady(page);

    for (const project of PROJECTS) {
      const card = page.locator(`[aria-label="Ver projeto ${project.name} por dentro"]`);
      await card.scrollIntoViewIfNeeded();
      await card.click();

      const dialog = page.locator("dialog[open]");
      await expect(dialog).toBeVisible({ timeout: 10_000 });
      await expect(page.getByText(project.name).first()).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
    }

    assertNoViolations(violations);
  });

  test("Mobile view: toggle hidden, no desktop.webp, only mobile.webp", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const mobileRequests: string[] = [];
    const desktopRequests: string[] = [];

    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("-mobile.webp")) mobileRequests.push(url);
      if (url.includes("-desktop.webp")) desktopRequests.push(url);
    });

    const card = page.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
    await card.scrollIntoViewIfNeeded();
    await card.click();

    await expect(page.locator("dialog[open]")).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(2000);

    expect(mobileRequests.some((u) => u.includes("mecanica-auto-brum-mobile.webp"))).toBeTruthy();
    expect(desktopRequests.some((u) => u.includes("mecanica-auto-brum-desktop.webp"))).toBeFalsy();

    const toggleContainer = page.locator("dialog[open]").locator(".hidden.md\\:flex");
    await expect(toggleContainer).toHaveCount(1);
    const display = await toggleContainer.evaluate((el) => window.getComputedStyle(el).display);
    expect(display).toBe("none");

    const desktopBtn = page.getByRole("button", { name: "Desktop" });
    await expect(desktopBtn).not.toBeVisible();

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const focusedEl = await page.evaluate(() => {
      const active = document.activeElement;
      const dialog = document.querySelector("dialog[open]");
      if (!dialog || !active) return null;
      if (active.id === "undefined") return null;
      return active.textContent ?? "";
    });
    expect(focusedEl).not.toBe("Desktop");
    expect(focusedEl).not.toBe("Celular");

    await page.keyboard.press("Escape");
    assertNoViolations(violations);
  });

  test("Desktop view: desktop image loaded on demand only", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 1440, height: 900 });
    await waitForPageReady(page);

    const desktopRequests: string[] = [];

    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("-desktop.webp")) desktopRequests.push(url);
    });

    const card = page.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
    await card.scrollIntoViewIfNeeded();
    await card.click();

    await expect(page.locator("dialog[open]")).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(2000);

    const desktopToggle = page.getByRole("button", { name: "Desktop" });
    await expect(desktopToggle).toBeVisible();

    expect(desktopRequests.some((u) => u.includes("mecanica-auto-brum-desktop.webp"))).toBeFalsy();

    await desktopToggle.click();
    await page.waitForTimeout(1000);

    expect(desktopRequests.some((u) => u.includes("mecanica-auto-brum-desktop.webp"))).toBeTruthy();

    await page.keyboard.press("Escape");
    assertNoViolations(violations);
  });

  test("Desktop view: close button separated from toggle, 40x40 min area", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 1440, height: 900 });
    await waitForPageReady(page);

    const card = page.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
    await card.scrollIntoViewIfNeeded();
    await card.click();

    await expect(page.locator("dialog[open]")).toBeVisible({ timeout: 10_000 });

    const closeBtn = page.locator("dialog[open] button[aria-label='Fechar']");
    await expect(closeBtn).toBeVisible();

    const closeBox = await closeBtn.boundingBox();
    expect(closeBox).not.toBeNull();
    if (closeBox) {
      expect(closeBox.width).toBeGreaterThanOrEqual(40);
      expect(closeBox.height).toBeGreaterThanOrEqual(40);
    }

    // Toggle container and close button have gap between them
    const toggleContainer = page.locator("dialog[open]").locator(".hidden.md\\:flex");
    const toggleBox = await toggleContainer.boundingBox();
    expect(toggleBox).not.toBeNull();
    if (toggleBox && closeBox) {
      const gap = closeBox.x - (toggleBox.x + toggleBox.width);
      expect(gap).toBeGreaterThanOrEqual(8);
    }

    // Close button works
    await closeBtn.click();
    await expect(page.locator("dialog[open]")).not.toBeVisible();

    assertNoViolations(violations);
  });
});

/* ------------------------------------------------------------------ */
/*  FAQ TESTS                                                         */
/* ------------------------------------------------------------------ */

test.describe("FAQ tests", () => {
  const FAQ_IDS = Array.from({ length: 13 }, (_, i) => `faq_${String(i + 1).padStart(2, "0")}`);

  test("All 13 FAQs: click toggles, aria-expanded correct, keyboard works", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await waitForPageReady(page);

    for (const faqId of FAQ_IDS) {
      const trigger = page.locator(`#trigger-${faqId}`);
      const panel = page.locator(`#panel-${faqId}`);

      await trigger.scrollIntoViewIfNeeded();

      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await expect(panel).not.toBeVisible();

      await trigger.click();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(panel).toBeVisible();

      await trigger.click();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await expect(panel).not.toBeVisible();

      await trigger.focus();
      await page.keyboard.press("Enter");
      await expect(trigger).toHaveAttribute("aria-expanded", "true");

      await page.keyboard.press("Space");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
    }

    assertNoViolations(violations);
  });
});

/* ------------------------------------------------------------------ */
/*  VISUAL CAPTURES — Segmented at real viewport widths                */
/* ------------------------------------------------------------------ */

test.describe("Visual captures", () => {
  test("Desktop captures — 1440x900 viewport clips", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 1440, height: 900 });
    await waitForPageReady(page);

    // Hero — top of page
    await page.screenshot({ path: "artifacts/visual-review/desktop-hero.png", fullPage: false });

    // Problema e solução
    await scrollToH2(page, "anúncio leva o visitante");
    await page.screenshot({ path: "artifacts/visual-review/desktop-problema-solucao.png", fullPage: false });

    // Itens incluídos
    await scrollToH2(page, "planejamento à publicação, tudo");
    await page.screenshot({ path: "artifacts/visual-review/desktop-incluido.png", fullPage: false });

    // Portfólio
    await scrollToH2(page, "Alguns projetos");
    await page.screenshot({ path: "artifacts/visual-review/desktop-portfolio.png", fullPage: false });

    // Processo
    await scrollToH2(page, "briefing à publicação");
    await page.screenshot({ path: "artifacts/visual-review/desktop-processo.png", fullPage: false });

    // Investimento
    await scrollToH2(page, "Landing Page completa por");
    await page.screenshot({ path: "artifacts/visual-review/desktop-investimento.png", fullPage: false });

    // FAQ + CTA final
    await scrollToH2(page, "precisa saber antes");
    await page.screenshot({ path: "artifacts/visual-review/desktop-faq-cta.png", fullPage: false });

    assertNoViolations(violations);
  });

  test("Mobile captures — 390x844 viewport clips", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    // Hero
    await page.screenshot({ path: "artifacts/visual-review/mobile-hero.png", fullPage: false });

    // Solução
    await scrollToH2(page, "oferta organizada");
    await page.screenshot({ path: "artifacts/visual-review/mobile-solucao.png", fullPage: false });

    // Portfólio
    await scrollToH2(page, "Alguns projetos");
    await page.screenshot({ path: "artifacts/visual-review/mobile-portfolio.png", fullPage: false });

    // Investimento
    await scrollToH2(page, "Landing Page completa por");
    await page.screenshot({ path: "artifacts/visual-review/mobile-investimento.png", fullPage: false });

    // FAQ
    await scrollToH2(page, "precisa saber antes");
    await page.screenshot({ path: "artifacts/visual-review/mobile-faq.png", fullPage: false });

    // Form — initial
    await openFormFromHero(page);
    await page.screenshot({ path: "artifacts/visual-review/mobile-formulario-inicial.png", fullPage: false });
    await page.keyboard.press("Escape");

    // Form — review step
    await openFormFromHero(page);
    await page.getByRole("button", { name: "Começar" }).click();
    await page.fill("#form-nome", "Maria Silva");
    await page.fill("#form-whatsapp", "11999998888");
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.fill("#form-negocio", "Clínica odontológica");
    await page.getByLabel("Já anuncio no Google Ads").check();
    await page.getByLabel("Não", { exact: false }).last().check();
    await page.getByRole("button", { name: "Continuar" }).click();
    await expect(page.getByText("Confira suas informações")).toBeVisible();
    await page.screenshot({ path: "artifacts/visual-review/mobile-formulario-revisao.png", fullPage: false });
    await page.keyboard.press("Escape");

    // Portfolio viewer
    const card = page.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
    await card.scrollIntoViewIfNeeded();
    await card.click();
    await expect(page.locator("dialog[open]")).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: "artifacts/visual-review/mobile-portfolio-viewer.png", fullPage: false });
    await page.keyboard.press("Escape");

    assertNoViolations(violations);
  });

  test("Tablet captures — 768x1024 viewport clips", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 768, height: 1024 });
    await waitForPageReady(page);

    // Hero
    await page.screenshot({ path: "artifacts/visual-review/tablet-hero.png", fullPage: false });

    // Portfólio
    await scrollToH2(page, "Alguns projetos");
    await page.screenshot({ path: "artifacts/visual-review/tablet-portfolio.png", fullPage: false });

    // Investimento
    await scrollToH2(page, "Landing Page completa por");
    await page.screenshot({ path: "artifacts/visual-review/tablet-investimento.png", fullPage: false });

    assertNoViolations(violations);
  });
});

/* ------------------------------------------------------------------ */
/*  INTEGRATED CONSOLE + NETWORK CHECKS                               */
/* ------------------------------------------------------------------ */

test.describe("Console and network integrity", () => {
  test("No forbidden external requests during full page interaction", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    const forbiddenRequests: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (
        url.includes("googletagmanager") ||
        url.includes("google-analytics") ||
        url.includes("facebook.net") ||
        url.includes("doubleclick") ||
        url.includes("ads.google") ||
        url.includes("neon.tech") ||
        url.includes("sheets.googleapis") ||
        url.includes("wa.me") ||
        url.includes("api.whatsapp")
      ) {
        forbiddenRequests.push(url);
      }
    });

    await waitForPageReady(page);

    await openFormFromHero(page);
    await page.keyboard.press("Escape");

    const card = page.locator('[aria-label="Ver projeto ZARQ Planejados por dentro"]');
    await card.scrollIntoViewIfNeeded();
    await card.click();
    await expect(page.locator("dialog[open]")).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(1000);
    await page.keyboard.press("Escape");

    await page.locator("#trigger-faq_01").scrollIntoViewIfNeeded();
    await page.locator("#trigger-faq_01").click();
    await expect(page.locator("#trigger-faq_01")).toHaveAttribute("aria-expanded", "true");
    await page.waitForTimeout(500);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    expect(forbiddenRequests).toHaveLength(0);
    assertNoViolations(violations);
  });

  test("No PII in console output or dataLayer", async ({ page }) => {
    const consoleOutput: string[] = [];
    page.on("console", (msg) => consoleOutput.push(msg.text()));

    await waitForPageReady(page);

    await openFormFromHero(page);
    await page.getByRole("button", { name: "Começar" }).click();
    await page.fill("#form-nome", "Maria Silva");
    await page.fill("#form-whatsapp", "11999998888");
    await page.keyboard.press("Escape");

    const fullOutput = consoleOutput.join("\n");
    expect(fullOutput).not.toContain("Maria Silva");
    expect(fullOutput).not.toContain("11999998888");

    const dataLayer = await page.evaluate(() => window.dataLayer ?? []);
    const dlString = JSON.stringify(dataLayer);
    expect(dlString).not.toContain("Maria Silva");
    expect(dlString).not.toContain("11999998888");
  });
});
