import type { Metadata } from "next";
import Link from "next/link";
import TrendingCareers from "@/components/TrendingCareers";
import AdSlot from "@/components/AdSlot";
import { formatEUR, formatWorkforce } from "@/lib/calculations";
import { CAREERS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Empleos en Auge España 2025 | Trabajos con Más Futuro y Mejor Pagados",
  description:
    "Descubre los empleos con más demanda en España: qué se paga, cuánta gente se dedica a cada profesión y cuál es su proyección de crecimiento salarial 2025.",
  alternates: { canonical: "/empleos-en-auge" },
};

const topByTrend = [...CAREERS].sort((a, b) => b.trend - a.trend).slice(0, 5);
const topByWorkforce = [...CAREERS].sort((a, b) => b.workforce - a.workforce).slice(0, 3);

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Empleos en auge en España 2025",
  itemListElement: [...CAREERS]
    .sort((a, b) => b.trend - a.trend)
    .map((career, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: career.name,
      url: `https://calculadora-salarios.es/?carrera=${career.id}`,
    })),
};

export default function EmpleosEnAugePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <h1 className="font-heading text-2xl font-bold text-text sm:text-4xl">
        Empleos en auge en España 2025
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-text-muted sm:text-base">
        Un ranking de las {CAREERS.length} profesiones que cubrimos, cruzando tres cosas: cuánta
        gente se dedica a cada una, cuánto se puede llegar a ganar y cómo evoluciona el salario con
        la experiencia. Pulsa cualquier profesión para calcular tu caso concreto.
      </p>

      <div className="mt-6">
        <AdSlot variant="top" />
      </div>

      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs uppercase tracking-wide text-text-muted">Mayor tendencia 2025</p>
          <p className="mt-1.5 font-heading text-lg font-bold text-text">{topByTrend[0].name}</p>
          <p className="text-sm font-semibold text-accent">+{topByTrend[0].trend.toFixed(1)}% proyectado</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs uppercase tracking-wide text-text-muted">Techo salarial más alto</p>
          <p className="mt-1.5 font-heading text-lg font-bold text-text">
            {[...CAREERS].sort((a, b) => b.max - a.max)[0].name}
          </p>
          <p className="text-sm font-semibold text-primary">
            hasta {formatEUR([...CAREERS].sort((a, b) => b.max - a.max)[0].max)}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs uppercase tracking-wide text-text-muted">Profesión más común</p>
          <p className="mt-1.5 font-heading text-lg font-bold text-text">{topByWorkforce[0].name}</p>
          <p className="text-sm font-semibold text-secondary">
            ≈ {formatWorkforce(topByWorkforce[0].workforce)} profesionales
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-bold text-text sm:text-2xl">
          Ranking completo por categoría
        </h2>
        <p className="mt-1 text-sm text-text-muted">
          Cambia de pestaña para ver quién manda en cada criterio.
        </p>
        <div className="mt-5">
          <TrendingCareers careers={CAREERS} />
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-heading text-lg font-semibold text-text sm:text-xl">
          ¿Cómo interpretar este ranking?
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-text-muted">
          <p>
            <strong className="text-text">En auge:</strong> profesiones cuya banda salarial está
            creciendo más rápido según la tendencia proyectada para 2025. Suelen coincidir con
            sectores con déficit de talento, como tecnología, sanidad y oficios especializados.
          </p>
          <p>
            <strong className="text-text">Mejor pagados:</strong> ordenados por el punto medio de su
            rango salarial. Un salario medio alto no siempre implica facilidad de acceso: muchas de
            estas profesiones requieren años de especialización.
          </p>
          <p>
            <strong className="text-text">Más comunes:</strong> profesiones con más profesionales
            activos estimados en España. Mayor volumen suele significar mercado laboral más líquido,
            aunque también más competencia por cada vacante.
          </p>
          <p>
            <strong className="text-text">Mayor progresión:</strong> la diferencia porcentual entre
            el salario de entrada (junior) y el techo (expert) de cada carrera. Cuanto mayor el
            porcentaje, más margen de crecimiento salarial a lo largo de la carrera.
          </p>
        </div>
      </section>

      <div className="mt-10 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6 text-center">
        <p className="font-heading text-lg font-semibold text-text">
          ¿Quieres saber cuánto podrías ganar tú?
        </p>
        <Link
          href="/"
          className="mt-3 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Ir a la calculadora →
        </Link>
      </div>

      <AdSlot variant="bottom" />
    </div>
  );
}
