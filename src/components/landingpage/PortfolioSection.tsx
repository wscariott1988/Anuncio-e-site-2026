"use client";

import Image from "next/image";
import { trackPortfolioOpen } from "@/lib/tracking";
import { PROJECTS, PRICE } from "@/lib/constants";
import type { ProjectId } from "@/types";
import { WhatsAppCta } from "./WhatsAppCta";

interface PortfolioSectionProps {
  onOpenProject: (project: (typeof PROJECTS)[number]) => void;
}

export interface PortfolioCardProps {
  project: (typeof PROJECTS)[number];
  onOpenProject: (project: (typeof PROJECTS)[number]) => void;
  className?: string;
  mobile?: boolean;
}

export function PortfolioCard({
  project,
  onOpenProject,
  className,
  mobile = false,
}: PortfolioCardProps) {
  return (
    <div
      className={className}
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
      {mobile ? (
        <div className="overflow-hidden bg-[var(--surface)]">
          <Image
            src={`/images/portfolio/${project.slug}-cover.webp`}
            alt={`Captura da Landing Page de ${project.name}`}
            width={780}
            height={700}
            className="w-full h-auto"
            sizes="85vw"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-[var(--surface)] relative overflow-hidden">
          <Image
            src={`/images/portfolio/${project.slug}-cover.webp`}
            alt={`Captura da Landing Page de ${project.name}`}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 767px) 80vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5 space-y-2 min-w-0">
        <h3 className="text-base font-semibold text-[var(--text-primary)] whitespace-normal break-words">{project.name}</h3>
        <p className="text-sm text-[var(--text-secondary)] italic whitespace-normal break-words">{project.segment}</p>
        <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed whitespace-normal break-words">{project.description}</p>
        <span className="inline-block text-sm font-medium text-[var(--brand)] mt-2">Ver projeto por dentro</span>
      </div>
    </div>
  );
}

export function PortfolioSection({ onOpenProject }: PortfolioSectionProps) {
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

        {/* Mobile: horizontal scroll-snap strip */}
        <div className="md:hidden">
          <p className="sr-only">Deslize para ver outros projetos</p>
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
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

        {/* Desktop / tablet: grid */}
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
          <WhatsAppCta
            location="portfolio"
            ctaId="portfolio_primary"
            ctaText={`Quero minha Landing Page por ${PRICE}`}
            className="h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors inline-flex items-center"
          />
          <p className="text-sm text-[var(--text-secondary)] lg:mx-auto lg:max-w-[580px]">Cada projeto recebe uma estrutura adequada à oferta e ao público do negócio.</p>
        </div>
      </div>
    </section>
  );
}
