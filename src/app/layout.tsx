import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anúncio & Site",
  description: "Landing Pages para tráfego pago, desenvolvidas diretamente por Willian Souza.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} antialiased`}>
      <head>
        <Script id="consent-init" strategy="beforeInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`}</Script>
        <Script id="consent-restore" strategy="beforeInteractive">{`try{var p=JSON.parse(localStorage.getItem('anuncio_e_site_consent_v1'));if(p&&p.version==='1'){gtag('consent','update',{ad_storage:p.advertising?'granted':'denied',analytics_storage:p.analytics?'granted':'denied',ad_user_data:p.advertising?'granted':'denied',ad_personalization:p.advertising?'granted':'denied'});}}catch(e){}`}</Script>
      </head>
      <body className="min-h-screen">
        <ConsentProvider>
          {children}
          {process.env.NEXT_PUBLIC_GTM_ID && (
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          )}
        </ConsentProvider>
      </body>
    </html>
  );
}
