"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { trackPortfolioViewChange } from "@/lib/tracking";
import type { Project } from "@/types";

interface PortfolioModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

type ViewMode = "mobile" | "desktop";

function PortfolioContent({ project, onClose }: { project: Project; onClose: () => void }) {
  const [view, setView] = useState<ViewMode>("mobile");
  const [mobileLoaded, setMobileLoaded] = useState(false);
  const [desktopLoaded, setDesktopLoaded] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [desktopError, setDesktopError] = useState(false);

  const handleViewChange = useCallback(
    (newView: ViewMode) => {
      setView(newView);
      trackPortfolioViewChange(project.id, newView);
    },
    [project.id]
  );

  const mobileSrc = `/images/portfolio/${project.slug}-mobile.webp`;
  const desktopSrc = `/images/portfolio/${project.slug}-desktop.webp`;

  return (
    <Modal isOpen={true} onClose={onClose} title={`Projeto ${project.name}`} showCloseButton={false}>
      <div className="flex flex-col overflow-hidden" style={{ maxHeight: "100dvh" }}>
        {/* Header: title left, actions right */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-[var(--border)] flex-shrink-0">
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-[var(--text-primary)] truncate">{project.name}</h2>
            <p className="text-xs text-[var(--text-secondary)]">{project.segment}</p>
          </div>
          <div className="flex items-center gap-3 ml-4 flex-shrink-0">
            <div className="hidden md:flex gap-1 bg-[var(--surface)] rounded-lg p-1 border border-[var(--border)]">
              <button
                onClick={() => handleViewChange("mobile")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  view === "mobile"
                    ? "bg-[var(--brand)] text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                aria-pressed={view === "mobile"}
              >
                Celular
              </button>
              <button
                onClick={() => handleViewChange("desktop")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  view === "desktop"
                    ? "bg-[var(--brand)] text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                aria-pressed={view === "desktop"}
              >
                Desktop
              </button>
            </div>
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500 flex-shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-4 md:p-8 flex-1 min-h-0">
          {view === "mobile" ? (
            <div className="relative w-full max-w-[375px]">
              <div className="rounded-[2rem] border-4 border-gray-800 bg-gray-800 shadow-2xl overflow-hidden">
                <div className="h-6 bg-gray-800 flex items-center justify-center">
                  <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
                </div>
                <div className="bg-white relative" style={{ minHeight: "600px" }}>
                  {!mobileLoaded && !mobileError && (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--text-secondary)]">
                      Carregando…
                    </div>
                  )}
                  {mobileError && (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-red-500">
                      Erro ao carregar a imagem.
                    </div>
                  )}
                  <Image
                    src={mobileSrc}
                    alt={`Captura mobile da Landing Page de ${project.name}`}
                    width={375}
                    height={812}
                    className={`w-full h-auto ${mobileLoaded ? "" : "invisible"}`}
                    onLoad={() => setMobileLoaded(true)}
                    onError={() => setMobileError(true)}
                    unoptimized
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full max-w-[960px]">
              <div className="rounded-t-xl border-4 border-gray-800 border-b-0 bg-gray-800 shadow-2xl overflow-hidden">
                <div className="h-8 bg-gray-800 flex items-center gap-2 px-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-8">
                    <div className="h-4 bg-gray-600 rounded-md max-w-md mx-auto" />
                  </div>
                </div>
                <div className="bg-white relative" style={{ minHeight: "500px" }}>
                  {!desktopLoaded && !desktopError && (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--text-secondary)]">
                      Carregando…
                    </div>
                  )}
                  {desktopError && (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-red-500">
                      Erro ao carregar a imagem.
                    </div>
                  )}
                  <Image
                    src={desktopSrc}
                    alt={`Captura desktop da Landing Page de ${project.name}`}
                    width={960}
                    height={540}
                    className={`w-full h-auto ${desktopLoaded ? "" : "invisible"}`}
                    onLoad={() => setDesktopLoaded(true)}
                    onError={() => setDesktopError(true)}
                    unoptimized
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export function PortfolioModal({ project, isOpen, onClose }: PortfolioModalProps) {
  if (!project || !isOpen) return null;

  return (
    <div key={project.id}>
      <PortfolioContent project={project} onClose={onClose} />
    </div>
  );
}
