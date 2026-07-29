"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import type { ConsentPreferences } from "@/lib/consent";

interface ConsentSettingsProps {
  initial: ConsentPreferences;
  onSave: (prefs: ConsentPreferences) => void;
  onClose: () => void;
}

function Switch({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer">
      <div className="space-y-0.5">{children}</div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${
          checked ? "bg-[var(--brand)]" : "bg-[var(--border)]"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

export function ConsentSettings({
  initial,
  onSave,
  onClose,
}: ConsentSettingsProps) {
  const [prefs, setPrefs] = useState(initial);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    titleRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-settings-title"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-[var(--surface)] border border-[var(--border)] rounded-t-xl sm:rounded-xl shadow-xl w-full sm:max-w-md p-6 space-y-6">
        <div className="space-y-1">
          <h2
            id="consent-settings-title"
            ref={titleRef}
            tabIndex={-1}
            className="text-lg font-semibold text-[var(--text-primary)] outline-none"
          >
            Configurações de privacidade
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Escolha quais categorias deseja autorizar.
          </p>
        </div>

        <div className="space-y-4">
          <Switch
            checked={prefs.analytics}
            onChange={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))}
          >
            <span className="text-sm font-medium text-[var(--text-primary)]">
              Analytics
            </span>
            <p className="text-xs text-[var(--text-secondary)]">
              Medição de audiência e comportamento na página
            </p>
          </Switch>

          <Switch
            checked={prefs.advertising}
            onChange={() =>
              setPrefs((p) => ({ ...p, advertising: !p.advertising }))
            }
          >
            <span className="text-sm font-medium text-[var(--text-primary)]">
              Publicidade
            </span>
            <p className="text-xs text-[var(--text-secondary)]">
              Anúncios personalizados nas plataformas de campanha
            </p>
          </Switch>
        </div>

        <button
          onClick={() => onSave(prefs)}
          className="w-full py-2.5 bg-[var(--brand)] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Salvar preferências
        </button>
      </div>
    </div>
  );
}
