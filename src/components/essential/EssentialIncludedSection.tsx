import { ESSENTIAL_ROUNDS } from "@/lib/essential";

export function EssentialIncludedSection() {
  const items = [
    {
      title: "Estratégia e copy",
      text: "Organização da oferta, do público e dos argumentos da página.",
    },
    {
      title: "Design responsivo",
      text: "Interface própria, preparada para celular e desktop.",
    },
    {
      title: "Desenvolvimento",
      text: "Página rápida, acessível e adaptada para diferentes telas.",
    },
    {
      title: "Contato pelo WhatsApp",
      text: "Caminho direto para receber os contatos da campanha.",
    },
    {
      title: "Publicação e testes",
      text: "Publicação e testes de links e do WhatsApp no celular e no desktop.",
    },
    {
      title: "Rodada de ajustes",
      text: `${ESSENTIAL_ROUNDS} dentro do escopo aprovado.`,
    },
  ];

  return (
    <section className="bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">
            O que está incluído
          </span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            Tudo o que está incluído no projeto Essencial
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Uma página única, completa e pronta para anunciar.
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
          {`O projeto inclui ${ESSENTIAL_ROUNDS.toLowerCase()} dentro do escopo aprovado.`}
        </p>
      </div>
    </section>
  );
}
