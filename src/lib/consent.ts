export const CONSENT_KEY = "anuncio_e_site_consent_v1";
export const CONSENT_VERSION = "1";

export interface ConsentPreferences {
  analytics: boolean;
  advertising: boolean;
}

export interface StoredConsent extends ConsentPreferences {
  version: string;
  timestamp: string;
}

export function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const w = window as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(args);
}

export function saveConsent(prefs: ConsentPreferences): void {
  if (typeof window === "undefined") return;
  const stored: StoredConsent = {
    ...prefs,
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(stored));
  } catch {}
}

export function loadConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.advertising !== "boolean") return null;
    return { analytics: parsed.analytics, advertising: parsed.advertising };
  } catch {
    return null;
  }
}

export function hasConsent(): boolean {
  return loadConsent() !== null;
}

export function applyConsent(prefs: ConsentPreferences): void {
  gtag("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.advertising ? "granted" : "denied",
    ad_user_data: prefs.advertising ? "granted" : "denied",
    ad_personalization: prefs.advertising ? "granted" : "denied",
  });
}
