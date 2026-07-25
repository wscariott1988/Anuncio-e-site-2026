/**
 * Google Apps Script — Recebimento de leads (Anúncio & Site)
 *
 * Recebe POST JSON do endpoint /api/leads do Next.js,
 * valida o secret, verifica idempotência por lead_id
 * e escreve uma linha na aba Leads da planilha configurada.
 *
 * Propriedades obrigatórias em Script Properties:
 *   SHARED_SECRET   — secret compartilhado com o servidor Next.js
 *   SPREADSHEET_ID  — ID da planilha Google Sheets
 *   SHEET_NAME      — nome da aba (padrão: "Leads")
 */

var EXPECTED_HEADERS = [
  "created_at",
  "lead_id",
  "nome",
  "whatsapp",
  "negocio_servico",
  "situacao_anuncios",
  "possui_site_landingpage",
  "url_atual",
  "consentimento_em",
  "lead_source",
  "source_cta",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "entry_path",
  "referrer_hostname",
  "status_atendimento",
  "observacoes",
];

function doPost(e) {
  var lock = null;
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, status: "error", code: "MISSING_BODY" });
    }

    var props = PropertiesService.getScriptProperties();
    var sharedSecret = props.getProperty("SHARED_SECRET");
    var spreadsheetId = props.getProperty("SPREADSHEET_ID");
    var sheetName = props.getProperty("SHEET_NAME") || "Leads";

    if (!sharedSecret || !spreadsheetId) {
      return jsonResponse({ ok: false, status: "error", code: "SERVER_MISCONFIGURED" });
    }

    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (err) {
      return jsonResponse({ ok: false, status: "error", code: "INVALID_JSON" });
    }

    if (!payload || typeof payload !== "object") {
      return jsonResponse({ ok: false, status: "error", code: "INVALID_PAYLOAD" });
    }

    var receivedSecret = payload.secret;
    delete payload.secret;

    if (!receivedSecret || receivedSecret !== sharedSecret) {
      return jsonResponse({ ok: false, status: "error", code: "UNAUTHORIZED" });
    }

    var leadId = payload.lead_id;
    if (!leadId || typeof leadId !== "string") {
      return jsonResponse({ ok: false, status: "error", code: "MISSING_LEAD_ID" });
    }

    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      return jsonResponse({ ok: false, status: "error", code: "SHEET_NOT_FOUND" });
    }

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (!validateHeaders(headers)) {
      return jsonResponse({ ok: false, status: "error", code: "INVALID_HEADERS" });
    }

    lock = LockService.getScriptLock();
    lock.waitLock(20000);

    var existingRow = findLeadById(sheet, headers, leadId);
    if (existingRow > 0) {
      SpreadsheetApp.flush();
      return jsonResponse({ ok: true, status: "duplicate", lead_id: leadId });
    }

    var row = buildRow(payload, headers);
    sheet.appendRow(row);
    SpreadsheetApp.flush();

    return jsonResponse({ ok: true, status: "created", lead_id: leadId });
  } catch (err) {
    return jsonResponse({ ok: false, status: "error", code: "INTERNAL_ERROR" });
  } finally {
    if (lock) {
      try { lock.releaseLock(); } catch (e) { /* ignore */ }
    }
  }
}

function validateHeaders(actual) {
  if (!actual || actual.length !== EXPECTED_HEADERS.length) return false;
  for (var i = 0; i < EXPECTED_HEADERS.length; i++) {
    if (actual[i] !== EXPECTED_HEADERS[i]) return false;
  }
  return true;
}

function findLeadById(sheet, headers, leadId) {
  var leadIdIndex = headers.indexOf("lead_id");
  if (leadIdIndex < 0) return -1;

  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return -1;

  var leadIdCol = leadIdIndex + 1;
  var values = sheet.getRange(2, leadIdCol, lastRow - 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] === leadId) {
      return i + 2;
    }
  }
  return -1;
}

function buildRow(payload, headers) {
  var row = [];
  for (var i = 0; i < headers.length; i++) {
    var key = headers[i];
    if (key === "status_atendimento") {
      row.push("novo");
    } else if (key === "observacoes") {
      row.push("");
    } else if (payload.hasOwnProperty(key)) {
      row.push(payload[key]);
    } else {
      row.push("");
    }
  }
  return row;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
