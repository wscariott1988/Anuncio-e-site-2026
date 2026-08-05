import type { Metadata } from "next";
import { LandingPageClient } from "./client";

const TITLE = "Landing Page Profissional para Google Ads e Meta Ads por R$ 997 | Anúncio & Site";
const DESCRIPTION =
  "Landing Page profissional para tráfego pago, criada para Google Ads e Meta Ads por R$ 997. Estratégia, copy, design, desenvolvimento, rastreamento e publicação por Willian Souza. Entrada de R$ 498,50 para iniciar.";

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
