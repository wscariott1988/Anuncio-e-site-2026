export function ProblemSection() {
  const points = [
    {
      title: "Mensagem alinhada",
      text: "O visitante encontra a mesma oferta que despertou seu interesse no anúncio.",
    },
    {
      title: "Foco em uma ação",
      text: "Sem menus e caminhos concorrentes, a atenção permanece no próximo passo.",
    },
    {
      title: "Contato e medição",
      text: "O formulário organiza os dados do interessado e os eventos mostram as ações importantes.",
    },
  ];

  return (
    <section className="bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">
            Depois do clique
          </span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            O anúncio traz o visitante. A Landing Page conduz até o contato.
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Eu organizo sua oferta em uma página focada: a mensagem do anúncio
            continua, as informações aparecem na ordem certa e o visitante
            encontra uma ação principal.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {points.map((p) => (
            <div
              key={p.title}
              className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 space-y-3"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {p.title}
              </h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
