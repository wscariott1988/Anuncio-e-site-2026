import { test, expect, type Page, type Route, type ConsoleMessage } from "@playwright/test";

const PAGE_URL = "/landingpage";

type Violation = { type: string; text: string };

function collectViolations(page: Page, violations: Violation[]) {
  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error") {
      const text = msg.text();
      if (
        text.includes("webpack-hmr") ||
        text.includes("WebSocket") ||
        text.includes("404") ||
        text.includes("502") ||
        text.includes("503")
      ) return;
      violations.push({ type: "console_error", text });
    }
  });
  page.on("pageerror", (err) => {
    const msg = String(err);
    if (msg.includes("webpack-hmr") || msg.includes("WebSocket")) return;
    violations.push({ type: "pageerror", text: msg });
  });
}

async function waitForPage(page: Page) {
  await page.goto(PAGE_URL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("h1")).toBeVisible();
  await page.waitForTimeout(300);
}

async function openForm(page: Page) {
  const btn = page.getByRole("button", { name: "Quero minha Landing Page" }).first();
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await expect(page.locator("dialog[open]")).toBeVisible({ timeout: 10_000 });
  await page.getByRole("button", { name: "Começar" }).click();
  await expect(page.locator("#form-nome")).toBeVisible({ timeout: 5000 });
}

async function fillStep1(page: Page, nome = "Maria Silva", whatsapp = "11999887766") {
  await page.fill("#form-nome", nome);
  await page.fill("#form-whatsapp", whatsapp);
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.locator("#form-negocio")).toBeVisible({ timeout: 5000 });
}

async function fillStep2(page: Page) {
  await page.fill("#form-negocio", "Clinica odontologica");
  await page.locator('input[type="radio"][value="Já anuncio no Google Ads"]').check();
  await page.locator('input[type="radio"][value="Não"]').check();
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByText("Confira suas informações")).toBeVisible({ timeout: 5000 });
}

async function checkConsentAndSubmit(page: Page) {
  await page.locator('input[type="checkbox"]').check();
  await page.getByRole("button", { name: "Enviar informações" }).click();
}

const VALID_LEAD = {
  ok: true,
  status: "created",
  lead_id: "test-lead-001",
};

const ERROR_RESPONSE = {
  ok: false,
  status: "error",
  code: "INTERNAL_ERROR",
};

/* ------------------------------------------------------------------ */
/*  API VALIDATION TESTS                                               */
/* ------------------------------------------------------------------ */

