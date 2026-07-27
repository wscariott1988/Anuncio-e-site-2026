import { OWNER_NAME } from "@/lib/constants";

export function AboutSection() {
  const indicators = [
    { label: "Mais de 5 anos", detail: "Trabalhando com Google Ads e negócios locais." },
    { label: "Cerca de R$ 40 mil", detail: "Investidos em minhas próprias campanhas." },
    { label: "Mais de 7 mil clientes", detail: "Atendidos a partir de contatos conquistados pelo Google." },
    { label: "Execução direta", detail: "Estratégia, copy, design e desenvolvimento conduzidos por mim." },
  ];

  return (
    <section className="bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 xl:gap-16 lg:items-start space-y-12 lg:space-y-0">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">
            Execução direta
          </span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            Seu projeto é desenvolvido diretamente por mim
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Sou {OWNER_NAME}. Há mais de cinco anos uso o Google Ads para
            anunciar meu próprio trabalho, testar páginas e acompanhar o que
            acontece depois do clique.
          </p>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Essa experiência prática orienta cada projeto da Anúncio &amp; Site:
            mensagem clara, boa experiência no celular, contato simples e
            rastreamento das ações importantes.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {indicators.map((ind) => (
            <div key={ind.label} className="bg-[var(--background)] rounded-2xl border border-[var(--border)] p-4 sm:p-5 md:p-6 space-y-1 sm:space-y-2">
              <p className="text-base sm:text-lg font-bold text-[var(--text-primary)]">{ind.label}</p>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">{ind.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
