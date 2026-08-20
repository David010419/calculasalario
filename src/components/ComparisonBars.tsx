"use client";

import { formatEUR } from "@/lib/calculations";

interface Bar {
  label: string;
  value: number;
  highlight?: boolean;
}

export default function ComparisonBars({ bars }: { bars: Bar[] }) {
  const max = Math.max(...bars.map((b) => b.value)) * 1.1;

  return (
    <div className="space-y-3">
      {bars.map((bar) => {
        const widthPct = Math.max((bar.value / max) * 100, 3);
        return (
          <div key={bar.label}>
            <div className="mb-1 flex items-baseline justify-between text-sm">
              <span className={bar.highlight ? "font-semibold text-text" : "text-text-muted"}>{bar.label}</span>
              <span className={bar.highlight ? "font-semibold text-primary" : "text-text-muted"}>
                {formatEUR(bar.value)}
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-background">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  bar.highlight ? "bg-primary" : "bg-accent/70"
                }`}
                style={{ width: `${widthPct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