test.describe("API /api/leads validation", () => {
  test("POST with invalid Content-Type returns 400", async ({ request }) => {
    const res = await request.post("/api/leads", {
      headers: { "Content-Type": "text/plain" },
      data: "not json",
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.code).toBe("INVALID_CONTENT_TYPE");
  });

  test("POST with invalid JSON returns 400", async ({ request }) => {
    const res = await request.fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: Buffer.from("not valid json at all {{{"),
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.code).toBe("INVALID_JSON");
  });

  test("POST with valid payload and env vars calls Apps Script (201 or 502)", async ({ request }) => {
    const res = await request.post("/api/leads", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        nome: "Maria",
        whatsapp: "11999887766",
        negocioServico: "Clinica",
        situacaoAnuncios: "Já anuncio no Google Ads",
        possuiSite: "Não",
        consentimento: true,
      }),
    });
    expect([201, 502]).toContain(res.status());
    const body = await res.json();
    expect(body.ok).toBeDefined();
  });

  test("POST with honeypot returns 200 created without calling Apps Script", async ({ request }) => {
    const res = await request.post("/api/leads", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ honeypot: "bot-value", nome: "Bot" }),
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.status).toBe("created");
    expect(body.lead_id).toBe("honeypot");
  });

  test("POST missing nome returns 422", async ({ request }) => {
    const res = await request.post("/api/leads", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ whatsapp: "11999887766" }),
    });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.code).toBe("INVALID_NOME");
  });

  test("POST with invalid WhatsApp returns 422", async ({ request }) => {
    const res = await request.post("/api/leads", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ nome: "Test", whatsapp: "123" }),
    });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.code).toBe("INVALID_WHATSAPP");
  });

  test("POST without consent returns 422", async ({ request }) => {
    const res = await request.post("/api/leads", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        nome: "Maria",
        whatsapp: "11999887766",
        negocioServico: "Clinica",
        situacaoAnuncios: "Já anuncio no Google Ads",
        possuiSite: "Não",
        consentimento: false,
      }),
    });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.code).toBe("CONSENT_REQUIRED");
  });

  test("POST with invalid URL when possuiSite=Sim returns 422", async ({ request }) => {
    const res = await request.post("/api/leads", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        nome: "Maria",
        whatsapp: "11999887766",
        negocioServico: "Clinica",
        situacaoAnuncios: "Já anuncio no Google Ads",
        possuiSite: "Sim",
        urlAtual: "not-a-url",
        consentimento: true,
      }),
    });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.code).toBe("INVALID_URL");
  });

  test("POST with invalid situacao returns 422", async ({ request }) => {
    const res = await request.post("/api/leads", {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        nome: "Maria",
        whatsapp: "11999887766",
        negocioServico: "Clinica",
        situacaoAnuncios: "invalid",
        possuiSite: "Não",
        consentimento: true,
      }),
    });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.code).toBe("INVALID_SITUACAO");
  });
});

/* ------------------------------------------------------------------ */
/*  FORM INTEGRATION TESTS (with mocked API)                          */
/* ------------------------------------------------------------------ */

