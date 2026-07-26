import { BRAND_NAME } from "@/lib/constants";

interface LegalPageLayoutProps {
  children: React.ReactNode;
}

export function LegalPageLayout({ children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="max-w-[800px] mx-auto px-5 md:px-6 py-4 flex items-center justify-between gap-2">
          <a href="/landingpage" className="text-base font-semibold text-[var(--text-primary)] whitespace-nowrap">
            {BRAND_NAME}
          </a>
          <a
            href="/landingpage"
            className="text-sm text-[var(--brand)] hover:underline whitespace-nowrap"
          >
            Voltar para a Landing Page
          </a>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-5 md:px-6 py-12 md:py-16">
        {children}
      </main>

      <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="max-w-[800px] mx-auto px-5 md:px-6 py-8 space-y-4">
          <p className="text-base font-semibold text-[var(--text-primary)]">{BRAND_NAME}</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Links jurídicos">
            <a href="/politica-de-privacidade" className="text-[var(--brand)] hover:underline">
              Política de Privacidade
            </a>
            <a href="/termos" className="text-[var(--brand)] hover:underline">
              Termos de Uso
            </a>
            <a href="mailto:contato@grupows.com" className="text-[var(--brand)] hover:underline">
              contato@grupows.com
            </a>
            <a href="/landingpage" className="text-[var(--brand)] hover:underline">
              Voltar à Landing Page
            </a>
          </nav>
          <p className="text-xs text-[var(--text-secondary)]">
            © {new Date().getFullYear()} {BRAND_NAME}. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
