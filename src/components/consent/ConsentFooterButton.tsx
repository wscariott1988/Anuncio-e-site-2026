"use client";

import { useConsent } from "./ConsentProvider";

export function ConsentFooterButton() {
  const { openSettings } = useConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className="text-[var(--brand)] hover:underline"
    >
      Configurações de privacidade
    </button>
  );
}