test.describe("Form submission flow", () => {
  let violations: Violation[];
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    violations = [];
    page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    collectViolations(page, violations);
  });

  test.afterEach(() => {
    const critical = violations.filter((v) => v.type !== "response_404");
    expect(critical, `Violations: ${JSON.stringify(critical)}`).toHaveLength(0);
    void page.close();
  });

  test("honeypot field exists and is hidden", async () => {
    await waitForPage(page);
    await openForm(page);
    await fillStep1(page);
    await fillStep2(page);

    const hp = page.locator("#form-hp");
    await expect(hp).toBeAttached();
    await expect(hp).toHaveAttribute("tabindex", "-1");
    await expect(hp).toHaveAttribute("autocomplete", "off");
  });

  test("form sends to /api/leads and shows success on created", async () => {
    await waitForPage(page);
    await openForm(page);

    await page.route("**/api/leads", async (route: Route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(VALID_LEAD),
      });
    });

    await fillStep1(page);
    await fillStep2(page);
    await checkConsentAndSubmit(page);

    await expect(page.locator("text=Recebi os dados do seu projeto")).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("text=Continuar no WhatsApp")).toBeVisible();
  });

  test("form shows error on API failure", async () => {
    await waitForPage(page);
    await openForm(page);

    await page.route("**/api/leads", async (route: Route) => {
      await route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify(ERROR_RESPONSE),
      });
    });

    await fillStep1(page);
    await fillStep2(page);
    await checkConsentAndSubmit(page);

    await expect(page.locator("text=Não foi possível enviar agora")).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("text=Tentar novamente")).toBeVisible();
  });

  test("form preserves data after error and retry succeeds", async () => {
    await waitForPage(page);
    await openForm(page);

    let callCount = 0;
    await page.route("**/api/leads", async (route: Route) => {
      callCount++;
      if (callCount === 1) {
        await route.fulfill({
          status: 502,
          contentType: "application/json",
          body: JSON.stringify(ERROR_RESPONSE),
        });
      } else {
        await route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify(VALID_LEAD),
        });
      }
    });

    await fillStep1(page, "Maria Teste", "11999887766");
    await fillStep2(page);
    await checkConsentAndSubmit(page);
    await expect(page.locator("text=Não foi possível enviar agora")).toBeVisible({ timeout: 10_000 });

    await page.getByRole("button", { name: "Tentar novamente" }).click();
    await expect(page.locator("text=Recebi os dados do seu projeto")).toBeVisible({ timeout: 10_000 });
  });

  test("generate_lead fires after successful submission", async () => {
    await waitForPage(page);
    await openForm(page);

    await page.evaluate(() => {
      (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer = [];
    });

    await page.route("**/api/leads", async (route: Route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(VALID_LEAD),
      });
    });

    await fillStep1(page);
    await fillStep2(page);
    await checkConsentAndSubmit(page);
    await expect(page.locator("text=Recebi os dados do seu projeto")).toBeVisible({ timeout: 10_000 });

    const dataLayer = await page.evaluate(() => {
      return (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer || [];
    });

    const generateLead = dataLayer.find((e) => e.event === "generate_lead");
    expect(generateLead).toBeDefined();
    expect(generateLead?.form_id).toBe("landingpage_lead_form");
  });

  test("whatsapp_after_lead fires when clicking WhatsApp button", async () => {
    await waitForPage(page);
    await openForm(page);

    await page.evaluate(() => {
      (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer = [];
    });

    await page.route("**/api/leads", async (route: Route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(VALID_LEAD),
      });
    });

    await fillStep1(page);
    await fillStep2(page);
    await checkConsentAndSubmit(page);
    await expect(page.locator("text=Recebi os dados do seu projeto")).toBeVisible({ timeout: 10_000 });

    const whatsappBtn = page.getByRole("button", { name: "Continuar no WhatsApp" });
    const [newPage] = await Promise.all([
      page.context().waitForEvent("page"),
      whatsappBtn.click(),
    ]);

    const dataLayer = await page.evaluate(() => {
      return (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer || [];
    });

    const whatsappEvent = dataLayer.find((e) => e.event === "whatsapp_after_lead");
    expect(whatsappEvent).toBeDefined();
    expect(newPage.url()).toContain("whatsapp");
    await newPage.close();
  });

  test("no PII in dataLayer after submission", async () => {
    await waitForPage(page);
    await openForm(page);

    await page.evaluate(() => {
      (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer = [];
    });

    await page.route("**/api/leads", async (route: Route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(VALID_LEAD),
      });
    });

    await fillStep1(page, "Maria Silva", "11999887766");
    await fillStep2(page);
    await checkConsentAndSubmit(page);
    await expect(page.locator("text=Recebi os dados do seu projeto")).toBeVisible({ timeout: 10_000 });

    const dataLayer = await page.evaluate(() => {
      return (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer || [];
    });

    const serialized = JSON.stringify(dataLayer);
    expect(serialized).not.toContain("Maria Silva");
    expect(serialized).not.toContain("11999887766");
    expect(serialized).not.toContain("Clinica");
  });

  test("submitting state shows loading text", async () => {
    await waitForPage(page);
    await openForm(page);

    let resolveApi: () => void = () => {};
    await page.route("**/api/leads", async (route: Route) => {
      await new Promise<void>((resolve) => {
        resolveApi = resolve;
      });
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(VALID_LEAD),
      });
    });

    await fillStep1(page);
    await fillStep2(page);
    await checkConsentAndSubmit(page);
    await expect(page.locator("text=Enviando informações")).toBeVisible();

    resolveApi();
    await expect(page.locator("text=Recebi os dados do seu projeto")).toBeVisible({ timeout: 10_000 });
  });

  test("form shows pending_integration when env vars missing", async () => {
    await waitForPage(page);
    await openForm(page);

    await page.route("**/api/leads", async (route: Route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, status: "error", code: "PENDING_INTEGRATION" }),
      });
    });

    await fillStep1(page);
    await fillStep2(page);
    await checkConsentAndSubmit(page);
    await expect(page.locator("text=Integração pendente")).toBeVisible({ timeout: 10_000 });
  });
});
