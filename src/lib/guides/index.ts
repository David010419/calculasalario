import { EMPLEO_GUIDES } from "./empleo";
import { FORMACION_GUIDES } from "./formacion";
import { NOMINA_GUIDES } from "./nomina";
import type { Guide, GuideCategory } from "./types";

export * from "./types";

export const GUIDES: Guide[] = [...NOMINA_GUIDES, ...EMPLEO_GUIDES, ...FORMACION_GUIDES];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

export function guidesByCategory(category: GuideCategory): Guide[] {
  return GUIDES.filter((guide) => guide.category === category);
}
