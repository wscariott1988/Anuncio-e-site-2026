import { DEADLINE, ROUNDS } from "@/lib/constants";

export function HowItWorksSection() {
  const steps = [
    {
      num: "1",
      title: "Briefing e materiais",
      text: "Você me apresenta seu negócio, a oferta que deseja anunciar, o público, os diferenciais e os materiais disponíveis. Também definimos os canais de contato, a infraestrutura e o que será necessário para iniciar.",
    },
    {
      num: "2",
      title: "Estratégia e copy",
      text: "Eu organizo a estrutura da página e produzo os textos com base nas informações do briefing. A oferta, os argumentos, as principais dúvidas e a ação esperada são distribuídos em uma jornada clara.",
    },
    {
      num: "3",
      title: "Design e desenvolvimento",
      text: "Transformo a estratégia em uma interface responsiva e desenvolvo a Landing Page com prioridade para a experiência no celular. Também preparo o formulário, a continuidade pelo WhatsApp e os eventos previstos no projeto.",
    },
    {
      num: "4",
      title: "Revisão e ajustes",
      text: "Você recebe a página em um ambiente de revisão, confere as informações e reúne suas solicitações em uma lista. O projeto inclui até duas rodadas de ajustes dentro do escopo aprovado.",
    },
    {
      num: "5",
      title: "Aprovação e publicação",
      text: "Depois da sua aprovação final, publico a página na infraestrutura combinada e testo o funcionamento no celular e no desktop. Também verifico o formulário, a continuidade pelo WhatsApp, os links e os eventos configurados.",
    },
  ];

  return (
    <section className="bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">Processo simples</span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            Do briefing à publicação, você acompanha cada etapa
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            O projeto segue um processo organizado para que você saiba o que será feito, quais informações precisa enviar e em que momento poderá solicitar ajustes.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-[var(--brand)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {s.num}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{s.title}</h3>
                <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 space-y-2">
          <p className="text-base font-semibold text-[var(--text-primary)]">Prazo do projeto</p>
          <p className="text-lg font-bold text-[var(--brand)]">{DEADLINE}</p>
          <p className="text-sm text-[var(--text-secondary)]">
            A contagem começa após a confirmação do pagamento inicial, o preenchimento completo do briefing e o recebimento dos materiais necessários.
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Se alguma informação ou material ficar pendente, o prazo fica pausado até que o projeto possa continuar. {ROUNDS}.
          </p>
        </div>
      </div>
    </section>
  );
}
