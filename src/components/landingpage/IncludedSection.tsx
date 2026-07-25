"use client";

import { trackCtaClick } from "@/lib/tracking";
import { PRICE } from "@/lib/constants";
import type { CtaLocation } from "@/types";

interface IncludedSectionProps {
  onCtaClick: (location: CtaLocation) => void;
}

export function IncludedSection({ onCtaClick }: IncludedSectionProps) {
  const items = [
    { title: "Estratégia e estrutura", text: "Organizo sua oferta, o público, a ação principal e a ordem das informações para construir um caminho coerente até o contato.", size: "lg" },
    { title: "Copy", text: "Produzo os textos da página a partir das informações do seu negócio, apresentando a oferta, os benefícios e as respostas para as principais dúvidas.", size: "md" },
    { title: "Design responsivo", text: "Crio uma interface própria para sua oferta, com prioridade para a experiência no celular e adaptação para tablets e computadores.", size: "md" },
    { title: "Desenvolvimento em Next.js", text: "Transformo o design em uma página funcional, com atenção à velocidade, estabilidade visual, acessibilidade e experiência de navegação.", size: "sm" },
    { title: "Formulário e continuidade pelo WhatsApp", text: "Configuro um formulário para captar e organizar as informações do interessado. Após o envio confirmado, ele poderá continuar a conversa pelo WhatsApp.", size: "sm" },
    { title: "Rastreamento", text: "Configuro os eventos previstos para acompanhar ações importantes, como envio confirmado do formulário e continuidade pelo WhatsApp.", size: "sm" },
    { title: "Publicação e testes", text: "Após sua aprovação, publico a Landing Page na infraestrutura combinada e testo o funcionamento no celular e no desktop.", size: "sm" },
    { title: "Até 2 rodadas de ajustes", text: "Você revisa as informações e reúne suas solicitações. O projeto inclui até duas rodadas de alterações dentro do escopo aprovado.", size: "sm" },
  ];

  return (
    <section className="bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">Projeto completo</span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            Do planejamento à publicação, tudo em um único projeto
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Eu cuido de cada etapa necessária para transformar as informações do seu negócio em uma Landing Page clara, responsiva e pronta para receber sua campanha.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 space-y-3 ${
                i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              } ${i >= 5 ? "lg:col-span-1" : ""}`}
            >
              <h3 className="text-base font-semibold text-[var(--text-primary)]">{item.title}</h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="text-base text-[var(--text-secondary)] leading-relaxed">
          Você me fornece as informações e os materiais do negócio. Eu organizo, desenvolvo, testo e publico a página.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => {
              trackCtaClick("included", "Quero minha Landing Page", "included_primary");
              onCtaClick("included");
            }}
            className="h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors"
          >
            Quero minha Landing Page
          </button>
          <p className="text-sm text-[var(--text-secondary)]">Projeto completo por <span className="whitespace-nowrap">{PRICE}</span>.</p>
        </div>
      </div>
    </section>
  );
}
