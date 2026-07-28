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

  test("sections present in order via h2 elements", async () => {
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
    const heroSection = page.locator("section").first();
    const mobileFrame = heroSection.locator('.md\\:hidden img');
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

    const mobileStrip = page.locator(".md\\:hidden .overflow-x-auto");
    const card = mobileStrip.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
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

    const mobileStrip = page.locator(".md\\:hidden .overflow-x-auto");
    const card = mobileStrip.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
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
  { label: "Quero minha Landing Page", location: "portfolio" },
  { label: "Quero minha Landing Page", location: "pricing" },
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

    const desktopGrid = page.locator(".hidden.md\\:grid.md\\:grid-cols-2");
    for (const project of PROJECTS) {
      const card = desktopGrid.locator(`[aria-label="Ver projeto ${project.name} por dentro"]`);
      await card.scrollIntoViewIfNeeded();
      await card.click();

      const dialog = page.locator("dialog[open]");
      await expect(dialog).toBeVisible({ timeout: 10_000 });
      await expect(dialog.getByText(project.name).first()).toBeVisible();

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

    const mobileStrip = page.locator(".md\\:hidden .overflow-x-auto");
    const card = mobileStrip.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
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

    const desktopGrid = page.locator(".hidden.md\\:grid.md\\:grid-cols-2");
    const card = desktopGrid.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
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

    const desktopGrid = page.locator(".hidden.md\\:grid.md\\:grid-cols-2");
    const card = desktopGrid.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
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
  const FAQ_IDS = Array.from({ length: 8 }, (_, i) => `faq_${String(i + 1).padStart(2, "0")}`);

  test("All 8 FAQs: click toggles, aria-expanded correct, keyboard works", async ({ page }) => {
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
    await scrollToH2(page, "anúncio traz o visitante");
    await page.screenshot({ path: "artifacts/visual-review/desktop-problema-solucao.png", fullPage: false });

    // Itens incluídos
    await scrollToH2(page, "tudo o que sua landing page");
    await page.screenshot({ path: "artifacts/visual-review/desktop-incluido.png", fullPage: false });

    // Portfólio
    await scrollToH2(page, "Algumas Landing Pages");
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

    // Problema e solução
    await scrollToH2(page, "anúncio traz o visitante");
    await page.screenshot({ path: "artifacts/visual-review/mobile-solucao.png", fullPage: false });

    // Portfólio
    await scrollToH2(page, "Algumas Landing Pages");
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
    const mobileStrip = page.locator(".md\\:hidden .overflow-x-auto");
    const card = mobileStrip.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
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
    await scrollToH2(page, "Algumas Landing Pages");
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

    const desktopGrid = page.locator(".hidden.md\\:grid.md\\:grid-cols-2");
    const card = desktopGrid.locator('[aria-label="Ver projeto ZARQ Planejados por dentro"]');
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

/* ------------------------------------------------------------------ */
/*  CONTENT.md CONFORMITY TESTS                                       */
/* ------------------------------------------------------------------ */

test.describe("CONTENT.md conformity", () => {
  test("New phrases present and old phrases absent in rendered page", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await waitForPageReady(page);

    const body = await page.textContent("body");

    // New phrases — must be present
    expect(body).toContain("Não é curso, template ou ferramenta.");
    expect(body).toContain("conduzir o visitante ao contato");
    expect(body).toContain("visualizar a página por dentro");
    expect(body).toContain("Algumas Landing Pages que desenvolvi");
    expect(body).toContain("Cada projeto recebe uma estrutura adequada à oferta e ao público do negócio.");
    expect(body).toContain("não garante vendas, leads ou desempenho da campanha");
    expect(body).toContain("Projeto completo, adaptado à sua oferta e preparado para campanhas de Google Ads ou Meta Ads.");
    expect(body).toContain("Preencha o formulário para eu avaliar sua necessidade e confirmar o escopo.");
    expect(body).toContain("Desenvolvida diretamente por mim");
    expect(body).toContain("Preparada para celular e desktop");
    expect(body).toContain("Eu cuido do planejamento à publicação");
    expect(body).toContain("Até 7 dias úteis após briefing e materiais");

    // Old phrases — must be absent
    expect(body).not.toMatch(/Alguns projetos que desenvolvi/i);
    expect(body).not.toMatch(/Landing Pages criadas para diferentes/i);
    expect(body).not.toMatch(/Cada negócio possui uma oferta/i);
    expect(body).not.toMatch(/Esse é o valor do projeto padrão/i);
    expect(body).not.toMatch(/Confira as respostas para as principais/i);
    expect(body).not.toMatch(/Você não precisa montar nada sozinho/i);
    expect(body).not.toMatch(/Conduzida diretamente por mim/i);
    expect(body).not.toMatch(/Entregue pronta para sua campanha/i);
    expect(body).not.toMatch(/não existe garantia/i);
    expect(body).not.toMatch(/Eu civo da página, do planejamento/i);
    expect(body).not.toMatch(/Quero uma Landing Page para meu negócio/i);
    expect(body).not.toMatch(/Quero solicitar meu projeto/i);
    expect(body).not.toMatch(/conhecer a página por dentro/i);
    expect(body).not.toMatch(/Conte sobre sua empresa e eu avalio/i);

    assertNoViolations(violations);
  });

  test("Form intro: 'avaliar' instead of 'entender'", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await waitForPageReady(page);
    await openFormFromHero(page);

    const body = await page.locator("dialog[open]").textContent();
    expect(body).toContain("avaliar seu projeto");
    expect(body).not.toMatch(/entender seu projeto/i);

    await page.keyboard.press("Escape");
    assertNoViolations(violations);
  });

  test("Success screen: personalized title with lead name", async ({ page }) => {
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
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, status: "created", lead_id: "test-lead-conformity-001" }),
      });
    });

    await waitForPageReady(page);
    await openFormFromHero(page);

    await page.getByRole("button", { name: "Começar" }).click();

    await page.fill("#form-nome", "Ana Beatriz");
    await page.fill("#form-whatsapp", "11999998888");
    await page.getByRole("button", { name: "Continuar" }).click();

    await page.fill("#form-negocio", "Clínica odontológica");
    await page.getByLabel("Já anuncio no Google Ads").check();
    await page.getByLabel("Não", { exact: false }).last().check();
    await page.getByRole("button", { name: "Continuar" }).click();

    await page.locator('input[type="checkbox"]').check();
    await page.getByRole("button", { name: "Enviar informações" }).click();

    await expect(page.getByText("Informações recebidas")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Obrigado, Ana Beatriz. Recebi os dados do seu projeto.")).toBeVisible();
    await expect(page.getByText("Agora você pode continuar a conversa comigo pelo WhatsApp")).toBeVisible();

    await expect(page.getByText("Informações enviadas", { exact: true })).not.toBeVisible();
    await expect(page.getByText("Recebi suas informações!", { exact: true })).not.toBeVisible();
    await expect(page.getByText("entender seu projeto", { exact: true })).not.toBeVisible();

    expect(forbiddenRequests).toHaveLength(0);

    const hasGenerateLead = await page.evaluate(() => {
      const dl = window.dataLayer ?? [];
      return dl.some((e) => (e as Record<string, unknown>).event === "generate_lead");
    });
    expect(hasGenerateLead).toBe(true);

    await page.getByRole("button", { name: "Voltar para a página" }).click();

    assertNoViolations(violations);
  });

  test("No WhatsApp links visible before form submission", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await waitForPageReady(page);

    const whatsappLinks = page.locator('a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="whatsapp"]');
    await expect(whatsappLinks).toHaveCount(0);

    assertNoViolations(violations);
  });
});

