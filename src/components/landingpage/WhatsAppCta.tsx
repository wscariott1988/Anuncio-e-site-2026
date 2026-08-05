"use client";

import { getWhatsappCtaUrl } from "@/lib/whatsapp";
import { trackCtaClick, trackWhatsappClick } from "@/lib/tracking";
import type { CtaLocation } from "@/types";

interface WhatsAppCtaProps {
  location: CtaLocation;
  ctaId: string;
  ctaText: string;
  className?: string;
}

export function WhatsAppCta({ location, ctaId, ctaText, className }: WhatsAppCtaProps) {
  const href = getWhatsappCtaUrl();

  if (!href) {
    return (
      <span aria-disabled="true" className={className}>
        {ctaText}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp-cta="true"
      data-cta-location={location}
      onClick={() => {
        trackCtaClick(location, ctaText, ctaId);
        trackWhatsappClick(location);
      }}
      className={className}
    >
      {ctaText}
    </a>
  );
}
