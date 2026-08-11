import { ESSENTIAL_AUDIENCE_ITEMS } from "@/lib/essential";

export function EssentialAudienceSection() {
  return (
    <section className="bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">
            Uma opção para começar
          </span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            Uma página profissional sem transformar o projeto em algo complicado
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            A Landing Page Essencial é indicada para quem precisa apresentar um
            serviço, explicar sua oferta e facilitar o contato com possíveis
            clientes.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 gap-4">
          {ESSENTIAL_AUDIENCE_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 bg-[var(--background)] rounded-2xl border border-[var(--border)] p-5"
            >
              <svg
                className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-[15px] text-[var(--text-primary)] leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-base font-semibold text-[var(--text-primary)]">
          Uma oferta, uma página e uma ação principal.
        </p>
      </div>
    </section>
  );
}
