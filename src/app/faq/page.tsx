import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import FaqJsonLd from "@/components/FaqJsonLd";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Calculadora Salarios España 2025",
  description:
    "Resolvemos las dudas más comunes sobre cómo funciona la calculadora de salarios España: cálculo de IRPF, comunidades autónomas, proyección de carrera y más.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <FaqJsonLd />
      <h1 className="font-heading text-2xl font-bold text-text sm:text-3xl">Preguntas Frecuentes</h1>
      <p className="mt-2 text-sm text-text-muted sm:text-base">
        Todo lo que necesitas saber sobre cómo calculamos tu salario estimado en España.
      </p>

      <div className="mt-8">
        <AdSlot variant="top" />
      </div>

      <div className="mt-6">
        <FAQSection />
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6 text-center">
        <p className="text-sm text-text-muted">¿No encuentras respuesta a tu duda?</p>
        <Link href="/" className="mt-2 inline-block font-semibold text-primary hover:underline">
          Vuelve a la calculadora →
        </Link>
      </div>

      <AdSlot variant="bottom" />
    </div>
  );
}
