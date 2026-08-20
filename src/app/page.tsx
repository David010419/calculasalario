import Link from "next/link";
import { Suspense } from "react";
import Calculator from "@/components/Calculator";
import AdSlot from "@/components/AdSlot";
import FAQSection from "@/components/FAQSection";
import FaqJsonLd from "@/components/FaqJsonLd";
import NewsletterSignup from "@/components/NewsletterSignup";
import TrendingCareers from "@/components/TrendingCareers";
import { CAREERS } from "@/lib/data";

export default function Home() {
  return (
    <>
      <FaqJsonLd />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6 sm:py-14">
          <h1 className="font-heading text-2xl font-bold text-text sm:text-4xl">
            Calculadora de Salarios España 2025
            <span className="block text-primary">Estima tu sueldo por carrera</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-text-muted sm:text-base">
            Basado en datos y estudios de mercado del Ministerio de Trabajo 2024-2025. Calcula tu
            salario según tu carrera, experiencia, comunidad autónoma y sector en menos de un minuto.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <AdSlot variant="top" />

        <section aria-label="Calculadora de salario">
          <h2 className="sr-only">¿Cuánto ganas según tu profesión?</h2>
          <Suspense fallback={<div className="h-[600px]" />}>
            <Calculator />
          </Suspense>
        </section>

        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-xl font-bold text-text sm:text-2xl">
                Empleos en auge en España
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                Los trabajos con más demanda, mejor pagados y mayor proyección de crecimiento.
              </p>
            </div>
            <Link href="/empleos-en-auge" className="text-sm font-semibold text-primary hover:underline">
              Ver ranking completo →
            </Link>
          </div>
          <div className="mt-5">
            <TrendingCareers careers={CAREERS} limit={6} />
          </div>
        </section>

        <div className="mt-10">
          <NewsletterSignup />
        </div>

        <section className="mt-14">
          <h2 className="mb-4 font-heading text-xl font-bold text-text sm:text-2xl">
            Todas las profesiones disponibles
          </h2>
          <div className="flex flex-wrap gap-2">
            {CAREERS.map((career) => (
              <Link
                key={career.id}
                href={`/?carrera=${career.id}`}
                className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-secondary transition hover:border-primary hover:text-primary sm:text-sm"
              >
                {career.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-4 font-heading text-xl font-bold text-text sm:text-2xl">
            Preguntas Frecuentes
          </h2>
          <FAQSection />
        </section>

        <AdSlot variant="bottom" />
        <div className="ad-smartlink mt-2 text-center text-xs text-text-muted">
          <AdSlot variant="smartlink" />
        </div>
      </div>
    </>
  );
}
