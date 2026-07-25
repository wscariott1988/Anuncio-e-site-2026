export function SolutionSection() {
  const steps = [
    { num: "1", title: "Anúncio", text: "A pessoa encontra sua oferta no Google ou nas redes sociais." },
    { num: "2", title: "Continuidade", text: "A Landing Page apresenta a mesma mensagem que despertou o interesse." },
    { num: "3", title: "Decisão", text: "Benefícios, diferenciais, informações e respostas ajudam o visitante a avaliar a oferta." },
    { num: "4", title: "Contato", text: "Um formulário objetivo reúne as informações necessárias e orienta o próximo passo." },
  ];

  return (
    <section className="bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">Uma jornada mais clara</span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            Sua oferta organizada em um caminho direto até o contato
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Eu desenvolvo uma página específica para o serviço que você deseja anunciar. A mensagem do anúncio continua na Landing Page, as informações aparecem na ordem certa e o visitante encontra um próximo passo claro.
          </p>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Em vez de distribuir a atenção entre diferentes páginas, menus e serviços, a Landing Page concentra a experiência em uma oferta e em uma ação principal.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[var(--brand)] text-white flex items-center justify-center text-sm font-bold">
                {s.num}
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">{s.title}</h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-[700px]">
          Cada seção possui uma função: apresentar, esclarecer, reduzir dúvidas e orientar a ação.
        </p>
      </div>
    </section>
  );
}
