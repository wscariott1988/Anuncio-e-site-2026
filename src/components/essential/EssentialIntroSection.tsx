"use client";

import Image from "next/image";
import { ESSENTIAL_INTRO_CTA_TEXT } from "@/lib/essential";
import { EssentialWhatsAppCta } from "./EssentialWhatsAppCta";

interface EssentialIntroSectionProps {
  hasPhoto?: boolean;
}

export function EssentialIntroSection({ hasPhoto = false }: EssentialIntroSectionProps) {
  return (
    <section className="bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <div
          className={
            hasPhoto
              ? "grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16 xl:gap-24 items-center"
              : "max-w-[700px]"
          }
        >
          {hasPhoto && (
            <div className="mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none">
              <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-[0_12px_32px_rgba(16,24,40,0.08)]">
                <Image
                  src="/images/willian-souza.webp"
                  alt="Willian Souza, responsável pelo desenvolvimento das landing pages"
                  width={1376}
                  height={1926}
                  sizes="(max-width: 1023px) 80vw, 40vw"
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}
          <div className={hasPhoto ? "space-y-5 mt-10 lg:mt-0" : "space-y-5"}>
            <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">
              Atendimento direto
            </span>
            <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
              Sua página será feita por uma pessoa, não por uma ferramenta
              automática
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              Eu sou Willian Souza e desenvolvo landing pages para profissionais
              e empresas que precisam apresentar seus serviços com mais clareza
              e direcionar os visitantes para uma ação.
            </p>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              Você conversa diretamente comigo durante o projeto. Eu organizo as
              informações, desenvolvo a página e preparo tudo para que ela
              funcione bem no celular e esteja pronta para divulgação.
            </p>
            <div className="pt-2">
              <EssentialWhatsAppCta
                location="about"
                ctaText={ESSENTIAL_INTRO_CTA_TEXT}
                className="w-full sm:w-auto h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors inline-flex items-center justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
