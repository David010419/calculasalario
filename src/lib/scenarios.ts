export type ScenarioId = "actual" | "pp" | "vox" | "sumar";

export interface TaxBracket {
  upTo: number;
  rate: number;
}

export interface TaxScenario {
  id: ScenarioId;
  party: string;
  /** Texto del botón: "Si gobernara…" */
  buttonLabel: string;
  /** Color corporativo aproximado, solo para el indicador del botón. */
  color: string;
  /** Variante del color con contraste suficiente para texto blanco encima. */
  badgeColor: string;
  /** Segmento de URL de la página del partido. */
  slug: string;
  brackets: TaxBracket[];
  minimoPersonal: number;
  /** Factor sobre los mínimos por descendientes vigentes (1 = sin cambios). */
  descendientesMultiplier: number;
  /** Puntos de tipo que se restan a cada tramo por hijo (0 = ninguno). */
  rateCutPerChild: number;
  summary: string;
  measures: string[];
  /** Supuestos que hemos tenido que tomar para poder modelizar la propuesta. */
  assumptions: string;
  source: { label: string; url: string; date: string };
}

/** Escala general vigente (estatal + autonómica de referencia). */
const CURRENT_BRACKETS: TaxBracket[] = [
  { upTo: 12450, rate: 0.19 },
  { upTo: 20200, rate: 0.24 },
  { upTo: 35200, rate: 0.3 },
  { upTo: 60000, rate: 0.37 },
  { upTo: 300000, rate: 0.45 },
  { upTo: Infinity, rate: 0.47 },
];

const CURRENT_MINIMO_PERSONAL = 5550;

