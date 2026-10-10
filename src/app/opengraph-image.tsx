import { ImageResponse } from "next/og";

export const alt = "Calculadora de Salarios España: tu sueldo según quién gobierne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PARTIES = [
  { name: "PSOE", color: "#d10511" },
  { name: "PP", color: "#0056a7" },
  { name: "Vox", color: "#2f7d0e" },
  { name: "Sumar", color: "#d0164b" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0f1b3d 0%, #1e3a8a 100%)",
          color: "white",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "10px 24px",
            borderRadius: 999,
            background: "#fde047",
            color: "#0f172a",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          Elecciones generales 29-N
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
          Tu sueldo según quién gobierne
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 36, opacity: 0.9 }}>
          Calcula tu neto con el IRPF de cada partido
        </div>
        <div style={{ display: "flex", marginTop: 44, gap: 20 }}>
          {PARTIES.map((party) => (
            <div
              key={party.name}
              style={{
                display: "flex",
                padding: "14px 34px",
                borderRadius: 20,
                border: "4px solid #0f172a",
                background: party.color,
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              {party.name}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
