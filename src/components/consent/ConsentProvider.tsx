"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { loadConsent, saveConsent, applyConsent } from "@/lib/consent";
import type { ConsentPreferences } from "@/lib/consent";
import { ConsentBanner } from "./ConsentBanner";
import { ConsentSettings } from "./ConsentSettings";

interface ConsentContextType {
  openSettings: () => void;
  consent: ConsentPreferences | null;
}

const ConsentContext = createContext<ConsentContextType>({
  openSettings: () => {},
  consent: null,
});

export function useConsent() {
  return useContext(ConsentContext);
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);

  useEffect(() => {
    const saved = loadConsent();
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent(saved);
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    const prefs: ConsentPreferences = { analytics: true, advertising: true };
    saveConsent(prefs);
    applyConsent(prefs);
    setConsent(prefs);
    setShowBanner(false);
  }, []);

  const handleRejectOptional = useCallback(() => {
    const prefs: ConsentPreferences = { analytics: false, advertising: false };
    saveConsent(prefs);
    applyConsent(prefs);
    setConsent(prefs);
    setShowBanner(false);
  }, []);

  const handleSaveSettings = useCallback((prefs: ConsentPreferences) => {
    saveConsent(prefs);
    applyConsent(prefs);
    setConsent(prefs);
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  const openSettings = useCallback(() => setShowSettings(true), []);
  const closeSettings = useCallback(() => setShowSettings(false), []);

  return (
    <ConsentContext.Provider value={{ openSettings, consent }}>
      {children}
      {showBanner && (
        <ConsentBanner
          onAcceptAll={handleAcceptAll}
          onRejectOptional={handleRejectOptional}
          onOpenSettings={openSettings}
        />
      )}
      {showSettings && (
        <ConsentSettings
          initial={consent ?? { analytics: false, advertising: false }}
          onSave={handleSaveSettings}
          onClose={closeSettings}
        />
      )}
    </ConsentContext.Provider>
  );
}
