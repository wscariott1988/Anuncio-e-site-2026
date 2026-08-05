"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/landingpage/Header";
import { Hero } from "@/components/landingpage/Hero";
import { TrustBar } from "@/components/landingpage/TrustBar";
import { PortfolioSection } from "@/components/landingpage/PortfolioSection";
import { IncludedSection } from "@/components/landingpage/IncludedSection";
import { HowItWorksSection } from "@/components/landingpage/HowItWorksSection";
import { AboutSection } from "@/components/landingpage/AboutSection";
import { PricingSection } from "@/components/landingpage/PricingSection";
import { FaqSection } from "@/components/landingpage/FaqSection";
import { FinalCta } from "@/components/landingpage/FinalCta";
import { Footer } from "@/components/landingpage/Footer";
import { PortfolioModal } from "@/components/landingpage/PortfolioModal";
import { StickyCtaMobile } from "@/components/landingpage/StickyCtaMobile";
import type { Project } from "@/types";

export function LandingPageClient() {
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
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <PortfolioSection onOpenProject={handleOpenProject} />
        <IncludedSection />
        <HowItWorksSection />
        <AboutSection />
        <PricingSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <PortfolioModal project={portfolioProject} isOpen={portfolioOpen} onClose={handlePortfolioClose} />
      <StickyCtaMobile />
    </>
  );
}