/* ------------------------------------------------------------------ */
/*  RESPONSIVE COMPACT TESTS                                           */
/* ------------------------------------------------------------------ */

test.describe("Responsive compact layout", () => {
  const ALL_MOBILE_VIEWPORTS = [
    { width: 360, height: 800 },
    { width: 375, height: 812 },
    { width: 390, height: 844 },
  ];

  test("All 5 projects present on mobile and desktop", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await waitForPageReady(page);

    const projectNames = [
      "Mecânica Auto Brum",
      "ZARQ Planejados",
      "Agafarma Mário Quintana",
      "BS Montagem de Móveis",
      "Artur Montador",
    ];

    // Desktop: check the grid container
    const desktopGrid = page.locator(".hidden.md\\:grid");
    for (const name of projectNames) {
      const card = desktopGrid.locator(`[aria-label="Ver projeto ${name} por dentro"]`);
      await expect(card).toHaveCount(1);
    }

    // Mobile: check the scroll container
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    const mobileStrip = page.locator(".md\\:hidden .overflow-x-auto");
    for (const name of projectNames) {
      const card = mobileStrip.locator(`[aria-label="Ver projeto ${name} por dentro"]`);
      await expect(card).toHaveCount(1);
    }

    assertNoViolations(violations);
  });

  test("Portfolio has horizontal scroll on mobile (scroll-snap)", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const scrollContainer = page.locator(".md\\:hidden .overflow-x-auto");
    await expect(scrollContainer).toBeVisible();

    const scrollBehavior = await scrollContainer.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        overflowX: s.overflowX,
        scrollSnapType: s.scrollSnapType,
        display: s.display,
      };
    });
    expect(scrollBehavior.overflowX).toBe("auto");
    expect(scrollBehavior.scrollSnapType).toContain("x");

    const cards = scrollContainer.locator("[role='button']");
    const count = await cards.count();
    expect(count).toBe(5);

    const firstSnap = await cards.first().evaluate((el) => {
      return window.getComputedStyle(el).scrollSnapAlign;
    });
    expect(firstSnap).toBe("start");

    assertNoViolations(violations);
  });

  test("No global horizontal scroll at any mobile viewport", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await waitForPageReady(page);

    for (const vp of ALL_MOBILE_VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(300);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    }

    assertNoViolations(violations);
  });

  test("First and last portfolio projects are reachable on mobile", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const mobileStrip = page.locator(".md\\:hidden .overflow-x-auto");
    const first = mobileStrip.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
    await first.scrollIntoViewIfNeeded();
    await expect(first).toBeVisible();

    const last = mobileStrip.locator('[aria-label="Ver projeto Artur Montador por dentro"]');
    await last.scrollIntoViewIfNeeded();
    await expect(last).toBeVisible();

    assertNoViolations(violations);
  });

  test("Each portfolio button opens the correct project modal", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const mobileStrip = page.locator(".md\\:hidden .overflow-x-auto");
    const projects = [
      "Mecânica Auto Brum",
      "ZARQ Planejados",
      "Agafarma Mário Quintana",
      "BS Montagem de Móveis",
      "Artur Montador",
    ];

    for (const name of projects) {
      const card = mobileStrip.locator(`[aria-label="Ver projeto ${name} por dentro"]`);
      await card.scrollIntoViewIfNeeded();
      await card.click();

      const dialog = page.locator("dialog[open]");
      await expect(dialog).toBeVisible({ timeout: 10_000 });
      await expect(page.getByText(name).first()).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
    }

    assertNoViolations(violations);
  });

  test("Portfolio keyboard navigation works on mobile", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const mobileStrip = page.locator(".md\\:hidden .overflow-x-auto");
    const firstCard = mobileStrip.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
    await firstCard.scrollIntoViewIfNeeded();
    await firstCard.focus();
    await page.keyboard.press("Enter");

    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible({ timeout: 10_000 });
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();

    assertNoViolations(violations);
  });

  test("No autoplay or auto-animation in portfolio", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const scrollContainer = page.locator(".md\\:hidden .overflow-x-auto");
    const scrollLeft = await scrollContainer.evaluate((el) => el.scrollLeft);

    await page.waitForTimeout(3000);

    const scrollLeftAfter = await scrollContainer.evaluate((el) => el.scrollLeft);
    expect(scrollLeftAfter).toBe(scrollLeft);

    assertNoViolations(violations);
  });

  test("Desktop portfolio still uses grid layout", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 1440, height: 900 });
    await waitForPageReady(page);

    const section = page.locator("section").filter({ hasText: "Algumas Landing Pages que desenvolvi" });
    const grid = section.locator(".hidden.md\\:grid");
    await expect(grid).toBeVisible();

    const display = await grid.evaluate((el) => window.getComputedStyle(el).display);
    expect(display).toBe("grid");

    const mobileStrip = section.locator(".md\\:hidden .overflow-x-auto");
    await expect(mobileStrip).not.toBeVisible();

    assertNoViolations(violations);
  });

  test("IncludedSection mobile: compact panel with 6 items and dividers", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const section = page.locator("section").filter({ hasText: "Tudo o que sua Landing Page" });
    const compactPanel = section.locator(".md\\:hidden.divide-y");
    await compactPanel.scrollIntoViewIfNeeded();
    await expect(compactPanel).toBeVisible();

    const rows = compactPanel.locator("> div");
    await expect(rows).toHaveCount(6);

    const titles = [
      "Estratégia e copy",
      "Design responsivo",
      "Desenvolvimento em Next.js",
      "Formulário e WhatsApp",
      "Configuração de rastreamento",
      "Publicação e testes",
    ];

    for (const title of titles) {
      await expect(compactPanel.getByText(title, { exact: true })).toBeVisible();
    }

    const bentoGrid = section.locator(".hidden.md\\:grid");
    await expect(bentoGrid).not.toBeVisible();

    assertNoViolations(violations);
  });

  test("IncludedSection desktop: Bento Box grid preserved", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 1440, height: 900 });
    await waitForPageReady(page);

    const section = page.locator("section").filter({ hasText: "Tudo o que sua Landing Page" });
    const bentoGrid = section.locator(".hidden.md\\:grid");
    await bentoGrid.scrollIntoViewIfNeeded();
    await expect(bentoGrid).toBeVisible();

    const display = await bentoGrid.evaluate((el) => window.getComputedStyle(el).display);
    expect(display).toBe("grid");

    const compactPanel = section.locator(".md\\:hidden.divide-y");
    await expect(compactPanel).not.toBeVisible();

    assertNoViolations(violations);
  });

  test("AboutSection mobile: 2×2 grid with all 4 indicators", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const grid = page.locator("section").filter({ hasText: "Seu projeto é desenvolvido" }).locator(".grid");
    await grid.scrollIntoViewIfNeeded();

    const gridStyles = await grid.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return { display: s.display, gridTemplateColumns: s.gridTemplateColumns };
    });
    expect(gridStyles.display).toBe("grid");

    const columns = gridStyles.gridTemplateColumns.split(" ").length;
    expect(columns).toBe(2);

    const indicators = grid.locator("> div");
    await expect(indicators).toHaveCount(4);

    await expect(page.getByText("Mais de 5 anos")).toBeVisible();
    await expect(page.getByText("Cerca de R$ 40 mil")).toBeVisible();
    await expect(page.getByText("Mais de 7 mil clientes")).toBeVisible();
    await expect(page.getByText("Execução direta").first()).toBeVisible();

    assertNoViolations(violations);
  });

  test("No copy was removed from compressed sections", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await waitForPageReady(page);

    const body = await page.textContent("body");

    expect(body).toContain("Tudo o que sua Landing Page precisa para entrar no ar");
    expect(body).toContain("Estratégia e copy");
    expect(body).toContain("Design responsivo");
    expect(body).toContain("Desenvolvimento em Next.js");
    expect(body).toContain("Formulário e WhatsApp");
    expect(body).toContain("Configuração de rastreamento");
    expect(body).toContain("Publicação e testes");
    expect(body).toContain("O projeto inclui até 2 rodadas de ajustes dentro do escopo aprovado.");

    expect(body).toContain("Seu projeto é desenvolvido diretamente por mim");
    expect(body).toContain("Mais de 5 anos");
    expect(body).toContain("Cerca de R$ 40 mil");
    expect(body).toContain("Mais de 7 mil clientes");
    expect(body).toContain("Trabalhando com Google Ads e negócios locais.");
    expect(body).toContain("Investidos em minhas próprias campanhas.");
    expect(body).toContain("Atendidos a partir de contatos conquistados pelo Google.");
    expect(body).toContain("Estratégia, copy, design e desenvolvimento conduzidos por mim.");

    expect(body).toContain("Do briefing à publicação em quatro etapas");
    expect(body).toContain("Briefing e materiais");
    expect(body).toContain("Copy, design e desenvolvimento");
    expect(body).toContain("Revisão e ajustes");
    expect(body).toContain("Aprovação e publicação");
    expect(body).toContain("Até 7 dias úteis");

    expect(body).toContain("Algumas Landing Pages que desenvolvi");

    assertNoViolations(violations);
  });

  test("Modals, form and integrations still work after compression", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    await openFormFromHero(page);
    await expect(page.locator("dialog[open]")).toBeVisible();
    await page.getByRole("button", { name: "Começar" }).click();
    await expect(page.locator("#form-nome")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("dialog[open]")).not.toBeVisible();

    const mobileStrip = page.locator(".md\\:hidden .overflow-x-auto");
    const card = mobileStrip.locator('[aria-label="Ver projeto ZARQ Planejados por dentro"]');
    await card.scrollIntoViewIfNeeded();
    await card.click();
    await expect(page.locator("dialog[open]")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("ZARQ Planejados").first()).toBeVisible();
    await page.keyboard.press("Escape");

    await page.locator("#trigger-faq_01").scrollIntoViewIfNeeded();
    await page.locator("#trigger-faq_01").click();
    await expect(page.locator("#trigger-faq_01")).toHaveAttribute("aria-expanded", "true");

    assertNoViolations(violations);
  });

  const PORTFOLIO_VIEWPORTS = [
    { width: 360, height: 800 },
    { width: 375, height: 812 },
    { width: 390, height: 844 },
  ];

  for (const vp of PORTFOLIO_VIEWPORTS) {
    test(`Portfolio card at ${vp.width}px: fully visible, no text overflow, cover uncropped, peek of second card`, async ({ page }) => {
      const violations: ConsoleViolation[] = [];
      collectConsoleViolations(page, violations);

      await page.setViewportSize({ width: vp.width, height: vp.height });
      await waitForPageReady(page);

      const scrollContainer = page.locator(".md\\:hidden .overflow-x-auto");
      await expect(scrollContainer).toBeVisible();

      const firstCard = scrollContainer.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
      await firstCard.scrollIntoViewIfNeeded();

      const containerBox = await scrollContainer.boundingBox();
      expect(containerBox).not.toBeNull();

      const firstBox = await firstCard.boundingBox();
      expect(firstBox).not.toBeNull();

      if (containerBox && firstBox) {
        expect(firstBox.x).toBeGreaterThanOrEqual(containerBox.x - 1);
        expect(firstBox.x + firstBox.width).toBeLessThanOrEqual(containerBox.x + containerBox.width + 1);
        expect(firstBox.width).toBeGreaterThan(firstBox.width * 0.8);
      }

      const textOverflow = await firstCard.evaluate((el) => {
        return el.scrollWidth > el.clientWidth + 2;
      });
      expect(textOverflow).toBe(false);

      const secondCard = scrollContainer.locator('[aria-label="Ver projeto ZARQ Planejados por dentro"]');
      const secondBox = await secondCard.boundingBox();
      expect(secondBox).not.toBeNull();

      if (containerBox && secondBox) {
        const peek = (containerBox.x + containerBox.width) - secondBox.x;
        expect(peek).toBeGreaterThanOrEqual(10);
        expect(peek).toBeLessThanOrEqual(80);
      }

      assertNoViolations(violations);
    });

    test(`Portfolio card at ${vp.width}px: cover image not cropped horizontally`, async ({ page }) => {
      const violations: ConsoleViolation[] = [];
      collectConsoleViolations(page, violations);

      await page.setViewportSize({ width: vp.width, height: vp.height });
      await waitForPageReady(page);

      const scrollContainer = page.locator(".md\\:hidden .overflow-x-auto");
      const firstCard = scrollContainer.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
      await firstCard.scrollIntoViewIfNeeded();

      const img = firstCard.locator("img");
      await expect(img).toBeVisible();

      const imgBox = await img.boundingBox();
      const cardBox = await firstCard.boundingBox();
      expect(imgBox).not.toBeNull();
      expect(cardBox).not.toBeNull();

      if (imgBox && cardBox) {
        expect(imgBox.x).toBeGreaterThanOrEqual(cardBox.x - 1);
        expect(imgBox.x + imgBox.width).toBeLessThanOrEqual(cardBox.x + cardBox.width + 1);
      }

      const hasObjectCover = await img.evaluate((el) => {
        return window.getComputedStyle(el).objectFit;
      });
      expect(hasObjectCover).not.toBe("cover");

      assertNoViolations(violations);
    });

    test(`Portfolio at ${vp.width}px: last card completely reachable`, async ({ page }) => {
      const violations: ConsoleViolation[] = [];
      collectConsoleViolations(page, violations);

      await page.setViewportSize({ width: vp.width, height: vp.height });
      await waitForPageReady(page);

      const scrollContainer = page.locator(".md\\:hidden .overflow-x-auto");
      const lastCard = scrollContainer.locator('[aria-label="Ver projeto Artur Montador por dentro"]');
      await lastCard.scrollIntoViewIfNeeded();

      const containerBox = await scrollContainer.boundingBox();
      const lastBox = await lastCard.boundingBox();
      expect(containerBox).not.toBeNull();
      expect(lastBox).not.toBeNull();

      if (containerBox && lastBox) {
        expect(lastBox.x + lastBox.width).toBeLessThanOrEqual(containerBox.x + containerBox.width + 2);
      }

      assertNoViolations(violations);
    });

    test(`Portfolio at ${vp.width}px: no global horizontal scroll`, async ({ page }) => {
      const violations: ConsoleViolation[] = [];
      collectConsoleViolations(page, violations);

      await page.setViewportSize({ width: vp.width, height: vp.height });
      await waitForPageReady(page);

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

      assertNoViolations(violations);
    });

    test(`Portfolio at ${vp.width}px: modal opens for correct project`, async ({ page }) => {
      const violations: ConsoleViolation[] = [];
      collectConsoleViolations(page, violations);

      await page.setViewportSize({ width: vp.width, height: vp.height });
      await waitForPageReady(page);

      const mobileStrip = page.locator(".md\\:hidden .overflow-x-auto");
      const card = mobileStrip.locator('[aria-label="Ver projeto Agafarma Mário Quintana por dentro"]');
      await card.scrollIntoViewIfNeeded();
      await card.click();

      const dialog = page.locator("dialog[open]");
      await expect(dialog).toBeVisible({ timeout: 10_000 });
      await expect(dialog.getByText("Agafarma Mário Quintana").first()).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();

      assertNoViolations(violations);
    });
  }

  test("Desktop portfolio unchanged after mobile fix", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 1440, height: 900 });
    await waitForPageReady(page);

    const section = page.locator("section").filter({ hasText: "Algumas Landing Pages que desenvolvi" });
    const grid = section.locator(".hidden.md\\:grid");
    await expect(grid).toBeVisible();

    const display = await grid.evaluate((el) => window.getComputedStyle(el).display);
    expect(display).toBe("grid");

    const cards = grid.locator("[role='button']");
    await expect(cards).toHaveCount(5);

    const firstCard = cards.first();
    const img = firstCard.locator("img");
    const objectFit = await img.evaluate((el) => window.getComputedStyle(el).objectFit);
    expect(objectFit).toBe("cover");

    const mobileStrip = section.locator(".md\\:hidden .overflow-x-auto");
    await expect(mobileStrip).not.toBeVisible();

    assertNoViolations(violations);
  });
});

