"use client";

import { useState, useCallback } from "react";
import { EssentialHeader } from "@/components/essential/EssentialHeader";
import { EssentialHero } from "@/components/essential/EssentialHero";
import { EssentialIntroSection } from "@/components/essential/EssentialIntroSection";
import { EssentialClarityStrip } from "@/components/essential/EssentialClarityStrip";
import { EssentialAudienceSection } from "@/components/essential/EssentialAudienceSection";
import { EssentialIncludedSection } from "@/components/essential/EssentialIncludedSection";
import { EssentialPortfolioSection } from "@/components/essential/EssentialPortfolioSection";
import { EssentialHowItWorksSection } from "@/components/essential/EssentialHowItWorksSection";
import { EssentialAboutSection } from "@/components/essential/EssentialAboutSection";
import { EssentialPricingSection } from "@/components/essential/EssentialPricingSection";
import { EssentialFaqSection } from "@/components/essential/EssentialFaqSection";
import { EssentialFinalCta } from "@/components/essential/EssentialFinalCta";
import { EssentialFooter } from "@/components/essential/EssentialFooter";
import { PortfolioModal } from "@/components/landingpage/PortfolioModal";
import type { Project } from "@/types";

interface EssentialClientProps {
  hasPhoto: boolean;
}

export function EssentialClient({ hasPhoto }: EssentialClientProps) {
  const [portfolioProject, setPortfolioProject] = useState<Project | null>(null);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  const handleOpenProject = useCallback((project: Project) => {
    setPortfolioProject(project);
    setPortfolioOpen(true);
  }, []);

  const handlePortfolioClose = useCallback(() => {
    setPortfolioOpen(false);
    setPortfolioProject(null);
  }, []);

  return (
    <>
      <EssentialHeader />
      <main>
        <EssentialHero />
        <EssentialIntroSection hasPhoto={hasPhoto} />
        <EssentialClarityStrip />
        <EssentialAudienceSection />
        <EssentialIncludedSection />
        <EssentialPortfolioSection onOpenProject={handleOpenProject} />
        <EssentialHowItWorksSection />
        <EssentialAboutSection hasPhoto={hasPhoto} />
        <EssentialPricingSection />
        <EssentialFaqSection />
        <EssentialFinalCta />
      </main>
      <EssentialFooter />
      <PortfolioModal project={portfolioProject} isOpen={portfolioOpen} onClose={handlePortfolioClose} />
    </>
  );
}
