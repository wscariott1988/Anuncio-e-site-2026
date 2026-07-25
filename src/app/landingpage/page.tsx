import type { Metadata } from "next";
import { LandingPageClient } from "./client";

export const metadata: Metadata = {
  title: "Landing Page para Tráfego Pago | Anúncio & Site",
  description:
    "Landing Page completa para Google Ads e Meta Ads, com estratégia, copy, design, desenvolvimento e rastreamento. Projeto por R$ 997.",
  alternates: {
    canonical: "https://www.anuncioesite.com.br/landingpage",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LandingPage() {
  return <LandingPageClient />;
}
