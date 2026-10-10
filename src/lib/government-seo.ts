import { calcBreakdown, formatEUR } from "./calculations";
import { SCENARIOS, type ScenarioId, type TaxScenario } from "./scenarios";
import { SITE_NAME, SITE_URL } from "./site";

export const HUB_PATH = "/salario-segun-gobierno";
export const ELECTION_LABEL = "29 de noviembre de 2026";

const PARTY_WITH_ARTICLE: Record<ScenarioId, string> = {
  actual: "el PSOE",
  pp: "el PP",
  vox: "Vox",
  sumar: "Sumar",
};

export function partyWithArticle(id: ScenarioId): string {
  return PARTY_WITH_ARTICLE[id];
}

export function scenarioBySlug(slug: string): TaxScenario | undefined {
  return SCENARIOS.find((s) => s.slug === slug);
}

export interface ScenarioRow {
  scenario: TaxScenario;
  irpf: number;
  netoAnual: number;
  netoMensual: number;
  neto14: number;
  tipoEfectivo: number;
  diffMensual: number;
  diffAnual: number;
}

export function scenarioRows(bruto: number, hijos = 0): ScenarioRow[] {
  const actual = calcBreakdown(bruto, "actual", hijos);
  return SCENARIOS.map((scenario) => {
    const b = calcBreakdown(bruto, scenario.id, hijos);
    return {
      scenario,
      irpf: b.irpf,
      netoAnual: b.netoAnual,
      netoMensual: b.netoMensual,
      neto14: Math.round(b.netoAnual / 14),
      tipoEfectivo: b.tipoEfectivo,
      diffMensual: b.netoMensual - actual.netoMensual,
      diffAnual: b.netoAnual - actual.netoAnual,
    };
  });
}

export function formatSigned(value: number): string {
  if (value === 0) return "0 €";
  return `${value > 0 ? "+" : "−"}${formatEUR(Math.abs(value))}`;
}

export interface Faq {
  question: string;
  answer: string;
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function webAppSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${SITE_URL}${path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    inLanguage: "es-ES",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function hubFaqs(): Faq[] {
  const rows = scenarioRows(30000);
  const byId = Object.fromEntries(rows.map((r) => [r.scenario.id, r]));
  return [
    {
      question: "¿Cuándo son las elecciones generales en España?",
      answer: `Las elecciones generales se celebran el ${ELECTION_LABEL} (29-N). Este simulador compara cómo quedaría tu sueldo neto con el IRPF que propone cada partido.`,
    },
    {
      question: "¿Cuánto cambiaría mi sueldo neto según quién gobierne?",
      answer: `Depende de tu salario. Con 30.000 € brutos y sin hijos, hoy cobrarías ${formatEUR(byId.actual.netoMensual)} netos al mes; con la propuesta del PP, ${formatEUR(byId.pp.netoMensual)}; con la de Vox, ${formatEUR(byId.vox.netoMensual)}; y con la de Sumar, ${formatEUR(byId.sumar.netoMensual)}. Solo se compara el IRPF sobre el salario.`,
    },
    {
      question: "¿Qué propone el PP con el IRPF?",
      answer:
        "Deflactar el IRPF: subir un 10 % el límite del primer tramo, un 5 % el del segundo y un 3 % el del tercero, elevar un 10 % el mínimo personal y duplicar los mínimos por hijos.",
    },
    {
      question: "¿Qué propone Vox con el IRPF?",
      answer:
        "Dos tipos: 15 % hasta 70.000 € y 25 % por encima, con los primeros 22.000 € exentos y cuatro puntos menos de tipo por cada hijo.",
    },
    {
      question: "¿Qué propone Sumar con el IRPF?",
      answer:
        "Mantener la escala actual hasta 120.000 € y añadir tramos más altos a partir de esa cifra, hasta un tipo máximo del 52 % desde 300.000 €. Por debajo de 120.000 € el sueldo neto no cambia.",
    },
    {
      question: "¿Y el PSOE?",
      answer:
        "El PSOE gobierna actualmente, así que su escenario es la ley vigente en 2026: escala del 19 % al 47 % y una deducción para que el salario mínimo no pague IRPF. Aún no ha publicado cifras nuevas de IRPF para el 29-N.",
    },
    {
      question: "¿Estas propuestas ya están aprobadas?",
      answer:
        "No. Son propuestas publicadas por los partidos, no leyes en vigor. Pueden cambiar en los programas definitivos o en una negociación de gobierno.",
    },
    {
      question: "¿El cálculo tiene en cuenta los hijos?",
      answer:
        "Sí. Puedes indicar de 0 a 4 o más hijos. Se aplica el mínimo por descendientes repartido entre los dos progenitores, la duplicación que propone el PP y la rebaja de cuatro puntos por hijo de Vox.",
    },
  ];
}

export function salaryFaqs(bruto: number): Faq[] {
  const rows = scenarioRows(bruto);
  const actual = rows[0];
  const faqs: Faq[] = [
    {
      question: `¿Cuánto son ${formatEUR(bruto)} brutos en neto en 2026?`,
      answer: `Con la ley actual, ${formatEUR(bruto)} brutos al año son unos ${formatEUR(actual.netoAnual)} netos: ${formatEUR(actual.netoMensual)} al mes en 12 pagas o ${formatEUR(actual.neto14)} en 14 pagas, para un trabajador sin hijos. Pagarías ${formatEUR(actual.irpf)} de IRPF.`,
    },
  ];
  for (const row of rows.slice(1)) {
    const change =
      row.diffAnual === 0
        ? "lo mismo que ahora, porque la propuesta no afecta a este nivel salarial"
        : `${formatSigned(row.diffMensual)} al mes (${formatSigned(row.diffAnual)} al año) respecto a la ley actual`;
    faqs.push({
      question: `¿Cuánto cobraría con ${formatEUR(bruto)} brutos si gobierna ${partyWithArticle(row.scenario.id)}?`,
      answer: `Con la propuesta de IRPF de ${row.scenario.party} cobrarías ${formatEUR(row.netoMensual)} netos al mes en 12 pagas: ${change}.`,
    });
  }
  return faqs;
}