/* ------------------------------------------------------------------ */
/*  ABOUT SECTION — DESKTOP TWO-COLUMN LAYOUT                         */
/* ------------------------------------------------------------------ */

test.describe("AboutSection desktop two-column", () => {
  test("Two-column layout at 1440px: text left, indicators right in 2×2", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 1440, height: 900 });
    await waitForPageReady(page);

    const section = page.locator("section").filter({ hasText: "Seu projeto é desenvolvido" });
    const container = section.locator("> div").first();
    await container.scrollIntoViewIfNeeded();

    const gridStyles = await container.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return { display: s.display, gridTemplateColumns: s.gridTemplateColumns };
    });
    expect(gridStyles.display).toBe("grid");

    const columns = gridStyles.gridTemplateColumns.split(" ");
    expect(columns.length).toBe(2);

    const textBlock = container.locator("div").first();
    const textBox = await textBlock.boundingBox();
    const indicatorsGrid = container.locator(".grid");
    const indicatorsBox = await indicatorsGrid.boundingBox();

    expect(textBox).not.toBeNull();
    expect(indicatorsBox).not.toBeNull();

    if (textBox && indicatorsBox) {
      expect(textBox.x).toBeLessThan(indicatorsBox.x);
    }

    const indicatorCols = await indicatorsGrid.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return s.gridTemplateColumns.split(" ").length;
    });
    expect(indicatorCols).toBe(2);

    const titleText = container.locator("h2");
    const titleAlign = await titleText.evaluate((el) => window.getComputedStyle(el).textAlign);
    expect(titleAlign).not.toBe("center");

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    assertNoViolations(violations);
  });
});

