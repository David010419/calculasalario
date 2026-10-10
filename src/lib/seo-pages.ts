function range(from: number, to: number, step: number): number[] {
  const values: number[] = [];
  for (let v = from; v <= to; v += step) values.push(v);
  return values;
}

/** Salarios brutos con página propia en /salario-segun-gobierno/[slug]. */
export const SALARY_PAGES: number[] = [
  ...range(12000, 60000, 500),
  ...range(62000, 100000, 2000),
  ...range(110000, 200000, 10000),
];

export const FEATURED_SALARIES = [
  16000, 18000, 20000, 22000, 24000, 25000, 28000, 30000, 32000, 35000, 40000, 45000, 50000, 60000,
  70000, 80000, 100000, 150000,
];

export function salarySlug(bruto: number): string {
  return `${bruto}-euros`;
}

export function parseSalarySlug(slug: string): number | null {
  const match = /^(\d+)-euros$/.exec(slug);
  if (!match) return null;
  const bruto = Number(match[1]);
  return SALARY_PAGES.includes(bruto) ? bruto : null;
}

/** Salarios con página propia más cercanos al indicado, para el enlazado interno. */
export function neighbourSalaries(bruto: number, count = 6): number[] {
  const index = SALARY_PAGES.indexOf(bruto);
  const half = Math.floor(count / 2);
  const start = Math.max(0, Math.min(index - half, SALARY_PAGES.length - count - 1));
  return SALARY_PAGES.slice(start, start + count + 1).filter((v) => v !== bruto);
}
