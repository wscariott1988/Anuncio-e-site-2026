import { test, expect, type Page, type ConsoleMessage } from "@playwright/test";

const PAGE_URL = "/landingpage";

const WHATSAPP_MESSAGE =
  "Olá, Willian. Vi a Landing Page completa por R$ 997 e quero iniciar meu projeto. Pode me explicar os próximos passos?";
const WHATSAPP_ENCODED_MESSAGE = encodeURIComponent(WHATSAPP_MESSAGE);
const ESCAPED_ENCODED_MESSAGE = WHATSAPP_ENCODED_MESSAGE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const WHATSAPP_HREF_RE = new RegExp(`^https://wa\\.me/\\d{10,14}\\?text=${ESCAPED_ENCODED_MESSAGE}$`);

const CTA_TEXTS: Record<string, string> = {
  header: "Quero minha Landing Page",
  hero: "Quero minha Landing Page por R$ 997",
  portfolio: "Quero minha Landing Page por R$ 997",
  investment: "Quero minha Landing Page por R$ 997",
  final: "Quero minha Landing Page por R$ 997",
  "sticky-mobile": "Quero iniciar por R$ 498,50",
};
const CTA_IDS: Record<string, string> = {
  header: "header_primary",
  hero: "hero_primary",
  portfolio: "portfolio_primary",
  investment: "investment_primary",
  final: "final_primary",
  "sticky-mobile": "sticky_mobile_primary",
};

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
      if (text.includes("net::")) return;
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
        const allowed404 = ["/politica-de-privacidade", "/termos", "/landingpage/obrigado"];
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

/** Fulfil wa.me popups so clicking CTAs does not depend on real network. */
async function mockWhatsappPopups(page: Page) {
  await page.context().route("https://wa.me/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<html><body>ok</body></html>",
    });
  });
}

function whatsappCta(page: Page, location: string) {
  return page.locator(`a[data-whatsapp-cta="true"][data-cta-location="${location}"]`);
}

async function expectedCtaHref(page: Page, location: string): Promise<string> {
  const href = await whatsappCta(page, location).first().getAttribute("href");
  expect(href).not.toBeNull();
  return href!;
}

async function expectCtaMatches(page: Page, location: string, expectedHref: string) {
  const cta = whatsappCta(page, location).first();
  await expect(cta).toHaveAttribute("href", expectedHref);
  await expect(cta).toHaveAttribute("target", "_blank");
  await expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  await expect(cta).toHaveAttribute("data-cta-location", location);
  await expect(cta).toHaveText(CTA_TEXTS[location]);
  const tag = await cta.evaluate((el) => el.tagName);
  expect(tag).toBe("A");
}

async function dismissConsent(page: Page) {
  const banner = page.locator('[role="dialog"][aria-label="Sua privacidade"]');
  await expect(banner).toBeVisible({ timeout: 10_000 });
  await banner.getByRole("button", { name: "Recusar opcionais" }).click();
  await expect(banner).not.toBeVisible();
}

async function lastEvent(page: Page, event: string): Promise<Record<string, unknown> | null> {
  return page.evaluate((ev) => {
    const dl = window.dataLayer ?? [];
    for (let i = dl.length - 1; i >= 0; i--) {
      const e = dl[i];
      if (e && (e as Record<string, unknown>).event === ev) return e as Record<string, unknown>;
    }
    return null;
  }, event);
}

async function scrollToH2(page: Page, text: string) {
  const h2 = page.locator(`h2:has-text("${text}")`).first();
  await h2.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
}

/* ------------------------------------------------------------------ */
/*  Consent Mode v2 helpers                                           */
/* ------------------------------------------------------------------ */

function collectGooglePings(page: Page, pings: string[]) {
  page.on("request", (req) => {
    const url = req.url();
    if (url.includes("google-analytics.com")) pings.push(url);
  });
}

const TRACKING_COOKIE_RE = /^(_ga|_gid|_gcl[a-z0-9_]*|_clck|_clsk|_cltk|_cl)/i;

async function trackingCookies(page: Page): Promise<string[]> {
  const cookies = await page.context().cookies();
  return cookies.map((c) => c.name).filter((n) => TRACKING_COOKIE_RE.test(n));
}

async function trackingStorageKeys(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const keys: string[] = [];
    const visit = (store: Storage) => {
      for (let i = 0; i < store.length; i++) {
        const k = store.key(i) ?? "";
        if (/(_ga|_gid|_gcl|_clck|_clsk|_cltk|clarity)/i.test(k)) keys.push(k);
      }
    };
    visit(window.localStorage);
    visit(window.sessionStorage);
    return keys;
  });
}

async function consentCommand(page: Page, command: "default" | "update") {
  return page.evaluate((cmd) => {
    const dl = window.dataLayer ?? [];
    const asArray = (e: unknown): unknown[] | null => {
      if (Array.isArray(e)) return e;
      const maybe = e as { length?: unknown } | null;
      if (maybe && typeof maybe === "object" && typeof maybe.length === "number") {
        return Array.from({ length: maybe.length as number }, (_, i) => (maybe as Record<number, unknown>)[i]);
      }
      return null;
    };
    let last: Record<string, string> | null = null;
    for (const e of dl) {
      const a = asArray(e);
      if (a && a[0] === "consent" && a[1] === cmd) {
        last = a[2] as Record<string, string>;
      }
    }
    return last;
  }, command);
}

