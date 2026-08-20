export type LevelId = "junior" | "senior" | "expert";

export type SectorId =
  | "publico"
  | "privado"
  | "startup"
  | "multinacional"
  | "pyme"
  | "autonomo";

export type Demand = "Alta" | "Media" | "Baja";

export interface Career {
  id: string;
  name: string;
  min: number;
  max: number;
  demand: Demand;
  trend: number; // % proyectado 2025, puede ser negativo
  related: string[];
  workforce: number; // profesionales activos estimados en España (miles)
  category: string; // agrupación temática para la página de empleos en auge
}

export interface CCAA {
  id: string;
  name: string;
  modifier: number; // decimal, ej 0.15 = +15%
}

export interface Sector {
  id: SectorId;
  name: string;
  modifier: number;
}

export interface Level {
  id: LevelId;
  name: string;
  description: string;
}

export interface CalculatorInput {
  careerId: string;
  years: number;
  ccaaId: string;
  sectorId: SectorId;
  levelId: LevelId;
}

export interface SalaryBreakdown {
  brutoAnual: number;
  seguridadSocial: number;
  irpf: number;
  netoAnual: number;
  netoMensual: number;
  tipoEfectivo: number; // % retención total
}

export interface ProjectionPoint {
  label: string;
  years: number;
  bruto: number;
}
