"use client";

import { ESSENTIAL_PRICE, ESSENTIAL_HERO_CTA_TEXT } from "@/lib/essential";
import { EssentialWhatsAppCta } from "./EssentialWhatsAppCta";

function WhatsAppIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MockupPage({ compact = false }: { compact?: boolean }) {
  return (
    <div className="h-full w-full bg-[var(--background)] flex flex-col">
      <div className={compact ? "px-3 pt-3" : "px-6 pt-5"}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand)]" />
            <span className="text-[11px] font-semibold text-[var(--text-primary)]">
              Sua empresa
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[9px] text-gray-400">Serviços</span>
            <span className="text-[9px] text-gray-400">Contato</span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <span className="text-[10px] font-semibold text-[var(--brand)] uppercase tracking-wider">
          Sua empresa
        </span>
        <p
          className={
            compact
              ? "mt-1.5 text-[13px] font-bold text-[var(--text-primary)] leading-snug"
              : "mt-2 text-[17px] font-bold text-[var(--text-primary)] leading-snug"
          }
        >
          Apresente sua oferta com clareza
        </p>
        {!compact && (
          <p className="mt-1.5 text-[11px] text-[var(--text-secondary)] max-w-[320px] leading-relaxed">
            Conte o que você oferece e deixe o contato simples para o cliente.
          </p>
        )}
        <div
          className={
            compact
              ? "mt-3 inline-flex items-center gap-1.5 h-7 px-3 rounded-md bg-[#25D366] text-white text-[9px] font-semibold"
              : "mt-4 inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-[#25D366] text-white text-[11px] font-semibold"
          }
        >
          <WhatsAppIcon className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} />
          Falar pelo WhatsApp
        </div>
      </div>
    </div>
  );
}

export function EssentialHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 85% 10%, rgba(21,94,239,0.14), transparent 34%), radial-gradient(circle at 70% 40%, rgba(105,65,198,0.08), transparent 30%), #f7f8fa",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 text-xs font-medium text-[var(--brand)] bg-[var(--brand-soft)] rounded-full border border-[var(--brand-soft)]">
              Landing Page Essencial
            </span>
            <h1 className="text-[36px] md:text-[56px] font-bold leading-[1.1] text-[var(--text-primary)]">
              Uma página profissional para apresentar sua oferta e levar mais
              pessoas até o seu WhatsApp
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-[520px]">
              Landing page desenvolvida por Willian Souza, adaptada para
              celulares e pronta para você divulgar seu serviço ou começar seus
              anúncios.
            </p>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                Landing Page por{" "}
                <span className="whitespace-nowrap">{ESSENTIAL_PRICE}</span>
              </p>
            </div>
            <div className="space-y-3">
              <EssentialWhatsAppCta
                location="hero"
                ctaText={ESSENTIAL_HERO_CTA_TEXT}
                className="w-full md:w-auto h-14 px-8 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors inline-flex items-center justify-center"
              />
              <p className="text-sm text-[var(--text-secondary)]">
                Fale diretamente com Willian pelo WhatsApp e confirme a
                contratação.
              </p>
            </div>
          </div>

          {/* Desktop composition — neutral browser frame + phone overlay */}
          <div className="hidden md:block relative" aria-hidden="true">
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-[0_12px_32px_rgba(16,24,40,0.08)] bg-white">
              <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="h-5 bg-white rounded-md border border-gray-200 flex items-center px-2">
                    <span className="text-[10px] text-gray-400 truncate">
                      seusite.com.br
                    </span>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden" style={{ height: 300 }}>
                <MockupPage />
              </div>
            </div>

            <div className="hidden lg:block absolute -bottom-5 -right-2 w-[130px] z-10">
              <div className="rounded-[1rem] border-[3px] border-gray-800 bg-gray-800 shadow-xl overflow-hidden">
                <div className="h-4 bg-gray-800 flex items-center justify-center">
                  <div className="w-10 h-1 bg-gray-600 rounded-full" />
                </div>
                <div className="bg-white overflow-hidden" style={{ height: 200 }}>
                  <MockupPage compact />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile composition — neutral phone frame */}
          <div className="md:hidden flex justify-center mt-8" aria-hidden="true">
            <div className="w-[150px]">
              <div className="rounded-[1.25rem] border-[3px] border-gray-800 bg-gray-800 shadow-xl overflow-hidden">
                <div className="h-4 bg-gray-800 flex items-center justify-center">
                  <div className="w-10 h-1 bg-gray-600 rounded-full" />
                </div>
                <div className="bg-white overflow-hidden" style={{ height: 240 }}>
                  <MockupPage compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
