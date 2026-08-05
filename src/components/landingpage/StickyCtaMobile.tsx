"use client";

import { useEffect, useState } from "react";
import { useConsent } from "@/components/consent/ConsentProvider";
import { WhatsAppCta } from "./WhatsAppCta";
import { PRICE, PRICE_INSTALLMENT } from "@/lib/constants";

export function StickyCtaMobile() {
  const { bannerVisible } = useConsent();
  const [heroVisible, setHeroVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const heroTarget = document.querySelector('[data-sticky-observe="hero-cta"]');
    const footerTarget = document.querySelector('[data-sticky-observe="footer"]');

    const observers: IntersectionObserver[] = [];

    if (heroTarget) {
      const heroObserver = new IntersectionObserver(
        (entries) => setHeroVisible(entries[0].isIntersecting),
        { threshold: 0 }
      );
      heroObserver.observe(heroTarget);
      observers.push(heroObserver);
    }

    if (footerTarget) {
      const footerObserver = new IntersectionObserver(
        (entries) => setFooterVisible(entries[0].isIntersecting),
        { threshold: 0 }
      );
      footerObserver.observe(footerTarget);
      observers.push(footerObserver);
    }

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const visible = !bannerVisible && !heroVisible && !footerVisible;

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[var(--border)] bg-[var(--surface)] shadow-[0_-4px_16px_rgba(16,24,40,0.06)]">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <p className="text-[13px] font-semibold text-[var(--text-primary)] leading-tight">
          Projeto completo: {PRICE}
        </p>
        <WhatsAppCta
          location="sticky-mobile"
          ctaId="sticky_mobile_primary"
          ctaText={`Quero iniciar por ${PRICE_INSTALLMENT}`}
          className="h-11 px-4 text-sm font-medium bg-[var(--brand)] text-white rounded-xl hover:bg-[var(--brand-hover)] transition-colors whitespace-nowrap flex items-center"
        />
      </div>
    </div>
  );
}