const BANNER = '[role="dialog"][aria-label="Sua privacidade"]';

async function expectAllConsentDenied(page: Page) {
  const last = await consentCommand(page, "update");
  const def = await consentCommand(page, "default");
  const state = last ?? def;
  expect(state, "no consent command found in dataLayer").not.toBeNull();
  expect(state!.analytics_storage).toBe("denied");
  expect(state!.ad_storage).toBe("denied");
  expect(state!.ad_user_data).toBe("denied");
  expect(state!.ad_personalization).toBe("denied");
}

function assertDeniedGooglePings(pings: string[]) {
  for (const url of pings) {
    expect(url, `GA4 ping missing cookieless consent markers: ${url}`).toMatch(/pscdl=denied/);
    expect(url, `GA4 ping missing npa=1: ${url}`).toMatch(/npa=1/);
    expect(url, `GA4 ping missing denied storage: ${url}`).toMatch(/gcs=G[01]00/);
  }
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

  test("Root / redirects to /landingpage (temporary)", async () => {
    await page.goto("/", { waitUntil: "networkidle" });
    expect(page.url()).toContain("/landingpage");
    expect(page.url()).not.toContain("/?");
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
  });

  test("Root / preserves query parameters on redirect", async () => {
    await page.goto("/?utm_source=google&utm_medium=cpc&gclid=abc123", { waitUntil: "networkidle" });
    const url = page.url();
    expect(url).toContain("/landingpage");
    expect(url).toContain("utm_source=google");
    expect(url).toContain("utm_medium=cpc");
    expect(url).toContain("gclid=abc123");
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
  });

  test("Exactly 1 h1 exists", async () => {
    await waitForPageReady(page);
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
  });

  test("WhatsApp CTAs present in all commercial sections", async () => {
    await waitForPageReady(page);
    for (const location of ["header", "hero", "portfolio", "investment", "final"]) {
      const cta = whatsappCta(page, location);
      await expect(cta.first()).toHaveAttribute("data-whatsapp-cta", "true");
    }
    const total = await page.locator('a[data-whatsapp-cta="true"]').count();
    expect(total).toBeGreaterThanOrEqual(5);
  });

  test("No external commercial links (only WhatsApp is allowed)", async () => {
    await waitForPageReady(page);
    const links = page.locator('a[target="_blank"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(5);
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute("href");
      expect(href).not.toContain("instagram.com");
      expect(href).not.toContain("facebook.com");
      expect(href).not.toContain("linkedin.com");
      expect(href).not.toContain("twitter.com");
      expect(href).not.toContain("youtube.com");
      expect(href).toContain("wa.me");
    }
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

  test("Sections present in order via h2 elements", async () => {
    await waitForPageReady(page);
    const h2s = await page.locator("h2").allTextContents();
    const expected = [
      "Projetos reais desenvolvidos por mim",
      "Tudo o que está incluído no projeto",
      "Da contratação à publicação em três etapas",
      "Seu projeto é desenvolvido diretamente por mim",
      "Sua Landing Page completa por R$ 997",
      "O que você precisa saber antes de iniciar",
      "Tenha sua Landing Page publicada e preparada para anunciar",
    ];
    let lastIdx = -1;
    for (const text of expected) {
      const idx = h2s.findIndex((h) => h.trim().includes(text));
      expect(idx, `h2 not found in order: ${text}`).toBeGreaterThan(lastIdx);
      lastIdx = idx;
    }
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
    expect(title).toContain("Landing Page Profissional para Google Ads e Meta Ads");
    expect(title).toContain("R$ 997");
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

  test("Hero composition: desktop mockup loads, only WhatsApp external link", async () => {
    await waitForPageReady(page);
    const desktopImage = page.locator('img[alt*="ZARQ Planejados"][alt*="desktop"]');
    await expect(desktopImage).toBeVisible();
    const mobileImage = page.locator('img[alt*="ZARQ Planejados"][alt*="mobile"]').first();
    await expect(mobileImage).toBeVisible();
    const heroSection = page.locator("section").first();
    const heroLinks = heroSection.locator('a[target="_blank"]');
    await expect(heroLinks).toHaveCount(1);
    const href = await heroLinks.getAttribute("href");
    expect(href).toContain("wa.me");
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
    expect(count).toBeGreaterThanOrEqual(2);
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

  test("No form artifacts remain in the DOM", async () => {
    await waitForPageReady(page);
    const body = await page.textContent("body");
    expect(body).not.toContain("Preencha o formulário");
    expect(body).not.toContain("Começar");
    expect(body).not.toContain("Enviar informações");
    expect(body).not.toContain("Confira suas informações");
    const dialogs = await page.locator("dialog").count();
    expect(dialogs).toBe(0);
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
/*  WHATSAPP CTA TESTS                                                */
/* ------------------------------------------------------------------ */

test.describe("WhatsApp CTA tests", () => {
  test("All visible CTAs have the correct href, target and message", async ({ page }) => {
    await waitForPageReady(page);

    const headerHref = await expectedCtaHref(page, "header");
    expect(headerHref).toMatch(WHATSAPP_HREF_RE);

    for (const location of ["header", "hero", "portfolio", "investment", "final"]) {
      await expectCtaMatches(page, location, headerHref);
    }
  });

  test("Clicking each CTA opens a wa.me popup and fires cta_click + whatsapp_click", async ({ page }) => {
    await mockWhatsappPopups(page);
    await waitForPageReady(page);

    for (const location of ["header", "hero", "portfolio", "investment", "final"]) {
      const cta = whatsappCta(page, location).first();
      await cta.scrollIntoViewIfNeeded();

      const popupPromise = page.waitForEvent("popup");
      await cta.click();
      const popup = await popupPromise;
      await popup.waitForLoadState("domcontentloaded");
      expect(popup.url()).toContain("https://wa.me/");
      expect(popup.url()).toContain(encodeURIComponent(WHATSAPP_MESSAGE));
      await popup.close();

      const clickEvent = await lastEvent(page, "cta_click");
      expect(clickEvent).not.toBeNull();
      expect(clickEvent!.cta_location).toBe(location);
      expect(clickEvent!.cta_id).toBe(CTA_IDS[location]);
      expect(clickEvent!.cta_text).toBe(CTA_TEXTS[location]);

      const whatsappEvent = await lastEvent(page, "whatsapp_click");
      expect(whatsappEvent).not.toBeNull();
      expect(whatsappEvent!.cta_location).toBe(location);
    }

    const hasGenerateLead = await page.evaluate(() => {
      const dl = window.dataLayer ?? [];
      return dl.some((e) => (e as Record<string, unknown>).event === "generate_lead");
    });
    expect(hasGenerateLead).toBe(false);
  });

  test("CTA click does not block navigation (no preventDefault)", async ({ page }) => {
    await mockWhatsappPopups(page);
    await waitForPageReady(page);

    const cta = whatsappCta(page, "header").first();
    const popupPromise = page.waitForEvent("popup");
    await cta.click();
    const popup = await popupPromise;
    await popup.waitForLoadState("domcontentloaded");
    expect(popup.url()).toContain("wa.me");
    await popup.close();
  });

  test("No WhatsApp CTA renders a broken link when hidden from mobile sticky logic", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    await dismissConsent(page);
    await page.locator("h2", { hasText: "Tudo o que está incluído no projeto" }).scrollIntoViewIfNeeded();

    const sticky = whatsappCta(page, "sticky-mobile");
    await expect(sticky).toBeVisible();
    const stickyHref = await expectedCtaHref(page, "sticky-mobile");
    expect(stickyHref).toMatch(WHATSAPP_HREF_RE);
    const headerHref = await expectedCtaHref(page, "header");
    expect(stickyHref).toBe(headerHref);
    await expect(sticky).toHaveAttribute("data-cta-location", "sticky-mobile");
    await expect(sticky).toHaveText("Quero iniciar por R$ 498,50");
    await expect(page.getByText("Projeto completo: R$ 997").first()).toBeVisible();
  });
});

/* ------------------------------------------------------------------ */
/*  STICKY MOBILE CTA                                                 */
/* ------------------------------------------------------------------ */

test.describe("Sticky mobile CTA", () => {
  test("Mobile: appears after scrolling past hero, hidden with banner, hero or footer", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const sticky = whatsappCta(page, "sticky-mobile");

    // Banner visible → sticky hidden
    await expect(page.locator(BANNER)).toBeVisible();
    await expect(sticky).toHaveCount(0);

    await dismissConsent(page);

    // At the top the hero CTA is visible → sticky hidden
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(sticky).toHaveCount(0);

    // Scroll past the hero → sticky appears
    await page.locator("h2", { hasText: "Tudo o que está incluído no projeto" }).scrollIntoViewIfNeeded();
    await expect(sticky).toBeVisible();

    // Footer visible → sticky hidden
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(sticky).toHaveCount(0);

    // Back to top → hero visible → sticky hidden
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(sticky).toHaveCount(0);
  });

  test("Desktop: sticky CTA is never visible", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await waitForPageReady(page);

    await dismissConsent(page);

    await page.locator("h2", { hasText: "Tudo o que está incluído no projeto" }).scrollIntoViewIfNeeded();
    const sticky = whatsappCta(page, "sticky-mobile");
    await expect(sticky).not.toBeVisible();

    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(sticky).not.toBeVisible();
  });

  test("Sticky CTA click fires events and opens WhatsApp", async ({ page }) => {
    await mockWhatsappPopups(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    await dismissConsent(page);
    await page.locator("h2", { hasText: "Tudo o que está incluído no projeto" }).scrollIntoViewIfNeeded();

    const sticky = whatsappCta(page, "sticky-mobile");
    await expect(sticky).toBeVisible();

    const popupPromise = page.waitForEvent("popup");
    await sticky.click();
    const popup = await popupPromise;
    await popup.waitForLoadState("domcontentloaded");
    expect(popup.url()).toContain("https://wa.me/");
    await popup.close();

    const clickEvent = await lastEvent(page, "cta_click");
    expect(clickEvent).not.toBeNull();
    expect(clickEvent!.cta_location).toBe("sticky-mobile");
    expect(clickEvent!.cta_id).toBe("sticky_mobile_primary");

    const whatsappEvent = await lastEvent(page, "whatsapp_click");
    expect(whatsappEvent).not.toBeNull();
    expect(whatsappEvent!.cta_location).toBe("sticky-mobile");
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

    const toggleContainer = page.locator("dialog[open]").locator(".hidden.md\\:flex");
    const toggleBox = await toggleContainer.boundingBox();
    expect(toggleBox).not.toBeNull();
    if (toggleBox && closeBox) {
      const gap = closeBox.x - (toggleBox.x + toggleBox.width);
      expect(gap).toBeGreaterThanOrEqual(8);
    }

    await closeBtn.click();
    await expect(page.locator("dialog[open]")).not.toBeVisible();

    assertNoViolations(violations);
  });
});

/* ------------------------------------------------------------------ */
/*  FAQ TESTS                                                         */
/* ------------------------------------------------------------------ */

test.describe("FAQ tests", () => {
  const FAQ_IDS = Array.from({ length: 9 }, (_, i) => `faq_${String(i + 1).padStart(2, "0")}`);

  test("All 9 FAQs: click toggles, aria-expanded correct, keyboard works", async ({ page }) => {
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

  test("faq_open event fires when opening each question", async ({ page }) => {
    await waitForPageReady(page);

    await page.locator("#trigger-faq_01").scrollIntoViewIfNeeded();
    await page.locator("#trigger-faq_01").click();

    const ev = await lastEvent(page, "faq_open");
    expect(ev).not.toBeNull();
    expect(ev!.faq_id).toBe("faq_01");
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

    // Itens incluídos
    await scrollToH2(page, "Tudo o que está incluído no projeto");
    await page.screenshot({ path: "artifacts/visual-review/desktop-incluido.png", fullPage: false });

    // Portfólio
    await scrollToH2(page, "Projetos reais desenvolvidos por mim");
    await page.screenshot({ path: "artifacts/visual-review/desktop-portfolio.png", fullPage: false });

    // Processo
    await scrollToH2(page, "Da contratação à publicação em três etapas");
    await page.screenshot({ path: "artifacts/visual-review/desktop-processo.png", fullPage: false });

    // Investimento
    await scrollToH2(page, "Sua Landing Page completa por");
    await page.screenshot({ path: "artifacts/visual-review/desktop-investimento.png", fullPage: false });

    // FAQ + CTA final
    await scrollToH2(page, "O que você precisa saber antes de iniciar");
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

    // Portfólio
    await scrollToH2(page, "Projetos reais desenvolvidos por mim");
    await page.screenshot({ path: "artifacts/visual-review/mobile-portfolio.png", fullPage: false });

    // Investimento
    await scrollToH2(page, "Sua Landing Page completa por");
    await page.screenshot({ path: "artifacts/visual-review/mobile-investimento.png", fullPage: false });

    // FAQ
    await scrollToH2(page, "O que você precisa saber antes de iniciar");
    await page.screenshot({ path: "artifacts/visual-review/mobile-faq.png", fullPage: false });

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
    await scrollToH2(page, "Projetos reais desenvolvidos por mim");
    await page.screenshot({ path: "artifacts/visual-review/tablet-portfolio.png", fullPage: false });

    // Investimento
    await scrollToH2(page, "Sua Landing Page completa por");
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
    const googlePings: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (
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
    collectGooglePings(page, googlePings);

    await waitForPageReady(page);

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
    expect(googlePings.length).toBeGreaterThan(0);
    assertDeniedGooglePings(googlePings);
    expect(await trackingCookies(page)).toHaveLength(0);
    expect(await trackingStorageKeys(page)).toHaveLength(0);
    assertNoViolations(violations);
  });

  test("No PII in console output or dataLayer", async ({ page }) => {
    const consoleOutput: string[] = [];
    page.on("console", (msg) => consoleOutput.push(msg.text()));

    await mockWhatsappPopups(page);
    await waitForPageReady(page);

    const cta = whatsappCta(page, "header").first();
    const popupPromise = page.waitForEvent("popup");
    await cta.click();
    const popup = await popupPromise;
    await popup.waitForLoadState("domcontentloaded");
    await popup.close();

    await page.locator("#trigger-faq_01").scrollIntoViewIfNeeded();
    await page.locator("#trigger-faq_01").click();

    const fullOutput = consoleOutput.join("\n");
    expect(fullOutput).not.toContain("Maria");
    expect(fullOutput).not.toContain("11999998888");

    const dataLayer = await page.evaluate(() => window.dataLayer ?? []);
    const dlString = JSON.stringify(dataLayer);
    expect(dlString).not.toContain("Maria");
    expect(dlString).not.toContain("11999998888");
    expect(dlString).not.toContain("11999887766");
    expect(dlString).not.toContain("informar seu nome");
  });
});

/* ------------------------------------------------------------------ */
/*  CONTENT.md CONFORMITY TESTS                                       */
/* ------------------------------------------------------------------ */

test.describe("CONTENT.md conformity", () => {
  test("New copy present and old phrases absent in rendered page", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await waitForPageReady(page);

    const body = await page.textContent("body");

    // Hero
    expect(body).toContain("Landing Page profissional para Google Ads e Meta Ads por");
    expect(body).toContain("Eu cuido da estratégia, dos textos, do design, do desenvolvimento, do rastreamento e da publicação.");
    expect(body).toContain("Projeto completo por");
    expect(body).toContain("R$ 498,50 para iniciar");
    expect(body).toContain("após a página estar publicada e funcionando");
    expect(body).toContain("Até 7 dias úteis após briefing e materiais");
    expect(body).toContain("Até 2 rodadas de ajustes");
    expect(body).toContain("Fale diretamente com Willian pelo WhatsApp.");
    expect(body).toContain("O briefing completo é enviado somente depois da contratação.");

    // Trust bar
    expect(body).toContain("Desenvolvimento direto com Willian");
    expect(body).toContain("Mais de 5 anos de experiência prática com Google Ads");
    expect(body).toContain("Página publicada e testada no celular e no desktop");

    // Portfolio
    expect(body).toContain("Projetos reais desenvolvidos por mim");
    expect(body).toContain("Veja Landing Pages criadas para negócios de diferentes segmentos.");
    expect(body).toContain("Cada projeto recebe uma estrutura adequada à oferta e ao público do negócio.");

    // Included
    expect(body).toContain("Tudo o que está incluído no projeto");
    expect(body).toContain("Estratégia e copy");
    expect(body).toContain("Design responsivo");
    expect(body).toContain("Desenvolvimento moderno");
    expect(body).toContain("Formulário e WhatsApp");
    expect(body).toContain("Rastreamento");
    expect(body).toContain("Publicação e testes");
    expect(body).toContain("O projeto inclui até 2 rodadas de ajustes dentro do escopo aprovado.");

    // Process
    expect(body).toContain("Da contratação à publicação em três etapas");
    expect(body).toContain("Contratação");
    expect(body).toContain("Briefing simples");
    expect(body).toContain("Criação, revisão e publicação");
    expect(body).toContain("Prazo de até 7 dias úteis");
    expect(body).toContain("A contagem começa após o recebimento do briefing completo e dos materiais necessários.");

    // About
    expect(body).toContain("Seu projeto é desenvolvido diretamente por mim");
    expect(body).toContain("Sou Willian Souza.");
    expect(body).toContain("Mais de 5 anos");
    expect(body).toContain("Cerca de R$ 40 mil");
    expect(body).toContain("Mais de 7 mil clientes");
    expect(body).toContain("Execução direta");

    // Investimento
    expect(body).toContain("Sua Landing Page completa por R$ 997");
    expect(body).toContain("Projeto completo, adaptado à sua oferta e preparado para campanhas de Google Ads ou Meta Ads.");
    expect(body).toContain("Preço total");
    expect(body).toContain("Entrada para iniciar");
    expect(body).toContain("Saldo após a publicação");
    expect(body).toContain("Ajustes");
    expect(body).toContain("Você fala diretamente comigo pelo WhatsApp.");

    // FAQ
    expect(body).toContain("O que você precisa saber antes de iniciar");
    expect(body).toContain("O que preciso enviar para iniciar?");
    expect(body).toContain("Quanto custa e como funciona o pagamento?");
    expect(body).toContain("A gestão dos anúncios está incluída?");
    expect(body).toContain("Domínio e hospedagem estão incluídos?");
    expect(body).toContain("O projeto inclui fotos, vídeos ou identidade visual?");
    expect(body).toContain("Posso solicitar alterações?");
    expect(body).toContain("A Landing Page garante vendas ou leads?");
    expect(body).toContain("Já tenho um site. Ainda preciso de uma Landing Page?");

    // CTA final
    expect(body).toContain("Tenha sua Landing Page publicada e preparada para anunciar");
    expect(body).toContain("Entrada de R$ 498,50 para iniciar.");
    expect(body).toContain("O briefing completo é enviado depois da contratação.");

    // Footer
    expect(body).toContain("Landing Pages para tráfego pago, desenvolvidas diretamente por Willian Souza.");

    // Old phrases — must be absent
    expect(body).not.toMatch(/Preencha o formul[áa]rio/i);
    expect(body).not.toMatch(/avaliar sua necessidade/i);
    expect(body).not.toMatch(/avaliar seu projeto/i);
    expect(body).not.toMatch(/entender seu projeto/i);
    expect(body).not.toMatch(/Formul[áa]rio de avalia[çc][ãa]o/i);
    expect(body).not.toMatch(/Come[çc]ar/i);
    expect(body).not.toMatch(/Enviar informa[çc][õo]es/i);
    expect(body).not.toMatch(/Confira suas informa[çc][õo]es/i);
    expect(body).not.toMatch(/Informa[çc][õo]es recebidas/i);
    expect(body).not.toMatch(/Obrigado, /i);
    expect(body).not.toMatch(/Faixa de clareza/i);
    expect(body).not.toMatch(/Problema e solu[çc][ãa]o/i);
    expect(body).not.toMatch(/gerar leads para voc[êe]/i);
    expect(body).not.toMatch(/Algumas Landing Pages que desenvolvi/i);
    expect(body).not.toMatch(/Do briefing [àa] publica[çc][ãa]o em quatro etapas/i);
    expect(body).not.toMatch(/Alguns projetos que desenvolvi/i);
    expect(body).not.toMatch(/Não é curso, template ou ferramenta\./i);
    expect(body).not.toMatch(/não garante vendas, leads ou desempenho da campanha/i);
    expect(body).not.toMatch(/Configura[çc][ãa]o de rastreamento/i);

    assertNoViolations(violations);
  });

  test("CTA labels and WhatsApp message match CONTENT.md", async ({ page }) => {
    await waitForPageReady(page);

    const body = await page.textContent("body");
    expect(body).toContain("Quero minha Landing Page por R$ 997");
    expect(body).toContain("Quero minha Landing Page");

    const href = await whatsappCta(page, "hero").first().getAttribute("href");
    expect(href).toMatch(WHATSAPP_HREF_RE);
    expect(href).toContain(`?text=${WHATSAPP_ENCODED_MESSAGE}`);
  });

  test("WhatsApp is not shown in header/sections/FAQ/footer besides the CTAs", async ({ page }) => {
    await waitForPageReady(page);

    const nonCtaWhatsapp = page.locator('a[href*="wa.me"]:not([data-whatsapp-cta="true"])');
    await expect(nonCtaWhatsapp).toHaveCount(0);

    const footer = page.locator("footer");
    await expect(footer.locator('a[href*="wa.me"]')).toHaveCount(0);

    const faqSection = page.locator("section").filter({ hasText: "O que você precisa saber antes de iniciar" });
    await expect(faqSection.locator('a[href*="wa.me"]')).toHaveCount(0);
  });
});

/* ------------------------------------------------------------------ */
/*  RESPONSIVE LAYOUT TESTS                                           */
/* ------------------------------------------------------------------ */

test.describe("Responsive layout", () => {
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

    const desktopGrid = page.locator(".hidden.md\\:grid");
    for (const name of projectNames) {
      const card = desktopGrid.locator(`[aria-label="Ver projeto ${name} por dentro"]`);
      await expect(card).toHaveCount(1);
    }

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

    const section = page.locator("section").filter({ hasText: "Projetos reais desenvolvidos por mim" });
    const grid = section.locator(".hidden.md\\:grid");
    await expect(grid).toBeVisible();

    const display = await grid.evaluate((el) => window.getComputedStyle(el).display);
    expect(display).toBe("grid");

    const mobileStrip = section.locator(".md\\:hidden .overflow-x-auto");
    await expect(mobileStrip).not.toBeVisible();

    assertNoViolations(violations);
  });

  test("IncludedSection uses a single grid with 6 items", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 1440, height: 900 });
    await waitForPageReady(page);

    const section = page.locator("section").filter({ hasText: "Tudo o que está incluído no projeto" });
    const grid = section.locator("div.grid");
    await grid.scrollIntoViewIfNeeded();

    const cards = grid.locator("> div");
    await expect(cards).toHaveCount(6);

    const titles = [
      "Estratégia e copy",
      "Design responsivo",
      "Desenvolvimento moderno",
      "Formulário e WhatsApp",
      "Rastreamento",
      "Publicação e testes",
    ];
    for (const title of titles) {
      await expect(section.getByText(title, { exact: true })).toBeVisible();
    }

    const gridCols = await grid.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return s.gridTemplateColumns.split(" ").length;
    });
    expect(gridCols).toBe(3);

    assertNoViolations(violations);
  });

  test("IncludedSection is single column on mobile", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const section = page.locator("section").filter({ hasText: "Tudo o que está incluído no projeto" });
    const grid = section.locator("div.grid");
    await grid.scrollIntoViewIfNeeded();

    const cols = await grid.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return s.gridTemplateColumns.split(" ").length;
    });
    expect(cols).toBe(1);

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

    await expect(page.getByText("Mais de 5 anos", { exact: true })).toBeVisible();
    await expect(page.getByText("Cerca de R$ 40 mil", { exact: true })).toBeVisible();
    await expect(page.getByText("Mais de 7 mil clientes", { exact: true })).toBeVisible();
    await expect(page.getByText("Execução direta").first()).toBeVisible();

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

    const section = page.locator("section").filter({ hasText: "Projetos reais desenvolvidos por mim" });
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
/*  PORTFOLIO — CTA CENTERING DESKTOP                                  */
/* ------------------------------------------------------------------ */

test.describe("Portfolio CTA centering desktop", () => {
  test("CTA centered and microcopy limited width at 1440px", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 1440, height: 900 });
    await waitForPageReady(page);

    const section = page.locator("section").filter({ hasText: "Projetos reais desenvolvidos por mim" });
    const ctaLink = whatsappCta(page, "portfolio").first();
    await ctaLink.scrollIntoViewIfNeeded();

    const sectionBox = await section.boundingBox();
    const ctaBox = await ctaLink.boundingBox();
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

/* ------------------------------------------------------------------ */
/*  SOCIAL IDENTITY — OG, Twitter, icons                               */
/* ------------------------------------------------------------------ */

test.describe("Social identity metadata", () => {
  test("Open Graph meta tags are present with correct values", async ({ page }) => {
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });

    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute("content");
    expect(ogTitle).toContain("Landing Page Profissional para Google Ads e Meta Ads");
    expect(ogTitle).toContain("R$ 997");
    expect(ogTitle).toContain("Anúncio & Site");

    const ogDesc = await page
      .locator('meta[property="og:description"]')
      .getAttribute("content");
    expect(ogDesc).toContain("R$ 997");

    const ogUrl = await page
      .locator('meta[property="og:url"]')
      .getAttribute("content");
    expect(ogUrl).toContain("/landingpage");

    const ogSiteName = await page
      .locator('meta[property="og:site_name"]')
      .getAttribute("content");
    expect(ogSiteName).toBe("Anúncio & Site");

    const ogLocale = await page
      .locator('meta[property="og:locale"]')
      .getAttribute("content");
    expect(ogLocale).toBe("pt_BR");

    const ogType = await page
      .locator('meta[property="og:type"]')
      .getAttribute("content");
    expect(ogType).toBe("website");

    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(ogImage).toBeTruthy();
    expect(ogImage).toContain("/landingpage/opengraph-image");
  });

  test("Twitter card meta tags are present", async ({ page }) => {
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });

    const twCard = await page
      .locator('meta[name="twitter:card"]')
      .getAttribute("content");
    expect(twCard).toBe("summary_large_image");

    const twTitle = await page
      .locator('meta[name="twitter:title"]')
      .getAttribute("content");
    expect(twTitle).toContain("Landing Page Profissional para Google Ads e Meta Ads");

    const twDesc = await page
      .locator('meta[name="twitter:description"]')
      .getAttribute("content");
    expect(twDesc).toContain("R$ 997");

    const twImage = await page
      .locator('meta[name="twitter:image"]')
      .getAttribute("content");
    expect(twImage).toBeTruthy();
    expect(twImage).toContain("/landingpage/twitter-image");
  });

  test("Favicon and apple-touch-icon link tags are present", async ({ page }) => {
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });

    const icon = await page.locator('link[rel="icon"]').getAttribute("href");
    expect(icon).toBeTruthy();
    expect(icon).toContain("/icon");

    const appleIcon = await page
      .locator('link[rel="apple-touch-icon"]')
      .getAttribute("href");
    expect(appleIcon).toBeTruthy();
    expect(appleIcon).toContain("/apple-icon");
  });

  test("OG image PNG route returns 200", async ({ request }) => {
    const res = await request.get("/landingpage/opengraph-image");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  });

  test("Twitter image PNG route returns 200", async ({ request }) => {
    const res = await request.get("/landingpage/twitter-image");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  });

  test("Favicon PNG route returns 200", async ({ request }) => {
    const res = await request.get("/icon");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  });

  test("Apple touch icon PNG route returns 200", async ({ request }) => {
    const res = await request.get("/apple-icon");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  });
});

