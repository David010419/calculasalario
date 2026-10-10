import type { Metadata } from "next";
import Link from "next/link";
import GovernmentSalaryTool from "@/components/GovernmentSalaryTool";
import {
  FaqList,
  GovHero,
  Limitations,
  SalaryLinkGrid,
  SectionTitle,
} from "@/components/GovernmentBlocks";
import AdvertiseBanner from "@/components/AdvertiseBanner";
import JsonLd from "@/components/JsonLd";
import { calcBreakdown, formatEUR } from "@/lib/calculations";
import {
  HUB_PATH,
  breadcrumbSchema,
  faqSchema,
  hubFaqs,
  webAppSchema,
} from "@/lib/government-seo";
import { SCENARIOS } from "@/lib/scenarios";
import { SALARY_PAGES } from "@/lib/seo-pages";

const TITLE = "Tu salario según quién gobierne tras el 29-N: IRPF de PSOE, PP, Vox y Sumar";
const DESCRIPTION =
  "Simulador electoral: calcula cuánto cobrarías neto al mes con el IRPF que propone cada partido para las elecciones generales del 29-N. Ley actual, PP, Vox y Sumar, con hijos, cifras y fuentes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "sueldo según quién gobierne",
    "calculadora IRPF elecciones 2026",
    "simulador sueldo elecciones generales",
    "salario neto 29N",
    "IRPF PP Feijóo deflactar",
    "IRPF Vox 15 % 25 %",
    "IRPF Sumar rentas altas",
    "IRPF PSOE 2026",
    "cuánto cobraría si gobierna el PP",
    "cuánto cobraría si gobierna Vox",
    "simulador sueldo Vox",
    "simulador sueldo PP",
    "comparador programas electorales impuestos",
    "bruto a neto 2026",
  ],
  alternates: { canonical: HUB_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: HUB_PATH,
    type: "website",
    locale: "es_ES",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const EXAMPLE_SALARIES = [18000, 25000, 35000, 50000, 80000, 150000];
const CRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Salario según el gobierno", path: HUB_PATH },
];

export default function SalarioSegunGobiernoPage() {
  const faqs = hubFaqs();

  return (
    <>
      <JsonLd data={webAppSchema("Simulador de sueldo según quién gobierne", DESCRIPTION, HUB_PATH)} />
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd data={faqSchema(faqs)} />

      <GovHero
        crumbs={CRUMBS}
        title={
          <>
            Tu sueldo según <span className="text-sun">quién gobierne</span>
          </>
        }
      >
        <p>
          Cada partido propone un IRPF distinto y eso cambia lo que llega a tu cuenta a final de
          mes. Mueve el deslizador, elige jugador y compara tu neto con PSOE, PP, Vox y Sumar.
        </p>
      </GovHero>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <GovernmentSalaryTool />

        <SectionTitle>📊 Neto mensual por salario y partido</SectionTitle>
        <p className="mt-2 text-sm font-semibold text-text-muted">
          Salario neto mensual en 12 pagas para un trabajador por cuenta ajena sin hijos.
        </p>
        <div className="game-card mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-border text-xs uppercase tracking-wide text-text-muted">
                <th scope="col" className="px-4 py-3 text-left font-bold">Bruto anual</th>
                {SCENARIOS.map((scenario) => (
                  <th key={scenario.id} scope="col" className="px-4 py-3 text-right">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 font-heading text-xs font-semibold normal-case text-white"
                      style={{ backgroundColor: scenario.badgeColor }}
                    >
                      {scenario.id === "actual" ? "Hoy" : scenario.party}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EXAMPLE_SALARIES.map((bruto) => (
                <tr key={bruto} className="border-b border-border last:border-0">
                  <th scope="row" className="px-4 py-3 text-left font-heading font-bold text-text">
                    {formatEUR(bruto)}
                  </th>
                  {SCENARIOS.map((scenario) => (
                    <td key={scenario.id} className="px-4 py-3 text-right font-semibold text-text">
                      {formatEUR(calcBreakdown(bruto, scenario.id).netoMensual)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SectionTitle>🎮 Qué propone cada partido</SectionTitle>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {SCENARIOS.map((scenario) => (
            <article key={scenario.id} className="game-card overflow-hidden">
              <h3
                className="px-5 py-2.5 font-heading text-lg font-semibold text-white"
                style={{ backgroundColor: scenario.badgeColor }}
              >
                {scenario.id === "actual" ? "PSOE · ley actual" : scenario.party}
              </h3>
              <div className="p-5">
                <p className="text-sm font-semibold leading-relaxed text-text">{scenario.summary}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-text-muted">
                  {scenario.measures.map((measure) => (
                    <li key={measure} className="flex gap-2">
                      <span aria-hidden="true">⚡</span>
                      <span>{measure}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs leading-relaxed text-text-muted">
                  <span className="font-bold text-text">Cómo lo calculamos: </span>
                  {scenario.assumptions}
                </p>
                <p className="mt-3 text-xs text-text-muted">
                  Fuente:{" "}
                  <a
                    href={scenario.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary hover:underline"
                  >
                    {scenario.source.label}
                  </a>{" "}
                  ({scenario.source.date}).
                </p>
                <Link
                  href={`${HUB_PATH}/${scenario.slug}`}
                  className="mt-4 inline-block text-sm font-bold text-primary hover:underline"
                >
                  {scenario.id === "actual"
                    ? "Ver sueldos con la ley actual →"
                    : `Ver sueldos si gobierna ${scenario.party} →`}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <SectionTitle>🔎 Busca tu sueldo</SectionTitle>
        <p className="mt-2 text-sm font-semibold text-text-muted">
          Elige tu salario bruto anual y mira la comparativa completa entre partidos.
        </p>
        <SalaryLinkGrid salaries={SALARY_PAGES} />

        <SectionTitle>❓ Preguntas frecuentes</SectionTitle>
        <FaqList faqs={faqs} />

        <SectionTitle>🧮 Metodología</SectionTitle>
        <p className="mt-4 text-sm leading-relaxed text-text-muted">
          En todos los escenarios partimos del mismo salario bruto y restamos la cotización del
          trabajador a la Seguridad Social de 2026 (6,50 % sobre una base máxima de 5.101,20 € al
          mes), los 2.000 € de gastos deducibles y la reducción por rendimientos del trabajo. Sobre
          esa base aplicamos la escala y los mínimos personal y por hijos de cada propuesta. El
          mínimo por hijos se reparte a partes iguales entre los dos progenitores. Lo único que
          cambia entre partidos es el IRPF.
        </p>

        <Limitations />

        <AdvertiseBanner />

        <Link href="/" className="game-btn mt-10 px-5 py-3 text-base">
          ← Calcular mi salario por profesión
        </Link>
      </div>
    </>
  );
}
