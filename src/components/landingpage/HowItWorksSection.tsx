import { DEADLINE } from "@/lib/constants";

export function HowItWorksSection() {
  const steps = [
    {
      num: "1",
      title: "Briefing e materiais",
      text: "Você envia as informações da oferta, do público, dos diferenciais e os materiais disponíveis.",
    },
    {
      num: "2",
      title: "Copy, design e desenvolvimento",
      text: "Eu organizo a estrutura, produzo os textos e desenvolvo a página responsiva.",
    },
    {
      num: "3",
      title: "Revisão e ajustes",
      text: "Você revisa a página e reúne as solicitações. Estão incluídas até 2 rodadas dentro do escopo.",
    },
    {
      num: "4",
      title: "Aprovação e publicação",
      text: "Após sua aprovação, publico a página e testo formulário, WhatsApp, links e eventos configurados.",
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
            Do briefing à publicação em quatro etapas
          </h2>
        </div>

        <div className="space-y-4 md:space-y-8">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-4 md:gap-6 items-start">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[var(--brand)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {s.num}
              </div>
              <div className="space-y-1 md:space-y-2">
                <h3 className="text-base md:text-lg font-semibold text-[var(--text-primary)]">
                  {s.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-[var(--text-secondary)] leading-relaxed">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 space-y-2">
          <p className="text-base font-semibold text-[var(--text-primary)]">
            Prazo do projeto
          </p>
          <p className="text-lg font-bold text-[var(--brand)]">{DEADLINE}</p>
          <p className="text-sm text-[var(--text-secondary)]">
            A contagem começa após a entrada, o briefing completo e o
            recebimento dos materiais necessários.
          </p>
        </div>
      </div>
    </section>
  );
}
