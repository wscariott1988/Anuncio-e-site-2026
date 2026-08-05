import { test, expect } from "@playwright/test";

// This test runs against the DEV server (port 3000) to diagnose hydration issues.
// It does NOT affect the production E2E suite.

const DEV_URL = "http://localhost:3000/landingpage";

test("DEV hydration diagnostic: React attaches to DOM", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => pageErrors.push(String(err)));

  await page.goto(DEV_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  // 1. Check React internal props on the header WhatsApp CTA link
  const reactProps = await page.evaluate(() => {
    const link = document.querySelector('a[data-whatsapp-cta="true"]');
    if (!link) return "NO_WHATSAPP_CTA_FOUND";
    const keys = Object.keys(link);
    const reactKeys = keys.filter((k) => k.startsWith("__react"));
    return reactKeys.length > 0 ? reactKeys : "NO_REACT_PROPS";
  });
  console.log("React props on WhatsApp CTA:", JSON.stringify(reactProps));

  // 2. Click the header CTA and check it opens a wa.me popup
  const headerCta = page.locator('a[data-whatsapp-cta="true"][data-cta-location="header"]');
  await headerCta.scrollIntoViewIfNeeded();
  const headerHref = await headerCta.getAttribute("href");
  expect(headerHref).toMatch(/^https:\/\/wa\.me\//);
  const popupPromise = page.waitForEvent("popup");
  await headerCta.click();
  const popup = await popupPromise;
  const popupUrl = popup.url();
  console.log("Popup URL after CTA click:", popupUrl);
  await popup.close();

  // 3. Check FAQ accordion
  const faqTrigger = page.locator("#trigger-faq_01");
  await faqTrigger.scrollIntoViewIfNeeded();
  const beforeClick = await faqTrigger.getAttribute("aria-expanded");
  await faqTrigger.click();
  const afterClick = await faqTrigger.getAttribute("aria-expanded");
  console.log("FAQ aria-expanded before:", beforeClick, "after:", afterClick);

  // 4. Open portfolio
  const desktopGrid = page.locator(".hidden.md\\:grid");
  const card = desktopGrid.locator('[aria-label="Ver projeto Mecânica Auto Brum por dentro"]');
  await card.scrollIntoViewIfNeeded();
  await card.click();
  await page.waitForTimeout(1000);
  const portfolioDialog = await page.locator("dialog[open]").count();
  console.log("Portfolio dialog open:", portfolioDialog);
  if (portfolioDialog > 0) {
    await page.keyboard.press("Escape");
  }

  // Report
  console.log("\n--- DEV HYDRATION DIAGNOSIS ---");
  console.log("Console errors:", consoleErrors.filter((e) => !e.includes("WebSocket") && !e.includes("404")));
  console.log("Page errors:", pageErrors.filter((e) => !e.includes("WebSocket")));
  console.log("React hydrated:", reactProps !== "NO_REACT_PROPS" ? "YES" : "NO");
  console.log("CTA opens WhatsApp popup:", /wa\.me|api\.whatsapp\.com/.test(popupUrl) ? "YES" : "NO");
  console.log("FAQ works:", afterClick === "true" ? "YES" : "NO");
  console.log("Portfolio works:", portfolioDialog > 0 ? "YES" : "NO");

  // The page should be interactive
  expect(reactProps).not.toBe("NO_REACT_PROPS");
  expect(popupUrl).toMatch(/wa\.me|api\.whatsapp\.com/);
  expect(afterClick).toBe("true");
  expect(portfolioDialog).toBeGreaterThan(0);
});

test("DEV hydration: no React error overlays or error boundaries", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(String(err)));

  await page.goto(DEV_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Check for Next.js error overlay
  const errorOverlay = await page.locator("#nextjs-error-overlay, nextjs-portal").count();
  console.log("Error overlay present:", errorOverlay);

  // Check for React error boundary messages
  const bodyText = await page.textContent("body");
  const hasErrorBoundary = bodyText?.includes("Something went wrong") || bodyText?.includes("Error:");
  console.log("Error boundary text:", hasErrorBoundary);

  const filteredErrors = errors.filter(
    (e) => !e.includes("WebSocket") && !e.includes("HMR")
  );
  console.log("Page errors (excl. WebSocket):", filteredErrors);

  expect(errorOverlay).toBe(0);
  expect(hasErrorBoundary).toBeFalsy();
  expect(filteredErrors).toHaveLength(0);
});
