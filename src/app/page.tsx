import Link from "next/link";
import { Suspense } from "react";
import Calculator from "@/components/Calculator";
import AdSlot from "@/components/AdSlot";
import AdvertiseBanner from "@/components/AdvertiseBanner";
import CampaignBanner from "@/components/CampaignBanner";
import FAQSection from "@/components/FAQSection";
import FaqJsonLd from "@/components/FaqJsonLd";
import GuideCard from "@/components/GuideCard";
import PartyBadge from "@/components/PartyBadge";
import TrendingCareers from "@/components/TrendingCareers";
import { CAREERS } from "@/lib/data";
import { getGuide, type Guide } from "@/lib/guides";
import { SCENARIOS } from "@/lib/scenarios";

const FEATURED_GUIDES = [
  "como-conseguir-empleo-en-espana",
  "que-estudiar-segun-el-empleo",
  "como-leer-tu-nomina",
  "como-negociar-el-sueldo",
  "formacion-profesional-grados-y-salidas",
  "tramos-irpf-2026",
]
  .map(getGuide)
  .filter((guide): guide is Guide => Boolean(guide));

export default function Home() {
  return (
    <>
      <FaqJsonLd />

      {/* Hero */}
      <section className="game-hero relative overflow-hidden border-b-2 border-ink">
        <span aria-hidden="true" className="animate-float absolute left-[6%] top-8 text-4xl sm:text-5xl">
          💸
        </span>
        <span
          aria-hidden="true"
          className="animate-float absolute right-[8%] top-12 text-4xl [animation-delay:1.2s] sm:text-5xl"
        >
          🪙
        </span>
        <span
          aria-hidden="true"
          className="animate-float absolute bottom-6 right-[22%] hidden text-4xl [animation-delay:2s] sm:block"
        >
          🚀
        </span>
        <div className="relative mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <span className="game-chip px-3 py-1 text-xs sm:text-sm">
            ⚡ Gratis · sin registro · en 1 minuto
          </span>
          <h1 className="text-outline mt-4 font-heading text-4xl font-bold leading-tight sm:text-6xl">
            ¿Cuánto <span className="text-sun">deberías</span> cobrar?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold text-white/90 sm:text-lg">
            Calculadora de salarios España 2026: elige tu carrera, tu experiencia y tu comunidad, y
            descubre tu sueldo bruto, tu neto y en qué nivel estás.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#calculadora" className="game-btn game-btn-sun px-5 py-3 text-base">
              🎮 Empezar partida
            </a>
            <Link href="/salario-segun-gobierno" className="game-btn px-5 py-3 text-base">
              🗳️ Modo elecciones 29-N
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Banner simulador electoral */}
        <Link
          href="/salario-segun-gobierno"
          className="game-hero group relative mb-8 block overflow-hidden rounded-[1.25rem] border-2 border-ink shadow-[6px_6px_0_var(--color-ink)] transition hover:-translate-y-1"
        >
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="game-chip px-3 py-1 text-xs sm:text-sm">
                🗳️ Nuevo · Elecciones generales 29-N
              </span>
              <p className="text-outline mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                Calcula tu salario según el <span className="text-sun">cambio de gobierno</span>
              </p>
              <p className="mt-2 max-w-xl text-base font-semibold text-white/90">
                Elige partido, mira cuánto cobrarías al mes con su IRPF y compártelo.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="game-btn game-btn-sun animate-nudge px-6 py-3.5 text-lg">
                  Comparar partidos →
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 bg-black px-4 py-2 font-heading text-sm font-semibold text-white">
                  <span aria-hidden="true" className="text-base">𝕏</span>
                  Comparte tu resultado por X
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 bg-[#128c7e] px-4 py-2 font-heading text-sm font-semibold text-white">
                  <span aria-hidden="true">💬</span>
                  y por WhatsApp
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 lg:grid-cols-2">
              {SCENARIOS.map((scenario, i) => (
                <PartyBadge
                  key={scenario.id}
                  scenario={scenario}
                  className="animate-float"
                  style={{ animationDelay: `${i * 0.6}s` }}
                />
              ))}
            </div>
          </div>
        </Link>

        <AdSlot variant="top" />

        <section id="calculadora" aria-label="Calculadora de salario" className="scroll-mt-24">
          <h2 className="sr-only">¿Cuánto ganas según tu profesión?</h2>
          <Suspense fallback={<div className="h-[600px]" />}>
            <Calculator />
          </Suspense>
        </section>

        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-2xl font-bold text-text sm:text-3xl">
                🔥 Empleos en auge en España
              </h2>
              <p className="mt-1 text-sm font-semibold text-text-muted">
                Los trabajos con más demanda, mejor pagados y mayor proyección de crecimiento.
              </p>
            </div>
            <Link href="/empleos-en-auge" className="text-sm font-bold text-primary hover:underline">
              Ver ranking completo →
            </Link>
          </div>
          <div className="mt-5">
            <TrendingCareers careers={CAREERS} limit={6} />
          </div>
        </section>

        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-2xl font-bold text-text sm:text-3xl">
                📚 Guías para cobrar mejor y encontrar trabajo
              </h2>
              <p className="mt-1 text-sm font-semibold text-text-muted">
                Nómina e impuestos, búsqueda de empleo y formación, explicado sin jerga.
              </p>
            </div>
            <Link href="/guias" className="text-sm font-bold text-primary hover:underline">
              Ver todas las guías →
            </Link>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_GUIDES.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>

        <CampaignBanner />

        <section className="mt-14">
          <h2 className="mb-4 font-heading text-2xl font-bold text-text sm:text-3xl">
            🎯 Todas las profesiones disponibles
          </h2>
          <div className="flex flex-wrap gap-2">
            {CAREERS.map((career) => (
              <Link
                key={career.id}
                href={`/?carrera=${career.id}`}
                className="rounded-full border-2 border-border bg-surface px-3.5 py-1.5 text-xs font-bold text-secondary transition hover:-translate-y-0.5 hover:border-primary hover:text-primary sm:text-sm"
              >
                {career.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-4 font-heading text-2xl font-bold text-text sm:text-3xl">
            ❓ Preguntas frecuentes
          </h2>
          <FAQSection />
        </section>

        <AdSlot variant="bottom" />

        <AdvertiseBanner />
      </div>
    </>
  );
}
