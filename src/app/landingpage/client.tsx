"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/landingpage/Header";
import { Hero } from "@/components/landingpage/Hero";
import { ClarityStrip } from "@/components/landingpage/ClarityStrip";
import { ProblemSection } from "@/components/landingpage/ProblemSection";

import { IncludedSection } from "@/components/landingpage/IncludedSection";
import { PortfolioSection } from "@/components/landingpage/PortfolioSection";
import { HowItWorksSection } from "@/components/landingpage/HowItWorksSection";
import { AboutSection } from "@/components/landingpage/AboutSection";
import { PricingSection } from "@/components/landingpage/PricingSection";
import { FaqSection } from "@/components/landingpage/FaqSection";
import { FinalCta } from "@/components/landingpage/FinalCta";
import { Footer } from "@/components/landingpage/Footer";
import { PortfolioModal } from "@/components/landingpage/PortfolioModal";
import { LeadFormModal } from "@/components/landingpage/LeadFormModal";
import { trackFormOpen } from "@/lib/tracking";
import type { CtaLocation, Project } from "@/types";

export function LandingPageClient() {
  const [formOpen, setFormOpen] = useState(false);
  const [formCta, setFormCta] = useState<CtaLocation | null>(null);
  const [portfolioProject, setPortfolioProject] = useState<Project | null>(null);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  const handleCtaClick = useCallback((location: CtaLocation) => {
    setFormCta(location);
    setFormOpen(true);
    trackFormOpen(location);
  }, []);

  const handleFormClose = useCallback(() => {
    setFormOpen(false);
    setFormCta(null);
  }, []);

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
      <Header onCtaClick={handleCtaClick} />
      <main>
        <Hero onCtaClick={handleCtaClick} />
        <ClarityStrip />
        <ProblemSection />
        <IncludedSection />
        <PortfolioSection onCtaClick={handleCtaClick} onOpenProject={handleOpenProject} />
        <HowItWorksSection />
        <AboutSection />
        <PricingSection onCtaClick={handleCtaClick} />
        <FaqSection />
        <FinalCta onCtaClick={handleCtaClick} />
      </main>
      <Footer />
      <PortfolioModal project={portfolioProject} isOpen={portfolioOpen} onClose={handlePortfolioClose} />
      <LeadFormModal isOpen={formOpen} ctaLocation={formCta} onClose={handleFormClose} />
    </>
  );
}
