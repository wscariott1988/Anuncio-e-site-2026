export function IncludedSection() {
  const items = [
    {
      title: "Estratégia e copy",
      text: "Organizo sua oferta, o público, os argumentos e os textos da página.",
    },
    {
      title: "Design responsivo",
      text: "Crio uma interface própria, com prioridade para a experiência no celular.",
    },
    {
      title: "Desenvolvimento em Next.js",
      text: "Desenvolvo uma página rápida, acessível e adaptada para diferentes telas.",
    },
    {
      title: "Formulário e WhatsApp",
      text: "O interessado envia as informações e pode continuar a conversa pelo WhatsApp.",
    },
    {
      title: "Configuração de rastreamento",
      text: "Configuro os eventos previstos quando as contas e os acessos necessários forem fornecidos.",
    },
    {
      title: "Publicação e testes",
      text: "Após sua aprovação, publico e testo a página no celular e no desktop.",
    },
  ];

  return (
    <section className="bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">
            Projeto completo
          </span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            Tudo o que sua Landing Page precisa para entrar no ar
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Eu cuido da estratégia, da criação e da parte técnica em um único
            projeto.
          </p>
        </div>

        {/* Mobile: compact panel */}
        <div className="md:hidden bg-[var(--surface)] rounded-2xl border border-[var(--border)] divide-y divide-[var(--border)]">
          {items.map((item) => (
            <div key={item.title} className="px-5 py-4 space-y-1">
              <h3 className="text-[15px] font-semibold text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop / tablet: uniform grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 space-y-3"
            >
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <p className="text-base text-[var(--text-secondary)] leading-relaxed">
          O projeto inclui até 2 rodadas de ajustes dentro do escopo aprovado.
        </p>
      </div>
    </section>
  );
}
