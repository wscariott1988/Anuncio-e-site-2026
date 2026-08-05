"use client";

import { PRICE, PRICE_INSTALLMENT, DEADLINE, ROUNDS } from "@/lib/constants";
import { WhatsAppCta } from "./WhatsAppCta";

export function PricingSection() {
  const highlights = [
    { label: "Preço total", value: PRICE },
    { label: "Entrada para iniciar", value: PRICE_INSTALLMENT },
    { label: "Saldo após a publicação", value: PRICE_INSTALLMENT },
    { label: "Prazo", value: DEADLINE },
    { label: "Ajustes", value: ROUNDS },
  ];

  return (
    <section className="bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">Investimento</span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            Sua Landing Page completa por <span className="whitespace-nowrap">{PRICE}</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Projeto completo, adaptado à sua oferta e preparado para campanhas de Google Ads ou Meta Ads.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-8 space-y-4">
            <p className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              {PRICE}
            </p>
            <dl className="space-y-3">
              {highlights.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-3 last:border-b-0 last:pb-0">
                  <dt className="text-sm text-[var(--text-secondary)]">{item.label}</dt>
                  <dd className="text-[15px] font-semibold text-[var(--text-primary)] text-right">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <WhatsAppCta
                location="investment"
                ctaId="investment_primary"
                ctaText={`Quero minha Landing Page por ${PRICE}`}
                className="h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors inline-flex items-center"
              />
              <p className="text-sm text-[var(--text-secondary)]">
                Você fala diretamente comigo pelo WhatsApp. O briefing completo
                vem depois da contratação.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
