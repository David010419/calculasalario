import type { Metadata } from "next";
import GuideCard from "@/components/GuideCard";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/government-seo";
import { GUIDES, GUIDE_CATEGORIES, guidesByCategory, type GuideCategory } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

const TITLE = "Guías de empleo, nómina y formación en España";
const DESCRIPTION =
  "Guías claras y gratuitas para entender tu nómina y el IRPF, encontrar trabajo, preparar el currículum y la entrevista, negociar el sueldo y elegir formación.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guias" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/guias", type: "website", locale: "es_ES", images: ["/opengraph-image"] },
};

const CRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Guías", path: "/guias" },
];

const ORDER: GuideCategory[] = ["nomina", "empleo", "formacion"];

export default function GuiasPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TITLE,
          description: DESCRIPTION,
          url: `${SITE_URL}/guias`,
          inLanguage: "es-ES",
          hasPart: GUIDES.map((guide) => ({
            "@type": "Article",
            headline: guide.title,
            url: `${SITE_URL}/guias/${guide.slug}`,
          })),
        }}
      />

      <section className="game-hero border-b-2 border-ink">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <span className="game-chip px-3 py-1 text-xs sm:text-sm">📚 {GUIDES.length} guías gratuitas</span>
          <h1 className="text-outline mt-3 font-heading text-3xl font-bold leading-tight sm:text-5xl">
            Guías para <span className="text-sun">cobrar mejor</span> y encontrar trabajo
          </h1>
          <p className="mt-3 max-w-2xl text-base font-semibold text-white/90">
            Explicaciones sin jerga sobre tu nómina y tus impuestos, cómo buscar empleo y qué
            estudiar según el trabajo que quieres.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {ORDER.map((category) => (
          <section key={category} className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-text sm:text-3xl">
              {GUIDE_CATEGORIES[category].emoji} {GUIDE_CATEGORIES[category].name}
            </h2>
            <p className="mt-1 text-sm font-semibold text-text-muted">
              {GUIDE_CATEGORIES[category].description}
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {guidesByCategory(category).map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
