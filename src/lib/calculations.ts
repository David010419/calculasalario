import { NATIONAL_STATS, getCCAA, getCareer, getSector } from "./data";
import type {
  CalculatorInput,
  Career,
  LevelId,
  ProjectionPoint,
  SalaryBreakdown,
} from "./types";

const LEVEL_TARGET: Record<LevelId, number> = {
  junior: 0.15,
  senior: 0.55,
  expert: 0.9,
};

/** Posición 0-1 dentro del rango salarial de la carrera, combinando años y nivel. */
export function seniorityScore(years: number, level: LevelId): number {
  const yearsScore = Math.min(Math.max(years, 0), 30) / 30;
  const levelScore = LEVEL_TARGET[level];
  return Math.min(Math.max(yearsScore * 0.5 + levelScore * 0.5, 0), 1);
}

export function calcGrossAnnual(input: CalculatorInput): number {
  const career = getCareer(input.careerId);
  const ccaa = getCCAA(input.ccaaId);
  const sector = getSector(input.sectorId);
  if (!career || !ccaa || !sector) return 0;

  const score = seniorityScore(input.years, input.levelId);
  const base = career.min + (career.max - career.min) * score;
  const withModifiers = base * (1 + ccaa.modifier) * (1 + sector.modifier);

  return Math.round(withModifiers / 50) * 50;
}

const SS_RATE = 0.0635;
const SS_MAX_BASE = 56646; // tope base cotización 2024
const MINIMO_PERSONAL = 5550;

const IRPF_BRACKETS = [
  { upTo: 12450, rate: 0.19 },
  { upTo: 20200, rate: 0.24 },
  { upTo: 35200, rate: 0.30 },
  { upTo: 60000, rate: 0.37 },
  { upTo: 300000, rate: 0.45 },
  { upTo: Infinity, rate: 0.47 },
];

export function calcIRPF(taxableBase: number): number {
  if (taxableBase <= 0) return 0;
  let remaining = taxableBase;
  let lower = 0;
  let irpf = 0;

  for (const bracket of IRPF_BRACKETS) {
    const bracketSize = bracket.upTo - lower;
    const taxedInBracket = Math.min(remaining, bracketSize);
    if (taxedInBracket <= 0) break;
    irpf += taxedInBracket * bracket.rate;
    remaining -= taxedInBracket;
    lower = bracket.upTo;
    if (remaining <= 0) break;
  }

  return irpf;
}

export function calcBreakdown(brutoAnual: number): SalaryBreakdown {
  const seguridadSocial = Math.min(brutoAnual, SS_MAX_BASE) * SS_RATE;
  const taxableBase = Math.max(0, brutoAnual - seguridadSocial - MINIMO_PERSONAL);
  const irpf = calcIRPF(taxableBase);
  const netoAnual = brutoAnual - seguridadSocial - irpf;
  const netoMensual = netoAnual / 12;
  const tipoEfectivo = brutoAnual > 0 ? ((seguridadSocial + irpf) / brutoAnual) * 100 : 0;

  return {
    brutoAnual,
    seguridadSocial: Math.round(seguridadSocial),
    irpf: Math.round(irpf),
    netoAnual: Math.round(netoAnual),
    netoMensual: Math.round(netoMensual),
    tipoEfectivo: Math.round(tipoEfectivo * 10) / 10,
  };
}

export function percentileForSalary(salary: number): number {
  const points = NATIONAL_STATS.percentiles;
  if (salary <= points[0].value) return points[0].p;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (salary >= a.value && salary <= b.value) {
      const ratio = (salary - a.value) / (b.value - a.value);
      return Math.round(a.p + ratio * (b.p - a.p));
    }
  }
  return points[points.length - 1].p;
}

export function comparisonVsNational(brutoAnual: number): number {
  return Math.round(((brutoAnual - NATIONAL_STATS.average) / NATIONAL_STATS.average) * 1000) / 10;
}

function annualGrowthRate(totalExperience: number): number {
  if (totalExperience < 5) return 0.06;
  if (totalExperience < 15) return 0.035;
  return 0.02;
}

export function projectCareer(
  currentGross: number,
  currentYears: number,
  horizons: number[] = [1, 3, 5, 10]
): ProjectionPoint[] {
  const points: ProjectionPoint[] = [];
  let salary = currentGross;
  let expAtYear = currentYears;
  let simulatedYear = 0;

  const maxHorizon = Math.max(...horizons);
  for (let y = 1; y <= maxHorizon; y++) {
    const rate = annualGrowthRate(expAtYear);
    salary = salary * (1 + rate);
    expAtYear += 1;
    simulatedYear = y;
    if (horizons.includes(y)) {
      points.push({
        label: `Año ${simulatedYear}`,
        years: y,
        bruto: Math.round(salary / 50) * 50,
      });
    }
  }
  return points;
}

export function growthPotential(career: Career): number {
  return Math.round(((career.max - career.min) / career.min) * 100);
}

export function formatWorkforce(thousands: number): string {
  return new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(thousands * 1000);
}

export function formatEUR(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export interface FullResult {
  career: Career;
  breakdown: SalaryBreakdown;
  vsNational: number;
  percentile: number;
  projection: ProjectionPoint[];
}

export function computeFullResult(input: CalculatorInput): FullResult | null {
  const career = getCareer(input.careerId);
  if (!career) return null;

  const brutoAnual = calcGrossAnnual(input);
  const breakdown = calcBreakdown(brutoAnual);
  const vsNational = comparisonVsNational(brutoAnual);
  const percentile = percentileForSalary(brutoAnual);
  const projection = projectCareer(brutoAnual, input.years);

  return { career, breakdown, vsNational, percentile, projection };
}
