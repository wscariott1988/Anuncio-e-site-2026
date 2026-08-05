"use client";

import { PRICE, PRICE_INSTALLMENT } from "@/lib/constants";
import { WhatsAppCta } from "./WhatsAppCta";

export function FinalCta() {
  return (
    <section className="bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 text-center space-y-6">
        <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">
          Pronto para iniciar?
        </span>
        <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight max-w-[700px] mx-auto">
          Tenha sua Landing Page publicada e preparada para anunciar
        </h2>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-[600px] mx-auto">
          Fale diretamente comigo pelo WhatsApp para confirmar o projeto e
          receber as orientações para contratação.
        </p>
        <div className="space-y-3">
          <WhatsAppCta
            location="final"
            ctaId="final_primary"
            ctaText={`Quero minha Landing Page por ${PRICE}`}
            className="h-14 px-8 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors inline-flex items-center"
          />
          <p className="text-sm text-[var(--text-secondary)]">
            Entrada de {PRICE_INSTALLMENT} para iniciar. O briefing completo é
            enviado depois da contratação.
          </p>
        </div>
      </div>
    </section>
  );
}
