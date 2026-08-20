import type { CCAA, Career, Level, Sector, SectorId } from "./types";

export const CAREERS: Career[] = [
  { id: "ingenieria-informatica", name: "Ingeniería Informática", min: 25000, max: 45000, demand: "Alta", trend: 5.2, related: ["desarrollo-web", "data-science", "product-manager"], workforce: 450, category: "Tecnología" },
  { id: "ingenieria-tecnica", name: "Ingeniería Técnica", min: 22000, max: 38000, demand: "Alta", trend: 3.8, related: ["ingenieria-informatica", "arquitecto", "mecanica"], workforce: 300, category: "Tecnología" },
  { id: "derecho", name: "Derecho", min: 19000, max: 40000, demand: "Media", trend: 2.1, related: ["abogado", "economia", "consultor"], workforce: 180, category: "Legal" },
  { id: "administracion-empresas", name: "Administración de Empresas", min: 19000, max: 38000, demand: "Media", trend: 2.4, related: ["economia", "consultor", "recursos-humanos"], workforce: 600, category: "Negocio" },
  { id: "marketing-publicidad", name: "Marketing y Publicidad", min: 18000, max: 36000, demand: "Media", trend: 3.0, related: ["diseno-grafico", "periodismo", "product-manager"], workforce: 220, category: "Marketing" },
  { id: "enfermeria", name: "Enfermería", min: 18000, max: 28000, demand: "Alta", trend: 4.5, related: ["medicina", "psicologia"], workforce: 320, category: "Sanidad" },
  { id: "medicina", name: "Medicina", min: 28000, max: 60000, demand: "Alta", trend: 4.0, related: ["enfermeria", "investigador"], workforce: 260, category: "Sanidad" },
  { id: "contabilidad", name: "Contabilidad", min: 20000, max: 35000, demand: "Media", trend: 1.8, related: ["economia", "administracion-empresas", "consultor"], workforce: 280, category: "Finanzas" },
  { id: "recursos-humanos", name: "Recursos Humanos", min: 19000, max: 38000, demand: "Media", trend: 2.6, related: ["administracion-empresas", "consultor"], workforce: 150, category: "Recursos Humanos" },
  { id: "diseno-grafico", name: "Diseño Gráfico", min: 17000, max: 32000, demand: "Media", trend: 2.2, related: ["ux-ui-designer", "marketing-publicidad"], workforce: 90, category: "Diseño" },
  { id: "periodismo", name: "Periodismo", min: 16000, max: 30000, demand: "Baja", trend: 0.5, related: ["marketing-publicidad", "diseno-grafico"], workforce: 50, category: "Comunicación" },
  { id: "economia", name: "Economía", min: 20000, max: 42000, demand: "Media", trend: 3.1, related: ["contabilidad", "consultor", "data-science"], workforce: 200, category: "Finanzas" },
  { id: "psicologia", name: "Psicología", min: 17000, max: 34000, demand: "Media", trend: 2.9, related: ["recursos-humanos", "educacion"], workforce: 140, category: "Sanidad" },
  { id: "educacion", name: "Educación", min: 19000, max: 32000, demand: "Alta", trend: 2.0, related: ["profesor-secundaria", "psicologia"], workforce: 500, category: "Educación" },
  { id: "electricista", name: "Electricista (FP)", min: 18000, max: 32000, demand: "Alta", trend: 4.8, related: ["fontanero", "mecanica"], workforce: 180, category: "Oficios (FP)" },
  { id: "fontanero", name: "Fontanero (FP)", min: 17000, max: 30000, demand: "Alta", trend: 4.2, related: ["electricista", "mecanica"], workforce: 90, category: "Oficios (FP)" },
  { id: "mecanica", name: "Mecánica (FP)", min: 17000, max: 29000, demand: "Alta", trend: 3.5, related: ["electricista", "fontanero"], workforce: 160, category: "Oficios (FP)" },
  { id: "desarrollo-web", name: "Desarrollo Web", min: 22000, max: 42000, demand: "Alta", trend: 5.5, related: ["ingenieria-informatica", "ux-ui-designer", "data-science"], workforce: 130, category: "Tecnología" },
  { id: "data-science", name: "Data Science", min: 26000, max: 55000, demand: "Alta", trend: 7.0, related: ["ingenieria-informatica", "product-manager", "investigador"], workforce: 45, category: "Tecnología" },
  { id: "product-manager", name: "Product Manager", min: 28000, max: 60000, demand: "Alta", trend: 5.8, related: ["ux-ui-designer", "data-science", "consultor"], workforce: 35, category: "Tecnología" },
  { id: "ux-ui-designer", name: "UX/UI Designer", min: 22000, max: 42000, demand: "Alta", trend: 4.6, related: ["diseno-grafico", "desarrollo-web", "product-manager"], workforce: 40, category: "Diseño" },
  { id: "consultor", name: "Consultor", min: 24000, max: 50000, demand: "Media", trend: 3.3, related: ["administracion-empresas", "economia", "product-manager"], workforce: 210, category: "Negocio" },
  { id: "abogado", name: "Abogado", min: 22000, max: 50000, demand: "Media", trend: 2.5, related: ["derecho", "consultor"], workforce: 150, category: "Legal" },
  { id: "arquitecto", name: "Arquitecto", min: 20000, max: 42000, demand: "Media", trend: 2.7, related: ["ingenieria-tecnica"], workforce: 55, category: "Tecnología" },
  { id: "policia-nacional", name: "Policía Nacional", min: 22000, max: 32000, demand: "Media", trend: 1.5, related: ["guardia-civil"], workforce: 75, category: "Seguridad" },
  { id: "guardia-civil", name: "Guardia Civil", min: 22000, max: 32000, demand: "Media", trend: 1.5, related: ["policia-nacional"], workforce: 80, category: "Seguridad" },
  { id: "profesor-secundaria", name: "Profesor de Secundaria", min: 24000, max: 40000, demand: "Media", trend: 2.0, related: ["educacion", "profesor-universidad"], workforce: 240, category: "Educación" },
  { id: "profesor-universidad", name: "Profesor de Universidad", min: 24000, max: 50000, demand: "Baja", trend: 1.2, related: ["profesor-secundaria", "investigador"], workforce: 60, category: "Educación" },
  { id: "investigador", name: "Investigador", min: 20000, max: 38000, demand: "Baja", trend: 1.6, related: ["profesor-universidad", "data-science"], workforce: 90, category: "Investigación" },
  { id: "startupero", name: "Startupero / Emprendedor", min: 12000, max: 60000, demand: "Media", trend: 6.0, related: ["product-manager", "consultor"], workforce: 25, category: "Emprendimiento" },
];

