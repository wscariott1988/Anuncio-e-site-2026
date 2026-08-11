import { FORM_ID, EVENT_VERSION } from "./constants";
import { ESSENTIAL_OFFER_VARIANT } from "./essential";
import type { CtaLocation } from "@/types";

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

export interface TrackEventOptions {
  offerVariant?: string;
  formId?: string;
}

export function trackCtaClick(
  ctaLocation: CtaLocation,
  ctaText: string,
  ctaId: string,
  options?: TrackEventOptions,
) {
  push({
    event: "cta_click",
    cta_id: ctaId,
    cta_location: ctaLocation,
    cta_text: ctaText,
    form_id: options?.formId ?? FORM_ID,
    event_version: EVENT_VERSION,
    ...(options?.offerVariant ? { offer_variant: options.offerVariant } : {}),
  });
}

export function trackWhatsappClick(ctaLocation: CtaLocation, options?: TrackEventOptions) {
  push({
    event: "whatsapp_click",
    cta_location: ctaLocation,
    form_id: options?.formId ?? FORM_ID,
    event_version: EVENT_VERSION,
    ...(options?.offerVariant ? { offer_variant: options.offerVariant } : {}),
  });
}

export function trackEssentialCtaClick(ctaLocation: CtaLocation, ctaLabel: string) {
  push({
    event: "cta_click",
    offer_variant: ESSENTIAL_OFFER_VARIANT,
    cta_location: ctaLocation,
    cta_label: ctaLabel,
  });
}

export function trackEssentialWhatsappClick(ctaLocation: CtaLocation) {
  push({
    event: "whatsapp_click",
    offer_variant: ESSENTIAL_OFFER_VARIANT,
    cta_location: ctaLocation,
    contact_method: "whatsapp",
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
