import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { SCENARIOS } from "@/lib/scenarios";
import { SALARY_PAGES, salarySlug } from "@/lib/seo-pages";
import { SITE_URL } from "@/lib/site";

const HUB = `${SITE_URL}/salario-segun-gobierno`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: HUB, lastModified, changeFrequency: "daily", priority: 1 },
    ...SCENARIOS.map((scenario) => ({
      url: `${HUB}/${scenario.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/guias`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...GUIDES.map((guide) => ({
      url: `${SITE_URL}/guias/${guide.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/empleos-en-auge`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    ...SALARY_PAGES.map((bruto) => ({
      url: `${HUB}/${salarySlug(bruto)}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/faq`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/sobre`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/aviso-legal`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/politica-de-privacidad`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/politica-de-cookies`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
