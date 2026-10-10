"use client";

import { useState } from "react";
import GovernmentScenarios from "./GovernmentScenarios";
import { formatEUR } from "@/lib/calculations";
import type { ScenarioId } from "@/lib/scenarios";

const MIN_BRUTO = 12000;
const MAX_BRUTO = 200000;
const SLIDER_MAX = 100000;
const QUICK_PICKS = [18000, 24000, 30000, 40000, 60000];

interface GovernmentSalaryToolProps {
  initialBruto?: number;
  initialScenario?: ScenarioId;
}

export default function GovernmentSalaryTool({
  initialBruto = 30000,
  initialScenario,
}: GovernmentSalaryToolProps) {
  const [value, setValue] = useState(String(initialBruto));
  const parsed = Number(value);
  const brutoAnual = Number.isFinite(parsed)
    ? Math.min(Math.max(parsed, MIN_BRUTO), MAX_BRUTO)
    : MIN_BRUTO;

  return (
    <div className="space-y-6">
      <div className="game-card p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <label htmlFor="bruto-anual" className="font-heading text-lg font-semibold text-text">
            🎚️ Tu salario bruto anual
          </label>
          <p className="font-heading text-3xl font-bold text-primary">{formatEUR(brutoAnual)}</p>
        </div>
        <input
          aria-label="Salario bruto anual (deslizador)"
          type="range"
          min={MIN_BRUTO}
          max={SLIDER_MAX}
          step={500}
          value={Math.min(brutoAnual, SLIDER_MAX)}
          onChange={(e) => setValue(e.target.value)}
          className="mt-4 w-full"
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            id="bruto-anual"
            type="number"
            inputMode="numeric"
            min={MIN_BRUTO}
            max={MAX_BRUTO}
            step={500}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-32 rounded-xl border-2 border-border bg-background px-3 py-2 text-base font-bold text-text outline-none focus:border-primary"
          />
          {QUICK_PICKS.map((pick) => (
            <button
              key={pick}
              type="button"
              onClick={() => setValue(String(pick))}
              className={`cursor-pointer rounded-full border-2 px-3 py-1.5 text-xs font-bold transition sm:text-sm ${
                brutoAnual === pick
                  ? "border-ink bg-sun text-[#0f172a] shadow-[2px_2px_0_var(--color-ink)]"
                  : "border-border bg-background text-secondary hover:border-primary"
              }`}
            >
              {formatEUR(pick)}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-text-muted">
          Entre 12.000 € y 200.000 €. Si no conoces tu bruto, estímalo con la calculadora por
          profesión.
        </p>
      </div>
      <GovernmentScenarios
        brutoAnual={brutoAnual}
        initialScenario={initialScenario}
        hideMethodologyLink
      />
    </div>
  );
}
