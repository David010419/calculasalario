"use client";

import { writeConsent } from "@/lib/consent";

export default function CookieSettingsButton() {
  return (
    <button type="button" onClick={() => writeConsent("unset")} className="game-btn px-4 py-2.5 text-sm">
      🍪 Configurar cookies
    </button>
  );
}
