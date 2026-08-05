export function TrustBar() {
  const items = [
    "Desenvolvimento direto com Willian",
    "Mais de 5 anos de experiência prática com Google Ads",
    "Página publicada e testada no celular e no desktop",
  ];

  return (
    <section className="bg-[var(--surface-soft)] border-y border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6 py-6 md:py-8">
        <ul className="grid sm:grid-cols-3 gap-3 md:gap-6">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm font-medium text-[var(--text-primary)]"
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
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
