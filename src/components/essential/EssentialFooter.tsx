import { BRAND_NAME } from "@/lib/constants";
import { ConsentFooterButton } from "@/components/consent/ConsentFooterButton";

const CONTACT_EMAIL = "contato@grupows.com";

export function EssentialFooter() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6 py-12 space-y-6">
        <div className="space-y-2">
          <p className="text-base font-semibold text-[var(--text-primary)]">{BRAND_NAME}</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Landing Pages para tráfego pago, desenvolvidas diretamente por Willian Souza.
          </p>
        </div>
        <nav aria-label="Links jurídicos" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href="/politica-de-privacidade" className="text-[var(--brand)] hover:underline">
            Política de Privacidade
          </a>
          <a href="/termos" className="text-[var(--brand)] hover:underline">
            Termos de Uso
          </a>
          <ConsentFooterButton />
        </nav>
        <div className="space-y-1">
          <p className="text-sm font-medium text-[var(--text-primary)]">Contato</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-[var(--brand)] hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <p className="text-xs text-[var(--text-secondary)]">
          © {new Date().getFullYear()} {BRAND_NAME}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
