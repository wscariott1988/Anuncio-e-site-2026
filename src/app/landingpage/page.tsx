import type { Metadata } from "next";
import { LandingPageClient } from "./client";

const TITLE = "Landing Page para Tráfego Pago | Anúncio & Site";
const DESCRIPTION =
  "Landing Page completa para Google Ads e Meta Ads, com estratégia, copy, design, desenvolvimento e rastreamento. Projeto por R$ 997.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL("https://www.anuncioesite.com.br"),
  alternates: {
    canonical: "https://www.anuncioesite.com.br/landingpage",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.anuncioesite.com.br/landingpage",
    siteName: "Anúncio & Site",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function LandingPage() {
  return <LandingPageClient />;
}
