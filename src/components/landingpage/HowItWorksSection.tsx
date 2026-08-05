import { PRICE_INSTALLMENT, DEADLINE } from "@/lib/constants";

export function HowItWorksSection() {
  const steps = [
    {
      num: "1",
      title: "Contratação",
      text: `Você confirma o projeto e faz o pagamento da entrada de ${PRICE_INSTALLMENT}.`,
    },
    {
      num: "2",
      title: "Briefing simples",
      text: "Depois da contratação, envio um briefing para reunir as informações da oferta, do público, dos diferenciais e os materiais disponíveis.",
    },
    {
      num: "3",
      title: "Criação, revisão e publicação",
      text: "Eu preparo a estratégia, os textos, o design e o desenvolvimento. Você revisa, solicita os ajustes previstos e paga o saldo após a página estar publicada e funcionando.",
    },
  ];

  return (
    <section className="bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">
            Processo simples
          </span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            Da contratação à publicação em três etapas
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[var(--brand)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {s.num}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {s.title}
                </h3>
                <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 space-y-2">
          <p className="text-base font-semibold text-[var(--text-primary)]">
            Prazo de {DEADLINE}
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            A contagem começa após o recebimento do briefing completo e dos
            materiais necessários.
          </p>
        </div>
      </div>
    </section>
  );
}
