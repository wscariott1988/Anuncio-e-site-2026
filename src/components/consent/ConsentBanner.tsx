interface ConsentBannerProps {
  onAcceptAll: () => void;
  onRejectOptional: () => void;
  onOpenSettings: () => void;
}

export function ConsentBanner({
  onAcceptAll,
  onRejectOptional,
  onOpenSettings,
}: ConsentBannerProps) {
  return (
    <div
      role="dialog"
      aria-label="Sua privacidade"
      aria-describedby="consent-description"
      className="fixed bottom-0 inset-x-0 z-50 bg-[var(--surface)] border-t border-[var(--border)] shadow-lg"
    >
      <div className="max-w-[1200px] mx-auto px-5 py-4 md:py-5 space-y-3 md:space-y-4">
        <p
          id="consent-description"
          className="text-sm text-[var(--text-secondary)] leading-relaxed"
        >
          Para oferecer uma experiência relevante, utilizamos cookies e
          tecnologias semelhantes. Você pode aceitar todos, recusar os não
          essenciais ou personalizar suas preferências. Consulte nossa{" "}
          <a
            href="/politica-de-privacidade"
            className="text-[var(--brand)] hover:underline"
          >
            Política de Privacidade
          </a>.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <button
            onClick={onAcceptAll}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-[var(--brand)] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Aceitar todos
          </button>
          <button
            onClick={onRejectOptional}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-[var(--background)] text-[var(--text-primary)] text-sm font-medium rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] transition-colors"
          >
            Recusar opcionais
          </button>
          <button
            onClick={onOpenSettings}
            className="flex-1 sm:flex-none px-5 py-2.5 text-[var(--brand)] text-sm font-medium hover:underline"
          >
            Configurar
          </button>
        </div>
      </div>
    </div>
  );
}
