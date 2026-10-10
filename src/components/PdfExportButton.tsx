"use client";

import { useState } from "react";
import { formatEUR, formatPercent } from "@/lib/calculations";
import type { FullResult } from "@/lib/calculations";
import type { CalculatorInput } from "@/lib/types";
import { getCCAA, getLevel, getSector } from "@/lib/data";

interface PdfExportButtonProps {
  input: CalculatorInput;
  result: FullResult;
}

export default function PdfExportButton({ input, result }: PdfExportButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      const ccaa = getCCAA(input.ccaaId);
      const sector = getSector(input.sectorId);
      const level = getLevel(input.levelId);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(30, 64, 175);
      doc.text("CalculaSalario · Calculadora de salarios España 2026", 14, 20);

      doc.setFontSize(13);
      doc.setTextColor(31, 41, 55);
      doc.text(result.career.name, 14, 30);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(107, 114, 128);
      doc.text(
        `${input.years} años de experiencia · ${level?.name} · ${sector?.name} · ${ccaa?.name}`,
        14,
        37
      );

      doc.setDrawColor(229, 231, 235);
      doc.line(14, 42, 196, 42);

      const rows: [string, string][] = [
        ["Bruto anual", formatEUR(result.breakdown.brutoAnual)],
        ["Seguridad Social", `-${formatEUR(result.breakdown.seguridadSocial)}`],
        ["Retención IRPF", `-${formatEUR(result.breakdown.irpf)}`],
        ["Neto anual", formatEUR(result.breakdown.netoAnual)],
        ["Neto mensual", formatEUR(result.breakdown.netoMensual)],
        ["Variación vs. media nacional", formatPercent(result.vsNational)],
        ["Percentil estimado", `Top ${100 - result.percentile}%`],
      ];

      let y = 52;
      doc.setFontSize(11);
      rows.forEach(([label, value], i) => {
        doc.setTextColor(107, 114, 128);
        doc.text(label, 14, y);
        doc.setTextColor(31, 41, 55);
        doc.setFont("helvetica", "bold");
        doc.text(value, 140, y);
        doc.setFont("helvetica", "normal");
        if (i % 2 === 1) {
          doc.setFillColor(249, 250, 251);
        }
        y += 9;
      });

      y += 6;
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 64, 175);
      doc.text("Proyección de carrera", 14, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(31, 41, 55);
      result.projection.forEach((point) => {
        doc.text(`Año ${point.years}: ${formatEUR(point.bruto)}`, 14, y);
        y += 7;
      });

      y += 10;
      doc.setFontSize(8);
      doc.setTextColor(156, 163, 175);
      doc.text(
        "Datos estimados con fines informativos. No sustituyen asesoramiento laboral o fiscal profesional.",
        14,
        y
      );

      doc.save(`salario-${result.career.id}.pdf`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center justify-center gap-2 rounded-lg border border-primary px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5 disabled:opacity-60 cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
      </svg>
      {loading ? "Generando PDF…" : "Descargar como PDF"}
    </button>
  );
}