/* ------------------------------------------------------------------ */
/*  GOOGLE TAG MANAGER INSTALLATION                                    */
/* ------------------------------------------------------------------ */

test.describe("Google Tag Manager installation", () => {
  test("GTM script tag is present with correct container ID", async ({ page }) => {
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });
    const script = page.locator("script[src*='googletagmanager.com/gtm.js']");
    await expect(script).toBeAttached({ timeout: 10_000 });
    const src = await script.getAttribute("src");
    expect(src).toContain("GTM-N6V46RJN");
  });

  test("GTM initializes dataLayer with gtm.start event", async ({ page }) => {
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });
    const hasGtmStart = await page.evaluate(() => {
      const dl = window.dataLayer ?? [];
      return dl.some((e) => (e as Record<string, unknown>).event === "gtm.js");
    });
    expect(hasGtmStart).toBe(true);
  });

  test("no duplicate GTM script tags", async ({ page }) => {
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });
    const scripts = page.locator("script[src*='googletagmanager.com/gtm.js']");
    await expect(scripts).toHaveCount(1);
  });

  test("no hardcoded gtag.js — GA4 is loaded only through GTM", async ({ page }) => {
    const response = await page.goto(PAGE_URL, { waitUntil: "networkidle" });
    const html = await response!.text();
    expect(html).not.toContain("googletagmanager.com/gtag/js");
    const gtagScripts = page.locator("script[src*='googletagmanager.com/gtag/js']");
    const count = await gtagScripts.count();
    expect(count).toBeLessThanOrEqual(1);
  });

  test("GTM is present on /landingpage, /politica-de-privacidade, /termos", async ({ page }) => {
    for (const path of ["/landingpage", "/politica-de-privacidade", "/termos"]) {
      await page.goto(path, { waitUntil: "networkidle" });
      await expect(page.locator("script[src*='googletagmanager.com/gtm.js']")).toBeAttached({ timeout: 10_000 });
    }
  });

  test("no visual changes from GTM installation", async ({ page }) => {
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });
    await page.waitForSelector("h1", { timeout: 10_000 });
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
    const bodyChildren = await page.evaluate(() => document.body.children.length);
    expect(bodyChildren).toBeGreaterThan(0);
  });
});