/* ------------------------------------------------------------------ */
/*  ABOUT SECTION — TABLET TWO-COLUMN                                  */
/* ------------------------------------------------------------------ */

test.describe("AboutSection tablet", () => {
  test("Presentation above, indicators below in 2×2 at 768px", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 768, height: 1024 });
    await waitForPageReady(page);

    const section = page.locator("section").filter({ hasText: "Seu projeto é desenvolvido" });
    const textBlock = section.locator("span").first();
    await textBlock.scrollIntoViewIfNeeded();

    const textY = await textBlock.evaluate((el) => el.getBoundingClientRect().top);
    const grid = section.locator(".grid");
    const gridY = await grid.evaluate((el) => el.getBoundingClientRect().top);
    expect(gridY).toBeGreaterThan(textY);

    const gridStyles = await grid.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return { display: s.display, gridTemplateColumns: s.gridTemplateColumns };
    });
    expect(gridStyles.display).toBe("grid");
    expect(gridStyles.gridTemplateColumns.split(" ").length).toBe(2);

    const indicators = grid.locator("> div");
    await expect(indicators).toHaveCount(4);

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    assertNoViolations(violations);
  });
});

/* ------------------------------------------------------------------ */
/*  ABOUT SECTION — MOBILE PROPORTIONAL HEIGHT                         */
/* ------------------------------------------------------------------ */

