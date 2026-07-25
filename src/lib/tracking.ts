import { FORM_ID, EVENT_VERSION } from "./constants";
import type { CtaLocation, FormStepName } from "@/types";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function push(data: Record<string, string | number | undefined>) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  } catch {
    // silently fail
  }
}

export function trackCtaClick(ctaLocation: CtaLocation, ctaText: string, ctaId: string) {
  push({
    event: "cta_click",
    cta_id: ctaId,
    cta_location: ctaLocation,
    cta_text: ctaText,
    form_id: FORM_ID,
    event_version: EVENT_VERSION,
  });
}

export function trackFormOpen(ctaLocation: CtaLocation) {
  push({
    event: "form_open",
    form_id: FORM_ID,
    source_cta: ctaLocation,
    event_version: EVENT_VERSION,
  });
}

export function trackFormStart(ctaLocation: CtaLocation) {
  push({
    event: "form_start",
    form_id: FORM_ID,
    source_cta: ctaLocation,
    event_version: EVENT_VERSION,
  });
}

export function trackFormStep(stepNumber: number, stepName: FormStepName, ctaLocation: CtaLocation) {
  push({
    event: "form_step",
    form_id: FORM_ID,
    step_number: stepNumber,
    step_name: stepName,
    source_cta: ctaLocation,
    event_version: EVENT_VERSION,
  });
}

export function trackFormSubmitAttempt(ctaLocation: CtaLocation) {
  push({
    event: "form_submit_attempt",
    form_id: FORM_ID,
    source_cta: ctaLocation,
    event_version: EVENT_VERSION,
  });
}

export function trackFormError(errorType: string, stepName: string, errorCount: number) {
  push({
    event: "form_error",
    form_id: FORM_ID,
    error_type: errorType,
    step_name: stepName,
    error_count: errorCount,
    event_version: EVENT_VERSION,
  });
}

export function trackGenerateLead(leadId: string, leadSource: string, ctaLocation: CtaLocation) {
  push({
    event: "generate_lead",
    form_id: FORM_ID,
    lead_source: leadSource,
    source_cta: ctaLocation,
    event_version: EVENT_VERSION,
  });
  void leadId;
}

export function trackWhatsappAfterLead(leadId: string, ctaLocation: CtaLocation) {
  push({
    event: "whatsapp_after_lead",
    form_id: FORM_ID,
    source_cta: ctaLocation,
    event_version: EVENT_VERSION,
  });
  void leadId;
}

export function trackWhatsappFormError(errorType: string) {
  push({
    event: "whatsapp_form_error",
    form_id: FORM_ID,
    error_type: errorType,
    event_version: EVENT_VERSION,
  });
}

export function trackPortfolioOpen(projectId: string) {
  push({
    event: "portfolio_open",
    project_id: projectId,
    initial_view: "mobile",
    event_version: EVENT_VERSION,
  });
}

export function trackPortfolioViewChange(projectId: string, selectedView: string) {
  push({
    event: "portfolio_view_change",
    project_id: projectId,
    selected_view: selectedView,
    event_version: EVENT_VERSION,
  });
}

export function trackFaqOpen(faqId: string) {
  push({
    event: "faq_open",
    faq_id: faqId,
    event_version: EVENT_VERSION,
  });
}
