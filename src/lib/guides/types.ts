export type GuideCategory = "nomina" | "empleo" | "formacion";

export type GuideBlock =
  | { h: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { tip: string };

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: GuideCategory;
  emoji: string;
  minutes: number;
  intro: string;
  blocks: GuideBlock[];
  sources: { label: string; url: string }[];
  /** Enlace a una herramienta del sitio relacionada con la guía. */
  cta: { label: string; href: string };
  related: string[];
}

export const GUIDE_CATEGORIES: Record<GuideCategory, { name: string; emoji: string; description: string }> = {
  nomina: {
    name: "Nómina e impuestos",
    emoji: "💶",
    description: "Entiende qué te pagan, qué te descuentan y por qué.",
  },
  empleo: {
    name: "Encontrar empleo",
    emoji: "🧭",
    description: "Buscar trabajo, preparar el currículum, la entrevista y la negociación.",
  },
  formacion: {
    name: "Formación",
    emoji: "🎓",
    description: "Qué estudiar, dónde y cuánto cuesta según el empleo que buscas.",
  },
};

export const GUIDES_UPDATED = "2026-10-10";
export const GUIDES_UPDATED_LABEL = "10 de octubre de 2026";