export const SCENARIOS: TaxScenario[] = [
  {
    id: "actual",
    party: "PSOE",
    buttonLabel: "Ley actual (Gobierno PSOE)",
    color: "#e30613",
    badgeColor: "#d10511",
    slug: "psoe",
    brackets: CURRENT_BRACKETS,
    minimoPersonal: CURRENT_MINIMO_PERSONAL,
    descendientesMultiplier: 1,
    rateCutPerChild: 0,
    summary:
      "Es la normativa en vigor: escala de seis tramos del 19 % al 47 % y deducción para que el salario mínimo no pague IRPF.",
    measures: [
      "Escala general sin cambios: 19 %, 24 %, 30 %, 37 %, 45 % y 47 %.",
      "Mínimo personal de 5.550 €.",
      "Deducción de hasta 590,89 € para salarios de hasta 17.094 € (SMI 2026), decreciente hasta 20.000 €.",
    ],
    assumptions:
      "Se toma como referencia la legislación vigente en 2026. El PSOE aún no ha publicado cifras de IRPF en su programa para el 29-N.",
    source: {
      label: "Ministerio de Hacienda — deducción SMI 2026",
      url: "https://www.hacienda.gob.es/es-ES/Prensa/Noticias/Paginas/2026/20260217-NP-CM-SMI-DEDUCCION-2026.aspx",
      date: "17 de febrero de 2026",
    },
  },
  {
    id: "pp",
    party: "PP",
    buttonLabel: "Si gobernara el PP",
    color: "#0056a7",
    badgeColor: "#0056a7",
    slug: "pp",
    brackets: [
      { upTo: 13695, rate: 0.19 }, // 12.450 € +10 %
      { upTo: 21210, rate: 0.24 }, // 20.200 € +5 %
      { upTo: 36256, rate: 0.3 }, // 35.200 € +3 %
      { upTo: 60000, rate: 0.37 },
      { upTo: 300000, rate: 0.45 },
      { upTo: Infinity, rate: 0.47 },
    ],
    minimoPersonal: 6105, // 5.550 € +10 %
    descendientesMultiplier: 2,
    rateCutPerChild: 0,
    summary:
      "Deflactar el IRPF: subir los límites de los tres primeros tramos y el mínimo personal para compensar la inflación.",
    measures: [
      "Deflactación del 10 % en el primer tramo, del 5 % en el segundo y del 3 % en el tercero.",
      "Mínimo personal un 10 % más alto.",
      "Duplicar los mínimos por descendientes: de 2.400 € a 4.800 € el primer hijo y de 2.700 € a 5.400 € el segundo.",
    ],
    assumptions:
      "Aplicamos la deflactación a los límites superiores de los tres primeros tramos y un +10 % sobre el mínimo personal legal de 5.550 €. Las cifras son las del plan de marzo de 2026; en la campaña del 29-N el PP ha reiterado la deflactación sin publicar aún nuevos porcentajes.",
    source: {
      label: "El Español — plan fiscal de Feijóo",
      url: "https://www.elespanol.com/espana/politica/20260309/plan-feijoo-crisis-iran-medidas-estructurales-rescaten-clase-media-deflactar-irpf/1003744162416_0.amp.html",
      date: "9 de marzo de 2026",
    },
  },
  {
    id: "vox",
    party: "Vox",
    buttonLabel: "Si gobernara Vox",
    color: "#63be21",
    badgeColor: "#2f7d0e",
    slug: "vox",
    brackets: [
      { upTo: 70000, rate: 0.15 },
      { upTo: Infinity, rate: 0.25 },
    ],
    minimoPersonal: 22000,
    descendientesMultiplier: 1,
    rateCutPerChild: 0.04,
    summary:
      "Sustituir la escala actual por dos tipos: 15 % hasta 70.000 € y 25 % a partir de ahí, con 22.000 € exentos.",
    measures: [
      "Tipo del 15 % para rentas de hasta 70.000 € y del 25 % para el exceso.",
      "Exención de los primeros 22.000 € anuales.",
      "Cuatro puntos menos de tipo por cada hijo: con cuatro hijos, 0 % hasta 70.000 € y 9 % por encima.",
    ],
    assumptions:
      "Los 22.000 € sustituyen al mínimo personal de 5.550 € y los tipos son totales (estatal más autonómico). Mantenemos los gastos deducibles y los mínimos por hijos actuales, que la propuesta no menciona.",
    source: {
      label: "Demócrata — programa económico de Vox para el 29-N",
      url: "https://www.democrata.es/elecciones-generales-espana/vox-lleva-29n-su-receta-economica-con-rebajas-fiscales-recorte-gasto-reforma-pensiones/",
      date: "7 de octubre de 2026",
    },
  },
  {
    id: "sumar",
    party: "Sumar",
    buttonLabel: "Si gobernara Sumar",
    color: "#e51c55",
    badgeColor: "#d0164b",
    slug: "sumar",
    brackets: [
      { upTo: 12450, rate: 0.19 },
      { upTo: 20200, rate: 0.24 },
      { upTo: 35200, rate: 0.3 },
      { upTo: 60000, rate: 0.37 },
      { upTo: 120000, rate: 0.45 },
      { upTo: 150000, rate: 0.48 },
      { upTo: 300000, rate: 0.5 },
      { upTo: Infinity, rate: 0.52 },
    ],
    minimoPersonal: CURRENT_MINIMO_PERSONAL,
    descendientesMultiplier: 1,
    rateCutPerChild: 0,
    summary:
      "Mantener la escala actual hasta 120.000 € y añadir tramos más altos para las rentas superiores, hasta el 52 %.",
    measures: [
      "Sin cambios para rentas de hasta 120.000 €.",
      "Nuevos tramos crecientes a partir de 120.000 €, desde el 45 % actual.",
      "Tipo marginal máximo del 52 % a partir de 300.000 €.",
    ],
    assumptions:
      "La propuesta fija el inicio (120.000 €) y el tipo máximo (52 % desde 300.000 €). Los tramos intermedios del 48 % y el 50 % son una aproximación nuestra. Sumar aún no ha publicado su programa para el 29-N.",
    source: {
      label: "Valencia Plaza — propuesta fiscal de Sumar",
      url: "https://valenciaplaza.com/valenciaplaza/sumar-plantea-subir-el-irpf-a-rentas-de-mas-de-120000-euros-y-un-tipo-minimo-del-15-en-sociedades",
      date: "programa electoral de 2023",
    },
  },
];

export function getScenario(id: ScenarioId): TaxScenario {
  return SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0];
}
