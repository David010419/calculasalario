"use client";

import AnimatedNumber from "./AnimatedNumber";
import ComparisonBars from "./ComparisonBars";
import ProjectionTable from "./ProjectionTable";
import ShareButtons from "./ShareButtons";
import RelatedCareers from "./RelatedCareers";
import PdfExportButton from "./PdfExportButton";
import { formatEUR, formatPercent } from "@/lib/calculations";
import type { FullResult } from "@/lib/calculations";
import { NATIONAL_STATS } from "@/lib/data";
import type { CalculatorInput } from "@/lib/types";

interface ResultsPanelProps {
  input: CalculatorInput;
  result: FullResult;
  shareUrl: string;
  onSelectCareer: (id: string) => void;
}

const DEMAND_STYLES: Record<string, string> = {
  Alta: "bg-accent/10 text-accent",
  Media: "bg-amber-500/10 text-amber-600",
  Baja: "bg-red-500/10 text-red-500",
};

export default function ResultsPanel({ input, result, shareUrl, onSelectCareer }: ResultsPanelProps) {
  const { career, breakdown, vsNational, percentile, projection } = result;
  const isAbove = vsNational >= 0;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Card principal */}
      <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-6 text-white shadow-lg sm:p-8">
        <p className="text-sm font-medium text-blue-100">{career.name} · {input.years} años de experiencia</p>
        <p className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
          <AnimatedNumber value={breakdown.brutoAnual} formatter={formatEUR} />
        </p>
        <p className="text-sm text-blue-100">salario bruto anual estimado</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/20 pt-4">
          <div>
            <p className="text-lg font-semibold sm:text-xl">
              <AnimatedNumber value={breakdown.netoMensual} formatter={formatEUR} />
            </p>
            <p className="text-xs text-blue-100">neto mensual (12 pagas)</p>
          </div>
          <div>
            <p className={`text-lg font-semibold sm:text-xl ${isAbove ? "text-emerald-300" : "text-amber-200"}`}>
              {formatPercent(vsNational)}
            </p>
            <p className="text-xs text-blue-100">vs. media nacional</p>
          </div>
          <div>
            <p className="text-lg font-semibold sm:text-xl">Top {100 - percentile}%</p>
            <p className="text-xs text-blue-100">de profesionales en España</p>
          </div>
        </div>
      </div>

      <p className="rounded-xl bg-accent/10 px-4 py-3 text-sm font-medium text-accent">
        Estás por encima del {percentile}% de los profesionales de España en ingresos estimados. En 5 años
        podrías ganar hasta{" "}
        {formatEUR(projection.find((p) => p.years === 5)?.bruto ?? breakdown.brutoAnual)} con experiencia.
      </p>

      {/* Tabla desglosada */}
      <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <h2 className="mb-4 font-heading text-xl font-semibold text-text">Desglose bruto → neto</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[360px] border-collapse text-sm">
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2.5 text-text-muted">Bruto anual</td>
                <td className="py-2.5 text-right font-semibold text-text">{formatEUR(breakdown.brutoAnual)}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2.5 text-text-muted">Seguridad Social</td>
                <td className="py-2.5 text-right text-red-500">-{formatEUR(breakdown.seguridadSocial)}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2.5 text-text-muted">Retención IRPF</td>
                <td className="py-2.5 text-right text-red-500">-{formatEUR(breakdown.irpf)}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2.5 text-text-muted">Neto anual</td>
                <td className="py-2.5 text-right font-semibold text-accent">{formatEUR(breakdown.netoAnual)}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2.5 text-text-muted">Neto mensual</td>
                <td className="py-2.5 text-right font-semibold text-accent">{formatEUR(breakdown.netoMensual)}</td>
              </tr>
              <tr>
                <td className="py-2.5 text-text-muted">Tipo de retención efectivo</td>
                <td className="py-2.5 text-right font-medium text-text">{breakdown.tipoEfectivo}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Comparativa */}
      <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <h2 className="mb-4 font-heading text-xl font-semibold text-text">Comparativa con el mercado</h2>
        <ComparisonBars
          bars={[
            { label: "Tu salario estimado", value: breakdown.brutoAnual, highlight: true },
            { label: "Media nacional", value: NATIONAL_STATS.average },
            { label: "Percentil 25 (P25)", value: NATIONAL_STATS.percentiles[1].value },
            { label: "Percentil 75 (P75)", value: NATIONAL_STATS.percentiles[3].value },
          ]}
        />
      </section>

      {/* Proyección */}
      <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <h2 className="mb-4 font-heading text-xl font-semibold text-text">Proyección de carrera (5-10 años)</h2>
        <ProjectionTable current={breakdown.brutoAnual} projection={projection} />
      </section>

      {/* Info adicional */}
      <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <h2 className="mb-4 font-heading text-xl font-semibold text-text">Mercado laboral</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-background p-4">
            <p className="text-xs uppercase tracking-wide text-text-muted">Demanda laboral</p>
            <span className={`mt-1.5 inline-block rounded-full px-2.5 py-1 text-sm font-semibold ${DEMAND_STYLES[career.demand]}`}>
              {career.demand}
            </span>
          </div>
          <div className="rounded-xl bg-background p-4">
            <p className="text-xs uppercase tracking-wide text-text-muted">Tendencia salarial 2025</p>
            <p className="mt-1.5 text-lg font-semibold text-accent">{formatPercent(career.trend)}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <RelatedCareers careerIds={career.related} onSelect={onSelectCareer} />
      </section>

      <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ShareButtons careerName={career.name} netoMensual={breakdown.netoMensual} shareUrl={shareUrl} />
          <PdfExportButton input={input} result={result} />
        </div>
      </section>
    </div>
  );
}