/* ------------------------------------------------------------------ */
/*  CONSENT MODE v2 AVANÇADO                                          */
/* ------------------------------------------------------------------ */

test.describe("Consent Mode v2 avançado", () => {
  test("consent default is denied for all four categories", async ({ page }) => {
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });
    const def = await consentCommand(page, "default");
    expect(def).not.toBeNull();
    expect(def!.analytics_storage).toBe("denied");
    expect(def!.ad_storage).toBe("denied");
    expect(def!.ad_user_data).toBe("denied");
    expect(def!.ad_personalization).toBe("denied");
  });

  test("default denied: no tracking cookies/storage; any GA4 ping is cookieless with denied markers", async ({ page }) => {
    const googlePings: string[] = [];
    collectGooglePings(page, googlePings);

    await page.goto(PAGE_URL, { waitUntil: "networkidle" });

    if (googlePings.length > 0) {
      assertDeniedGooglePings(googlePings);
    }
    await expectAllConsentDenied(page);
    expect(await trackingCookies(page)).toHaveLength(0);
    expect(await trackingStorageKeys(page)).toHaveLength(0);
  });

  test("Recusar opcionais keeps consent denied and creates no optional cookies", async ({ page }) => {
    const googlePings: string[] = [];
    collectGooglePings(page, googlePings);

    await page.goto(PAGE_URL, { waitUntil: "networkidle" });

    const banner = page.locator(BANNER);
    await expect(banner).toBeVisible({ timeout: 10_000 });
    await banner.getByRole("button", { name: "Recusar opcionais" }).click();
    await expect(banner).not.toBeVisible();

    await expectAllConsentDenied(page);
    assertDeniedGooglePings(googlePings);
    expect(await trackingCookies(page)).toHaveLength(0);
    expect(await trackingStorageKeys(page)).toHaveLength(0);
  });

  test("Aceitar todos grants all four categories, allows GA4 requests and cookies", async ({ page }) => {
    const googlePings: string[] = [];
    collectGooglePings(page, googlePings);

    await page.goto(PAGE_URL, { waitUntil: "networkidle" });

    const banner = page.locator(BANNER);
    await expect(banner).toBeVisible({ timeout: 10_000 });
    await banner.getByRole("button", { name: "Aceitar todos" }).click();
    await expect(banner).not.toBeVisible();

    const update = await consentCommand(page, "update");
    expect(update).not.toBeNull();
    expect(update!.analytics_storage).toBe("granted");
    expect(update!.ad_storage).toBe("granted");
    expect(update!.ad_user_data).toBe("granted");
    expect(update!.ad_personalization).toBe("granted");

    await expect
      .poll(() => googlePings.length, { timeout: 10_000 })
      .toBeGreaterThan(0);

    await page.reload({ waitUntil: "networkidle" });
    await expect
      .poll(async () => (await trackingCookies(page)).some((c) => /^_ga/.test(c)), {
        timeout: 10_000,
      })
      .toBe(true);
  });

  test("revogar via Configurações de privacidade envia update denied", async ({ page }) => {
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });

    const banner = page.locator(BANNER);
    await expect(banner).toBeVisible({ timeout: 10_000 });
    await banner.getByRole("button", { name: "Aceitar todos" }).click();
    await expect(banner).not.toBeVisible();

    const initial = await consentCommand(page, "update");
    expect(initial).not.toBeNull();
    expect(initial!.analytics_storage).toBe("granted");

    await page.getByRole("button", { name: "Configurações de privacidade" }).click();
    const settings = page.locator('[role="dialog"][aria-labelledby="consent-settings-title"]');
    await expect(settings).toBeVisible();
    await settings.getByRole("switch", { name: /Analytics/ }).click();
    await settings.getByRole("button", { name: "Salvar preferências" }).click();
    await expect(settings).not.toBeVisible();

    const update = await consentCommand(page, "update");
    expect(update).not.toBeNull();
    expect(update!.analytics_storage).toBe("denied");
    expect(update!.ad_storage).toBe("granted");
    expect(update!.ad_user_data).toBe("granted");
    expect(update!.ad_personalization).toBe("granted");
  });

  test("no Microsoft Clarity while analytics_storage is denied", async ({ page }) => {
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });

    const banner = page.locator(BANNER);
    await expect(banner).toBeVisible({ timeout: 10_000 });
    await banner.getByRole("button", { name: "Recusar opcionais" }).click();

    await expect(page.locator('script[src*="clarity.ms"]')).toHaveCount(0);

    const cookies = await trackingCookies(page);
    expect(cookies).not.toContain("_clck");
    expect(cookies).not.toContain("_clsk");

    await expectAllConsentDenied(page);
  });
});

