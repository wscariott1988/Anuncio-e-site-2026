export function IncludedSection() {
  const items = [
    {
      title: "Estratégia e copy",
      text: "Organização da oferta, público, argumentos e textos da página.",
    },
    {
      title: "Design responsivo",
      text: "Interface própria, preparada para celular e desktop.",
    },
    {
      title: "Desenvolvimento moderno",
      text: "Página rápida, acessível e adaptada para diferentes telas.",
    },
    {
      title: "Formulário e WhatsApp",
      text: "Canais preparados para receber e organizar contatos.",
    },
    {
      title: "Rastreamento",
      text: "Configuração dos eventos previstos quando os acessos necessários forem fornecidos.",
    },
    {
      title: "Publicação e testes",
      text: "Publicação, testes de links, formulário, WhatsApp e eventos configurados.",
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
            Tudo o que está incluído no projeto
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Eu cuido da estratégia, da criação e da parte técnica em um único
            projeto.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
