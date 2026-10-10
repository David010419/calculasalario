import Link from "next/link";
import type { ReactNode } from "react";
import { formatEUR } from "@/lib/calculations";
import { HUB_PATH, formatSigned, type Faq, type ScenarioRow } from "@/lib/government-seo";
import { SCENARIOS } from "@/lib/scenarios";
import { salarySlug } from "@/lib/seo-pages";

export function GovHero({
  crumbs,
  title,
  children,
}: {
  crumbs: { name: string; path: string }[];
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="game-hero relative overflow-hidden border-b-2 border-ink">
      <span aria-hidden="true" className="animate-float absolute right-[6%] top-8 text-4xl sm:text-6xl">
        🗳️
      </span>
      <span
        aria-hidden="true"
        className="animate-float absolute bottom-6 left-[4%] hidden text-4xl [animation-delay:1.5s] lg:block"
      >
        💶
      </span>
      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <nav aria-label="Migas de pan" className="text-xs font-bold text-white/80">
          {crumbs.map((crumb, i) => (
            <span key={crumb.path}>
              {i > 0 && " › "}
              {i < crumbs.length - 1 ? (
                <Link href={crumb.path} className="hover:underline">
                  {crumb.name}
                </Link>
              ) : (
                <span aria-current="page">{crumb.name}</span>
              )}
            </span>
          ))}
        </nav>
        <span className="game-chip mt-4 px-3 py-1 text-xs sm:text-sm">
          Elecciones generales · 29 de noviembre de 2026
        </span>
        <h1 className="text-outline mt-3 font-heading text-3xl font-bold leading-tight sm:text-5xl">
          {title}
        </h1>
        <div className="mt-3 max-w-2xl text-base font-semibold text-white/90">{children}</div>
      </div>
    </section>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-14 font-heading text-2xl font-bold text-text sm:text-3xl">{children}</h2>
  );
}

function diffTone(value: number): string {
  if (value > 0) return "text-accent";
  if (value < 0) return "text-red-600 dark:text-red-400";
  return "text-text-muted";
}

export function ScenarioTable({ rows, caption }: { rows: ScenarioRow[]; caption: string }) {
  return (
    <div className="game-card mt-4 overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b-2 border-border text-xs uppercase tracking-wide text-text-muted">
            <th scope="col" className="px-4 py-3 text-left font-bold">Si gobierna</th>
            <th scope="col" className="px-4 py-3 text-right font-bold">IRPF anual</th>
            <th scope="col" className="px-4 py-3 text-right font-bold">Neto 12 pagas</th>
            <th scope="col" className="px-4 py-3 text-right font-bold">Neto 14 pagas</th>
            <th scope="col" className="px-4 py-3 text-right font-bold">Diferencia</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.scenario.id} className="border-b border-border last:border-0">
              <th scope="row" className="px-4 py-3 text-left">
                <span
                  className="inline-block rounded-full px-2.5 py-0.5 font-heading text-xs font-semibold text-white"
                  style={{ backgroundColor: row.scenario.badgeColor }}
                >
                  {row.scenario.id === "actual" ? "PSOE · hoy" : row.scenario.party}
                </span>
              </th>
              <td className="px-4 py-3 text-right text-text-muted">{formatEUR(row.irpf)}</td>
              <td className="px-4 py-3 text-right font-heading text-base font-bold text-text">
                {formatEUR(row.netoMensual)}
              </td>
              <td className="px-4 py-3 text-right text-text">{formatEUR(row.neto14)}</td>
              <td className={`px-4 py-3 text-right font-bold ${diffTone(row.diffMensual)}`}>
                {row.scenario.id === "actual" ? "—" : `${formatSigned(row.diffMensual)}/mes`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SalaryLinkGrid({ salaries, current }: { salaries: number[]; current?: number }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {salaries
        .filter((bruto) => bruto !== current)
        .map((bruto) => (
          <Link
            key={bruto}
            href={`${HUB_PATH}/${salarySlug(bruto)}`}
            className="rounded-full border-2 border-border bg-surface px-3 py-1.5 text-xs font-bold text-secondary transition hover:-translate-y-0.5 hover:border-primary hover:text-primary sm:text-sm"
          >
            {formatEUR(bruto)}
          </Link>
        ))}
    </div>
  );
}

export function PartyLinks({ current }: { current?: string }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {SCENARIOS.filter((s) => s.slug !== current).map((scenario) => (
        <Link
          key={scenario.id}
          href={`${HUB_PATH}/${scenario.slug}`}
          className="overflow-hidden rounded-2xl border-2 border-border bg-surface transition hover:-translate-y-0.5 hover:border-primary"
        >
          <span
            className="block px-3 py-1.5 font-heading text-sm font-semibold text-white"
            style={{ backgroundColor: scenario.badgeColor }}
          >
            {scenario.party}
          </span>
          <span className="block px-3 py-2.5 text-xs font-bold text-secondary">
            {scenario.id === "actual" ? "Sueldo con la ley actual →" : `Sueldo si gobierna →`}
          </span>
        </Link>
      ))}
    </div>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="mt-4 space-y-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="game-card group p-4 sm:p-5">
          <summary className="cursor-pointer list-none font-heading text-base font-semibold text-text">
            <span className="mr-2 text-primary group-open:hidden">＋</span>
            <span className="mr-2 hidden text-primary group-open:inline">－</span>
            {faq.question}
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function Limitations() {
  return (
    <>
      <SectionTitle>⚠️ Letra pequeña</SectionTitle>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-text-muted">
        <li>
          Son propuestas publicadas por los partidos, no leyes aprobadas. Pueden cambiar en los
          programas electorales definitivos o en una negociación de gobierno.
        </li>
        <li>
          Usamos una escala general de referencia: el tramo autonómico real varía según tu
          comunidad.
        </li>
        <li>
          No se incluyen discapacidad, tributación conjunta, deducción por maternidad, cuota de
          solidaridad ni deducciones autonómicas.
        </li>
        <li>
          Solo se compara el IRPF sobre el salario. No se valoran el IVA, otros impuestos, las
          cotizaciones ni los cambios en servicios públicos que acompañarían a cada reforma.
        </li>
        <li>Esta herramienta es independiente y no está vinculada a ningún partido político.</li>
      </ul>
    </>
  );
}
