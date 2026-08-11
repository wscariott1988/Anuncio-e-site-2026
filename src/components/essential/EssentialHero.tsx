"use client";

import Image from "next/image";
import { ESSENTIAL_PRICE, ESSENTIAL_DEADLINE, ESSENTIAL_ROUNDS, ESSENTIAL_HERO_CTA_TEXT } from "@/lib/essential";
import { EssentialWhatsAppCta } from "./EssentialWhatsAppCta";

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
            <span className="inline-block px-3 py-1 text-xs font-medium text-[var(--brand)] bg-[var(--brand-soft)] rounded-full backdrop-blur-sm border border-[var(--brand-soft)]">
              Landing Page Essencial para tráfego pago
            </span>
            <h1 className="text-[36px] md:text-[56px] font-bold leading-[1.1] text-[var(--text-primary)]">
              Sua Landing Page profissional por{" "}
              <span className="whitespace-nowrap">{ESSENTIAL_PRICE}</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-[520px]">
              Uma página única, focada na sua oferta, para receber o tráfego da
              sua campanha. Eu cuido da estratégia, dos textos, do design, do
              desenvolvimento e da publicação.
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              {ESSENTIAL_DEADLINE} após briefing e materiais • {ESSENTIAL_ROUNDS}
            </p>
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

          <div className="hidden md:block relative">
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
                      zarqplanejados.com.br
                    </span>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden" style={{ height: 280 }}>
                <Image
                  src="/images/portfolio/zarq-planejados-desktop.webp"
                  alt="Landing Page criada para ZARQ Planejados — visão desktop"
                  width={1600}
                  height={540}
                  className="w-full h-auto"
                  unoptimized
                  priority
                />
              </div>
            </div>

            <div className="hidden lg:block absolute -bottom-5 -right-2 w-[130px] z-10">
              <div className="rounded-[1rem] border-[3px] border-gray-800 bg-gray-800 shadow-xl overflow-hidden">
                <div className="h-4 bg-gray-800 flex items-center justify-center">
                  <div className="w-10 h-1 bg-gray-600 rounded-full" />
                </div>
                <div className="bg-white overflow-hidden" style={{ height: 200 }}>
                  <Image
                    src="/images/portfolio/zarq-planejados-mobile.webp"
                    alt="Landing Page criada para ZARQ Planejados — visão mobile"
                    width={600}
                    height={100}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden flex justify-center mt-8">
            <div className="w-[140px]">
              <div className="rounded-[1.25rem] border-[3px] border-gray-800 bg-gray-800 shadow-xl overflow-hidden">
                <div className="h-4 bg-gray-800 flex items-center justify-center">
                  <div className="w-10 h-1 bg-gray-600 rounded-full" />
                </div>
                <div className="bg-white overflow-hidden" style={{ height: 240 }}>
                  <Image
                    src="/images/portfolio/zarq-planejados-mobile.webp"
                    alt="Landing Page criada para ZARQ Planejados — visão mobile"
                    width={600}
                    height={100}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
