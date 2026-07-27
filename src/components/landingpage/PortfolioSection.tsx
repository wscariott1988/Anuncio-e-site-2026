"use client";

import Image from "next/image";
import { trackCtaClick, trackPortfolioOpen } from "@/lib/tracking";
import { PROJECTS } from "@/lib/constants";
import type { CtaLocation, ProjectId } from "@/types";

interface PortfolioSectionProps {
  onCtaClick: (location: CtaLocation) => void;
  onOpenProject: (project: (typeof PROJECTS)[number]) => void;
}

function PortfolioCard({
  project,
  onOpenProject,
  className,
  mobile = false,
}: {
  project: (typeof PROJECTS)[number];
  onOpenProject: (project: (typeof PROJECTS)[number]) => void;
  className?: string;
  mobile?: boolean;
}) {
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

export function PortfolioSection({ onCtaClick, onOpenProject }: PortfolioSectionProps) {
  return (
    <section className="bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-[700px] space-y-4">
          <span className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">Projetos reais</span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[var(--text-primary)] leading-tight">
            Algumas Landing Pages que desenvolvi
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Selecione um projeto para visualizar a página por dentro.
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
          <button
            onClick={() => {
              trackCtaClick("portfolio", "Quero minha Landing Page", "portfolio_primary");
              onCtaClick("portfolio");
            }}
            className="h-12 px-6 text-base font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors"
          >
            Quero minha Landing Page
          </button>
          <p className="text-sm text-[var(--text-secondary)] lg:mx-auto lg:max-w-[580px]">Cada projeto recebe uma estrutura adequada à oferta e ao público do negócio.</p>
        </div>
      </div>
    </section>
  );
}
