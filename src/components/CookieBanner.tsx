"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { readConsent, subscribeConsent, writeConsent } from "@/lib/consent";

export default function CookieBanner() {
  // En el servidor se da por respondido para no pintar el aviso antes de leer la elección guardada.
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => "accepted" as const);
  if (consent !== "unset") return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border-2 border-ink bg-surface p-4 shadow-[5px_5px_0_var(--color-ink)] dark:border-border sm:p-5"
    >
      <p className="font-heading text-lg font-semibold text-text">🍪 Cookies</p>
      <p className="mt-1 text-sm text-text-muted">
        Usamos almacenamiento técnico para que la web funcione y, si aceptas, cookies de terceros
        para mostrar publicidad. Puedes cambiar tu elección cuando quieras en la{" "}
        <Link href="/politica-de-cookies" className="font-bold text-primary hover:underline">
          política de cookies
        </Link>
        .
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => writeConsent("accepted")}
          className="game-btn px-5 py-2.5 text-sm"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => writeConsent("rejected")}
          className="game-btn px-5 py-2.5 text-sm"
          style={{ background: "var(--color-surface)", color: "var(--color-text)" }}
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
