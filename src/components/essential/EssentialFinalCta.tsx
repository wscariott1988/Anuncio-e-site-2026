"use client";

import { ESSENTIAL_FINAL_CTA_TEXT } from "@/lib/essential";
import { EssentialWhatsAppCta } from "./EssentialWhatsAppCta";

export function EssentialFinalCta() {
  return (
    <section className="bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 text-center space-y-6">
        <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">
          Pronto para iniciar?
        </span>
        <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight max-w-[700px] mx-auto">
          Tenha sua Landing Page Essencial publicada e preparada para anunciar
        </h2>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-[600px] mx-auto">
          Fale diretamente comigo pelo WhatsApp para confirmar o projeto e
          receber as orientações para contratação.
        </p>
        <div className="space-y-3">
          <EssentialWhatsAppCta
            location="final"
            ctaText={ESSENTIAL_FINAL_CTA_TEXT}
            className="h-14 px-8 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors inline-flex items-center"
          />
          <p className="text-sm text-[var(--text-secondary)]">
            O briefing completo é enviado depois da confirmação do projeto.
          </p>
        </div>
      </div>
    </section>
  );
}
