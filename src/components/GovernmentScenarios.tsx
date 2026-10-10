"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AnimatedNumber from "./AnimatedNumber";
import ShareResults from "./ShareResults";
import { calcBreakdown, formatEUR } from "@/lib/calculations";
import { SCENARIOS, type ScenarioId } from "@/lib/scenarios";

interface GovernmentScenariosProps {
  brutoAnual: number;
  initialScenario?: ScenarioId;
  /** Oculta el enlace a la página de metodología (cuando ya estamos en ella). */
  hideMethodologyLink?: boolean;
}

const HIJOS_OPTIONS = [0, 1, 2, 3, 4];

function formatDiff(value: number): string {
  if (value === 0) return "0 €";
  return `${value > 0 ? "+" : "−"}${formatEUR(Math.abs(value))}`;
}

function diffClass(value: number): string {
  if (value > 0) return "bg-accent/15 text-accent";
  if (value < 0) return "bg-red-500/15 text-red-600 dark:text-red-400";
  return "bg-background text-text-muted";
}

export default function GovernmentScenarios({
  brutoAnual,
  initialScenario = "pp",
  hideMethodologyLink = false,
}: GovernmentScenariosProps) {
  const [selectedId, setSelectedId] = useState<ScenarioId>(initialScenario);
  const [hijos, setHijos] = useState(0);

  const rows = useMemo(() => {
    const actual = calcBreakdown(brutoAnual, "actual", hijos);
    return SCENARIOS.map((scenario) => {
      const breakdown = calcBreakdown(brutoAnual, scenario.id, hijos);
      return {
        scenario,
        breakdown,
        diffMensual: breakdown.netoMensual - actual.netoMensual,
        diffAnual: breakdown.netoAnual - actual.netoAnual,
      };
    });
  }, [brutoAnual, hijos]);

  const selected = rows.find((r) => r.scenario.id === selectedId) ?? rows[0];
  const isActual = selected.scenario.id === "actual";
  const maxNeto = Math.max(...rows.map((r) => r.breakdown.netoMensual));
  const maxIrpf = Math.max(...rows.map((r) => r.breakdown.irpf), 1);

  return (
    <section className="game-card overflow-hidden">
      <div className="game-hero px-5 py-5 sm:px-6">
        <span className="game-chip px-2.5 py-0.5 text-xs">🗳️ Modo elecciones 29-N</span>
        <h2 className="text-outline mt-2 font-heading text-2xl font-bold sm:text-3xl">
          ¿Cuánto cobrarías si cambia el gobierno?
        </h2>
        <p className="mt-1 text-sm font-semibold text-white/90">
          Tu sueldo de {formatEUR(brutoAnual)} brutos con el IRPF de cada partido. Elige jugador.
        </p>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-text">👶 Hijos a cargo</span>
          <div className="flex gap-1.5" role="group" aria-label="Hijos a cargo">
            {HIJOS_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={hijos === n}
                onClick={() => setHijos(n)}
                className={`h-9 min-w-9 cursor-pointer rounded-xl border-2 px-2 font-heading text-sm font-semibold transition ${
                  hijos === n
                    ? "border-ink bg-sun text-[#0f172a] shadow-[2px_2px_0_var(--color-ink)]"
                    : "border-border bg-background text-secondary hover:border-primary"
                }`}
              >
                {n === 4 ? "4+" : n}
              </button>
            ))}
          </div>
        </div>

        {/* Selección de partido */}
        <div
          className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4"
          role="group"
          aria-label="Elige un partido"
        >
          {rows.map(({ scenario, breakdown, diffMensual }) => {
            const active = scenario.id === selectedId;
            const best = breakdown.netoMensual === maxNeto && diffMensual > 0;
            return (
              <button
                key={scenario.id}
                type="button"
                aria-pressed={active}
                aria-label={scenario.buttonLabel}
                onClick={() => setSelectedId(scenario.id)}
                className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 bg-surface text-left transition ${
                  active
                    ? "-translate-y-1 border-ink shadow-[4px_4px_0_var(--color-ink)] dark:border-white"
                    : "border-border hover:-translate-y-0.5 hover:border-primary"
                }`}
              >
                <span
                  className="flex items-center justify-between px-3 py-1.5 font-heading text-sm font-semibold text-white"
                  style={{ backgroundColor: scenario.badgeColor }}
                >
                  {scenario.party}
                  {scenario.id === "actual" && (
                    <span className="text-[10px] uppercase tracking-wide">Hoy</span>
                  )}
                  {best && <span aria-label="Más neto para ti">👑</span>}
                </span>
                <span className="block px-3 pb-3 pt-2">
                  <span className="block font-heading text-xl font-bold text-text sm:text-2xl">
                    {formatEUR(breakdown.netoMensual)}
                  </span>
                  <span className="block text-[11px] font-semibold text-text-muted">neto al mes</span>
                  <span
                    className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-xs font-bold ${diffClass(diffMensual)}`}
                  >
                    {scenario.id === "actual" ? "ley actual" : `${formatDiff(diffMensual)}/mes`}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Resultado del partido elegido */}
        <div
          key={selected.scenario.id}
          className="animate-pop-in mt-5 rounded-2xl border-2 border-border bg-background p-4 sm:p-5"
        >
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-primary">
            {selected.scenario.buttonLabel}
          </p>
          <div className="mt-1 flex flex-wrap items-end gap-x-6 gap-y-2">
            <p className="font-heading text-5xl font-bold text-text sm:text-6xl">
              <AnimatedNumber
                value={selected.breakdown.netoMensual}
                formatter={formatEUR}
                durationMs={500}
              />
              <span className="ml-2 text-base font-semibold text-text-muted">/mes</span>
            </p>
            {!isActual && (
              <p
                className={`rounded-xl px-3 py-1.5 font-heading text-lg font-bold ${diffClass(selected.diffMensual)}`}
              >
                {formatDiff(selected.diffAnual)} al año
              </p>
            )}
          </div>
          <a href="#compartir" className="game-btn game-btn-sun mt-3 px-4 py-2 text-sm">
            📣 Compartir mi resultado
          </a>
          <p className="mt-1 text-xs font-semibold text-text-muted">
            Neto mensual en 12 pagas · IRPF anual {formatEUR(selected.breakdown.irpf)} · retención
            total {selected.breakdown.tipoEfectivo}%
          </p>

          {!isActual && selected.diffAnual === 0 && (
            <p className="mt-3 rounded-xl bg-sun/40 px-3 py-2 text-sm font-bold text-text">
              🤷 Con tu salario esta propuesta no cambia lo que cobras.
            </p>
          )}

          <p className="mt-4 text-sm font-semibold text-text">{selected.scenario.summary}</p>
          <ul className="mt-2 space-y-1.5 text-sm text-text-muted">
            {selected.scenario.measures.map((measure) => (
              <li key={measure} className="flex gap-2">
                <span aria-hidden="true">⚡</span>
                <span>{measure}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-text-muted">
            Fuente:{" "}
            <a
              href={selected.scenario.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              {selected.scenario.source.label}
            </a>{" "}
            ({selected.scenario.source.date}).
          </p>
        </div>

        <ShareResults
          brutoAnual={brutoAnual}
          hijos={hijos}
          rows={rows.map(({ scenario, breakdown, diffMensual }) => ({
            id: scenario.id,
            party: scenario.party,
            emoji: scenario.emoji,
            color: scenario.badgeColor,
            netoMensual: breakdown.netoMensual,
            diffMensual,
          }))}
        />

        {/* IRPF que pagarías con cada uno */}
        <h3 className="mt-6 font-heading text-lg font-semibold text-text">
          💰 IRPF que pagarías al año
        </h3>
        <div className="mt-3 space-y-2.5">
          {rows.map(({ scenario, breakdown }) => (
            <div key={scenario.id} className="flex items-center gap-3">
              <span className="w-14 shrink-0 text-sm font-bold text-text">{scenario.party}</span>
              <div className="h-6 flex-1 overflow-hidden rounded-full border-2 border-border bg-background">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.max((breakdown.irpf / maxIrpf) * 100, breakdown.irpf > 0 ? 2 : 0)}%`,
                    backgroundColor: scenario.color,
                  }}
                />
              </div>
              <span className="w-20 shrink-0 text-right text-sm font-bold text-text">
                {formatEUR(breakdown.irpf)}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs leading-relaxed text-text-muted">
          Simulación orientativa e independiente, sin vinculación con ningún partido. Son propuestas
          publicadas, no leyes aprobadas, y solo se modeliza el IRPF sobre el salario: no incluye
          otros impuestos, cotizaciones ni el efecto sobre el gasto público.{" "}
          {!hideMethodologyLink && (
            <Link href="/salario-segun-gobierno" className="font-bold text-primary hover:underline">
              Ver metodología y fuentes →
            </Link>
          )}
        </p>
      </div>
    </section>
  );
}