/* ------------------------------------------------------------------ */
/*  MICROSOFT CLARITY PREPARATION                                      */
/* ------------------------------------------------------------------ */

test.describe("Microsoft Clarity preparation", () => {
  test("consent banner is present and generic", async ({ page }) => {
    await waitForPageReady(page);
    const banner = page.locator(BANNER);
    await expect(banner).toBeVisible({ timeout: 10_000 });
    const text = await banner.textContent();
    expect(text?.trim().length ?? 0).toBeGreaterThan(0);
  });

  test("consent banner does not mention Microsoft Clarity", async ({ page }) => {
    await waitForPageReady(page);
    const banner = page.locator(BANNER);
    await expect(banner).toBeVisible({ timeout: 10_000 });
    await expect(banner).not.toContainText("Microsoft Clarity");
  });

  test("privacy policy mentions Microsoft Clarity", async ({ page }) => {
    await page.goto("/politica-de-privacidade", { waitUntil: "networkidle" });
    await expect(page.locator("main")).toContainText("Microsoft Clarity");
  });

  test("no hardcoded Clarity snippet in server-rendered HTML", async ({ page }) => {
    for (const path of ["/landingpage", "/politica-de-privacidade", "/termos"]) {
      const response = await page.goto(path, { waitUntil: "domcontentloaded" });
      const html = await response!.text();
      expect(html).not.toContain("clarity.ms");
      expect(html).not.toContain("clarity(");
    }
  });

  test("no PII in dataLayer, console output or URL after interactions", async ({ page }) => {
    const consoleOutput: string[] = [];
    page.on("console", (msg) => consoleOutput.push(msg.text()));

    await mockWhatsappPopups(page);
    await waitForPageReady(page);

    const cta = whatsappCta(page, "header").first();
    const popupPromise = page.waitForEvent("popup");
    await cta.click();
    const popup = await popupPromise;
    await popup.waitForLoadState("domcontentloaded");
    await popup.close();

    const dataLayer = await page.evaluate(() => window.dataLayer ?? []);
    const serialized = JSON.stringify({
      console: consoleOutput,
      dataLayer,
      url: page.url(),
    });
    expect(serialized).not.toContain("Maria");
    expect(serialized).not.toContain("11900009999");
    expect(serialized).not.toContain("11999887766");
  });
});
