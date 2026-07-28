import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const MAX_BODY_SIZE = 16 * 1024;

const ALLOWED_SITUACAO = [
  "Já anuncio no Google Ads",
  "Já anuncio no Meta Ads",
  "Já anuncio nos dois",
  "Ainda não anuncio, mas pretendo começar",
] as const;

const ALLOWED_POSSUI_SITE = ["Sim", "Não"] as const;

const ALLOWED_SOURCE_CTA = [
  "header",
  "hero",
  "included",
  "portfolio",
  "about",
  "pricing",
  "final",
] as const;

interface LeadPayload {
  nome?: unknown;
  whatsapp?: unknown;
  negocioServico?: unknown;
  situacaoAnuncios?: unknown;
  possuiSite?: unknown;
  urlAtual?: unknown;
  consentimento?: unknown;
  sourceCta?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmTerm?: unknown;
  utmContent?: unknown;
  gclid?: unknown;
  gbraid?: unknown;
  wbraid?: unknown;
  fbclid?: unknown;
  entryPath?: unknown;
  referrerHostname?: unknown;
  honeypot?: unknown;
}

function normalizeSpaces(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11) return digits;
  return `+55${digits}`;
}

function isValidBrazilianPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11) return false;
  const ddd = parseInt(digits.slice(0, 2), 10);
  if (ddd < 11 || ddd > 99) return false;
  const firstNine = digits[2];
  if (firstNine !== "9") return false;
  return true;
}

function isValidUrl(value: string): boolean {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function sanitizeString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const normalized = normalizeSpaces(value);
  if (normalized.length === 0 || normalized.length > maxLength) return null;
  if (/^[=\+\-\@\r\n\t]/.test(normalized)) return null;
  return normalized;
}

function sanitizeOptionalString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  const normalized = normalizeSpaces(value);
  if (normalized.length === 0) return "";
  if (normalized.length > maxLength) return "";
  if (/^[=\+\-\@\r\n\t]/.test(normalized)) return "";
  return normalized;
}

function normalizeLeadSource(
  gclid: string,
  gbraid: string,
  wbraid: string,
  fbclid: string,
  utmSource: string,
  referrerHostname: string
): string {
  if (gclid || gbraid || wbraid || utmSource.toLowerCase() === "google") return "google";
  if (fbclid) return "meta";
  if (referrerHostname) return "referral";
  return "direct";
}

function normalizeUtm(value: unknown): string {
  if (typeof value !== "string") return "";
  const sanitized = normalizeSpaces(value);
  if (sanitized.length === 0 || sanitized.length > 200) return "";
  return sanitized;
}

function normalizeClid(value: unknown): string {
  if (typeof value !== "string") return "";
  const sanitized = value.replace(/[^a-zA-Z0-9_-]/g, "");
  if (sanitized.length === 0 || sanitized.length > 200) return "";
  return sanitized;
}

function normalizeEntryPath(value: unknown): string {
  if (typeof value !== "string") return "/landingpage";
  const sanitized = value.replace(/[^a-zA-Z0-9/_-]/g, "");
  if (sanitized.length === 0 || sanitized.length > 200) return "/landingpage";
  return sanitized;
}

function normalizeReferrerHostname(value: unknown): string {
  if (typeof value !== "string") return "";
  const sanitized = value.replace(/[^a-zA-Z0-9._-]/g, "");
  if (sanitized.length === 0 || sanitized.length > 200) return "";
  return sanitized;
}

