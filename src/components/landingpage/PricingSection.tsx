"use client";

import { trackCtaClick } from "@/lib/tracking";
import { PRICE, PRICE_INSTALLMENT, DEADLINE, ROUNDS } from "@/lib/constants";
import type { CtaLocation } from "@/types";

interface PricingSectionProps {
  onCtaClick: (location: CtaLocation) => void;
}

export function PricingSection({ onCtaClick }: PricingSectionProps) {
  const included = [
    "Estratégia e organização da página",
    "Copy completa",
    "Design responsivo",
    "Desenvolvimento em Next.js",
    "Formulário com continuidade pelo WhatsApp",
    "Configuração de rastreamento",
    "Publicação e testes",
    ROUNDS,
  ];

  const excluded = [
    "Gestão de Google Ads ou Meta Ads",
    "Produção de fotos e vídeos",
    "Criação de identidade visual completa",
    "Páginas adicionais",
    "Manutenção mensal",
    "Testes A/B contínuos",
    "Automações ou integrações não previstas",
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
            Esse é o valor do projeto padrão para desenvolver uma Landing Page completa, adaptada à sua oferta e preparada para receber campanhas de Google Ads ou Meta Ads.
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
              Domínio, hospedagem e ferramentas de terceiros não estão incluídos automaticamente no valor de <span className="whitespace-nowrap">{PRICE}</span>. Quando forem necessários, os custos, as contas utilizadas e as responsabilidades serão informados antes da contratação.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <button
              onClick={() => {
                trackCtaClick("pricing", "Quero solicitar meu projeto", "pricing_primary");
                onCtaClick("pricing");
              }}
              className="h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors"
            >
              Quero solicitar meu projeto
            </button>
            <p className="text-sm text-[var(--text-secondary)]">
              Preencha o formulário para eu conhecer sua necessidade e confirmar se ela se encaixa no escopo de <span className="whitespace-nowrap">{PRICE}</span>.
            </p>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
            A Landing Page organiza a experiência depois do clique, mas não existe garantia de vendas, leads ou desempenho da campanha.
          </p>
        </div>
      </div>
    </section>
  );
}
