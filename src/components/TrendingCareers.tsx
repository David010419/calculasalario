"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatEUR, formatWorkforce, growthPotential } from "@/lib/calculations";
import type { Career } from "@/lib/types";

type TabId = "auge" | "pagados" | "comunes" | "progresion";

const TABS: { id: TabId; label: string; short: string }[] = [
  { id: "auge", label: "🔥 En auge", short: "Mayor tendencia de crecimiento salarial 2025" },
  { id: "pagados", label: "💰 Mejor pagados", short: "Salario medio más alto" },
  { id: "comunes", label: "👥 Más comunes", short: "Más profesionales en activo en España" },
  { id: "progresion", label: "📈 Mayor progresión", short: "Mayor recorrido salarial de junior a expert" },
];

const DEMAND_STYLES: Record<string, string> = {
  Alta: "bg-accent/10 text-accent",
  Media: "bg-amber-500/10 text-amber-600",
  Baja: "bg-red-500/10 text-red-500",
};

function metricFor(tab: TabId, career: Career): { value: number; display: string } {
  switch (tab) {
    case "auge":
      return { value: career.trend, display: `+${career.trend.toFixed(1)}%` };
    case "pagados": {
      const avg = Math.round((career.min + career.max) / 2);
      return { value: avg, display: formatEUR(avg) };
    }
    case "comunes":
      return { value: career.workforce, display: `${formatWorkforce(career.workforce)} aprox.` };
    case "progresion": {
      const growth = growthPotential(career);
      return { value: growth, display: `+${growth}%` };
    }
  }
}

interface TrendingCareersProps {
  careers: Career[];
  limit?: number;
  defaultTab?: TabId;
}

export default function TrendingCareers({ careers, limit, defaultTab = "auge" }: TrendingCareersProps) {
  const [tab, setTab] = useState<TabId>(defaultTab);

  const ranked = useMemo(() => {
    const withMetric = careers.map((career) => ({ career, metric: metricFor(tab, career) }));
    withMetric.sort((a, b) => b.metric.value - a.metric.value);
    return limit ? withMetric.slice(0, limit) : withMetric;
  }, [careers, tab, limit]);

  const activeTab = TABS.find((t) => t.id === tab)!;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition sm:text-sm cursor-pointer ${
              tab === t.id
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface text-secondary hover:border-primary/50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="mt-2.5 text-xs text-text-muted sm:text-sm">{activeTab.short}</p>

      <ol className="mt-4 space-y-2">
        {ranked.map(({ career, metric }, i) => (
          <li key={career.id}>
            <Link
              href={`/?carrera=${career.id}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3.5 py-3 transition hover:border-primary/50 hover:bg-primary/5 sm:gap-4 sm:px-4"
            >
              <span
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-8 sm:w-8 sm:text-sm ${
                  i < 3 ? "bg-primary text-white" : "bg-background text-text-muted"
                }`}
              >
                {i + 1}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-text sm:text-base">{career.name}</p>
                  <span className={`hidden rounded-full px-2 py-0.5 text-[11px] font-semibold sm:inline-block ${DEMAND_STYLES[career.demand]}`}>
                    {career.demand}
                  </span>
                </div>
                <p className="truncate text-xs text-text-muted">
                  {career.category} · {formatEUR(career.min)} - {formatEUR(career.max)}
                </p>
              </div>

              <div className="flex-shrink-0 text-right">
                <p className="text-sm font-bold text-primary sm:text-base">{metric.display}</p>
                <p className="text-[11px] text-text-muted">{TABS.find((t) => t.id === tab)?.label.replace(/^\S+\s/, "")}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
