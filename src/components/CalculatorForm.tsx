"use client";

import { CAREERS, CCAAS, LEVELS, SECTORS } from "@/lib/data";
import type { CalculatorInput, LevelId, SectorId } from "@/lib/types";

interface CalculatorFormProps {
  input: CalculatorInput;
  onChange: (input: CalculatorInput) => void;
  onSubmit: () => void;
}

export default function CalculatorForm({ input, onChange, onSubmit }: CalculatorFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
    >
      <div>
        <label htmlFor="carrera" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-text-muted sm:text-sm">
          Carrera / Profesión
        </label>
        <select
          id="carrera"
          value={input.careerId}
          onChange={(e) => onChange({ ...input, careerId: e.target.value })}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-base"
        >
          {CAREERS.map((career) => (
            <option key={career.id} value={career.id}>
              {career.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="experiencia" className="mb-1.5 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-text-muted sm:text-sm">
          <span>Años de experiencia</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary normal-case">
            {input.years} {input.years === 1 ? "año" : "años"}
          </span>
        </label>
        <input
          id="experiencia"
          type="range"
          min={0}
          max={30}
          step={1}
          value={input.years}
          onChange={(e) => onChange({ ...input, years: Number(e.target.value) })}
          className="w-full accent-primary"
        />
        <div className="mt-1 flex justify-between text-[11px] text-text-muted">
          <span>0</span>
          <span>15</span>
          <span>30</span>
        </div>
      </div>

      <div>
        <label htmlFor="ccaa" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-text-muted sm:text-sm">
          Comunidad Autónoma
        </label>
        <select
          id="ccaa"
          value={input.ccaaId}
          onChange={(e) => onChange({ ...input, ccaaId: e.target.value })}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-base"
        >
          {CCAAS.map((ccaa) => (
            <option key={ccaa.id} value={ccaa.id}>
              {ccaa.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sector" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-text-muted sm:text-sm">
          Sector
        </label>
        <select
          id="sector"
          value={input.sectorId}
          onChange={(e) => onChange({ ...input, sectorId: e.target.value as SectorId })}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-base"
        >
          {SECTORS.map((sector) => (
            <option key={sector.id} value={sector.id}>
              {sector.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-text-muted sm:text-sm">
          Nivel de especialización
        </span>
        <div className="grid grid-cols-3 gap-2">
          {LEVELS.map((level) => {
            const active = input.levelId === level.id;
            return (
              <label
                key={level.id}
                className={`cursor-pointer rounded-lg border px-2 py-2.5 text-center text-sm font-medium transition ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-secondary hover:border-primary/50"
                }`}
              >
                <input
                  type="radio"
                  name="nivel"
                  value={level.id}
                  checked={active}
                  onChange={() => onChange({ ...input, levelId: level.id as LevelId })}
                  className="sr-only"
                />
                {level.name}
              </label>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-primary-dark active:scale-[0.99] cursor-pointer"
      >
        Calcular mi salario
      </button>
    </form>
  );
}
