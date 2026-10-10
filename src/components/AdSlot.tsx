"use client";

import { useEffect, useSyncExternalStore } from "react";
import { readConsent, subscribeConsent } from "@/lib/consent";
import { ADSENSE_CLIENT } from "@/lib/site";

interface AdSlotProps {
  variant: "top" | "middle" | "bottom";
  className?: string;
}

// Identificador de cada bloque de anuncios, creado en el panel de AdSense.
const SLOT_IDS: Record<AdSlotProps["variant"], string | undefined> = {
  top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP,
  middle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE,
  bottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM,
};

/**
 * Bloque de Google AdSense. No pinta nada hasta que existan NEXT_PUBLIC_ADSENSE_CLIENT y el
 * identificador del bloque, ni antes de que el usuario acepte las cookies de publicidad.
 */
export default function AdSlot({ variant, className = "" }: AdSlotProps) {
  const slot = SLOT_IDS[variant];
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => "unset" as const);
  const enabled = Boolean(ADSENSE_CLIENT && slot) && consent === "accepted";

  useEffect(() => {
    if (!enabled) return;
    try {
      const win = window as typeof window & { adsbygoogle?: unknown[] };
      (win.adsbygoogle = win.adsbygoogle || []).push({});
    } catch {
      /* bloqueador de anuncios o script no cargado */
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={`ad-container-${variant} mx-auto my-6 w-full ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
