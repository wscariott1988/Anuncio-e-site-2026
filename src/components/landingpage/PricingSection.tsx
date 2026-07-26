"use client";

import { trackCtaClick } from "@/lib/tracking";
import { PRICE, PRICE_INSTALLMENT, DEADLINE, ROUNDS } from "@/lib/constants";
import type { CtaLocation } from "@/types";

interface PricingSectionProps {
  onCtaClick: (location: CtaLocation) => void;
}

export function PricingSection({ onCtaClick }: PricingSectionProps) {
  const included = [
    "Estratégia e copy",
    "Design responsivo",
    "Desenvolvimento em Next.js",
    "Formulário com continuidade pelo WhatsApp",
    "Configuração de rastreamento",
    "Publicação e testes",
    ROUNDS,
  ];

  const excluded = [
    "Gestão de Google Ads ou Meta Ads",
    "Produção de fotos, vídeos ou identidade visual completa",
    "Páginas, automações ou integrações adicionais",
    "Manutenção mensal e testes A/B contínuos",
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

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-8 space-y-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Incluído no projeto</h3>
            <ul className="space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-[var(--text-secondary)]">
                  <svg className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-8 space-y-4">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Forma de pagamento</h3>
              <p className="text-base font-semibold text-[var(--text-primary)]">
                50% na contratação e 50% após a Landing Page ser publicada e estar funcionando.
              </p>
              <div className="space-y-1 text-[15px] text-[var(--text-secondary)]">
                <p>Entrada: {PRICE_INSTALLMENT}</p>
                <p>Saldo após a publicação: {PRICE_INSTALLMENT}</p>
              </div>
              <div className="space-y-1 text-[15px] text-[var(--text-secondary)]">
                <p>Prazo: {DEADLINE}</p>
                <p>Ajustes: {ROUNDS}</p>
              </div>
            </div>

            <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-8 space-y-4">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">O projeto padrão não inclui</h3>
              <ul className="space-y-2">
                {excluded.map((item) => (
                  <li key={item} className="text-[14px] text-[var(--text-secondary)]">• {item}</li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Domínio, hospedagem e ferramentas de terceiros não estão incluídos automaticamente. Quando necessários, os custos e as responsabilidades são informados antes da contratação.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <button
              onClick={() => {
                trackCtaClick("pricing", "Quero minha Landing Page", "pricing_primary");
                onCtaClick("pricing");
              }}
              className="h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors"
            >
              Quero minha Landing Page
            </button>
            <p className="text-sm text-[var(--text-secondary)]">
              Preencha o formulário para eu avaliar sua necessidade e confirmar o escopo.
            </p>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
            A Landing Page organiza a experiência depois do clique, mas não garante vendas, leads ou desempenho da campanha.
          </p>
        </div>
      </div>
    </section>
  );
}