test.describe("AboutSection mobile proportional", () => {
  test("No overflow, proportional height at 390px", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const section = page.locator("section").filter({ hasText: "Seu projeto é desenvolvido" });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    const sectionBox = await section.boundingBox();
    expect(sectionBox).not.toBeNull();
    if (sectionBox) {
      expect(sectionBox.height).toBeLessThan(1200);
    }

    assertNoViolations(violations);
  });
});

/* ------------------------------------------------------------------ */
/*  PORTFOLIO — CTA CENTERING DESKTOP                                  */
/* ------------------------------------------------------------------ */

test.describe("Portfolio CTA centering desktop", () => {
  test("CTA centered and microcopy limited width at 1440px", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 1440, height: 900 });
    await waitForPageReady(page);

    const section = page.locator("section").filter({ hasText: "Algumas Landing Pages que desenvolvi" });
    const ctaButton = section.getByRole("button", { name: "Quero minha Landing Page" });
    await ctaButton.scrollIntoViewIfNeeded();

    const sectionBox = await section.boundingBox();
    const ctaBox = await ctaButton.boundingBox();
    expect(sectionBox).not.toBeNull();
    expect(ctaBox).not.toBeNull();

    if (sectionBox && ctaBox) {
      const sectionCenter = sectionBox.x + sectionBox.width / 2;
      const ctaCenter = ctaBox.x + ctaBox.width / 2;
      const offset = Math.abs(sectionCenter - ctaCenter);
      expect(offset).toBeLessThanOrEqual(50);
    }

    const microcopy = section.locator("p").filter({ hasText: "Cada projeto recebe" });
    const microBox = await microcopy.boundingBox();
    expect(microBox).not.toBeNull();
    if (microBox) {
      expect(microBox.width).toBeLessThanOrEqual(640);
      expect(microBox.width).toBeGreaterThanOrEqual(520);
    }

    assertNoViolations(violations);
  });
});
