"use client";

import { trackCtaClick } from "@/lib/tracking";
import { PRICE } from "@/lib/constants";
import type { CtaLocation } from "@/types";

interface FinalCtaProps {
  onCtaClick: (location: CtaLocation) => void;
}

export function FinalCta({ onCtaClick }: FinalCtaProps) {
  return (
    <section className="bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 text-center space-y-6">
        <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">
          Conte sobre seu projeto
        </span>
        <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight max-w-[700px] mx-auto">
          Quer uma Landing Page pronta para anunciar?
        </h2>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-[600px] mx-auto">
          Responda algumas perguntas para eu avaliar sua necessidade e confirmar
          se ela se encaixa no projeto de{" "}
          <span className="whitespace-nowrap">{PRICE}</span>.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => {
              trackCtaClick("final", "Quero minha Landing Page", "final_primary");
              onCtaClick("final");
            }}
            className="h-14 px-8 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors"
          >
            Quero minha Landing Page
          </button>
          <p className="text-sm text-[var(--text-secondary)]">
            Leva cerca de 40 segundos. Após o envio, você poderá continuar pelo
            WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
