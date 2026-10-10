import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GovernmentSalaryTool from "@/components/GovernmentSalaryTool";
import {
  FaqList,
  GovHero,
  Limitations,
  PartyLinks,
  SalaryLinkGrid,
  ScenarioTable,
  SectionTitle,
} from "@/components/GovernmentBlocks";
import JsonLd from "@/components/JsonLd";
import { formatEUR } from "@/lib/calculations";
import {
  HUB_PATH,
  breadcrumbSchema,
  faqSchema,
  formatSigned,
  partyWithArticle,
  salaryFaqs,
  scenarioBySlug,
  scenarioRows,
  webAppSchema,
  type Faq,
} from "@/lib/government-seo";
import { SCENARIOS, type TaxScenario } from "@/lib/scenarios";
import {
  FEATURED_SALARIES,
  SALARY_PAGES,
  neighbourSalaries,
  parseSalarySlug,
  salarySlug,
} from "@/lib/seo-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...SALARY_PAGES.map((bruto) => ({ slug: salarySlug(bruto) })),
    ...SCENARIOS.map((scenario) => ({ slug: scenario.slug })),
  ];
}

type Props = { params: Promise<{ slug: string }> };

function salaryMeta(bruto: number) {
  const rows = scenarioRows(bruto);
  const amount = formatEUR(bruto);
  const title = `${amount} brutos en neto: cuánto cobrarías con PSOE, PP, Vox o Sumar`;
  const description = `${amount} brutos al año son ${formatEUR(rows[0].netoMensual)} netos al mes con la ley actual. Con el IRPF del PP serían ${formatEUR(rows[1].netoMensual)}, con Vox ${formatEUR(rows[2].netoMensual)} y con Sumar ${formatEUR(rows[3].netoMensual)}. Comparativa para las elecciones del 29-N.`;
  const keywords = [
    `${bruto} brutos neto`,
    `${amount} brutos en neto`,
    `sueldo neto ${bruto} euros brutos 2026`,
    `${bruto} euros brutos anuales cuánto es neto`,
    `${bruto} brutos 12 pagas`,
    `${bruto} brutos 14 pagas`,
    `IRPF ${bruto} euros`,
    `${bruto} brutos PP`,
    `${bruto} brutos Vox`,
    `${bruto} brutos Sumar`,
    "sueldo según quién gobierne",
    "elecciones generales 29N IRPF",
  ];
  return { title, description, keywords };
}

