"use client";

import { trackCtaClick } from "@/lib/tracking";
import { OWNER_NAME } from "@/lib/constants";
import type { CtaLocation } from "@/types";

interface AboutSectionProps {
  onCtaClick: (location: CtaLocation) => void;
}

export function AboutSection({ onCtaClick }: AboutSectionProps) {
  const indicators = [
    { label: "Mais de 5 anos", detail: "Trabalhando com Google Ads e negócios locais." },
    { label: "Cerca de R$ 40 mil", detail: "Investidos em minhas próprias campanhas." },
    { label: "Mais de 7 mil clientes", detail: "Atendidos a partir de contatos conquistados pelo Google." },
    { label: "Execução direta", detail: "Seu projeto não é repassado para uma equipe desconhecida." },
  ];

  return (
    <section className="bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">Quem desenvolve seu projeto</span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            Seu projeto é conduzido diretamente por mim
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Sou {OWNER_NAME}. Minha experiência com tráfego pago não começou dentro de uma agência, mas anunciando o meu próprio trabalho como prestador de serviço.
          </p>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Há mais de cinco anos, uso o Google Ads para conquistar clientes, testar páginas, acompanhar contatos e entender o que acontece depois que uma pessoa clica no anúncio.
          </p>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Ao longo desse período, investi cerca de R$ 40 mil em minhas próprias campanhas e atendi mais de 7 mil clientes que chegaram por meio do Google.
          </p>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Essa experiência prática orienta a forma como desenvolvo cada Landing Page: mensagem clara, boa experiência no celular, contato fácil e rastreamento das ações importantes.
          </p>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Na Anúncio &amp; Site, eu acompanho diretamente a estratégia, a copy, o design, o desenvolvimento e a publicação do seu projeto.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {indicators.map((ind) => (
            <div key={ind.label} className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-6 space-y-2">
              <p className="text-lg font-bold text-[var(--text-primary)]">{ind.label}</p>
              <p className="text-sm text-[var(--text-secondary)]">{ind.detail}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            trackCtaClick("about", "Quero desenvolver minha página com Willian", "about_primary");
            onCtaClick("about");
          }}
          className="h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors"
        >
          Quero desenvolver minha página com Willian
        </button>
      </div>
    </section>
  );
}
