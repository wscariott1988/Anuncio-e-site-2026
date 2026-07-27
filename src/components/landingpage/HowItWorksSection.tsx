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

        {/* Mobile: vertical stack */}
        <div className="md:hidden space-y-4">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-[var(--brand)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {s.num}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  {s.title}
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet: 2×2 grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6">
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

        {/* Desktop: 4 columns in a row */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[var(--brand)] text-white flex items-center justify-center text-sm font-bold">
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
