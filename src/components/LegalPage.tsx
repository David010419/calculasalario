import Link from "next/link";
import type { ReactNode } from "react";
import { LEGAL } from "@/lib/site";

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-heading text-xl font-semibold text-text">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-text-muted">{children}</div>
    </section>
  );
}

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-text sm:text-4xl">{title}</h1>
      <p className="mt-2 text-xs font-semibold text-text-muted">
        Última actualización: {LEGAL.lastUpdated}
      </p>
      {children}
      <nav className="mt-10 flex flex-wrap gap-4 text-sm font-bold text-primary">
        <Link href="/aviso-legal" className="hover:underline">Aviso legal</Link>
        <Link href="/politica-de-privacidad" className="hover:underline">Privacidad</Link>
        <Link href="/politica-de-cookies" className="hover:underline">Cookies</Link>
        <Link href="/" className="hover:underline">← Volver a la calculadora</Link>
      </nav>
    </div>
  );
}
