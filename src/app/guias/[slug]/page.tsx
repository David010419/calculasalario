import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GuideCard from "@/components/GuideCard";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/government-seo";
import {
  GUIDES,
  GUIDES_UPDATED,
  GUIDES_UPDATED_LABEL,
  GUIDE_CATEGORIES,
  getGuide,
  type Guide,
  type GuideBlock,
} from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const path = `/guias/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: path },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: path,
      type: "article",
      locale: "es_ES",
      modifiedTime: GUIDES_UPDATED,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: ["/opengraph-image"],
    },
  };
}

function Block({ block }: { block: GuideBlock }) {
  if ("h" in block) {
    return <h2 className="mt-9 font-heading text-2xl font-semibold text-text">{block.h}</h2>;
  }
  if ("p" in block) {
    return <p className="mt-4 text-base leading-relaxed text-secondary">{block.p}</p>;
  }
  if ("ul" in block) {
    return (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-secondary">
        {block.ul.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if ("ol" in block) {
    return (
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed text-secondary">
        {block.ol.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    );
  }
  if ("table" in block) {
    return (
      <div className="game-card mt-5 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-border text-left text-xs uppercase tracking-wide text-text-muted">
              {block.table.head.map((cell, i) => (
                <th key={i} scope="col" className="px-4 py-3 font-bold">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-4 py-3 ${j === 0 ? "font-semibold text-text" : "text-secondary"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <p className="mt-5 rounded-2xl border-2 border-ink bg-sun/40 px-4 py-3 text-sm font-bold text-text dark:border-border">
      💡 {block.tip}
    </p>
  );
}

function GuideArticle({ guide }: { guide: Guide }) {
  const path = `/guias/${guide.slug}`;
  const category = GUIDE_CATEGORIES[guide.category];
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Guías", path: "/guias" },
    { name: guide.title, path },
  ];
  const related = guide.related.map(getGuide).filter((g): g is Guide => Boolean(g));

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          inLanguage: "es-ES",
          datePublished: GUIDES_UPDATED,
          dateModified: GUIDES_UPDATED,
          mainEntityOfPage: `${SITE_URL}${path}`,
          image: `${SITE_URL}/opengraph-image`,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }}
      />

      <section className="game-hero border-b-2 border-ink">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
          <nav aria-label="Migas de pan" className="text-xs font-bold text-white/80">
            <Link href="/" className="hover:underline">Inicio</Link>
            {" › "}
            <Link href="/guias" className="hover:underline">Guías</Link>
            {" › "}
            <span>{category.name}</span>
          </nav>
          <span className="game-chip mt-4 px-3 py-1 text-xs sm:text-sm">
            {category.emoji} {category.name} · {guide.minutes} min de lectura
          </span>
          <h1 className="text-outline mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-2 text-xs font-semibold text-white/80">
            Actualizado el {GUIDES_UPDATED_LABEL}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="text-lg font-semibold leading-relaxed text-text">{guide.intro}</p>

        {guide.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}

        <div className="game-card mt-10 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-heading text-lg font-semibold text-text">
            🎮 Pásalo a números con tu sueldo
          </p>
          <Link href={guide.cta.href} className="game-btn game-btn-sun shrink-0 px-5 py-3 text-base">
            {guide.cta.label} →
          </Link>
        </div>

        <h2 className="mt-10 font-heading text-xl font-semibold text-text">Fuentes</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-text-muted">
          {guide.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-text-muted">
          Esta guía es informativa y no sustituye el asesoramiento de un profesional. La normativa
          y las convocatorias cambian: confirma siempre los datos en la fuente oficial.
        </p>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-text">Sigue leyendo</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <GuideCard key={item.slug} guide={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