function logEvent(stage: string, data: Record<string, unknown>) {
  console.log(JSON.stringify({ timestamp: new Date().toISOString(), stage, ...data }));
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return NextResponse.json(
      { ok: false, status: "error", code: "INVALID_CONTENT_TYPE" },
      { status: 400 }
    );
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json(
      { ok: false, status: "error", code: "INVALID_JSON" },
      { status: 400 }
    );
  }

  if (rawBody.length > MAX_BODY_SIZE) {
    return NextResponse.json(
      { ok: false, status: "error", code: "PAYLOAD_TOO_LARGE" },
      { status: 413 }
    );
  }

  let body: LeadPayload;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { ok: false, status: "error", code: "INVALID_JSON" },
      { status: 400 }
    );
  }

  if (body.honeypot) {
    return NextResponse.json({ ok: true, status: "created", lead_id: "honeypot" });
  }

  const nome = sanitizeString(body.nome, 200);
  if (!nome) {
    return NextResponse.json(
      { ok: false, status: "error", code: "INVALID_NOME" },
      { status: 422 }
    );
  }

  const rawWhatsapp = typeof body.whatsapp === "string" ? body.whatsapp : "";
  if (!isValidBrazilianPhone(rawWhatsapp)) {
    return NextResponse.json(
      { ok: false, status: "error", code: "INVALID_WHATSAPP" },
      { status: 422 }
    );
  }
  const whatsapp = normalizePhone(rawWhatsapp);

  const negocioServico = sanitizeString(body.negocioServico, 500);
  if (!negocioServico) {
    return NextResponse.json(
      { ok: false, status: "error", code: "INVALID_NEGOCIO" },
      { status: 422 }
    );
  }

  const situacaoAnuncios = typeof body.situacaoAnuncios === "string" ? body.situacaoAnuncios : "";
  if (!(ALLOWED_SITUACAO as readonly string[]).includes(situacaoAnuncios)) {
    return NextResponse.json(
      { ok: false, status: "error", code: "INVALID_SITUACAO" },
      { status: 422 }
    );
  }

  const possuiSite = typeof body.possuiSite === "string" ? body.possuiSite : "";
  if (!(ALLOWED_POSSUI_SITE as readonly string[]).includes(possuiSite)) {
    return NextResponse.json(
      { ok: false, status: "error", code: "INVALID_POSSUI_SITE" },
      { status: 422 }
    );
  }

  const urlAtual = sanitizeOptionalString(body.urlAtual, 2000);
  if (possuiSite === "Sim" && urlAtual && !isValidUrl(urlAtual)) {
    return NextResponse.json(
      { ok: false, status: "error", code: "INVALID_URL" },
      { status: 422 }
    );
  }

  if (body.consentimento !== true) {
    return NextResponse.json(
      { ok: false, status: "error", code: "CONSENT_REQUIRED" },
      { status: 422 }
    );
  }

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_WEB_APP_URL;
  const appsScriptSecret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

  if (!appsScriptUrl || !appsScriptSecret) {
    logEvent("pending_integration", { duration: Date.now() - startTime });
    return NextResponse.json(
      { ok: false, status: "error", code: "PENDING_INTEGRATION" },
      { status: 503 }
    );
  }

  const leadId = crypto.randomUUID();
  const leadIdShort = leadId.slice(0, 8);
  const now = new Date().toISOString();

  const sourceCta = typeof body.sourceCta === "string" && (ALLOWED_SOURCE_CTA as readonly string[]).includes(body.sourceCta)
    ? body.sourceCta
    : "unknown";

  const gclid = normalizeClid(body.gclid);
  const gbraid = normalizeClid(body.gbraid);
  const wbraid = normalizeClid(body.wbraid);
  const fbclid = normalizeClid(body.fbclid);
  const utmSource = normalizeUtm(body.utmSource);
  const utmMedium = normalizeUtm(body.utmMedium);
  const utmCampaign = normalizeUtm(body.utmCampaign);
  const utmTerm = normalizeUtm(body.utmTerm);
  const utmContent = normalizeUtm(body.utmContent);
  const entryPath = normalizeEntryPath(body.entryPath);
  const referrerHostname = normalizeReferrerHostname(body.referrerHostname);

  const leadSource = normalizeLeadSource(gclid, gbraid, wbraid, fbclid, utmSource, referrerHostname);

  const sheetPayload = {
    created_at: now,
    lead_id: leadId,
    nome,
    whatsapp,
    negocio_servico: negocioServico,
    situacao_anuncios: situacaoAnuncios,
    possui_site_landingpage: possuiSite,
    url_atual: urlAtual,
    consentimento_em: now,
    lead_source: leadSource,
    source_cta: sourceCta,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    utm_term: utmTerm,
    utm_content: utmContent,
    gclid,
    gbraid,
    wbraid,
    fbclid,
    entry_path: entryPath,
    referrer_hostname: referrerHostname,
    status_atendimento: "Novo",
    observacoes: "",
  };

  logEvent("sending_to_apps_script", { lead_id: leadIdShort, duration: Date.now() - startTime });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const appsScriptResponse = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ ...sheetPayload, secret: appsScriptSecret }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const appsScriptText = await appsScriptResponse.text();
    let appsScriptResult: { ok?: boolean; status?: string; lead_id?: string; code?: string };
    try {
      appsScriptResult = JSON.parse(appsScriptText);
    } catch {
      logEvent("apps_script_invalid_response", { lead_id: leadIdShort, duration: Date.now() - startTime, httpStatus: appsScriptResponse.status });
      return NextResponse.json(
        { ok: false, status: "error", code: "APPS_SCRIPT_INVALID_RESPONSE" },
        { status: 502 }
      );
    }

    if (appsScriptResult.ok && (appsScriptResult.status === "created" || appsScriptResult.status === "duplicate")) {
      logEvent("apps_script_success", { lead_id: leadIdShort, status: appsScriptResult.status, duration: Date.now() - startTime });
      return NextResponse.json(
        { ok: true, status: appsScriptResult.status, lead_id: leadId },
        { status: appsScriptResult.status === "created" ? 201 : 200 }
      );
    }

    const errorCode = appsScriptResult.code || "APPS_SCRIPT_ERROR";
    logEvent("apps_script_error_response", { lead_id: leadIdShort, code: errorCode, duration: Date.now() - startTime, httpStatus: appsScriptResponse.status });
    return NextResponse.json(
      { ok: false, status: "error", code: errorCode },
      { status: 502 }
    );
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      logEvent("apps_script_timeout", { lead_id: leadIdShort, duration: Date.now() - startTime });
      return NextResponse.json(
        { ok: false, status: "error", code: "TIMEOUT" },
        { status: 504 }
      );
    }

    logEvent("apps_script_retry", { lead_id: leadIdShort, duration: Date.now() - startTime });

    const retryController = new AbortController();
    const retryTimeoutId = setTimeout(() => retryController.abort(), 30000);

    try {
      const retryResponse = await fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ ...sheetPayload, secret: appsScriptSecret }),
        signal: retryController.signal,
      });

      clearTimeout(retryTimeoutId);

      const retryText = await retryResponse.text();
      let retryResult: { ok?: boolean; status?: string; lead_id?: string; code?: string };
      try {
        retryResult = JSON.parse(retryText);
      } catch {
        logEvent("retry_invalid_response", { lead_id: leadIdShort, duration: Date.now() - startTime, httpStatus: retryResponse.status });
        return NextResponse.json(
          { ok: false, status: "error", code: "APPS_SCRIPT_INVALID_RESPONSE" },
          { status: 502 }
        );
      }

      if (retryResult.ok && (retryResult.status === "created" || retryResult.status === "duplicate")) {
        logEvent("retry_success", { lead_id: leadIdShort, status: retryResult.status, duration: Date.now() - startTime });
        return NextResponse.json(
          { ok: true, status: retryResult.status, lead_id: leadId },
          { status: retryResult.status === "created" ? 201 : 200 }
        );
      }

      const retryCode = retryResult.code || "APPS_SCRIPT_ERROR";
      logEvent("retry_error_response", { lead_id: leadIdShort, code: retryCode, duration: Date.now() - startTime, httpStatus: retryResponse.status });
      return NextResponse.json(
        { ok: false, status: "error", code: retryCode },
        { status: 502 }
      );
    } catch {
      clearTimeout(retryTimeoutId);
      logEvent("retry_network_error", { lead_id: leadIdShort, duration: Date.now() - startTime });
      return NextResponse.json(
        { ok: false, status: "error", code: "NETWORK_ERROR" },
        { status: 502 }
      );
    }
  }
}
