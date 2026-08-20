import type { Metadata } from "next";
import Link from "next/link";
import { CAREERS, CCAAS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Calculadora Salarios España 2025",
  description:
    "Conoce la metodología detrás de la Calculadora de Salarios España: fuentes de datos, cálculo de IRPF y objetivo de la herramienta.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-text sm:text-3xl">Sobre nosotros</h1>
      <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
        Calculadora de Salarios España es una herramienta gratuita para ayudarte a entender cuánto
        podrías ganar según tu carrera, tu experiencia, tu comunidad autónoma y el sector en el que
        trabajas. Nuestro objetivo es aportar transparencia salarial al mercado laboral español.
      </p>

      <h2 className="mt-8 font-heading text-lg font-semibold text-text sm:text-xl">
        Metodología
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">
        Partimos de rangos salariales de referencia para {CAREERS.length}+ profesiones, construidos a
        partir de estudios de mercado y datos agregados del Ministerio de Trabajo 2024-2025. Sobre
        ese rango aplicamos modificadores por años de experiencia, nivel de especialización,
        comunidad autónoma (cubrimos las {CCAAS.length} CC.AA.) y tipo de sector. Finalmente estimamos
        la cotización a la Seguridad Social y la retención de IRPF para mostrarte el salario neto.
      </p>

      <h2 className="mt-8 font-heading text-lg font-semibold text-text sm:text-xl">
        Limitaciones
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">
        Los resultados son estimaciones orientativas, no una tasación oficial. El salario real
        depende de la empresa, el convenio colectivo aplicable, la negociación individual y otros
        factores no capturados por este modelo. Consulta siempre con un asesor laboral o fiscal para
        decisiones importantes.
      </p>

      <Link href="/" className="mt-8 inline-block font-semibold text-primary hover:underline">
        ← Volver a la calculadora
      </Link>
    </div>
  );
}
