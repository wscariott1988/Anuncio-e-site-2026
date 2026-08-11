import { test, expect, type Page, type ConsoleMessage } from "@playwright/test";

const PAGE_URL = "/landingpage-essencial";

const WHATSAPP_MESSAGE =
  "Olá, Willian! Vi a Landing Page Essencial por R$ 399 e gostaria de entender melhor como funciona.";
const WHATSAPP_ENCODED_MESSAGE = encodeURIComponent(WHATSAPP_MESSAGE);
const ESCAPED_ENCODED_MESSAGE = WHATSAPP_ENCODED_MESSAGE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const WHATSAPP_HREF_RE = new RegExp(`^https://wa\\.me/\\d{10,14}\\?text=${ESCAPED_ENCODED_MESSAGE}$`);

const OFFER_VARIANT = "essential_399";

const CTA_TEXTS: Record<string, string> = {
  header: "Conversar sobre minha página",
  hero: "Conversar sobre minha página",
  pricing: "Falar sobre meu projeto",
  investment: "Quero entender como funciona",
  final: "Conversar com Willian no WhatsApp",
};
const CTA_LOCATIONS = ["header", "hero", "pricing", "investment", "final"] as const;

const PAGE_PARTS = [
  { part: "Cabeçalho", marker: "Anúncio & Site" },
  { part: "Hero", marker: "Sua Landing Page profissional por R$ 399" },
  { part: "Faixa de clareza", marker: "Uma página única, pronta para receber o tráfego da campanha" },
  { part: "Para quem é", marker: "Uma página profissional sem transformar o projeto em algo complicado" },
  { part: "O que está incluído", marker: "Tudo o que está incluído no projeto Essencial" },
  { part: "Projetos desenvolvidos", marker: "Projetos reais desenvolvidos por mim" },
  { part: "Como funciona", marker: "Da contratação à publicação em quatro etapas" },
  { part: "Quem é Willian Souza", marker: "Seu projeto é desenvolvido diretamente por mim" },
  { part: "Investimento", marker: "Sua Landing Page Essencial por R$ 399" },
  { part: "Perguntas frequentes", marker: "O que você precisa saber antes de iniciar" },
  { part: "CTA final", marker: "Tenha sua Landing Page Essencial publicada e preparada para anunciar" },
  { part: "Rodapé", marker: "Política de Privacidade" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

type ConsoleViolation = { type: string; text: string; url?: string };

function collectConsoleViolations(page: Page, violations: ConsoleViolation[]) {
  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error") {
      const text = msg.text();
      if (text.includes("webpack-hmr") || text.includes("WebSocket")) return;
      if (text.includes("404") || text.includes("502") || text.includes("503")) return;
      if (text.includes("net::")) return;
      if (text.includes("hydration") || text.includes("React does not recognize")) return;
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
    violations.push({ type: "request_failed", text: failure?.errorText ?? "unknown", url });
  });

  page.on("response", (res) => {
    const status = res.status();
    const url = res.url();
    if (status >= 400) {
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

async function mockWhatsappPopups(page: Page) {
  await page.context().route("https://wa.me/**", async (route) => {
    await route.fulfill({ status: 200, contentType: "text/html", body: "<html><body>ok</body></html>" });
  });
}

function whatsappCta(page: Page, location: string) {
  return page.locator(`a[data-whatsapp-cta="true"][data-cta-location="${location}"]`);
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

  test("GET /landingpage-essencial returns 200", async () => {
    const res = await page.goto(PAGE_URL, { waitUntil: "networkidle" });
    expect(res?.status()).toBe(200);
  });

  test("Exactly 1 h1 exists", async () => {
    await waitForPageReady(page);
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
  });

  test("Hero shows the official headline with price only", async () => {
    await waitForPageReady(page);
    const h1 = page.locator("h1");
    await expect(h1).toHaveText(/^Sua Landing Page profissional por R\$ 399$/);
    const heroSection = page.locator("section").first();
    const heroText = await heroSection.textContent();
    expect(heroText).not.toContain("parcela única");
    expect(heroText).not.toContain("199,50");
    expect(heroText).toContain("até 5 dias úteis");
    expect(heroText).toContain("1 rodada de ajustes");
  });

  test("Page has exactly 12 parts in the official order", async () => {
    await waitForPageReady(page);
    const parts = page.locator("header, main > section, footer");
    await expect(parts).toHaveCount(PAGE_PARTS.length);
    for (let i = 0; i < PAGE_PARTS.length; i++) {
      await expect(parts.nth(i), PAGE_PARTS[i].part).toContainText(PAGE_PARTS[i].marker);
    }
  });

  test("The 'Para quem é' section is present at position 4 with official copy", async () => {
    await waitForPageReady(page);
    const h2 = page.locator("h2", { hasText: "Uma página profissional sem transformar o projeto em algo complicado" });
    await expect(h2).toBeVisible();

    const section = page.locator("section").filter({ hasText: "Uma oferta, uma página e uma ação principal" });
    await expect(section).toBeVisible();
    await expect(section).toContainText("Uma opção para começar");
    await expect(section).toContainText(
      "A Landing Page Essencial é indicada para quem precisa apresentar um serviço, explicar sua oferta e facilitar o contato com possíveis clientes."
    );

    const items = [
      "Profissionais autônomos que precisam de uma página para apresentar o serviço.",
      "Prestadores de serviços que querem receber contatos pelo WhatsApp.",
      "Pequenos negócios que desejam anunciar uma oferta.",
      "Empresas que desejam anunciar uma oferta no Google Ads ou Meta Ads.",
      "Quem ainda não possui uma página focada em contato.",
    ];
    for (const item of items) {
      await expect(section).toContainText(item);
    }
    await expect(section).toContainText("Uma oferta, uma página e uma ação principal.");
  });

  test("WhatsApp CTAs present in all five commercial locations", async () => {
    await waitForPageReady(page);
    for (const location of CTA_LOCATIONS) {
      const cta = whatsappCta(page, location);
      await expect(cta.first()).toHaveAttribute("data-whatsapp-cta", "true");
    }
    const total = await page.locator('a[data-whatsapp-cta="true"]').count();
    expect(total).toBe(CTA_LOCATIONS.length);
  });

  test("The five CTAs use the official texts", async () => {
    await waitForPageReady(page);
    for (const location of CTA_LOCATIONS) {
      await expect(whatsappCta(page, location).first()).toHaveText(CTA_TEXTS[location]);
    }
  });

  test("The five CTAs use the official cta_location values", async () => {
    await waitForPageReady(page);
    const locations: string[] = await page
      .locator('a[data-whatsapp-cta="true"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("data-cta-location") ?? ""));
    expect(locations.sort()).toEqual([...CTA_LOCATIONS].sort());
  });

  test("No sticky mobile CTA exists on the essential page", async () => {
    await waitForPageReady(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    const sticky = whatsappCta(page, "sticky-mobile");
    await expect(sticky).toHaveCount(0);
  });

  test("No external commercial links (only WhatsApp is allowed)", async () => {
    await waitForPageReady(page);
    const links = page.locator('a[target="_blank"]');
    const count = await links.count();
    expect(count).toBe(CTA_LOCATIONS.length);
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

  test("No /landingpage-essencial/obrigado page", async () => {
    const res = await page.goto("/landingpage-essencial/obrigado");
    expect(res?.status()).toBe(404);
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

  test("Metadata contains correct title, official description, canonical, robots", async () => {
    await page.goto(PAGE_URL, { waitUntil: "networkidle" });

    const title = await page.title();
    expect(title).toContain("Landing Page Essencial para Google Ads e Meta Ads");
    expect(title).toContain("R$ 399");
    expect(title).toContain("Anúncio & Site");

    const metaDesc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(metaDesc).toBe(
      "Landing Page profissional para Google Ads e Meta Ads por R$ 399, com design responsivo, WhatsApp, publicação e 1 rodada de ajustes."
    );
    expect(metaDesc).not.toContain("parcela única");

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toContain("/landingpage-essencial");

    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toContain("noindex");
  });

  test("Offer shows R$ 399 total and both installments, without parcela única", async () => {
    await waitForPageReady(page);
    const body = await page.textContent("body");

    expect(body).toContain("R$ 399");
    expect(body).not.toContain("R$ 997");
    expect(body).not.toContain("498,50");

    const occurrences = (body ?? "").match(/199,50/g) ?? [];
    expect(occurrences.length).toBeGreaterThanOrEqual(2);

    const investmentSection = page
      .locator("section")
      .filter({ hasText: "Sua Landing Page Essencial por R$ 399" })
      .last();
    await expect(investmentSection).toContainText("Entrada para iniciar");
    await expect(investmentSection).toContainText("R$ 199,50");
    await expect(investmentSection).toContainText("Saldo após a publicação e validação do funcionamento");
    await expect(investmentSection).toContainText("até 5 dias úteis");
    await expect(investmentSection).toContainText("1 rodada de ajustes");

    expect(body).not.toMatch(/parcela\s+ú?nica/i);
    expect(body).not.toMatch(/pagamento\s+único/i);
  });

  test("FAQ payment answer explains both installments", async () => {
    await waitForPageReady(page);

    await page.locator("#trigger-faq_02").scrollIntoViewIfNeeded();
    await page.locator("#trigger-faq_02").click();
    await expect(page.locator("#trigger-faq_02")).toHaveAttribute("aria-expanded", "true");

    await expect(page.locator("#panel-faq_02")).toContainText(
      "O projeto custa R$ 399. O pagamento é dividido em R$ 199,50 na contratação e R$ 199,50 após a Landing Page estar publicada e funcionando."
    );
  });

  test("Process step 1 mentions the entry payment", async () => {
    await waitForPageReady(page);
    const processSection = page
      .locator("section")
      .filter({ hasText: "Da contratação à publicação em quatro etapas" });
    await expect(processSection).toContainText(
      "Você confirma o projeto e faz o pagamento da entrada de R$ 199,50."
    );
  });

  test("Final CTA microtext mentions the entry payment", async () => {
    await waitForPageReady(page);
    const finalSection = page
      .locator("section")
      .filter({ hasText: "Tenha sua Landing Page Essencial publicada e preparada para anunciar" });
    await expect(finalSection).toContainText(
      "Entrada de R$ 199,50 para iniciar. O briefing completo é enviado depois da contratação."
    );
  });

  test("Old WhatsApp message and old CTA texts are absent", async () => {
    await waitForPageReady(page);
    const body = await page.textContent("body");
    expect(body).not.toContain("Olá, Willian. Vi a Landing Page Essencial por R$ 399 e quero iniciar meu projeto.");
    expect(body).not.toContain("Quero minha Landing Page Essencial por R$ 399");
    expect(body).not.toContain("Quero minha Landing Page");
  });

  test("No strikethrough, discount, urgency, vagas, cronômetro", async () => {
    await waitForPageReady(page);
    const body = await page.textContent("body");
    expect(body).not.toMatch(/~~|só restam|vagas? limitad[aoe]|últim[aoe]s?|conto(?:r|agem)|desconto|preço anterior|riscad[ao]/i);
    const strikethroughs = page.locator("s, strike, del");
    await expect(strikethroughs).toHaveCount(0);
  });

  test("No form artifacts remain in the DOM", async () => {
    await waitForPageReady(page);
    const body = await page.textContent("body");
    expect(body).not.toContain("Preencha o formulário");
    expect(body).not.toContain("Enviar informações");
    expect(body).not.toContain("Confira suas informações");
    const dialogs = await page.locator("dialog").count();
    expect(dialogs).toBe(0);
  });

  test("Hero composition: only WhatsApp external link in the hero", async () => {
    await waitForPageReady(page);
    const desktopImage = page.locator('img[alt*="ZARQ Planejados"][alt*="desktop"]');
    await expect(desktopImage).toBeVisible();
    const heroSection = page.locator("section").first();
    const heroLinks = heroSection.locator('a[target="_blank"]');
    await expect(heroLinks).toHaveCount(1);
    const href = await heroLinks.getAttribute("href");
    expect(href).toContain("wa.me");
  });

  test("R$ 399 does not break between R$ and 399", async () => {
    await waitForPageReady(page);
    const nowrapSpans = page.locator("span.whitespace-nowrap");
    const count = await nowrapSpans.count();
    expect(count).toBeGreaterThanOrEqual(2);
    for (let i = 0; i < count; i++) {
      const text = await nowrapSpans.nth(i).textContent();
      expect(text).toMatch(/R\$\s*399/);
    }
  });

  test("Footer has legal links and mailto contact, no WhatsApp", async () => {
    await waitForPageReady(page);
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Política de Privacidade" })).toHaveAttribute("href", "/politica-de-privacidade");
    await expect(footer.getByRole("link", { name: "Termos de Uso" })).toHaveAttribute("href", "/termos");
    await expect(footer.locator('a[href="mailto:contato@grupows.com"]')).toBeVisible();
    await expect(footer.locator('a[href*="wa.me"]')).toHaveCount(0);
  });
});

/* ------------------------------------------------------------------ */
/*  WHATSAPP CTA TESTS                                                */
/* ------------------------------------------------------------------ */

test.describe("WhatsApp CTA tests", () => {
  test("All visible CTAs have the correct href, target and official message", async ({ page }) => {
    await waitForPageReady(page);

    const headerHref = await whatsappCta(page, "header").first().getAttribute("href");
    expect(headerHref).not.toBeNull();
    expect(headerHref!).toMatch(WHATSAPP_HREF_RE);

    for (const location of CTA_LOCATIONS) {
      const cta = whatsappCta(page, location).first();
      await expect(cta).toHaveAttribute("href", headerHref!);
      await expect(cta).toHaveAttribute("target", "_blank");
      await expect(cta).toHaveAttribute("rel", "noopener noreferrer");
      await expect(cta).toHaveAttribute("data-cta-location", location);
      await expect(cta).toHaveText(CTA_TEXTS[location]);
      const tag = await cta.evaluate((el) => el.tagName);
      expect(tag).toBe("A");
    }
  });

  test("Clicking each CTA opens wa.me with the exact official message", async ({ page }) => {
    await mockWhatsappPopups(page);
    await waitForPageReady(page);

    for (const location of CTA_LOCATIONS) {
      const cta = whatsappCta(page, location).first();
      await cta.scrollIntoViewIfNeeded();

      const popupPromise = page.waitForEvent("popup");
      await cta.click();
      const popup = await popupPromise;
      await popup.waitForLoadState("domcontentloaded");
      expect(popup.url()).toContain("https://wa.me/");
      expect(popup.url()).toContain(WHATSAPP_ENCODED_MESSAGE);
      await popup.close();
    }
  });

  test("cta_click and whatsapp_click carry essential_399 and nothing else", async ({ page }) => {
    await mockWhatsappPopups(page);
    await waitForPageReady(page);

    for (const location of CTA_LOCATIONS) {
      const cta = whatsappCta(page, location).first();
      await cta.scrollIntoViewIfNeeded();

      const popupPromise = page.waitForEvent("popup");
      await cta.click();
      const popup = await popupPromise;
      await popup.waitForLoadState("domcontentloaded");
      await popup.close();

      const clickEvent = await lastEvent(page, "cta_click");
      expect(clickEvent, `cta_click missing for ${location}`).not.toBeNull();
      expect(clickEvent!.offer_variant).toBe(OFFER_VARIANT);
      expect(clickEvent!.cta_location).toBe(location);
      expect(clickEvent!.cta_label).toBe(CTA_TEXTS[location]);
      expect(clickEvent).not.toHaveProperty("form_id");
      expect(clickEvent).not.toHaveProperty("cta_id");
      expect(clickEvent).not.toHaveProperty("cta_text");
      expect(clickEvent).not.toHaveProperty("event_version");

      const whatsappEvent = await lastEvent(page, "whatsapp_click");
      expect(whatsappEvent, `whatsapp_click missing for ${location}`).not.toBeNull();
      expect(whatsappEvent!.offer_variant).toBe(OFFER_VARIANT);
      expect(whatsappEvent!.cta_location).toBe(location);
      expect(whatsappEvent!.contact_method).toBe("whatsapp");
      expect(whatsappEvent).not.toHaveProperty("form_id");
      expect(whatsappEvent).not.toHaveProperty("cta_id");
      expect(whatsappEvent).not.toHaveProperty("cta_text");
      expect(whatsappEvent).not.toHaveProperty("event_version");
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

  test("No WhatsApp in FAQ section", async ({ page }) => {
    await waitForPageReady(page);
    const faqSection = page.locator("section").filter({ hasText: "O que você precisa saber antes de iniciar" });
    await expect(faqSection.locator('a[href*="wa.me"]')).toHaveCount(0);
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

  test("All 5 projects present on mobile and desktop", async ({ page }) => {
    await waitForPageReady(page);

    const desktopGrid = page.locator(".hidden.md\\:grid");
    for (const project of PROJECTS) {
      const card = desktopGrid.locator(`[aria-label="Ver projeto ${project.name} por dentro"]`);
      await expect(card).toHaveCount(1);
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    const mobileStrip = page.locator(".md\\:hidden .overflow-x-auto");
    for (const project of PROJECTS) {
      const card = mobileStrip.locator(`[aria-label="Ver projeto ${project.name} por dentro"]`);
      await expect(card).toHaveCount(1);
    }
  });

  test("Portfolio has horizontal scroll on mobile (scroll-snap)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const scrollContainer = page.locator(".md\\:hidden .overflow-x-auto");
    await expect(scrollContainer).toBeVisible();

    const scrollBehavior = await scrollContainer.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return { overflowX: s.overflowX, scrollSnapType: s.scrollSnapType };
    });
    expect(scrollBehavior.overflowX).toBe("auto");
    expect(scrollBehavior.scrollSnapType).toContain("x");

    const cards = scrollContainer.locator("[role='button']");
    await expect(cards).toHaveCount(5);
  });

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

  test("portfolio_open keeps the shared format without offer_variant", async ({ page }) => {
    await waitForPageReady(page);

    const desktopGrid = page.locator(".hidden.md\\:grid.md\\:grid-cols-2");
    const card = desktopGrid.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
    await card.scrollIntoViewIfNeeded();
    await card.click();

    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible({ timeout: 10_000 });

    const ev = await lastEvent(page, "portfolio_open");
    expect(ev).not.toBeNull();
    expect(ev!.project_id).toBe("mecanica_auto_brum");
    expect(ev!.initial_view).toBe("mobile");
    expect(ev).not.toHaveProperty("offer_variant");

    await page.keyboard.press("Escape");
  });

  test("Mobile view: only mobile.webp is requested", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const desktopRequests: string[] = [];
    page.on("request", (req) => {
      const url = req.url();
      if (url.includes("-desktop.webp")) desktopRequests.push(url);
    });

    const mobileStrip = page.locator(".md\\:hidden .overflow-x-auto");
    const card = mobileStrip.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
    await card.scrollIntoViewIfNeeded();
    await card.click();

    await expect(page.locator("dialog[open]")).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(1500);

    expect(desktopRequests.some((u) => u.includes("mecanica-auto-brum-desktop.webp"))).toBeFalsy();

    const desktopBtn = page.getByRole("button", { name: "Desktop" });
    await expect(desktopBtn).not.toBeVisible();

    await page.keyboard.press("Escape");
  });
});

/* ------------------------------------------------------------------ */
/*  FAQ TESTS                                                         */
/* ------------------------------------------------------------------ */

test.describe("FAQ tests", () => {
  const FAQ_IDS = ["faq_01", "faq_02", "faq_03", "faq_04", "faq_05", "faq_06"];

  test("All 6 FAQs: click toggles, aria-expanded correct, keyboard works", async ({ page }) => {
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

  test("faq_open event fires with the shared format and no offer_variant", async ({ page }) => {
    await waitForPageReady(page);

    await page.locator("#trigger-faq_01").scrollIntoViewIfNeeded();
    await page.locator("#trigger-faq_01").click();

    const ev = await lastEvent(page, "faq_open");
    expect(ev).not.toBeNull();
    expect(ev!.faq_id).toBe("faq_01");
    expect(ev).not.toHaveProperty("offer_variant");
  });
});

/* ------------------------------------------------------------------ */
/*  ABOUT SECTION — GRACEFUL WITHOUT PHOTO                             */
/* ------------------------------------------------------------------ */

test.describe("About section without photo", () => {
  test("Indicators grid renders and no broken image is present", async ({ page }) => {
    const violations: ConsoleViolation[] = [];
    collectConsoleViolations(page, violations);

    await page.setViewportSize({ width: 390, height: 844 });
    await waitForPageReady(page);

    const section = page.locator("section").filter({ hasText: "Seu projeto é desenvolvido" });
    await section.scrollIntoViewIfNeeded();

    const indicators = section.locator(".grid > div");
    await expect(indicators).toHaveCount(4);

    const brokenImages = await page.evaluate(() => {
      return Array.from(document.images).filter((img) => {
        const isRendered = img.offsetParent !== null || img.getClientRects().length > 0;
        if (!isRendered) return false;
        return img.complete && img.naturalWidth === 0;
      }).length;
    });
    expect(brokenImages).toBe(0);

    assertNoViolations(violations);
  });
});

/* ------------------------------------------------------------------ */
/*  REGRESSION — /landingpage STAYS INTACT                             */
/* ------------------------------------------------------------------ */

test.describe("Regression: /landingpage stays intact", () => {
  test("Landing page route still works with its own tracking shape", async ({ page }) => {
    await mockWhatsappPopups(page);
    const res = await page.goto("/landingpage", { waitUntil: "networkidle" });
    expect(res?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);

    const cta = page.locator('a[data-whatsapp-cta="true"][data-cta-location="hero"]').first();
    await expect(cta).toHaveText("Quero minha Landing Page por R$ 997");

    const href = await cta.getAttribute("href");
    expect(href).toMatch(/^https:\/\/wa\.me\/\d{10,14}\?text=/);
    expect(href).toContain(
      encodeURIComponent(
        "Olá, Willian. Vi a Landing Page completa por R$ 997 e quero iniciar meu projeto. Pode me explicar os próximos passos?"
      )
    );

    await cta.scrollIntoViewIfNeeded();
    const popupPromise = page.waitForEvent("popup");
    await cta.click();
    const popup = await popupPromise;
    await popup.waitForLoadState("domcontentloaded");
    await popup.close();

    const clickEvent = await lastEvent(page, "cta_click");
    expect(clickEvent).not.toBeNull();
    expect(clickEvent!.cta_location).toBe("hero");
    expect(clickEvent!.cta_id).toBe("hero_primary");
    expect(clickEvent!.cta_text).toBe("Quero minha Landing Page por R$ 997");
    expect(clickEvent!.form_id).toBe("landingpage_lead_form");
    expect(clickEvent!.event_version).toBe("1");
    expect(clickEvent!.offer_variant).toBeUndefined();

    const whatsappEvent = await lastEvent(page, "whatsapp_click");
    expect(whatsappEvent).not.toBeNull();
    expect(whatsappEvent!.cta_location).toBe("hero");
    expect(whatsappEvent!.form_id).toBe("landingpage_lead_form");
    expect(whatsappEvent!.event_version).toBe("1");
    expect(whatsappEvent!.offer_variant).toBeUndefined();
  });
});