function partyMeta(scenario: TaxScenario) {
  const row = scenarioRows(30000).find((r) => r.scenario.id === scenario.id)!;
  if (scenario.id === "actual") {
    return {
      title: "Sueldo neto con la ley actual (Gobierno PSOE): IRPF 2026 por salario",
      description: `Cuánto cobras neto en 2026 con el IRPF vigente, el del Gobierno del PSOE. Con 30.000 € brutos son ${formatEUR(row.netoMensual)} al mes. Tabla por salario y comparativa con PP, Vox y Sumar para el 29-N.`,
      keywords: [
        "IRPF PSOE 2026",
        "sueldo neto 2026",
        "tramos IRPF 2026",
        "deducción SMI IRPF 2026",
        "programa PSOE impuestos 29N",
        "bruto a neto 2026",
      ],
    };
  }
  const party = scenario.party;
  return {
    title: `Cuánto cobrarías si gobierna ${partyWithArticle(scenario.id)}: sueldo neto con el IRPF de ${party}`,
    description: `Simulador de sueldo ${party}: con 30.000 € brutos cobrarías ${formatEUR(row.netoMensual)} netos al mes (${formatSigned(row.diffMensual)}/mes frente a hoy). Tabla por salario, con y sin hijos, para las elecciones del 29-N.`,
    keywords: [
      `simulador sueldo ${party}`,
      `IRPF ${party}`,
      `calculadora IRPF ${party}`,
      `cuánto cobraría si gobierna ${party}`,
      `sueldo neto ${party}`,
      `programa electoral ${party} impuestos`,
      `propuesta IRPF ${party} 29N`,
      `${party} bajada IRPF nómina`,
      "elecciones generales 2026 IRPF",
    ],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bruto = parseSalarySlug(slug);
  const scenario = scenarioBySlug(slug);
  if (bruto === null && !scenario) return {};
  const meta = bruto !== null ? salaryMeta(bruto) : partyMeta(scenario!);
  const path = `${HUB_PATH}/${slug}`;
  return {
    ...meta,
    alternates: { canonical: path },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      type: "article",
      locale: "es_ES",
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

function SalaryPage({ bruto, slug }: { bruto: number; slug: string }) {
  const amount = formatEUR(bruto);
  const rows = scenarioRows(bruto);
  const rowsOneChild = scenarioRows(bruto, 1);
  const rowsTwoChildren = scenarioRows(bruto, 2);
  const actual = rows[0];
  const faqs = salaryFaqs(bruto);
  const meta = salaryMeta(bruto);
  const path = `${HUB_PATH}/${slug}`;
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Salario según el gobierno", path: HUB_PATH },
    { name: `${amount} brutos`, path },
  ];
  const best = rows.reduce((a, b) => (b.netoMensual > a.netoMensual ? b : a));

  return (
    <>
      <JsonLd data={webAppSchema(meta.title, meta.description, path)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(faqs)} />

      <GovHero
        crumbs={crumbs}
        title={
          <>
            <span className="text-sun">{amount}</span> brutos: tu neto según quién gobierne
          </>
        }
      >
        <p>
          Hoy son {formatEUR(actual.netoMensual)} netos al mes. Mira cuánto cambiaría con el IRPF
          que proponen PP, Vox y Sumar para el 29-N.
        </p>
      </GovHero>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <GovernmentSalaryTool initialBruto={bruto} />

        <SectionTitle>📊 {amount} brutos en neto, partido a partido</SectionTitle>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          Con un salario de {amount} brutos al año y sin hijos, la ley actual te deja{" "}
          {formatEUR(actual.netoAnual)} netos: {formatEUR(actual.netoMensual)} al mes en 12 pagas o{" "}
          {formatEUR(actual.neto14)} en 14 pagas, después de pagar {formatEUR(actual.irpf)} de IRPF
          y la Seguridad Social.{" "}
          {best.diffAnual > 0
            ? `La propuesta que más neto te dejaría es la de ${best.scenario.party}: ${formatEUR(best.netoMensual)} al mes, ${formatSigned(best.diffAnual)} al año.`
            : "Con este salario ninguna de las propuestas mejora tu neto respecto a la ley actual."}
        </p>
        <ScenarioTable rows={rows} caption={`Sueldo neto de ${amount} brutos según cada partido, sin hijos`} />

        <SectionTitle>👶 {amount} brutos con hijos</SectionTitle>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          Con hijos a cargo las diferencias crecen: el PP propone duplicar los mínimos por
          descendientes y Vox resta cuatro puntos de tipo por cada hijo.
        </p>
        <h3 className="mt-5 font-heading text-lg font-semibold text-text">Con 1 hijo</h3>
        <ScenarioTable rows={rowsOneChild} caption={`Sueldo neto de ${amount} brutos con 1 hijo`} />
        <h3 className="mt-6 font-heading text-lg font-semibold text-text">Con 2 hijos</h3>
        <ScenarioTable rows={rowsTwoChildren} caption={`Sueldo neto de ${amount} brutos con 2 hijos`} />

        <SectionTitle>❓ Preguntas sobre {amount} brutos</SectionTitle>
        <FaqList faqs={faqs} />

        <SectionTitle>🔎 Otros sueldos parecidos</SectionTitle>
        <SalaryLinkGrid salaries={neighbourSalaries(bruto, 8)} current={bruto} />
        <h3 className="mt-6 font-heading text-lg font-semibold text-text">Sueldos más buscados</h3>
        <SalaryLinkGrid salaries={FEATURED_SALARIES} current={bruto} />

        <SectionTitle>🎮 Mira un partido en detalle</SectionTitle>
        <PartyLinks />

        <Limitations />

        <Link href={HUB_PATH} className="game-btn mt-10 px-5 py-3 text-base">
          ← Volver al simulador electoral
        </Link>
      </div>
    </>
  );
}

function PartyPage({ scenario, slug }: { scenario: TaxScenario; slug: string }) {
  const isActual = scenario.id === "actual";
  const meta = partyMeta(scenario);
  const path = `${HUB_PATH}/${slug}`;
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Salario según el gobierno", path: HUB_PATH },
    { name: isActual ? "PSOE · ley actual" : scenario.party, path },
  ];
  const table = FEATURED_SALARIES.map((bruto) => {
    const pick = (hijos: number) =>
      scenarioRows(bruto, hijos).find((r) => r.scenario.id === scenario.id)!;
    return { bruto, base: pick(0), twoChildren: pick(2) };
  });
  const sample = table.find((r) => r.bruto === 30000)!;
  const who = partyWithArticle(scenario.id);

  const faqs: Faq[] = [
    {
      question: isActual
        ? "¿Cuánto se cobra neto en 2026 con la ley actual?"
        : `¿Cuánto cobraría si gobierna ${who}?`,
      answer: isActual
        ? `Con 30.000 € brutos y sin hijos, ${formatEUR(sample.base.netoMensual)} netos al mes en 12 pagas, tras pagar ${formatEUR(sample.base.irpf)} de IRPF.`
        : `Con 30.000 € brutos y sin hijos cobrarías ${formatEUR(sample.base.netoMensual)} netos al mes: ${formatSigned(sample.base.diffMensual)} al mes y ${formatSigned(sample.base.diffAnual)} al año respecto a la ley actual. Con otros salarios el resultado cambia; puedes verlo en la tabla.`,
    },
    {
      question: `¿Qué propone ${who} con el IRPF?`,
      answer: `${scenario.summary} ${scenario.measures.join(" ")}`,
    },
    {
      question: "¿De dónde salen los datos?",
      answer: `De ${scenario.source.label} (${scenario.source.date}). ${scenario.assumptions}`,
    },
  ];

  return (
    <>
      <JsonLd data={webAppSchema(meta.title, meta.description, path)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(faqs)} />

      <GovHero
        crumbs={crumbs}
        title={
          isActual ? (
            <>
              Tu sueldo con la <span className="text-sun">ley actual</span> (PSOE)
            </>
          ) : (
            <>
              Tu sueldo si gobierna <span className="text-sun">{who}</span>
            </>
          )
        }
      >
        <p>{scenario.summary}</p>
      </GovHero>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <GovernmentSalaryTool initialScenario={scenario.id} />

        <SectionTitle>⚡ Las medidas, una a una</SectionTitle>
        <div className="game-card mt-4 p-5 sm:p-6">
          <ul className="space-y-2 text-sm font-semibold text-text">
            {scenario.measures.map((measure) => (
              <li key={measure} className="flex gap-2">
                <span aria-hidden="true">⚡</span>
                <span>{measure}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
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
        </div>

        <SectionTitle>
          📊 {isActual ? "Sueldo neto por salario con la ley actual" : `Sueldo neto por salario si gobierna ${who}`}
        </SectionTitle>
        <p className="mt-2 text-sm font-semibold text-text-muted">
          Neto mensual en 12 pagas. Pulsa un salario para ver la comparativa completa entre
          partidos.
        </p>
        <div className="game-card mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-border text-xs uppercase tracking-wide text-text-muted">
                <th scope="col" className="px-4 py-3 text-left font-bold">Bruto anual</th>
                <th scope="col" className="px-4 py-3 text-right font-bold">IRPF anual</th>
                <th scope="col" className="px-4 py-3 text-right font-bold">Neto al mes</th>
                {!isActual && (
                  <th scope="col" className="px-4 py-3 text-right font-bold">Frente a hoy</th>
                )}
                <th scope="col" className="px-4 py-3 text-right font-bold">Neto con 2 hijos</th>
              </tr>
            </thead>
            <tbody>
              {table.map(({ bruto, base, twoChildren }) => (
                <tr key={bruto} className="border-b border-border last:border-0">
                  <th scope="row" className="px-4 py-3 text-left">
                    <Link
                      href={`${HUB_PATH}/${salarySlug(bruto)}`}
                      className="font-heading font-bold text-primary hover:underline"
                    >
                      {formatEUR(bruto)}
                    </Link>
                  </th>
                  <td className="px-4 py-3 text-right text-text-muted">{formatEUR(base.irpf)}</td>
                  <td className="px-4 py-3 text-right font-heading text-base font-bold text-text">
                    {formatEUR(base.netoMensual)}
                  </td>
                  {!isActual && (
                    <td
                      className={`px-4 py-3 text-right font-bold ${
                        base.diffMensual > 0
                          ? "text-accent"
                          : base.diffMensual < 0
                            ? "text-red-600 dark:text-red-400"
                            : "text-text-muted"
                      }`}
                    >
                      {formatSigned(base.diffMensual)}/mes
                    </td>
                  )}
                  <td className="px-4 py-3 text-right text-text">
                    {formatEUR(twoChildren.netoMensual)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SectionTitle>❓ Preguntas frecuentes</SectionTitle>
        <FaqList faqs={faqs} />

        <SectionTitle>🎮 Compara con otro partido</SectionTitle>
        <PartyLinks current={scenario.slug} />

        <SectionTitle>🔎 Busca tu sueldo</SectionTitle>
        <SalaryLinkGrid salaries={FEATURED_SALARIES} />

        <Limitations />

        <Link href={HUB_PATH} className="game-btn mt-10 px-5 py-3 text-base">
          ← Volver al simulador electoral
        </Link>
      </div>
    </>
  );
}

export default async function GovernmentSlugPage({ params }: Props) {
  const { slug } = await params;
  const bruto = parseSalarySlug(slug);
  if (bruto !== null) return <SalaryPage bruto={bruto} slug={slug} />;
  const scenario = scenarioBySlug(slug);
  if (scenario) return <PartyPage scenario={scenario} slug={slug} />;
  notFound();
}
