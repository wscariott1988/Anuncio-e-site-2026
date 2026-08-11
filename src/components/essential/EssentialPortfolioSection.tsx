"use client";

import { PortfolioCard } from "@/components/landingpage/PortfolioSection";
import { PROJECTS } from "@/lib/constants";
import { ESSENTIAL_PORTFOLIO_CTA_TEXT } from "@/lib/essential";
import { EssentialWhatsAppCta } from "./EssentialWhatsAppCta";

interface EssentialPortfolioSectionProps {
  onOpenProject: (project: (typeof PROJECTS)[number]) => void;
}

export function EssentialPortfolioSection({ onOpenProject }: EssentialPortfolioSectionProps) {
  return (
    <section className="bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">Projetos reais</span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            Projetos reais desenvolvidos por mim
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Veja Landing Pages criadas para negócios de diferentes segmentos.
          </p>
        </div>

        <div className="md:hidden">
          <p className="sr-only">Deslize para ver outros projetos</p>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {PROJECTS.map((project) => (
              <PortfolioCard
                key={project.id}
                project={project}
                onOpenProject={onOpenProject}
                mobile
                className="w-[85%] snap-start bg-[var(--background)] rounded-2xl border border-[var(--border)] overflow-hidden group cursor-pointer hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)] transition-shadow flex-shrink-0"
              />
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-6 gap-6">
          {PROJECTS.slice(0, 3).map((project) => (
            <PortfolioCard
              key={project.id}
              project={project}
              onOpenProject={onOpenProject}
              className="bg-[var(--background)] rounded-2xl border border-[var(--border)] overflow-hidden group cursor-pointer hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)] transition-shadow lg:col-span-2"
            />
          ))}
          <div className="lg:col-start-2 lg:col-span-4 grid grid-cols-2 gap-6">
            {PROJECTS.slice(3).map((project) => (
              <PortfolioCard
                key={project.id}
                project={project}
                onOpenProject={onOpenProject}
                className="bg-[var(--background)] rounded-2xl border border-[var(--border)] overflow-hidden group cursor-pointer hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)] transition-shadow"
              />
            ))}
          </div>
        </div>

        <div className="space-y-3 lg:items-center lg:text-center">
          <EssentialWhatsAppCta
            location="pricing"
            ctaText={ESSENTIAL_PORTFOLIO_CTA_TEXT}
            className="h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors inline-flex items-center"
          />
          <p className="text-sm text-[var(--text-secondary)] lg:mx-auto lg:max-w-[580px]">Cada projeto recebe uma estrutura adequada à oferta e ao público do negócio.</p>
        </div>
      </div>
    </section>
  );
}
