"use client";

import { getWhatsappCtaUrl } from "@/lib/whatsapp";
import { trackEssentialCtaClick, trackEssentialWhatsappClick } from "@/lib/tracking";
import { ESSENTIAL_WHATSAPP_MESSAGE } from "@/lib/essential";
import type { CtaLocation } from "@/types";

interface EssentialWhatsAppCtaProps {
  location: CtaLocation;
  ctaText: string;
  className?: string;
}

export function EssentialWhatsAppCta({ location, ctaText, className }: EssentialWhatsAppCtaProps) {
  const href = getWhatsappCtaUrl(ESSENTIAL_WHATSAPP_MESSAGE);

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
        trackEssentialCtaClick(location, ctaText);
        trackEssentialWhatsappClick(location);
      }}
      className={className}
    >
      {ctaText}
    </a>
  );
}
