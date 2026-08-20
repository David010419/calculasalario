import { formatEUR } from "@/lib/calculations";
import type { ProjectionPoint } from "@/lib/types";

export default function ProjectionTable({
  current,
  projection,
}: {
  current: number;
  projection: ProjectionPoint[];
}) {
  const growthTotal = projection.length
    ? Math.round(((projection[projection.length - 1].bruto - current) / current) * 1000) / 10
    : 0;

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="bg-background text-left text-text-muted">
              <th className="px-4 py-3 font-medium">Momento</th>
              <th className="px-4 py-3 font-medium">Salario bruto anual estimado</th>
              <th className="px-4 py-3 font-medium">Crecimiento</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-medium text-text">Ahora</td>
              <td className="px-4 py-3">{formatEUR(current)}</td>
              <td className="px-4 py-3 text-text-muted">—</td>
            </tr>
            {projection.map((point) => {
              const growth = Math.round(((point.bruto - current) / current) * 1000) / 10;
              return (
                <tr key={point.years} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-text">
                    {point.years === 1 ? "Año 1" : `Año ${point.years}`}
                  </td>
                  <td className="px-4 py-3">{formatEUR(point.bruto)}</td>
                  <td className="px-4 py-3 font-medium text-accent">+{growth.toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-text-muted">
        En {projection[projection.length - 1]?.years ?? 10} años podrías ganar hasta{" "}
        <span className="font-semibold text-text">
          {formatEUR(projection[projection.length - 1]?.bruto ?? current)}
        </span>{" "}
        con experiencia acumulada — un crecimiento total estimado de{" "}
        <span className="font-semibold text-accent">+{growthTotal.toFixed(1)}%</span>.
      </p>
    </div>
  );
}
