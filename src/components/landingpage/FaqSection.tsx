"use client";

import { Accordion } from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/constants";
import { trackFaqOpen } from "@/lib/tracking";

export function FaqSection() {
  return (
    <section className="bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-8">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">Dúvidas frequentes</span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            O que você precisa saber antes de iniciar
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Confira as respostas para as principais dúvidas sobre escopo, prazo, anúncios, ajustes e publicação.
          </p>
        </div>
        <Accordion items={FAQ_ITEMS} onItemOpen={trackFaqOpen} />
      </div>
    </section>
  );
}
