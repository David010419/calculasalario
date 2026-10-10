"use client";

import { useEffect, useSyncExternalStore } from "react";
import { readConsent, subscribeConsent } from "@/lib/consent";
import { ADSENSE_CLIENT } from "@/lib/site";

const SCRIPT_ID = "adsense-script";

/** Carga el script de AdSense solo si hay cuenta configurada y el usuario ha aceptado las cookies. */
export default function AdSenseLoader() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => "unset" as const);

  useEffect(() => {
    if (!ADSENSE_CLIENT || consent !== "accepted") return;
    if (document.getElementById(SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    document.head.appendChild(script);
  }, [consent]);

  return null;
}
