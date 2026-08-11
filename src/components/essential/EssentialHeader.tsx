"use client";

import { BRAND_NAME } from "@/lib/constants";
import { ESSENTIAL_HEADER_CTA_TEXT, ESSENTIAL_ROUTE } from "@/lib/essential";
import { EssentialWhatsAppCta } from "./EssentialWhatsAppCta";

export function EssentialHeader() {
  return (
    <header className="w-full bg-[var(--surface)] border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-2">
        <a
          href={ESSENTIAL_ROUTE}
          className="text-sm md:text-lg font-semibold text-[var(--text-primary)] whitespace-nowrap"
        >
          {BRAND_NAME}
        </a>
        <EssentialWhatsAppCta
          location="header"
          ctaText={ESSENTIAL_HEADER_CTA_TEXT}
          className="h-9 md:h-10 px-3 md:px-5 text-[11px] md:text-sm font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors whitespace-nowrap inline-flex items-center"
        />
      </div>
    </header>
  );
}
