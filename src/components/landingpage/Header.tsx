"use client";

import { BRAND_NAME } from "@/lib/constants";
import { trackCtaClick } from "@/lib/tracking";
import type { CtaLocation } from "@/types";

interface HeaderProps {
  onCtaClick: (location: CtaLocation) => void;
}

export function Header({ onCtaClick }: HeaderProps) {
  return (
    <header className="w-full bg-[var(--surface)] border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-2">
        <a href="/landingpage" className="text-sm md:text-lg font-semibold text-[var(--text-primary)] whitespace-nowrap">
          {BRAND_NAME}
        </a>
        <button
          onClick={() => {
            trackCtaClick("header", "Quero minha Landing Page", "header_primary");
            onCtaClick("header");
          }}
          className="h-9 md:h-10 px-3 md:px-5 text-[11px] md:text-sm font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors whitespace-nowrap"
        >
          Quero minha Landing Page
        </button>
      </div>
    </header>
  );
}
