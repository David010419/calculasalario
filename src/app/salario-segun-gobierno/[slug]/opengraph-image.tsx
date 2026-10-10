import { ImageResponse } from "next/og";
import { formatEUR } from "@/lib/calculations";
import { formatSigned, scenarioBySlug, scenarioRows } from "@/lib/government-seo";
import { parseSalarySlug } from "@/lib/seo-pages";

export const alt = "Tu sueldo neto según quién gobierne: PSOE, PP, Vox y Sumar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scenario = scenarioBySlug(slug);
  const bruto = parseSalarySlug(slug) ?? 30000;
  const rows = scenarioRows(bruto);
  const heading = scenario
    ? scenario.id === "actual"
      ? "Tu sueldo con la ley actual"
      : `Tu sueldo si gobierna ${scenario.party}`
    : `${formatEUR(bruto)} brutos según quién gobierne`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 56,
          background: "linear-gradient(135deg, #0f1b3d 0%, #1e3a8a 100%)",
          color: "white",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "8px 22px",
            borderRadius: 999,
            background: "#fde047",
            color: "#0f172a",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          Elecciones generales 29-N
        </div>
        <div style={{ display: "flex", marginTop: 18, fontSize: 60, fontWeight: 700 }}>{heading}</div>
        <div style={{ display: "flex", marginTop: 8, fontSize: 28, opacity: 0.9 }}>
          {scenario ? `Ejemplo con ${formatEUR(bruto)} brutos · neto al mes` : "Neto al mes con el IRPF de cada partido"}
        </div>
        <div style={{ display: "flex", marginTop: 34, gap: 18 }}>
          {rows.map((row) => (
            <div
              key={row.scenario.id}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                borderRadius: 24,
                border: "4px solid #0f172a",
                background: "white",
                color: "#0f172a",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  background: row.scenario.badgeColor,
                  color: "white",
                  fontSize: 30,
                  fontWeight: 700,
                }}
              >
                {row.scenario.party}
              </div>
              <div style={{ display: "flex", padding: "16px 18px 0", fontSize: 50, fontWeight: 700 }}>
                {formatEUR(row.netoMensual)}
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "4px 18px 18px",
                  fontSize: 26,
                  fontWeight: 700,
                  color: row.diffMensual > 0 ? "#059669" : "#5b6478",
                }}
              >
                {row.scenario.id === "actual" ? "ley actual" : `${formatSigned(row.diffMensual)}/mes`}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", marginTop: 34, fontSize: 32, fontWeight: 700 }}>
          ¿Y tú? Prueba el tuyo y comparte
        </div>
      </div>
    ),
    { ...size }
  );
}
