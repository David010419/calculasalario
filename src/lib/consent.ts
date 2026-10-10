export type Consent = "accepted" | "rejected" | "unset";

const KEY = "cookie-consent";
const EVENT = "cookie-consent-change";

export function readConsent(): Consent {
  try {
    const value = localStorage.getItem(KEY);
    return value === "accepted" || value === "rejected" ? value : "unset";
  } catch {
    return "unset";
  }
}

export function writeConsent(value: Consent) {
  try {
    if (value === "unset") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, value);
  } catch {
    /* almacenamiento no disponible */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeConsent(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