export const CCAAS: CCAA[] = [
  { id: "madrid", name: "Comunidad de Madrid", modifier: 0.15 },
  { id: "cataluna", name: "Cataluña", modifier: 0.10 },
  { id: "pais-vasco", name: "País Vasco", modifier: 0.08 },
  { id: "navarra", name: "Navarra", modifier: 0.06 },
  { id: "baleares", name: "Islas Baleares", modifier: 0.04 },
  { id: "valenciana", name: "Comunidad Valenciana", modifier: 0.02 },
  { id: "aragon", name: "Aragón", modifier: 0.01 },
  { id: "cantabria", name: "Cantabria", modifier: 0.0 },
  { id: "la-rioja", name: "La Rioja", modifier: 0.0 },
  { id: "castilla-y-leon", name: "Castilla y León", modifier: -0.02 },
  { id: "asturias", name: "Asturias", modifier: -0.03 },
  { id: "canarias", name: "Canarias", modifier: -0.04 },
  { id: "murcia", name: "Región de Murcia", modifier: -0.05 },
  { id: "andalucia", name: "Andalucía", modifier: -0.05 },
  { id: "castilla-la-mancha", name: "Castilla-La Mancha", modifier: -0.06 },
  { id: "galicia", name: "Galicia", modifier: -0.05 },
  { id: "extremadura", name: "Extremadura", modifier: -0.08 },
];

export const SECTORS: Sector[] = [
  { id: "publico", name: "Público", modifier: 0.05 },
  { id: "privado", name: "Privado", modifier: 0.02 },
  { id: "startup", name: "Startup", modifier: -0.10 },
  { id: "multinacional", name: "Multinacional", modifier: 0.20 },
  { id: "pyme", name: "PYME", modifier: 0.0 },
  { id: "autonomo", name: "Autónomo", modifier: -0.05 },
];

export const LEVELS: Level[] = [
  { id: "junior", name: "Junior", description: "0-3 años, en aprendizaje" },
  { id: "senior", name: "Senior", description: "4-9 años, autonomía plena" },
  { id: "expert", name: "Expert", description: "10+ años, referente" },
];

export const NATIONAL_STATS = {
  average: 27500,
  percentiles: [
    { p: 10, value: 14000 },
    { p: 25, value: 18500 },
    { p: 50, value: 24500 },
    { p: 75, value: 32000 },
    { p: 90, value: 42000 },
    { p: 99, value: 75000 },
  ],
};

export function getCareer(id: string): Career | undefined {
  return CAREERS.find((c) => c.id === id);
}

export function getCCAA(id: string): CCAA | undefined {
  return CCAAS.find((c) => c.id === id);
}

export function getSector(id: SectorId | string): Sector | undefined {
  return SECTORS.find((s) => s.id === id);
}

export function getLevel(id: string): Level | undefined {
  return LEVELS.find((l) => l.id === id);
}
