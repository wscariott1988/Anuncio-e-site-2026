export function ClarityStrip() {
  return (
    <section className="bg-[var(--surface-soft)] border-y border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20 text-center space-y-6">
        <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
          Não é curso, template ou ferramenta.
        </h2>
        <p className="text-lg text-[var(--text-secondary)] max-w-[700px] mx-auto leading-relaxed">
          Eu desenvolvo sua Landing Page completa e entrego pronta para receber sua campanha.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-medium text-[var(--text-primary)]">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[var(--brand)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Criada para sua oferta
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[var(--brand)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Desenvolvida diretamente por mim
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[var(--brand)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Preparada para celular e desktop
          </span>
        </div>
      </div>
    </section>
  );
}
