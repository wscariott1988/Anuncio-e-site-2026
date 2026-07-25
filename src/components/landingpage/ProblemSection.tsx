export function ProblemSection() {
  const points = [
    { title: "Mensagem desalinhada", text: "O visitante clica em uma oferta, mas não encontra rapidamente a mesma mensagem na página." },
    { title: "Caminhos demais", text: "Menus, links e informações concorrentes desviam a atenção da ação principal." },
    { title: "Contato com atrito", text: "Botões pouco claros, formulários confusos ou uma experiência ruim no celular dificultam o próximo passo." },
    { title: "Falta de visibilidade", text: "Sem eventos configurados, você não sabe quais ações aconteceram depois do anúncio." },
  ];

  return (
    <section className="bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">Depois do clique</span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            O anúncio leva o visitante até você. A página precisa continuar o caminho.
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Google Ads e Meta Ads podem colocar sua empresa diante de pessoas interessadas. Mas o clique, sozinho, não explica sua oferta, não responde às dúvidas e não conduz o próximo passo.
          </p>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Quando a mensagem está dispersa, existem caminhos demais ou o contato exige várias etapas, o visitante pode sair sem avançar. E, sem rastreamento, fica mais difícil entender o que aconteceu depois do anúncio.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {points.map((p) => (
            <div key={p.title} className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 space-y-3">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">{p.title}</h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-[700px]">
          Uma Landing Page organiza esse caminho em torno de uma oferta e de uma ação principal.
        </p>
      </div>
    </section>
  );
}
