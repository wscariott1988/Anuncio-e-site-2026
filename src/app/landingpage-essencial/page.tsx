import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { ESSENTIAL_ROUTE, ESSENTIAL_PRICE } from "@/lib/essential";
import { EssentialClient } from "./client";

const TITLE = `Landing Page Essencial para Google Ads e Meta Ads por ${ESSENTIAL_PRICE} | Anúncio & Site`;
const DESCRIPTION =
  `Landing Page profissional para Google Ads e Meta Ads por ${ESSENTIAL_PRICE}, com design responsivo, WhatsApp, publicação e 1 rodada de ajustes.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL("https://www.anuncioesite.com.br"),
  alternates: {
    canonical: `https://www.anuncioesite.com.br${ESSENTIAL_ROUTE}`,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `https://www.anuncioesite.com.br${ESSENTIAL_ROUTE}`,
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

function hasWillianPhoto(): boolean {
  try {
    const filePath = path.join(process.cwd(), "public", "images", "willian-souza.webp");
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

export default function EssentialLandingPage() {
  return <EssentialClient hasPhoto={hasWillianPhoto()} />;
}
