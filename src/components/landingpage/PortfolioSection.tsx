"use client";

import Image from "next/image";
import { trackCtaClick, trackPortfolioOpen } from "@/lib/tracking";
import { PROJECTS } from "@/lib/constants";
import type { CtaLocation, ProjectId } from "@/types";

interface PortfolioSectionProps {
  onCtaClick: (location: CtaLocation) => void;
  onOpenProject: (project: (typeof PROJECTS)[number]) => void;
}

export function PortfolioSection({ onCtaClick, onOpenProject }: PortfolioSectionProps) {
  return (
    <section className="bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">Projetos reais</span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            Alguns projetos que desenvolvi
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Landing Pages criadas para diferentes serviços e negócios, sempre considerando a oferta, o público e a ação principal de cada projeto.
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Selecione um projeto para conhecer a página por dentro.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-[var(--background)] rounded-2xl border border-[var(--border)] overflow-hidden group cursor-pointer hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)] transition-shadow"
              onClick={() => {
                trackPortfolioOpen(project.id as ProjectId);
                onOpenProject(project);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  trackPortfolioOpen(project.id as ProjectId);
                  onOpenProject(project);
                }
              }}
              aria-label={`Ver projeto ${project.name} por dentro`}
            >
              <div className="aspect-[4/3] bg-[var(--surface)] relative overflow-hidden">
                <Image
                  src={`/images/portfolio/${project.slug}-cover.webp`}
                  alt={`Captura da Landing Page de ${project.name}`}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">{project.name}</h3>
                <p className="text-sm text-[var(--text-secondary)] italic">{project.segment}</p>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">{project.description}</p>
                <span className="inline-block text-sm font-medium text-[var(--brand)] mt-2">Ver projeto por dentro</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-base text-[var(--text-secondary)] leading-relaxed">
          Cada negócio possui uma oferta, um público e uma forma diferente de atender. Por isso, cada página recebe uma estrutura e uma apresentação próprias.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => {
              trackCtaClick("portfolio", "Quero uma Landing Page para meu negócio", "portfolio_primary");
              onCtaClick("portfolio");
            }}
            className="h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors"
          >
            Quero uma Landing Page para meu negócio
          </button>
          <p className="text-sm text-[var(--text-secondary)]">Conte sobre sua empresa e eu avalio o que o projeto precisa.</p>
        </div>
      </div>
    </section>
  );
}
